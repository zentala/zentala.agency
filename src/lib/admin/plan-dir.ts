/**
 * Locates the private plan folder (`.plan/`) for the dev-only admin pages.
 * Used only by /admin and the dev answers endpoint, never by a production page.
 */
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'

/** Environment variable that overrides the located plan folder. */
export const PLAN_DIR_ENV = 'ADMIN_PLAN_DIR'

/**
 * The plan folder: `ADMIN_PLAN_DIR` when set, otherwise `.plan/` next to the shared `.git`
 * folder. In a linked worktree that is the MAIN checkout's `.plan/`; on a plain clone it is
 * the clone's own.
 * @param cwd a folder inside the repository (default: the process folder)
 */
export function resolvePlanDir(cwd = process.cwd()): string {
  const override = process.env[PLAN_DIR_ENV]
  if (override) return override
  const commonDir = execFileSync(
    'git',
    ['rev-parse', '--path-format=absolute', '--git-common-dir'],
    { cwd, encoding: 'utf8' },
  ).trim()
  return join(dirname(commonDir), '.plan')
}
