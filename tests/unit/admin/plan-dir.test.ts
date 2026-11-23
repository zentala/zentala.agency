import { execFileSync } from 'node:child_process'
import { mkdtempSync, realpathSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { PLAN_DIR_ENV, resolvePlanDir } from '@/lib/admin/plan-dir'

const git = (cwd: string, ...args: string[]) =>
  execFileSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...args], { cwd, stdio: 'pipe' })

let root: string
let repo: string
let linked: string

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), 'plan-dir-'))
  repo = join(root, 'repo')
  linked = join(root, 'linked')
  git(root, 'init', '-q', repo)
  git(repo, 'commit', '--allow-empty', '-q', '-m', 'init')
  git(repo, 'worktree', 'add', '-q', '-b', 'side', linked)
})

afterAll(() => rmSync(root, { recursive: true, force: true }))
afterEach(() => delete process.env[PLAN_DIR_ENV])

describe('resolvePlanDir', () => {
  it('is the clone own .plan on a plain repository', () => {
    expect(resolvePlanDir(repo).replaceAll('\\', '/').toLowerCase()).toBe(
      join(realpathSync(repo), '.plan').replaceAll('\\', '/').toLowerCase(),
    )
  })

  it('is the MAIN checkout .plan from a linked worktree', () => {
    expect(resolvePlanDir(linked).replaceAll('\\', '/').toLowerCase()).toBe(
      join(realpathSync(repo), '.plan').replaceAll('\\', '/').toLowerCase(),
    )
  })

  it('prefers ADMIN_PLAN_DIR when set', () => {
    process.env[PLAN_DIR_ENV] = join(root, 'elsewhere')
    expect(resolvePlanDir(repo)).toBe(join(root, 'elsewhere'))
  })
})
