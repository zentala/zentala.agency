# Task 006 — Backstage Page Redesign

**Goal:** Redesign `/about/capabilities/backstage/` to (a) integrate the **DevStage.io** brand, (b) add missing sales-essential sections (proof, process, FAQ, target audience), and (c) align styling with the Section Primitives system used on the homepage.

**Status:** in progress
**Created:** 2026-04-27
**Page:** `src/pages/about/capabilities/backstage.astro`

---

## Why redesign

Current page issues (audit before this task):

1. **DevStage.io brand absent.** The dedicated brand for Backstage work is not mentioned, linked, or visually referenced anywhere on the page.
2. **No proof / case studies.** The page makes promises ("I build complex plugins") without any evidence — a sales page without proof.
3. **No target audience.** "Who hires me" is never stated. CTOs reading this can't tell if it's for them.
4. **Two redundant sections.** "Long-Term Partnership Model" and "I Don't Just Consult. I Build." say the same thing in different words.
5. **No process / timeline.** Buyer can't picture how an engagement actually unfolds.
6. **No FAQ.** Common pre-call questions (pricing range, timezone, NDA, remote/onsite) are unanswered → friction before booking.
7. **Inconsistent bullet markers.** `✓` in Development Services, `•` in Engagement Model, `▶` in About — three styles on one page.
8. **Hero is weak.** "Bringing innovative solutions to your Developer Experience" is filler. The TODO comment in code already proposed a stronger version.
9. **Built with old wrappers.** Uses `<section class="section-full">` + `<CardContainer>` instead of the unified `<Section>` / `<SectionGrid>` / `<SectionContent>` primitives the homepage migrated to (2025-10-07).
10. **About is at the bottom.** In a consulting page, trust signals belong earlier.

---

## New page structure

10 sections, top → bottom. All using Section Primitives.

### 1. Hero (rewrite)

- **Tag (small caps above title):** `DevStage.io · Backstage Specialists`
- **Title:** `Extend Backstage. Ship What Your Team Can't.`
- **Subtitle:** `Custom plugins, processors, and strategic DevEx consulting for platform teams running Backstage at scale.`
- **Availability hint (small text, muted):** `Currently booking Q3–Q4 2026 · Remote, CET timezone`

### 2. Who hires me (NEW — `SectionGrid columns={3}`)

Three personas, each one card. Format: `Persona name → pain point → what I do for them`.

- **Platform Leads** — *"Plugin requests pile up faster than your team can ship them."* I build the plugins that unblock your roadmap, then hand them to your team to maintain.
- **CTOs scaling 50→200 devs** — *"Backstage rollout stalled at 'works for my squad' but not the org."* I audit your current setup, design the path to org-wide adoption, and execute the missing pieces.
- **Engineering Managers** — *"Your team can run Backstage but can't extend it."* I build the first 3–5 custom plugins alongside your devs, transferring the skill so they ship the next 20.

Icons: `ph:user-focus-thin`, `ph:strategy-thin`, `ph:graduation-cap-thin`.

### 3. Development Services (keep — `SectionGrid columns={3}`)

Already good. Tighten to exactly 4 features each (currently uneven: 4/4/4 — fine, keep). Migrate from `<CardContainer>` to `<SectionContent context="grid">` with the icon as a card background via the existing `CardBackgroundIcon` mechanism.

3 cards stay: Custom Plugin Development · Processors Engineering · Theme & UI Customization.

### 4. Strategic Consulting (keep — `SectionGrid columns={3}`)

Same migration. 3 cards: Strategic DevEx Consulting · AI-Powered DevEx · Developer Education.

Tighten Strategic DevEx feature list from 6 → 4 to match siblings.

### 5. DevStage.io banner (NEW — full-width feature section)

Visual: `SectionBento` with one wide card (`colSpan={4} rowSpan={1}`) containing:
- Left: heading + paragraph + CTA button
- Right (optional, later): `ph:plug-thin` or `ph:package-thin` background icon at large size

**Copy:**
- **Heading:** `Backstage work lives at DevStage.io`
- **Body:** `DevStage.io is the dedicated home for our Backstage practice — public plugin catalog, technical blog, and product offerings for platform teams. The page you're reading is the consulting front door; DevStage.io is where the products live.`
- **CTA:** `Visit DevStage.io →` (external link, `external={true}`)

### 6. How we work (NEW — `SectionGrid columns={4}`, numbered process)

Four-step process. Each card: phase number (01-04) + title + 1-sentence description.

- **01 — Discovery.** 60-min call to map your Backstage state, team size, and the top 3 friction points. Free, no commitment.
- **02 — Audit & Roadmap.** 1–2 weeks. I audit your current setup, write a roadmap with prioritized fixes and feature opportunities, deliver as a written report.
- **03 — Build.** Sprints (2–4 weeks each) or extended engagement (months). Plugins, processors, integrations — coded alongside your team.
- **04 — Handover.** Documentation, recorded walkthroughs, paired sessions. Your team owns what we build.

### 7. Engagement Models (consolidate — `SectionGrid columns={2}`)

Currently two separate sections ("Long-Term Partnership" + "I Don't Just Consult. I Build.") repeating the same message. Merge into one section with the existing 2 cards (Extended Engagement, Project Sprints). Drop the 3-card "Strategic Vision / Hands-On Coding / Team Empowerment" subsection — that content is already implied by everything else.

Standardize bullet style to `✓` everywhere on the page.

### 8. About / Your Backstage Partner (keep — `cards-grid--two-one`)

Existing structure works (text-heavy left card + smaller "What I Deliver" + "Why External Consultant" stack). Migrate to primitives where possible. Tighten copy — drop the line `"Companies hire me as their external DevEx consultant"` (already said elsewhere), make it about credibility (years, tech, named clients if allowed).

Switch all `▶` markers to `✓` for consistency.

### 9. FAQ (NEW — `SectionGrid columns={2}`)

Six questions, two columns. Answers ≤ 2 sentences each.

- **What's the typical engagement length?** Sprint engagements run 2–4 weeks per feature. Extended engagements run 3–6 months at 50–80% time, often renewed.
- **Do you work onsite?** Remote-first, CET timezone. Onsite kickoffs in EU possible by arrangement.
- **What does it cost?** Sprint engagements start around €15k. Extended engagements are scoped per month. Discovery call is free — pricing follows from the audit.
- **Can you sign an NDA?** Yes. Standard mutual NDA is fine, custom forms reviewed quickly.
- **Which Backstage versions?** Current Backstage (1.x). I track upstream releases and the Spotify Portal / Roadie / Red Hat Developer Hub variants where relevant.
- **What if my team needs to keep building after you leave?** That's the whole point. Every engagement includes documented patterns, recorded walkthroughs, and paired sessions so your team owns the work.

### 10. Final CTA (replace current — use existing `CTA` component)

Same component the homepage uses. Three buttons:
- `Schedule Discovery Call` → cal.com/zentala (primary)
- `Visit DevStage.io` → devstage.io (secondary, external)
- `Connect on LinkedIn` → linkedin.com/in/zentala (secondary, external)

Footer items: `Warsaw, Poland · CET` and `Working with clients worldwide`.

Drop the redundant 2-line paragraph "Extending Backstage for innovative teams..." — buttons + headline carry the message.

---

## Visual / styling decisions

- **Bullet markers:** `✓` everywhere (white at 50% opacity, full opacity on hover via the existing pattern from current code).
- **Icons:** Phosphor Thin (`ph:*-thin`), already integrated. Stay with current background-icon CSS (idle 0.06, hover 0.32).
- **Section primitives:** All new sections use `<Section>`, `<SectionHeader>`, `<SectionGrid>` / `<SectionBento>`, `<SectionContent context="grid">`. Match homepage architecture.
- **Hero:** Keep the existing `Hero.astro` component for now (huge centered title) but feed it the new copy. Add a small "tag" line above via a wrapper (or extend Hero later — out of scope for this task).
- **No new components.** Everything composes from existing primitives.
- **Color/palette:** unchanged — black background, white text, accent `#60a5fa` reserved for links.
- **Phosphor icons used new:** `ph:user-focus-thin`, `ph:strategy-thin`, `ph:plug-thin`, `ph:package-thin`, `ph:magnifying-glass-thin`, `ph:list-checks-thin`, `ph:hammer-thin`, `ph:handshake-thin`, `ph:question-thin`.

---

## Implementation steps

1. **Plan file** — this document. ✅
2. **Bump SEQUENCE.md** to `007`.
3. **Rewrite** `src/pages/about/capabilities/backstage.astro` with the 10-section structure.
4. **Verify build** — `npm run build` must pass with zero TS errors.
5. **Local preview** — run `npm run dev`, open `/about/capabilities/backstage/`, snapshot.
6. **Commit** — single commit, conventional message: `feat(backstage): redesign page with DevStage brand, process, FAQ, audience sections`.

---

## Out of scope (deferred)

- DevStage.io site itself (separate project).
- New `Hero` variant with tag line above title — small CSS tweak, fine to inline.
- Real case studies / logo strip — needs client list; placeholder section can come in a follow-up.
- Pricing page / detailed engagement scoping — the FAQ row covers it for now.
- Light theme variant — global concern.
