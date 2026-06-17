---
id: E002-T02
title: Add global reduced-motion policy
status: pending
priority: high
effort: small
type: improvement
dependencies: [E002-T01]
tags: [frontend, accessibility, motion]
epic: E002
branch: feat/E002-T02-reduced-motion-policy
created: 2026-05-26
completed_at: null
---

# E002-T02: Add Global Reduced-Motion Policy

## Objective

Ensure motion enhances the site but is not required for comprehension.

## Acceptance criteria

- [ ] Global `prefers-reduced-motion: reduce` policy exists.
- [ ] Non-essential transforms are disabled in reduced-motion mode.
- [ ] State changes remain understandable without motion.
- [ ] Smooth scrolling is disabled in reduced-motion mode.

## Steps

1. Review existing local reduced-motion rules.
2. Add global policy in the shared style layer.
3. Remove or align duplicate local behavior only when safe.
4. Verify state meaning remains visible.

## Tests

- Run `npm run build`.
- Emulate reduced motion in browser and inspect header, footer, CTAs, and cards.

