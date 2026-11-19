import { describe, expect, it } from 'vitest'
import { slugify } from '@/lib/blog/slug'
import { formatDate } from '@/lib/blog/format-date'
import { isVisiblePost } from '@/lib/blog/visibility'
import { partLabel } from '@/lib/blog/part-label'

describe('slugify', () => {
  it('lowercases and joins words with dashes', () => {
    expect(slugify('Agent Orchestration')).toBe('agent-orchestration')
  })

  it('turns & into and, without spaces or ampersands left', () => {
    expect(slugify('Knowledge & Leverage')).toBe('knowledge-and-leverage')
  })

  it('keeps an already simple name', () => {
    expect(slugify('DevEx')).toBe('devex')
  })

  it('handles empty input and stray punctuation', () => {
    expect(slugify('')).toBe('')
    expect(slugify('  -- IA! ')).toBe('ia')
  })
})

describe('formatDate', () => {
  it('formats as en-GB and returns the datetime attribute', () => {
    expect(formatDate('2026-03-08')).toEqual({
      datetime: '2026-03-08',
      label: '8 March 2026',
    })
  })

  it('uses UTC, so a late-evening instant keeps its day', () => {
    expect(formatDate('2026-01-31T23:30:00Z').label).toBe('31 January 2026')
  })

  it('honours an explicit locale', () => {
    expect(formatDate('2026-03-08', 'pl-PL').label).toBe('8 marca 2026')
  })
})

describe('isVisiblePost', () => {
  const published = { data: { published: true } }
  const unspecified = { data: {} }
  const draft = { data: { published: false } }

  it('shows published and unspecified posts everywhere', () => {
    expect(isVisiblePost(published, false)).toBe(true)
    expect(isVisiblePost(unspecified, false)).toBe(true)
  })

  it('hides a draft when drafts are not shown', () => {
    expect(isVisiblePost(draft, false)).toBe(false)
  })

  it('shows a draft when drafts are shown', () => {
    expect(isVisiblePost(draft, true)).toBe(true)
  })
})

describe('partLabel', () => {
  it('adds "of N" when the visible parts run 1..N', () => {
    expect(partLabel(14, Array.from({ length: 15 }, (_, i) => i + 1))).toBe(
      'Part 14 of 15',
    )
  })

  it('does not depend on the order of the parts', () => {
    expect(partLabel(1, [3, 1, 2])).toBe('Part 1 of 3')
  })

  it('drops "of N" when a part is missing', () => {
    expect(partLabel(14, [1, 2, 14, 15])).toBe('Part 14')
  })

  it('drops "of N" when the only visible part is not part 1', () => {
    expect(partLabel(9, [9])).toBe('Part 9')
  })

  it('reads "Part 1" for a lone first part', () => {
    expect(partLabel(1, [1])).toBe('Part 1')
  })

  it('falls back to "Part n" with no visible parts', () => {
    expect(partLabel(2, [])).toBe('Part 2')
  })
})
