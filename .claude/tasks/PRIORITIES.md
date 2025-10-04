# Project Priorities & Strategy

Central hub for current priorities, strategic alignment, and decision-making for zentala.agency project.

**Purpose:** Align Claude agents with Paweł's current priorities and business goals.

**Created:** 2025-10-05
**Last Updated:** 2025-10-05

---

## 🎯 Current Priorities (Paweł's Alignment)

**🎨 MEGA PRIORITY:** Beautiful homepage with reusable design system = foundation for everything else

### Top Priority (Do Now) 🔥
1. **Homepage - Full Design & Polish** (Task 001 + ongoing work)
   - **Typography improvements** - refine text hierarchy, readability
   - **Color palette refinement** - czarno-biały base, ale blue accent niekoniecznie, adjust
   - **Rich sections** - add badges, visual elements (shadcn-style)
   - **Reusable primitives** - max reusability of design components
   - **Good texts** - już są niezłe, polish where needed
   - **Goal:** Launch-ready beautiful homepage that impresses

### High Priority (After Homepage) 🎨
2. **Design System Documentation** - ongoing with practice
   - Document patterns as we use them
   - Update CLAUDE.THEMING.md with new primitives
   - Living documentation - update when learning
   - Goal: Easy to reuse components, consistent design

3. **Light Theme** (Task 002)
   - After homepage is solid
   - Extends design system
   - Better accessibility

4. **Animations** - differentiate black/white design
   - After light theme
   - Critical for visual interest in minimal design
   - Subtle, professional animations

### Medium Priority (Foundation) 🏗️
5. **SEO & Good Internet Presence**
   - Google visibility
   - Professional appearance everywhere
   - Not scattered/broken

6. **Better Workflow** - dev branch strategy
   - Develop on branches, not main
   - Merge to main only when ready
   - Main auto-deploys (avoid accidental deploys)

### Lower Priority (Later) 📋
7. **Content Strategy** - ongoing, but not blocking homepage
8. **Image Placeholders** - nice to have, but homepage design first
9. **Technical Debt** - cleanup when convenient, not urgent

---

## 💡 Key Insights

**Important distinction:**
- Some tasks are **refined** (easy to describe) ≠ **priority** (what matters most)
- Refined tasks in backlog might not be top priority
- Real priority = beautiful homepage with reusable design system
- Everything else supports or follows this goal

**Workflow philosophy:**
- Build once, reuse everywhere (design primitives)
- Document as we go (living docs)
- Polish homepage first, then expand
- Main branch = production ready only

---

## 📊 Tasks Status Overview

### Active Tasks
```
001_home_page/          ⏳ In Progress - Homepage redesign
002_light_theme/        📋 Planned - Light theme implementation
```

### Backlog (Unrefined)
```
SEO_SCHEMA_ORG.md              🔴 High - SEO + meta tags + Schema.org
IMAGE_PLACEHOLDER.md           🟡 Medium - Placeholder component
CONTENT_STRATEGY.md            🟡 Medium - Content planning (ongoing)
CHAT_FEATURE_FLAG_FIX.md       🟢 Low - Bundle optimization
BUILD_WARNINGS_CLEANUP.md      🟢 Low - Technical cleanup
HOMEPAGE_IMPROVEMENTS.md       🟡 Medium - Additional homepage ideas
```

### Completed
```
(none yet)
```

---

## 🧠 Strategic Thinking & Decisions

### Project Vision
- **Primary Goal:** Attract consulting clients (Fractional CTO, Rapid Prototyping)
- **Target Audience:** Non-technical founders, early-stage startups, scale-ups
- **Positioning:** Expert fractional CTO + rapid prototyping specialist in Warsaw
- **Differentiator:** Speed, technical depth, business focus
- **Visual Identity:** Beautiful, minimal (black/white), professional, modern

### Technical Strategy
- **Design System:** Custom, sophisticated, REUSABLE primitives
  - Dark theme (current focus)
  - Light theme (next phase)
  - Animations (differentiate minimal design)
- **Content:** MDX-based blog, case studies, service pages
- **Performance:** Static site (Astro), optimize bundles
- **SEO:** Structured data, meta tags, content strategy
- **Workflow:** Dev branches → main (auto-deploy only when ready)

### Business Priorities (Updated)
1. **Beautiful Homepage** - MEGA PRIORITY, first impression, conversion point
2. **Reusable Design System** - Build once, use everywhere, scale efficiently
3. **Professional Internet Presence** - Google, social media, everywhere polished
4. **Content & SEO** - Foundation for growth (after homepage ready)
5. **Portfolio & Case Studies** - Proof, credibility (ongoing)

---

## 💭 Open Questions & Discussions

### Image Placeholders
- **Decision needed:** Random icons per load vs fixed set vs per-category?
- **Current thinking:** Simple first - fixed logo + 2 random icons, black background
- **Animation:** Pulse during loading only? Or always?
- **Scope:** Homepage first, expand later

### Services Structure
- **Current:** `/offer` page lists capabilities
- **Future plan:**
  - Rename `/offer` → `/capabilities` (skills showcase)
  - Create individual service pages:
    - `/services/fractional-cto`
    - `/services/rapid-prototyping`
    - `/services/poc-development`
    - `/services/team-assembly`
- **Schema.org:** Each service gets proper schema
- **Timeline:** After SEO task, part of content strategy

### Content Focus Areas
Based on homepage analysis:
1. **Fractional CTO** - Main service, biggest opportunity
2. **Rapid Prototyping** - Clear differentiator, fast delivery
3. **PoC Development** - Startup validation phase
4. **DevEx/Backstage** - Niche expertise, technical depth

---

## 📋 Next Task Selection Criteria

When choosing what to work on next, consider:

### Impact vs Effort Matrix
```
High Impact, Low Effort:    DO FIRST ✅
- Image Placeholder (1 day, better UX)
- Clean homepage content (few hours, conversion)

High Impact, High Effort:   PLAN & SCHEDULE 📅
- SEO + Schema.org (2-3 days, foundation)
- Service pages (ongoing, conversions)

Low Impact, Low Effort:     FILL GAPS 🕐
- Build warnings cleanup (few hours, clean code)
- Chat feature flag (few hours, smaller bundle)

Low Impact, High Effort:    DEFER ⏸️
- (none identified yet)
```

### Current Thinking (Aligned with Paweł)
1. **Perfect Homepage** - not "finish" but POLISH
   - Typography refinement
   - Color palette adjustment (blue accent review)
   - Rich sections (badges, visual elements)
   - Reusable primitives extraction
   - Beautiful, launch-ready

2. **Design System as We Go** - document patterns we create
   - Update CLAUDE.THEMING.md with new primitives
   - Living documentation
   - Max reusability

3. **After Homepage Solid:**
   - Light theme (extend system)
   - Animations (differentiate minimal design)
   - SEO foundation
   - Better workflow (dev branches)

4. **Defer Until Homepage Ready:**
   - Image placeholders
   - Content strategy execution
   - Technical debt cleanup

---

## 🔄 Task Workflow Reminders

### When Starting a Task
1. Check `.claude/SEQUENCE.md` for next number
2. Move from `backlog/` to numbered folder
3. Create comprehensive `README.md`
4. Update `SEQUENCE.md`
5. Update this file (tasks/README.md) with status

### When Completing a Task
1. Mark complete in task's README.md
2. Add completion date
3. Move folder to `tasks/done/`
4. Update this file with lessons learned

### Regular Reviews
- **Weekly:** Review priorities, adjust based on business needs
- **Monthly:** Evaluate completed tasks, plan next month
- **Quarterly:** Strategic review, adjust vision if needed

---

## 📝 Notes & Learnings

### Design System Insights
- Grid system uses transparent border pattern (no double borders)
- All spacing must be responsive (use mixins)
- Never add borders to card components - grid handles it
- SCSS breakpoints ≠ Tailwind breakpoints (don't mix!)

### Build Process
- **Always** `npm run build` before commit
- TypeScript strict mode catches errors early
- SCSS deprecation warnings = future breaking changes
- Large bundles (chat: 866kB) need conditional imports

### Content Insights
- Homepage currently IS the offer page
- `/offer` will become `/capabilities` (skill showcase)
- Main services: Fractional CTO, Prototyping, PoC, Team Assembly
- Keywords: focus on "fractional CTO", "rapid prototyping", "PoC"

---

## 🎯 Success Metrics (Future)

### Traffic Goals
- [ ] Define baseline traffic
- [ ] Set monthly growth targets
- [ ] Track keyword rankings

### Conversion Goals
- [ ] Contact form submissions
- [ ] Calendar bookings (discovery calls)
- [ ] Newsletter signups

### Content Goals
- [ ] Blog posts per month
- [ ] Case studies published
- [ ] Service pages completed

---

## 🔗 Related Files

- **[CLAUDE.TASKS.md](../CLAUDE.TASKS.md)** - Task management structure & guidelines
- **[CLAUDE.META.md](../CLAUDE.META.md)** - SEO strategy & keywords
- **[CLAUDE.THEMING.md](../CLAUDE.THEMING.md)** - Design system rules
- **[SEQUENCE.md](../SEQUENCE.md)** - Next task number
- **[Backlog](./backlog/)** - Unrefined tasks
- **[Done](./done/)** - Completed tasks (when we have some)

---

## 💬 How to Use This File

**For Claude:**
- Read this at start of session about tasks
- Understand current priorities
- Check open questions before asking Paweł
- Update when priorities change
- Add learnings as we go

**For Paweł:**
- Central place to communicate priorities
- Update when business needs change
- Add new ideas to "Open Questions"
- Review regularly to stay aligned

---

**Remember:** This is a living document. Update it whenever priorities shift, new insights emerge, or strategic decisions are made. Keep it concise but comprehensive.