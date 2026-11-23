/** Reads `.plan/DECIDE.md` from disk for the dev-only admin pages. */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parseDecide, type DecideParse } from './decide'

export const DECIDE_FILE = 'DECIDE.md'

export interface DecideFile extends DecideParse {
  path: string
  /** The file does not exist: the page shows a message instead of an empty board. */
  missing: boolean
  /** Last write time (ISO), absent when the file is missing. */
  modifiedAt?: string
}

/** The parsed decision list of a plan folder; a missing file is flagged, not thrown. */
export function readDecideFile(planDir: string): DecideFile {
  const path = join(planDir, DECIDE_FILE)
  if (!existsSync(path)) return { path, missing: true, items: [], errors: [] }
  return {
    path,
    missing: false,
    modifiedAt: statSync(path).mtime.toISOString(),
    ...parseDecide(readFileSync(path, 'utf8')),
  }
}
