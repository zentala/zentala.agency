/** A blog post's data shape as read from the `blog` content collection. */
export interface FeedPost {
  slug: string
  data: {
    date: string
    series?: string
    part?: number
    published?: boolean
    [key: string]: unknown
  }
}

/** One standalone post in the feed. */
export interface StandaloneEntry<TPost extends FeedPost> {
  kind: 'post'
  post: TPost
  date: string
}

/** One series, collapsed to a single feed entry. */
export interface SeriesEntry<TPost extends FeedPost> {
  kind: 'series'
  slug: string
  parts: TPost[]
  date: string
  newestSlug: string
  isFresh: boolean
}

export type FeedEntry<TPost extends FeedPost> =
  | StandaloneEntry<TPost>
  | SeriesEntry<TPost>

export interface BuildFeedOptions {
  /** Current instant, injected so the function stays pure and testable. */
  now: Date
  /** A series' newest part is "fresh" within this many days of `now`. */
  freshDays: number
}

/**
 * Groups posts into feed entries: a series collapses into one `SeriesEntry`,
 * every other post stays a `StandaloneEntry`. Entries are sorted by date
 * descending. Pure — no `astro:content` import, no clock read inside.
 *
 * `posts` must already be visibility-filtered by the caller (the existing
 * `DEV || PUBLIC_PREVIEW || published !== false` rule) — this function does
 * not re-apply that filter, so an excluded part simply is not in `posts`,
 * and the series it belongs to still groups correctly around what remains.
 */
export function buildFeed<TPost extends FeedPost>(
  posts: TPost[],
  options: BuildFeedOptions,
): FeedEntry<TPost>[] {
  const seriesGroups = new Map<string, TPost[]>()
  const standalone: TPost[] = []

  for (const post of posts) {
    const series = post.data.series
    if (series) {
      const group = seriesGroups.get(series)
      if (group) {
        group.push(post)
      } else {
        seriesGroups.set(series, [post])
      }
    } else {
      standalone.push(post)
    }
  }

  const standaloneEntries: StandaloneEntry<TPost>[] = standalone.map(
    (post) => ({
      kind: 'post',
      post,
      date: post.data.date,
    }),
  )

  const seriesEntries: SeriesEntry<TPost>[] = Array.from(
    seriesGroups.entries(),
  ).map(([slug, parts]) => {
    const sortedParts = sortParts(parts)
    const newest = newestByDate(sortedParts)
    return {
      kind: 'series' as const,
      slug,
      parts: sortedParts,
      date: newest.data.date,
      newestSlug: newest.slug,
      isFresh: isWithinFreshWindow(
        newest.data.date,
        options.now,
        options.freshDays,
      ),
    }
  })

  return [...standaloneEntries, ...seriesEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

/**
 * The part a series is "at" right now: the most recently DATED part, not the
 * highest-numbered one. Parts are often written out of order (part 8 drafted
 * before part 6), so ranking by `part` would sink a series that just gained a
 * post. Ties on date break toward the higher `part`.
 */
function newestByDate<TPost extends FeedPost>(parts: TPost[]): TPost {
  return parts.reduce((newest, candidate) => {
    const diff =
      new Date(candidate.data.date).getTime() -
      new Date(newest.data.date).getTime()
    if (diff > 0) return candidate
    if (diff < 0) return newest
    return (candidate.data.part ?? -1) > (newest.data.part ?? -1)
      ? candidate
      : newest
  })
}

/** Sorts a series' parts by `part` ascending; parts with no `part` sort last, by date. */
function sortParts<TPost extends FeedPost>(parts: TPost[]): TPost[] {
  return [...parts].sort((a, b) => {
    const partA = a.data.part
    const partB = b.data.part
    if (partA === undefined && partB === undefined) {
      return new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
    }
    if (partA === undefined) return 1
    if (partB === undefined) return -1
    return partA - partB
  })
}

function isWithinFreshWindow(
  dateStr: string,
  now: Date,
  freshDays: number,
): boolean {
  const dayMs = 24 * 60 * 60 * 1000
  const ageMs = now.getTime() - new Date(dateStr).getTime()
  return ageMs <= freshDays * dayMs
}
