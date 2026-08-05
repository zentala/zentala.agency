---
id: E002-T06
title: Standardize CTA motion semantics
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, cta, motion]
epic: E002
branch: feat/E002-T06-cta-motion-semantics
created: 2026-05-26
completed_at: null
---

# E002-T06: Standardize CTA Motion Semantics

## Objective

Make primary, secondary, and external CTAs communicate different user intent.

## Acceptance criteria

- [ ] Primary CTA motion reads as commitment.
- [ ] Secondary CTA motion reads as exploration.
- [ ] External CTA motion reads as leaving current context.
- [ ] All CTA variants support hover and focus.
- [ ] CTA motion uses shared tokens.

## Steps

1. Review `SectionCTA.astro`, `GridCTA.astro`, and `Button.astro`.
2. Define primary, secondary, and external motion behavior.
3. Apply consistent tokenized timing/easing.
4. Add focus-visible parity.

## Tests

- Manual visual pass on home and Backstage pages.
- Run `npm run build`.

