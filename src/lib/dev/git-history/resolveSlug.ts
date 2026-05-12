import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { ContentCollection } from './validators'

/**
 * Resolves a `(collection, slug)` pair to a repo-relative content file path.
 * Tries `.md` first, then `.mdx`. Returns the relative path (POSIX-style) or null.
 */
export async function resolveSlug(
  collection: ContentCollection,
  slug: string,
  repoRoot: string = process.cwd(),
): Promise<string | null> {
  for (const ext of ['.md', '.mdx'] as const) {
    const rel = `src/content/${collection}/${slug}${ext}`
    try {
      await access(resolve(repoRoot, rel))
      return rel
    } catch {
      // try next extension
    }
  }
  return null
}
