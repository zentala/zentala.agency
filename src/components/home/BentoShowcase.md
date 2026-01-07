# Bento Showcase / SectionBento

## Solution Architecture
- **Purpose:** This section is a living showcase of the Section Primitives system. It should demonstrate how the asymmetric bento grid can highlight personal story, credibility and business outcomes in a compact layout without editorial noise.
- **Content contract:** Keep the five cta-ish tiles plus two imagery hubs and the quoted story. Text must stay legible against the background, so the `SectionContent` blocks use the dark typography tone from the theme rather than forcing a high-contrast white override.
- **Interactive expectations:** The header remains interactive (`interactive={true}`) to invite scrolling, and the cards should expose hover/zoom affordances on the imagery tiles (already provided via `SectionImage.hoverZoom`).
- **Stability guardrails:** Avoid adjusting Typography variables or color tokens here without cross-validating with the rest of the site; this is a reference example for the SectionBento primitive and should keep the core copy/structure stable.

## Software Architecture (E2E Test Plan)
- **Goal:** Prove that the Bento showcase renders with the expected layout content and typography tone, and guard the font color so it cannot accidentally switch to a white/ghost tone that would break legibility. 
- **Playwright setup:** Reuse the existing `playwright.config.ts` (runs against `npm run preview` at `http://localhost:4321`). We'll add a dedicated `tests/e2e/bento-showcase.spec.ts` that can live alongside the link tests and run in the usual suite.
- **Test steps:**
  1. Launch Chromium (default Playwright project) and go to `/`.
  2. Scroll or wait for the `#bento-showcase` section to appear (ensure the anchor renders in the DOM). 
  3. Assert each highlight card contains the expected heading (e.g., `h3` text for "20+ Years", "Innovation", "Business Focus", etc.) to lock the copy.
  4. Inspect the computed color for the text inside `SectionContent` headings and paragraphs; verify it matches the dark tone from the theme (e.g., `rgb(15,23,42)` or the same value returned from `getColor('body-text-dark')`). Capture the actual computed color so we can understand why switching to white fails.
  5. Confirm we can see at least two imagery cards (by checking for two `img` elements under BentoCards with `SectionImage` class).
- **Visual gymnastics:** If the computed color differs between browsers, log the value and document it in the spec comments so we have a reference. This test effectively becomes both a functional and visual regression guard.
- **Next steps after approval:** Once we agree on this plan, implement the spec, run `npm run test:e2e` locally (per workflow), and surface the results along with any anomalous colors. Then we can loop back and decide whether to keep the styles as-is or explicitly theme them.
