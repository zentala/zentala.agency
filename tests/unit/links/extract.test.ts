import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { extractFromHtml, extractLinks, linkKey } from '../../../scripts/links/extract.mjs'

const dirs: string[] = []
function makeDist(files: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), 'links-dist-'))
  dirs.push(dir)
  for (const [path, html] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true })
    writeFileSync(join(dir, path), html)
  }
  return dir
}
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true })))

describe('linkKey', () => {
  it('keeps outgoing http(s) links and drops the fragment', () => {
    expect(linkKey('https://example.com/a#top')).toBe('https://example.com/a')
  })
  it.each([
    'mailto:me@example.com',
    'tel:+48123',
    '#anchor',
    '/relative',
    'relative/path',
    'https://zentala.agency/about',
    'https://www.zentala.agency/',
    'http://zentala.internal/x',
    'javascript:void(0)',
    'http://',
  ])('skips %s', (href) => {
    expect(linkKey(href)).toBeNull()
  })
  it('resolves protocol-relative links against the page', () => {
    expect(linkKey('//example.com/x')).toBe('https://example.com/x')
  })
  it('treats a sibling subdomain as outgoing', () => {
    expect(linkKey('https://hub.zentala.agency/')).toBe('https://hub.zentala.agency/')
  })
})

describe('extractFromHtml', () => {
  it('happy: collects outgoing anchors once each', () => {
    const html =
      '<a href="https://a.com/">1</a><a href="https://a.com/#x">2</a><a href="https://b.com">3</a>'
    expect(extractFromHtml(html)).toEqual(['https://a.com/', 'https://b.com/'])
  })
  it('nil: anchors without href and non-anchor tags yield nothing', () => {
    const html =
      '<a>no href</a><a name="x"></a><link href="https://a.com/"><img src="https://a.com/i.png">'
    expect(extractFromHtml(html)).toEqual([])
  })
  it('empty: an empty document yields nothing', () => {
    expect(extractFromHtml('')).toEqual([])
  })
  it('decodes entities in the href', () => {
    expect(extractFromHtml('<a href="https://a.com/?x=1&amp;y=2">t</a>')).toEqual([
      'https://a.com/?x=1&y=2',
    ])
  })
})

describe('extractLinks', () => {
  it('happy: maps each link to the pages it appears on', () => {
    const dist = makeDist({
      'index.html': '<a href="https://a.com/">a</a><a href="/about">own</a>',
      'about/index.html': '<a href="https://a.com/">a</a><a href="https://b.com/">b</a>',
      '404.html': '<p>none</p>',
    })
    const { links, pageCount } = extractLinks(dist)
    expect(pageCount).toBe(3)
    expect(Object.fromEntries(links)).toEqual({
      'https://a.com/': ['/', '/about/'],
      'https://b.com/': ['/about/'],
    })
  })
  it('empty: a dist without HTML has zero pages and no links', () => {
    const dist = makeDist({ 'style.css': 'a{}' })
    expect(extractLinks(dist)).toEqual({ links: new Map(), pageCount: 0 })
  })
  it('error: a missing dist throws a readable error', () => {
    expect(() => extractLinks(join(tmpdir(), 'links-no-such-dist'))).toThrow(
      /Cannot read build output/,
    )
  })
})
