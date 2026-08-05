# Backstage Page — Corrections (post-research)

**Goal:** Trim the over-engineered redesign back to facts. Use ONLY content backed by devstage.io or by what was already on the original page. Keep the structural improvements (primitives migration, DevStage banner, ✓ markers); remove fabricated copy.

**Principle:** Improve what's there, don't reinvent. The user has actual market position — that's enough proof, no need to bajerować with invented numbers and dates.

---

## REMOVE (hallucinations)

| Where | What | Why |
|---|---|---|
| Hero subtitle area | `Currently booking Q3–Q4 2026 · Remote, CET timezone` | Fabricated availability window. Nothing on devstage.io says this. |
| FAQ | `Sprint engagements start around €15k. Extended engagements scoped per month.` | Invented pricing. DevStage doesn't publish pricing — uses "pay for results". |
| FAQ | `Current Backstage (1.x). I track upstream releases plus Spotify Portal, Roadie, and Red Hat Developer Hub variants where relevant.` | Wrong. Roadie/Port.io are COMPETITORS DevStage positions against, not variants we support. |
| FAQ | `2–4 weeks per feature... 3–6 months at 50–80% time` engagement length specifics | Made up. DevStage frames it as "scale up or down as needed". |
| Hero | Tag bar `DevStage.io · Backstage Specialists` | Keep — but use real brand line `DevStage by Żentała Innovation Agency`. |
| Personas section ("Who hires me") | Three invented personas (Platform Lead, CTO 50→200, Eng Manager) with quoted "pain points" | Stockowe. DevStage doesn't do personas — speaks to "your team / your org". DROP THE WHOLE SECTION. |
| Process section | Timing: "60-min call", "1–2 weeks audit" | DevStage actually publishes "30-minute call" — replace with real. |
| About section | `20+ years bridging technology and human communication` | Was already in original, fine. Keep. |

---

## REPLACE (with devstage-sourced facts)

### Hero
- **Title:** `Extend Backstage. Ship What Your Team Can't.` → keep, it's a fine outcome line, not factually wrong.
- **Subtitle:** rewrite to mirror devstage.io meta description: `Backstage and DevEx specialists. Fast implementations, data integrations, consulting. Enterprise experience, no vendor lock-in.`
- **Tag/eyebrow above hero:** change to `DevStage by Żentała Innovation Agency` (real footer line).
- **Drop** the booking-window line entirely.

### Process section ("How we work")
Use the **actual** 4 steps from devstage.io verbatim:
1. **Free Consultation** — 30-minute call to understand your Backstage needs and challenges. We assess fit.
2. **Technical Discovery** — We map your integration landscape, understand your organization, and define success metrics. Results in a clear engagement plan.
3. **Delivery & Iteration** — Expert hours focused on your specific work. Pay for results, scale up or down as needed.
4. **Handover & Support** — You own everything we build. Full source code, documentation, knowledge transfer.

### FAQ
Replace 6 fabricated Q&As with the 6 real DevStage FAQ topics + grounded answers:
1. **How do we start working together?** → Free 30-min consultation. No commitment, just a conversation about your Backstage needs.
2. **Do I need to commit to a long-term contract?** → No. Pay for results, scale up or down as needed.
3. **How is this different from Roadie or Port.io?** → Hosted services lock you into their stack. We deploy Backstage in **your** infrastructure — full source code, no vendor lock-in.
4. **What if we already have Backstage deployed?** → We come in to extend it: custom plugins, processors, data ingestion, security updates. Entry audit included.
5. **Can you help us build an internal DevEx team?** → Yes. Knowledge transfer is built into every engagement — your team learns as we work.
6. **Do you work remotely or onsite?** → Remote-first, CET timezone. Onsite kickoffs in EU possible by arrangement.

### DevStage banner
- Reuse exact tagline: `Backstage Specialists | Consulting & Implementations`
- Add real proof numbers next to body copy:
  - 3 years in Backstage
  - 4 enterprise IDP implementations
  - 1 open source plugin released
  - 5 specialists
- CTA: `Visit DevStage.io →` (already correct)

### Strategic Consulting cards
The agency page is **missing** two flagship DevStage services:
- **Security SLA** — 48h security update SLA, continuous upstream tracking, entry audit. This is concrete, hard to fake, differentiating.
- **AI Chat / MCP Server** — currently page has "AI-Powered DevEx" generic. Rename to match: `AI Chat & MCP` with the real bullet list (chat with catalog data, trigger self-service actions, MCP Server integration).

→ **Action:** Rename existing "AI-Powered DevEx" card to "AI Chat & MCP", update its bullets. Drop "Developer Education" OR keep — it maps to DevStage's "developer education via UX" line. **Decision: keep Developer Education, replace AI-Powered DevEx bullets, optionally add Security SLA as a 4th card** (going from 3 to 4 cards in Strategic Consulting). 4-column grid is fine.

### Final CTA
- Buttons unchanged (Cal · DevStage · LinkedIn).
- Footer items: drop the fabricated `Currently booking Q3–Q4 2026` line. Keep Warsaw/CET and worldwide.

---

## KEEP (was good)

- 10-section structure → reduce to 9 by dropping personas.
- Section primitives migration (Section/SectionGrid/SectionContent).
- Phosphor Thin icons + idle/hover opacity.
- DevStage banner concept.
- Engagement Models (2 cards) — already concise.
- About section content (was largely original copy, untouched).
- Final CTA component (homepage-aligned).
- Common questions section title.
- Tag bar concept above hero (just change the text).

---

## RESTORE from original page

The original page had this About section copy that I largely preserved — keep as is. No invented bio facts.

---

## Voice alignment

The original page used "I / my" (Paweł solo voice). DevStage.io uses "we / our team / 5 specialists". Mixed voice on this page is acceptable because:
- The agency page introduces Paweł as the consultant ("I'm Paweł Żentała")
- The DevStage banner/products switch to "we" because that's how the brand presents itself

**Rule:** "I" when talking about Paweł's role / experience / engagement. "We / DevStage" when describing products and team capability. Don't switch within a single sentence.

---

## Implementation steps

1. Edit `src/pages/about/capabilities/backstage.astro`:
   - Drop personas section block (Section #audience).
   - Update hero tag bar text and subtitle.
   - Rewrite process steps (4 cards) using devstage's verbatim wording.
   - Rewrite FAQ array (6 entries) with devstage-aligned content.
   - Update Strategic Consulting cards: rename `AI-Powered DevEx` → `AI Chat & MCP`, optionally add `Security SLA` 4th card. Decide: 3 or 4 cards.
   - Update DevStage banner copy with real stats.
   - Drop `currently booking Q3-Q4 2026` footer item from final CTA.
2. `npm run build`
3. Snapshot via Playwright.
4. Commit: `fix(backstage): replace fabricated copy with devstage.io-sourced facts`.
