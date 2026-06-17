---
id: E002-T07
title: Improve blog card affordance
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, blog, motion]
epic: E002
branch: feat/E002-T07-blog-card-affordance
created: 2026-05-26
completed_at: null
---

# E002-T07: Improve Blog Card Affordance

## Objective

Make the blog index clearly communicate that each article card is a clickable
surface while metadata links remain secondary.

## Acceptance criteria

- [ ] Whole article card has clear hover/focus affordance.
- [ ] Metadata links do not compete with the article-open action.
- [ ] No layout shift occurs on card hover.
- [ ] Full-card scale is not used.

## Steps

1. Inspect blog index and card styles.
2. Add border sweep or surface highlight.
3. Add subtle title nudge or arrow reveal if needed.
4. Keep category/meta links low-intensity.

## Tests

- Playwright or manual hover/focus check on `/blog/`.
- Run `npm run build`.

