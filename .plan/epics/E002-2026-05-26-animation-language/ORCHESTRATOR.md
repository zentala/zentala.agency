# E002 — Orchestrator

**Plan:** [PLAN.md](./PLAN.md) · **Architecture:** [ARCH.md](./ARCH.md)
**Strategy:** foundation first, then visible motion surfaces, then polish and tests.

## Status

- Current wave: 0 (planning)
- All tasks: [ ] not started
- Source review: [animations review](../../animations-review/README.md)

## Waves

### Wave 1 — foundation

Goal: shared motion language exists before component work.

- [ ] **[E002-T01](./tasks/E002-T01-motion-tokens.md)** — shared motion tokens
- [ ] **[E002-T02](./tasks/E002-T02-reduced-motion-policy.md)** — global reduced-motion policy

Wave done when: tokens exist, reduced-motion policy exists, build passes.

### Wave 2 — orientation surfaces

Goal: header and footer communicate navigation affordance.

- [ ] **[E002-T03](./tasks/E002-T03-header-nav-motion.md)** — header hover/focus/active route motion
- [ ] **[E002-T04](./tasks/E002-T04-footer-link-motion.md)** — footer link sweep and focus states
- [ ] **[E002-T05](./tasks/E002-T05-footer-social-icons.md)** — social icon affordance

Wave done when: nav/footer behavior is visible, keyboard-accessible, and layout-stable.

### Wave 3 — decision surfaces

Goal: CTAs and blog cards communicate action priority.

- [ ] **[E002-T06](./tasks/E002-T06-cta-motion-semantics.md)** — CTA semantic variants
- [ ] **[E002-T07](./tasks/E002-T07-blog-card-affordance.md)** — blog card affordance

Wave done when: primary/secondary/external CTAs differ and blog cards clearly read as openable.

### Wave 4 — calibration and article orientation

Goal: expressive areas stay intentional and long-form pages gain orientation.

- [ ] **[E002-T08](./tasks/E002-T08-bento-motion-calibration.md)** — bento timing and focus behavior
- [ ] **[E002-T09](./tasks/E002-T09-section-header-motion.md)** — replace large section-header scale
- [ ] **[E002-T10](./tasks/E002-T10-page-entry-sequencing.md)** — first-viewport entry sequence
- [ ] **[E002-T11](./tasks/E002-T11-blog-toc-active-state.md)** — article TOC active state

Wave done when: motion intensity matches the grammar matrix from the review.

### Wave 5 — regression coverage

Goal: protect the motion language from regressions.

- [ ] **[E002-T12](./tasks/E002-T12-motion-regression-tests.md)** — Playwright coverage

Wave done when: tests cover nav, footer, blog cards, and reduced-motion behavior.

## Dependencies graph

```text
T01 ─┬─> T03 ─┐
     ├─> T04 ─┼─> T12
     ├─> T05 ─┤
     ├─> T06 ─┤
     ├─> T07 ─┤
     └─> T08 ─┘
T02 ─────────> T12
T08 ─> T09
T01 ─> T10
T01 ─> T11
```

## Merge order

1. T01 + T02
2. T03 + T04 + T05
3. T06 + T07
4. T08 + T09 + T10 + T11
5. T12

## Done definition

All PLAN.md acceptance criteria pass, `npm run build` succeeds, relevant
Playwright tests pass, and epic IMPROVEMENTS.md is triaged.

