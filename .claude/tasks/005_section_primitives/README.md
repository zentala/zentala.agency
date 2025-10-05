# Task 005: Section Primitives & Bento Grid System

## 📋 Task Overview
- **Goal:** Create reusable section primitives + Bento grid for asymmetric layouts
- **Status:** 🏗️ In Progress
- **Assigned to:** Claude + Paweł
- **Estimated effort:** 1-2 days
- **Priority:** 🔥 MEGA PRIORITY (homepage beautiful design system)

## 🎯 Business Objective

**Why this matters:**
Homepage is the foundation - it needs to be BEAUTIFUL with MAX REUSABLE design components. This task creates a unified section primitive system that:

1. **Standardizes structure** - All sections follow same pattern (borders, hover, mechanics)
2. **Maximizes reusability** - One Section component, many layouts (grid/bento/content)
3. **Enables Bento layouts** - Asymmetric grids like modern SaaS websites (shadcn-style)
4. **Reduces code duplication** - DRY principle for sections

**Current problem:**
- Repetitive `<section class="section-grid"><div class="container-bordered">` everywhere
- Service sections (IoT, Backstage, RapidDev) are 3 separate files with same structure
- No way to create Bento grid layouts (asymmetric cards)
- Hard to maintain consistency across sections

**This task solves it by:**
- Creating `<Section>` primitive wrapper
- Building modular section children (Header, Grid, Bento, CTA)
- Enabling beautiful asymmetric Bento layouts
- Extracting reusable patterns

## 📚 Documentation Index

1. **[README.md](README.md)** - This file (task overview & index)
2. **[ARCHITECTURE_PROPOSAL.md](ARCHITECTURE_PROPOSAL.md)** - Detailed architecture design
3. **[IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)** - Step-by-step implementation
4. **[EXAMPLES.md](EXAMPLES.md)** - Usage examples & patterns

## ✅ Key Decisions

### Naming Convention: "Section Primitives"
- **Base:** `Section.astro` - wrapper with borders & mechanics
- **Children:** `SectionHeader`, `SectionGrid`, `SectionBento`, `SectionContent`, `SectionCTA`
- **Why "Section"?** Clear, semantic, not tied to any page (reusable everywhere)

### Architecture Pattern
```
Section (primitive wrapper)
  ├── Handles: borders, hover mechanics, container
  └── Children (composable):
      ├── SectionHeader - headline + subhead
      ├── SectionGrid - 3-col cards grid
      ├── SectionBento - 4-col custom span grid (NEW!)
      ├── SectionContent - 2-col ratio grid (hero)
      └── SectionCTA - full-width CTA
```

### Bento Grid Design
- **Base:** 4 columns on desktop
- **Custom spans:** `colSpan={1-4}`, `rowSpan={1-3}`
- **Responsive:** 4→2→1 columns
- **Card wrapper:** `BentoCard` with optional padding
- **Content types:** Text, images, quotes, CTAs, mixed

### File Structure
```
src/components/primitives/
├── sections/
│   ├── Section.astro        # Base wrapper
│   ├── SectionHeader.astro  # Header block
│   ├── SectionGrid.astro    # Cards grid (3-col)
│   ├── SectionBento.astro   # Bento grid (4-col)
│   ├── SectionContent.astro # Content grid (2-col)
│   ├── SectionCTA.astro     # CTA block
│   └── BentoCard.astro      # Universal bento item
└── (existing primitives)
```

## 🏗️ Architecture Overview

### Current Grid Systems
1. **`.cards-grid`** - 3 columns, equal cards (portfolio, services)
2. **`.content-grid`** - 2 columns with ratios (hero sections)

### New Addition
3. **`.bento-grid`** - 4 columns, custom spans (feature showcase, asymmetric)

### Border System (Preserved)
All grids share transparent border pattern:
- Top/left borders: `transparent`
- Right/bottom borders: `$border-color`
- Hover: All borders → `$border-color-hover`
- No double borders, perfect alignment

### Section Wrapper Pattern
**Before:**
```astro
<section class="section-grid">
  <div class="container-bordered">
    <!-- content -->
  </div>
</section>
```

**After:**
```astro
<Section id="...">
  <!-- content -->
</Section>
```

## 📅 Implementation Plan

### Phase 1: Create Primitives (Day 1)
- [ ] Create `primitives/sections/` folder
- [ ] Implement `Section.astro` (base wrapper)
- [ ] Implement `SectionHeader.astro`
- [ ] Implement `SectionGrid.astro`
- [ ] Implement `SectionBento.astro` + `BentoCard.astro` (NEW!)
- [ ] Implement `SectionContent.astro`
- [ ] Implement `SectionCTA.astro`

### Phase 2: Update Styles (Day 1)
- [ ] Add `.bento-grid` to `_grids.scss`
- [ ] Create `_bento.scss` for modifiers
- [ ] Add responsive breakpoints
- [ ] Test border mechanics

### Phase 3: Refactor Examples (Day 1-2)
- [ ] Refactor `WhyWorkWithMe.astro` as example
- [ ] Add Bento showcase section to homepage
- [ ] Update `index.astro` with new primitives
- [ ] Test responsive behavior

### Phase 4: Documentation (Day 2)
- [ ] Update `CLAUDE.THEMING.md` with Section Primitives
- [ ] Add usage examples
- [ ] Document best practices
- [ ] Add common patterns

## 🎯 Success Criteria

**Task is complete when:**
- ✅ All section primitives created and working
- ✅ Bento grid system implemented
- ✅ At least 1 section refactored (WhyWorkWithMe)
- ✅ Bento example added to homepage
- ✅ All borders/hovers work correctly
- ✅ Responsive on all breakpoints
- ✅ `CLAUDE.THEMING.md` updated
- ✅ `npm run build` passes
- ✅ Paweł approves design & architecture

**Quality checks:**
- Border alignment perfect (no double borders)
- Hover states work on all cards
- Responsive collapse works (4→2→1)
- Code is DRY and reusable
- Documentation is clear

## 🚀 Getting Started

### Quick Start
```bash
# 1. Read architecture proposal
cat .claude/tasks/005_section_primitives/ARCHITECTURE_PROPOSAL.md

# 2. Check implementation plan
cat .claude/tasks/005_section_primitives/IMPLEMENTATION_PLAN.md

# 3. Start implementing primitives
# (Create files in src/components/primitives/sections/)
```

### Development Flow
1. Create primitive components first
2. Test each in isolation
3. Refactor existing section as proof
4. Add Bento showcase
5. Update docs

## 📊 Dependencies & Blockers

### Dependencies
- ✅ Existing grid system (`_grids.scss`)
- ✅ Border pattern knowledge (transparent system)
- ✅ Responsive mixins (`variables.scss`)
- ✅ Existing primitives (ImageSquare, GridCTA, etc.)

### Potential Blockers
- None identified - all foundations exist

## 📈 Roadmap/Follow-up

### After This Task
1. **Refactor all sections** - Use new primitives everywhere
2. **Service cards unification** - One ServiceCard vs 3 separate files
3. **More Bento examples** - Portfolio, features, testimonials
4. **Animation system** - Add to section primitives (later priority)

### Future Enhancements
- `SectionHero` variant with image backgrounds
- `SectionTestimonials` with quote grids
- `SectionPricing` with pricing cards
- Animation props for primitives

## 📝 Notes & Learnings

### Why Bento Grid?
Modern SaaS websites use asymmetric "bento box" layouts:
- **Visual interest** - breaks monotony of equal grids
- **Content hierarchy** - important items get more space
- **Flexibility** - mix text, images, CTAs freely
- **Examples:** Linear, Vercel, Stripe websites

### Bento Example (User Request)
```
Col 1: 2 rows (1x2), 1 row (1x1)
Col 1-2: 1 row spanning 2 cols (2x1)
Col 2: 1 row (1x1), then 2 rows (2x2)
Col 3: 1 row (1x1), 1 row (1x1)
Col 4: 2 rows (1x2), 2 rows (1x2)
```

### Design System Alignment
This task directly supports **MEGA PRIORITY**:
- ✅ Beautiful homepage (Bento layouts add visual richness)
- ✅ Reusable design system (Section primitives = max DRY)
- ✅ Consistent structure (All sections same pattern)
- ✅ Easy to expand (New pages reuse primitives)

## 🔗 Related Resources

### Project Docs
- [CLAUDE.THEMING.md](../../CLAUDE.THEMING.md) - Design system rules
- [PRIORITIES.md](../PRIORITIES.md) - Current priorities
- [Task 001: Homepage](../001_home_page/README.md) - Main homepage task

### External Inspiration
- [Smartinsights Bento Example](https://www.smartinsights.com/wp-content/uploads/2023/10/Bento-grid-design-trend-example.jpg)
- Linear.app design system
- Shadcn/ui component patterns

### Code References
- [_grids.scss](../../../src/styles/components/_grids.scss) - Existing grid system
- [HeroVariantA.astro](../../../src/components/home/HeroVariantA.astro) - Content grid usage
- [WhyWorkWithMe.astro](../../../src/components/home/WhyWorkWithMe.astro) - Refactor candidate

## ✅ Task Completion Checklist

### Phase 1: Primitives
- [ ] Create `primitives/sections/` folder
- [ ] `Section.astro` - base wrapper
- [ ] `SectionHeader.astro` - header block
- [ ] `SectionGrid.astro` - cards grid
- [ ] `SectionBento.astro` - bento grid
- [ ] `BentoCard.astro` - bento item
- [ ] `SectionContent.astro` - content grid
- [ ] `SectionCTA.astro` - CTA block

### Phase 2: Styles
- [ ] Add `.bento-grid` to `_grids.scss`
- [ ] Create `_bento.scss` (if needed)
- [ ] Test border mechanics
- [ ] Test responsive behavior

### Phase 3: Implementation
- [ ] Refactor `WhyWorkWithMe.astro`
- [ ] Add Bento showcase to homepage
- [ ] Update `index.astro` structure
- [ ] Test all breakpoints

### Phase 4: Documentation
- [ ] Update `CLAUDE.THEMING.md`
- [ ] Add Section Primitives section
- [ ] Document BentoCard usage
- [ ] Add examples & patterns

### Phase 5: Quality
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] Borders align correctly
- [ ] Hovers work everywhere
- [ ] Responsive works (4→2→1)
- [ ] Paweł approval

## 📞 Contact & Support

**Questions?** Ask Paweł:
- Architecture decisions
- Design preferences (colors, spacing, etc.)
- Content priorities
- Business alignment

**Technical issues?**
- Check existing grid system in `_grids.scss`
- Review `CLAUDE.THEMING.md` border patterns
- Test in browser DevTools

---

**Created:** 2025-10-05
**Status:** 🏗️ In Progress
**Next Review:** After Phase 1 complete