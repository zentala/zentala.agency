---
id: E002-T01
title: Add shared motion tokens
status: pending
priority: high
effort: medium
type: improvement
dependencies: []
tags: [frontend, motion, scss]
epic: E002
branch: feat/E002-T01-motion-tokens
created: 2026-05-26
completed_at: null
---

# E002-T01: Add Shared Motion Tokens

## Objective

Create one shared motion vocabulary for durations, easing, and movement
distances so future animations feel related instead of component-specific.

## Acceptance criteria

- [ ] Tokens exist in one shared style location.
- [ ] Tokens include fast/base/slow/intro durations.
- [ ] Tokens include standard/enter/exit easing.
- [ ] Tokens include small lift and shift distances.
- [ ] At least one existing CTA/grid motion uses tokens.

## Steps

1. Inspect `src/styles/variables.scss` and global imports.
2. Add motion tokens where existing style tokens live.
3. Replace one low-risk component's hardcoded motion values with tokens.
4. Document token purpose in concise comments if needed.

## Tests

- Run `npm run build`.
- Inspect computed styles for token-backed values.

