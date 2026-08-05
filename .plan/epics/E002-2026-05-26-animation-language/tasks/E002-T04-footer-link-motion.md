---
id: E002-T04
title: Convert footer links to animated sweep
status: pending
priority: high
effort: small
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, footer, motion]
epic: E002
branch: feat/E002-T04-footer-link-motion
created: 2026-05-26
completed_at: null
---

# E002-T04: Convert Footer Links To Animated Sweep

## Objective

Make footer links feel intentionally interactive instead of abruptly changing
visual state.

## Acceptance criteria

- [ ] Footer text links animate from a defined idle state.
- [ ] Footer link hover does not cause layout shift.
- [ ] Keyboard focus is visible and consistent with hover.
- [ ] Internal and external footer links keep a coherent low-intensity style.

## Steps

1. Update `src/styles/footer.scss`.
2. Move `::after` from hover-only to idle state.
3. Animate `transform: scaleX(0)` to `scaleX(1)`.
4. Add focus-visible behavior.

## Tests

- Manual footer hover/focus pass.
- Run `npm run build`.

