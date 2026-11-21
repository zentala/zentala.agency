#!/usr/bin/env node
/**
 * Link check CLI.
 *
 *   node scripts/links/cli.mjs build-hook   npm `postbuild`: runs only when LINK_CHECK=1;
 *                                           disables dead links in dist, writes the job summary
 *   node scripts/links/cli.mjs dist         check dist, report only (`just links`)
 *   node scripts/links/cli.mjs live         check the live site (`just links-live`)
 *
 * Options: --notify (push the summary through the notify skill), --dist <dir>,
 * --base <url> (live site, default https://zentala.agency), --report <path>.
 * Dead links never fail the process: only a tool error (no dist, no sitemap) does.
 */
import { notifyReport } from './notify.mjs'
import { appendJobSummary, countsLine, DEFAULT_REPORT_PATH } from './report.mjs'
import { runDist, runLive } from './run.mjs'

const LIVE_REPORT_PATH = '.cache/links/report-live.json'
const DEFAULT_BASE = 'https://zentala.agency'

function option(args, name, fallback) {
  const index = args.indexOf(name)
  return index === -1 ? fallback : args[index + 1]
}

async function main(argv) {
  const [command, ...args] = argv
  const distDir = option(args, '--dist', 'dist')
  if (command === 'build-hook' && process.env.LINK_CHECK !== '1') {
    console.log('[links] skipped (set LINK_CHECK=1 to check outgoing links in this build)')
    return
  }
  let report
  if (command === 'dist' || command === 'build-hook') {
    const reportPath = option(args, '--report', DEFAULT_REPORT_PATH)
    report = await runDist({ distDir, reportPath, rewrite: command === 'build-hook' })
  } else if (command === 'live') {
    const reportPath = option(args, '--report', LIVE_REPORT_PATH)
    report = await runLive({ baseUrl: option(args, '--base', DEFAULT_BASE), reportPath })
  } else {
    throw new Error(`Unknown command "${command}". Use build-hook, dist or live.`)
  }
  console.log(`[links] ${countsLine(report)}`)
  for (const link of report.links.filter((entry) => entry.status === 'dead')) {
    console.log(`[links] DEAD ${link.url} (${link.code ?? link.error}) on ${link.pages.length} page(s): ${link.pages.slice(0, 3).join(', ')}`)
  }
  for (const error of report.pageErrors) console.log(`[links] page not crawled: ${error}`)
  if (command === 'build-hook') appendJobSummary(report)
  if (args.includes('--notify')) {
    const { sent, reason } = notifyReport(report)
    console.log(`[links] notify ${sent ? 'sent' : 'NOT sent'}: ${reason}`)
  }
}

main(process.argv.slice(2)).catch((error) => {
  console.error(`[links] ERROR ${error.message}`)
  process.exit(1)
})
