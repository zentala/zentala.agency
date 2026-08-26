import { describe, expect, it } from 'vitest'
import { buildFeed, type FeedPost } from '@/lib/blog/feed'

function post(overrides: Partial<FeedPost> & { slug: string }): FeedPost {
  return {
    slug: overrides.slug,
    data: {
      date: '2026-01-01',
      ...overrides.data,
    },
  }
}

const NOW = new Date('2026-08-26T00:00:00Z')
const OPTS = { now: NOW, freshDays: 14 }

describe('buildFeed', () => {
  it('collapses a series into one entry', () => {
    const posts = [
      post({ slug: 'p1', data: { date: '2026-01-01', series: 'harness', part: 1 } }),
      post({ slug: 'p2', data: { date: '2026-01-02', series: 'harness', part: 2 } }),
      post({ slug: 'p3', data: { date: '2026-01-03', series: 'harness', part: 3 } }),
    ]
    const feed = buildFeed(posts, OPTS)
    expect(feed).toHaveLength(1)
    expect(feed[0].kind).toBe('series')
  })

  it('never lists a post twice', () => {
    const posts = [
      post({ slug: 'p1', data: { date: '2026-01-01', series: 'harness', part: 1 } }),
      post({ slug: 'p2', data: { date: '2026-01-02' } }),
    ]
    const feed = buildFeed(posts, OPTS)
    const allSlugs = feed.flatMap((entry) =>
      entry.kind === 'series' ? entry.parts.map((p) => p.slug) : [entry.post.slug],
    )
    expect(allSlugs).toHaveLength(2)
    expect(new Set(allSlugs).size).toBe(2)
  })

  it('a series with a newer part outranks a newer standalone post', () => {
    const posts = [
      post({ slug: 'standalone', data: { date: '2026-01-05' } }),
      post({ slug: 'p1', data: { date: '2026-01-01', series: 'harness', part: 1 } }),
      post({ slug: 'p2', data: { date: '2026-01-10', series: 'harness', part: 2 } }),
    ]
    const feed = buildFeed(posts, OPTS)
    expect(feed).toHaveLength(2)
    expect(feed[0].kind).toBe('series')
  })

  it('isFresh flips exactly at the freshDays boundary', () => {
    const exactlyAtBoundary = post({
      slug: 'p1',
      data: {
        date: new Date(NOW.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        series: 'harness',
        part: 1,
      },
    })
    const oneDayPast = post({
      slug: 'p1b',
      data: {
        date: new Date(NOW.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        series: 'harness2',
        part: 1,
      },
    })

    const freshFeed = buildFeed([exactlyAtBoundary], OPTS)
    expect(freshFeed[0].kind).toBe('series')
    if (freshFeed[0].kind === 'series') expect(freshFeed[0].isFresh).toBe(true)

    const staleFeed = buildFeed([oneDayPast], OPTS)
    expect(staleFeed[0].kind).toBe('series')
    if (staleFeed[0].kind === 'series') expect(staleFeed[0].isFresh).toBe(false)
  })

  it('a series still groups correctly when an unpublished part was already filtered out by the caller', () => {
    // buildFeed trusts the caller's visibility filter — an unpublished part
    // simply is not in `posts`, and the series still groups around what remains.
    const posts = [
      post({ slug: 'p1', data: { date: '2026-01-01', series: 'harness', part: 1 } }),
    ]
    const feed = buildFeed(posts, OPTS)
    expect(feed).toHaveLength(1)
    expect(feed[0].kind).toBe('series')
    if (feed[0].kind === 'series') {
      expect(feed[0].parts).toHaveLength(1)
      expect(feed[0].parts[0].slug).toBe('p1')
    }
  })

  it('sorts a part with no part value last', () => {
    const posts = [
      post({ slug: 'p1', data: { date: '2026-01-01', series: 'harness', part: 1 } }),
      post({ slug: 'p-no-part', data: { date: '2026-01-02', series: 'harness' } }),
      post({ slug: 'p2', data: { date: '2026-01-03', series: 'harness', part: 2 } }),
    ]
    const feed = buildFeed(posts, OPTS)
    expect(feed[0].kind).toBe('series')
    if (feed[0].kind === 'series') {
      expect(feed[0].parts.map((p) => p.slug)).toEqual(['p1', 'p2', 'p-no-part'])
    }
  })

  it('ranks a series by its most recently DATED part, not its highest-numbered one', () => {
    // Mirrors the real content: part 8 was drafted before parts 3-7, so the
    // highest part number carries the OLDEST date. Ranking by part number
    // would sink the series below a standalone post published the same day.
    const posts = [
      post({ slug: 'p1', data: { date: '2026-08-08', series: 'harness', part: 1 } }),
      post({ slug: 'p3', data: { date: '2026-08-08', series: 'harness', part: 3 } }),
      post({ slug: 'p8', data: { date: '2026-08-07', series: 'harness', part: 8 } }),
      post({ slug: 'standalone', data: { date: '2026-08-07' } }),
    ]
    const feed = buildFeed(posts, OPTS)
    expect(feed[0].kind).toBe('series')
    if (feed[0].kind === 'series') {
      expect(feed[0].date).toBe('2026-08-08')
      expect(feed[0].newestSlug).toBe('p3')
      // parts stay ordered by part number regardless
      expect(feed[0].parts.map((p) => p.slug)).toEqual(['p1', 'p3', 'p8'])
    }
  })

  it('produces an empty feed for an empty input', () => {
    const feed = buildFeed([], OPTS)
    expect(feed).toHaveLength(0)
  })
})
