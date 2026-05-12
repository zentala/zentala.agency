---
id: E001-T05
epic: E001
status: todo
created: 2026-05-12
revised: 2026-05-12 (CEO review — collection param, auto-order, abort handling)
branch: feat/E001-T05-diff-mode
---

# E001-T05 — Diff mode

## Goal

Allow the user to pick two SHAs from the timeline and view a side-by-side unified diff of the markdown body (not the rendered output).

## Files to create / edit

- Create `src/components/react-stuff/dev/blog-version-panel/DiffView.tsx`
- Create `src/lib/dev/git-history/buildDiffHtml.ts`
- Edit `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.tsx` — diff mode state (primary + secondary SHA selection)
- Edit `src/components/react-stuff/dev/blog-version-panel/VersionTimeline.tsx` — support two-select mode when diff is active
- Edit `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.module.scss` — diff palette tuned for dark theme
- Create `tests/lib/dev/git-history/buildDiffHtml.test.ts`
- Create `tests/components/react-stuff/dev/blog-version-panel/DiffView.test.tsx`
- Add deps: `diff`, `diff2html`, `dompurify`

## Implementation steps

1. Implement `buildDiffHtml(bodyA: string, bodyB: string, fileLabel: string): string`:
   - Use `diff.createPatch(fileLabel, bodyA, bodyB)` to produce unified-diff text
   - Pass to `diff2html` configured side-by-side, `drawFileList: false`, `matching: 'lines'`
   - Return the HTML string
2. Implement `DiffView`:
   - Takes `collection`, `slug`, `shaA`, `shaB`
   - Parallel-fetches both versions via `/api/dev/version/${collection}/${slug}/${sha}.json` with a single `AbortController` for both
   - **Auto-order by commit date**: A = older, B = newer (from history payload metadata). User can override via Swap button — Swap is a one-time toggle, not auto-reverted on next selection.
   - Computes `buildDiffHtml`, runs the result through DOMPurify with a strict allowlist (see T07), then injects the cleaned markup into the container using React's raw-HTML mechanism. The sanitization layer is mandatory and tested.
   - Loading state shows skeleton with the two SHAs being compared
   - If either fetch fails → error state with which SHA failed and a retry button
3. Timeline two-select UX:
   - In diff mode, first click sets primary, second sets secondary (with visual A/B markers)
   - Third click resets to first as primary, prior primary becomes secondary
   - "Swap A/B" button in DiffView header
4. SCSS overrides for `diff2html` classes to fit dark theme:
   - `.d2h-ins` → muted green (`#1a3a1a` bg, `#7ee87e` text)
   - `.d2h-del` → muted red (`#3a1a1a` bg, `#ff8a8a` text)
   - Border colors map to `gray-800`
5. URL hash format: `#diff=<shortA>..<shortB>`. Restores on reload.
6. Edge cases:
   - Same SHA twice → friendly message "Pick two different versions to diff."
   - URL hash with unknown SHA(s) (e.g. after rebase) → warning + reset to live mode
   - One of the SHAs returns 404 (file not present at that commit) → diff still renders showing entire body as additions/deletions vs empty

## Security note

The diff renderer produces HTML that includes content extracted from user-authored markdown across two arbitrary commits. Treat the output as untrusted. The hardening details (DOMPurify allowlist, attribute strip rules, XSS injection regression test) live in **E001-T07**; this task wires the sanitization in place but the audit + tests land in T07.

## Tests

**Unit (Vitest):**

```
buildDiffHtml
  ✓ returns empty diff (no hunks) for identical bodies
  ✓ returns one hunk for single-line change
  ✓ returns multiple hunks for distributed changes
  ✓ correctly labels file in diff header
  ✓ output contains diff2html DOM markers (.d2h-files-diff)

DiffView
  ✓ fetches both versions in parallel
  ✓ shows skeleton during fetch
  ✓ renders sanitized diff HTML after fetch (assert sanitizer was called)
  ✓ shows "pick two different versions" when shaA === shaB
  ✓ Swap A/B button swaps the inputs and re-renders
```

**Integration (Playwright):**
- Switch to diff mode → click SHA1 then SHA2 → assert diff visible with at least one `.d2h-ins` or `.d2h-del`
- Click Swap → assert added lines now show as removed and vice-versa
- Reload with `#diff=...` → assert diff mode restored with same two SHAs

## Done criteria

- Diff mode renders correctly for any two valid SHAs
- DOMPurify sanitization wired in (full hardening + XSS regression test deferred to T07)
- URL hash deep-link works
- Styling fits dark theme cleanly
- All tests pass
- Files ≤ 250 lines

## Commits

- `feat(E001-T05): implement buildDiffHtml with jsdiff + diff2html`
- `feat(E001-T05): implement DiffView with sanitized HTML render`
- `feat(E001-T05): support two-select in timeline for diff mode`
- `style(E001-T05): tune diff2html palette for dark theme`
