import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { containsUrl, locateUrls, urlSpellings } from '@/lib/links/source-map'

const dirs: string[] = []
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true })))

function project(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'source-map-'))
  dirs.push(root)
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    writeFileSync(join(root, path), text, 'utf8')
  }
  return root
}

describe('locateUrls', () => {
  it('returns file and 1-based line for templates, data and content collections', () => {
    const root = project({
      'src/components/Footer.astro': '<a\n  href="https://dead.example/x"\n>x</a>',
      'src/content/blog/post.md': 'tekst\n\nZobacz [repo](https://github.com/a/b) tutaj',
      'src/data/links.ts': "export const L = 'https://dead.example/x'",
    })
    expect(locateUrls(['https://dead.example/x', 'https://github.com/a/b'], root)).toEqual({
      'https://dead.example/x': [
        { file: 'src/components/Footer.astro', line: 2 },
        { file: 'src/data/links.ts', line: 1 },
      ],
      'https://github.com/a/b': [{ file: 'src/content/blog/post.md', line: 3 }],
    })
  })

  it('matches the URL without the trailing slash the checker added, and escaped ampersands', () => {
    const root = project({
      'src/a.astro': 'href="https://site.example"\nhref="https://q.example/?a=1&amp;b=2"',
    })
    const found = locateUrls(['https://site.example/', 'https://q.example/?a=1&b=2'], root)
    expect(found['https://site.example/']).toEqual([{ file: 'src/a.astro', line: 1 }])
    expect(found['https://q.example/?a=1&b=2']).toEqual([{ file: 'src/a.astro', line: 2 }])
  })

  it('does not match a longer URL that only starts with the dead one', () => {
    const root = project({ 'src/a.astro': 'https://x.example/foobar\nhttps://x.example/foo' })
    expect(locateUrls(['https://x.example/foo'], root)['https://x.example/foo']).toEqual([
      { file: 'src/a.astro', line: 2 },
    ])
  })

  it('maps a URL found nowhere to an empty list and survives a missing src folder', () => {
    const root = project({ 'src/a.astro': 'nothing' })
    expect(locateUrls(['https://gone.example/'], root)).toEqual({ 'https://gone.example/': [] })
    expect(locateUrls(['https://gone.example/'], join(root, 'nowhere'))).toEqual({
      'https://gone.example/': [],
    })
  })

  it('ignores files that are not text sources', () => {
    const root = project({ 'src/a.png': 'https://x.example/', 'src/b.astro': 'ok' })
    expect(locateUrls(['https://x.example/'], root)['https://x.example/']).toEqual([])
  })
})

describe('helpers', () => {
  it('lists the spellings once each', () => {
    expect(urlSpellings('https://a.example/')).toEqual(['https://a.example/', 'https://a.example'])
    expect(urlSpellings('https://a.example/p')).toEqual(['https://a.example/p'])
  })

  it('containsUrl accepts a URL followed by a quote or end of line only', () => {
    expect(containsUrl('"https://a.example/p"', 'https://a.example/p')).toBe(true)
    expect(containsUrl('https://a.example/p2', 'https://a.example/p')).toBe(false)
  })
})
