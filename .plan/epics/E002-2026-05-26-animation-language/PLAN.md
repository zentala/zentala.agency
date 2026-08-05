# E002 — Animation Language

**Status:** planning
**Created:** 2026-05-26
**Owner:** zentala
**Architecture:** see [ARCH.md](./ARCH.md)
**Tasks:** see [ORCHESTRATOR.md](./ORCHESTRATOR.md)
**Source review:** [animations review](../../animations-review/README.md)

## What

Implement a coherent motion language for the public website. Motion should help
users understand orientation, affordance, priority, and state without making the
site feel noisy or decorative.

The epic converts the animation review into production changes:

1. Shared motion tokens for durations, easing, and small movement distances.
2. Header navigation hover, focus, and active route states.
3. Footer link and social icon motion.
4. Global reduced-motion policy.
5. Semantic CTA variants for primary, secondary, and external actions.
6. Blog card affordance.
7. Bento and section-header calibration.
8. Optional first-viewport entry sequencing.
9. Article TOC active-state tracking.
10. Regression coverage for critical motion semantics.

## Why

The current site is visually strong but uneven in motion. Bento and CTA areas
feel alive; global orientation surfaces such as header and footer feel static.
The goal is not to add more animation, but to make each animation communicate a
clear user-facing meaning.

## Scope

### In scope

- CSS/SCSS motion tokens.
- Header nav route affordance and active state.
- Footer text links and social icon affordance.
- CTA semantic variant motion.
- Blog index card hover/focus affordance.
- Bento timing/easing consistency.
- Reduced-motion support.
- Playwright coverage for key states.

### Out of scope

- Full visual redesign.
- New brand identity, fonts, colors, or content strategy.
- Replacing the Astro component structure.
- Animation-heavy scroll storytelling.
- Motion in third-party widgets.

## Constraints

- Keep each new file under 250 lines.
- Prefer CSS/SCSS changes over component rewrites.
- No layout shift on hover or focus.
- Every hover animation needs a keyboard `:focus-visible` equivalent.
- Reduced-motion users must retain state meaning without non-essential transforms.
- Preserve the black canvas, hard grid, precise borders, and calm technical tone.

## Schema impact

No database schema impact. This epic is frontend-only.

## Acceptance criteria

1. Header nav has hover, focus, and active route states that do not shift layout.
2. Footer links animate from a defined idle state, not by abruptly appearing.
3. Shared motion tokens exist and are used by at least header, footer, and CTA motion.
4. Global reduced-motion policy removes non-essential transforms.
5. Primary, secondary, and external CTA variants communicate different intent.
6. Blog cards clearly communicate that the whole card opens an article.
7. Bento motion uses the shared timing/easing family and remains the strongest motion anchor.
8. Interactive section headers no longer use large scale transforms.
9. Long-form blog TOC can communicate active section state.
10. Playwright coverage protects nav, footer, blog-card, and reduced-motion behavior.
11. `npm run build` succeeds.
12. Relevant Playwright tests pass.

## Test strategy

**Manual visual QA:**

- Home page: first viewport, bento, CTAs, footer.
- Blog index: article card hover/focus, metadata link behavior.
- Blog article: TOC active state and share rail controls.
- Backstage page: section CTA and footer consistency.

**Playwright E2E:**

- Header active route is visible on `/`, `/blog/`, and `/contact`.
- Header nav hover/focus exposes the route affordance.
- Footer links expose hover/focus affordance without layout shift.
- Blog cards expose hover/focus affordance while metadata remains secondary.
- Reduced-motion emulation disables transform-heavy motion.

**Build checks:**

- `npm run build`
- Relevant Playwright tests, preferably narrowed to motion-specific specs first.

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Motion becomes decorative noise | Medium | Medium | Keep intensity matrix: nav/footer low, cards medium, CTA/bento stronger |
| Hover changes cause layout shift | Medium | High | Avoid font-weight changes and text metric changes |
| Reduced-motion behavior becomes inconsistent | Medium | Medium | Add global policy and regression coverage |
| Tests become brittle due to timing | Medium | Medium | Assert computed states, not animation frames |
| Bento loses expressive identity | Low | Medium | Keep central bento as the motion anchor |

## Cross-references

- [Motion language review](../../animations-review/MOTION-LANGUAGE-REVIEW.md)
- [Animation recommendations](../../animations-review/RECOMMENDATIONS.md)
- [HTML presentation](../../animations-review/presentation.html)

