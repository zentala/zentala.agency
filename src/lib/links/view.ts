/**
 * Derived views of a link report for the dev-only link monitor: dead links by source page,
 * the proportional summary bar and the stale check. Pure; the report itself is read in report.ts.
 */
import type { CheckedLink, LinkReport, LinkStatus } from './report'

/** A report older than this is flagged as stale on the page. */
export const STALE_AFTER_DAYS = 7
const DAY_MS = 24 * 60 * 60 * 1000
const PERCENT_TOTAL = 100

export interface PageGroup {
  page: string
  links: CheckedLink[]
}

/** Dead links grouped by the page that holds them: most dead links first, then by path. A link on N pages appears in N groups. */
export function groupDeadByPage(links: CheckedLink[]): PageGroup[] {
  const pages = new Map<string, CheckedLink[]>()
  for (const link of links) {
    if (link.status !== 'dead') continue
    for (const page of link.pages) pages.set(page, [...(pages.get(page) ?? []), link])
  }
  return [...pages]
    .map(([page, group]) => ({ page, links: group }))
    .sort((a, b) => b.links.length - a.links.length || a.page.localeCompare(b.page))
}

export interface DeadSummary {
  /** Distinct dead URLs. */
  links: number
  /** Distinct pages that hold at least one of them. */
  pages: number
}

/** Real counts of dead links: distinct URLs and distinct pages, never page-by-link occurrences. */
export function deadSummary(links: CheckedLink[]): DeadSummary {
  const dead = links.filter((link) => link.status === 'dead')
  return { links: dead.length, pages: new Set(dead.flatMap((link) => link.pages)).size }
}

/** Polish plural: one, few (2-4 except 12-14), many. */
function plural(count: number, one: string, few: string, many: string): string {
  const lastTwo = count % 100
  const last = count % 10
  if (count === 1) return one
  return last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14) ? few : many
}

/** "6 linków na 26 stronach": what a dead-link heading counts, said in words. */
export function deadSummaryLabel({ links, pages }: DeadSummary): string {
  const linkWord = plural(links, 'martwy link', 'martwe linki', 'martwych linków')
  const pageWord = plural(pages, 'stronie', 'stronach', 'stronach')
  return `${links} ${linkWord} na ${pages} ${pageWord}`
}

/**
 * Whole-number percentages of the three statuses that add up to exactly 100
 * (largest remainder), or all zeros for an empty report.
 */
export function statusShares(counts: LinkReport['counts']): Record<LinkStatus, number> {
  const statuses: LinkStatus[] = ['dead', 'unverified', 'ok']
  const total = statuses.reduce((sum, status) => sum + counts[status], 0)
  const shares: Record<LinkStatus, number> = { dead: 0, unverified: 0, ok: 0 }
  if (total === 0) return shares
  const exact = statuses.map((status) => ({ status, value: (counts[status] / total) * PERCENT_TOTAL }))
  for (const { status, value } of exact) shares[status] = Math.floor(value)
  let missing = PERCENT_TOTAL - statuses.reduce((sum, status) => sum + shares[status], 0)
  const byRemainder = [...exact].sort((a, b) => (b.value % 1) - (a.value % 1))
  for (const { status } of byRemainder) {
    if (missing === 0) break
    shares[status] += 1
    missing -= 1
  }
  return shares
}

/** Whole days since the report was written, never negative. */
export function reportAgeDays(report: Pick<LinkReport, 'generatedAt'>, now = new Date()): number {
  const written = Date.parse(report.generatedAt)
  return Math.max(0, Math.floor((now.getTime() - written) / DAY_MS))
}

export const isStale = (report: Pick<LinkReport, 'generatedAt'>, now = new Date()): boolean =>
  reportAgeDays(report, now) >= STALE_AFTER_DAYS
