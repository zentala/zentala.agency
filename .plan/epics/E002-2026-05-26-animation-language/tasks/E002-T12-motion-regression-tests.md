---
id: E002-T12
title: Add motion regression coverage
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E002-T03, E002-T04, E002-T05, E002-T06, E002-T07, E002-T08, E002-T10, E002-T11]
tags: [frontend, playwright, tests]
epic: E002
branch: feat/E002-T12-motion-regression-tests
created: 2026-05-26
completed_at: null
---

# E002-T12: Add Motion Regression Coverage

## Objective

Protect the new motion language from regressions without brittle timing tests.

## Acceptance criteria

- [ ] Tests cover header active state.
- [ ] Tests cover header hover or focus affordance.
- [ ] Tests cover footer focus-visible affordance.
- [ ] Tests cover blog card hover/focus affordance.
- [ ] Reduced-motion mode is covered for at least one interaction.

## Steps

1. Inspect existing Playwright test patterns.
2. Add motion-specific tests or extend relevant existing specs.
3. Prefer computed-style assertions for state presence.
4. Avoid asserting exact animation frames or millisecond progress.

## Tests

- Run relevant Playwright tests.
- Run `npm run build`.

