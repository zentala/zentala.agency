---
id: E002-T09
title: Replace large section-header scale interaction
status: pending
priority: medium
effort: small
type: improvement
dependencies: [E002-T08]
tags: [frontend, sections, motion]
epic: E002
branch: feat/E002-T09-section-header-motion
created: 2026-05-26
completed_at: null
---

# E002-T09: Replace Section Header Scale Interaction

## Objective

Make interactive section headers guide attention without zooming content.

## Acceptance criteria

- [ ] Section header hover does not visually overpower content.
- [ ] No layout shift occurs.
- [ ] Motion communicates emphasis, not button behavior.
- [ ] Existing non-interactive section headers remain unchanged.

## Steps

1. Update `SectionHeader.astro` interactive variant.
2. Replace large `scale()` effects with border, background, or icon motion.
3. Keep interaction subtle and optional.
4. Verify pages using `interactive={true}`.

## Tests

- Manual visual pass.
- Run `npm run build`.

