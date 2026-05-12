import { describe, it, expect } from 'vitest'
import { parseGitLog, resolveRenamePath } from '@/lib/dev/git-history/parseGitLog'

const single = [
  '__COMMIT__',
  'abc1234567890abcdef1234567890abcdef12345',
  '2026-05-01 12:00:00 +0000',
  'initial commit',
  '10\t0\tsrc/content/blog/foo.md',
  '',
].join('\n')

const multi = [
  '__COMMIT__',
  'aaaa11122223333444455556666777788889999a',
  '2026-05-03 12:00:00 +0000',
  'fix typo',
  '1\t1\tsrc/content/blog/foo.md',
  '',
  '__COMMIT__',
  'bbbb22233334444555566667777888899990000b',
  '2026-05-02 12:00:00 +0000',
  'rewrite',
  '50\t30\tsrc/content/blog/foo.md',
  '',
].join('\n')

describe('parseGitLog', () => {
  it('parses a single-commit log', () => {
    const out = parseGitLog(single)
    expect(out).toHaveLength(1)
    expect(out[0].sha).toBe('abc1234567890abcdef1234567890abcdef12345')
    expect(out[0].shortSha).toBe('abc1234')
    expect(out[0].linesAdded).toBe(10)
    expect(out[0].linesRemoved).toBe(0)
    expect(out[0].pathAtCommit).toBe('src/content/blog/foo.md')
    expect(out[0].message).toBe('initial commit')
  })

  it('parses a multi-commit log preserving order', () => {
    const out = parseGitLog(multi)
    expect(out).toHaveLength(2)
    expect(out[0].message).toBe('fix typo')
    expect(out[1].message).toBe('rewrite')
  })

  it('extracts pathAtCommit from {old => new} rename marker', () => {
    const out = parseGitLog(
      ['__COMMIT__', 'cccc1', '2026-05-04 00:00:00 +0000', 'rename', '5\t2\tsrc/content/blog/{old.md => new.md}', ''].join('\n'),
    )
    expect(out[0].pathAtCommit).toBe('src/content/blog/new.md')
  })

  it('extracts pathAtCommit from "path1 => path2" rename form', () => {
    const out = parseGitLog(
      ['__COMMIT__', 'dddd1', '2026-05-04 00:00:00 +0000', 'rename2', '3\t1\told/path.md => new/path.md', ''].join('\n'),
    )
    expect(out[0].pathAtCommit).toBe('new/path.md')
  })

  it('handles a commit with subject containing "__COMMIT__"', () => {
    const tricky = [
      '__COMMIT__',
      'eeeee1',
      '2026-05-05 00:00:00 +0000',
      'mentions __COMMIT__ in subject',
      '2\t0\tfile.md',
      '',
    ].join('\n')
    const out = parseGitLog(tricky)
    expect(out).toHaveLength(1)
    expect(out[0].message).toBe('mentions __COMMIT__ in subject')
  })

  it('returns empty array for empty input', () => {
    expect(parseGitLog('')).toEqual([])
  })

  it('parses numstat with binary marker "-" gracefully', () => {
    const bin = [
      '__COMMIT__',
      'ffff1',
      '2026-05-06 00:00:00 +0000',
      'binary',
      '-\t-\timage.png',
      '',
    ].join('\n')
    const out = parseGitLog(bin)
    expect(out[0].linesAdded).toBe(0)
    expect(out[0].linesRemoved).toBe(0)
  })
})

describe('resolveRenamePath', () => {
  it('returns plain path unchanged', () => {
    expect(resolveRenamePath('src/foo.md')).toBe('src/foo.md')
  })
  it('handles brace rename', () => {
    expect(resolveRenamePath('src/{a.md => b.md}')).toBe('src/b.md')
  })
  it('handles arrow rename', () => {
    expect(resolveRenamePath('a.md => b.md')).toBe('b.md')
  })
})
