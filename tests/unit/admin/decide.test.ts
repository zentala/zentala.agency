import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseDecide } from '@/lib/admin/decide'
import { readDecideFile } from '@/lib/admin/decide-file'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'

const FOUR_OPTIONS =
  '- [ ] 2026-11-21 · DB-4: Nagłówek sekcji (T4) — porównaj warianty przełącznikiem „Warianty” · options: A wariant A → najprostszy / B wariant B → pośredni / C (recommended) wariant C → najbliższy temu, co wskazywałeś / D wariant D → najmocniejszy · blocks: E007-T29 · from: Claude, sesja design review · link: http://agency.internal/about/capabilities/backstage'
const DEFERRED =
  '- [ ] 2026-11-21 · (później) INF-3: gh auth login na mITX — agenci nie mogą wypychać · options: A (recommended) uruchom raz → agenci wypychają / B tylko z mATX · blocks: push z mITX · from: Claude'

const sample = (...lines: string[]) => ['# Waiting', '', '## Grupa jeden', ...lines].join('\n')

describe('parseDecide', () => {
  it('reads a real-style line with four options, a link and Polish characters', () => {
    const { items, errors } = parseDecide(sample(FOUR_OPTIONS))
    expect(errors).toEqual([])
    expect(items).toHaveLength(1)
    const [item] = items
    expect(item).toMatchObject({
      id: 'DB-4',
      date: '2026-11-21',
      title: 'Nagłówek sekcji (T4)',
      question: 'porównaj warianty przełącznikiem „Warianty”',
      blocks: 'E007-T29',
      from: 'Claude, sesja design review',
      link: 'http://agency.internal/about/capabilities/backstage',
      group: 'Grupa jeden',
      deferred: false,
      done: false,
    })
    expect(item.options.map((o) => o.letter)).toEqual(['A', 'B', 'C', 'D'])
    expect(item.options.find((o) => o.recommended)?.letter).toBe('C')
    expect(item.options[2].text).toBe('wariant C')
    expect(item.options[2].consequence).toBe('najbliższy temu, co wskazywałeś')
  })

  it('keeps an option without a consequence and the optional question absent', () => {
    const line =
      '- [ ] 2026-11-23 · X-1: Tylko tytuł · options: A (recommended) zrobić to / B nie robić → nic się nie dzieje'
    const [item] = parseDecide(sample(line)).items
    expect(item.question).toBeUndefined()
    expect(item.options[0]).toEqual({ letter: 'A', recommended: true, text: 'zrobić to' })
    expect(item.options[1].consequence).toBe('nic się nie dzieje')
  })

  it('marks a (później) item deferred and strips the marker from the title', () => {
    const [item] = parseDecide(sample(DEFERRED)).items
    expect(item.deferred).toBe(true)
    expect(item.id).toBe('INF-3')
    expect(item.title).toBe('gh auth login na mITX')
  })

  it('assigns each item to the nearest preceding heading', () => {
    const text = ['## Pierwsza', FOUR_OPTIONS, '', '## Druga', DEFERRED].join('\n')
    expect(parseDecide(text).items.map((i) => i.group)).toEqual(['Pierwsza', 'Druga'])
  })

  it('keeps unknown keys', () => {
    const line = '- [ ] 2026-11-23 · X-2: T · options: A tak · owner: ktoś'
    expect(parseDecide(sample(line)).items[0].extra).toEqual({ owner: 'ktoś' })
  })

  it('returns a malformed line raw with a reason, never dropping it', () => {
    const bad = '- [ ] wczoraj · X-3: zła data · options: A tak'
    const noOptions = '- [ ] 2026-11-23 · X-4: złe opcje · options: tak lub nie'
    const { items, errors } = parseDecide(sample(bad, FOUR_OPTIONS, noOptions))
    expect(items).toHaveLength(1)
    expect(errors.map((e) => e.raw)).toEqual([bad, noOptions])
    expect(errors[0].error).toMatch(/date/)
    expect(errors[1].error).toMatch(/options/)
  })

  it('treats an empty file and a file with no item lines as empty, not an error', () => {
    expect(parseDecide('')).toEqual({ items: [], errors: [] })
    expect(parseDecide('# Waiting\n\nprose only\n')).toEqual({ items: [], errors: [] })
  })

  it('reads a ticked item as done', () => {
    const line = FOUR_OPTIONS.replace('- [ ]', '- [x]')
    expect(parseDecide(sample(line)).items[0].done).toBe(true)
  })

  it('reads CRLF files', () => {
    const { items, errors } = parseDecide(sample(FOUR_OPTIONS, DEFERRED).replaceAll('\n', '\r\n'))
    expect(errors).toEqual([])
    expect(items).toHaveLength(2)
  })
})

describe('readDecideFile', () => {
  it('flags a missing file instead of throwing', () => {
    const result = readDecideFile(join(tmpdir(), 'no-such-plan-dir-xyz'))
    expect(result.missing).toBe(true)
    expect(result.items).toEqual([])
    expect(result.path.endsWith('DECIDE.md')).toBe(true)
  })

  it('parses a file on disk and reports its date', () => {
    const dir = mkdtempSync(join(tmpdir(), 'decide-'))
    try {
      writeFileSync(join(dir, 'DECIDE.md'), sample(FOUR_OPTIONS), 'utf8')
      const result = readDecideFile(dir)
      expect(result.missing).toBe(false)
      expect(result.items).toHaveLength(1)
      expect(result.modifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

/** The private plan is not in the public repo: this runs where the plan checkout exists. */
const REAL_FILE = join(process.cwd(), '..', '..', 'DECIDE.md')
describe.skipIf(!existsSync(REAL_FILE))('the real .plan/DECIDE.md', () => {
  it('parses every item line with zero unreadable lines', () => {
    const text = readFileSync(REAL_FILE, 'utf8')
    const lines = text.split(/\r?\n/).filter((l) => l.startsWith('- ['))
    const { items, errors } = parseDecide(text)
    expect(errors).toEqual([])
    expect(items).toHaveLength(lines.length)
    expect(lines.length).toBeGreaterThan(0)
  })
})
