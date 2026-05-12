import { simpleGit } from 'simple-git'
import { parseGitLog } from './parseGitLog'
import { resolveSlug } from './resolveSlug'
import { clampPercent, computeIsMajor } from './heuristics'
import type { HistoryEntry, ParsedCommit } from './types'
import type { ContentCollection } from './validators'

const MAX_COMMITS = 500
const cache = new Map<string, { headSha: string; entries: HistoryEntry[]; warnings: string[] }>()

export type HistoryResult = { entries: HistoryEntry[]; warnings: string[]; repoUrl: string | null }

/** Converts a git remote URL into a canonical https://github.com/owner/repo form. */
export function normalizeRepoUrl(remote: string | undefined | null): string | null {
  if (!remote) return null
  const trimmed = remote.trim()
  const ssh = trimmed.match(/^git@([^:]+):(.+?)(?:\.git)?$/)
  if (ssh) return `https://${ssh[1]}/${ssh[2]}`
  const https = trimmed.match(/^https?:\/\/(.+?)(?:\.git)?$/)
  if (https) return `https://${https[1]}`
  return null
}

/**
 * Returns the full commit history for a content-collection entry, newest-first,
 * with rename-tracking via `--numstat` markers and `isMajor` derived from heuristics.
 * Cached per-process by `(collection, slug)` keyed on current HEAD SHA.
 */
export async function getHistory(
  collection: ContentCollection,
  slug: string,
  repoRoot: string = process.cwd(),
): Promise<HistoryResult> {
  const git = simpleGit({ baseDir: repoRoot })
  const headSha = (await git.revparse(['HEAD'])).trim()
  const cacheKey = `${collection}:${slug}`
  const cached = cache.get(cacheKey)
  let repoUrl: string | null = null
  try {
    const remote = await git.raw(['remote', 'get-url', 'origin'])
    repoUrl = normalizeRepoUrl(remote)
  } catch {
    repoUrl = null
  }
  if (cached && cached.headSha === headSha) {
    return { entries: cached.entries, warnings: cached.warnings, repoUrl }
  }

  const warnings: string[] = []
  const currentPath = await resolveSlug(collection, slug, repoRoot)
  if (!currentPath) {
    return { entries: [], warnings: ['file not found in HEAD'], repoUrl }
  }

  const stdout = await git.raw([
    'log',
    '--follow',
    '--numstat',
    "--format=__COMMIT__%n%H%n%ai%n%s",
    '--',
    currentPath,
  ])

  const parsed = parseGitLog(stdout)
  if (parsed.length > MAX_COMMITS) {
    warnings.push(`showing ${MAX_COMMITS} most recent of ${parsed.length}`)
  }
  const truncated = parsed.slice(0, MAX_COMMITS)

  const entries = await enrichWithPercent(git, truncated)
  cache.set(cacheKey, { headSha, entries, warnings })
  return { entries, warnings, repoUrl }
}

async function enrichWithPercent(
  git: ReturnType<typeof simpleGit>,
  commits: ParsedCommit[],
): Promise<HistoryEntry[]> {
  const result: HistoryEntry[] = []
  for (let i = 0; i < commits.length; i++) {
    const cur = commits[i]
    const prev = commits[i + 1]
    let denom = 1
    if (prev) {
      try {
        const prevContent = await git.show([`${prev.sha}:${prev.pathAtCommit}`])
        denom = Math.max(1, prevContent.split('\n').length)
      } catch {
        denom = Math.max(1, cur.linesAdded + cur.linesRemoved)
      }
    } else {
      denom = Math.max(1, cur.linesAdded + cur.linesRemoved)
    }
    const pct = clampPercent(((cur.linesAdded + cur.linesRemoved) / denom) * 100)
    result.push({
      ...cur,
      percentChanged: pct,
      isMajor: computeIsMajor(pct, cur.linesAdded, cur.linesRemoved),
    })
  }
  return result
}

/** Clears the in-process cache. Test helper. */
export function _resetHistoryCache(): void {
  cache.clear()
}
