---
id: E001-T04
epic: E001
status: pending
created: 2026-05-12
revised: 2026-05-12 (CEO review — snapshot uses pre-rendered HTML from endpoint, no markdown-it)
branch: feat/E001-T04-snapshot-mode
title: E001-T04 — Snapshot mode
---

# E001-T04 — Snapshot mode

## Goal

When the user picks a historical SHA in snapshot mode, replace the rendered article body with the historical content **rendered via the same `@astrojs/markdown-remark` pipeline that production uses**. Live mode unchanged.

## Architecture note

After the CEO review, the markdown-rendering pipeline now lives in T02 (server-side, via `renderMarkdown` over `@astrojs/markdown-remark`). The endpoint returns `html` directly in `VersionPayload`. **This task no longer wires a parallel renderer in the browser** — it just consumes the endpoint's pre-baked HTML and mounts it inside the same `.prose` container that production uses, so typography, code highlighting, and link styling all match for free.

## Files to create / edit

- Create `src/components/react-stuff/dev/blog-version-panel/SnapshotView.tsx`
- Edit `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.tsx` — enable Snapshot mode, manage primarySha state, portal mount logic
- Edit `src/components/react-stuff/dev/blog-version-panel/ModeSwitcher.tsx` — un-disable Snapshot
- Create `tests/components/react-stuff/dev/blog-version-panel/SnapshotView.test.tsx`
- Add `devDependency`: `dompurify` (defense-in-depth on injected HTML even though source is trusted server-render)

## Implementation steps

1. Implement `SnapshotView`:
   - props: `{ collection, slug, sha }`
   - fetch `/api/dev/version/${collection}/${slug}/${sha}.json` with `AbortController`
   - on success: pass `payload.html` through DOMPurify (allow same tag set as Astro's renderer emits; pin a conservative allowlist documented inline)
   - mount sanitized HTML into a container with the same class hierarchy as the prod blog post (`.prose` or the project's blog-content class — read from `Layout.astro` to confirm)
   - if `payload.warnings` non-empty: render a warning strip at the top listing each warning (e.g. "frontmatter parse failed", "MDX component `<Quote/>` not rendered in snapshot")
   - render frontmatter title above body, plus a "Viewing snapshot from `<short-sha>` (`<date>`)" header
2. State in `BlogVersionPanel`:
   - When `mode === 'snapshot'` and `primarySha` is set → render `<SnapshotView/>` mounted via portal into the main `<article>` element of the page (or alongside, hiding the live `<article>` content with a class toggle)
   - When `mode === 'live'` → no portal, original page content visible
   - When user switches mode away from snapshot → restore live content, abort any pending fetch
3. URL hash: `#v=<short-sha>` updates on selection; restores on reload by reading hash → setting `mode='snapshot'` + `primarySha`
4. Loading state: skeleton article body + "Loading snapshot…" header
5. Error state: red banner "Failed to load snapshot: <reason>" + retry button; live content remains visible underneath

## Tests

**Unit (Vitest + RTL):**

```
SnapshotView
  ✓ fetches the right URL for given collection+slug+sha
  ✓ renders frontmatter title above body
  ✓ injects payload.html into the .prose container (sanitized)
  ✓ shows warning strip when payload.warnings is non-empty
  ✓ loading state visible during fetch
  ✓ error state visible on fetch failure
  ✓ aborts in-flight fetch when sha prop changes
  ✓ DOMPurify is called on payload.html before mount (defense-in-depth)
```

**Integration / E2E (Playwright):**
- Open blog post in dev → click oldest SHA in snapshot mode → assert article body changes to historical text (assert presence of a unique string only in old version)
- Snapshot of HEAD commit → rendered HTML matches live page's article HTML byte-for-byte (regression test for fidelity claim)
- Reload page with `#v=<sha>` → assert snapshot mode restored
- Switch back to Live → assert original content restored
- Snapshot a commit with malformed frontmatter (fixture in test repo) → warning strip visible, body still renders

## Done criteria

- Snapshot mode functional end-to-end on every blog post
- URL hash deep-link works on reload
- For `.md` posts: snapshot of HEAD commit matches live render exactly (the fidelity regression test passes)
- Warning strip surfaced when applicable
- All listed tests pass
- Files ≤ 250 lines
- No regression in live mode

## Commits

- `feat(E001-T04): implement SnapshotView consuming pre-rendered endpoint HTML`
- `feat(E001-T04): wire snapshot mode into BlogVersionPanel state machine`
- `feat(E001-T04): portal-mount snapshot content into article container`
