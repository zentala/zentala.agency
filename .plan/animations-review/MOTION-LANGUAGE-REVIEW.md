# Motion Language Review

Created: 2026-05-26

## Scope

Reviewed the rendered website at desktop size across:

- Home page: `http://127.0.0.1:4321/`
- Blog index: `http://127.0.0.1:4321/blog/`
- Backstage capability page: `http://127.0.0.1:4321/about/capabilities/backstage/`

Source references:

- Header navigation: `src/components/Header.astro`
- Footer links: `src/components/Footer.astro`, `src/styles/footer.scss`
- Link style definitions: `src/styles/components/_links.scss`
- Bento grid: `src/components/primitives/sections/bento/BentoCard.astro`
- Central bento stage: `src/components/primitives/sections/bento/BentoCentralStage.astro`
- Section CTAs: `src/components/primitives/sections/SectionCTA.astro`
- Grid CTAs: `src/components/primitives/GridCTA.astro`
- Section images: `src/components/primitives/sections/SectionImage.astro`
- Blog article affordances: `src/pages/blog/[postSlug].astro`

## Executive Summary

The site already has a strong visual identity: black canvas, hard grid, precise
borders, large negative space, technical typography, and selected blue accents.
The current motion language is not absent, but it is uneven. Motion appears
mostly on hero/bento content, CTA cards, image zooms, and some blog article
utilities. Global orientation surfaces, especially desktop navigation and footer
links, behave much more quietly.

The result: the page feels alive in the middle, but static at the edges. Users
receive motion cues when exploring content, yet not when orienting themselves,
choosing a destination, or finishing a visit in the footer.

## Current Motion Vocabulary

### Existing Signals

- CTA components communicate "move forward" with arrow translation and subtle
  surface changes. This works well in `SectionCTA.astro` and `GridCTA.astro`.
- Image components communicate "inspect this" with hover zoom and overlay fade.
  This is appropriate for portfolio-like and bento imagery.
- The central home bento stage has a more dramatic motion profile: delayed text
  reveal, logo scaling, opacity transitions, and state-like behavior.
- Mobile hamburger animation communicates menu state with line rotation and
  collapse.
- Blog article utility controls use modest color and border transitions.

### Missing Signals

- Desktop nav does not communicate location, intent, or page transition. Its
  links only shift color via `hover:text-gray-400`.
- Footer links have a hover underline block, but the motion is abrupt because
  the pseudo-element appears on hover rather than animating from a known idle
  state.
- Blog index cards expose clickable regions, but the interaction feels like a
  color-state change rather than a card asking to be opened.
- Section headers have an optional interactive mode, but the current scale
  values are too strong for a content hierarchy element and can read as
  decorative rather than meaningful.
- Entrance animation is available on image primitives but not used as a coherent
  page-level sequencing system.

## Communication Assessment

### Navigation

I notice the header is visually important but motion-poor. The fixed header has
transition classes, and the mobile hamburger has a clear open/close morph, but
desktop links only change color. In communication terms, the navbar currently
says "these are static labels" rather than "these are possible routes".

What it should communicate:

- "You are here" through an active route marker.
- "This route is available" through a hover affordance that is immediate but not
  loud.
- "You are moving to a new context" through a small transition cue, not a full
  page theatrical effect.

Recommended motion language: a thin underline or rail that grows from left to
right on hover and stays present for the active page. Use slight text lift only
if the underline is too subtle. Avoid font-weight changes because they cause
layout jitter and break the hard-grid feel.

### Home Bento

I notice the home bento has the strongest motion personality. It communicates
technical depth, exploration, and "there is more behind this tile." That fits
the agency positioning: hands-on, systems-minded, experimental.

The risk is hierarchy imbalance. The central bento can feel like the only place
where the site is alive, while navigation, footer, and blog index feel like
static scaffolding.

What it should communicate:

- "Explore the system" on rich bento tiles.
- "This is a capability narrative, not a dashboard" through staged reveals.
- "You can inspect, but the page remains calm" through restrained transforms.

Recommended motion language: keep bento richer than nav/footer, but standardize
its easing and make surrounding components echo the same grammar at lower
intensity.

### CTAs

I notice CTAs already have the clearest animation semantics. Arrow motion means
"continue", border change means "selected", and active scale means "pressed".
This is the strongest part of the current system.

What it should communicate:

- Primary CTA: commitment and forward movement.
- Secondary CTA: exploration without commitment.
- External CTA: leaving the current site or opening a different context.

Recommended motion language: keep arrow translation, add a small background
sheen or border sweep only for primary CTAs, and make external CTAs use a
different icon movement than internal CTAs.

### Footer

I notice footer links currently have a custom underline-like block. The idea is
good because it matches the editorial/technical feel better than a generic
underline. The execution is not yet a motion system: the mark appears on hover,
so it reads as a visual state rather than an animated invitation.

What it should communicate:

- "You reached secondary navigation, but these are still live routes."
- External blog links should feel lighter than main CTAs.
- Social icons should feel touchable without becoming flashy.

Recommended motion language: animate underline scale from `transform-origin:
left`, add a small icon lift for social links, and distinguish external links
with a tiny outbound arrow or diagonal nudge.

### Blog And Content Navigation

I notice blog cards and article rails use restrained color/border transitions.
This fits reading contexts, but the blog index lacks a clear "open this story"
motion. Article cards are large clickable surfaces, so they should give a
surface-level response.

What it should communicate:

- "This whole card opens an article."
- "This metadata link is secondary; do not confuse it with the article action."
- "TOC movement is orientation, not decoration."

Recommended motion language: add card border sweep or slight image/text parallax
on article cards, and add active section tracking in the TOC if article pages
remain long-form.

## Consistency Findings

### High Impact

1. Header nav lacks the same interaction clarity as content cards.
   Evidence: `src/components/Header.astro` applies only `hover:text-gray-400`
   to desktop and mobile nav links. The computed desktop nav links had no
   transform or animation.

2. Footer link animation is visually present but not temporally intentional.
   Evidence: `src/styles/footer.scss` creates `::after` only on `:hover`, so
   there is no idle pseudo-element to animate from.

3. No shared motion tokens exist for duration, easing, distance, or intensity.
   Evidence: components use scattered `200ms`, `300ms`, `500ms`, `700ms`, and
   `800ms` values directly in component styles.

### Medium Impact

4. Home bento and CTA motion feel more considered than blog index cards.
   Evidence: bento has background transitions and state transitions; blog cards
   mainly use color/border transition defaults.

5. Interactive section headers are too forceful for their role.
   Evidence: `SectionHeader.astro` uses `scale(1.1)` on the full header and
   `scale(1.15)` on the headline. That reads as zooming content, not guiding
   attention.

6. Reduced-motion support exists in some primitives but not as a global policy.
   Evidence: `SectionCTA.astro`, `GridCTA.astro`, `SectionImage.astro`, and the
   blog article page include local reduced-motion handling, while navigation and
   footer do not define a shared fallback.

### Polish

7. Active route state is missing from the header.
8. External links do not have a consistent outbound motion cue.
9. Focus-visible motion is underdefined compared with hover motion.
10. Page entry sequencing is available in primitives but not orchestrated.

## Motion Principles To Adopt

- Orient first: nav and active-route motion should help users know where they
  are before it entertains them.
- Reward intent: hover/focus should confirm affordance, not surprise the user.
- Escalate by importance: nav is quiet, cards are medium, primary CTAs are
  strongest, hero/bento can be expressive.
- Preserve the grid: avoid hover effects that shift layout or change text
  metrics.
- Motion should explain state: menu open, card selectable, CTA continuing,
  external link leaving, TOC tracking.
- Respect calm reading contexts: blog/article motion should be quieter than the
  home bento.

