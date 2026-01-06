# Task 001: Homepage Redesign

## 📋 Task Overview

**Goal:** Redesign and implement new homepage for zentala.agency showcasing Paweł Żentała as "Hands-On CTO" with 3 core service offerings and A/B testable hero variants.

**Status:** 🟡 Ready for Development
**Assigned to:** Mid-Level Full-Stack Dev Team
**Estimated Effort:** 80-100 hours (3 sprints × 1 week)
**Priority:** P0 (Critical - Business MVP)

---

## 🎯 Business Objective

Transform homepage from minimal logo-only page into conversion-focused landing page that:
- Clearly positions Paweł as "Day 1 CTO" for greenfield tech projects
- Showcases 3 core services: IoT Engineering, Backstage/DevStage.io, Rapid Prototyping
- Enables A/B testing of 5 different hero variants
- Provides clear CTAs for discovery calls and portfolio exploration

**Target Audience:**
- Investors with tech product ideas (100k+ PLN budgets)
- Companies needing greenfield projects (no existing IT team)
- Organizations requiring team assembly & technical leadership

---

## 📚 Documentation Index

### Strategic & Planning Documents

1. **[HOMEPAGE_REDESIGN_PLAN.md](HOMEPAGE_REDESIGN_PLAN.md)**
   - Initial strategic positioning
   - Messaging strategy & value propositions
   - Homepage structure (6 sections)
   - Brand guidelines & tone of voice

2. **[HOMEPAGE_FINAL_CONTENT.md](HOMEPAGE_FINAL_CONTENT.md)**
   - Complete content for all sections
   - 5 hero variant options (A, B, C, D, E)
   - Service descriptions with featured projects
   - "Why Work With Me" and engagement model copy
   - Content variations & alternative approaches

3. **[HOMEPAGE_IMPLEMENTATION_DECISIONS.md](HOMEPAGE_IMPLEMENTATION_DECISIONS.md)**
   - All approved decisions (assets, features, scope)
   - Simplified hero switcher implementation
   - Scroll anchors strategy
   - Placeholder images approach
   - Professional photo integration (CDN)
   - Company logos strategy (text first, logos ready)
   - Implementation checklist
   - Success criteria & Definition of Done

### Technical & Architecture Documents

4. **[IMPLEMENTATION_ARCHITECTURE.md](IMPLEMENTATION_ARCHITECTURE.md)**
   - Current project analysis (existing components, SCSS system)
   - Complete file structure & component architecture
   - Reusability strategy (what to reuse vs. extend)
   - Detailed component breakdown with code examples
   - Styling approach (Hybrid SCSS + Tailwind)
   - Responsive strategy
   - Developer considerations (composition, props, a11y, performance)
   - Implementation phases with time estimates

5. **[SCRUM_PLAN_HOMEPAGE.md](SCRUM_PLAN_HOMEPAGE.md)**
   - Product goal & team composition
   - Definition of Ready & Done
   - 6 Epics breakdown (97 SP → optimized to 63 SP)
   - 3 Sprint plan (21 SP each)
   - 27 detailed user stories with acceptance criteria
   - Dependencies mapping
   - Sprint ceremonies & metrics
   - Burndown tracking
   - Release plan (MVP + post-MVP iterations)

6. **[HOMEPAGE_FOLLOW_UP_TASKS.md](HOMEPAGE_FOLLOW_UP_TASKS.md)**
   - Post-launch enhancements (8 phases)
   - Performance & analytics (WebP, tracking, fonts)
   - UX enhancements (animations, testimonials)
   - SEO & discoverability (Schema.org, sitemap)
   - Content expansion (service pages, case studies)
   - Conversion optimization (A/B framework, forms)
   - Localization (Polish version)
   - Advanced features (theme toggle, PWA)
   - Prioritization matrix with timeline

---

## ✅ Key Decisions

### Assets
- ✅ Professional photo: `https://cdn.zentala.io/images/avatar.jpg`
- ✅ Logo: Existing `/public/logo.ext.svg`
- ✅ Portfolio images: Placeholders first, real images later
- ✅ Company logos: Text first, toggle for logos when ready

### Features - NOW (MVP)
- ✅ 5 hero variants (A, B, C, D, E)
- ✅ Hero switcher: DEV ONLY (URL params `?hero=X`)
- ✅ 3 service sections (IoT, Backstage, Rapid Prototyping)
- ✅ Scroll anchors to all sections
- ✅ Responsive & accessible
- ✅ Single meta (not per variant)

### Features - LATER (Follow-Up)
- 📋 WebP optimization
- 📋 Analytics tracking
- 📋 Scroll animations
- 📋 Schema.org structured data
- 📋 A/B testing framework
- 📋 Polish localization

---

## 🏗️ Architecture Overview

### Component Structure
```
src/components/home/
├── HeroWithVariations.astro   # Container with URL-based variant switching
├── HeroVariantA.astro          # Default hero variant
├── HeroVariantB.astro          # Alternative variants
├── HeroVariantC.astro
├── HeroVariantD.astro
├── HeroVariantE.astro
├── ServiceSection.astro        # Reusable service wrapper
├── ServiceIoT.astro            # IoT service content
├── ServiceBackstage.astro      # Backstage service content
├── ServiceRapidDev.astro       # Rapid prototyping content
├── FeaturedProjects.astro      # 3-column projects grid
├── ProjectCard.astro           # Individual project card
├── WhyWorkWithMe.astro         # Capabilities section
├── CapabilityBlock.astro       # Individual capability
├── EngagementModels.astro      # How I Work section
├── EngagementCard.astro        # Engagement model card
└── CTASection.astro            # Final CTA section
```

### Reusability Strategy
**Reuse as-is:**
- CardContainer.astro
- Button.astro
- Logo.astro
- Layout.astro
- Grid system (`cards-grid`)
- SCSS mixins & placeholders

**Extend/Create:**
- Homepage-specific components in `home/`
- New SCSS files: `_home.scss`, `_hero-variations.scss`

---

## 📅 Sprint Plan Summary

### Sprint 0: Pre-Sprint (1 day)
- Review docs with team
- Setup project board
- Sprint planning

### Sprint 1: Foundation & Hero (1 week, 21 SP)
**Goal:** Complete foundation and all 5 hero variants with switcher

**Stories:** 1.1-1.8
- Setup structure
- Create SCSS
- Build HeroWithVariations
- Build all 5 variants
- Dev switcher
- Responsive testing

### Sprint 2: Service Sections (1 week, 21 SP)
**Goal:** Complete all 3 service sections with featured projects

**Stories:** 2.1-2.8
- ServiceSection wrapper
- ProjectCard & FeaturedProjects
- Placeholder images
- 3 service sections (IoT, Backstage, Rapid)
- Responsive testing

### Sprint 3: Integration & Launch (1 week, 21 SP)
**Goal:** Complete remaining sections, integrate, test, launch MVP

**Stories:** 3.1-3.11
- WhyWorkWithMe, EngagementModels, CTA sections
- Homepage orchestration
- Scroll anchors & navigation
- Cross-browser testing
- Accessibility audit
- Performance optimization

**Total:** 63 Story Points across 3 weeks

---

## 🎯 Success Criteria (MVP)

### Functional Requirements
- ✅ All 5 hero variants working with dev switcher
- ✅ All 3 service sections with content
- ✅ Featured projects display (placeholders OK)
- ✅ Why Work With Me section
- ✅ Engagement Models section
- ✅ CTA section with working buttons
- ✅ Scroll anchors to all sections

### Quality Requirements
- ✅ Responsive at all breakpoints (480px, 770px, 1000px, 1440px+)
- ✅ Cross-browser (Chrome, Firefox, Safari)
- ✅ Lighthouse Performance >90
- ✅ Lighthouse Accessibility >90
- ✅ No console errors
- ✅ All links functional

### Content Requirements
- ✅ All copy from HOMEPAGE_FINAL_CONTENT.md
- ✅ Professional photo from CDN
- ✅ Placeholder images for projects
- ✅ Logo displayed correctly

---

## 🚀 Getting Started

### For Developers

1. **Read Documentation (Priority Order):**
   - Start: [HOMEPAGE_IMPLEMENTATION_DECISIONS.md](HOMEPAGE_IMPLEMENTATION_DECISIONS.md) - Quick decisions reference
   - Then: [IMPLEMENTATION_ARCHITECTURE.md](IMPLEMENTATION_ARCHITECTURE.md) - Component structure & code examples
   - Then: [SCRUM_PLAN_HOMEPAGE.md](SCRUM_PLAN_HOMEPAGE.md) - User stories & sprint backlog
   - Reference: [HOMEPAGE_FINAL_CONTENT.md](HOMEPAGE_FINAL_CONTENT.md) - Copy for all sections

2. **Setup:**
   ```bash
   # Ensure dependencies installed
   npm install

   # Start dev server
   npm run dev

   # Test different hero variants
   http://localhost:4321/?hero=A
   http://localhost:4321/?hero=B
   # etc.
   ```

3. **First Task (Story 1.1):**
   - Create `src/components/home/` folder
   - See SCRUM_PLAN_HOMEPAGE.md for acceptance criteria

### For Product Owner

1. **Review Content:**
   - [HOMEPAGE_FINAL_CONTENT.md](HOMEPAGE_FINAL_CONTENT.md) - All hero variants and section copy
   - Approve or request changes before Sprint 1

2. **Approve Decisions:**
   - [HOMEPAGE_IMPLEMENTATION_DECISIONS.md](HOMEPAGE_IMPLEMENTATION_DECISIONS.md) - All key decisions documented

3. **Sprint Reviews:**
   - End of Sprint 1: Review hero variants
   - End of Sprint 2: Review service sections
   - End of Sprint 3: Final approval for launch

### For Scrum Master

1. **Setup Project Board:**
   - Create columns: Backlog → Sprint Backlog → In Progress → Review → Done
   - Import 27 stories from [SCRUM_PLAN_HOMEPAGE.md](SCRUM_PLAN_HOMEPAGE.md)
   - Label stories: P0/P1, Epic1-6, Sprint1-3

2. **Schedule Ceremonies:**
   - Sprint Planning (2h at sprint start)
   - Daily Standup (15min daily)
   - Sprint Review (1h at sprint end)
   - Sprint Retrospective (1h after review)

3. **Track Metrics:**
   - Velocity (SP per sprint)
   - Burndown chart
   - Blockers log

---

## 📊 Dependencies & Blockers

### Resolved ✅
- Professional photo available (CDN URL)
- All content copy finalized
- Logo assets exist
- Design decisions approved

### Current Risks ⚠️
| Risk | Impact | Mitigation |
|------|--------|------------|
| Real images delayed | Low | Placeholders ready, easy swap |
| Content changes mid-sprint | Medium | Freeze after Sprint 1 |
| Safari responsive bugs | Medium | Early cross-browser testing |

### External Dependencies
- None - all assets and content available

---

## 📈 Post-MVP Roadmap

See [HOMEPAGE_FOLLOW_UP_TASKS.md](HOMEPAGE_FOLLOW_UP_TASKS.md) for complete backlog.

**High Priority (Sprint 4-6):**
- Analytics integration (track hero variants)
- Real portfolio images
- Schema.org structured data
- WebP optimization
- A/B testing framework

**Medium Priority (Month 2-3):**
- Scroll animations
- Testimonials section
- Service detail pages
- Company logos integration

**Low Priority (Month 4+):**
- Polish localization
- Advanced features (PWA, theme toggle)

---

## 📝 Notes & Learnings

### Design Decisions Rationale

**Why 5 hero variants?**
- A/B test different value propositions
- "Hands-On CTO" vs. "Problem-Solution" vs. "Builder" messaging
- Determine which resonates best with target audience

**Why dev-only switcher?**
- Quick testing during development
- Cleaner production experience
- URL params allow external testing (`?hero=X`)

**Why placeholders for images?**
- Unblock development
- Real images can be swapped quickly
- Maintain design consistency with color palette

### Technical Decisions Rationale

**Why hybrid SCSS + Tailwind?**
- Reuse existing design system (SCSS mixins, variables)
- Tailwind for quick utilities
- Scoped component styles prevent conflicts

**Why ServiceSection wrapper pattern?**
- DRY principle - 3 services use same structure
- Slot pattern for flexibility
- Consistent styling and spacing

**Why 3 sprints?**
- 1 week sprints = fast feedback
- 21 SP per sprint = sustainable velocity for 1-2 devs
- Clear milestones: Foundation → Content → Integration

---

## 🔗 Related Resources

### External Links
- Professional Photo: https://cdn.zentala.io/images/avatar.jpg
- Cal.com Booking: https://cal.com/zentala
- LinkedIn: https://linkedin.com/in/zentala
- DevStage.io: https://devstage.io

### Internal Pages
- Current Homepage: `/` (to be replaced)
- Portfolio: `/portfolio`
- About: `/about`
- Contact: `/contact`
- Backstage Offer: `/offer/backstage`

### Testing Strategy
- See: `LIGHT_THEME_IMPLEMENTATION_PLAN.md` (same approach)

---

## ✅ Task Completion Checklist

### Before Sprint 1
- [ ] All team members read documentation
- [ ] Project board setup with 27 stories
- [ ] Dev environment ready
- [ ] Sprint planning completed

### Sprint 1 Complete (Week 1)
- [ ] Foundation setup complete
- [ ] All 5 hero variants implemented
- [ ] Dev switcher working
- [ ] Hero responsive at all breakpoints

### Sprint 2 Complete (Week 2)
- [ ] ServiceSection wrapper reusable
- [ ] All 3 service sections complete
- [ ] Placeholder images in place
- [ ] Featured projects displaying

### Sprint 3 Complete (Week 3)
- [ ] All supporting sections complete
- [ ] Homepage fully integrated
- [ ] Scroll anchors working
- [ ] Cross-browser tested
- [ ] Accessibility audit passed
- [ ] Performance optimized

### Launch (End Week 3)
- [ ] Product Owner approval
- [ ] Deployed to production
- [ ] Hero variant A as default
- [ ] Analytics ready (follow-up)
- [ ] Monitoring in place

---

## 📞 Contact & Support

**Product Owner:** Paweł Żentała
**Scrum Master:** [TBD]
**Development Team:** 1-2 Mid-Level Devs

**Questions?**
- Technical: See [IMPLEMENTATION_ARCHITECTURE.md](IMPLEMENTATION_ARCHITECTURE.md)
- Content: See [HOMEPAGE_FINAL_CONTENT.md](HOMEPAGE_FINAL_CONTENT.md)
- Process: See [SCRUM_PLAN_HOMEPAGE.md](SCRUM_PLAN_HOMEPAGE.md)

---

**Last Updated:** 2025-10-03
**Task Created:** 2025-10-03
**Target Completion:** 2025-10-24 (3 weeks from start)
