import { describe, it, expect } from 'vitest'
import { summarizeHistory } from '@/components/react-stuff/dev/blog-version-panel/summarizeHistory'
import type { HistoryEntry } from '@/lib/dev/git-history/types'

function entry(sha: string, isMajor: boolean): HistoryEntry {
  return {
    sha,
    shortSha: sha.slice(0, 7),
    date: '2026-01-01T00:00:00Z',
    message: 'msg',
    pathAtCommit: 'foo.md',
    linesAdded: 1,
    linesRemoved: 0,
    percentChanged: 5,
    isMajor,
  }
}

describe('summarizeHistory', () => {
  it('pluralizes correctly for many', () => {
    expect(summarizeHistory([entry('a', true), entry('b', true), entry('c', false), entry('d', false), entry('e', false)])).toBe(
      '5 revisions · 2 major',
    )
  })
  it('singular for one', () => {
    expect(summarizeHistory([entry('a', false)])).toBe('1 revision · 0 major')
  })
  it('zero', () => {
    expect(summarizeHistory([])).toBe('0 revisions · 0 major')
  })
})
