import { describe, expect, it } from 'vitest'
import {
  countPublishedParts,
  findThinSeries,
  isVisiblePost,
  selectVisiblePosts,
} from '@/lib/blog/visibility'

interface TestPost {
  slug: string
  data: { published?: boolean; series?: string; part?: number }
}

function post(
  slug: string,
  data: TestPost['data'] = {},
): TestPost {
  return { slug, data }
}

const HARNESS = 'agent-native-harness'

describe('countPublishedParts', () => {
  it('happy: counts the published parts of each series', () => {
    const posts = [
      post('a', { series: HARNESS, part: 1 }),
      post('b', { series: HARNESS, part: 2, published: true }),
      post('c', { series: 'multi-interface', part: 1 }),
    ]
    expect(countPublishedParts(posts).get(HARNESS)).toBe(2)
    expect(countPublishedParts(posts).get('multi-interface')).toBe(1)
  })

  it('nil: a post without a series is not counted', () => {
    expect(countPublishedParts([post('solo')]).size).toBe(0)
  })

  it('empty: a series of drafts only has 0 published parts', () => {
    const posts = [
      post('a', { series: HARNESS, published: false }),
      post('b', { series: HARNESS, published: false }),
    ]
    expect(countPublishedParts(posts).get(HARNESS)).toBe(0)
  })

  it('drafts never count, whatever the review flag says', () => {
    const posts = [
      post('a', { series: HARNESS, published: false }),
      post('b', { series: HARNESS }),
    ]
    expect(countPublishedParts(posts).get(HARNESS)).toBe(1)
  })
})

describe('findThinSeries', () => {
  it('happy: a series with 2 published parts is not thin', () => {
    const posts = [post('a', { series: HARNESS }), post('b', { series: HARNESS })]
    expect(findThinSeries(posts).size).toBe(0)
  })

  it('edge: exactly 1 published part is thin and reports its count', () => {
    const posts = [
      post('a', { series: HARNESS }),
      post('b', { series: HARNESS, published: false }),
    ]
    expect(findThinSeries(posts).get(HARNESS)).toBe(1)
  })

  it('empty: 0 published parts is thin', () => {
    const posts = [post('a', { series: HARNESS, published: false })]
    expect(findThinSeries(posts).get(HARNESS)).toBe(0)
  })

  it('nil: posts without a series are never thin', () => {
    expect(findThinSeries([post('solo')]).size).toBe(0)
  })
})

describe('selectVisiblePosts', () => {
  const posts = [
    post('thin-published', { series: 'thin', part: 1 }),
    post('thin-draft', { series: 'thin', part: 2, published: false }),
    post('full-1', { series: 'full', part: 1 }),
    post('full-2', { series: 'full', part: 2 }),
    post('solo'),
  ]

  it('production: a thin series published part becomes a standalone post', () => {
    const visible = selectVisiblePosts(posts, false)
    const part = visible.find((p) => p.slug === 'thin-published')
    expect(part?.data.series).toBeUndefined()
    expect(part?.data.part).toBeUndefined()
  })

  it('production: drafts are absent, a series with 2+ published parts stays', () => {
    const visible = selectVisiblePosts(posts, false)
    expect(visible.map((p) => p.slug)).not.toContain('thin-draft')
    expect(visible.find((p) => p.slug === 'full-1')?.data.series).toBe('full')
    expect(visible.find((p) => p.slug === 'full-2')?.data.part).toBe(2)
  })

  it('production: a series of drafts only leaves nothing behind', () => {
    const drafts = [post('d', { series: 'x', published: false })]
    expect(selectVisiblePosts(drafts, false)).toEqual([])
  })

  it('dev: everything shows and nothing is rewritten', () => {
    const visible = selectVisiblePosts(posts, true)
    expect(visible).toHaveLength(posts.length)
    expect(visible.find((p) => p.slug === 'thin-published')?.data.series).toBe(
      'thin',
    )
  })

  it('does not mutate the input posts', () => {
    selectVisiblePosts(posts, false)
    expect(posts[0].data.series).toBe('thin')
  })
})

describe('isVisiblePost', () => {
  it('hides a draft in production and shows it in dev', () => {
    const draft = post('d', { published: false })
    expect(isVisiblePost(draft, false)).toBe(false)
    expect(isVisiblePost(draft, true)).toBe(true)
  })
})
