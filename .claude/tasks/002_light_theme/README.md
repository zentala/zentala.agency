# Task 002: Light Theme Implementation

## 📋 Task Overview

**Goal:** Implement light theme for zentala.agency website while preserving the distinctive grid/line design system, with automated visual testing.

**Status:** 📝 Planning Complete, Ready for Development
**Assigned to:** Mid-Level Full-Stack Dev Team
**Estimated Effort:** 23-33 hours (3-4 weeks)
**Priority:** P1 (Should Have - UX Enhancement)

---

## 🎯 Business Objective

Enhance user experience by providing a light theme option that:
- Reduces eye strain for users preferring light backgrounds
- Respects system theme preferences (OS-level dark/light mode)
- Maintains brand identity and sophisticated grid/border design system
- Improves accessibility with proper contrast ratios
- Enables theme preference persistence across visits

**Key Constraint:** Preserve the site's distinctive border/line pattern system that creates visual structure through grid patterns.

**Target Users:**
- Visitors who prefer light themes
- Users working in bright environments
- Accessibility-conscious users needing high contrast
- Professional visitors viewing during daytime

---

## 📚 Documentation Index

### Strategic & Planning Documents

1. **[LIGHT_THEME_IMPLEMENTATION_PLAN.md](LIGHT_THEME_IMPLEMENTATION_PLAN.md)**
   - Executive summary & architecture analysis
   - Current design system (border/line patterns)
   - Color palette for light theme
   - 6-phase implementation roadmap
   - Component-by-component migration guide
   - Testing strategy (manual + automated)
   - Performance considerations
   - Analytics & monitoring plan

2. **[LIGHT_THEME_PROJECT_STRUCTURE.md](LIGHT_THEME_PROJECT_STRUCTURE.md)**
   - Client/Product Owner decisions (approved)
   - Dependency graph & critical path
   - Sprint-by-sprint breakdown (3 sprints)
   - Task dependencies mapped
   - Story points estimated (29 SP total)
   - Risk assessment & mitigation
   - Effort distribution by phase
   - Git workflow & deployment strategy

3. **[AUTOMATED_TESTING_ADDON.md](AUTOMATED_TESTING_ADDON.md)**
   - Automated visual testing strategy
   - Playwright + Percy setup guide
   - Test case examples (all pages × all breakpoints × both themes)
   - CI/CD integration
   - Alternative testing tools comparison
   - Accessibility testing automation
   - Performance testing approach

---

## ✅ Key Decisions (Product Owner Approved)

### Design Decisions
- ✅ **Background:** Off-white (#fafafa) - less eye strain, premium feel
- ✅ **Grid Opacity:** Moderate (0.06) - balanced visibility
- ✅ **Text Colors:** Near-black (#1a1a1a) for readability
- ✅ **Borders:** Subtle gray (#e5e5e5) maintaining grid pattern
- ✅ **Logo Strategy:** SVG fill inversion (source access confirmed)

### Scope Decisions
- ✅ **Chatbot:** SKIP - leave dark in light theme (not deployed yet)
- ✅ **Reduced Scope:** -5-6 hours saved (no Phase 3.5 chatbot tasks)
- ✅ **Testing:** Add Playwright + Percy for automated visual regression

### Technical Decisions
- ✅ **Implementation:** CSS custom properties + SCSS bridge layer
- ✅ **Default Theme:** System preference (respects OS setting)
- ✅ **Storage:** localStorage for persistence
- ✅ **Toggle Position:** Header/Navigation (accessible, consistent)
- ✅ **Browsers:** Modern only (Chrome, Firefox, Safari latest)
- ✅ **Analytics:** Privacy-first (minimal tracking, respect DNT)

### Deployment Strategy
- ✅ **Rollout:** Feature flag (deploy hidden, test in prod, enable later)
- ✅ **Git Workflow:** Feature branch, commits OK, **NO PUSH to main** without approval
- ✅ **Timeline:** Normal (3-4 weeks) with full testing

**Revised Effort:** 23-33 hours (was 28-38h, -5h chatbot savings)

---

## 🏗️ Architecture Overview

### CSS Architecture

**Current State:**
- Hard-coded dark theme (bg-black, text-white, gray-800 borders)
- Mix of Tailwind utilities and SCSS variables
- No theme toggle mechanism

**Target State:**
- CSS custom properties for theme colors
- SCSS bridge layer maintaining existing variables
- Theme toggle component (localStorage + system preference)
- FOUC prevention with blocking script

**Key Files to Modify:**
```
src/styles/
├── variables.scss          # Add CSS custom properties bridge
├── global.scss            # Theme base styles
└── components/
    ├── _containers.scss   # Update border colors
    ├── _grids.scss       # Maintain grid pattern
    └── _cards.scss       # Card system updates

src/components/
└── ThemeToggle.astro     # NEW: Theme switcher

public/
└── theme-init.js         # NEW: FOUC prevention script
```

### Border/Grid System (CRITICAL)

Must preserve these patterns:
1. **Horizontal Lines:** `border-bottom` on sections
2. **Vertical Lines:** `border-left/right` on containers/cards
3. **Grid Pattern:** `.grid-pattern` - 50px × 50px subtle background
4. **Smart Borders:** Selective card borders (right/bottom visible, top/left transparent)

**Color Transformation:**
```scss
// Dark theme (current)
$border-color: #1f2937;        // gray-800
$border-color-hover: #374151;  // gray-700

// Light theme (new)
$border-color-light: #e5e5e5;        // gray-200
$border-color-hover-light: #d4d4d4;  // gray-300
```

### Reusability Strategy

**Reuse from Task 001 (Homepage):**
- Component patterns (slots, composition)
- Responsive mixins
- Testing approach

**New for Light Theme:**
- CSS custom properties system
- Theme toggle component
- FOUC prevention strategy
- Automated visual testing

---

## 📅 Sprint Plan Summary

### Sprint 1: Foundation (Week 1, 13 SP)
**Goal:** CSS architecture + theme foundation

**Tasks:**
- Phase 0: Design decisions & color palette finalization
- Phase 1: CSS custom properties system
- Phase 1: SCSS bridge layer
- Phase 1: Grid pattern adaptation
- Phase 1: FOUC prevention

**Deliverables:**
- CSS variable system working
- Theme toggle component (basic)
- Grid pattern renders correctly in both themes
- No flash on page load

---

### Sprint 2: Component Migration (Week 2, 11 SP)
**Goal:** Migrate all components to new theme system

**Tasks:**
- Phase 2: Global styles (backgrounds, text)
- Phase 2: Container system
- Phase 2: Grid system
- Phase 2: Card system
- Phase 2: Shadow/depth system
- Phase 2: Borders finalization

**Deliverables:**
- All components support both themes
- Border/grid system preserved
- Hover states work correctly

---

### Sprint 3: Testing & Launch (Week 3-4, 5 SP)
**Goal:** Comprehensive testing and deployment

**Tasks:**
- Phase 3: Automated testing setup (Playwright + Percy)
- Phase 3: Visual regression testing (all pages × breakpoints × themes)
- Phase 3: Cross-browser testing
- Phase 3: Accessibility audit (WCAG AA contrast)
- Phase 3: Performance testing
- Phase 4: Analytics integration
- Phase 4: Production deployment
- Phase 5: Monitoring & iteration

**Deliverables:**
- All tests passing
- Cross-browser compatible
- Accessibility compliant
- Performance validated
- Deployed with feature flag

**Total:** 29 Story Points across 3 sprints

---

## 🎯 Success Criteria (MVP)

### Functional Requirements
- ✅ Theme toggle in header/navigation
- ✅ Light theme applies to all pages
- ✅ System preference detected on first visit
- ✅ Theme preference persists (localStorage)
- ✅ No FOUC (Flash of Unstyled Content)
- ✅ All interactive elements visible in both themes

### Design Requirements
- ✅ Grid/border pattern preserved in light theme
- ✅ Off-white background (#fafafa)
- ✅ Near-black text (#1a1a1a)
- ✅ Subtle borders (#e5e5e5)
- ✅ Logo inverted correctly
- ✅ Hover states work in both themes

### Quality Requirements
- ✅ WCAG AA contrast ratios met (4.5:1 text, 3:1 UI)
- ✅ Cross-browser tested (Chrome, Firefox, Safari)
- ✅ Responsive at all breakpoints
- ✅ No performance regression (Lighthouse >90)
- ✅ Visual regression tests passing (Playwright + Percy)

### Testing Requirements
- ✅ 70+ automated visual tests (7 pages × 5 breakpoints × 2 themes)
- ✅ Accessibility tests automated
- ✅ Performance comparison (before/after)
- ✅ Manual QA on real devices

---

## 🚀 Getting Started

### For Developers

1. **Read Documentation (Priority Order):**
   - Start: [LIGHT_THEME_PROJECT_STRUCTURE.md](LIGHT_THEME_PROJECT_STRUCTURE.md) - Sprint plan & dependencies
   - Then: [LIGHT_THEME_IMPLEMENTATION_PLAN.md](LIGHT_THEME_IMPLEMENTATION_PLAN.md) - Technical implementation
   - Then: [AUTOMATED_TESTING_ADDON.md](AUTOMATED_TESTING_ADDON.md) - Testing setup

2. **Setup Development:**
   ```bash
   # Install dependencies
   npm install

   # Install testing tools
   npm install -D @playwright/test @percy/cli @percy/playwright

   # Start dev server
   npm run dev

   # Run Playwright tests (after implementation)
   npx playwright test
   ```

3. **First Task (Phase 1.1):**
   - Create CSS custom properties in `variables.scss`
   - See LIGHT_THEME_IMPLEMENTATION_PLAN.md for exact color values

4. **Testing During Development:**
   ```bash
   # Manual theme testing
   # Toggle between themes in browser
   # Check localStorage: theme = 'light' | 'dark' | 'system'

   # Visual regression testing
   npx percy exec -- npx playwright test
   ```

### For Product Owner

1. **Review Designs:**
   - Color palette in LIGHT_THEME_IMPLEMENTATION_PLAN.md (Section 3)
   - Approve off-white background vs. pure white
   - Verify grid opacity is acceptable

2. **Approve Scope:**
   - Chatbot skipped (confirm this is OK)
   - Timeline: 3-4 weeks (confirm acceptable)

3. **Sprint Reviews:**
   - Sprint 1: Review CSS foundation + theme toggle
   - Sprint 2: Review all components in both themes
   - Sprint 3: Final approval for production deployment

### For Scrum Master

1. **Setup Project Board:**
   - Import stories from LIGHT_THEME_PROJECT_STRUCTURE.md
   - 3 sprints × ~10 SP each
   - Label: Phase0-5, Sprint1-3, P0/P1

2. **Track Dependencies:**
   - Critical path: Phase 0 → Phase 1 → Phase 2 → Phase 3
   - No parallel work until Phase 1 complete
   - See dependency graph in PROJECT_STRUCTURE.md

3. **Risk Management:**
   - Monitor grid pattern preservation (high risk)
   - Watch for scope creep (chatbot, additional components)
   - Ensure automated testing setup early (blocker for Phase 3)

---

## 📊 Dependencies & Blockers

### Resolved ✅
- Design decisions approved (colors, opacity, logo)
- Chatbot scope excluded (no blocker)
- Testing strategy defined (Playwright + Percy)
- Git workflow agreed (feature branch, no push to main)

### Current Risks ⚠️

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Grid pattern breaks in light theme | High | Medium | Early testing, careful CSS variables |
| FOUC on page load | Medium | Medium | Blocking script, test on slow connections |
| Percy visual testing flaky | Medium | Low | Retry logic, baseline management |
| Safari-specific bugs | Medium | Medium | Test early, use autoprefixer |
| Performance regression | Low | Low | Lighthouse monitoring, image optimization |

### External Dependencies
- None - all design assets available
- Percy account (free tier sufficient)

---

## 📈 Post-MVP Roadmap

### Phase 6: Enhancements (Future)
- [ ] Theme transition animations
- [ ] Per-page theme override (if needed)
- [ ] Dark+ / Light+ variants (higher contrast)
- [ ] Theme scheduling (auto-switch by time of day)

### Phase 7: Advanced Features (Future)
- [ ] Reduced motion support
- [ ] High contrast mode (accessibility)
- [ ] Custom color schemes (user-configurable)
- [ ] Print-friendly theme

### Related Tasks
- Task 001: Homepage Redesign (component patterns)
- Task 003: Analytics Integration (theme preference tracking)
- Task 004: Accessibility Audit (extend for theme testing)

---

## 📝 Implementation Phases

### Phase 0: Design Decisions (2h)
- Finalize color palette
- Grid opacity testing
- Logo inversion verification

### Phase 1: CSS Foundation (8-10h)
- CSS custom properties system
- SCSS bridge layer
- Grid pattern adaptation
- FOUC prevention script

### Phase 2: Component Migration (10-12h)
- Global styles
- Container system
- Grid system
- Card system
- Shadow/depth system
- Border finalization

### Phase 3: Testing (5-7h)
- Automated testing setup (Playwright + Percy)
- Visual regression tests (70+ test cases)
- Cross-browser testing
- Accessibility audit
- Performance testing

### Phase 4: Deployment (2-3h)
- Analytics integration
- Feature flag setup
- Production deployment
- Rollout monitoring

### Phase 5: Iteration (1-2h)
- Bug fixes
- Fine-tuning
- Performance optimization

**Total Estimated:** 28-36 hours

---

## 🔬 Testing Strategy

### Automated Visual Testing (Playwright + Percy)

**Coverage:**
- 7 pages (/, /portfolio, /about, /contact, /offer, /blog, /offer/backstage)
- 5 breakpoints (375px, 768px, 1024px, 1440px, 1920px)
- 2 themes (dark, light)
- **Total: 70 test cases**

**Test Execution:**
```bash
# Full suite
npx percy exec -- npx playwright test

# Single page
npx playwright test --grep "homepage"

# Single theme
npx playwright test --grep "light-theme"
```

### Manual Testing Checklist

Per page:
- [ ] Theme toggle works
- [ ] Grid pattern visible
- [ ] Borders correct
- [ ] Text readable
- [ ] Hover states work
- [ ] Logo inverted
- [ ] No visual glitches

### Accessibility Testing

Automated:
```bash
npx playwright test --grep "a11y"
```

Manual:
- [ ] Contrast ratios WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible

---

## 🔗 Related Resources

### Design References
- Color palette: LIGHT_THEME_IMPLEMENTATION_PLAN.md (Section 3)
- Grid system: Current site border patterns
- Brand colors: Existing dark theme as reference

### Technical References
- CSS Custom Properties: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- Playwright: [Official Docs](https://playwright.dev/)
- Percy: [Visual Testing Guide](https://docs.percy.io/)
- WCAG Contrast: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Internal Links
- Current site: `/` (dark theme baseline)
- Task 001: Homepage Redesign (component patterns)
- LIGHT_THEME_IMPLEMENTATION_PLAN.md (Border system analysis)

---

## ✅ Task Completion Checklist

### Before Sprint 1
- [ ] All team members read documentation
- [ ] Project board setup (Jira/Trello/Linear)
- [ ] Percy account created (free tier)
- [ ] Design decisions confirmed with PO
- [ ] Sprint planning completed

### Sprint 1 Complete (Week 1)
- [ ] CSS custom properties implemented
- [ ] SCSS bridge layer working
- [ ] Theme toggle component created
- [ ] Grid pattern works in both themes
- [ ] FOUC prevention tested
- [ ] localStorage persistence working

### Sprint 2 Complete (Week 2)
- [ ] All components support both themes
- [ ] Global styles migrated
- [ ] Container/grid/card systems updated
- [ ] Borders preserved correctly
- [ ] Hover states work in both themes
- [ ] Logo inversion verified

### Sprint 3 Complete (Week 3-4)
- [ ] Playwright + Percy setup complete
- [ ] 70+ visual regression tests passing
- [ ] Cross-browser testing passed
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance validated (no regression)
- [ ] Analytics integrated
- [ ] Feature flag deployed

### Launch (End Week 4)
- [ ] Product Owner final approval
- [ ] Deployed to production (hidden behind flag)
- [ ] Internal testing complete
- [ ] Feature flag enabled
- [ ] Monitoring active
- [ ] Bug triage process in place

---

## 📞 Contact & Support

**Product Owner:** Paweł Żentała
**Scrum Master:** [TBD]
**Development Team:** 1-2 Mid-Level Devs

**Questions?**
- Design: See [LIGHT_THEME_IMPLEMENTATION_PLAN.md](LIGHT_THEME_IMPLEMENTATION_PLAN.md) (Section 3 - Color Palette)
- Implementation: See [LIGHT_THEME_IMPLEMENTATION_PLAN.md](LIGHT_THEME_IMPLEMENTATION_PLAN.md) (Sections 4-9)
- Testing: See [AUTOMATED_TESTING_ADDON.md](AUTOMATED_TESTING_ADDON.md)
- Sprint Plan: See [LIGHT_THEME_PROJECT_STRUCTURE.md](LIGHT_THEME_PROJECT_STRUCTURE.md)

---

## 📊 Effort Breakdown

| Phase | Tasks | Effort | % of Total |
|-------|-------|--------|-----------|
| Phase 0: Design | Color finalization | 2h | 7% |
| Phase 1: Foundation | CSS variables, FOUC | 8-10h | 32% |
| Phase 2: Migration | Components, borders | 10-12h | 39% |
| Phase 3: Testing | Automated + manual | 5-7h | 21% |
| Phase 4: Deploy | Analytics, rollout | 2-3h | 9% |
| Phase 5: Iterate | Fixes, tuning | 1-2h | 5% |
| **Total** | | **28-36h** | **100%** |

**Chatbot Savings:** -5h (Phase 3.5 skipped)
**Final Estimate:** 23-31 hours

---

**Last Updated:** 2025-10-03
**Task Created:** 2025-10-03
**Target Completion:** 2025-10-31 (4 weeks from start)
**Task Number:** 002
**Related Tasks:** 001 (Homepage), 003 (Analytics), 004 (A11y Audit)
