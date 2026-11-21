/**
 * Reader for the outgoing link report written by `scripts/links` (see scripts/links/cli.mjs).
 * Used only by the dev-only /monitor/links page, never by a production page.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export type LinkStatus = 'dead' | 'unverified' | 'ok'

export interface CheckedLink {
  url: string
  status: LinkStatus
  code: number | null
  error: string | null
  pages: string[]
  checkedAt: string
}

export interface LinkReport {
  generatedAt: string
  source: string
  pageCount: number
  disabled: number
  pageErrors: string[]
  counts: { total: number; ok: number; dead: number; unverified: number }
  links: CheckedLink[]
}

/** Report files in the order the page prefers them when both exist (newest wins). */
export const REPORT_FILES = ['.cache/links/report.json', '.cache/links/report-live.json']

/** Groups in display order: what needs attention first. */
export const STATUS_ORDER: LinkStatus[] = ['dead', 'unverified', 'ok']

/**
 * The most recently written report, or null when no check has run yet.
 * @param root project root holding `.cache/`
 */
export function readLatestReport(root = process.cwd()): LinkReport | null {
  const paths = REPORT_FILES.map((file) => join(root, file)).filter((path) => existsSync(path))
  if (paths.length === 0) return null
  const newest = paths.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0]
  return JSON.parse(readFileSync(newest, 'utf8')) as LinkReport
}

/** Links grouped by status in `STATUS_ORDER`; empty groups are kept so the page can say "none". */
export function groupByStatus(links: CheckedLink[]): Record<LinkStatus, CheckedLink[]> {
  const groups: Record<LinkStatus, CheckedLink[]> = { dead: [], unverified: [], ok: [] }
  for (const link of links) groups[link.status].push(link)
  return groups
}

/** HTTP code or error text of a link, `-` when neither. */
export function outcomeLabel(link: CheckedLink): string {
  return link.code !== null ? String(link.code) : (link.error ?? '-')
}
