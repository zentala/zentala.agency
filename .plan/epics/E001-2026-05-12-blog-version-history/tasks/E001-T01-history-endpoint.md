---
id: E001-T01
epic: E001
status: pending
created: 2026-05-12
revised: 2026-05-12 (CEO review — collection param + rename tracking)
branch: feat/E001-T01-history-endpoint
title: E001-T01 — History API endpoint + git-log parser
---

# E001-T01 — History API endpoint + git-log parser

## Goal

Implement `GET /api/dev/history/[collection]/[slug].json` that returns the list of historical commits for a content-collection entry, with line-change stats, `isMajor` flag, and rename-aware `pathAtCommit` per entry.

## Files to create

- `src/lib/dev/git-history/parseGitLog.ts` — pure parser, no I/O. Handles rename markers from `--numstat`.
- `src/lib/dev/git-history/getHistory.ts` — orchestrator: runs simple-git, calls parser, computes derived fields, returns `HistoryEntry[]`
- `src/lib/dev/git-history/types.ts` — `HistoryEntry`, `VersionPayload`
- `src/lib/dev/git-history/heuristics.ts` — `computeIsMajor()`, `clampPercent()`
- `src/lib/dev/git-history/validators.ts` — `validateSlug()`, `validateSha()`, `validateCollection()` + allowlist constant
- `src/lib/dev/git-history/resolveSlug.ts` — collection+slug → repo-relative path (try `.md`, then `.mdx`, then fail)
- `src/pages/api/dev/history/[collection]/[slug].json.ts` — Astro endpoint thin wrapper
- `tests/lib/dev/git-history/parseGitLog.test.ts`
- `tests/lib/dev/git-history/getHistory.test.ts` (integration with temp git repo, includes rename scenario)

## Implementation steps

1. Install `devDependencies`: `simple-git`, `gray-matter`.
2. Define `HistoryEntry`, `VersionPayload`, `CONTENT_COLLECTIONS` const (`['blog']`) in `types.ts` / `validators.ts`.
3. Implement validators — `validateCollection` checks against allowlist, returns typed result. Pure, exhaustively tested.
4. Implement `parseGitLog` — accepts raw stdout of `git log --follow --numstat --format='__COMMIT__%n%H%n%ai%n%s'`. Returns `Omit<HistoryEntry,'percentChanged'|'isMajor'>[]`. **Critical: handle `--numstat` rename markers** — lines like `10\t5\t{old.md => new.md}` or `10\t5\tpath/old.md => path/new.md`. Extract `pathAtCommit` for each entry. Pure function, fixture-based tests.
5. Implement `getHistory(collection, slug)`:
   - validate inputs
   - call `resolveSlug` to find current path
   - run `simple-git` log command
   - parse via `parseGitLog`
   - for each commit: compute `percentChanged` using prev-SHA's line count as denominator (use `pathAtPrev` from prev entry to handle renames)
   - compute `isMajor` via heuristics
   - cap at 500 newest entries; push warning if truncated
   - return sorted newest-first
6. Implement endpoint:
   - dev-gate top-line
   - validate `collection` + `slug` (return 400 for bad input)
   - call `getHistory`; map known errors (ENOENT for git binary, no .git dir) to structured 500 with hints
   - per-process cache Map keyed by `${collection}:${slug}@${HEAD-sha}`; check HEAD via `git rev-parse HEAD` before serving cached value
   - return JSON

## Tests

**Unit (Vitest):**

```
parseGitLog
  ✓ parses a single-commit log
  ✓ parses a multi-commit log preserving order
  ✓ extracts pathAtCommit from {old => new} rename marker
  ✓ extracts pathAtCommit from path1 => path2 rename form
  ✓ handles a commit with subject containing "__COMMIT__"
  ✓ returns empty array for empty input
  ✓ parses numstat with binary marker "-" gracefully (treat as 0)

heuristics
  ✓ computeIsMajor: 29.9% → false, 30% → true
  ✓ computeIsMajor: 49 lines → false (when <30%), 50 → true
  ✓ clampPercent caps at 100, floors at 0

validators
  ✓ accepts "valid-slug-123"
  ✓ rejects "../etc/passwd"
  ✓ rejects "Slug With Spaces"
  ✓ accepts 7- and 40-char hex SHA
  ✓ rejects "deadbeef; rm -rf /"
  ✓ validateCollection accepts "blog", rejects "secrets", "notes" (until allowlisted)
```

**Integration (Vitest):**

Set up a temp directory in `beforeAll` using cross-platform helpers (the project runs on Windows + Linux CI; `mktemp` is not available on Windows):
```ts
// tests/lib/dev/git-history/helpers/tempGitRepo.ts
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

export function makeTempRepo(): string {
  return mkdtempSync(join(tmpdir(), `git-history-${randomUUID()}-`))
}
```
Sequence:
```
makeTempRepo() → git init → git config user.email/user.name (CI needs both) →
  C1: commit fixture-v1.md →
  C2: commit fixture-v2.md (50% rewrite) →
  C3: small typo fix →
  C4: git mv fixture.md renamed-fixture.md →
  C5: edit renamed-fixture.md
```
Then:
- `getHistory('blog', 'renamed-fixture')` → length === 5, newest first, `pathAtCommit` reflects correct path per entry (`fixture.md` for C1-C3, `renamed-fixture.md` for C4-C5)
- C2 entry `isMajor: true`, C3 `isMajor: false`
- Cache invalidation: commit one more file (unrelated) → HEAD moves → cache miss → fresh data returned
- `afterAll` removes the temp repo (`rmSync(dir, { recursive: true, force: true })`); each test file generates a unique UUID dir so parallel Vitest workers never collide.

## Done criteria

- All listed files exist and are ≤ 250 lines each
- All listed tests pass
- `curl http://localhost:4321/api/dev/history/blog/autonomous-agents-on-backstage.json` returns valid JSON in dev
- Same URL returns 404 when `NODE_ENV=production`
- Bad collection (`/api/dev/history/secrets/foo.json`) returns 400
- TSDoc on every exported function

## Commits

Conventional commits, scope `E001-T01`. Suggested split:
- `feat(E001-T01): add git-history types, validators, collection allowlist`
- `feat(E001-T01): implement parseGitLog with rename-tracking and fixture tests`
- `feat(E001-T01): implement getHistory with simple-git + cache`
- `feat(E001-T01): expose /api/dev/history/[collection]/[slug] endpoint`
