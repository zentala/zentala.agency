# Homepage Redesign - Scrum Plan

## 🎯 Product Goal
Launch new homepage showcasing Paweł Żentała as "Hands-On CTO" with 3 core services (IoT, Backstage, Rapid Prototyping), 5 hero variants for A/B testing, and complete mobile responsiveness.

---

## 📊 Project Overview

### Team Composition
- **Product Owner:** Paweł Żentała
- **Scrum Master:** [TBD]
- **Development Team:** 1-2 Mid-Level Full-Stack Devs
- **Sprint Duration:** 1 week (5 working days)
- **Total Sprints:** 3 sprints to MVP

### Velocity Assumptions
- **Story Points per Sprint:** 13-21 (based on 1-2 devs, Fibonacci scale)
- **Working Hours per Day:** 6-8h productive coding time
- **Total Estimated Effort:** 80-100 hours (MVP)

---

## 📋 Definition of Ready (DoR)

A user story is ready for sprint planning when:
- [ ] Acceptance criteria clearly defined
- [ ] Design/mockup available (if UI-heavy)
- [ ] Dependencies identified and resolved or planned
- [ ] Technical approach discussed and agreed
- [ ] Story points estimated by team
- [ ] Assets available (images, content, etc.)

---

## ✅ Definition of Done (DoD)

A user story is done when:
- [ ] Code implemented and peer-reviewed
- [ ] Responsive at all breakpoints (480px, 770px, 1000px, 1440px+)
- [ ] No console errors or warnings
- [ ] Accessibility: semantic HTML, ARIA where needed
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Linting passes (`npm run lint`)
- [ ] Deployed to staging/preview
- [ ] Product Owner accepted

---

## 🚧 Identified Blockers & Risks

### Current Blockers
1. **Professional Photo** - ✅ RESOLVED: CDN URL available
2. **Portfolio Images** - ⚠️ RISK: Need placeholders, real images later
3. **Content Copy** - ✅ RESOLVED: All copy in `HOMEPAGE_FINAL_CONTENT.md`
4. **Logo Assets** - ✅ RESOLVED: Existing logo in `/public/`

### Risks & Mitigation
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Scope creep (adding features mid-sprint) | High | Medium | Strict DoR, move extras to backlog |
| Real images delayed | Low | High | Use placeholders, image swap is quick task |
| Responsive bugs on Safari | Medium | Medium | Early cross-browser testing |
| Content changes during dev | Medium | Medium | Freeze content after Sprint 1 |
| Performance issues (images too large) | Medium | Low | Lazy loading, compression from start |

---

## 📦 Epic Breakdown

### Epic 1: Foundation & Setup
**Goal:** Prepare codebase structure and reusable primitives

**User Stories:**
- Setup component structure
- Create SCSS files for homepage
- Configure smooth scroll behavior

**Estimated Effort:** 8 SP

---

### Epic 2: Hero Section
**Goal:** Implement 5 hero variants with dev switcher

**User Stories:**
- Hero variant A (default)
- Hero variants B, C, D, E
- Hero switcher component (dev only)
- Hero responsive & accessibility

**Estimated Effort:** 21 SP

---

### Epic 3: Service Sections
**Goal:** Implement 3 service sections with featured projects

**User Stories:**
- ServiceSection wrapper component
- ProjectCard component
- FeaturedProjects grid
- IoT service section
- Backstage service section
- Rapid Prototyping service section

**Estimated Effort:** 34 SP

---

### Epic 4: Supporting Sections
**Goal:** Why Work With Me, Engagement Models, CTA

**User Stories:**
- WhyWorkWithMe section
- CapabilityBlock component
- EngagementModels section
- EngagementCard component
- CTASection component

**Estimated Effort:** 13 SP

---

### Epic 5: Integration & Navigation
**Goal:** Compose homepage, add scroll anchors, update navigation

**User Stories:**
- Homepage orchestration (index.astro)
- Scroll anchors to all sections
- Update Header navigation
- Smooth scroll implementation

**Estimated Effort:** 8 SP

---

### Epic 6: Testing & Polish
**Goal:** QA, accessibility, performance, bug fixes

**User Stories:**
- Responsive testing all breakpoints
- Cross-browser testing
- Accessibility audit & fixes
- Performance optimization
- Visual polish & alignment

**Estimated Effort:** 13 SP

---

## 🗓️ Sprint Plan

### SPRINT 0: Pre-Sprint (Before Sprint 1 starts)
**Duration:** 1 day
**Goal:** Finalize DoR for all stories, gather assets

**Tasks:**
- [ ] Review all documentation with team
- [ ] Gather all assets (photo, logo, placeholders)
- [ ] Setup development environment
- [ ] Create backlog in project management tool
- [ ] Sprint planning session

---

### SPRINT 1: Foundation & Hero Section
**Duration:** 5 days (1 week)
**Sprint Goal:** Complete foundation and all 5 hero variants with switcher

**Capacity:** 21 SP

#### Sprint Backlog

| ID | Story | Story Points | Priority | Dependencies |
|----|-------|--------------|----------|--------------|
| 1.1 | Setup component structure | 2 | P0 | None |
| 1.2 | Create homepage SCSS files | 2 | P0 | None |
| 1.3 | Configure smooth scroll | 1 | P1 | None |
| 1.4 | Build HeroWithVariations container | 3 | P0 | 1.1 |
| 1.5 | Build HeroVariantA (default) | 5 | P0 | 1.2, 1.4 |
| 1.6 | Build HeroVariants B, C, D, E | 5 | P0 | 1.5 |
| 1.7 | Implement dev switcher | 2 | P1 | 1.4, 1.5 |
| 1.8 | Hero responsive testing | 1 | P0 | 1.5, 1.6 |

**Total:** 21 SP

**Daily Standup Questions:**
- What did I complete yesterday?
- What will I work on today?
- Any blockers? (especially: assets, content clarity)

**Sprint Review:** Demo all 5 hero variants, switcher functionality
**Sprint Retrospective:** What worked well? What to improve for Sprint 2?

---

### SPRINT 2: Service Sections & Projects
**Duration:** 5 days (1 week)
**Sprint Goal:** Complete all 3 service sections with featured projects

**Capacity:** 21 SP

#### Sprint Backlog

| ID | Story | Story Points | Priority | Dependencies |
|----|-------|--------------|----------|--------------|
| 2.1 | Build ServiceSection wrapper | 3 | P0 | Sprint 1 complete |
| 2.2 | Build ProjectCard component | 3 | P0 | 2.1 |
| 2.3 | Build FeaturedProjects grid | 2 | P0 | 2.2 |
| 2.4 | Create placeholder images | 1 | P0 | None |
| 2.5 | Build ServiceIoT section | 3 | P0 | 2.1, 2.3, 2.4 |
| 2.6 | Build ServiceBackstage section | 3 | P0 | 2.1, 2.3, 2.4 |
| 2.7 | Build ServiceRapidDev section | 3 | P0 | 2.1, 2.3, 2.4 |
| 2.8 | Service sections responsive testing | 3 | P0 | 2.5, 2.6, 2.7 |

**Total:** 21 SP

**Mid-Sprint Check-In (Day 3):**
- Are we on track for sprint goal?
- Any blockers with content or placeholder images?
- Do we need to adjust scope?

**Sprint Review:** Demo all 3 service sections with projects
**Sprint Retrospective:** Component reusability working well? Any pain points?

---

### SPRINT 3: Supporting Sections & Integration
**Duration:** 5 days (1 week)
**Sprint Goal:** Complete remaining sections, integrate homepage, launch MVP

**Capacity:** 21 SP

#### Sprint Backlog

| ID | Story | Story Points | Priority | Dependencies |
|----|-------|--------------|----------|--------------|
| 3.1 | Build WhyWorkWithMe section | 3 | P0 | Sprint 2 complete |
| 3.2 | Build CapabilityBlock component | 2 | P0 | 3.1 |
| 3.3 | Build EngagementModels section | 3 | P0 | Sprint 2 complete |
| 3.4 | Build EngagementCard component | 2 | P0 | 3.3 |
| 3.5 | Build CTASection component | 2 | P0 | Sprint 2 complete |
| 3.6 | Homepage orchestration (index.astro) | 2 | P0 | 3.1, 3.3, 3.5 |
| 3.7 | Add scroll anchors to all sections | 1 | P0 | 3.6 |
| 3.8 | Update Header navigation | 1 | P1 | 3.7 |
| 3.9 | Cross-browser testing | 2 | P0 | 3.6 |
| 3.10 | Accessibility audit & fixes | 2 | P0 | 3.6 |
| 3.11 | Performance optimization | 1 | P1 | 3.6 |

**Total:** 21 SP

**Sprint Review:** Full homepage demo, A/B test all hero variants, responsive demo
**Sprint Retrospective:** What did we learn? What's in backlog for next iteration?

**Go/No-Go Decision:** Ready to deploy to production?

---

## 📊 Detailed User Stories (Product Backlog)

### EPIC 1: Foundation & Setup

#### Story 1.1: Setup Component Structure
**As a** developer
**I want** organized component folders
**So that** code is maintainable and scalable

**Acceptance Criteria:**
- [ ] Create `src/components/home/` folder
- [ ] Folder structure matches `IMPLEMENTATION_ARCHITECTURE.md`
- [ ] Import paths work correctly

**Story Points:** 2
**Priority:** P0 (Must Have)

**Tasks:**
- Create folder structure
- Test import paths
- Document structure in README if needed

---

#### Story 1.2: Create Homepage SCSS Files
**As a** developer
**I want** dedicated SCSS files for homepage styles
**So that** styles are organized and don't pollute global scope

**Acceptance Criteria:**
- [ ] Create `src/styles/components/_home.scss`
- [ ] Create `src/styles/components/_hero-variations.scss`
- [ ] Import in `global.scss`
- [ ] No style conflicts with existing components

**Story Points:** 2
**Priority:** P0

**Tasks:**
- Create SCSS files
- Add imports to global.scss
- Test compilation

---

#### Story 1.3: Configure Smooth Scroll Behavior
**As a** user
**I want** smooth scrolling when clicking anchor links
**So that** navigation feels polished

**Acceptance Criteria:**
- [ ] `scroll-behavior: smooth` in global styles
- [ ] Scroll offset accounts for fixed header (if any)
- [ ] Works in Chrome, Firefox, Safari

**Story Points:** 1
**Priority:** P1

**Tasks:**
- Add CSS to global.scss
- Test scroll behavior
- Adjust offset if needed

---

### EPIC 2: Hero Section

#### Story 1.4: Build HeroWithVariations Container
**As a** developer
**I want** container component for hero variants
**So that** variants can be swapped via URL param

**Acceptance Criteria:**
- [ ] Component accepts `variant` prop (A-E)
- [ ] Renders correct variant based on prop
- [ ] Defaults to variant A if invalid/missing
- [ ] URL param `?hero=X` works

**Story Points:** 3
**Priority:** P0

**Dependencies:** 1.1 (component structure)

**Tasks:**
- Create HeroWithVariations.astro
- Implement variant logic
- Test URL params

---

#### Story 1.5: Build HeroVariantA (Default)
**As a** visitor
**I want** clear value proposition in hero
**So that** I understand what Paweł offers

**Acceptance Criteria:**
- [ ] Logo displayed correctly
- [ ] Professional photo from CDN (`https://cdn.zentala.io/images/avatar.jpg`)
- [ ] Name, headline, value prop, tagline visible
- [ ] 2 CTA buttons (primary, secondary)
- [ ] Responsive at all breakpoints
- [ ] Accessible (semantic HTML, alt text)

**Story Points:** 5
**Priority:** P0

**Dependencies:** 1.2 (SCSS), 1.4 (container)

**Tasks:**
- Create HeroVariantA.astro
- Import Logo, Button components
- Add professional photo
- Write SCSS styles
- Test responsive behavior

---

#### Story 1.6: Build HeroVariants B, C, D, E
**As a** Product Owner
**I want** multiple hero variants to A/B test
**So that** I can determine which converts best

**Acceptance Criteria:**
- [ ] All 5 variants (A-E) implemented
- [ ] Each has unique copy per `HOMEPAGE_FINAL_CONTENT.md`
- [ ] Same layout structure across variants
- [ ] All responsive and accessible

**Story Points:** 5 (1 SP per variant B-E, slight efficiency gain)
**Priority:** P0

**Dependencies:** 1.5 (variant A as template)

**Tasks:**
- Copy HeroVariantA.astro to B, C, D, E
- Update copy for each variant
- Test all variants render correctly

---

#### Story 1.7: Implement Dev Switcher
**As a** developer
**I want** visual switcher to test hero variants
**So that** I can quickly compare variants during development

**Acceptance Criteria:**
- [ ] Switcher visible ONLY in dev mode (`import.meta.env.DEV`)
- [ ] Fixed position (bottom-right corner)
- [ ] Buttons for variants A-E
- [ ] Active variant highlighted
- [ ] Clicking switches URL param

**Story Points:** 2
**Priority:** P1

**Dependencies:** 1.4 (container), 1.5 (variant A)

**Tasks:**
- Add switcher UI to HeroWithVariations
- Style switcher component
- Test dev/production behavior

---

#### Story 1.8: Hero Responsive Testing
**As a** user on any device
**I want** hero section to look good
**So that** I have positive first impression

**Acceptance Criteria:**
- [ ] Tested at 480px (mobile)
- [ ] Tested at 770px (tablet)
- [ ] Tested at 1000px (medium)
- [ ] Tested at 1440px+ (desktop)
- [ ] Photo, logo, text scale appropriately
- [ ] No horizontal scroll
- [ ] No overlapping elements

**Story Points:** 1
**Priority:** P0

**Dependencies:** 1.5, 1.6 (all variants)

**Tasks:**
- Use browser dev tools to test breakpoints
- Fix any responsive issues
- Document any edge cases

---

### EPIC 3: Service Sections

#### Story 2.1: Build ServiceSection Wrapper
**As a** developer
**I want** reusable wrapper for service sections
**So that** all services have consistent structure

**Acceptance Criteria:**
- [ ] Component accepts: id, headline, subhead
- [ ] Slots for: content, projects, cta
- [ ] Consistent padding, borders, styling
- [ ] Responsive layout

**Story Points:** 3
**Priority:** P0

**Dependencies:** Sprint 1 complete

**Tasks:**
- Create ServiceSection.astro
- Implement slot pattern
- Style with SCSS
- Test with mock content

---

#### Story 2.2: Build ProjectCard Component
**As a** visitor
**I want** to see project examples
**So that** I can understand Paweł's work

**Acceptance Criteria:**
- [ ] Accepts: title, description, image, href
- [ ] Displays image (16:9 aspect ratio)
- [ ] Falls back to placeholder if no image
- [ ] Hover effect on card
- [ ] "Learn more →" link
- [ ] Lazy loading for images
- [ ] Accessible (alt text, semantic HTML)

**Story Points:** 3
**Priority:** P0

**Dependencies:** 2.1 (ServiceSection)

**Tasks:**
- Create ProjectCard.astro
- Extend CardContainer component
- Add image handling
- Style card with SCSS

---

#### Story 2.3: Build FeaturedProjects Grid
**As a** developer
**I want** reusable 3-column grid for projects
**So that** all services display projects consistently

**Acceptance Criteria:**
- [ ] Accepts array of project objects
- [ ] Renders ProjectCard for each
- [ ] Uses existing `cards-grid` system
- [ ] Responsive (3 col → 2 col → 1 col)

**Story Points:** 2
**Priority:** P0

**Dependencies:** 2.2 (ProjectCard)

**Tasks:**
- Create FeaturedProjects.astro
- Implement grid layout
- Test with 3 projects

---

#### Story 2.4: Create Placeholder Images
**As a** developer
**I want** placeholder images for projects
**So that** I can build UI before real images available

**Acceptance Criteria:**
- [ ] 3+ placeholder images created
- [ ] 800x450px (16:9 aspect ratio)
- [ ] Dark theme colors (#1f2937 background)
- [ ] Saved in `/public/images/placeholders/`
- [ ] Compressed for web

**Story Points:** 1
**Priority:** P0

**Dependencies:** None (can start immediately)

**Tasks:**
- Create/generate placeholder images
- Optimize file size
- Save to public folder

---

#### Story 2.5: Build ServiceIoT Section
**As a** visitor
**I want** to learn about IoT services
**So that** I can decide if it fits my needs

**Acceptance Criteria:**
- [ ] Service description from `HOMEPAGE_FINAL_CONTENT.md`
- [ ] "What I deliver" bullet list
- [ ] "Experience highlights" with companies
- [ ] 3 featured projects (RTLS, Smart Desk, Smart Home)
- [ ] CTA button to contact
- [ ] Responsive and accessible

**Story Points:** 3
**Priority:** P0

**Dependencies:** 2.1, 2.3, 2.4

**Tasks:**
- Create ServiceIoT.astro
- Add content and projects
- Style with SCSS
- Test responsive behavior

---

#### Story 2.6: Build ServiceBackstage Section
**As a** visitor
**I want** to learn about Backstage services
**So that** I can evaluate for my organization

**Acceptance Criteria:**
- [ ] Service description from `HOMEPAGE_FINAL_CONTENT.md`
- [ ] "What I deliver" bullet list
- [ ] "Ideal for" description
- [ ] 3 featured projects (IDP, AI Chatbot, Processors)
- [ ] CTA link to DevStage.io
- [ ] Note about DevStage.io brand

**Story Points:** 3
**Priority:** P0

**Dependencies:** 2.1, 2.3, 2.4

**Tasks:**
- Create ServiceBackstage.astro
- Add content and projects
- Style with SCSS
- Test responsive behavior

---

#### Story 2.7: Build ServiceRapidDev Section
**As a** visitor
**I want** to learn about rapid prototyping services
**So that** I can consider for my app idea

**Acceptance Criteria:**
- [ ] Service description from `HOMEPAGE_FINAL_CONTENT.md`
- [ ] "What I deliver" bullet list
- [ ] Tech stack displayed
- [ ] Use cases listed
- [ ] 3 featured projects (gPNF, Infopill, Transit Display)
- [ ] CTA button to contact

**Story Points:** 3
**Priority:** P0

**Dependencies:** 2.1, 2.3, 2.4

**Tasks:**
- Create ServiceRapidDev.astro
- Add content and projects
- Style with SCSS
- Test responsive behavior

---

#### Story 2.8: Service Sections Responsive Testing
**As a** user on any device
**I want** service sections to be readable
**So that** I can learn about offerings on mobile

**Acceptance Criteria:**
- [ ] All 3 services tested at all breakpoints
- [ ] Project grids collapse properly (3→2→1 cols)
- [ ] Text readable (no overflow, proper font sizes)
- [ ] Images scale correctly
- [ ] CTAs accessible (not hidden or cut off)

**Story Points:** 3
**Priority:** P0

**Dependencies:** 2.5, 2.6, 2.7

**Tasks:**
- Test each service at each breakpoint
- Fix responsive issues
- Cross-browser check

---

### EPIC 4: Supporting Sections

#### Story 3.1: Build WhyWorkWithMe Section
**As a** visitor
**I want** to understand Paweł's unique value
**So that** I can decide to work with him

**Acceptance Criteria:**
- [ ] Section headline and subhead
- [ ] 3 capability blocks (using grid)
- [ ] Content from `HOMEPAGE_FINAL_CONTENT.md`
- [ ] Responsive layout
- [ ] Accessible

**Story Points:** 3
**Priority:** P0

**Dependencies:** Sprint 2 complete

**Tasks:**
- Create WhyWorkWithMe.astro
- Implement section layout
- Style with SCSS

---

#### Story 3.2: Build CapabilityBlock Component
**As a** developer
**I want** reusable block for capabilities
**So that** content is structured consistently

**Acceptance Criteria:**
- [ ] Accepts title and items array
- [ ] Displays bullet list
- [ ] Uses CardContainer as base
- [ ] Responsive

**Story Points:** 2
**Priority:** P0

**Dependencies:** 3.1

**Tasks:**
- Create CapabilityBlock.astro
- Implement component
- Style with SCSS

---

#### Story 3.3: Build EngagementModels Section
**As a** visitor
**I want** to understand how to work with Paweł
**So that** I know engagement options

**Acceptance Criteria:**
- [ ] Section headline and subhead
- [ ] 3 engagement model cards
- [ ] Content from `HOMEPAGE_FINAL_CONTENT.md`
- [ ] NO pricing ranges shown
- [ ] CTA at bottom

**Story Points:** 3
**Priority:** P0

**Dependencies:** Sprint 2 complete

**Tasks:**
- Create EngagementModels.astro
- Implement section layout
- Style with SCSS

---

#### Story 3.4: Build EngagementCard Component
**As a** developer
**I want** reusable card for engagement models
**So that** models display consistently

**Acceptance Criteria:**
- [ ] Accepts: name, description, items, format
- [ ] No pricing displayed
- [ ] Uses CardContainer
- [ ] Responsive

**Story Points:** 2
**Priority:** P0

**Dependencies:** 3.3

**Tasks:**
- Create EngagementCard.astro
- Implement component
- Style with SCSS

---

#### Story 3.5: Build CTASection Component
**As a** visitor
**I want** clear next steps
**So that** I can contact Paweł

**Acceptance Criteria:**
- [ ] Headline: "Let's Build Something From Scratch"
- [ ] Subheadline describing offering
- [ ] 3 CTA buttons (Cal.com, LinkedIn, Portfolio)
- [ ] Footer note: "Based in Warsaw, Poland"
- [ ] Responsive and accessible

**Story Points:** 2
**Priority:** P0

**Dependencies:** Sprint 2 complete

**Tasks:**
- Create CTASection.astro
- Add CTA buttons
- Style section

---

### EPIC 5: Integration & Navigation

#### Story 3.6: Homepage Orchestration
**As a** developer
**I want** all sections composed in index.astro
**So that** homepage is complete

**Acceptance Criteria:**
- [ ] All sections imported and rendered
- [ ] Correct order: Hero → IoT → Backstage → Rapid → Why → Engagement → CTA
- [ ] No console errors
- [ ] Page loads successfully

**Story Points:** 2
**Priority:** P0

**Dependencies:** 3.1, 3.3, 3.5 (all sections)

**Tasks:**
- Update src/pages/index.astro
- Import all components
- Test full page

---

#### Story 3.7: Add Scroll Anchors to All Sections
**As a** user
**I want** to jump to specific sections
**So that** I can navigate quickly

**Acceptance Criteria:**
- [ ] Each section has unique ID (#hero, #iot-engineering, etc.)
- [ ] Scroll offset accounts for header
- [ ] Smooth scroll works
- [ ] Anchors work from external links

**Story Points:** 1
**Priority:** P0

**Dependencies:** 3.6 (homepage complete)

**Tasks:**
- Add IDs to sections
- Test scroll anchors
- Adjust scroll offset if needed

---

#### Story 3.8: Update Header Navigation
**As a** user
**I want** navigation links to homepage sections
**So that** I can jump to relevant content

**Acceptance Criteria:**
- [ ] Header nav links to: #hero, #iot-engineering, #backstage, #rapid-prototyping, #why-work-with-me, #contact
- [ ] Links work from homepage
- [ ] Links work from other pages (navigate to homepage then scroll)
- [ ] Active state on current section (optional)

**Story Points:** 1
**Priority:** P1

**Dependencies:** 3.7 (scroll anchors)

**Tasks:**
- Update Header.astro navigation
- Test links from homepage and other pages

---

### EPIC 6: Testing & Polish

#### Story 3.9: Cross-Browser Testing
**As a** user on any browser
**I want** homepage to work correctly
**So that** I have consistent experience

**Acceptance Criteria:**
- [ ] Tested in Chrome (latest)
- [ ] Tested in Firefox (latest)
- [ ] Tested in Safari (latest, macOS/iOS)
- [ ] Tested in Edge (latest)
- [ ] All features work (scroll, links, images, hover states)
- [ ] No visual regressions

**Story Points:** 2
**Priority:** P0

**Dependencies:** 3.6 (homepage complete)

**Tasks:**
- Test in each browser
- Document bugs
- Fix browser-specific issues

---

#### Story 3.10: Accessibility Audit & Fixes
**As a** user with disabilities
**I want** accessible homepage
**So that** I can navigate and understand content

**Acceptance Criteria:**
- [ ] Semantic HTML (header, nav, main, section, article)
- [ ] All images have alt text
- [ ] Headings in logical order (h1→h2→h3)
- [ ] Keyboard navigation works (tab order logical)
- [ ] ARIA labels where needed
- [ ] Color contrast meets WCAG AA
- [ ] Lighthouse accessibility score >90

**Story Points:** 2
**Priority:** P0

**Dependencies:** 3.6 (homepage complete)

**Tasks:**
- Run Lighthouse audit
- Fix accessibility issues
- Test with keyboard navigation
- Verify screen reader compatibility (if possible)

---

#### Story 3.11: Performance Optimization
**As a** user
**I want** fast page load
**So that** I don't wait

**Acceptance Criteria:**
- [ ] Images lazy loaded (below fold)
- [ ] Images compressed
- [ ] No render-blocking resources
- [ ] First Contentful Paint <2s
- [ ] Largest Contentful Paint <2.5s
- [ ] Lighthouse performance score >90

**Story Points:** 1
**Priority:** P1

**Dependencies:** 3.6 (homepage complete)

**Tasks:**
- Run Lighthouse performance audit
- Optimize images
- Check bundle size
- Fix performance issues

---

## 📈 Burndown Chart Tracking

### Sprint 1 Burndown (Example)

| Day | Remaining SP | Completed Stories |
|-----|--------------|-------------------|
| Day 1 | 21 | - |
| Day 2 | 16 | 1.1, 1.2, 1.3 (5 SP) |
| Day 3 | 11 | 1.4 (3 SP) |
| Day 4 | 6 | 1.5 (5 SP) |
| Day 5 | 0 | 1.6, 1.7, 1.8 (6 SP) |

**Track daily in standup:**
- Update remaining story points
- Flag if behind schedule
- Adjust scope if needed

---

## 🔄 Sprint Ceremonies

### Sprint Planning (Start of each sprint)
**Duration:** 2 hours
**Attendees:** Product Owner, Scrum Master, Dev Team

**Agenda:**
1. Review sprint goal
2. Review product backlog priorities
3. Team selects stories (pull, not push)
4. Break stories into tasks
5. Commit to sprint backlog

**Output:** Sprint backlog, sprint goal commitment

---

### Daily Standup (Every day)
**Duration:** 15 minutes
**Attendees:** Dev Team, Scrum Master (PO optional)

**Format:**
- What did I complete yesterday?
- What will I work on today?
- Any blockers?

**Scrum Master Actions:**
- Track burndown
- Remove blockers
- Facilitate discussion if needed

---

### Sprint Review (End of sprint)
**Duration:** 1 hour
**Attendees:** Product Owner, Scrum Master, Dev Team

**Agenda:**
1. Demo completed stories
2. Product Owner accepts/rejects
3. Discuss what didn't get done
4. Update product backlog

**Output:** Accepted stories, backlog updates

---

### Sprint Retrospective (After review)
**Duration:** 1 hour
**Attendees:** Dev Team, Scrum Master

**Format:** Start-Stop-Continue
- What should we START doing?
- What should we STOP doing?
- What should we CONTINUE doing?

**Output:** Action items for next sprint

---

## 📊 Metrics & KPIs

### Sprint Metrics
- **Velocity:** Story points completed per sprint
- **Commitment accuracy:** Planned vs. actual completion
- **Burndown trend:** Are we on track?
- **Defect rate:** Bugs found in testing

### Quality Metrics
- **Code coverage:** (if tests added)
- **Lighthouse scores:** Performance, Accessibility, Best Practices
- **Cross-browser bugs:** Count and severity
- **Responsive issues:** Count per breakpoint

### Post-Launch Metrics (Future)
- **Page load time:** Time to interactive
- **Bounce rate:** % leaving after hero
- **Scroll depth:** % reaching each service section
- **CTA click rate:** Conversions per variant
- **A/B test results:** Which hero variant wins

---

## 🎯 Release Plan

### MVP Release (End of Sprint 3)
**Scope:**
- ✅ All 5 hero variants
- ✅ All 3 service sections
- ✅ Supporting sections (Why, Engagement, CTA)
- ✅ Scroll navigation
- ✅ Responsive & accessible
- ✅ Cross-browser tested

**NOT in MVP:**
- ❌ Real portfolio images (placeholders OK)
- ❌ Analytics tracking
- ❌ Scroll animations
- ❌ Company logos (text version OK)

---

### Post-MVP Iterations (Follow-up sprints)

**Sprint 4: Content & Assets**
- Replace placeholder images
- Add company logos
- Content polish

**Sprint 5: Analytics & SEO**
- Analytics integration
- Schema.org structured data
- Sitemap

**Sprint 6: UX Enhancements**
- Scroll animations
- Testimonials section
- Performance optimization

*(See `HOMEPAGE_FOLLOW_UP_TASKS.md` for full backlog)*

---

## 🚨 Escalation Path

### When to Escalate to Product Owner:
- Content unclear or missing
- Design decision needed
- Scope change requested mid-sprint
- Blocker can't be resolved by team

### When to Escalate to Management:
- Team member unavailable (sick, vacation)
- Major technical blocker (infrastructure, dependencies)
- Timeline at risk (>1 sprint delay)

---

## 📋 Product Backlog (Prioritized)

### Sprint 1 (21 SP)
1. ✅ 1.1 - Setup component structure (2 SP)
2. ✅ 1.2 - Create homepage SCSS (2 SP)
3. ✅ 1.3 - Smooth scroll (1 SP)
4. ✅ 1.4 - HeroWithVariations (3 SP)
5. ✅ 1.5 - HeroVariantA (5 SP)
6. ✅ 1.6 - HeroVariants B-E (5 SP)
7. ✅ 1.7 - Dev switcher (2 SP)
8. ✅ 1.8 - Hero responsive (1 SP)

### Sprint 2 (21 SP)
9. ✅ 2.1 - ServiceSection wrapper (3 SP)
10. ✅ 2.2 - ProjectCard (3 SP)
11. ✅ 2.3 - FeaturedProjects (2 SP)
12. ✅ 2.4 - Placeholder images (1 SP)
13. ✅ 2.5 - ServiceIoT (3 SP)
14. ✅ 2.6 - ServiceBackstage (3 SP)
15. ✅ 2.7 - ServiceRapidDev (3 SP)
16. ✅ 2.8 - Services responsive (3 SP)

### Sprint 3 (21 SP)
17. ✅ 3.1 - WhyWorkWithMe (3 SP)
18. ✅ 3.2 - CapabilityBlock (2 SP)
19. ✅ 3.3 - EngagementModels (3 SP)
20. ✅ 3.4 - EngagementCard (2 SP)
21. ✅ 3.5 - CTASection (2 SP)
22. ✅ 3.6 - Homepage orchestration (2 SP)
23. ✅ 3.7 - Scroll anchors (1 SP)
24. ✅ 3.8 - Update navigation (1 SP)
25. ✅ 3.9 - Cross-browser testing (2 SP)
26. ✅ 3.10 - Accessibility audit (2 SP)
27. ✅ 3.11 - Performance optimization (1 SP)

**Total MVP:** 63 Story Points across 3 sprints

---

## ✅ Ready to Start Checklist

- [ ] Product Owner reviewed and approved plan
- [ ] Dev team estimated all stories
- [ ] Development environment ready
- [ ] Assets gathered (photo, logo, content)
- [ ] Project management tool setup (Jira, Trello, Linear, etc.)
- [ ] Communication channels established (Slack, Discord, etc.)
- [ ] Sprint 1 planning session scheduled

---

## 📞 Team Communication

### Daily:
- Standup (15 min, same time daily)
- Slack/Discord for quick questions

### Weekly:
- Sprint review & retro (end of sprint)
- Sprint planning (start of sprint)

### As Needed:
- Pair programming sessions
- Technical discussions
- Blocker resolution

---

## 🎓 Scrum Best Practices for This Project

1. **Keep Sprints Short:** 1 week = faster feedback loop
2. **Limit WIP:** Max 2-3 stories in progress at once
3. **Daily Updates:** Even solo dev should track burndown
4. **Demo Real Work:** Show working software, not slides
5. **Retrospect Honestly:** What can we improve?
6. **Protect Sprint Scope:** Resist mid-sprint additions
7. **Definition of Done:** Non-negotiable quality bar
8. **Celebrate Wins:** Each sprint completion is progress!

---

## 📝 Notes for Scrum Master

### Common Risks to Watch:
- **Gold-plating:** Dev adds features not in acceptance criteria
- **Scope creep:** PO requests changes mid-sprint
- **Technical debt:** Shortcuts taken to meet deadline
- **Communication gaps:** Assumptions instead of clarification

### Mitigation Strategies:
- Enforce DoD strictly
- Protect team from mid-sprint changes
- Allocate time for refactoring
- Encourage questions in standup

---

## 🚀 Let's Go!

**Sprint 1 starts when team says: "We're ready!"**

All planning complete, backlog prioritized, dependencies mapped. Time to build! 🛠️

