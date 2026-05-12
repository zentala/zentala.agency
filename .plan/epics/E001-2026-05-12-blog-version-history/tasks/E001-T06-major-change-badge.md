---
id: E001-T06
epic: E001
status: todo
created: 2026-05-12
branch: feat/E001-T06-major-badge
---

# E001-T06 — Major-change visual badge

## Goal

Polish the timeline so that "major" changes (per `isMajor` from T01) stand out visually, and surface a one-line summary at the panel header counting major vs minor revisions.

## Files to edit

- `src/components/react-stuff/dev/blog-version-panel/VersionTimeline.tsx`
- `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.tsx` (add summary header)
- `src/components/react-stuff/dev/blog-version-panel/BlogVersionPanel.module.scss`
- `tests/components/react-stuff/dev/blog-version-panel/VersionTimeline.test.tsx` (extend existing tests)

## Implementation steps

1. Visual treatment for major rows:
   - Filled circle indicator (vs hollow for minor)
   - Slightly larger SHA font
   - `font-weight: 600` on the commit message
   - Optional left border accent in the row when hovered
2. Tooltip on indicator: `Major change — N% of lines changed (+X / -Y)`
3. Panel header summary line: `<N> revisions · <M> major`. Read-only.
4. Empty state (no commits found): friendly "No history yet — commit this post to see versions" message.
5. SCSS: introduce a new CSS variable `--vh-major-accent` for the major indicator color; tie to existing theme palette.

## Tests

```
VersionTimeline (extended)
  ✓ filled indicator on major rows, hollow on minor
  ✓ tooltip text matches expected pattern
  ✓ empty state shown when entries.length === 0

BlogVersionPanel header
  ✓ "5 revisions · 2 major" when 5 entries, 2 isMajor
  ✓ "1 revision · 0 major" (correct pluralization)
```

## Done criteria

- Visual diff between major and minor is obvious at a glance
- Tooltips work on keyboard focus, not only on hover (a11y)
- Empty state handled
- Tests pass
- No regression in T03 tests

## Commits

- `feat(E001-T06): add major-change indicator and tooltip to timeline`
- `feat(E001-T06): show revisions summary in panel header`
