import { SHOW_DRAFTS } from '@/config/blog'

interface VisibilityCandidate {
  data: { published?: boolean }
}

interface SeriesCandidate extends VisibilityCandidate {
  data: { published?: boolean; series?: string; part?: number }
}

/** A series needs at least this many published parts to exist in production. */
export const MIN_PUBLISHED_SERIES_PARTS = 2

/** The one visibility rule: unpublished posts show only where drafts are shown. */
export function isVisiblePost(
  post: VisibilityCandidate,
  showDrafts: boolean = SHOW_DRAFTS,
): boolean {
  return showDrafts || post.data.published !== false
}

/**
 * Published parts per series slug. Drafts never count, so a series of ten
 * drafts has 0 and a post without `series` is not counted at all.
 */
export function countPublishedParts(
  posts: SeriesCandidate[],
): Map<string, number> {
  const counts = new Map<string, number>()
  for (const post of posts) {
    const { series } = post.data
    if (!series) continue
    const published = post.data.published !== false ? 1 : 0
    counts.set(series, (counts.get(series) ?? 0) + published)
  }
  return counts
}

/**
 * Series that production would not show: fewer than
 * `MIN_PUBLISHED_SERIES_PARTS` published parts. Value is the published count.
 */
export function findThinSeries(posts: SeriesCandidate[]): Map<string, number> {
  const thin = new Map<string, number>()
  for (const [series, published] of countPublishedParts(posts)) {
    if (published < MIN_PUBLISHED_SERIES_PARTS) thin.set(series, published)
  }
  return thin
}

/**
 * The posts a build may show. Where drafts are hidden (production) a thin
 * series loses its identity: its published parts come back as standalone
 * posts, with no `series` and no `part`. Where drafts show (dev) the posts
 * pass through unchanged so the author sees everything.
 */
export function selectVisiblePosts<TPost extends SeriesCandidate>(
  allPosts: TPost[],
  showDrafts: boolean = SHOW_DRAFTS,
): TPost[] {
  const visible = allPosts.filter((post) => isVisiblePost(post, showDrafts))
  if (showDrafts) return visible
  const thin = findThinSeries(allPosts)
  return visible.map((post) =>
    post.data.series && thin.has(post.data.series)
      ? ({
          ...post,
          data: { ...post.data, series: undefined, part: undefined },
        } as TPost)
      : post,
  )
}

/** All blog posts the current build may show. */
export async function getVisiblePosts() {
  const { getCollection } = await import('astro:content')
  return selectVisiblePosts(await getCollection('blog'))
}

/** Series that production would hide, for the dev-only marker. Empty in production. */
export async function getThinSeries(): Promise<Map<string, number>> {
  if (!SHOW_DRAFTS) return new Map()
  const { getCollection } = await import('astro:content')
  return findThinSeries(await getCollection('blog'))
}
