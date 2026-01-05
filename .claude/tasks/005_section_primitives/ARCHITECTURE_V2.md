# Architecture V2 - Flexible Section Primitives

## 🎯 Design Principles

1. **Universal & Flexible** - Components adapt to context (full-width vs grid)
2. **Consistent Borders** - All section children use -1px margin trick for overlapping
3. **Auto-adjusting Padding** - Padding scales based on available space
4. **Styles in .astro** - Keep styles local unless shared
5. **Semantic Naming** - `Section*` prefix = belongs to section system

---

## 📁 File Structure

```
src/components/primitives/sections/
├── Section.astro              # Base wrapper
├── SectionHeader.astro        # Headlines + subhead
├── SectionContent.astro       # Universal content block (text, lists, etc.)
├── SectionGrid.astro          # Flexible grid (2-5 columns)
├── SectionBento.astro         # Bento grid (4-col custom spans)
├── SectionImage.astro         # Images with border mechanics
├── SectionBlockQuote.astro    # Quotes with borders
├── SectionCTA.astro           # CTA buttons/links
└── BentoCard.astro            # Bento grid items

# NOT moving (stays in primitives/):
../ImageCircle.astro           # Hero photos - independent component
```

---

## 🧩 Component Details

### 1. **Section.astro** - Base Wrapper

**Purpose:** Provides border container, no internal logic

```astro
---
interface Props {
  id?: string
  class?: string
}
const { id, class: className } = Astro.props
---

<section id={id} class="section-grid">
  <div class={`container-bordered ${className || ''}`}>
    <slot />
  </div>
</section>
```

**Usage:**
```astro
<Section id="services">
  <!-- Any section children -->
</Section>
```

---

### 2. **SectionHeader.astro** - Headlines

**Purpose:** Consistent header styling, bottom border

```astro
---
interface Props {
  headline: string
  subhead?: string
  tag?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
}
const { headline, subhead, tag = 'h2', align = 'left' } = Astro.props
const HeadingTag = tag
---

<div class="section-header" data-align={align}>
  <HeadingTag class="section-headline">{headline}</HeadingTag>
  {subhead && <p class="section-subhead">{subhead}</p>}
</div>

<style lang="scss">
  @use '../../../styles/variables' as *;

  .section-header {
    @include px-responsive('md');
    @include py-responsive('md');
    border-bottom: 1px solid $border-color;

    &[data-align='center'] {
      text-align: center;
    }
  }

  .section-headline {
    @apply text-3xl md:text-4xl font-light text-white;
  }

  .section-subhead {
    @apply text-lg text-white/80 mt-4;
  }
</style>
```

---

### 3. **SectionContent.astro** - Universal Content Block

**Purpose:**
- Text content, lists, paragraphs
- **Auto-adjusting padding** based on context:
  - Full-width → larger padding + max-width
  - Inside grid → smaller padding, full space

```astro
---
interface Props {
  context?: 'full' | 'grid'  // auto-detect or manual
  prose?: boolean // use prose typography
}
const { context = 'full', prose = true } = Astro.props
---

<div class={`section-content section-content--${context} ${prose ? 'prose' : ''}`}>
  <slot />
</div>

<style lang="scss">
  @use '../../../styles/variables' as *;

  .section-content {
    background: #000;
    transition: background 200ms;

    &:hover {
      background: #111827;
    }
  }

  // Full-width context: generous padding + max-width
  .section-content--full {
    @include px-responsive('lg'); // 64→48→32→24→16px
    @include py-responsive('lg'); // 96→72→48→36→24px
    max-width: 960px;
    margin: 0 auto;
  }

  // Grid context: compact padding, use available space
  .section-content--grid {
    @include px-responsive('md'); // 48→36→24→18→12px
    @include py-responsive('md'); // 64→48→32→24→16px
  }

  // Prose styling for text content
  .prose {
    h3 {
      @apply text-2xl font-light text-white mb-4;
    }

    h4 {
      @apply text-xl font-light text-white mb-3;
    }

    p {
      @apply text-base md:text-lg text-white/80 mb-4;
    }

    ul, ol {
      @apply text-base md:text-lg text-white/80 mb-4 ml-6;

      li {
        @apply mb-2;

        strong {
          @apply text-white;
        }
      }
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }
  }
</style>
```

**Usage:**
```astro
<!-- Full-width standalone -->
<Section>
  <SectionContent context="full">
    <h3>Heading</h3>
    <p>Text content...</p>
  </SectionContent>
</Section>

<!-- Inside grid (compact) -->
<Section>
  <SectionGrid columns={3}>
    <SectionContent context="grid">
      <h3>Feature 1</h3>
      <p>Description...</p>
    </SectionContent>
    <SectionContent context="grid">
      <h3>Feature 2</h3>
    </SectionContent>
  </SectionGrid>
</Section>
```

---

### 4. **SectionGrid.astro** - Flexible Grid (2-5 columns)

**Purpose:** Responsive grid with customizable columns

```astro
---
interface Props {
  columns?: 2 | 3 | 4 | 5  // desktop columns
  gap?: boolean            // use gap instead of borders
}
const { columns = 3, gap = false } = Astro.props
---

<div class={`section-grid-wrapper section-grid-cols-${columns} ${gap ? 'with-gap' : ''}`}>
  <slot />
</div>

<style lang="scss">
  @use '../../../styles/variables' as *;

  .section-grid-wrapper {
    display: grid;
    border-top: 1px solid $border-color;

    // All children get border mechanics
    > :global(*) {
      border: 1px solid transparent;
      border-right-color: $border-color;
      border-bottom-color: $border-color;
      position: relative;
      z-index: 1;
    }

    > :global(*:hover) {
      z-index: 2;
      border-color: $border-color-hover;
    }
  }

  // Column variants - desktop
  .section-grid-cols-2 {
    @include medium-up {
      grid-template-columns: repeat(2, 1fr);

      > :global(*:nth-child(2n)) {
        border-right: none;
      }
    }
  }

  .section-grid-cols-3 {
    @include medium-up {
      grid-template-columns: repeat(3, 1fr);

      > :global(*:nth-child(3n)) {
        border-right: none;
      }
    }
  }

  .section-grid-cols-4 {
    @include medium-up {
      grid-template-columns: repeat(4, 1fr);

      > :global(*:nth-child(4n)) {
        border-right: none;
      }
    }
  }

  .section-grid-cols-5 {
    @include medium-up {
      grid-template-columns: repeat(5, 1fr);

      > :global(*:nth-child(5n)) {
        border-right: none;
      }
    }
  }

  // Tablet: always 2 columns (except 2-col stays 2)
  @include tablet-up {
    @include medium-only {
      &.section-grid-cols-3,
      &.section-grid-cols-4,
      &.section-grid-cols-5 {
        grid-template-columns: repeat(2, 1fr);

        > :global(*:nth-child(2n)) {
          border-right: none;
        }

        // Reset desktop rules
        > :global(*:nth-child(3n)),
        > :global(*:nth-child(4n)),
        > :global(*:nth-child(5n)) {
          border-right-color: $border-color;
        }
      }
    }
  }

  // Mobile: always 1 column
  @include mobile {
    grid-template-columns: 1fr;

    > :global(*) {
      border-right: none;
    }
  }

  // Optional: gap variant (no borders)
  .with-gap {
    gap: 1rem;
    border-top: none;

    > :global(*) {
      border: none;
    }
  }
</style>
```

**Usage:**
```astro
<SectionGrid columns={4}>
  <SectionContent context="grid">...</SectionContent>
  <SectionContent context="grid">...</SectionContent>
  <SectionContent context="grid">...</SectionContent>
  <SectionContent context="grid">...</SectionContent>
</SectionGrid>
```

---

### 5. **SectionImage.astro** - Images with Border Mechanics

**Purpose:**
- Move `ImageSquare` to sections
- Add border mechanics (margin -1px for overlap)
- Support background images

```astro
---
interface Props {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  aspectRatio?: 'square' | '16/9' | '4/3' | 'auto'
  objectFit?: 'cover' | 'contain'
  background?: boolean  // use as background vs img tag
}

const {
  src,
  alt,
  loading = 'lazy',
  aspectRatio = 'square',
  objectFit = 'cover',
  background = false
} = Astro.props

const ratios = {
  'square': '1 / 1',
  '16/9': '16 / 9',
  '4/3': '4 / 3',
  'auto': 'auto'
}
---

{background ? (
  <div
    class="section-image section-image--background"
    style={`background-image: url(${src}); aspect-ratio: ${ratios[aspectRatio]};`}
    role="img"
    aria-label={alt}
  >
    <slot />
  </div>
) : (
  <div class="section-image" style={`aspect-ratio: ${ratios[aspectRatio]};`}>
    <img
      src={src}
      alt={alt}
      loading={loading}
      style={`object-fit: ${objectFit};`}
    />
  </div>
)}

<style lang="scss">
  .section-image {
    width: 100%;
    overflow: hidden;
    background: #000;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    &--background {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>
```

---

### 6. **SectionBlockQuote.astro** - Quotes with Borders

**Purpose:** Move BlockQuote to sections, add top/bottom borders

```astro
---
interface Props {
  quote?: string
  author?: string
  role?: string
  variant?: 'default' | 'large' | 'minimal'
}

const { quote, author, role, variant = 'default' } = Astro.props
---

<div class={`section-blockquote section-blockquote--${variant}`}>
  <blockquote>
    {quote ? (
      <p class="quote-text">"{quote}"</p>
    ) : (
      <slot />
    )}
  </blockquote>

  {(author || role) && (
    <footer class="quote-footer">
      {author && <cite class="quote-author">{author}</cite>}
      {role && <span class="quote-role">{role}</span>}
    </footer>
  )}
</div>

<style lang="scss">
  @use '../../../styles/variables' as *;

  .section-blockquote {
    @include px-responsive('md');
    @include py-responsive('md');
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    margin: -1px 0; // Overlap with adjacent borders
    background: #000;
    transition: background 200ms;

    &:hover {
      background: #111827;
      border-color: $border-color-hover;
    }

    blockquote {
      margin: 0;
    }

    .quote-text {
      @apply text-xl md:text-2xl font-light text-white/90 italic;
      line-height: 1.6;
    }

    .quote-footer {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .quote-author {
      @apply text-base text-white font-normal not-italic;
    }

    .quote-role {
      @apply text-sm text-white/60;
    }

    // Variants
    &--large {
      .quote-text {
        @apply text-2xl md:text-3xl;
      }
    }

    &--minimal {
      border-top: none;
      border-bottom: none;
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
</style>
```

---

### 7. **SectionCTA.astro** - Moved from GridCTA

**Purpose:** Move GridCTA to sections, keep same functionality

```astro
---
import { Icon } from 'astro-icon/components'

interface Props {
  href: string
  text: string
  icon?: string
  arrow?: boolean
  variant?: 'primary' | 'secondary'
  external?: boolean
}

const {
  href,
  text,
  icon,
  arrow = true,
  variant = 'primary',
  external = false
} = Astro.props

const target = external ? '_blank' : undefined
const rel = external ? 'noopener noreferrer' : undefined
---

<a
  href={href}
  class={`section-cta section-cta--${variant}`}
  target={target}
  rel={rel}
>
  <span class="section-cta__content">
    {icon && <Icon name={`lucide:${icon}`} class="section-cta__icon" />}
    <span class="section-cta__text">{text}</span>
    {arrow && <Icon name="lucide:arrow-right" class="section-cta__arrow" />}
  </span>
</a>

<style lang="scss">
  @use '../../../styles/variables' as *;

  .section-cta {
    @include px-responsive('md');
    @include py-responsive('md');
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-top: 1px solid $border-color;
    background: #000;
    transition: all 200ms;

    &:hover {
      background: #111827;
      border-color: $border-color-hover;

      .section-cta__arrow {
        transform: translateX(4px);
      }
    }

    &__content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    &__icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    &__text {
      @apply text-lg font-normal;
    }

    &__arrow {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 200ms;
    }

    // Variants
    &--primary {
      .section-cta__text {
        @apply text-blue-400;
      }

      .section-cta__icon,
      .section-cta__arrow {
        @apply text-blue-400;
      }
    }

    &--secondary {
      .section-cta__text {
        @apply text-white;
      }

      .section-cta__icon,
      .section-cta__arrow {
        @apply text-white/60;
      }
    }
  }
</style>
```

---

### 8. **BentoCard.astro** - Bento Grid Items

**Purpose:** Universal wrapper for bento grid items

```astro
---
interface Props {
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2 | 3
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const { colSpan = 1, rowSpan = 1, padding = 'md' } = Astro.props
---

<div
  class={`bento-card ${padding !== 'none' ? `bento-card--padding-${padding}` : ''}`}
  style={`grid-column: span ${colSpan}; grid-row: span ${rowSpan};`}
>
  <slot />
</div>

<style lang="scss">
  @use '../../../styles/variables' as *;

  .bento-card {
    background: #000;
    transition: background 200ms;

    &:hover {
      background: #111827;
    }

    // Padding variants
    &--padding-sm {
      @include padding-responsive('sm');
    }

    &--padding-md {
      @include padding-responsive('md');
    }

    &--padding-lg {
      @include padding-responsive('lg');
    }
  }
</style>
```

---

## 📊 Comparison: Old vs New

### ImageSquare → SectionImage
- ✅ Moved to `sections/`
- ✅ Added aspect ratio support
- ✅ Added background image mode
- ✅ Border mechanics built-in

### GridCTA → SectionCTA
- ✅ Moved to `sections/`
- ✅ Same functionality
- ✅ Top border for section integration

### BlockQuote → SectionBlockQuote
- ✅ Moved to `sections/`
- ✅ Added top/bottom borders
- ✅ Added margin -1px for overlap
- ✅ Added variants

### NEW: SectionContent
- ✅ Universal content block
- ✅ Auto-adjusting padding
- ✅ Prose typography
- ✅ Context-aware (full vs grid)

### NEW: Flexible SectionGrid
- ✅ 2-5 columns support
- ✅ Auto-responsive (→2→1)
- ✅ Optional gap mode

---

## 🎯 Usage Examples

### Example 1: Full-width content
```astro
<Section>
  <SectionHeader headline="About" subhead="Learn more..." />
  <SectionContent context="full">
    <h3>Who We Are</h3>
    <p>Text content with generous padding...</p>
  </SectionContent>
</Section>
```

### Example 2: 4-column grid with content
```astro
<Section>
  <SectionGrid columns={4}>
    <SectionContent context="grid">
      <h3>Feature 1</h3>
      <p>Compact padding...</p>
    </SectionContent>
    <SectionContent context="grid">
      <h3>Feature 2</h3>
    </SectionContent>
    <SectionContent context="grid">
      <h3>Feature 3</h3>
    </SectionContent>
    <SectionContent context="grid">
      <h3>Feature 4</h3>
    </SectionContent>
  </SectionGrid>
</Section>
```

### Example 3: Mixed bento layout
```astro
<Section>
  <SectionBento>
    <BentoCard colSpan={2} rowSpan={2} padding="none">
      <SectionImage src="..." alt="..." />
    </BentoCard>

    <BentoCard colSpan={1} rowSpan={1}>
      <SectionContent context="grid" prose={false}>
        <h3>Feature</h3>
      </SectionContent>
    </BentoCard>

    <BentoCard colSpan={2} rowSpan={1}>
      <SectionBlockQuote
        quote="Great product!"
        author="Client"
      />
    </BentoCard>

    <BentoCard colSpan={1} rowSpan={1}>
      <SectionCTA
        href="/contact"
        text="Get Started"
        icon="rocket"
      />
    </BentoCard>
  </SectionBento>
</Section>
```

---

## ✅ Final File Structure

```
src/components/primitives/
├── sections/
│   ├── Section.astro           # Base wrapper
│   ├── SectionHeader.astro     # Headlines
│   ├── SectionContent.astro    # Universal content (NEW!)
│   ├── SectionGrid.astro       # Flexible 2-5 cols (ENHANCED!)
│   ├── SectionBento.astro      # Bento grid
│   ├── SectionImage.astro      # Images (MOVED from ImageSquare)
│   ├── SectionBlockQuote.astro # Quotes (MOVED from BlockQuote)
│   ├── SectionCTA.astro        # CTAs (MOVED from GridCTA)
│   └── BentoCard.astro         # Bento items
│
└── ImageCircle.astro           # STAYS - not section-specific
```

---

## 🚀 Next Steps

1. Create all components in `sections/` folder
2. Keep styles in `.astro` files (scoped)
3. Move ImageSquare → SectionImage
4. Move GridCTA → SectionCTA
5. Move BlockQuote → SectionBlockQuote
6. Test border mechanics (-1px overlap)
7. Test responsive behavior
8. Update THEMING.md

---

**This architecture is:**
- ✅ Flexible (2-5 columns, context-aware padding)
- ✅ Universal (SectionContent works everywhere)
- ✅ Consistent (all use border mechanics)
- ✅ Maintainable (styles in .astro files)
- ✅ Semantic (Section* naming)