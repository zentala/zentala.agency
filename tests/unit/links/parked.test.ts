import { describe, expect, it } from 'vitest'
import type { Element, Root } from 'hast'
import type { ParkedLink } from '@/data/parked-links'
import { findParkedLink, isParkedLink } from '@/lib/links/parked'
import { rehypeParkedLinks } from '@/lib/links/rehype-parked-links'

const list: ParkedLink[] = [
  { url: 'https://dead.example/', reason: 'gone', reenableWhen: 'back' },
]

const anchor = (href: string | undefined, text: string): Element => ({
  type: 'element',
  tagName: 'a',
  properties: href === undefined ? {} : { href },
  children: [{ type: 'text', value: text }],
})

const paragraph = (...children: Element[]): Root => ({
  type: 'root',
  children: [{ type: 'element', tagName: 'p', properties: {}, children }],
})

const run = (tree: Root, parked: ParkedLink[] = list) => {
  rehypeParkedLinks({ list: parked })(tree)
  return (tree.children[0] as Element).children
}

describe('findParkedLink', () => {
  it('matches with and without the trailing slash', () => {
    expect(isParkedLink('https://dead.example', list)).toBe(true)
    expect(isParkedLink('https://dead.example/', list)).toBe(true)
    expect(findParkedLink('https://dead.example', list)?.reason).toBe('gone')
  })
  it('does not match other links', () => {
    expect(isParkedLink('https://alive.example/', list)).toBe(false)
  })
  it('does not match a missing or empty href', () => {
    expect(isParkedLink(undefined, list)).toBe(false)
    expect(isParkedLink(null, list)).toBe(false)
    expect(isParkedLink('', list)).toBe(false)
  })
  it('matches nothing with an empty list', () => {
    expect(isParkedLink('https://dead.example/', [])).toBe(false)
  })
})

describe('rehypeParkedLinks', () => {
  it('unwraps a parked link into its text', () => {
    expect(run(paragraph(anchor('https://dead.example', 'the repo')))).toEqual([
      { type: 'text', value: 'the repo' },
    ])
  })
  it('leaves a link that is not parked', () => {
    const link = anchor('https://alive.example/', 'fine')
    expect(run(paragraph(link))).toEqual([link])
  })
  it('leaves an anchor with a missing or empty href', () => {
    const noHref = anchor(undefined, 'anchor')
    const empty = anchor('', 'empty')
    expect(run(paragraph(noHref, empty))).toEqual([noHref, empty])
  })
  it('changes nothing when the list is empty', () => {
    const link = anchor('https://dead.example/', 'kept')
    expect(run(paragraph(link), [])).toEqual([link])
  })
})
