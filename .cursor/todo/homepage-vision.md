# Homepage restructure — instructions directly mapped to `vision.md`

Source of truth: `vision.md`
Implementation location: `src/pages/index.astro` (texts + section order live here)
Hard constraint: do not delete unused components (comment-out on homepage is OK).

## 0) What we are changing (in plain language)

Current homepage order (today):
- Hero (variant picker)
- 3 big “Services” blocks (IoT / Backstage / Rapid)
- WhyWorkWithMe (grid with header + optional CTA)
- BentoShowcase
- Engagement Models
- CTA

Target homepage order (from `vision.md`):
1) Intro (based on current “Why work with me” grid) **as the first section**, but:
   - **no header**
   - **no link/CTA below**
   - keep the existing grid content; additionally add **two horizontal boxes** (see below)
   - replace the existing “quote”-like content/slot (TBD) with the Hero copy (see below)
2) A clear positioning section:
   - “Not Just a Developer. Hands-On CTO With Business & UX Understanding.”
3) “Areas of expertise” section (consider renaming to “Current focus”):
   - uses `EngagementModels` component (layout) but content is: Rapid / IoT / Backstage
   - remove/comment-out the homepage “Services” blocks (keep components and data in repo)
4) “Engagement Models”
5) “Let’s Build Something From Scratch” (CTA)

## 1) Exact copy references (where text comes from)

From `vision.md`:
- The hero description copy to move into the new first section:
  “Hands-On CTO for Innovation Projects | I build complex technology solutions from vision to working prototype - and assemble teams to scale them. With 20+ years across full-stack development, IoT, robotics, DevOps, management, and UX, I act as your technical co-founder until you have a team.”
- The second section headline:
  “Not Just a Developer. Hands-On CTO With Business & UX Understanding.”

In code today (`src/pages/index.astro`), these already exist as:
- `heroVariants.A.componentProps.description` (the long hero description)
- `whyWorkWithMe.headline` (the “Not Just a Developer...” headline)

## 2) How it should look on the page (wireframe-level)

### Section 1: Intro “Why work with me” grid (no header, no CTA)

Goal: first fold communicates “why me” + a quick “what I do” summary, without feeling like a classic hero.

Content requirements:
- Keep the grid layout style of `WhyWorkWithMe` (3 columns grid).
- Remove/hide:
  - the top header (`SectionHeader`)
  - the bottom CTA/link (`SectionCTA`)
- Add 2 horizontal boxes:
  - Box A: first half (or selected fragment) of the hero description copy
  - Box B: second half (or selected fragment) of the hero description copy

Decision needed (answer here):
- “Disable header”: **hide header only** OR **hide most of the grid content and keep only boxes**?
  - Odpowiedz: header only
- How do we split the hero description into two boxes (exact text per box)?
  - Box A (1x1): Hands-On CTO for Innovation Projects
  - Box B (2x1): I build complex technology solutions from vision to working prototype - and assemble teams to scale them. With 20+ years across full-stack development, IoT, robotics, DevOps, management, and UX, I act as your technical co-founder until you have a team.
- Should there be a subtle “scroll down” link (not now vs add later)? 
  - Odpowiedz: maybe later; not necessary now

### Section 2: Positioning (“Not Just a Developer...”)

This is explicitly mentioned in `vision.md` as the 2nd section.

Decision needed (answer here):
- Should this reuse the existing `WhyWorkWithMe` section (with header on) OR be a simpler text section?
  - Odpowiedz: reuse `WhyWorkWithMe`, but without header and footer (ideally the component supports disabling these parts)

### Section 3: “Areas of expertise” (using `EngagementModels` layout)

We reuse the `EngagementModels` component for layout, but the content changes to 3 expertise cards:
- Rapid Application Prototyping with AI
- IoT Product Engineering
- Backstage Developer Portals

Decision needed (answer here):
- For each expertise card, where should it link?
  - Rapid → (e.g. `/offer`, `/portfolio`, calendar):
  - IoT → :
  - Backstage → (probably `/offer/backstage`?):

Answer (current):
- Rapid: not clickable for now
- IoT: not clickable for now
- Backstage: can link to `/offer/backstage`

## 5) Remaining clarifications (still needed)

These are the only open bits after your answers above:

1) Section 1 “replace quote with hero text” — clarification
   - Your answer: “nie rozumiem” (OK — this question was too speculative).
   - Resolution for implementation: **do not move/show the Hero quote anywhere for now**.
   - We only reuse the Hero copy via the two boxes:
     - Box A: “Hands-On CTO for Innovation Projects”
     - Box B: the long hero description

2) Section 2 is “Not Just a Developer...”, but you also want “reuse WhyWorkWithMe without header/footer”. 
   - Where should the “Not Just...” text actually appear if we hide the header?
   - Option A: keep Section 2 header ON (only footer OFF)
   - Option B: place “Not Just...” as a big text block inside the grid (e.g., first column, first paragraph)
   - Your answer: “ma zostac z header i footer wyłaczony”
   - Still needed (pick one, because header is OFF but we must show the text somewhere):
     - Option B (recommended): render “Not Just...” inside the grid as a prominent heading block (new slot/prop)
     - Option C: render a simple `<h2>` above the grid (not using `SectionHeader`, but still visible)
   - Odpowiedz:

3) Section 3 title: keep “Areas of expertise” or rename to “Current focus”?
   - Odpowiedz: rename to “Current focus”

### Section 4: Engagement Models (existing)

Move/keep the existing engagement models section after “Areas of expertise”.

### Section 5: CTA (existing)

Keep “Let’s Build Something From Scratch” at the end.

## 3) Implementation checklist (mid-dev)

(B) Update `src/pages/index.astro` section order to match the Target order +Home @frontend #feature
(B) Comment out Hero section on homepage (keep component) +Home @frontend #ux
(B) Comment out homepage `services.map(...)` section +Home @frontend #architecture
(B) Add new “intro grid” section (based on `WhyWorkWithMe` layout but without header/CTA) +Home @frontend #ui
(B) Add new “areas of expertise” config object and render it via `EngagementModels` +Home @frontend #architecture
(C) Decide what to do with `BentoShowcase` (remove/move/rewrite) +Home @ux #content

## 4) Manual acceptance checklist (definition of done)

- Homepage starts with Intro grid (no Hero visible).
- Intro grid shows two horizontal boxes with the selected hero description copy.
- “Not Just a Developer...” is the second section.
- “Areas of expertise” shows exactly 3 items: Rapid / IoT / Backstage.
- Engagement Models comes after Areas of expertise.
- CTA is last.
- No placeholder links; no empty headers; no broken layout on mobile.

