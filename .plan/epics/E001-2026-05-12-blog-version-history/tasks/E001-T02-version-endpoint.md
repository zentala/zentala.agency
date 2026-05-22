---
id: E001-T02
epic: E001
status: pending
created: 2026-05-12
revised: 2026-05-12 (CEO review — collection param + markdown-remark render + frontmatter rescue)
branch: feat/E001-T02-version-endpoint
title: E001-T02 — Version (single-SHA) API endpoint
---

# E001-T02 — Version (single-SHA) API endpoint

## Goal

Implement `GET /api/dev/version/[collection]/[slug]/[sha].json` that returns the content of a content-collection entry at a specific commit SHA, with parsed frontmatter, raw markdown body, AND pre-rendered HTML via `@astrojs/markdown-remark` (same renderer as production).

## Files to create

- `src/lib/dev/git-history/getVersion.ts` — orchestrator: resolves `pathAtCommit` via cached history, runs `git show`, parses frontmatter (with rescue), renders HTML, returns `VersionPayload`
- `src/lib/dev/git-history/renderMarkdown.ts` — thin wrapper over `@astrojs/markdown-remark` configured to match `astro.config.mjs` plugin chain
- `src/pages/api/dev/version/[collection]/[slug]/[sha].json.ts` — Astro endpoint thin wrapper
- `tests/lib/dev/git-history/getVersion.test.ts`
- `tests/lib/dev/git-history/renderMarkdown.test.ts`

## Implementation steps

1. Install `devDependency`: `@astrojs/markdown-remark`. Verify version matches the one Astro 5 ships with internally to avoid plugin chain drift.
2. Implement `renderMarkdown(body, opts)`:
   - Import `createMarkdownProcessor` from `@astrojs/markdown-remark`
   - Configure with the same `remarkPlugins`, `rehypePlugins`, and `shikiConfig` that `astro.config.mjs` uses (extract config to a shared module if needed so dev and prod stay in lockstep)
   - Return `{ html: string, warnings: string[] }`
   - On render throw → return `{ html: '<pre>render failed</pre>', warnings: ['markdown render failed: <message>'] }`
3. Implement `getVersion(collection, slug, sha)`:
   - validate all three (reuse validators from T01)
   - call `getHistory(collection, slug)` (cached) and find the entry matching `sha` → use its `pathAtCommit`
   - if no matching entry → return `{ ..., warnings: ['sha not in current history'] }` (caller maps to 404)
   - run `git.show(['${sha}:${pathAtCommit}'])`. On "Path does not exist" → return payload with `warnings: ['file not present at this commit']`
   - Wrap `gray-matter(raw)` in try/catch: on throw → `frontmatter = {}`, `body = raw` (without front-stripping), push `'frontmatter parse failed'` warning
   - call `renderMarkdown(body)` → fold its warnings into the payload
   - return `VersionPayload`
4. Implement endpoint:
   - dev-gate
   - validate inputs; 400 on bad
   - call `getVersion`; map "not present at commit" / "sha not in history" → 404 with payload
   - cache by `${collection}:${slug}:${pathAtCommit}@${sha}` (commits immutable; infinite cache safe)
   - emit `X-Cache: hit|miss` header for dev visibility

## Tests

**Unit (Vitest):**

```
renderMarkdown
  ✓ renders headings, code blocks (with shiki classes), tables, links
  ✓ output matches what Astro's prod render emits for the same input (snapshot test)
  ✓ on render throw → returns fallback HTML + warning
  ✓ MDX-style component tags rendered as mdx-stub placeholders

getVersion (mocked simple-git + getHistory)
  ✓ returns body + frontmatter + html for a known SHA
  ✓ on gray-matter throw → frontmatter is {}, warning present, body still returned
  ✓ returns warnings array when file not at commit
  ✓ uses pathAtCommit from history for rename-aware lookups
  ✓ throws InvalidShaError for malformed SHA
  ✓ throws InvalidCollectionError for non-allowlisted collection
  ✓ correctly separates frontmatter from body
  ✓ handles file with no frontmatter (empty fm object)
```

**Integration (against temp git fixture from T01 — rename scenario included):**

```
getVersion against real git repo
  ✓ getVersion('blog', slug, sha1) === content at v1
  ✓ getVersion('blog', slug, sha2) === content at v2
  ✓ getVersion('blog', slug, sha-pre-creation) → warnings
  ✓ getVersion('blog', 'renamed-fixture', sha-pre-rename) returns content correctly via pathAtCommit
  ✓ getVersion against a SHA where frontmatter is malformed YAML → frontmatter:{} + warning, body+html still rendered
  ✓ getVersion HTML output for the HEAD commit equals Astro prod render output byte-for-byte
```

**Snapshot fidelity regression test (`tests/integration/snapshot-fidelity.test.ts`):**

Because the dev tool replicates the Astro markdown pipeline by importing the same library directly, there's risk of silent drift if anyone later adds `remarkPlugins`/`rehypePlugins` to `astro.config.mjs`. Add a CI-runnable test that:

1. Picks 1 representative `.md` post (e.g. `src/content/blog/autonomous-agents-on-backstage.md` at HEAD).
2. Renders it via Astro's actual content collection (e.g. by spawning `astro build` in a tmp dir and reading the resulting HTML, OR by importing the collection's `entry.render()` programmatically in Node).
3. Renders the same source via `renderMarkdown` from this epic.
4. Strips wrapping container HTML (article, layout) from both, normalizes whitespace, asserts the inner-prose HTML matches.

If they ever diverge: fail loudly. Either the dev tool needs a config sync, or the divergence is intentional and the snapshot needs an update. Either way, no silent rot.

## Done criteria

- All listed files exist and are ≤ 250 lines each
- All listed tests pass
- `curl http://localhost:4321/api/dev/version/blog/autonomous-agents-on-backstage/<sha>.json` returns valid JSON with `body` AND `html` field in dev
- Returns 404 in production
- Cache hit visible in dev console (`X-Cache: hit` header for repeated calls)
- TSDoc on every exported function

## Commits

- `feat(E001-T02): add markdown-remark wrapper with shared config`
- `feat(E001-T02): implement getVersion with rename-aware pathAtCommit + frontmatter rescue`
- `feat(E001-T02): expose /api/dev/version/[collection]/[slug]/[sha] endpoint`
