# Task 004: Content Grid System + GridCTA Component

## 📋 Task Overview
- **Goal:** Create flexible content grid system with clickable CTA boxes + ImageSquare component
- **Status:** 🚧 In Progress
- **Assigned to:** Mid-Level Frontend Developer
- **Estimated effort:** ~5-6h
- **Priority:** High (blocks Hero variants work)

## 🎯 Business Objective

Replace small buttons in service sections with full-width clickable grid items (CTA boxes). Enable flexible layouts: text+image, text+CTA, image+CTA in various proportions (1/2+1/2, 2/3+1/3, etc.) with consistent border system.

**Current problem:**
- Buttons occupy small space → wasted visual area
- Inconsistent layouts across sections
- No reusable system for text+image grids

**Solution:**
- Reusable `.content-grid` with border overlap pattern
- `GridCTA` component (full-width clickable box with icons)
- `ImageSquare` component (replaces `ImageCircle` in Hero)

## 📚 Documentation Index

- [README.md](README.md) - This file (overview, decisions, checklist)
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Detailed implementation steps (to be created)

## ✅ Key Decisions

### Grid System Design
- **16-column base** - Use existing grid system, don't create new breakpoints
- **Transparent borders everywhere** - All 4 sides, `-1px` margin for overlap
- **No duplicate lines** - Borders overlap with `.container-bordered`
- **Padding:** Same as `.cards-grid` → `@include padding-responsive('md')`

### Proportions
- `.content-grid--halves` → 8 + 8 cols (50/50)
- `.content-grid--two-one` → 10-11 + 5-6 cols (~62% + ~38%)
- `.content-grid--one-two` → 5-6 + 10-11 cols (reverse)

### Responsive Behavior
- Desktop/Tablet: Grid with vertical lines between columns
- Mobile: 1 column stack (no vertical lines)
- Breakpoints: Follow existing `@include tablet`, `@include mobile` (check `_grids.scss`)

### GridCTA Features
- **Props:**
  - `href` (required)
  - `text` (required)
  - `icon?` (left side, Lucide icon name like in `Button.astro`)
  - `arrow?` (right side, default `true`)
  - `variant?` ('primary' | 'secondary', default 'primary')
  - `external?` (adds `target="_blank"`, default `false`)

- **Styling:**
  - Full padding (inherits from `.content-grid > *`)
  - Text centered (vertical + horizontal)
  - Hover: Brighter background + brighter border
  - Smooth transitions
  - Icons support (left icon + right arrow, like `Button.astro`)

### ImageSquare Component
- Based on `ImageCircle.astro`
- **Changes:**
  - `border-radius: 0` (kwadrat, nie koło)
  - Keep `aspect-ratio: 1`
  - Keep all features: `animateIn`, `hoverZoom`, lazy loading
- **Keep `ImageCircle.astro`** - tylko usunąć z Hero variants

## 🏗️ Architecture Overview

```
Content Grid System
│
├── SCSS (.content-grid in _grids.scss)
│   ├── Base grid (16-col system)
│   ├── Transparent border pattern + -1px overlap
│   ├── Modifiers: --halves, --two-one, --one-two
│   └── Responsive (mobile → 1 col)
│
├── GridCTA.astro (clickable grid item)
│   ├── Props: href, text, icon, arrow, variant, external
│   ├── Centered content layout
│   └── Hover effects (bg + border)
│
└── ImageSquare.astro (square image)
    ├── Copy from ImageCircle
    ├── Remove border-radius
    └── Keep animations & hover
```

**Integration points:**
- `.content-grid` works with:
  - Regular `<div>` (text content)
  - `<GridCTA>` (clickable CTA box)
  - `<ImageSquare>` (square image)
- Replaces old button pattern in:
  - Service sections (index.astro)
  - Hero variants (HeroVariantA, B, C, D)

## 📅 Timeline/Plan Summary

### Phase 1: Core System (~3h)
1. ✅ Task planning (done)
2. ⏱️ Analyze existing grid (`_grids.scss`, breakpoints, border pattern)
3. ⏱️ Create `.content-grid` in `_grids.scss`
4. ⏱️ Create `GridCTA.astro` component
5. ⏱️ Create `ImageSquare.astro` component

### Phase 2: Implementation (~2h)
6. ⏱️ Refactor `HeroVariantA` (use `content-grid--two-one` + `ImageSquare`)
7. ⏱️ Refactor service sections (replace buttons with `GridCTA`)
8. ⏱️ Visual testing (desktop/tablet/mobile)

### Phase 3: Documentation (~1h)
9. ⏱️ Add grid system docs to `.claude/CLAUDE.THEMING.md`
10. ⏱️ Update this README with learnings

## 🎯 Success Criteria

### Functional Requirements
- [ ] `.content-grid` renders with correct proportions on desktop
- [ ] Vertical lines between columns are 1px (not 2px - overlap works)
- [ ] Borders overlap correctly with `.container-bordered` (no double lines)
- [ ] Mobile: 1 column stack, no vertical lines
- [ ] `GridCTA` is fully clickable (entire box, not just text)
- [ ] `GridCTA` supports icons (left) and arrow (right)
- [ ] `ImageSquare` renders as square (aspect-ratio 1:1)
- [ ] `ImageSquare` has hover zoom and animateIn

### Visual Requirements
- [ ] Hover effects work (brighter border + bg on GridCTA)
- [ ] Padding consistent with `.cards-grid`
- [ ] Typography readable on all screen sizes
- [ ] No layout shifts or jumps

### Code Quality
- [ ] Follows existing SCSS patterns (mixins, variables)
- [ ] TypeScript interfaces for component props
- [ ] No duplicate CSS (DRY principle)
- [ ] Accessible (keyboard nav, focus states, ARIA if needed)

### Documentation
- [ ] Grid system documented in `CLAUDE.THEMING.md`
- [ ] Examples showing all grid variants
- [ ] Clear explanation of border overlap pattern

## 🚀 Getting Started

### Prerequisites
- Familiarity with existing grid system (`_grids.scss`)
- Understanding of transparent border pattern (see `.cards-grid`)
- Knowledge of Astro component props

### Development Steps
1. Read this README fully
2. Study existing `.cards-grid` implementation
3. Follow IMPLEMENTATION_GUIDE.md (when created)
4. Test each component in isolation before integration
5. Use browser DevTools to verify border overlap (-1px margins)

### Test Strategy
**Isolation tests:**
- Create test page with grid + colored backgrounds to see columns
- Verify border thickness (should be 1px everywhere)

**Integration tests:**
- Check HeroVariantA on all screen sizes
- Test service sections on mobile/tablet/desktop
- Hover states on GridCTA

**Cross-browser:**
- Chrome, Firefox, Safari (especially for -1px margin behavior)

## 📊 Dependencies & Blockers

### Dependencies
- Existing grid system (`_grids.scss`) ✅
- `Button.astro` pattern (for GridCTA styling reference) ✅
- `ImageCircle.astro` (base for ImageSquare) ✅
- Lucide icons (via `astro-icon`) ✅

### Potential Blockers
- ⚠️ Border overlap might render differently in Safari (test early!)
- ⚠️ Grid proportions (10/16 vs 11/16) - decide exact values
- ⚠️ Existing `.hero-content` styles may conflict (check specificity)

## 📈 Roadmap/Follow-up

### Immediate Next Steps
1. Implement `.content-grid` system
2. Create `GridCTA` and `ImageSquare`
3. Refactor HeroVariantA

### Future Enhancements
- [ ] Add more grid modifiers (1/4 + 3/4, 1/3 + 1/3 + 1/3)
- [ ] Support for nested grids
- [ ] GridCTA variants (ghost, danger, success colors)
- [ ] ImageSquare rounded corners option (`borderRadius` prop)
- [ ] Dark mode support (if not already covered)

### Related Tasks
- Task 001: Homepage Redesign (this is a subtask)
- Task 002: Light Theme (ensure grid works in light theme)
- Future: Hero Variants B, C, D refactor

## 📝 Notes & Learnings

### Border Overlap Pattern
The `-1px` margin technique is critical:
```scss
border: 1px solid transparent;
margin: -1px;
```
This ensures:
- Adjacent borders overlap (1px total, not 2px)
- Borders align with parent `.container-bordered`
- Hover can change border color without layout shift

### Icon System
Use same pattern as `Button.astro`:
```astro
{icon && <Icon name={`lucide:${icon}`} class="mr-2 h-5 w-5" />}
{arrow && <Icon name="lucide:chevron-right" class="ml-2 h-4 w-4" />}
```

### Grid Column Math
16-column system:
- 50/50 = 8 + 8
- 2/3 + 1/3 ≈ 10.67 + 5.33 → round to 11 + 5 or 10 + 6
- Decision: Use 10 + 6 (closer to visual 2/3)

## 🔗 Related Resources

### Internal Docs
- [.claude/CLAUDE.THEMING.md](.claude/CLAUDE.THEMING.md) - Will document grid usage here
- [src/styles/components/_grids.scss](../../src/styles/components/_grids.scss) - Existing grid system

### External Resources
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Astro Icon Docs](https://www.astroicon.dev/)
- [Lucide Icons](https://lucide.dev/) - Icon library

### Design References
- `.cards-grid` - Border pattern reference
- `Button.astro` - Icon placement reference
- `ImageCircle.astro` - Animation & hover reference

## ✅ Task Completion Checklist

### 1. Analysis & Setup
- [ ] Read existing `_grids.scss` and understand 16-col system
- [ ] Identify breakpoints (`@include tablet`, `@include mobile`)
- [ ] Study transparent border pattern in `.cards-grid`
- [ ] Understand `-1px` overlap technique

### 2. Core Implementation
- [ ] Create `.content-grid` base styles in `_grids.scss`
- [ ] Add modifiers: `--halves`, `--two-one`, `--one-two`
- [ ] Implement transparent border + `-1px` margin pattern
- [ ] Add responsive breakpoints (mobile → 1 col)
- [ ] Test grid with colored divs (verify 1px borders)

### 3. GridCTA Component
- [ ] Create `src/components/primitives/GridCTA.astro`
- [ ] Add TypeScript props interface (href, text, icon, arrow, variant, external)
- [ ] Implement centered layout (flex/grid)
- [ ] Add icon support (left, Lucide via astro-icon)
- [ ] Add arrow support (right, chevron-right)
- [ ] Style hover effects (bg + border brightness)
- [ ] Test in isolation with different props

### 4. ImageSquare Component
- [ ] Create `src/components/primitives/ImageSquare.astro`
- [ ] Copy structure from `ImageCircle.astro`
- [ ] Change `border-radius: 50%` → `0`
- [ ] Keep `aspect-ratio: 1`
- [ ] Keep `animateIn`, `hoverZoom`, lazy loading
- [ ] Test with sample image

### 5. Hero Refactor
- [ ] Update `HeroVariantA.astro`:
  - [ ] Import `ImageSquare` instead of `ImageCircle`
  - [ ] Wrap content in `.content-grid.content-grid--two-one`
  - [ ] Replace `ImageCircle` with `ImageSquare`
  - [ ] Remove old layout styles
- [ ] Visual test on desktop/tablet/mobile
- [ ] Verify vertical line between text & image (1px)

### 6. Service Sections Refactor
- [ ] Find buttons in service sections (`index.astro`)
- [ ] Comment out old button code (keep for reference)
- [ ] Replace with `GridCTA` in `.content-grid`
- [ ] Test "View Complete Portfolio" CTA
- [ ] Test "Discuss rapid prototyping needs" CTA
- [ ] Verify hover effects work on entire box

### 7. Documentation
- [ ] Add "Content Grid System" section to `.claude/CLAUDE.THEMING.md`:
  - [ ] Usage examples (all variants)
  - [ ] Border overlap explanation
  - [ ] Responsive behavior
  - [ ] GridCTA vs Button comparison
  - [ ] ImageSquare vs ImageCircle comparison
- [ ] Add code examples with comments
- [ ] Document edge cases (nested grids, etc.)

### 8. Testing & QA
- [ ] Visual regression (compare before/after screenshots)
- [ ] Test all breakpoints (desktop, tablet, mobile)
- [ ] Hover states work correctly
- [ ] Keyboard navigation works (GridCTA focusable, Enter/Space click)
- [ ] Check Safari border rendering
- [ ] Lighthouse accessibility audit

### 9. Cleanup
- [ ] Remove unused `ImageCircle` imports from Hero files
- [ ] Keep `ImageCircle.astro` file (used elsewhere?)
- [ ] Remove commented code (if confirmed working)
- [ ] Run linter/formatter

### 10. Finalize
- [ ] Update this README with learnings
- [ ] Mark status as "✅ Complete"
- [ ] Add "Completed: 2025-10-05" timestamp
- [ ] Notify team (if applicable)

## 📞 Contact & Support

**Task Owner:** Paweł Żentała
**Questions?** Check:
1. This README first
2. Existing `_grids.scss` patterns
3. `Button.astro` for icon reference
4. Ask in project chat/Slack

**Review Process:**
- Self-review checklist above
- Visual QA on 3 screen sizes
- Code review by senior dev (if available)
- Merge when all checkboxes ✅

---

**Created:** 2025-10-05
**Last Updated:** 2025-10-05
**Status:** 🚧 In Progress