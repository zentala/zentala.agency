import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { join } from 'node:path'
import { simpleGit } from 'simple-git'
import {
  makeTempRepo,
  cleanupTempRepo,
  initRepo,
  writeContentFile,
} from './helpers/tempGitRepo'
import { getHistory, _resetHistoryCache } from '@/lib/dev/git-history/getHistory'

let repoDir: string
let git: ReturnType<typeof simpleGit>

beforeAll(async () => {
  repoDir = makeTempRepo()
  git = await initRepo(repoDir)
  // C1: initial fixture
  writeContentFile(repoDir, 'src/content/blog/fixture.md', '---\ntitle: v1\n---\nbody v1 line\n')
  await git.add('.')
  await git.commit('c1: initial')
  // C2: rewrite (>50% change)
  const big = '---\ntitle: v2\n---\n' + Array(80).fill('rewritten body line').join('\n') + '\n'
  writeContentFile(repoDir, 'src/content/blog/fixture.md', big)
  await git.add('.')
  await git.commit('c2: rewrite')
  // C3: typo
  writeContentFile(repoDir, 'src/content/blog/fixture.md', big.replace('rewritten', 'rewriten'))
  await git.add('.')
  await git.commit('c3: typo')
  // C4: rename
  await git.mv('src/content/blog/fixture.md', 'src/content/blog/renamed-fixture.md')
  await git.commit('c4: rename')
  // C5: edit after rename
  writeContentFile(repoDir, 'src/content/blog/renamed-fixture.md', big + '\nappended\n')
  await git.add('.')
  await git.commit('c5: edit after rename')
  _resetHistoryCache()
})

afterAll(() => {
  cleanupTempRepo(repoDir)
})

describe('getHistory integration', () => {
  it('returns 5 entries newest-first with rename-aware pathAtCommit', async () => {
    const { entries } = await getHistory('blog', 'renamed-fixture', repoDir)
    expect(entries).toHaveLength(5)
    expect(entries[0].message).toBe('c5: edit after rename')
    expect(entries[4].message).toBe('c1: initial')
    expect(entries[0].pathAtCommit).toBe('src/content/blog/renamed-fixture.md')
    expect(entries[4].pathAtCommit).toBe('src/content/blog/fixture.md')
  })

  it('classifies rewrite as major and typo as not major', async () => {
    const { entries } = await getHistory('blog', 'renamed-fixture', repoDir)
    const c2 = entries.find((e) => e.message === 'c2: rewrite')!
    const c3 = entries.find((e) => e.message === 'c3: typo')!
    expect(c2.isMajor).toBe(true)
    expect(c3.isMajor).toBe(false)
  })

  it('invalidates cache when HEAD moves', async () => {
    const before = await getHistory('blog', 'renamed-fixture', repoDir)
    writeContentFile(repoDir, 'src/content/blog/renamed-fixture.md', 'bumped\n')
    await git.add('.')
    await git.commit('c6: bump')
    const after = await getHistory('blog', 'renamed-fixture', repoDir)
    expect(after.entries.length).toBe(before.entries.length + 1)
  })

  it('returns warnings for unknown slug', async () => {
    const result = await getHistory('blog', 'does-not-exist', repoDir)
    expect(result.entries).toEqual([])
    expect(result.warnings).toContain('file not found in HEAD')
  })
})
