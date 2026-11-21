/**
 * Notification through the Harness `notify` skill's own sender (send.ps1, ntfy topic
 * zntl-agents). This module never touches credentials: send.ps1 reads its channel
 * from the skill's config.json (ntfy, topic zntl-agents, user zntl). The write password
 * is the broker secret `ntfy-pass`, injected into send.ps1 as NTFY_PASS; this module
 * never reads it. ntfy.internal is LAN-only, so only a LAN machine can notify.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { buildNotification } from './report.mjs'

const SEND_SCRIPT = join(homedir(), '.agents', 'skills', 'notify', 'bin', 'send.ps1')
const BROKER_SCRIPT = join(homedir(), '.claude', 'skills', 'password-broker', 'broker.ps1')
const NTFY_SECRET = 'ntfy-pass'
const NTFY_ENV = 'NTFY_PASS'
const SEND_TIMEOUT_MS = 30_000

function brokerHasSecret(name) {
  const result = spawnSync('pwsh', ['-NoProfile', '-File', BROKER_SCRIPT, 'has', name], { encoding: 'utf8', timeout: SEND_TIMEOUT_MS })
  return result.stdout?.trim() === 'SET'
}

/**
 * Send a short summary of dead and unverified links.
 * @param {ReturnType<import('./report.mjs').buildReport>} report
 * @param {string} [sendScript] override for tests
 * @returns {{ sent: boolean, reason: string }} never throws: a failed push must not fail the check
 */
export function notifyReport(report, sendScript = process.env.NOTIFY_SEND_SCRIPT ?? SEND_SCRIPT) {
  const notification = buildNotification(report)
  if (!notification) return { sent: false, reason: 'nothing to report' }
  if (!existsSync(sendScript)) return { sent: false, reason: `notify sender not found: ${sendScript}` }
  const sendArgs = ['-NoProfile', '-File', sendScript, '-Message', notification.message, '-Title', notification.title, '-Priority', notification.priority]
  const viaBroker = brokerHasSecret(NTFY_SECRET)
  const args = viaBroker
    ? ['-NoProfile', '-File', BROKER_SCRIPT, 'inject', NTFY_SECRET, '-EnvName', NTFY_ENV, '::', 'pwsh', ...sendArgs]
    : sendArgs
  const result = spawnSync('pwsh', args, { encoding: 'utf8', timeout: SEND_TIMEOUT_MS })
  if (result.status === 0) return { sent: true, reason: result.stdout.trim() }
  const detail = (result.stderr || result.error?.message || '').trim().split('\n')[0]
  const hint = viaBroker ? '' : ` (broker secret ${NTFY_SECRET} is MISSING: ntfy rejects anonymous writes)`
  return { sent: false, reason: `send.ps1 exited ${result.status}: ${detail}${hint}` }
}
