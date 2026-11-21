import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { disableDeadLinks, disableDeadLinksInDist } from '../../../scripts/links/rewrite.mjs'

const DEAD = new Set(['https://dead.example/x'])
const dirs: string[] = []
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, { recursive: true, force: true })))

describe('disableDeadLinks', () => {
  it('turns a dead link into a span that keeps the text and records the href', () => {
    const { html, count } = disableDeadLinks(
      '<p>See <a href="https://dead.example/x" class="c" target="_blank">the <b>docs</b></a> now.</p>',
      DEAD,
    )
    expect(count).toBe(1)
    expect(html).toBe(
      '<p>See <span class="link-disabled" data-dead-href="https://dead.example/x">the <b>docs</b></span> now.</p>',
    )
    expect(html).not.toContain('<a ')
  })

  it('leaves live and own links untouched', () => {
    const source = '<a href="https://live.example/">live</a><a href="/about">own</a><a name="n">x</a>'
    expect(disableDeadLinks(source, DEAD)).toEqual({ html: source, count: 0 })
  })

  it('rewrites every occurrence and only the dead ones', () => {
    const { html, count } = disableDeadLinks(
      '<a href="https://dead.example/x">1</a> <a href="https://live.example/">2</a> <a href="https://dead.example/x#frag">3</a>',
      DEAD,
    )
    expect(count).toBe(2)
    expect(html).toBe(
      '<span class="link-disabled" data-dead-href="https://dead.example/x">1</span> <a href="https://live.example/">2</a> <span class="link-disabled" data-dead-href="https://dead.example/x#frag">3</span>',
    )
  })

  it('escapes the href in the data attribute', () => {
    const dead = new Set(['https://dead.example/?a=1&b=2'])
    const { html } = disableDeadLinks('<a href="https://dead.example/?a=1&amp;b=2">t</a>', dead)
    expect(html).toContain('data-dead-href="https://dead.example/?a=1&amp;b=2"')
  })

  it('empty: no dead keys or empty html changes nothing', () => {
    expect(disableDeadLinks('<a href="https://dead.example/x">t</a>', new Set()).count).toBe(0)
    expect(disableDeadLinks('', DEAD)).toEqual({ html: '', count: 0 })
  })
})

describe('disableDeadLinksInDist', () => {
  it('rewrites only the files that hold a dead link', () => {
    const dist = mkdtempSync(join(tmpdir(), 'links-rewrite-'))
    dirs.push(dist)
    mkdirSync(join(dist, 'a'))
    writeFileSync(join(dist, 'a', 'index.html'), '<a href="https://dead.example/x">t</a>')
    writeFileSync(join(dist, 'index.html'), '<a href="https://live.example/">t</a>')
    expect(disableDeadLinksInDist(dist, DEAD)).toEqual({ files: 1, links: 1 })
    expect(readFileSync(join(dist, 'a', 'index.html'), 'utf8')).toContain('link-disabled')
    expect(readFileSync(join(dist, 'index.html'), 'utf8')).toBe('<a href="https://live.example/">t</a>')
  })
})
