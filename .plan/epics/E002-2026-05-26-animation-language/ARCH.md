# E002 — Architecture Notes

## Motion System Direction

Motion is treated as a small design system layer, not as isolated component
styling. The preferred architecture is:

1. Shared motion tokens in the global style system.
2. Component-level variants consume those tokens.
3. Reduced-motion behavior is defined globally, with local exceptions only when
   a component has specific state needs.
4. Tests assert semantic states rather than exact animation timing.

## Candidate Files

- `src/styles/variables.scss`
- `src/styles/global.scss`
- `src/styles/footer.scss`
- `src/styles/components/_links.scss`
- `src/components/Header.astro`
- `src/components/Button.astro`
- `src/components/primitives/GridCTA.astro`
- `src/components/primitives/sections/SectionCTA.astro`
- `src/components/primitives/sections/SectionHeader.astro`
- `src/components/primitives/sections/bento/BentoCard.astro`
- `src/components/primitives/sections/bento/BentoCentralStage.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[postSlug].astro`

## Decisions

### D1 — Tokenize before adding more motion

Use shared motion tokens before implementing new effects. This keeps the site
from accumulating unrelated durations and easing curves.

### D2 — Route state is orientation, not decoration

Header nav active and hover states should use a stable underline/rail. Avoid
font-weight changes because they alter text metrics and can shift layout.

### D3 — Tests check meaning, not frames

Automated tests should verify active state, focus state, reduced-motion behavior,
and absence of layout shift. They should not assert exact animation progress at
specific milliseconds.

