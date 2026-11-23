import { describe, expect, it } from 'vitest'
import { formatAnswerLine } from '@/lib/admin/answer-text'
import { buildBoard } from '@/lib/admin/board'
import { parseDecide } from '@/lib/admin/decide'

const TEXT = [
  '## Pierwsza',
  '- [ ] 2026-11-23 · A-1: raz · options: A tak',
  '- [ ] 2026-11-23 · A-2: dwa · options: A tak',
  '- [x] 2026-11-23 · A-3: zrobione · options: A tak',
  '## Druga',
  '- [ ] 2026-11-23 · B-1: trzy · options: A tak',
  '- [ ] 2026-11-23 · (później) B-2: później · options: A tak',
].join('\n')
const { items } = parseDecide(TEXT)

describe('buildBoard', () => {
  it('groups asked items in file order, sets deferred apart and skips done ones', () => {
    const board = buildBoard(items, [])
    expect(board.groups.map((g) => [g.name, g.items.map((i) => i.id)])).toEqual([
      ['Pierwsza', ['A-1', 'A-2']],
      ['Druga', ['B-1']],
    ])
    expect(board.deferred.map((i) => i.id)).toEqual(['B-2'])
    expect(board.openCount).toBe(3)
    expect(board.answeredCount).toBe(0)
  })

  it('counts saved answers only for asked items', () => {
    const at = '2026-11-23T10:00:00.000Z'
    const board = buildBoard(items, [
      { at, id: 'A-1', choice: 'A', note: '' },
      { at, id: 'B-2', choice: 'A', note: '' },
      { at, id: 'GONE', choice: 'A', note: '' },
    ])
    expect(board.answeredCount).toBe(1)
    expect(board.groups[0].answered).toBe(1)
  })

  it('is empty for no items', () => {
    expect(buildBoard([], [])).toEqual({ groups: [], deferred: [], openCount: 0, answeredCount: 0 })
  })
})

describe('formatAnswerLine', () => {
  it('writes id, choice and a flattened note', () => {
    expect(formatAnswerLine('E008-1', 'A', '')).toBe('E008-1: A')
    expect(formatAnswerLine('E008-1', 'A', ' zmień\nkolory  ')).toBe('E008-1: A — zmień kolory')
  })
})
