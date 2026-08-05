/**
 * Shared types for the dev-only blog version history tool.
 * See `.plan/epics/E001-2026-05-12-blog-version-history/ARCH.md` §4.
 */

export type HistoryEntry = {
  sha: string
  shortSha: string
  date: string
  message: string
  pathAtCommit: string
  linesAdded: number
  linesRemoved: number
  percentChanged: number
  isMajor: boolean
}

export type VersionPayload = {
  sha: string
  collection: string
  slug: string
  pathAtCommit: string
  frontmatter: Record<string, unknown>
  body: string
  html: string
  warnings: string[]
}

export type ParsedCommit = Omit<HistoryEntry, 'percentChanged' | 'isMajor'>
