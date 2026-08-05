import { simpleGit } from 'simple-git'
import matter from 'gray-matter'
import { getHistory } from './getHistory'
import { renderMarkdown } from './renderMarkdown'
import type { VersionPayload } from './types'
import type { ContentCollection } from './validators'

const cache = new Map<string, VersionPayload>()

export type VersionResult =
  | { ok: true; payload: VersionPayload; cacheHit: boolean }
  | { ok: false; status: 404; payload: VersionPayload }

/**
 * Returns a content-collection entry's contents at the given SHA, with
 * frontmatter parsed (rescue on error) and pre-rendered HTML via
 * `@astrojs/markdown-remark`. Uses rename-aware `pathAtCommit` from history.
 */
export async function getVersion(
  collection: ContentCollection,
  slug: string,
  sha: string,
  repoRoot: string = process.cwd(),
): Promise<VersionResult> {
  const { entries } = await getHistory(collection, slug, repoRoot)
  const match = entries.find((e) => e.sha === sha || e.shortSha === sha.slice(0, 7))
  if (!match) {
    return {
      ok: false,
      status: 404,
      payload: emptyPayload(collection, slug, sha, 'sha not in current history'),
    }
  }

  const fullSha = match.sha
  const pathAtCommit = match.pathAtCommit
  const cacheKey = `${collection}:${slug}:${pathAtCommit}@${fullSha}`
  const cached = cache.get(cacheKey)
  if (cached) return { ok: true, payload: cached, cacheHit: true }

  const git = simpleGit({ baseDir: repoRoot })
  const warnings: string[] = []
  let raw: string
  try {
    raw = await git.show([`${fullSha}:${pathAtCommit}`])
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    warnings.push(`file not present at this commit: ${message}`)
    return {
      ok: false,
      status: 404,
      payload: {
        sha: fullSha,
        collection,
        slug,
        pathAtCommit,
        frontmatter: {},
        body: '',
        html: '',
        warnings,
      },
    }
  }

  let frontmatter: Record<string, unknown> = {}
  let body = raw
  try {
    const parsed = matter(raw)
    frontmatter = parsed.data ?? {}
    body = parsed.content
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    warnings.push(`frontmatter parse failed: ${message}`)
  }

  const { html, warnings: renderWarnings } = await renderMarkdown(body)
  warnings.push(...renderWarnings)

  const payload: VersionPayload = {
    sha: fullSha,
    collection,
    slug,
    pathAtCommit,
    frontmatter,
    body,
    html,
    warnings,
  }
  cache.set(cacheKey, payload)
  return { ok: true, payload, cacheHit: false }
}

function emptyPayload(
  collection: string,
  slug: string,
  sha: string,
  warning: string,
): VersionPayload {
  return {
    sha,
    collection,
    slug,
    pathAtCommit: '',
    frontmatter: {},
    body: '',
    html: '',
    warnings: [warning],
  }
}

export function _resetVersionCache(): void {
  cache.clear()
}
