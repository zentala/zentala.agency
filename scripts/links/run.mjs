/**
 * Orchestration of one link check: extract, check, optionally disable dead links in
 * dist, write the report. Used by the CLI (`cli.mjs`) and by the integration test.
 */
import { checkAll, STATUS } from './check.mjs'
import { extractLinks } from './extract.mjs'
import { crawlLive } from './live.mjs'
import { buildReport, DEFAULT_REPORT_PATH, writeReport } from './report.mjs'
import { disableDeadLinksInDist } from './rewrite.mjs'

/**
 * Check the outgoing links of a build output.
 * @param {{ distDir: string, rewrite?: boolean, reportPath?: string, check?: object }} options
 * `check` carries timeout, concurrency and retry delay overrides.
 * @throws when dist is missing or holds no HTML (an empty scan must not look clean)
 */
export async function runDist({ distDir, rewrite = false, reportPath = DEFAULT_REPORT_PATH, check = {} }) {
  const { links, pageCount } = extractLinks(distDir)
  if (pageCount === 0) throw new Error(`No HTML files in "${distDir}": run the build first`)
  const results = await checkAll(links, check)
  const dead = new Set(results.filter((link) => link.status === STATUS.DEAD).map((link) => link.url))
  const disabled = rewrite ? disableDeadLinksInDist(distDir, dead).links : 0
  const report = buildReport(results, { source: 'dist', pageCount, disabled })
  writeReport(report, reportPath)
  return report
}

/**
 * Check the outgoing links of the live site. Reports only; nothing is rewritten.
 * @param {{ baseUrl: string, reportPath?: string, check?: object }} options
 */
export async function runLive({ baseUrl, reportPath = DEFAULT_REPORT_PATH, check = {} }) {
  const { links, pageCount, pageErrors } = await crawlLive(baseUrl)
  const results = await checkAll(links, check)
  const report = buildReport(results, { source: `live ${baseUrl}`, pageCount, pageErrors })
  writeReport(report, reportPath)
  return report
}
