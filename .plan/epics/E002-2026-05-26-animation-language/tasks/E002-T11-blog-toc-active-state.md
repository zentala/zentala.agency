---
id: E002-T11
title: Add blog TOC active section state
status: pending
priority: medium
effort: medium
type: improvement
dependencies: [E002-T01, E002-T02]
tags: [frontend, blog, navigation]
epic: E002
branch: feat/E002-T11-blog-toc-active-state
created: 2026-05-26
completed_at: null
---

# E002-T11: Add Blog TOC Active Section State

## Objective

Help users understand where they are inside long articles.

## Acceptance criteria

- [ ] Active TOC item updates while scrolling.
- [ ] Marker motion is subtle and orientation-focused.
- [ ] Reduced-motion mode keeps state without animated movement.
- [ ] Behavior degrades safely when an article has no TOC headings.

## Steps

1. Review `src/pages/blog/[postSlug].astro` TOC markup.
2. Add IntersectionObserver-based active heading tracking.
3. Add active marker or border transition.
4. Respect reduced-motion behavior.

## Tests

- Manual or Playwright scroll pass on long blog articles.
- Run `npm run build`.

