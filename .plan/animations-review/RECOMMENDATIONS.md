# Animation Recommendations

Created: 2026-05-26

## Recommended Motion System

Define shared motion tokens before adding more one-off effects.

```scss
:root {
  --motion-fast: 150ms;
  --motion-base: 220ms;
  --motion-slow: 420ms;
  --motion-intro: 700ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.7, 0, 0.84, 0);
  --motion-lift-sm: -2px;
  --motion-shift-sm: 4px;
}
```

Use these tokens to make different components feel related while still allowing
different intensity levels.

## Priority Backlog

### P0 - Navigation Orientation

Add a desktop nav underline/rail animation and active route state.

- Element: desktop nav links in `src/components/Header.astro`.
- Communication: "this is a route", "this is where you are", "this is safe to
  click".
- Motion: underline scales from left to right on hover/focus; active page keeps
  a low-opacity underline.
- Duration: `--motion-base`.
- Easing: `--ease-standard`.
- Avoid: font-weight changes, large vertical movement, glow.
- Accessibility: include `:focus-visible`; respect reduced motion by keeping the
  underline state but removing transform animation.

### P0 - Footer Link Sweep

Convert footer link hover marks into animated idle pseudo-elements.

- Element: footer text links in `src/styles/footer.scss`.
- Communication: "secondary navigation remains interactive".
- Motion: `::after` exists at rest with `scaleX(0)` and animates to
  `scaleX(1)` from the left.
- Duration: `--motion-base`.
- Easing: `--ease-standard`.
- Variation: external links can sweep diagonally or expose a small outbound
  arrow; internal links should use the same flat underline as nav.

### P0 - Shared Reduced-Motion Policy

Create a global reduced-motion rule for transitions and scroll behavior.

- Element: global styles, likely `src/styles/global.scss` or a new motion
  partial imported from it.
- Communication: "motion is supportive, not required".
- Motion: no non-essential transforms when `prefers-reduced-motion: reduce`.
- Keep: color, border, and active state changes can remain instant.
- Avoid: repeated local-only policies that make behavior inconsistent.

### P1 - Article Card Affordance

Give blog index cards a clear "open story" interaction.

- Element: blog card component or card styles used by `src/pages/blog/index.astro`.
- Communication: "the whole surface is clickable".
- Motion: card border brightens, title moves `2px`, optional arrow appears or
  shifts in; no full-card scale.
- Duration: `--motion-base`.
- Variation: category/meta links should only change color to stay secondary.
- Reason: this prevents metadata links and article-open behavior from feeling
  equally important.

### P1 - CTA Semantic Variants

Differentiate primary, secondary, and external CTA motion.

- Element: `SectionCTA.astro`, `GridCTA.astro`, and `Button.astro`.
- Primary CTA: arrow shifts right and background/border sweeps subtly.
- Secondary CTA: only border and arrow shift; no filled sweep.
- External CTA: icon nudges diagonally up-right instead of right.
- Communication: internal continuation vs lower-risk exploration vs leaving the
  site.

### P1 - Bento Motion Calibration

Keep bento expressive, but lower the mismatch with the rest of the page.

- Element: `BentoCard.astro`, `BentoCentralStage.astro`, `BentoAboutMe.astro`.
- Communication: "explore this system".
- Motion: keep central state transitions, but ensure surrounding cards use the
  same easing and duration family.
- Add: focus-visible equivalent for keyboard users.
- Avoid: making every bento cell equally animated; central stage should remain
  the motion anchor.

### P1 - Page Entry Sequencing

Add restrained page-load sequencing for first viewport content.

- Element: layout-level motion utility or section primitives.
- Communication: "page assembled intentionally".
- Motion: header appears immediately; first content group fades and rises by
  `8px`; subsequent blocks stagger by `60ms`.
- Duration: `--motion-intro`.
- Easing: `--ease-enter`.
- Avoid: applying entrance animations to every section on long pages.

### P2 - Section Header Interaction

Replace large section-header scaling with a quieter highlight.

- Element: `SectionHeader.astro` interactive variant.
- Communication: "this section is important or inspectable", not "this block is
  a button".
- Motion: border color shift, background gradient reveal, optional icon drift.
- Replace: `scale(1.1)` and `scale(1.15)` with `translateY(-2px)` or no layout
  transform.

### P2 - TOC Active State

Add article TOC active-section motion.

- Element: `src/pages/blog/[postSlug].astro`.
- Communication: "you are here in the article".
- Motion: left rail marker slides to the active heading, or active link border
  transitions from transparent to accent.
- Duration: `--motion-base`.
- Keep reduced motion: marker jumps without animation.

### P2 - Social Icon Touchability

Add a minimal social icon hover/focus lift.

- Element: `.footer-social-icons` in `src/styles/footer.scss`.
- Communication: "these are active contact surfaces".
- Motion: translate up `-2px`, color to white, optional opacity normalization.
- Avoid: rotation, bounce, or brand-color fireworks.

## Motion Grammar Matrix

| Area | Motion job | Intensity | Suggested pattern |
| --- | --- | --- | --- |
| Header nav | Orientation and route choice | Low | Underline scale, active rail |
| Footer links | Secondary route discovery | Low | Underline sweep |
| Social icons | Contact affordance | Low | Tiny lift and color |
| Blog metadata | Secondary link affordance | Low | Color only |
| Blog cards | Open article | Medium | Border sweep, title nudge |
| Bento cards | Explore capability system | Medium-high | Background, state reveal |
| Primary CTA | Commit and continue | High | Arrow shift, subtle sweep |
| External CTA | Leave current context | Medium | Diagonal icon nudge |
| Page entry | Intentional composition | Medium | One-time fade/rise stagger |

## Implementation Order

1. Add global motion tokens and reduced-motion policy.
2. Implement nav hover/focus/active state.
3. Convert footer links to animated underline sweep.
4. Standardize CTA variants.
5. Improve blog card affordance.
6. Calibrate bento and section-header motion.
7. Add optional page-entry sequencing.
8. Add article TOC active-section tracking.

## Acceptance Criteria

- Header nav has visible hover, focus, and active states that do not shift layout.
- Footer links animate from a defined idle state rather than appearing abruptly.
- Motion durations and easings are tokenized or use a documented standard.
- Every hover animation has a keyboard `:focus-visible` equivalent.
- Reduced-motion users retain state changes without non-essential transforms.
- Primary CTA, secondary CTA, and external CTA communicate different intent.
- Blog cards clearly communicate that the whole card opens the article.

