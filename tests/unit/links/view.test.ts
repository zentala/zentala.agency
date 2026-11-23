import { describe, expect, it } from 'vitest'
import type { CheckedLink } from '@/lib/links/report'
import { groupDeadByPage, isStale, reportAgeDays, statusShares } from '@/lib/links/view'

const link = (url: string, status: CheckedLink['status'], pages: string[]): CheckedLink => ({
  url,
  status,
  code: status === 'ok' ? 200 : 404,
  error: null,
  pages,
  checkedAt: '2026-11-21T10:00:00.000Z',
})

describe('groupDeadByPage', () => {
  it('groups dead links under every page that holds them, busiest page first', () => {
    const groups = groupDeadByPage([
      link('https://a.example/', 'dead', ['/', '/blog']),
      link('https://b.example/', 'dead', ['/blog']),
      link('https://c.example/', 'ok', ['/blog']),
      link('https://d.example/', 'unverified', ['/']),
    ])
    expect(groups.map((g) => [g.page, g.links.map((l) => l.url)])).toEqual([
      ['/blog', ['https://a.example/', 'https://b.example/']],
      ['/', ['https://a.example/']],
    ])
  })

  it('is empty for no links and for links that are all alive', () => {
    expect(groupDeadByPage([])).toEqual([])
    expect(groupDeadByPage([link('https://x.example/', 'ok', ['/'])])).toEqual([])
  })
})

describe('statusShares', () => {
  it('always adds up to 100', () => {
    const shares = statusShares({ total: 3, dead: 1, unverified: 1, ok: 1 })
    expect(shares.dead + shares.unverified + shares.ok).toBe(100)
    const odd = statusShares({ total: 7, dead: 2, unverified: 3, ok: 2 })
    expect(odd.dead + odd.unverified + odd.ok).toBe(100)
  })

  it('gives a rare status its rounded share and zeros an empty report', () => {
    expect(statusShares({ total: 100, dead: 6, unverified: 0, ok: 94 })).toEqual({ dead: 6, unverified: 0, ok: 94 })
    expect(statusShares({ total: 0, dead: 0, unverified: 0, ok: 0 })).toEqual({ dead: 0, unverified: 0, ok: 0 })
  })
})

describe('staleness', () => {
  const now = new Date('2026-11-23T12:00:00.000Z')
  it('is stale from seven days on', () => {
    expect(reportAgeDays({ generatedAt: '2026-11-22T12:00:00.000Z' }, now)).toBe(1)
    expect(isStale({ generatedAt: '2026-11-17T12:00:00.000Z' }, now)).toBe(false)
    expect(isStale({ generatedAt: '2026-11-16T12:00:00.000Z' }, now)).toBe(true)
  })

  it('treats a report from the future as age zero', () => {
    expect(reportAgeDays({ generatedAt: '2026-12-01T00:00:00.000Z' }, now)).toBe(0)
  })
})
