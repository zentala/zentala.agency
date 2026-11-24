/**
 * Covers the /blog index (DB-6, layout F): data helper (draft filtering, series
 * order, part label) and the source of BlogIndex (seven posts plus archive cell,
 * no "latest" label).
 */
import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

interface TestPost {
  slug: string
  data: {
    title: string
    date: string
    published?: boolean
    series?: string
    part?: number
  }
}

const entry = (slug: string, date: string, data: Partial<TestPost['data']> = {}): TestPost => ({
  slug,
  data: { title: slug, date, ...data },
})

const collections = vi.hoisted(() => ({
  blog: [] as TestPost[],
  descriptions: [
    { slug: 'multi-interface', data: { title: 'Multi-Interface' } },
    { slug: 'agent-native-harness', data: { title: 'Harness' } },
  ],
}))

vi.mock('astro:content', () => ({
  getCollection: async (name: string) =>
    name === 'blog' ? collections.blog : collections.descriptions,
}))
vi.mock('@/config/blog', () => ({ SHOW_DRAFTS: false }))

const HARNESS = 'agent-native-harness'
const MULTI = 'multi-interface'

beforeEach(() => {
  collections.blog = [
    entry('old', '2026-01-01'),
    entry('m1', '2026-02-01', { series: MULTI, part: 1 }),
    entry('m2', '2026-03-01', { series: MULTI, part: 2 }),
    entry('h1', '2026-04-01', { series: HARNESS, part: 1 }),
    entry('h2', '2026-05-01', { series: HARNESS, part: 2 }),
    entry('h3-draft', '2026-06-01', { series: HARNESS, part: 3, published: false }),
    entry('draft', '2026-07-01', { published: false }),
    entry('lone', '2026-08-01', { series: 'solo', part: 1 }),
  ]
})

describe('loadBlogIndexData (production)', () => {
  it('lists published posts only, newest first', async () => {
    const { loadBlogIndexData } = await import('@/lib/blog/index-data')
    const data = await loadBlogIndexData()
    expect(data.latest.map((post) => post.slug)).toEqual([
      'lone',
      'h2',
      'h1',
      'm2',
      'm1',
      'old',
    ])
  })

  it('orders series by the fixed order, not by date', async () => {
    const { loadBlogIndexData } = await import('@/lib/blog/index-data')
    const data = await loadBlogIndexData()
    expect(data.series.map((item) => item.slug)).toEqual([HARNESS, MULTI])
    expect(data.series[0]?.parts).toHaveLength(2)
  })

  it('shows seven posts as cells before the archive cell', async () => {
    const { loadBlogIndexData, LATEST_COUNT } = await import('@/lib/blog/index-data')
    expect(LATEST_COUNT).toBe(7)
    collections.blog = Array.from({ length: 10 }, (_, i) =>
      entry(`p${i}`, `2026-01-${String(i + 1).padStart(2, '0')}`),
    )
    const data = await loadBlogIndexData()
    expect(data.latest.slice(0, LATEST_COUNT).map((post) => post.slug)).toEqual(
      ['p9', 'p8', 'p7', 'p6', 'p5', 'p4', 'p3'],
    )
    expect(data.latest).toHaveLength(10)
  })
})

describe('BlogIndex source', () => {
  const source = readFileSync('src/components/blog/index/BlogIndex.astro', 'utf8')
  const postCell = readFileSync('src/components/blog/index/PostCell.astro', 'utf8')

  it('shows seven posts, the first featured, then one archive cell', () => {
    expect(source).toContain('LATEST_COUNT')
    expect(source).toContain('data.latest.slice(0, LATEST_COUNT)')
    expect(source).toContain('featured={index === 0}')
    expect(source.match(/<ArchiveCell/g)).toHaveLength(1)
  })

  it('has no "latest" label and a two-line meta', () => {
    expect(source).not.toMatch(/latest (post|posts)/i)
    expect(postCell).toContain('Part {part} of')
    expect(postCell.match(/<p>/g)).toHaveLength(2)
  })

  it('has one implementation of each cell: the design board holds no copy', () => {
    for (const name of ['PostCell', 'SeriesBlock', 'ArchiveCell', 'StatusBadge']) {
      expect(() =>
        readFileSync(`src/components/design-board/blog-index/${name}.astro`),
      ).toThrow()
    }
  })
})
