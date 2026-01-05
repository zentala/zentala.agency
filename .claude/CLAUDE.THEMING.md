# Theming & Design System Guide

This document describes the theming patterns and design system used in zentala.agency website.

**Created:** 2025-10-03
**Last Updated:** 2025-10-07

## 🎯 Migration Status

**✅ HOMEPAGE MIGRATION COMPLETE (2025-10-07)**

All homepage components now use the Section Primitives system:
- ✅ 100% `<Section>` wrapper adoption (8/8 sections)
- ✅ 100% `<SectionHeader>` usage (replaced all manual headers)
- ✅ 100% `<SectionGrid>` usage (replaced all `.cards-grid`)
- ✅ 100% deprecated primitives replaced:
  - `GridCTA` → `SectionCTA` (4 instances)
  - `ImageSquare` → `SectionImage` (1 instance in Hero)
  - `BlockQuote` → `SectionBlockQuote` (1 instance in Hero)
  - `CapabilityBlock` → `SectionContent` (3 instances)
  - `EngagementCard` → `SectionContent` (3 instances)

**Deleted components:**
- ~~`CapabilityBlock.astro`~~
- ~~`EngagementCard.astro`~~

**Still acceptable (specialized use):**
- `ProjectCard.astro` - Used in FeaturedProjects (3x), specialized for project showcases

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
  z-index: 10;  // CRITICAL: High z-index to lift above siblings and show ALL borders
  border-color: $border-color-hover;  // All borders become visible
}
```

**CRITICAL z-index Pattern:**
- Default state: `z-index: 1` (all grid items)
- Hover state: `z-index: 10` (lifts element above siblings)
- **Why 10, not 2?** Higher value ensures hover borders are FULLY visible, not covered by adjacent elements
- **Always apply to hover state** - otherwise side/bottom borders get covered by neighboring elements

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

## 🏗️ Section Primitives System

**NEW (2025-10-05):** Unified section component system for maximum reusability.

### Overview

All page sections now use primitive components located in `src/components/primitives/sections/`:

**Base Structure:**
```astro
<Section id="...">
  <SectionHeader headline="..." subhead="..." />
  <SectionGrid|SectionBento|SectionContent>
    <!-- Content -->
  </SectionGrid>
  <SectionCTA href="..." text="..." />
</Section>
```

### Section Components

#### `Section.astro` - Base Wrapper
Provides container with borders and consistent structure.

**Props:**
- `id?: string` - Section anchor ID
- `class?: string` - Additional classes

**Usage:**
```astro
<Section id="services">
  <!-- Children here -->
</Section>
```

**Replaces:** Manual `<section class="section-grid"><div class="container-bordered">` wrapper

---

#### `SectionHeader.astro` - Header Block
Consistent headline + subhead with bottom border separator.

**Props:**
- `headline: string` - Main heading text
- `subhead?: string` - Optional description
- `tag?: 'h1' | 'h2' | 'h3'` - Heading tag (default: h2)
- `align?: 'left' | 'center'` - Text alignment (default: left)

**Usage:**
```astro
<SectionHeader
  headline="Services"
  subhead="What I offer"
  tag="h2"
  align="left"
/>
```

---

#### `SectionContent.astro` - Universal Content Block
Text content with auto-adjusting padding based on context.

**Props:**
- `context?: 'full' | 'grid' | 'auto'` - Padding mode (default: auto)
- `prose?: boolean` - Apply prose typography (default: true)

**Context modes:**
- `'full'` - Large padding, max-width 960px, centered (standalone content)
- `'grid'` - Compact padding, full space (inside grid)
- `'auto'` - Auto-detect (currently defaults to 'full')

**Usage:**
```astro
<!-- Standalone content -->
<SectionContent context="full">
  <h3>Headline</h3>
  <p>Text content with generous spacing...</p>
</SectionContent>

<!-- Inside grid -->
<SectionGrid columns={3}>
  <SectionContent context="grid">
    <h3>Feature 1</h3>
    <p>Compact spacing...</p>
  </SectionContent>
</SectionGrid>
```

**Prose styles:**
- `h3` - 2xl/3xl, font-light
- `h4` - xl/2xl, font-light
- `p` - base/lg, white/80
- `ul/ol` - Styled lists with disc/decimal
- `strong` - White text, normal weight

---

#### `SectionGrid.astro` - Flexible Grid (2-5 columns)
Responsive grid with customizable columns and border mechanics.

**Props:**
- `columns?: 2 | 3 | 4 | 5` - Desktop columns (default: 3)
- `gap?: boolean` - Use gap instead of borders (default: false)

**Responsive behavior:**
- Desktop (>1000px): Custom columns (2-5)
- Tablet (771-1000px): 2 columns
- Mobile (≤770px): 1 column

**Usage:**
```astro
<SectionGrid columns={4}>
  <SectionContent context="grid">...</SectionContent>
  <SectionContent context="grid">...</SectionContent>
  <SectionContent context="grid">...</SectionContent>
  <SectionContent context="grid">...</SectionContent>
</SectionGrid>
```

**Border mechanics:**
- Uses transparent border pattern (same as `.cards-grid`)
- Hover states: z-index + border-color change
- Last column: no right border

---

#### `SectionBento.astro` - Bento Grid
Asymmetric grid for modern "bento box" layouts.

**Props:** None (children control layout via BentoCard)

**Grid structure:**
- Desktop: 4 columns base
- Tablet: 2 columns (spans reset)
- Mobile: 1 column (spans reset)

**Usage:**
```astro
<SectionBento>
  <BentoCard colSpan={2} rowSpan={2}>...</BentoCard>
  <BentoCard colSpan={1} rowSpan={1}>...</BentoCard>
  <BentoCard colSpan={2} rowSpan={1}>...</BentoCard>
</SectionBento>
```

---

#### `BentoCard.astro` - Bento Grid Items
Universal wrapper for bento grid children with custom spans.

**Props:**
- `colSpan?: 1 | 2 | 3 | 4` - Column span (default: 1)
- `rowSpan?: 1 | 2 | 3` - Row span (default: 1)
- `padding?: 'none' | 'sm' | 'md' | 'lg'` - Padding size (default: md)

**Usage:**
```astro
<!-- Large image card -->
<BentoCard colSpan={2} rowSpan={2} padding="none">
  <SectionImage src="..." alt="..." />
</BentoCard>

<!-- Text card -->
<BentoCard colSpan={1} rowSpan={1} padding="md">
  <SectionContent context="grid">
    <h3>Feature</h3>
  </SectionContent>
</BentoCard>

<!-- Quote card -->
<BentoCard colSpan={2} rowSpan={1}>
  <SectionBlockQuote quote="..." author="..." />
</BentoCard>
```

---

#### `SectionImage.astro` - Images for Sections
Enhanced image component with multiple aspect ratios and modes.

**Props:**
- `src: string` - Image URL
- `alt: string` - Alt text
- `loading?: 'eager' | 'lazy'` - Loading strategy (default: lazy)
- `aspectRatio?: 'square' | '16/9' | '4/3' | 'auto'` - Aspect ratio (default: square)
- `objectFit?: 'cover' | 'contain'` - Object fit (default: cover)
- `background?: boolean` - Use as background image (default: false)
- `animateIn?: boolean` - Entrance animation (default: false)
- `hoverZoom?: boolean` - Zoom on hover (default: true)

**Usage:**
```astro
<!-- Standard image -->
<SectionImage
  src="..."
  alt="..."
  aspectRatio="square"
  hoverZoom={true}
/>

<!-- Background image with content overlay -->
<SectionImage
  src="..."
  alt="..."
  background={true}
  aspectRatio="16/9"
>
  <div>Overlay content</div>
</SectionImage>
```

**Replaces:** `ImageSquare.astro` ⚠️ DEPRECATED - no longer used in homepage (migration complete 2025-10-07)

---

#### `SectionBlockQuote.astro` - Quote Blocks
Quote component with top/bottom borders for section integration.

**Props:**
- `quote?: string` - Quote text (or use slot)
- `author?: string` - Author name
- `role?: string` - Author role/title
- `variant?: 'default' | 'large' | 'minimal'` - Style variant (default: default)

**Variants:**
- `default` - 2xl/3xl text, borders, padding
- `large` - 3xl/4xl text, larger author
- `minimal` - No borders/padding, smaller text

**Usage:**
```astro
<!-- With props -->
<SectionBlockQuote
  quote="Great product!"
  author="John Doe"
  role="CEO, Company"
  variant="default"
/>

<!-- With slot -->
<SectionBlockQuote author="Jane Smith">
  <p>Custom formatted quote content...</p>
</SectionBlockQuote>
```

**Border mechanics:**
- `margin: -1px 0` - Overlaps with adjacent element borders
- Hover: background + border color change

**Replaces:** `BlockQuote.astro` ⚠️ DEPRECATED - no longer used in homepage (migration complete 2025-10-07)

---

#### `SectionCTA.astro` - Call-to-Action Links
Full-width CTA button/link with top border.

**Props:**
- `href: string` - Link URL
- `text: string` - Button text
- `icon?: string` - Lucide icon name
- `arrow?: boolean` - Show arrow (default: true)
- `variant?: 'primary' | 'secondary'` - Style variant (default: primary)
- `external?: boolean` - External link (opens in new tab, default: false)

**Variants:**
- `primary` - Blue text/icons
- `secondary` - White text, subtle background

**Usage:**
```astro
<SectionCTA
  href="/portfolio"
  text="View Portfolio"
  icon="folder"
  variant="primary"
/>

<SectionCTA
  href="https://external.com"
  text="External Link"
  external={true}
/>
```

**Replaces:** `GridCTA.astro` ⚠️ DEPRECATED - no longer used in homepage (migration complete 2025-10-07)

---

### Complete Example

```astro
---
import Section from '@/components/primitives/sections/Section.astro'
import SectionHeader from '@/components/primitives/sections/SectionHeader.astro'
import SectionBento from '@/components/primitives/sections/SectionBento.astro'
import BentoCard from '@/components/primitives/sections/BentoCard.astro'
import SectionContent from '@/components/primitives/sections/SectionContent.astro'
import SectionImage from '@/components/primitives/sections/SectionImage.astro'
import SectionBlockQuote from '@/components/primitives/sections/SectionBlockQuote.astro'
import SectionCTA from '@/components/primitives/sections/SectionCTA.astro'
---

<Section id="features">
  <SectionHeader
    headline="Why Choose Us"
    subhead="Unique combination of skills and experience"
  />

  <SectionBento>
    <!-- Large feature (2x2) -->
    <BentoCard colSpan={2} rowSpan={2} padding="md">
      <SectionContent context="grid">
        <h3>Complete Stack</h3>
        <p>Full technical coverage from frontend to infrastructure.</p>
      </SectionContent>
    </BentoCard>

    <!-- Image (2x1) -->
    <BentoCard colSpan={2} rowSpan={1} padding="none">
      <SectionImage src="..." alt="..." aspectRatio="16/9" />
    </BentoCard>

    <!-- Quote (1x1) -->
    <BentoCard colSpan={1} rowSpan={1}>
      <SectionBlockQuote
        quote="Excellent work!"
        author="Client"
        variant="minimal"
      />
    </BentoCard>

    <!-- Feature (1x1) -->
    <BentoCard colSpan={1} rowSpan={1}>
      <SectionContent context="grid">
        <h3>Fast</h3>
        <p>Rapid execution</p>
      </SectionContent>
    </BentoCard>
  </SectionBento>

  <SectionCTA
    href="/contact"
    text="Get Started"
    icon="rocket"
  />
</Section>
```

---

### Design Rules for Section Primitives

#### ✅ DO:
1. Use `<Section>` for all page sections (replaces manual wrappers)
2. Use `SectionContent` with `context="grid"` inside grids
3. Use `SectionContent` with `context="full"` for standalone content
4. Let Section handle borders - never add borders to children
5. Use `SectionGrid` for equal-width layouts (2-5 columns)
6. Use `SectionBento` for asymmetric/custom span layouts
7. Use `SectionImage` for images in sections
8. Keep styles in component `.astro` files (scoped)

#### ❌ DON'T:
1. Mix old `<section class="section-grid">` with new `<Section>`
2. Add borders to section children (grid handles it)
3. Use fixed padding in content (use context prop)
4. Nest Section inside Section
5. Use `ImageSquare` in new code (use `SectionImage`)
6. Use `GridCTA` in new code (use `SectionCTA`)
7. Use `BlockQuote` in new code (use `SectionBlockQuote`)

---

### Migration Guide

#### Pattern 1: Section Wrapper

**❌ Old pattern:**
```astro
<section class="section-grid">
  <div class="container-bordered">
    <!-- Content -->
  </div>
</section>
```

**✅ New pattern:**
```astro
<Section id="my-section">
  <!-- Content -->
</Section>
```

---

#### Pattern 2: Section Headers

**❌ Old pattern:**
```astro
<div class="section-header">
  <h2 class="section-headline">Headline</h2>
  <p class="section-subhead">Subhead text</p>
</div>
```

**✅ New pattern:**
```astro
<SectionHeader
  headline="Headline"
  subhead="Subhead text"
  align="left"
/>
```

---

#### Pattern 3: Card Grids

**❌ Old pattern:**
```astro
<div class="cards-grid">
  <div class="card">
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>
```

**✅ New pattern:**
```astro
<SectionGrid columns={3}>
  <SectionContent context="grid">
    <h3>Title</h3>
    <p>Content</p>
  </SectionContent>
</SectionGrid>
```

---

#### Pattern 4: CTAs

**❌ Old pattern:**
```astro
<GridCTA
  href="/link"
  text="Click me"
  icon="arrow-right"
  variant="primary"
/>
```

**✅ New pattern:**
```astro
<SectionCTA
  href="/link"
  text="Click me"
  icon="arrow-right"
  variant="primary"
/>
```

---

#### Pattern 5: Images

**❌ Old pattern:**
```astro
<ImageSquare
  src="image.jpg"
  alt="Description"
/>
```

**✅ New pattern:**
```astro
<SectionImage
  src="image.jpg"
  alt="Description"
  aspectRatio="square"
  objectFit="cover"
/>
```

---

#### Pattern 6: Quotes

**❌ Old pattern:**
```astro
<BlockQuote
  quote="Quote text"
  author="Author"
  variant="hero"
/>
```

**✅ New pattern:**
```astro
<SectionBlockQuote
  quote="Quote text"
  author="Author"
  role="Title"
  variant="large"
/>
```

---

#### Complete Example: Full Section Migration

**❌ Old (Legacy):**
```astro
<section class="section-grid">
  <div class="container-bordered">
    <div class="section-header">
      <h2>Services</h2>
      <p>What we offer</p>
    </div>

    <div class="cards-grid">
      <div class="capability-block">
        <h3>Feature 1</h3>
        <p>Description</p>
      </div>
      <div class="capability-block">
        <h3>Feature 2</h3>
        <p>Description</p>
      </div>
    </div>

    <GridCTA href="/more" text="Learn More" />
  </div>
</section>
```

**✅ New (Primitives):**
```astro
<Section id="services">
  <SectionHeader
    headline="Services"
    subhead="What we offer"
  />

  <SectionGrid columns={3}>
    <SectionContent context="grid">
      <h3>Feature 1</h3>
      <p>Description</p>
    </SectionContent>
    <SectionContent context="grid">
      <h3>Feature 2</h3>
      <p>Description</p>
    </SectionContent>
  </SectionGrid>

  <SectionCTA href="/more" text="Learn More" />
</Section>
```

**Benefits:**
- **-42% code** (14 lines → 8 lines in wrapper markup)
- **100% reusable** components
- **Type-safe** props
- **Consistent** styling
- **Easy to maintain**

---

## 📐 Bento Grid Notation System

**NEW (2025-10-05):** Standardized communication protocol for Bento layouts.

### Span Notation: `colSpan:rowSpan`

**Format:** `[columns]:[rows]`

**Examples:**
- `1:1` - 1 column wide, 1 row tall (small square)
- `2:1` - 2 columns wide, 1 row tall (wide/horizontal)
- `1:2` - 1 column wide, 2 rows tall (tall/vertical)
- `2:2` - 2 columns wide, 2 rows tall (large square)

**CRITICAL:** Columns first, then rows! `2:1` = wide, `1:2` = tall

---

### Visual ASCII Grid Layout

Describe layouts using ASCII art with cell labels:

```
┌─────┬─────┬─────┬─────┐
│ A   │ B   │ B   │ C   │  Row 1
│ 1:2 │ 2:1       │ 1:2 │
├─────┼─────┼─────┼─────┤
│     │ D   │ E   │     │  Row 2
│     │ 1:1 │ 1:1 │     │
├─────┼─────┼─────┼─────┤
│ F   │ G   │ G   │ H   │  Row 3
│ 1:2 │ 2:1       │ 1:2 │
├─────┼─────┼─────┼─────┤
│     │ I   │ J   │     │  Row 4
│     │ 1:1 │ 1:1 │     │
└─────┴─────┴─────┴─────┘
 Col1  Col2  Col3  Col4
```

**Reading this:**
- **A (1:2)** - Starts at Col 1, Row 1, spans 1 column × 2 rows
- **B (2:1)** - Starts at Col 2, Row 1, spans 2 columns × 1 row
- **C (1:2)** - Starts at Col 4, Row 1, spans 1 column × 2 rows

---

### Card Types & Common Patterns

**1:1 (Small Square)**
- Use for: Short features, stats, small content blocks
- Padding: `sm` (8px)
- Content: SectionContent with short text

**2:1 (Wide/Horizontal)**
- Use for: Quotes, wide features, headlines
- Padding: `sm` or `md`
- Content: SectionBlockQuote, SectionContent

**1:2 (Tall/Vertical)**
- Use for: Images, tall features, detailed content
- Padding: `sm` for text, `none` for images
- Content: SectionImage, SectionContent with more text

**2:2 (Large Square)**
- Use for: Hero images, major features
- Padding: `none` for images, `md` for content
- Content: Large SectionImage, rich SectionContent

---

### Row Height Configuration

**rowHeight** - Controls row aspect ratio via `<SectionBento>` prop:
- `1fr` - Square rows (100% of column width)
- `0.8fr` - 80% of column width (shorter rows) ⭐ Recommended
- `0.6fr` - 60% of column width (very short rows)
- `200px` - Fixed pixel height
- `60%` - 60% of container width

**Example:**
```astro
<SectionBento rowHeight="0.8fr">
  <!-- Cards with 80% height = more compact layout -->
</SectionBento>
```

**How it affects cards:**
- `rowHeight="1fr"` → 1:1 = square
- `rowHeight="0.8fr"` → 1:1 = rectangle (80% height)
- `rowHeight="0.6fr"` → 1:1 = very short rectangle

---

### Communication Protocol

**✅ Good (Clear spans):**
> "Chcę 4-column bento grid. Row height: 0.8fr.
>
> Karty:
> - Col 1: Avatar image (1:2)
> - Cols 2-3: Quote (2:1)
> - Col 4: Feature (1:2)
> - Row 2, Cols 2-3: 2x małe (1:1)"

**✅ Better (ASCII art):**
```
┌─────┬─────────┬─────┐
│ Img │ Quote   │ Feat│
│ 1:2 │ 2:1     │ 1:2 │
│     ├────┬────┤     │
│     │ A  │ B  │     │
│     │1:1 │1:1 │     │
└─────┴────┴────┴─────┘
```

**❌ Bad (ambiguous):**
> "Obraz na górze, potem quote, potem jakieś małe karty..."

---

### Code Format & Best Practices

**1. Always specify spans in comments:**
```astro
<!-- Avatar (1:2) - Col 1, Rows 1-2 -->
<BentoCard colSpan={1} rowSpan={2}>
  <SectionImage src="..." alt="..." />
</BentoCard>
```

**2. Order cards in visual reading order:**
Top-to-bottom, left-to-right (or use explicit positioning)

**3. Use dev labels in development:**
- Blue badges show `colSpan:rowSpan`
- Verify layout visually in browser

**4. Document rowHeight:**
```astro
<SectionBento rowHeight="0.8fr"> <!-- 80% height = shorter cards -->
```

---

### Common Mistakes

**❌ Mistake: Confusing Column vs Row Count**

**Wrong:**
> "Chcę 2:1 tall card"

**Right:**
> "Chcę 1:2 tall card" (1 column wide, 2 rows tall)

**Remember:** `colSpan:rowSpan` - columns first!

---

**❌ Mistake: Overlapping Cells**

**Problem:**
```
Row 1: [1:2] [2:1    ]
Row 2:       [1:1][1:1]  <- Gap in Col 1!
```

**Solution:** Use `grid-auto-flow: dense` (enabled by default in SectionBento)

---

**❌ Mistake: Wrong Row Height Expectations**

**Problem:**
> "Dlaczego 1:1 nie jest square?"

**Answer:**
- `rowHeight="1fr"` → 1:1 = square
- `rowHeight="0.8fr"` → 1:1 = rectangle (80% height)

---

### Example Layouts

**Layout 1: Current Homepage Pattern**
```
┌─────┬─────┬─────┬─────┐
│ Avt │ Quote     │ Biz │  Row 1
│ 1:2 │ 2:1       │ 1:2 │
│     ├─────┬─────┤     │
│     │ Stk │ Yrs │     │  Row 2
│     │ 1:1 │ 1:1 │     │
├─────┼─────┴─────┼─────┤
│ Fst │ Delivery  │ Wks │  Row 3
│ 1:2 │ 2:1       │ 1:2 │
│     ├─────┬─────┤     │
│     │ Tem │ Inn │     │  Row 4
│     │ 1:1 │ 1:1 │     │
└─────┴─────┴─────┴─────┘

Cards:
- 4x (1:2): Avatar, Business, Fast, Workspace
- 2x (2:1): Quote, Delivery
- 4x (1:1): Stack, Years, Team, Innovation

Total: 10 cards, 4 rows, 4 columns
```

---

**For complete Bento notation details:** [.claude/tasks/005_section_primitives/BENTO_NOTATION.md](.claude/tasks/005_section_primitives/BENTO_NOTATION.md)

---

## 📚 Related Files

- `src/styles/variables.scss` - Colors, breakpoints, mixins
- `src/styles/components/_grids.scss` - Grid system with border logic
- `src/styles/components/_containers.scss` - Container system
- `src/styles/components/_spacing.scss` - Spacing utilities
- `src/styles/components/_cards.scss` - Card style placeholders
- `src/styles/components/_home.scss` - Homepage-specific styles
- `src/components/primitives/sections/` - **NEW** Section primitives folder

**Section Primitives:**
- `Section.astro` - Base wrapper
- `SectionHeader.astro` - Headers
- `SectionContent.astro` - Content blocks
- `SectionGrid.astro` - Flexible grids (2-5 cols)
- `SectionBento.astro` - Bento grids
- `BentoCard.astro` - Bento items
- `SectionImage.astro` - Images
- `SectionBlockQuote.astro` - Quotes
- `SectionCTA.astro` - CTAs

---

## 🔄 Keep Learning

When you discover new theming patterns:

1. Document them in this file
2. Include code examples
3. Explain WHY, not just WHAT
4. Add to "Common Issues" if it caused problems

**Remember:** This file should grow as you learn more about the design system!
