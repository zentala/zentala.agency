# Implementation Guide: Content Grid System + GridCTA

## 📋 Overview

This guide provides **step-by-step implementation** for creating:
1. `.content-grid` system (flexible layouts with borders)
2. `GridCTA.astro` component (full-width clickable CTA boxes)
3. `ImageSquare.astro` component (square images)
4. Integration with Hero & Service sections

**Target audience:** Mid-level frontend developer
**Estimated time:** 5-6 hours

---

## 🔍 Step 1: Analyze Existing Grid System (30min)

### 1.1 Study Current Grid Implementation

**Read files:**
- [src/styles/components/_grids.scss](../../src/styles/components/_grids.scss)
- Check for `@mixin cards-grid` or similar
- Look for breakpoint usage (`@include tablet`, `@include mobile`)

**Questions to answer:**
1. How many columns in base grid? (Expected: 16)
2. How does `.cards-grid` work?
3. How is transparent border pattern implemented?
4. How does `-1px` margin create overlap?

### 1.2 Identify Variables & Mixins

**Check:**
```scss
// Find these in codebase
$border-color
$border-color-hover
@mixin padding-responsive('md')
@mixin tablet
@mixin mobile
@mixin medium-up
```

### 1.3 Document Findings

Create mental notes or comments:
```scss
// Current system uses:
// - 3-column grid (.cards-grid)
// - Transparent borders (top/left) + visible (right/bottom)
// - Border overlap on hover (z-index trick)
// - Responsive: 3 → 2 → 1 columns
```

---

## 🛠️ Step 2: Create `.content-grid` System (1.5h)

### 2.1 Base Grid Structure

**File:** `src/styles/components/_grids.scss`

**Add below existing `.cards-grid`:**

```scss
// =======================================
// CONTENT GRID - Flexible layouts (text + image/CTA)
// =======================================

.content-grid {
  display: grid;
  gap: 0; // No gap - borders create visual separation

  // All children get padding + borders
  > * {
    @include padding-responsive('md'); // Same as .cards-grid

    // Transparent borders on all 4 sides
    border: 1px solid transparent;
    border-right-color: $border-color;
    border-bottom-color: $border-color;

    // -1px margin for border overlap
    margin: -1px;

    position: relative;
    z-index: 1;

    // Smooth transition for hover
    transition:
      border-color var(--transition-smooth, 200ms),
      background-color var(--transition-smooth, 200ms);
  }

  // Hover effect
  > *:hover {
    z-index: 2;
    border-color: $border-color-hover;
  }
}
```

### 2.2 Add Grid Modifiers

**Still in `_grids.scss`:**

```scss
// Modifier: 50/50 split (8 + 8 columns out of 16)
.content-grid--halves {
  @include medium-up {
    grid-template-columns: repeat(2, 1fr);

    // Last item (2nd) has no right border
    > *:last-child {
      border-right: none;
    }
  }

  @include mobile {
    grid-template-columns: 1fr;

    > * {
      border-right: none; // No vertical lines on mobile
    }
  }
}

// Modifier: 2/3 + 1/3 split (~10 + 6 columns)
.content-grid--two-one {
  @include medium-up {
    grid-template-columns: 1.67fr 1fr; // 10:6 ratio ≈ 1.67:1

    // Last item has no right border
    > *:last-child {
      border-right: none;
    }
  }

  @include mobile {
    grid-template-columns: 1fr;

    > * {
      border-right: none;
    }
  }
}

// Modifier: 1/3 + 2/3 split (reverse of above)
.content-grid--one-two {
  @include medium-up {
    grid-template-columns: 1fr 1.67fr; // Flipped

    > *:last-child {
      border-right: none;
    }
  }

  @include mobile {
    grid-template-columns: 1fr;

    > * {
      border-right: none;
    }
  }
}
```

### 2.3 Test Grid in Isolation

**Create temporary test (e.g., in `index.astro` at bottom):**

```astro
<!-- Temporary test - DELETE after verification -->
<section class="container-bordered" style="margin: 4rem 0;">
  <h3>Grid Test: Halves</h3>
  <div class="content-grid content-grid--halves">
    <div style="background: rgba(255,0,0,0.1); min-height: 200px;">
      Column 1 (50%)
    </div>
    <div style="background: rgba(0,255,0,0.1); min-height: 200px;">
      Column 2 (50%)
    </div>
  </div>

  <h3>Grid Test: Two-One</h3>
  <div class="content-grid content-grid--two-one">
    <div style="background: rgba(0,0,255,0.1); min-height: 200px;">
      Column 1 (~62%)
    </div>
    <div style="background: rgba(255,255,0,0.1); min-height: 200px;">
      Column 2 (~38%)
    </div>
  </div>
</section>
```

**Verify with DevTools:**
1. Desktop: Check border between columns is **1px** (not 2px)
2. Hover: Border changes color, z-index lifts element
3. Mobile: Stacks vertically, no vertical borders
4. Border aligns with `.container-bordered` (no double line)

**Delete test when confirmed working.**

---

## 🎨 Step 3: Create GridCTA Component (45min)

### 3.1 Create Component File

**File:** `src/components/primitives/GridCTA.astro`

```astro
---
import { Icon } from 'astro-icon/components'

export interface GridCTAProps {
  href: string
  text: string
  icon?: string // Lucide icon name (left side)
  arrow?: boolean // Show arrow on right (default true)
  variant?: 'primary' | 'secondary'
  external?: boolean // Open in new tab
}

const {
  href,
  text,
  icon,
  arrow = true,
  variant = 'primary',
  external = false,
} = Astro.props

// Base classes
let ctaClasses = 'grid-cta'
ctaClasses += ` grid-cta--${variant}`
---

<a
  href={href}
  class={ctaClasses}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
>
  <span class="grid-cta__content">
    {icon && (
      <Icon
        name={`lucide:${icon}`}
        class="grid-cta__icon grid-cta__icon--left"
      />
    )}
    <span class="grid-cta__text">{text}</span>
    {arrow && (
      <Icon
        name="lucide:chevron-right"
        class="grid-cta__icon grid-cta__icon--right"
      />
    )}
  </span>
</a>

<style>
  .grid-cta {
    /* Full clickable area */
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;

    /* Transitions (border inherited from .content-grid > *) */
    transition:
      background-color 200ms ease,
      border-color 200ms ease;
  }

  .grid-cta__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .grid-cta__text {
    font-weight: 600;
    font-size: 1rem;
  }

  .grid-cta__icon {
    flex-shrink: 0;
  }

  .grid-cta__icon--left {
    width: 1.25rem;
    height: 1.25rem;
  }

  .grid-cta__icon--right {
    width: 1rem;
    height: 1rem;
  }

  /* Variant: Primary (blue accent) */
  .grid-cta--primary {
    color: #3b82f6; /* blue-500 */
  }

  .grid-cta--primary:hover {
    background-color: rgba(59, 130, 246, 0.05);
    border-color: rgba(59, 130, 246, 0.3) !important;
  }

  /* Variant: Secondary (neutral) */
  .grid-cta--secondary {
    color: #9ca3af; /* gray-400 */
  }

  .grid-cta--secondary:hover {
    background-color: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.2) !important;
    color: #d1d5db; /* gray-300 - brighter on hover */
  }

  /* Focus state (accessibility) */
  .grid-cta:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: -2px;
    z-index: 3;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .grid-cta {
      transition: none;
    }
  }
</style>
```

### 3.2 Test GridCTA

**Add to test section:**

```astro
<div class="content-grid content-grid--halves">
  <div>
    <h3>Text Column</h3>
    <p>Regular content here...</p>
  </div>

  <GridCTA
    href="/portfolio"
    text="View Complete Portfolio"
    icon="briefcase"
    variant="primary"
  />
</div>
```

**Verify:**
- [ ] Entire box is clickable (hover cursor)
- [ ] Icon appears on left
- [ ] Arrow appears on right
- [ ] Hover brightens background + border
- [ ] Keyboard focus works (Tab → Enter/Space)

---

## 🖼️ Step 4: Create ImageSquare Component (45min)

### 4.1 Copy & Modify ImageCircle

**File:** `src/components/primitives/ImageSquare.astro`

**Copy from `ImageCircle.astro` and modify:**

```astro
---
export interface ImageSquareProps {
  src: string
  alt: string
  class?: string
  loading?: 'eager' | 'lazy'
  animateIn?: boolean
  hoverZoom?: boolean
}

const {
  src,
  alt,
  class: className = '',
  loading = 'lazy',
  animateIn = false,
  hoverZoom = true,
} = Astro.props
---

<div
  class={`image-square ${className}`}
  data-animate-in={String(animateIn)}
  data-hover-zoom={String(hoverZoom)}
>
  <img src={src} alt={alt} class="image-square__img" loading={loading} />
</div>

<style>
  .image-square {
    width: 100%;
  }

  .image-square__img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1; /* Square */
    border-radius: 0; /* NOT rounded - this is the key change */
    object-fit: cover;
  }

  /* Entrance animation (same as ImageCircle) */
  .image-square[data-animate-in='true'] .image-square__img {
    animation: is-appear 800ms ease-out both;
  }

  @keyframes is-appear {
    0% {
      opacity: 0;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Hover zoom (same as ImageCircle) */
  @media (hover: hover) and (pointer: fine) {
    .image-square[data-hover-zoom='true'] .image-square__img {
      transition: transform 300ms ease;
    }
    .image-square[data-hover-zoom='true']:hover .image-square__img {
      transform: scale(1.05);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .image-square__img {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
```

### 4.2 Test ImageSquare

```astro
<div class="content-grid content-grid--two-one">
  <div>
    <h2>Hero Title</h2>
    <p>Description...</p>
  </div>

  <ImageSquare
    src="https://cdn.zentala.io/images/avatar.jpg"
    alt="Test"
    animateIn={true}
  />
</div>
```

**Verify:**
- [ ] Image is square (not circle)
- [ ] Hover zoom works
- [ ] Fade-in animation on load (if `animateIn={true}`)
- [ ] Lazy loading works

---

## 🦸 Step 5: Refactor HeroVariantA (30min)

### 5.1 Update Imports

**File:** `src/components/home/HeroVariantA.astro`

```diff
- import ImageCircle from '../primitives/ImageCircle.astro'
+ import ImageSquare from '../primitives/ImageSquare.astro'
```

### 5.2 Replace HTML Structure

**Find:**
```astro
<div class="hero-variant hero-variant-a">
  <div class="hero-content">
    <div class="hero-text">
      <!-- Title, description, quote, buttons -->
    </div>

    <div class="hero-photo">
      <ImageCircle ... />
    </div>
  </div>
</div>
```

**Replace with:**
```astro
<div class="hero-variant hero-variant-a">
  <div class="content-grid content-grid--two-one">
    <div>
      <!-- Title, description, quote, buttons -->
      <h1 class="hero-title">Hands-On CTO for Innovation Projects</h1>

      <p class="hero-description">
        I build complex technology solutions from vision to working prototype -
        and assemble teams to scale them...
      </p>

      <blockquote class="hero-quote">
        <p class="hero-quote-text">
          "Where you have nothing, I build everything."
        </p>
        <cite class="hero-quote-author">— Paweł Żentała</cite>
      </blockquote>

      <div class="hero-cta">
        <Button
          href="https://cal.com/zentala"
          text="Schedule Discovery Call"
          variant="primary"
          target="_blank"
          icon="calendar"
        />
        <Button
          href="/portfolio"
          text="View Portfolio"
          variant="secondary"
          icon="briefcase"
        />
      </div>
    </div>

    <ImageSquare
      src="https://cdn.zentala.io/images/avatar.jpg"
      alt="Paweł Żentała"
      animateIn={true}
    />
  </div>
</div>
```

### 5.3 Remove Old Styles (if any)

**Check for custom `.hero-content`, `.hero-photo` styles:**
- If they only handled layout → DELETE
- If they have padding/spacing → KEEP (will be inherited)

### 5.4 Visual Test

**Check:**
- [ ] Desktop: 2/3 text + 1/3 image
- [ ] Vertical line between columns (1px)
- [ ] Mobile: Image below text (stacked)
- [ ] Image is square (not circle)
- [ ] Hover on image → zoom
- [ ] Border aligns with section border

---

## 🔧 Step 6: Refactor Service Sections (1h)

### 6.1 Locate Service Buttons

**File:** `src/pages/index.astro`

**Find sections like:**
```astro
<section id="service-iot" class="container-bordered">
  <div class="...">
    <h2>IoT & Robotics</h2>
    <p>Description...</p>
    <Button
      href="/portfolio"
      text="View Complete Portfolio"
      variant="secondary"
    />
  </div>
</section>
```

### 6.2 Replace with GridCTA

**Import GridCTA at top of file:**
```astro
---
import GridCTA from '../components/primitives/GridCTA.astro'
---
```

**Replace button section with grid:**

```diff
  <section id="service-iot" class="container-bordered">
-   <div class="...">
-     <h2>IoT & Robotics</h2>
-     <p>Description...</p>
-     <Button
-       href="/portfolio"
-       text="View Complete Portfolio"
-       variant="secondary"
-     />
-   </div>
+   <div class="content-grid content-grid--two-one">
+     <div>
+       <h2>IoT & Robotics</h2>
+       <p>Description...</p>
+     </div>
+
+     <GridCTA
+       href="/portfolio"
+       text="View Complete Portfolio"
+       icon="briefcase"
+       variant="primary"
+     />
+   </div>
  </section>
```

### 6.3 Repeat for All Services

**Find and replace:**
1. "View Complete Portfolio" button → GridCTA
2. "Discuss rapid prototyping needs" button → GridCTA
3. Any other service CTAs

**Variants to use:**
- Main CTA: `variant="primary"` (blue)
- Secondary: `variant="secondary"` (neutral)

**Icons suggestions:**
- Portfolio: `icon="briefcase"`
- Contact/Discuss: `icon="message-circle"`
- Learn more: `icon="arrow-right"`

### 6.4 Comment Old Code (Optional)

**Keep for reference (1-2 days), then delete:**
```astro
<!-- OLD BUTTON (DELETE AFTER TESTING)
<Button
  href="/portfolio"
  text="View Complete Portfolio"
  variant="secondary"
/>
-->
```

---

## 📚 Step 7: Documentation (30min)

### 7.1 Add to CLAUDE.THEMING.md

**File:** `.claude/CLAUDE.THEMING.md`

**Add section:**

```markdown
## Content Grid System

### Overview

Flexible grid system for text+image/CTA layouts with consistent border styling.

**Use cases:**
- Hero sections (text + image)
- Service sections (text + CTA button)
- Feature showcases (image + description)

### Basic Usage

```astro
<div class="content-grid content-grid--halves">
  <div>
    <h2>Text Column</h2>
    <p>Content here...</p>
  </div>
  <ImageSquare src="..." alt="..." />
</div>
```

### Grid Modifiers

| Class | Desktop Layout | Mobile |
|-------|---------------|--------|
| `.content-grid--halves` | 50% / 50% | Stacked |
| `.content-grid--two-one` | ~62% / ~38% | Stacked |
| `.content-grid--one-two` | ~38% / ~62% | Stacked |

### GridCTA Component

Full-width clickable box for calls-to-action.

**Props:**
```typescript
interface GridCTAProps {
  href: string        // Required: Link destination
  text: string        // Required: CTA text
  icon?: string       // Optional: Lucide icon name (left)
  arrow?: boolean     // Optional: Show arrow (right), default true
  variant?: 'primary' | 'secondary' // Optional: Style variant
  external?: boolean  // Optional: Open in new tab
}
```

**Example:**
```astro
<GridCTA
  href="/portfolio"
  text="View Complete Portfolio"
  icon="briefcase"
  variant="primary"
/>
```

**Variants:**
- `primary`: Blue accent (use for main CTAs)
- `secondary`: Neutral gray (use for less important CTAs)

### ImageSquare Component

Square image with hover zoom and entrance animation.

**Props:**
```typescript
interface ImageSquareProps {
  src: string
  alt: string
  class?: string
  loading?: 'eager' | 'lazy'
  animateIn?: boolean    // Fade-in on load
  hoverZoom?: boolean    // Zoom on hover
}
```

**Example:**
```astro
<ImageSquare
  src="/photo.jpg"
  alt="Description"
  animateIn={true}
  hoverZoom={true}
/>
```

**Difference from ImageCircle:**
- `ImageSquare`: Square (border-radius: 0)
- `ImageCircle`: Round (border-radius: 50%)

### Border Overlap Pattern

Content grid uses **transparent border + -1px margin** technique:

```scss
.content-grid > * {
  border: 1px solid transparent;
  border-right-color: $border-color;
  border-bottom-color: $border-color;
  margin: -1px; // Creates overlap
}
```

**Why this works:**
- Adjacent borders overlap → 1px total (not 2px)
- Aligns perfectly with `.container-bordered`
- Hover can change border color without layout shift

**Important:**
- Do NOT add extra borders manually
- Trust the -1px margin (it works!)
- Test in Safari (border rendering can differ)

### Responsive Behavior

**Desktop/Tablet:**
- Grid columns side-by-side
- Vertical lines between columns
- Hover effects active

**Mobile:**
- Single column (stacked)
- No vertical lines
- Horizontal lines between items
- Hover effects disabled (touch devices)

### Complete Example

```astro
---
import GridCTA from '@/components/primitives/GridCTA.astro'
import ImageSquare from '@/components/primitives/ImageSquare.astro'
---

<section class="container-bordered">
  <!-- Text + Image -->
  <div class="content-grid content-grid--two-one">
    <div>
      <h2>Our Approach</h2>
      <p>We build innovative solutions...</p>
    </div>
    <ImageSquare
      src="/approach.jpg"
      alt="Our process"
      animateIn={true}
    />
  </div>

  <!-- Text + CTA -->
  <div class="content-grid content-grid--halves">
    <div>
      <h3>Ready to Start?</h3>
      <p>Let's discuss your project...</p>
    </div>
    <GridCTA
      href="/contact"
      text="Schedule a Call"
      icon="calendar"
      variant="primary"
    />
  </div>
</section>
```

### Tips & Tricks

**Alignment:**
- Use flexbox inside grid items for vertical centering
- GridCTA already centers content (no extra work needed)

**Nesting:**
- Can nest `.content-grid` inside grid items (advanced)
- Be careful with border overlap (test thoroughly)

**Accessibility:**
- GridCTA is keyboard navigable (Tab → Enter/Space)
- Ensure sufficient color contrast
- Use descriptive `alt` text for images

**Performance:**
- Use `loading="lazy"` for below-fold images
- Optimize images before upload
- Consider `animateIn={false}` for above-fold content (faster LCP)

---

**Last Updated:** 2025-10-05
```

---

## ✅ Step 8: Final Testing & QA (1h)

### 8.1 Visual Regression

**Compare before/after:**
1. Take screenshot of original Hero
2. Take screenshot of new Hero (with ImageSquare + grid)
3. Compare proportions, spacing, alignment

**Tools:**
- Browser DevTools (responsive mode)
- Percy/Chromatic (if available)
- Manual side-by-side comparison

### 8.2 Cross-Browser Testing

**Test in:**
- Chrome (primary)
- Firefox
- Safari (especially check -1px margin!)
- Edge

**Focus on:**
- Border thickness (should be 1px everywhere)
- Border overlap (no double lines)
- Hover effects
- Responsive breakpoints

### 8.3 Accessibility Audit

**Lighthouse (DevTools):**
1. Run accessibility audit
2. Check for:
   - Color contrast (WCAG AA minimum)
   - Keyboard navigation (Tab through GridCTAs)
   - Focus states visible
   - Alt text present

**Keyboard test:**
1. Tab through page
2. Verify GridCTA receives focus
3. Press Enter/Space → should navigate

### 8.4 Performance Check

**Lighthouse Performance:**
- LCP should not regress
- CLS should be 0 (no layout shift from borders)
- Images should lazy-load (except above-fold)

### 8.5 Cleanup

**Remove:**
- [ ] Test sections with colored backgrounds
- [ ] Commented old button code (after 1-2 days)
- [ ] Any console.logs or debug code

**Verify:**
- [ ] No unused imports
- [ ] No dead CSS
- [ ] Linter passes (run `npm run lint` if available)

---

## 🎉 Step 9: Finalize & Deploy (15min)

### 9.1 Update README

**File:** `.claude/tasks/004_content_grid_system/README.md`

**Add to "Notes & Learnings":**
- Any issues encountered
- Browser quirks discovered
- Performance insights

### 9.2 Mark Complete

**In README.md:**
```diff
- **Status:** 🚧 In Progress
+ **Status:** ✅ Complete
+ **Completed:** 2025-10-05
```

### 9.3 Git Commit

**Recommended commit message:**
```bash
git add .
git commit -m "feat: add content grid system with GridCTA and ImageSquare components

- Create .content-grid with border overlap pattern
- Add GridCTA component (full-width clickable boxes)
- Add ImageSquare component (square images with hover zoom)
- Refactor HeroVariantA to use content-grid
- Replace service section buttons with GridCTA
- Document grid system in CLAUDE.THEMING.md

Closes #004"
```

### 9.4 Notify Team

**If applicable:**
- Post in project chat/Slack
- Update project board
- Request code review

---

## 🐛 Troubleshooting

### Issue: Borders are 2px instead of 1px

**Cause:** `-1px` margin not applied or overridden

**Fix:**
```scss
.content-grid > * {
  margin: -1px !important; // Force if needed
}
```

**Debug:**
```css
/* Temporarily add to see borders */
.content-grid > * {
  outline: 1px solid red !important;
}
```

### Issue: GridCTA not clickable in some areas

**Cause:** Padding not inherited from `.content-grid > *`

**Fix:** Ensure GridCTA doesn't override padding:
```scss
.grid-cta {
  padding: inherit; // Inherit from parent
}
```

### Issue: ImageSquare stretches instead of crops

**Cause:** `object-fit: cover` missing

**Fix:**
```scss
.image-square__img {
  object-fit: cover; // Force crop to aspect-ratio
}
```

### Issue: Mobile vertical lines still showing

**Cause:** `border-right: none` not applied in mobile breakpoint

**Fix:**
```scss
@include mobile {
  .content-grid > * {
    border-right: none !important;
  }
}
```

### Issue: Safari border rendering different

**Cause:** Safari handles sub-pixel rendering differently

**Fix:** Test with integer-based margins if needed:
```scss
// Instead of -1px, try:
margin-top: -1px;
margin-left: -1px;
margin-right: 0;
margin-bottom: 0;
```

---

## 📝 Checklist Summary

**Before starting:**
- [ ] Read entire guide
- [ ] Understand existing grid system
- [ ] Set up test environment

**Implementation:**
- [ ] Create `.content-grid` in `_grids.scss`
- [ ] Create `GridCTA.astro`
- [ ] Create `ImageSquare.astro`
- [ ] Refactor `HeroVariantA`
- [ ] Refactor service sections
- [ ] Add documentation to `CLAUDE.THEMING.md`

**Testing:**
- [ ] Visual regression test
- [ ] Cross-browser test (Chrome, Firefox, Safari)
- [ ] Accessibility audit (Lighthouse)
- [ ] Keyboard navigation test
- [ ] Performance check

**Finalize:**
- [ ] Clean up test code
- [ ] Update README with learnings
- [ ] Commit with descriptive message
- [ ] Notify team

---

**Questions?** Refer to [README.md](README.md) or ask project owner.

**Good luck!** 🚀