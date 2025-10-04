# Homepage Improvements Backlog

**Created:** 2025-10-03
**Related to:** Task 001 - Homepage Redesign

## 📋 Copywriting Improvements

### High Priority
- [ ] **Unify perspective**: Change "What I deliver:" → "What you get:" across all service sections
  - Files: ServiceIoT.astro, ServiceBackstage.astro, ServiceRapidDev.astro
  - Reason: More user-focused, consistent with Engagement Models section

- [ ] **Hero tagline alternatives**:
  - Current: "Where you have nothing, I build everything."
  - Consider: "From zero to production-ready solution"
  - Consider: "Building your technical foundation from day one"
  - Reason: Current may sound arrogant to some audiences

- [ ] **Service section subheadlines** - make them more unique:
  - IoT: Currently generic "From vision to working prototype..."
  - Each service needs distinctive value proposition
  - Avoid repetition across sections

### Medium Priority
- [ ] **CTA button text** - more emotional/value-driven:
  - "Discuss your IoT project" → "Let's build your IoT solution"
  - "Schedule discovery call" → "Start your project journey"
  - Reason: Drive emotional engagement, not just logical

- [ ] **Engagement note message** - reframe positive:
  - Current: "You keep the capabilities when I leave"
  - Alternative: "You keep the capabilities and can continue independently"
  - Reason: "when I leave" sounds negative

## 🎨 Design & UX Improvements

### High Priority
- [ ] **Create placeholder image component**
  - Design custom placeholder for project images
  - Component should auto-generate if no image provided
  - Add caption under image noting it's placeholder
  - Files to update: Replace all `https://via.placeholder.com/` URLs

- [ ] **Shared CTA class**: Unify `.service-cta`, `.why-cta`, `.engagement-cta`
  - Create single `.section-cta` class
  - Reduce CSS duplication
  - Easier maintenance

### Medium Priority
- [ ] **Featured Projects visual hierarchy**:
  - Consider highlighting first project (featured) with larger size
  - Or different layout (2/3 + 1/3 grid)
  - Goal: Not all projects equal weight

- [ ] **Whitespace in NoteBox mobile**:
  - Increase padding from 1.5rem to 2rem on mobile
  - More breathing room for important messages

- [ ] **Typography hierarchy refinement**:
  - Section h3 headings all same size (1.5rem)
  - Consider differentiating main section h3 vs subsection h3
  - Better visual hierarchy

### Low Priority
- [ ] **Hero photo border**: Consider 3px → 4px with larger photo size
- [ ] **Service sections spacing**: More space between header and content

## ⚡ Performance Improvements

### High Priority
- [ ] **Replace placeholder images**:
  - Move from external `via.placeholder.com` to local assets
  - Reduces external dependencies
  - Works offline

- [ ] **Add lazy loading to images below fold**:
  - Add `loading="lazy"` to ProjectCard images
  - Add to all images in Why/Engagement sections
  - Faster initial page load

### Medium Priority
- [ ] **CSS optimization**:
  - Use CSS custom properties for repeated values
  - Example: Hero spacing, font sizes, colors
  - Smaller CSS bundle

- [ ] **Font loading strategy**:
  - Implement `font-display: swap` or `optional`
  - Prevent layout shift

- [ ] **Bundle size audit**:
  - Check if astro-icon tree-shakes unused icons
  - Consider manual icon imports if needed

## 📱 Responsive Design Improvements

### Medium Priority
- [ ] **Hero photo size scaling**:
  - Current: 150px mobile, 200px tablet, 280px desktop
  - Consider: 180-200px on large desktops (1440px+)
  - More presence on large screens

- [ ] **CTA buttons layout on tablet**:
  - 3 buttons in row can be tight on tablet
  - Consider 2+1 layout on medium screens

- [ ] **Capability blocks on larger mobile**:
  - Single column on all mobile (<770px)
  - Consider 2 columns on larger phones (>480px)
  - Less monotonous scrolling

### Low Priority
- [ ] **Service section grids**: Test at all breakpoints
- [ ] **Button text wrapping**: Ensure no awkward breaks

## ♿ Accessibility Improvements

### High Priority
- [ ] **Focus states for cards**:
  - Add `:focus-visible` styles to `.cards-grid > *`
  - Keyboard users need clear focus indication
  - Test tab navigation

- [ ] **Alt text for project images**:
  - Placeholder images have generic alt
  - Add descriptive alt text when real images added

### Medium Priority
- [ ] **Semantic HTML landmarks**:
  - Add `<nav>`, `<main>`, `<footer>` if missing
  - Check heading hierarchy (no skipped levels)

- [ ] **Color contrast audit**:
  - Run WCAG AA check
  - Ensure all text meets contrast requirements

- [ ] **ARIA labels where needed**:
  - Button icons may need aria-label
  - Check screen reader experience

## 🔧 Technical/Architecture Improvements

### High Priority
- [ ] **ServiceSection wrapper usage**:
  - Created but not used consistently
  - Investigate: Should we use it or remove it?
  - Document decision

### Medium Priority
- [ ] **Hero variants pre-rendering**:
  - Current: Client-side JS switch
  - Potential FOUC (Flash of Unstyled Content)
  - Consider: SSR or pre-render as separate pages
  - Or: Accept current approach and document

- [ ] **Analyze placeholder images usage**:
  - Create component pattern
  - Update IMPLEMENTATION_ARCHITECTURE.md

### Low Priority
- [ ] **CSS duplication audit**:
  - Many similar classes with small differences
  - Opportunity for mixins/extends
  - Lower priority - works fine as-is

## 🧪 Testing Improvements

### High Priority
- [ ] **Responsive testing checklist**:
  - Test at: 480px, 770px, 1000px, 1440px, 1920px
  - All sections, all components
  - Document in test plan

- [ ] **Cross-browser testing**:
  - Chrome, Firefox, Safari
  - Especially Safari responsive quirks
  - Document results

- [ ] **Lighthouse audits**:
  - Performance >90
  - Accessibility >90
  - Run and document scores

### Medium Priority
- [ ] **A/B test hero variants**:
  - Track which variant performs best
  - Requires analytics integration (separate task)
  - Decision on default variant

- [ ] **Test hover states**:
  - All buttons, cards, links
  - Consistent behavior
  - No layout shifts

## 📊 Analytics & Tracking

### Medium Priority
- [ ] **Track hero variant views**:
  - Which variant is shown most
  - Which drives most conversions
  - Requires analytics setup (separate task)

- [ ] **Button click tracking**:
  - Which CTAs get clicked most
  - Optimize placement/copy

## 🌍 Localization

### Low Priority
- [ ] **Polish version preparation**:
  - i18n structure
  - Content translation
  - Separate task/epic

## 📝 Documentation

### Medium Priority
- [ ] **Update CLAUDE.THEMING.md**:
  - Document hero layout patterns
  - Document button icon system
  - Document NoteBox usage

- [ ] **Component usage examples**:
  - NoteBox with different variants
  - Button with all icon combinations

---

## 🎯 Quick Wins (Do First)

1. ✅ Change "What I deliver" → "What you get" (15 min)
2. ✅ Add focus-visible styles (15 min)
3. Create shared `.section-cta` class (15 min)
4. Add lazy loading to images (10 min)
5. ServiceSection decision - use or remove (30 min)

## 🚀 High Impact (Do Soon)

1. Placeholder image component (2-3 hours)
2. Focus states for accessibility (1 hour)
3. CSS optimization - custom properties (1-2 hours)
4. Responsive testing full pass (2 hours)

## 📅 Nice to Have (Later)

1. Hero variants A/B testing
2. Polish localization
3. Advanced animations
4. PWA features

---

**Notes:**
- This backlog based on analysis from 2025-10-03
- Prioritize based on user impact and effort
- Some items may become separate tasks
- Review and update quarterly
