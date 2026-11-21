/**
 * Link check report: JSON on disk (read by the dev-only /monitor/links page),
 * Markdown for the GitHub job summary, and the short ntfy notification text.
 */
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { STATUS } from './check.mjs'

export const DEFAULT_REPORT_PATH = '.cache/links/report.json'
const SUMMARY_ROWS = 50
const NOTIFY_LISTED = 5

/**
 * @param {Array<{ status: string }>} links checked links
 * @param {{ source: string, pageCount: number, disabled?: number, pageErrors?: string[] }} meta
 */
export function buildReport(links, { source, pageCount, disabled = 0, pageErrors = [] }) {
  const count = (status) => links.filter((link) => link.status === status).length
  return {
    generatedAt: new Date().toISOString(),
    source,
    pageCount,
    disabled,
    pageErrors,
    counts: {
      total: links.length,
      ok: count(STATUS.OK),
      dead: count(STATUS.DEAD),
      unverified: count(STATUS.UNVERIFIED),
    },
    links,
  }
}

/** @returns {string} the path written */
export function writeReport(report, path = DEFAULT_REPORT_PATH) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`)
  return path
}

const cell = (value) => String(value).replace(/\|/g, '\\|')
const outcome = (link) => cell(link.code ?? link.error ?? '')

/** One-line counts for logs. */
export function countsLine({ counts, disabled, source, pageCount }) {
  return `${source}: ${counts.total} links on ${pageCount} pages: ${counts.ok} ok, ${counts.dead} dead, ${counts.unverified} unverified, ${disabled} disabled`
}

/** Markdown for `$GITHUB_STEP_SUMMARY`: counts plus the dead and unverified rows. */
export function summaryMarkdown(report) {
  const problems = report.links.filter((link) => link.status !== STATUS.OK)
  const lines = ['## Outgoing link check', '', countsLine(report), '']
  if (problems.length === 0) return `${lines.join('\n')}\nNo dead or unverified links.\n`
  lines.push('| Status | Link | Result | Pages |', '| --- | --- | --- | --- |')
  const ordered = [...problems].sort((a, b) => (a.status === STATUS.DEAD ? -1 : 1) - (b.status === STATUS.DEAD ? -1 : 1))
  for (const link of ordered.slice(0, SUMMARY_ROWS)) {
    lines.push(`| ${link.status} | ${cell(link.url)} | ${outcome(link)} | ${cell(link.pages.slice(0, 3).join(', '))} |`)
  }
  if (ordered.length > SUMMARY_ROWS) lines.push('', `${ordered.length - SUMMARY_ROWS} more in the JSON report.`)
  return `${lines.join('\n')}\n`
}

/** Append the summary to the GitHub job summary file when running in Actions. */
export function appendJobSummary(report, summaryPath = process.env.GITHUB_STEP_SUMMARY) {
  if (!summaryPath) return false
  appendFileSync(summaryPath, `${summaryMarkdown(report)}\n`)
  return true
}

/**
 * Short push text, or null when there is nothing to report (no dead or unverified links).
 * @returns {{ title: string, message: string, priority: 'normal' | 'high' } | null}
 */
export function buildNotification(report) {
  const { dead, unverified } = report.counts
  if (dead + unverified === 0) return null
  const list = (status) => {
    const urls = report.links.filter((link) => link.status === status).map((link) => link.url)
    const shown = urls.slice(0, NOTIFY_LISTED).join('\n')
    return urls.length > NOTIFY_LISTED ? `${shown}\n+${urls.length - NOTIFY_LISTED} more` : shown
  }
  const parts = [`${report.counts.total} links checked (${report.source}): ${dead} dead, ${unverified} unverified.`]
  if (dead > 0) parts.push(`Dead:\n${list(STATUS.DEAD)}`)
  if (unverified > 0) parts.push(`Unverified: ${unverified} (blocked, rate-limited or timing out), see the report.`)
  return {
    title: dead > 0 ? 'zentala.agency: dead links' : 'zentala.agency: unverified links',
    message: parts.join('\n'),
    priority: dead > 0 ? 'high' : 'normal',
  }
}
