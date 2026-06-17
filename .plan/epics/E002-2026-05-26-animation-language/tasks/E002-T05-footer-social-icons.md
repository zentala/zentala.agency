---
id: E002-T05
title: Add footer social icon affordance
status: pending
priority: medium
effort: small
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, footer, motion]
epic: E002
branch: feat/E002-T05-footer-social-icons
created: 2026-05-26
completed_at: null
---

# E002-T05: Add Footer Social Icon Affordance

## Objective

Make social and contact icons feel touchable without becoming decorative.

## Acceptance criteria

- [ ] Social icons respond on hover and focus.
- [ ] Motion remains lower intensity than CTAs.
- [ ] Reduced-motion mode removes transform.
- [ ] No rotation, bounce, or brand-color fireworks are introduced.

## Steps

1. Update `.footer-social-icons` styles.
2. Add tiny lift and color normalization.
3. Add focus-visible behavior.
4. Ensure reduced-motion rule removes transform.

## Tests

- Manual footer pass on desktop and mobile widths.
- Run `npm run build`.

