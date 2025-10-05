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

## 📐 Content Grid System

### Overview

The `.content-grid` is a flexible 2-column grid system for hero sections and content blocks. Unlike `.cards-grid` (which uses a 3-column responsive system), `.content-grid` provides:

- Custom proportions (1/2 + 1/2, 2/3 + 1/3, 1/3 + 2/3)
- Vertical dividers between columns
- Support for text content, images, and CTAs
- Same transparent border pattern as cards-grid

### Basic Usage

```astro
<div class="content-grid content-grid--two-one">
  <div class="content-grid__text">
    <!-- Text content with internal padding -->
    <h1>Headline</h1>
    <p>Description text...</p>
  </div>

  <div class="content-grid__image">
    <!-- Image with no padding, full bleed -->
    <ImageSquare src="..." alt="..." />
  </div>
</div>
```

### Grid Modifiers

```scss
.content-grid--halves    // 1/2 + 1/2 (default)
.content-grid--two-one   // 2/3 + 1/3 (10/16 + 6/16 = 1.67fr + 1fr)
.content-grid--one-two   // 1/3 + 2/3 (6/16 + 10/16 = 1fr + 1.67fr)
```

### Child Element Classes

**`.content-grid__text`** - For text content:
- Includes responsive padding (via `py-responsive('md')` and `px-responsive('md')`)
- Flex column layout with vertical centering
- Use for: headlines, paragraphs, lists, CTAs

**`.content-grid__image`** - For images:
- No padding (full bleed)
- Flex centering for image
- Use for: ImageSquare, ImageCircle, media elements

### Border Behavior

Content grid uses the same transparent border pattern:

```scss
.content-grid {
  border-top: 1px solid $border-color;  // Top border aligns with section

  > * {
    border: 1px solid transparent;
    border-right-color: $border-color;  // Vertical dividers
    border-bottom-color: $border-color;
  }

  > *:last-child {
    border-right: none;  // Remove right border from last column
  }
}
```

**CRITICAL:** The content-grid's top border aligns perfectly with the section's border. Children have internal padding, but the grid itself has NO top padding. This ensures borders overlap correctly.

### Components

**ImageSquare** - Square version of ImageCircle for content grids:
- Located: `src/components/primitives/ImageSquare.astro`
- Props: `src`, `alt`, `loading`, `animateIn`, `hoverZoom`
- Usage: `<ImageSquare src="..." alt="..." />`

**GridCTA** - Full-width clickable grid item:
- Located: `src/components/primitives/GridCTA.astro`
- Props: `href`, `text`, `icon` (Lucide), `arrow` (default: true), `variant`
- Usage in grid: Wrap in `.cards-grid` to get borders

```astro
<div class="cards-grid">
  <GridCTA
    href="https://example.com"
    text="Click me"
    icon="message-circle"
    variant="primary"
  />
</div>
```

### Responsive Behavior

Desktop (>1000px):
- 2 columns with custom proportions
- Vertical divider between columns
- Text has full responsive padding

Tablet (770-1000px):
- Same 2-column layout
- Reduced padding via responsive mixins

Mobile (<770px):
- Single column stack
- No right borders
- Text padding scales down

## ✅ Best Practices

### DO:

1. ✅ Use `.cards-grid` for grids of 3+ similar elements
2. ✅ Use `.content-grid` for 2-column hero/content layouts
3. ✅ Let the grid system handle borders
4. ✅ Use responsive spacing mixins
5. ✅ Follow font-weight: 300 for headlines
6. ✅ Use `#60a5fa` for accent colors
7. ✅ Wrap sections in `section-grid` + `container-bordered`
8. ✅ Use `.content-grid__text` for text content
9. ✅ Use `.content-grid__image` for images

### DON'T:

1. ❌ Add borders to individual card components
2. ❌ Create manual grid layouts - use `.cards-grid` or `.content-grid`
3. ❌ Use fixed pixel spacing - use mixins
4. ❌ Use font-weight > 400 for headlines
5. ❌ Create custom border systems
6. ❌ Add border-top to section components (handled by section-grid)
7. ❌ Add padding to `.content-grid` itself (children have padding)

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
