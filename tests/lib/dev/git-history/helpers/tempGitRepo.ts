import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { simpleGit } from 'simple-git'

export function makeTempRepo(): string {
  return mkdtempSync(join(tmpdir(), `git-history-${randomUUID()}-`))
}

export function cleanupTempRepo(dir: string): void {
  rmSync(dir, { recursive: true, force: true })
}

/** Initializes a git repo with user identity (CI needs both). */
export async function initRepo(dir: string): Promise<ReturnType<typeof simpleGit>> {
  const git = simpleGit({ baseDir: dir })
  await git.init()
  await git.addConfig('user.email', 'test@example.com')
  await git.addConfig('user.name', 'Test')
  await git.addConfig('commit.gpgsign', 'false')
  return git
}

export function writeContentFile(dir: string, relPath: string, body: string): void {
  const full = join(dir, relPath)
  mkdirSync(join(full, '..'), { recursive: true })
  writeFileSync(full, body, 'utf8')
}
