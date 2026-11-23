import { describe, expect, it } from 'vitest'
import { parseDecide } from '@/lib/admin/decide'
import { localizeLink } from '@/lib/admin/local-link'

const line = (rest: string) => `- [ ] 2026-11-23 · X-1: Tytuł — pytanie${rest}`
const parse = (text: string) => parseDecide(['## G', text].join('\n'))

describe('option preview link', () => {
  it('strips [podgląd: url] from text and consequence into preview, keeping the " / " split', () => {
    const { items, errors } = parse(
      line(
        ' · options: A (recommended) kształt T → skutek [podgląd: http://agency.internal/mockups/capabilities#t1-a] / B litera W [podgląd: http://agency.internal/mockups/capabilities#w1-b] · blocks: E007',
      ),
    )
    expect(errors).toEqual([])
    const [a, b] = items[0].options
    expect(a).toEqual({
      letter: 'A',
      recommended: true,
      text: 'kształt T',
      consequence: 'skutek',
      preview: 'http://agency.internal/mockups/capabilities#t1-a',
    })
    expect(b).toMatchObject({ letter: 'B', text: 'litera W', preview: 'http://agency.internal/mockups/capabilities#w1-b' })
    expect(b.consequence).toBeUndefined()
    expect(items[0].blocks).toBe('E007')
  })

  it('leaves an option without a preview untouched', () => {
    const [option] = parse(line(' · options: A zwykła → skutek')).items[0].options
    expect(option).toEqual({ letter: 'A', recommended: false, text: 'zwykła', consequence: 'skutek' })
    expect('preview' in option).toBe(false)
  })

  it('drops an empty preview URL without an error', () => {
    const { items, errors } = parse(line(' · options: A tekst [podgląd: ] / B drugi [podgląd:]'))
    expect(errors).toEqual([])
    expect(items[0].options.map((o) => [o.text, o.preview])).toEqual([
      ['tekst', undefined],
      ['drugi', undefined],
    ])
  })
})

describe('question item', () => {
  it('reads a line without options as a question', () => {
    const { items, errors } = parse(line(' · blocks: nic · from: Claude'))
    expect(errors).toEqual([])
    expect(items[0]).toMatchObject({ id: 'X-1', kind: 'question', options: [], question: 'pytanie', blocks: 'nic' })
  })

  it('marks a line with options as a choice', () => {
    expect(parse(line(' · options: A tak')).items[0].kind).toBe('choice')
  })

  it('still reports malformed lines as errors', () => {
    expect(parse(line(' · options: tak lub nie')).errors).toHaveLength(1)
    expect(parse(line(' · options: ')).errors).toHaveLength(1)
    expect(parse('- [ ] nie-data · X-1: T').errors).toHaveLength(1)
    expect(parse(line(' · bez klucza')).errors).toHaveLength(1)
  })
})

describe('localizeLink', () => {
  it('makes the three dev hosts site-relative, keeping path, query and hash', () => {
    expect(localizeLink('http://agency.internal/mockups/x#y')).toBe('/mockups/x#y')
    expect(localizeLink('http://agency.matx.lan/mockups/x?a=1')).toBe('/mockups/x?a=1')
    expect(localizeLink('http://agency.matx.lan:4300/admin/decisions')).toBe('/admin/decisions')
    expect(localizeLink('http://agency.internal')).toBe('/')
  })

  it('keeps other hosts absolute and renders nothing for a missing link', () => {
    expect(localizeLink('https://zentala.agency/blog')).toBe('https://zentala.agency/blog')
    expect(localizeLink('http://agency.internal.evil.example/x')).toBe('http://agency.internal.evil.example/x')
    expect(localizeLink('http://agency.matx.lan:9999/x')).toBe('http://agency.matx.lan:9999/x')
    expect(localizeLink(undefined)).toBeUndefined()
    expect(localizeLink('')).toBeUndefined()
  })
})
