import { getCollection, type CollectionEntry } from 'astro:content'
import { buildFeed, type FeedEntry } from '@/lib/blog/feed'
import { partLabel } from '@/lib/blog/part-label'
import { getThinSeries, getVisiblePosts } from '@/lib/blog/visibility'
import { DATE_LOCALE } from '@/lib/blog/format-date'

/** Real blog data for the design board: the same posts and series /blog shows. */

export type BoardPost = CollectionEntry<'blog'>

export interface BoardSeries {
  slug: string
  title: string
  tagline?: string
  parts: BoardPost[]
  newestSlug: string
  isFresh: boolean
  /** Dev only: published parts of a series that production would hide. */
  hiddenInProduction?: number
}

export interface BoardData {
  posts: BoardPost[]
  latest: BoardPost[]
  feed: FeedEntry<BoardPost>[]
  series: BoardSeries[]
  partLabelFor: (post: BoardPost) => string | undefined
}

const FRESH_DAYS = 14
const SERIES_ORDER = [
  'agent-native-harness',
  'multi-interface',
  'developer-experience',
]

const byDateDesc = (a: BoardPost, b: BoardPost) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()

export async function loadBoardData(): Promise<BoardData> {
  const posts = await getVisiblePosts()
  const thinSeries = await getThinSeries()
  const descriptions = await getCollection('series-descriptions')
  const feed = buildFeed(posts, { now: new Date(), freshDays: FRESH_DAYS })

  const series = SERIES_ORDER.flatMap((slug): BoardSeries[] => {
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

  const partLabelFor = (post: BoardPost) => {
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
    feed,
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
