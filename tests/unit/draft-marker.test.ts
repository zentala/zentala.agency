/**
 * Guards the F2-E draft markers at source level: the rule styling, and that every
 * template placing the `state` name sits inside a size container (without one the
 * `@container` query in DraftBadge never matches and the name never shows).
 */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (path: string) => readFileSync(path, 'utf8')
const badge = read('src/components/primitives/DraftBadge.astro')

describe('DraftBadge rule', () => {
  it('draws a dashed 1px line for a draft and a solid one for a review, never at the left edge', () => {
    expect(badge).toMatch(/\.draft-rule \{[^}]*border-left: 1px dashed/)
    expect(badge).toMatch(/\.draft-rule--review \{[^}]*border-left-style: solid/)
    expect(badge).toMatch(/\.draft-rule \{[^}]*margin-inline: 0\.5rem/)
  })
  it('keeps the state name on one line', () => {
    expect(badge).toMatch(/\.draft-state \{[^}]*white-space: nowrap/)
  })
  it('keeps the state name on one line', () => {
    expect(badge).toMatch(/\.draft-state \{[^}]*white-space: nowrap/)
  })
  it('uses no colour per state', () => {
    expect(badge).not.toMatch(/draft-rule[^}]*color: var\(--color-(?!line-strong)/)
  })
})

describe('DraftBadge state name', () => {
  const users = [
    'src/components/cards/SeriesCard.astro',
  ]
  it.each(users)('%s provides a size container for the state query', (file) => {
    const source = read(file)
    expect(source).toContain('placement="state"')
    expect(source).toContain("SHOW_DRAFTS && '[container-type:inline-size]'")
  })
  it('the series card puts the rule in the column gap so draft titles do not shift', () => {
    const source = read('src/components/cards/SeriesCard.astro')
    expect(source).toMatch(/absolute inset-y-\[0\.2em\] -right-1[^"]*\[&_\.draft-rule\]:mx-0/)
  })
  it('the board series list renders the state name in every variant', () => {
    const source = read('src/components/design-board/blog-index/SeriesList.astro')
    expect(source).not.toMatch(/variant === 'date' && row\.isDraft/)
    expect(source).toContain('placement="state"')
  })
})

describe('published rows', () => {
  it('the series card number span gains `relative` only where drafts are shown', () => {
    const source = read('src/components/cards/SeriesCard.astro')
    expect(source).toContain("SHOW_DRAFTS && 'relative'")
  })
})
