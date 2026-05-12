import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { simpleGit } from 'simple-git'
import {
  makeTempRepo,
  cleanupTempRepo,
  initRepo,
  writeContentFile,
} from './helpers/tempGitRepo'
import { _resetHistoryCache } from '@/lib/dev/git-history/getHistory'
import { getVersion, _resetVersionCache } from '@/lib/dev/git-history/getVersion'

let repoDir: string
let git: ReturnType<typeof simpleGit>
let sha1: string
let sha2: string
let renameSha: string

beforeAll(async () => {
  repoDir = makeTempRepo()
  git = await initRepo(repoDir)

  writeContentFile(
    repoDir,
    'src/content/blog/fixture.md',
    '---\ntitle: v1\n---\n# Hello v1\n\nBody one.\n',
  )
  await git.add('.')
  await git.commit('c1: v1')
  sha1 = (await git.revparse(['HEAD'])).trim()

  writeContentFile(
    repoDir,
    'src/content/blog/fixture.md',
    '---\ntitle: v2\n---\n# Hello v2\n\nBody two with [link](https://example.com).\n',
  )
  await git.add('.')
  await git.commit('c2: v2')
  sha2 = (await git.revparse(['HEAD'])).trim()

  await git.mv('src/content/blog/fixture.md', 'src/content/blog/renamed.md')
  await git.commit('c3: rename')
  renameSha = (await git.revparse(['HEAD'])).trim()

  // Bad frontmatter commit
  writeContentFile(
    repoDir,
    'src/content/blog/renamed.md',
    '---\ntitle: "unterminated\n---\n# body\n',
  )
  await git.add('.')
  await git.commit('c4: bad frontmatter')

  _resetHistoryCache()
  _resetVersionCache()
})

afterAll(() => {
  cleanupTempRepo(repoDir)
})

describe('getVersion integration', () => {
  it('returns body+frontmatter+html for v1', async () => {
    const result = await getVersion('blog', 'renamed', sha1, repoDir)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.payload.frontmatter.title).toBe('v1')
    expect(result.payload.body).toContain('Hello v1')
    expect(result.payload.html).toContain('<h1')
  })

  it('returns body+frontmatter+html for v2 with rename-aware lookup', async () => {
    const result = await getVersion('blog', 'renamed', sha2, repoDir)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    // pathAtCommit at sha2 was still fixture.md
    expect(result.payload.pathAtCommit).toBe('src/content/blog/fixture.md')
    expect(result.payload.frontmatter.title).toBe('v2')
    expect(result.payload.html).toContain('<a href="https://example.com"')
  })

  it('rescues malformed frontmatter and still returns body+html', async () => {
    const head = (await git.revparse(['HEAD'])).trim()
    const result = await getVersion('blog', 'renamed', head, repoDir)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.payload.warnings.some((w) => w.includes('frontmatter parse failed'))).toBe(true)
    expect(result.payload.frontmatter).toEqual({})
    expect(result.payload.html).toContain('<h1')
  })

  it('returns 404-shaped result for SHA not in history', async () => {
    const result = await getVersion('blog', 'renamed', 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeef', repoDir)
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.status).toBe(404)
    expect(result.payload.warnings[0]).toContain('sha not in current history')
  })

  it('uses cache on second call', async () => {
    _resetVersionCache()
    const a = await getVersion('blog', 'renamed', sha1, repoDir)
    const b = await getVersion('blog', 'renamed', sha1, repoDir)
    expect(a.ok && b.ok).toBe(true)
    if (a.ok && b.ok) {
      expect(a.cacheHit).toBe(false)
      expect(b.cacheHit).toBe(true)
    }
  })

  it('serves rename: pathAtCommit before rename returns content correctly', async () => {
    const result = await getVersion('blog', 'renamed', renameSha, repoDir)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.payload.pathAtCommit).toBe('src/content/blog/renamed.md')
  })
})
