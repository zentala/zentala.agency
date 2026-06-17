---
id: E002-T03
title: Add header nav hover, focus, and active motion
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, navigation, motion]
epic: E002
branch: feat/E002-T03-header-nav-motion
created: 2026-05-26
completed_at: null
---

# E002-T03: Add Header Nav Motion

## Objective

Make the header communicate route affordance and current location.

## Acceptance criteria

- [ ] Hovered nav link shows animated route affordance.
- [ ] Focused nav link shows the same affordance.
- [ ] Active route remains visible without hover.
- [ ] Link text width does not change on hover.
- [ ] Reduced-motion mode keeps state but removes transform-heavy movement.

## Steps

1. Update `src/components/Header.astro` nav link markup/classes.
2. Add route-active detection for current page path.
3. Add underline/rail animation using shared tokens.
4. Add `:focus-visible` state.
5. Avoid font-weight changes and layout-shifting styles.

## Tests

- Playwright or manual check on `/`, `/blog/`, `/contact`.
- Keyboard tab pass.
- Run `npm run build`.

