# Theming & Design System Guide

This document describes the theming patterns and design system used in zentala.agency website.

**Created:** 2025-10-03
**Last Updated:** 2025-10-03

---

## 🎨 Color System

### Background Colors
- **Primary Background:** `#000` (pure black)
- **Hover Background:** `#111827` (gray-900)
- **Subtle Background:** `rgba(31, 41, 55, 0.2)` or `0.3` (gray-800 with opacity)

### Border Colors (from `variables.scss`)
- **Primary Border:** `$border-color: #1f2937` (gray-800)
- **Hover Border:** `$border-color-hover: #374151` (gray-700)
- **Subtle Border:** `$border-color-subtle: #111827` (gray-900)

### Text Colors
- **Primary Text:** `#ffffff` (white)
- **Secondary Text:** `rgba(255, 255, 255, 0.8)`
- **Tertiary Text:** `rgba(255, 255, 255, 0.7)`
- **Muted Text:** `rgba(255, 255, 255, 0.6)`

### Accent Colors
- **Primary Accent:** `#60a5fa` (blue-400) - used for links, CTAs, highlighted text
- **Accent Hover:** `#93c5fd` (blue-300)

---

## 📏 Border System - CRITICAL LEARNING

### The Problem: Double Borders

When creating grids of cards/elements, naively applying `border: 1px solid` to all elements creates **double borders** where elements touch (2px thick lines).

### The Solution: Transparent Top/Left Pattern

The design system uses a clever pattern in `.cards-grid` (from `_grids.scss`):

```scss
.cards-grid {
  > * {
    border: 1px solid transparent;         // All borders exist but invisible
    border-right-color: $border-color;      // Only right border visible
    border-bottom-color: $border-color;     // Only bottom border visible
  }
}
```

**Why this works:**
1. Each element has all 4 borders (1px each)
2. Top and left borders are `transparent`
3. Only right and bottom borders are colored
4. When elements are next to each other:
   - Left element's right border + Right element's left border (transparent) = 1px total
   - Top element's bottom border + Bottom element's top border (transparent) = 1px total

### Removing Borders from Last Column/Row

To avoid borders extending beyond the container:

```scss
// Desktop: 3 columns - remove right border from every 3rd item
@include medium-up {
  > *:nth-child(3n) {
    border-right: none;
  }
}

// Tablet: 2 columns - remove right border from every 2nd item
@include tablet-up {
  @include medium-only {
    > *:nth-child(2n) {
      border-right: none;
    }
  }
}

// Mobile: 1 column - remove all right borders
@include mobile {
  > * {
    border-right: none;
  }
}
```

### IMPORTANT: Never Add Borders to Card Components

**❌ WRONG** - Adding borders to individual components:
```scss
.project-card {
  border: 1px solid $border-color;  // DON'T DO THIS!
}
```

**✅ CORRECT** - Let `.cards-grid` handle borders:
```scss
.project-card {
  background: #000;
  // No border property!
}
```

---

## 📦 Container System

### Section Structure

Every section follows this pattern:

```astro
<section class="section-grid">
  <div class="container-bordered">
    <!-- Content here -->
  </div>
</section>
```

### Container Classes (from `_containers.scss`)

- **`.container-bordered`** - Adds left/right borders that disappear on mobile
- **`.container-simple`** - Just max-width, no borders
- **`.container-padded`** - Borders + responsive padding
- **`.section-grid`** - Adds subtle grid background pattern
- **`.section-full`** - Full width section with border-bottom

### Border Behavior

```scss
@mixin container-borders {
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;

  @include container-responsive {  // max-width: 1450px
    border-left: none;
    border-right: none;
  }
}
```

On screens wider than 1450px, content is contained with side borders. Below that, borders disappear to maximize space.

---

## 📐 Spacing System

### Responsive Spacing Scale

From large screens to mobile: **64px → 48px → 32px → 24px → 16px**

```scss
$spacing-desktop: 4rem;   // 64px
$spacing-large: 3rem;     // 48px
$spacing-medium: 2rem;    // 32px
$spacing-tablet: 1.5rem;  // 24px
$spacing-mobile: 1rem;    // 16px
```

### Spacing Mixins

**Horizontal Padding:**
```scss
@include px-responsive('md');  // Default scale
@include px-responsive('sm');  // Smaller scale for nav
```

**Vertical Padding:**
```scss
@include py-responsive('lg');  // Hero/large sections: 96→72→48→36→24px
@include py-responsive('md');  // Cards/sections: 64→48→32→24→16px
@include py-responsive('sm');  // Navbar: 24→20→16→12→8px
```

**All-around Padding:**
```scss
@include padding-responsive('md');  // Same as px/py combined
```

---

## 🎯 Grid System

### Cards Grid (3 columns)

```astro
<div class="cards-grid">
  <Card />
  <Card />
  <Card />
</div>
```

**Behavior:**
- Desktop (>1000px): 3 columns
- Tablet (771-1000px): 2 columns
- Mobile (≤770px): 1 column

### Grid Modifiers

**Two columns (50/50):**
```astro
<div class="cards-grid cards-grid--halves">
  <Card />
  <Card />
</div>
```

**Two-thirds + One-third:**
```astro
<div class="cards-grid cards-grid--two-one">
  <Card />  <!-- Takes 2/3 -->
  <Card />  <!-- Takes 1/3 -->
</div>
```

---

## 🎨 Typography

### Font Weights

**Design system uses light fonts:**
- **Headlines:** `font-weight: 300` (font-light)
- **Body text:** `font-weight: 400` (normal)
- **Strong/emphasis:** Still 400, but uses color for emphasis

### Font Sizes (Mobile → Desktop)

```scss
// Hero
.hero-name: 2rem → 2.5rem → 3rem
.hero-title: 1.25rem → 1.5rem

// Sections
.service-headline: 2rem → 2.5rem
.section-text: 1rem → 1.125rem (text-lg)

// Cards
.card-title: 1.5rem → 1.875rem (text-3xl)
```

---

## 🔗 Interactive Elements

### Hover States

All interactive cards use:
```scss
transition: all 200ms ease-in-out;

&:hover {
  background: #111827;  // gray-900
}
```

**For cards in `.cards-grid`:**
```scss
// Automatically handled by cards-grid
> *:hover {
  z-index: 2;  // Lift above siblings
  border-color: $border-color-hover;  // All borders become visible
}
```

### Links

**Text links:**
```scss
color: #60a5fa;  // blue-400
text-decoration: none;

&:hover {
  color: #93c5fd;  // blue-300
  text-decoration: underline;
}
```

**Card links:**
```scss
.card-link {
  text-decoration: none;
  color: inherit;  // Inherit parent text color
}
```

---

## 📱 Responsive Breakpoints

From `variables.scss`:

```scss
$mobile-max: 480px;
$tablet-max: 770px;
$medium-max: 1000px;
$large-max: 1440px;
$container-max: 1450px;
```

### Mixins

```scss
@include mobile { }     // max-width: 480px
@include tablet { }     // max-width: 770px
@include medium { }     // max-width: 1000px
@include large { }      // max-width: 1440px
```

---

## ✅ Best Practices

### DO:

1. ✅ Use `.cards-grid` for all grids of similar elements
2. ✅ Let the grid system handle borders
3. ✅ Use responsive spacing mixins
4. ✅ Follow font-weight: 300 for headlines
5. ✅ Use `#60a5fa` for accent colors
6. ✅ Wrap sections in `section-grid` + `container-bordered`

### DON'T:

1. ❌ Add borders to individual card components
2. ❌ Create manual grid layouts - use `.cards-grid`
3. ❌ Use fixed pixel spacing - use mixins
4. ❌ Use font-weight > 400 for headlines
5. ❌ Create custom border systems
6. ❌ Add border-top to section components (handled by section-grid)

---

## 🐛 Common Issues & Solutions

### Issue: Double borders between cards

**Problem:** Added `border: 1px solid` to card component

**Solution:** Remove border from component, use `.cards-grid` wrapper

### Issue: Border appearing at top of section

**Problem:** Added `border-top: 1px solid $border-color` to section component

**Solution:** Remove border-top, the `section-grid` wrapper adds `.section-bordered` class which includes `border-bottom: 1px solid $border-color`. Each section's bottom border becomes the next section's top border.

### Issue: Cards not filling full width

**Problem:** Card component has max-width

**Solution:** Remove max-width from card, let `.cards-grid` control layout

### Issue: Spacing inconsistent across breakpoints

**Problem:** Using fixed px values instead of mixins

**Solution:** Replace with `@include px-responsive()` or `@include py-responsive()`

---

## 📚 Related Files

- `src/styles/variables.scss` - Colors, breakpoints, mixins
- `src/styles/components/_grids.scss` - Grid system with border logic
- `src/styles/components/_containers.scss` - Container system
- `src/styles/components/_spacing.scss` - Spacing utilities
- `src/styles/components/_cards.scss` - Card style placeholders
- `src/styles/components/_home.scss` - Homepage-specific styles

---

## 🔄 Keep Learning

When you discover new theming patterns:

1. Document them in this file
2. Include code examples
3. Explain WHY, not just WHAT
4. Add to "Common Issues" if it caused problems

**Remember:** This file should grow as you learn more about the design system!
