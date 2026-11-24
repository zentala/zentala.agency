import { getCollection, type CollectionEntry } from 'astro:content'
import { buildFeed } from '@/lib/blog/feed'
import { partLabel } from '@/lib/blog/part-label'
import { getThinSeries, getVisiblePosts } from '@/lib/blog/visibility'
import { DATE_LOCALE } from '@/lib/blog/format-date'

/** Posts and series of the /blog index . */

export type BlogIndexPost = CollectionEntry<'blog'>

export interface BlogIndexSeries {
  slug: string
  title: string
  tagline?: string
  parts: BlogIndexPost[]
  newestSlug: string
  isFresh: boolean
  /** Dev only: published parts of a series that production would hide. */
  hiddenInProduction?: number
}

export interface BlogIndexData {
  posts: BlogIndexPost[]
  latest: BlogIndexPost[]
  series: BlogIndexSeries[]
  partLabelFor: (post: BlogIndexPost) => string | undefined
}

const FRESH_DAYS = 14
const SERIES_ORDER = [
  'agent-native-harness',
  'multi-interface',
  'developer-experience',
]

const byDateDesc = (a: BlogIndexPost, b: BlogIndexPost) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()

export async function loadBlogIndexData(): Promise<BlogIndexData> {
  const posts = await getVisiblePosts()
  const thinSeries = await getThinSeries()
  const descriptions = await getCollection('series-descriptions')
  const feed = buildFeed(posts, { now: new Date(), freshDays: FRESH_DAYS })

  const series = SERIES_ORDER.flatMap((slug): BlogIndexSeries[] => {
    const entry = feed.find(
      (item) => item.kind === 'series' && item.slug === slug,
    )
    if (!entry || entry.kind !== 'series') return []
    const description = descriptions.find((item) => item.slug === slug)
    return [
      {
        slug,
        title: description?.data.title ?? slug,
        tagline: description?.data.tagline,
        parts: entry.parts,
        newestSlug: entry.newestSlug,
        isFresh: entry.isFresh,
        hiddenInProduction: thinSeries.get(slug),
      },
    ]
  })

  const partLabelFor = (post: BlogIndexPost) => {
    const { series: seriesSlug, part } = post.data
    if (!seriesSlug || part === undefined) return undefined
    const visibleParts = posts.flatMap((other) =>
      other.data.series === seriesSlug && other.data.part !== undefined
        ? [other.data.part]
        : [],
    )
    return partLabel(part, visibleParts)
  }

  return {
    posts,
    latest: [...posts].sort(byDateDesc),
    series,
    partLabelFor,
  }
}

/** Compact date for a table column, for example "8 Sept 2026". UTC like `formatDate`. */
export function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat(DATE_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}
