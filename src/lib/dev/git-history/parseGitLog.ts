import type { ParsedCommit } from './types'

/**
 * Parses the stdout of:
 *   git log --follow --numstat --format='__COMMIT__%n%H%n%ai%n%s' -- <path>
 *
 * Output shape per commit:
 *   __COMMIT__
 *   <fullSha>
 *   <iso date>
 *   <subject>
 *   <added>\t<removed>\t<path-or-rename-marker>
 *   <added>\t<removed>\t<path-or-rename-marker>   (rare: multiple paths if --follow stitches)
 *   <blank line>
 *
 * Rename markers come in two shapes:
 *   - `path1 => path2`
 *   - `prefix/{old => new}/suffix`  (curly-brace form)
 *
 * Binary diffs show `-` instead of integers — treat as 0.
 *
 * Pure function. No I/O. Fixture-tested.
 */
export function parseGitLog(stdout: string): ParsedCommit[] {
  const commits: ParsedCommit[] = []
  if (!stdout) return commits

  const blocks = stdout.split(/(?:^|\n)__COMMIT__\n/g).filter((b) => b.trim().length > 0)

  for (const block of blocks) {
    const lines = block.split('\n')
    if (lines.length < 3) continue
    const sha = lines[0].trim()
    const date = lines[1].trim()
    const message = lines[2]
    if (!sha) continue

    let pathAtCommit = ''
    let linesAdded = 0
    let linesRemoved = 0

    for (let i = 3; i < lines.length; i++) {
      const raw = lines[i]
      if (!raw || raw.trim().length === 0) continue
      const parts = raw.split('\t')
      if (parts.length < 3) continue
      const added = parts[0] === '-' ? 0 : parseInt(parts[0], 10) || 0
      const removed = parts[1] === '-' ? 0 : parseInt(parts[1], 10) || 0
      const pathField = parts.slice(2).join('\t')
      const resolvedPath = resolveRenamePath(pathField)
      linesAdded += added
      linesRemoved += removed
      if (!pathAtCommit) pathAtCommit = resolvedPath
    }

    commits.push({
      sha,
      shortSha: sha.slice(0, 7),
      date,
      message,
      pathAtCommit,
      linesAdded,
      linesRemoved,
    })
  }

  return commits
}

/**
 * Extracts the post-rename path from a `--numstat` path field.
 * Handles both `old => new` and `prefix/{old => new}/suffix` forms.
 * For non-rename entries, returns the input unchanged.
 */
export function resolveRenamePath(field: string): string {
  const trimmed = field.trim()
  const braceMatch = trimmed.match(/^(.*)\{([^{}]*?)\s*=>\s*([^{}]*?)\}(.*)$/)
  if (braceMatch) {
    const [, prefix, , newInner, suffix] = braceMatch
    return collapseSlashes(`${prefix}${newInner}${suffix}`)
  }
  const arrowMatch = trimmed.match(/^(.+?)\s*=>\s*(.+)$/)
  if (arrowMatch) return arrowMatch[2].trim()
  return trimmed
}

function collapseSlashes(p: string): string {
  return p.replace(/\/{2,}/g, '/').replace(/^\/+|\/+$/g, '')
}
