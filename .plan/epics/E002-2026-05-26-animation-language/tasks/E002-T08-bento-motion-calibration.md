---
id: E002-T08
title: Calibrate bento motion
status: pending
priority: medium
effort: medium
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, bento, motion]
epic: E002
branch: feat/E002-T08-bento-motion-calibration
created: 2026-05-26
completed_at: null
---

# E002-T08: Calibrate Bento Motion

## Objective

Keep the home bento expressive while making its timing consistent with the rest
of the motion system.

## Acceptance criteria

- [ ] Bento motion uses shared tokens.
- [ ] Keyboard users receive equivalent affordance.
- [ ] Central bento remains more expressive than regular cards.
- [ ] Reduced-motion users do not get transform-heavy effects.

## Steps

1. Review `BentoCard.astro`, `BentoCentralStage.astro`, and `BentoAboutMe.astro`.
2. Replace hardcoded durations/easing where safe.
3. Add focus-visible behavior for interactive bento surfaces.
4. Preserve central stage hierarchy.

## Tests

- Manual pass on home page.
- Reduced-motion pass.
- Run `npm run build`.

