# E001 — Architecture

**Status:** revised after CEO review 2026-05-12
**Date:** 2026-05-12
**Scope:** epic-local architecture; global decisions promote to `.arch/ADR/` at epic close

## Revision log

- **2026-05-12 (CEO review):** switched snapshot renderer from `markdown-it` to `@astrojs/markdown-remark` for visual fidelity with prod (Approach C). Parametrized endpoints by collection name. Added rename-tracking, gray-matter error rescue, CI bundle-audit guard. Removed `markdown-it` + `@types/markdown-it` from deps.
- **2026-05-12 (Eng review):** Relocated panel to `src/components/react-stuff/dev/blog-version-panel/` to live inside the `react()` integration's `include` glob from `astro.config.mjs` — without this the React components would not compile as JSX. Added snapshot-fidelity regression test, hardened bundle audit to minifier-stable strings, made `output: 'static'` semantics for API routes explicit, cross-platform temp dir for fixtures.

## 1. Goal in one sentence

Provide a dev-only floating panel that lets the author browse, snapshot, and diff historical versions of a blog post directly from the rendered page in the Astro dev server, sourced from local git history — using the **same markdown pipeline as production** so historical renders match what a reader would see.

## 2. Constraints

- **Dev-only.** Zero code, zero routes, zero bundle weight in production. Gate everything on `import.meta.env.DEV`. Endpoints return 404 when not in dev.
- **Read-only.** No git mutations. No working tree changes. No checkout. Snapshots happen in-memory via `git show <sha>:<path>`.
- **No external services.** Works offline, on un-pushed commits, on any branch.
- **No parallel markdown pipeline.** Historical content renders through `@astrojs/markdown-remark` (the same library Astro uses internally) configured with the same plugin chain as `astro.config.mjs`. No `markdown-it`, no custom remark forks.
- **File-length cap 250 lines** per project rule.
- **TypeScript everywhere**, `@/` alias, TSDoc on public functions.

## 3. High-level component map

```
                       [Browser — dev only]
                                |
                   <BlogVersionPanel /> (React, lazy)
                  ├── VersionTimeline   (list + major-change badges)
                  ├── ModeSwitcher      (live | snapshot | diff)
                  ├── SnapshotView      (renders pre-baked HTML from endpoint)
                  └── DiffView          (diff2html + DOMPurify)
                                |
                        fetch JSON  (dev only)
                                |
                       [Astro server endpoints]
                                |
   /api/dev/history/[collection]/[slug].json
   /api/dev/version/[collection]/[slug]/[sha].json   ← returns { sha, frontmatter, body, html, warnings }
                                |
                  ┌─────────────┴─────────────┐
                  |                           |
            simple-git              @astrojs/markdown-remark
            (spawn git CLI)         (same config as prod build)
                  |
            .git in repo root
```

## 4. Data shapes

**`HistoryEntry`** — one row in the timeline
```ts
type HistoryEntry = {
  sha: string            // full SHA
  shortSha: string       // 7 chars
  date: string           // ISO 8601
  message: string        // commit subject (first line)
  pathAtCommit: string   // path the file had AT this commit (rename-aware)
  linesAdded: number
  linesRemoved: number
  percentChanged: number // (added+removed)/totalLinesBefore, clamped 0..100
  isMajor: boolean       // percentChanged >= 30 || (added+removed) >= 50
}
```

**`VersionPayload`** — content of one historical version
```ts
type VersionPayload = {
  sha: string
  collection: string                   // e.g. "blog"
  slug: string
  pathAtCommit: string                 // actual path inside the repo at that SHA
  frontmatter: Record<string, unknown> // parsed via gray-matter; {} if parse failed
  body: string                         // raw markdown body
  html: string                         // pre-rendered HTML via @astrojs/markdown-remark
  warnings: string[]                   // e.g. "file not present at this commit", "frontmatter parse failed"
}
```

## 5. Endpoints

Both endpoints are parametrized by `collection` so future extension to `notes`, `category descriptions`, etc. is a routing change, not a refactor.

### `GET /api/dev/history/[collection]/[slug].json`

- Path: `src/pages/api/dev/history/[collection]/[slug].json.ts`
- Behavior:
  1. If `!import.meta.env.DEV` → 404 `{ error: "dev-only" }`.
  2. Validate `collection` against an allowlist (`['blog']` for V1; trivially extensible). Validate `slug` against `/^[a-z0-9-]+$/`.
  3. Resolve to path: `src/content/${collection}/${slug}.md` or `.mdx` — try both, pick whichever exists in HEAD.
  4. Spawn `git log --follow --numstat --format='__COMMIT__%n%H%n%ai%n%s' -- <path>`.
  5. Parse blocks. **For rename-tracking:** when `--numstat` emits a `{old => new}/file.md` or `path1 => path2` line, capture `pathAtCommit` so we know the actual filename at that SHA.
  6. For each commit: compute `percentChanged` (denominator = `git show <prev-sha>:<pathAtPrev> | wc -l` or 1 if new). Compute `isMajor`.
  7. Return JSON array sorted newest → oldest.
- Cache: per-process Map keyed by `${collection}:${slug}@${HEAD-sha}`. Re-checked via `git rev-parse HEAD` (cheap).
- Error modes (all return structured JSON, never throw):
  - File never existed → `200 []`
  - git binary missing → `500 { error, hint: "install git" }`
  - Repo not initialized → `500 { error, hint: "no .git dir" }`
  - Slug fails regex → `400 { error: "invalid slug" }`
  - Collection not allowlisted → `400 { error: "unknown collection" }`

### `GET /api/dev/version/[collection]/[slug]/[sha].json`

- Path: `src/pages/api/dev/version/[collection]/[slug]/[sha].json.ts`
- Behavior:
  1. Dev-gate.
  2. Validate `collection`, `slug`, and `sha` (`/^[a-f0-9]{4,40}$/`).
  3. Resolve `pathAtCommit` — call `getHistory` (cached) to look up the path this file had at this SHA (handles renames).
  4. `git show <sha>:<pathAtCommit>` → raw text.
  5. Parse frontmatter with `gray-matter`. **If parse throws** → set `frontmatter = {}`, push `"frontmatter parse failed"` to `warnings`, keep going.
  6. Render `body` to HTML via `@astrojs/markdown-remark` configured with the same plugins as `astro.config.mjs`. MDX-specific syntax (custom components like `<Quote/>`) renders as a `<div class="mdx-stub">` placeholder + warning.
  7. Return `VersionPayload`. If file did not exist at SHA → `404` with `{ ..., warnings: ["file not present at this commit"] }`.
- Cache: per-process Map keyed by `${pathAtCommit}@${sha}` (commits immutable; safe forever in dev process).

## 6. Client architecture

### Mount point

`src/layouts/Layout.astro` conditionally imports `BlogVersionPanelMount` only when:
- `import.meta.env.DEV === true`, AND
- the page is a content-collection entry (path under `/blog/`; future: also `/notes/` once allowlisted)

Single guarded import; React island hydrated `client:idle`.

### Component tree (React, in `src/components/react-stuff/dev/blog-version-panel/`)

```
BlogVersionPanel.tsx           — top-level state machine (mode, primarySha, secondarySha, collection, slug)
├── PanelChrome.tsx            — floating container, collapse/expand, drag handle, z-index above TOC sidebar
├── VersionTimeline.tsx        — vertical list, major-change badge = filled dot, supports 1-select and 2-select modes
├── ModeSwitcher.tsx           — three pill buttons: Live | Snapshot | Diff
├── SnapshotView.tsx           — renders pre-baked `html` field from /api/dev/version, wrapped in same `.prose` class as prod
└── DiffView.tsx               — renders unified diff via diff2html, sanitized via DOMPurify before mount
```

State lives in `BlogVersionPanel`; URL hash mirrors selection (`#v=<sha>` or `#diff=<a>..<b>`).

### Rendering historical markdown — the fidelity story

Because the endpoint returns pre-rendered HTML through `@astrojs/markdown-remark` (the same library Astro uses), the historical render is **byte-identical for `.md` posts** to what production would generate. SnapshotView simply wraps that HTML in the same `.prose` / blog-post container class the live page uses → typography, code highlighting, link styling all match.

MDX components (`<Quote/>`, etc.) are **not** rendered in snapshot mode — they appear as `<div class="mdx-stub">` placeholders with a warning strip at the top of the view. Current blog series is pure `.md`, so this is a non-issue for the immediate use case. Tracked in `IMPROVEMENTS.md` for when MDX adoption grows.

Both SnapshotView and DiffView inject HTML using React's raw-HTML mechanism, but only after the content has been passed through a sanitizer (DOMPurify for diff; the markdown library output is structurally constrained but also sanitized for habit hygiene). Sanitization details in T05/T07.

### Diff rendering

Diff stays as planned: `diff` (jsdiff) → `diff2html` HTML → DOMPurify with pinned allowlist → mount. The diff compares **raw markdown bodies**, not rendered HTML — easier to review for content authors. SCSS overrides tune the palette for the site's dark theme.

## 7. Dependencies

Production: **none** (all dev-only).

Dev:
- `simple-git` — git CLI wrapper, parameterized commands
- `gray-matter` — frontmatter parser
- `@astrojs/markdown-remark` — Astro's own markdown→HTML library (matches prod render exactly)
- `diff` (jsdiff) — diff algorithm
- `diff2html` — HTML renderer for diff
- `dompurify` — HTML sanitizer for diff output (and snapshot HTML defense-in-depth)

Removed compared to original plan: `markdown-it`, `@types/markdown-it` — replaced by `@astrojs/markdown-remark` which gives true prod fidelity.

`shiki` is already in Astro's stack via `@astrojs/markdown-remark`; reuse, don't re-add.

## 8. Security considerations

Dev-only + localhost binding → no auth required. Hardening anyway:
- **SHA regex** before any git call (`/^[a-f0-9]{4,40}$/`).
- **Slug regex** (`/^[a-z0-9-]+$/`).
- **Collection allowlist** (`['blog']` for V1).
- **No symlink follow** when resolving slug → path.
- **Server-only files** — endpoint code paths never imported from client; verified by bundle audit.
- **DOMPurify** on every injected-HTML path with explicit tag/attr allowlist (details in T07).
- `simple-git` parameterizes commands; no shell interpolation anywhere.

## 9. Production exclusion proof

Five layers ensuring zero prod impact (the first is the structural one, the rest are defense-in-depth):

1. **Static output excludes API routes by default.** `astro.config.mjs` has `output: 'static'`. In static mode, files under `src/pages/api/` are NOT prerendered into `dist/` — they exist only in the dev server. This is the load-bearing guarantee; the env gates below are belt-and-suspenders for the case where someone later flips output to `'server'` or `'hybrid'`.
2. **Endpoint env-gate:** every dev endpoint top-line `if (!import.meta.env.DEV) return new Response(null, { status: 404 })`. Even though static output already strips the file, this gate is the fallback if output mode changes.
3. **Panel mount gate:** `BlogVersionPanelMount` only imported inside `{import.meta.env.DEV && ...}` block in `Layout.astro`. Astro's tree-shaker drops the import and transitive deps from prod bundle.
4. **Local bundle audit task** (E001-T07): `scripts/audit-prod-bundle.mjs` greps `dist/` for minifier-stable forbidden strings — `'simple-git'` (package name preserved in CommonJS require), `'diff2html'` (CSS class prefix `d2h-` survives), `'simple-git'` module identifier strings. Does NOT grep for component class names like `BlogVersionPanel` (gets minified away to single chars — false negatives).
5. **CI bundle audit:** GitHub Actions step in `.github/workflows/test.yml` (PR + push) and `.github/workflows/deploy.yml` runs `npm run audit:prod` right after `npm run build` and before any deploy step. Exit-non-zero blocks merge / blocks deploy.

## 10. Observability in dev

- Panel shows current dev-server endpoint latency (round-trip in ms) next to each call.
- `console.debug` namespace `[blog-version]` for trace events; off by default behind `?vh-debug=1` query param.

## 11. Open questions parked for later

These are intentionally deferred:

1. **MDX support in snapshot mode.** Current series is pure `.md`. When MDX adoption grows, evaluate either (a) Astro's `experimental_AstroContainer` for true MDX render, or (b) a lightweight MDX-to-placeholder strategy with better visual hints.
2. **Branch awareness.** Walks `git log` linearly; for diverged feature branches "compare against main" is a useful follow-up.
3. **Multi-file diff.** Image references or imports that also changed — out of scope V1.
4. **Notes / other collections.** V1 endpoints are already parametrized by collection; extension is a routing line, not a refactor.

## 12. Acceptance criteria for this architecture

- [ ] All endpoints fit in <250 lines including comments
- [ ] All components in `src/components/react-stuff/dev/blog-version-panel/` are <250 lines each
- [ ] No production import path can reach `simple-git`, `diff2html`, or `BlogVersionPanel` (verified by bundle audit, **locally and in CI**)
- [ ] Snapshot mode produces HTML byte-identical to prod render for the latest `.md` commit (regression test)
- [ ] Panel hydrates in <50ms after `client:idle` fires on a typical blog page

## Error & rescue registry

| Codepath | Failure mode | Rescue | User sees | Logged? |
|----------|--------------|--------|-----------|---------|
| `getHistory(slug)` | File never existed | Return `[]` | Empty timeline w/ "no history yet" message | debug |
| `getHistory(slug)` | File renamed in history | Track via `--numstat` rename markers; use `pathAtCommit` per entry | Full timeline | debug |
| `getHistory(slug)` | `git log` >1000 commits | Cap at 500 newest; surface warning | Banner: "showing 500 most recent" | debug |
| `getHistory(slug)` | `git` binary missing | Catch ENOENT → 500 with hint | Toast: "git not found in PATH" | error |
| `getVersion(sha, path)` | File not present at SHA | Return payload with `warnings: ["file not present at this commit"]` | Panel warning strip | debug |
| `getVersion(sha, path)` | gray-matter throws on bad frontmatter | Catch → `frontmatter: {}`, push warning | Panel warning strip; body still renders | warn |
| `getVersion(sha, path)` | `@astrojs/markdown-remark` throws | Catch → `html: '<pre>render failed</pre>'`, push warning; return raw body for fallback display | Panel warning + raw markdown view | error |
| Cache | HEAD moved mid-session | Cache key includes HEAD SHA; auto-invalidates | Fresh fetch (transparent) | debug |
| Panel | User clicks SHA while previous fetch pending | AbortController on previous fetch; debounce 100ms | Loading state visible | debug |
| DiffView | User selects same SHA twice | "Pick two different versions to diff" message | Inline notice | — |
| DiffView | SHAs in reverse chronological order | Auto-sort A=older, B=newer; "Swap A/B" button respects user override | Correct +/- semantics | — |
| URL hash | Unknown SHA in `#v=` (e.g. after rebase) | Validate against history list; show "version not found in current history" + reset to live | Warning + panel reset | warn |
