# Comprehensive Architecture Refactor Proposal
## Żentała Innovation Agency Website

### Executive Summary
This document outlines a comprehensive refactor strategy to transform the current codebase into a scalable, maintainable, and reusable design system and component architecture.

### Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [Proposed Architecture](#proposed-architecture)
3. [Design System Refactor](#design-system-refactor)
4. [Component Architecture](#component-architecture)
5. [SCSS/CSS Architecture](#scss-css-architecture)
6. [File Structure Reorganization](#file-structure-reorganization)
7. [New Components & Patterns](#new-components-patterns)
8. [Migration Strategy](#migration-strategy)
9. [Implementation Roadmap](#implementation-roadmap)

---

## Current State Analysis

### Strengths
- Well-defined design system rules in design.mdc
- Responsive system with multiple breakpoints
- Good use of CSS custom properties and mixins
- Consistent color scheme and spacing

### Areas for Improvement
1. **Inconsistent CSS Architecture**
   - Mixing inline Tailwind with custom SCSS
   - Style definitions scattered across components
   - global.scss is too large (804 lines)

2. **Component Reusability**
   - Components are often too specific
   - Missing common UI patterns as components
   - No prop validation or TypeScript

3. **Responsive System Complexity**
   - Multiple overlapping responsive classes
   - Confusing naming conventions
   - Redundant breakpoint definitions

4. **Documentation Structure**
   - design.mdc is too long and hard to navigate
   - Missing component-level documentation
   - No visual style guide

---

## Proposed Architecture

### 1. Design System Structure
```
src/
├── design-system/
│   ├── tokens/
│   │   ├── colors.json
│   │   ├── spacing.json
│   │   ├── typography.json
│   │   └── breakpoints.json
│   ├── primitives/
│   │   ├── Box/
│   │   ├── Text/
│   │   ├── Button/
│   │   └── Link/
│   ├── patterns/
│   │   ├── Card/
│   │   ├── Grid/
│   │   └── Section/
│   └── documentation/
│       ├── principles.md
│       ├── usage-guide.md
│       └── component-api.md
```

### 2. Component Categories

#### Primitive Components (Atoms)
- **Box**: Base container with spacing/layout props
- **Text**: Typography component with semantic variants
- **Button**: Consistent button styles and states
- **Link**: Unified link component replacing multiple link classes
- **Icon**: Icon wrapper with consistent sizing

#### Pattern Components (Molecules)
- **Card**: Flexible card component replacing specific card implementations
- **Grid**: Smart grid system replacing cards-grid
- **Section**: Page section wrapper with consistent spacing
- **Container**: Responsive container with border logic

#### Composite Components (Organisms)
- **Navigation**: Extracted from Header
- **MobileMenu**: Separate mobile navigation component
- **FooterSection**: Modular footer sections
- **HeroSection**: Enhanced Hero with more variants

---

## Design System Refactor

### New Design Token System

#### 1. Color Tokens
```scss
// src/design-system/tokens/_colors.scss
$color-tokens: (
  // Base colors
  'base-black': #000000,
  'base-white': #FFFFFF,
  
  // Gray scale
  'gray-50': #f9fafb,
  'gray-100': #f3f4f6,
  'gray-200': #e5e7eb,
  'gray-300': #d1d5db,
  'gray-400': #9ca3af,
  'gray-500': #6b7280,
  'gray-600': #4b5563,
  'gray-700': #374151,
  'gray-800': #1f2937,
  'gray-900': #111827,
  
  // Semantic colors
  'text-primary': var(--color-base-white),
  'text-secondary': var(--color-gray-300),
  'text-muted': var(--color-gray-400),
  
  'bg-primary': var(--color-base-black),
  'bg-secondary': var(--color-gray-900),
  
  'border-default': var(--color-gray-800),
  'border-hover': var(--color-gray-700),
  'border-subtle': var(--color-gray-900),
);
```

#### 2. Spacing Scale (Simplified)
```scss
// src/design-system/tokens/_spacing.scss
$spacing-tokens: (
  'spacing-0': 0,
  'spacing-1': 0.25rem,  // 4px
  'spacing-2': 0.5rem,   // 8px
  'spacing-3': 0.75rem,  // 12px
  'spacing-4': 1rem,     // 16px
  'spacing-5': 1.5rem,   // 24px
  'spacing-6': 2rem,     // 32px
  'spacing-8': 3rem,     // 48px
  'spacing-10': 4rem,    // 64px
  'spacing-12': 6rem,    // 96px
  'spacing-16': 8rem,    // 128px
);

// Responsive spacing multipliers
$spacing-scale: (
  'mobile': 0.5,      // 50% of base
  'tablet': 0.75,     // 75% of base
  'desktop': 1,       // 100% base
);
```

#### 3. Typography System
```scss
// src/design-system/tokens/_typography.scss
$typography-tokens: (
  'font-sans': 'system-ui, -apple-system, sans-serif',
  'font-mono': 'Consolas, Monaco, monospace',
  
  'text-xs': (size: 0.75rem, line: 1rem),
  'text-sm': (size: 0.875rem, line: 1.25rem),
  'text-base': (size: 1rem, line: 1.5rem),
  'text-lg': (size: 1.125rem, line: 1.75rem),
  'text-xl': (size: 1.25rem, line: 1.75rem),
  'text-2xl': (size: 1.5rem, line: 2rem),
  'text-3xl': (size: 1.875rem, line: 2.25rem),
  'text-4xl': (size: 2.25rem, line: 2.5rem),
  'text-5xl': (size: 3rem, line: 1),
);
```

### Simplified Responsive System

#### Single Source of Truth for Breakpoints
```scss
// src/design-system/tokens/_breakpoints.scss
$breakpoints: (
  'sm': 480px,   // Mobile
  'md': 768px,   // Tablet
  'lg': 1024px,  // Desktop
  'xl': 1440px,  // Large desktop
);

// Utility mixins
@mixin media-up($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

@mixin media-down($breakpoint) {
  @media (max-width: map-get($breakpoints, $breakpoint) - 1px) {
    @content;
  }
}

@mixin media-between($min, $max) {
  @media (min-width: map-get($breakpoints, $min)) and (max-width: map-get($breakpoints, $max) - 1px) {
    @content;
  }
}
```

---

## Component Architecture

### 1. Base Component Pattern
```typescript
// src/components/primitives/Box/Box.astro
---
export interface BoxProps {
  as?: string
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'primary' | 'secondary' | 'transparent'
  border?: boolean
  borderPosition?: 'all' | 'top' | 'bottom' | 'x' | 'y'
  className?: string
}

const {
  as = 'div',
  spacing = 'none',
  background = 'transparent',
  border = false,
  borderPosition = 'all',
  className = '',
  ...rest
} = Astro.props
---

<style>
  .box {
    --spacing-multiplier: 1;
  }
  
  @media (max-width: 768px) {
    .box {
      --spacing-multiplier: 0.75;
    }
  }
  
  @media (max-width: 480px) {
    .box {
      --spacing-multiplier: 0.5;
    }
  }
</style>

{as === 'div' && <div class:list={['box', `spacing-${spacing}`, `bg-${background}`, border && `border-${borderPosition}`, className]} {...rest}><slot /></div>}
{as === 'section' && <section class:list={['box', `spacing-${spacing}`, `bg-${background}`, border && `border-${borderPosition}`, className]} {...rest}><slot /></section>}
{/* Add other element types as needed */}
```

### 2. Composite Component Example
```typescript
// src/components/patterns/Card/Card.astro
---
import Box from '@/components/primitives/Box/Box.astro'
import Text from '@/components/primitives/Text/Text.astro'
import Link from '@/components/primitives/Link/Link.astro'

export interface CardProps {
  title: string
  description?: string
  href?: string
  icon?: string
  variant?: 'default' | 'hover' | 'bordered'
  spacing?: 'sm' | 'md' | 'lg'
}

const {
  title,
  description,
  href,
  icon,
  variant = 'default',
  spacing = 'md',
} = Astro.props

const isLink = !!href
const Component = isLink ? 'a' : 'div'
---

<Box
  as={Component}
  href={href}
  spacing={spacing}
  className={`card card--${variant}`}
>
  {icon && <div class="card__icon">{icon}</div>}
  <Text as="h3" variant="heading-sm">{title}</Text>
  {description && <Text variant="body" color="secondary">{description}</Text>}
  <slot />
</Box>

<style>
  .card {
    @apply block transition-all duration-200;
  }
  
  .card--hover:hover {
    @apply bg-gray-900;
  }
  
  .card--bordered {
    @apply border border-gray-800;
  }
</style>
```

---

## SCSS/CSS Architecture

### Proposed File Structure
```
src/styles/
├── base/
│   ├── _reset.scss      // Modern CSS reset
│   ├── _typography.scss // Base typography
│   └── _utilities.scss  // Utility classes
├── tokens/
│   ├── _colors.scss
│   ├── _spacing.scss
│   ├── _breakpoints.scss
│   └── _index.scss     // Token exports
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   └── _navigation.scss
├── patterns/
│   ├── _grid.scss
│   ├── _sections.scss
│   └── _containers.scss
├── layouts/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _page.scss
└── main.scss          // Main entry point
```

### SCSS Architecture Principles
1. **One component = One file**
2. **Use CSS custom properties for theming**
3. **Prefer composition over inheritance**
4. **Mobile-first responsive design**
5. **BEM naming for complex components**

---

## File Structure Reorganization

### Current Structure Issues
- Components mixed with different concerns
- No clear separation between primitives and patterns
- Styles scattered across multiple locations

### Proposed Structure
```
src/
├── components/
│   ├── primitives/     // Atomic components
│   ├── patterns/       // Molecular components
│   ├── features/       // Organism components
│   └── layouts/        // Layout components
├── styles/
│   ├── base/          // Reset, typography
│   ├── tokens/        // Design tokens
│   ├── utilities/     // Utility classes
│   └── main.scss      // Entry point
├── pages/
│   ├── _templates/    // Page templates
│   └── [pages]        // Actual pages
├── content/
│   └── [collections]  // Content collections
└── lib/
    ├── utils/         // Utility functions
    └── types/         // TypeScript types
```

---

## New Components & Patterns

### Priority 1: Core Components
1. **Button Component**
   - Primary, secondary, ghost variants
   - Size variants (sm, md, lg)
   - Loading and disabled states
   - Icon support

2. **Form Components**
   - Input, Textarea, Select
   - Consistent styling and validation
   - Label and error message support

3. **Modal/Dialog**
   - Accessible modal implementation
   - Multiple sizes
   - Header, body, footer slots

4. **Toast/Notification**
   - Success, error, warning, info variants
   - Auto-dismiss functionality
   - Stacking support

### Priority 2: Enhanced Patterns
1. **Tabs Component**
   - Accessible tab navigation
   - Lazy loading support
   - Keyboard navigation

2. **Accordion/Collapse**
   - Smooth animations
   - Single/multiple expansion modes

3. **Breadcrumb**
   - Auto-generation from routes
   - Schema.org markup

4. **Pagination**
   - Flexible page display
   - Keyboard navigation

### Priority 3: Advanced Features
1. **DataTable**
   - Sortable columns
   - Filterable data
   - Responsive design

2. **Carousel/Slider**
   - Touch support
   - Multiple display modes
   - Lazy loading

3. **SearchBar**
   - Autocomplete
   - Recent searches
   - Category filtering

---

## Migration Strategy

### Phase 1: Foundation (Week 1-2)
1. **Set up new folder structure**
   - Create directories
   - Add README files
   - Set up import aliases

2. **Create design token system**
   - Define all tokens
   - Create SCSS variables
   - Add CSS custom properties

3. **Build primitive components**
   - Box, Text, Button, Link
   - Unit tests
   - Documentation

### Phase 2: Core Components (Week 3-4)
1. **Migrate existing components**
   - Refactor to use primitives
   - Add TypeScript interfaces
   - Standardize props

2. **Create missing patterns**
   - Form components
   - Grid system
   - Card variations

3. **Update pages to use new components**
   - Start with simple pages
   - Test responsiveness
   - Fix any issues

### Phase 3: Advanced Features (Week 5-6)
1. **Add new components**
   - Modal, Toast, Tabs
   - Advanced patterns
   - Interactive features

2. **Optimize performance**
   - Code splitting
   - Lazy loading
   - CSS optimization

3. **Documentation**
   - Component docs
   - Storybook setup
   - Usage examples

---

## Implementation Roadmap

### Week 1-2: Foundation
- [ ] Create new folder structure
- [ ] Set up design tokens
- [ ] Build Box, Text, Button primitives
- [ ] Create base SCSS architecture
- [ ] Set up TypeScript config

### Week 3-4: Core Refactor
- [ ] Refactor Header/Footer
- [ ] Create Card, Grid patterns
- [ ] Migrate Hero component
- [ ] Update 3 pages as proof of concept
- [ ] Create form components

### Week 5-6: Enhancement
- [ ] Add Modal, Toast components
- [ ] Create Tabs, Accordion
- [ ] Migrate remaining pages
- [ ] Performance optimization
- [ ] Write documentation

### Week 7-8: Polish
- [ ] Add animations/transitions
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Performance testing
- [ ] Final documentation

---

## Technical Decisions

### CSS Architecture
**Recommendation**: Hybrid approach
- Use Tailwind for utilities and rapid prototyping
- Custom SCSS for complex components and animations
- CSS custom properties for theming

### Component Props
**Recommendation**: TypeScript interfaces
- Better IDE support
- Runtime validation with Zod
- Auto-generated documentation

### State Management
**Recommendation**: Keep it simple
- Astro's built-in state for most cases
- Nanostores for client-side state
- No heavy frameworks needed

### Testing Strategy
**Recommendation**: Pragmatic approach
- Visual regression tests for components
- E2E tests for critical paths
- Accessibility tests automated

---

## Benefits of This Architecture

1. **Scalability**
   - Easy to add new components
   - Clear patterns to follow
   - Modular structure

2. **Maintainability**
   - Single source of truth
   - Clear separation of concerns
   - Consistent patterns

3. **Developer Experience**
   - TypeScript support
   - Better documentation
   - Faster development

4. **Performance**
   - Smaller CSS bundles
   - Better code splitting
   - Optimized assets

5. **Reusability**
   - Components work across projects
   - Easy to extract as package
   - Well-documented APIs

---

## Next Steps

1. **Review and approve proposal**
2. **Set up development branch**
3. **Begin Phase 1 implementation**
4. **Weekly progress reviews**
5. **Adjust timeline as needed**

---

## Design System Documentation Update

### Current design.mdc Issues
- Too long and difficult to navigate
- Mixed concerns (principles, components, rules)
- No clear hierarchy

### Proposed Documentation Structure
```
src/design-system/documentation/
├── 01-principles.md
│   ├── Design Philosophy
│   ├── Accessibility Standards
│   └── Performance Guidelines
├── 02-foundations.md
│   ├── Color System
│   ├── Typography Scale
│   ├── Spacing System
│   └── Responsive Design
├── 03-components.md
│   ├── Component API Standards
│   ├── Prop Naming Conventions
│   └── Composition Patterns
├── 04-patterns.md
│   ├── Layout Patterns
│   ├── Navigation Patterns
│   └── Content Patterns
└── 05-implementation.md
    ├── CSS Architecture
    ├── Component Structure
    └── Best Practices
```

---

## Specific Improvements to Current Components

### Header Component
**Current Issues:**
- Inline styles mixed with external SCSS
- Complex mobile menu logic embedded
- Non-reusable navigation component

**Proposed Changes:**
```typescript
// Split into smaller components
├── Navigation.astro       // Desktop nav logic
├── MobileMenu.astro      // Mobile menu component
├── NavigationItem.astro  // Single nav item
└── Header.astro          // Container only
```

### Footer Component
**Current Issues:**
- Hardcoded content
- Complex responsive grid inline
- Mixed responsibilities

**Proposed Changes:**
```typescript
// Modular footer sections
├── FooterBrand.astro     // Logo and tagline
├── FooterLinks.astro     // Link columns
├── FooterSocial.astro    // Social icons
├── FooterCopyright.astro // Copyright info
└── Footer.astro          // Composition component
```

### PostCard Component
**Current Issues:**
- Complex truncation logic inline
- Hardcoded author structure
- Mixed styling approaches

**Proposed Changes:**
```typescript
// Cleaner component structure
├── CardAuthor.astro      // Author info component
├── CardMeta.astro        // Date/category meta
├── TruncateText.astro    // Reusable truncation
└── PostCard.astro        // Clean composition
```

---

## Performance Optimizations

### CSS Optimization Strategy
1. **Critical CSS Extraction**
   - Inline critical path CSS
   - Lazy load non-critical styles
   - Use CSS containment

2. **Component-based Code Splitting**
   ```scss
   // Before: One large file
   @import 'global.scss'; // 804 lines
   
   // After: Split by concern
   @import 'critical.scss';  // 50 lines inline
   @import 'components.scss'; // Lazy loaded
   @import 'utilities.scss';  // On demand
   ```

3. **Unused CSS Removal**
   - PurgeCSS configuration
   - Component-scoped styles
   - Tree-shakeable utilities

### JavaScript Optimization
1. **Lazy Component Loading**
   ```typescript
   // Heavy components loaded on demand
   const Modal = await import('./Modal.astro');
   const DataTable = await import('./DataTable.astro');
   ```

2. **Event Delegation**
   - Single event listeners for repeated elements
   - Reduced memory footprint
   - Better performance

---

## Accessibility Improvements

### WCAG 2.1 AA Compliance
1. **Color Contrast**
   - Verify all text meets 4.5:1 ratio
   - Interactive elements meet 3:1 ratio
   - Add high contrast mode support

2. **Keyboard Navigation**
   - Full keyboard support for all components
   - Visible focus indicators
   - Logical tab order

3. **Screen Reader Support**
   - Proper ARIA labels
   - Semantic HTML structure
   - Live regions for dynamic content

### Component Accessibility Checklist
- [ ] Keyboard navigable
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus indicators visible
- [ ] ARIA attributes correct
- [ ] Semantic HTML used

---

## Mobile-First Enhancements

### Current Mobile Issues
1. **Performance**
   - Large CSS bundle
   - Unused desktop styles
   - Heavy JavaScript

2. **UX Problems**
   - Touch targets too small
   - Horizontal scrolling
   - Poor gesture support

### Proposed Mobile Improvements
1. **Touch-Optimized Components**
   ```scss
   // Minimum touch target size
   .touchable {
     min-height: 44px;
     min-width: 44px;
   }
   ```

2. **Progressive Enhancement**
   ```typescript
   // Base mobile experience
   <Card basic={true} />
   
   // Enhanced for capable devices
   @media (hover: hover) {
     <Card enhanced={true} />
   }
   ```

3. **Performance Budget**
   - CSS: <50KB compressed
   - JS: <100KB compressed
   - First paint: <1.5s on 3G

---

## Developer Experience Improvements

### 1. Component Development Workflow
```bash
# Generate new component
npm run generate:component Button

# Creates:
# - src/components/primitives/Button/Button.astro
# - src/components/primitives/Button/Button.test.ts
# - src/components/primitives/Button/Button.stories.ts
# - src/components/primitives/Button/README.md
```

### 2. Auto-Documentation
```typescript
// Props are auto-documented
export interface ButtonProps {
  /** The visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the button is disabled */
  disabled?: boolean
}
```

### 3. Development Tools
- **Component Explorer**: Browse all components
- **Theme Switcher**: Test different themes
- **Device Preview**: Test responsive design
- **A11y Checker**: Accessibility validation

---

## Future Considerations

### Potential Expansions
1. **Multi-theme Support**
   - Dark/light mode toggle
   - Custom theme creation
   - Theme marketplace

2. **Component Marketplace**
   - Share components
   - Download community components
   - Version management

3. **AI Integration**
   - Component suggestions
   - Automatic optimization
   - Content generation

### Technology Upgrades
1. **View Transitions API**
   - Smooth page transitions
   - Better perceived performance
   - Native browser support

2. **Container Queries**
   - True component responsiveness
   - Context-aware sizing
   - Better composition

3. **CSS Cascade Layers**
   - Better specificity control
   - Easier overrides
   - Cleaner architecture

---

## Questions for Clarification

Before proceeding with implementation, please provide input on:

1. **TypeScript Migration**: Should we add TypeScript for better DX?
2. **CSS Preference**: Utility-first (Tailwind) or hybrid approach?
3. **Component Library**: Internal use only or future npm package?
4. **Design Tokens**: Implement shareable design token system?
5. **Testing Strategy**: Add Storybook or component testing?
6. **i18n Support**: Is internationalization planned?
7. **CMS Integration**: Any headless CMS in the roadmap?

---

## Conclusion

This refactor will transform your codebase into a:
- **Scalable** design system
- **Maintainable** component architecture
- **Reusable** pattern library
- **Performance-optimized** website
- **Developer-friendly** platform

The investment in this architecture will pay dividends in:
- Faster feature development
- Easier maintenance
- Better performance
- Improved accessibility
- Enhanced developer experience

Ready to begin? Let's start with Phase 1!

---

*This is a living document and will be updated as the refactor progresses.*

---

## FOCUSED REFACTOR PLAN (Based on Your Requirements)

### Your Priorities:
- ✅ Hybrid approach: SCSS for system, Tailwind for prototyping
- ✅ Focus on SCSS architecture improvements
- ✅ Internal project only (no npm package needed)
- ✅ Custom variables in @variables.scss
- ✅ Design decisions documented in @design.mdc
- ✅ No testing framework needed
- ✅ Blog-scale website

### Key Clarifications:
- **NO RESET NEEDED** - Tailwind base is enough
- **NO TYPOGRAPHY FILE** - Tailwind typography + custom tweaks in components
- **@apply ISSUE** - If @apply doesn't work in Astro components, use Tailwind classes directly
- **STYLES IN COMPONENTS** - Yes, keep component styles close to components when possible

### Immediate SCSS Architecture Improvements

#### 1. Simplified File Structure
```
src/
├── styles/
│   ├── variables.scss     // ALL design tokens here
│   ├── mixins.scss       // Reusable mixins only
│   ├── global.scss       // Imports + global utilities only
│   └── components/       // Only for shared component styles
│       ├── _grid.scss    // cards-grid system
│       └── _containers.scss // container mixins
└── components/
    ├── Header.astro      // With <style> tag inside
    ├── Footer.astro      // With <style> tag inside
    └── cards/
        ├── CardContainer.astro    // Shared wrapper
        ├── OfferCard.astro       // Uses CardContainer
        ├── BlogCard.astro        // Uses CardContainer + TruncateText
        └── PortfolioCard.astro   // Uses CardContainer
```

#### 2. CardContainer Component (Your Excellent Idea!)
```astro
<!-- components/cards/CardContainer.astro -->
---
interface Props {
  href?: string
  hasHover?: boolean
  backgroundIcon?: string
  class?: string
}

const { 
  href, 
  hasHover = !!href,  // Default: hover if link exists
  backgroundIcon,
  class: className = ''
} = Astro.props

const Element = href ? 'a' : 'div'
---

<Element 
  href={href}
  class={`card-container ${hasHover ? 'card-container--hover' : ''} ${className}`}
>
  {backgroundIcon && (
    <div class="card-container__bg-icon">{backgroundIcon}</div>
  )}
  <div class="card-container__content">
    <slot />
  </div>
</Element>

<style>
  .card-container {
    @apply block bg-black relative overflow-hidden;
    /* Can't use @apply? Use regular CSS: */
    display: block;
    background-color: black;
    position: relative;
  }

  .card-container--hover {
    @apply transition-all duration-200;
  }

  .card-container--hover:hover {
    background-color: var(--color-gray-900);
  }

  .card-container__content {
    /* Responsive padding using CSS variables */
    padding: var(--spacing-card);
    position: relative;
    z-index: 1;
  }

  .card-container__bg-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    font-size: 3rem;
    opacity: 0.1;
    z-index: 0;
  }
</style>
```

#### 3. Using CardContainer in Different Cards
```astro
<!-- components/cards/OfferCard.astro -->
---
import CardContainer from './CardContainer.astro'

interface Props {
  number: string
  title: string
  description: string
  icon: string
  href?: string
}

const { number, title, description, icon, href } = Astro.props
---

<CardContainer href={href} backgroundIcon={icon}>
  <div class="text-gray-500 text-sm mb-2">{number}</div>
  <h3 class="text-xl font-bold mb-3">{title}</h3>
  <p class="text-gray-300">{description}</p>
</CardContainer>
```

#### 4. PostMeta Component (Author + Date + Category in one line)
```astro
<!-- components/PostMeta.astro -->
---
interface Props {
  author: {
    name: string
    avatar: string
    profileUrl: string
  }
  date: string
  category: string
}

const { author, date, category } = Astro.props
---

<div class="flex items-center gap-x-2 text-gray-700 text-sm">
  <img
    src={author.avatar}
    alt={author.name}
    class="h-5 w-5 rounded-full bg-gray-50"
  />
  <a href={author.profileUrl} class="text-gray-400 hover:text-gray-300">
    {author.name}
  </a>
  <span>·</span>
  <time datetime={date}>{date}</time>
  <span>·</span>
  <a href={`/category/${category}`} class="hover:text-gray-500">
    {category}
  </a>
</div>
```

### Updated design.mdc Structure (Comprehensive Cheatsheet with File Links)
```markdown
# Żentała Design System - Complete Reference

## 🎯 Quick Start Checklist
Before creating any new component/page, check:
- [ ] Use `CardContainer` for any card-like element
- [ ] Use variables from `$space` map for spacing
- [ ] Use responsive mixins for padding/margins
- [ ] Check if component already exists before creating

## 🎨 Core Design Decisions

### Colors (→ see [`variables.scss`](./variables.scss) for full palette)
```scss
// Primary palette - USE THESE
$border-color: #1f2937;  // gray-800 - ALL borders
$border-hover: #374151;  // gray-700 - hover state
$bg-hover: #111827;      // gray-900 - background hover

// Text colors - use Tailwind
text-white              // Primary text
text-gray-300          // Secondary text  
text-gray-400          // Muted text

// Usage examples
border: 1px solid $border-color;
&:hover { 
  border-color: $border-hover;
  background-color: $bg-hover;
}
```

### Spacing System (→ see [`variables.scss`](./variables.scss) → `$space` map)
```scss
// Desktop → Tablet → Mobile (automatic scaling)
$space-10: 64px → 48px → 32px  // Section padding
$space-6:  32px → 24px → 16px  // Component padding
$space-4:  16px → 12px → 8px   // Small gaps

// How to use
@include spacing('padding', 10);      // Auto-responsive padding
padding: map-get($space, 10);         // Non-responsive
class="p-16"                          // Tailwind (64px)
```

### Breakpoints (→ see [`variables.scss`](./variables.scss) → `$breakpoints`)
```scss
// YOUR breakpoints (for SCSS)
$mobile-max: 480px      // Ultra mobile
$tablet-max: 770px      // Custom tablet
$medium-max: 1000px     // Small desktop
$large-max: 1440px      // Large desktop
$container-max: 1450px  // Container borders vanish

// TAILWIND breakpoints (for HTML classes)
sm: 640px   // Don't mix with yours!
md: 768px   // Use for Tailwind only
lg: 1024px  // Like: class="lg:grid-cols-3"
xl: 1280px  // Keep separate from SCSS
```

## 🧱 Component Library

### CardContainer (→ [`components/cards/CardContainer.astro`](../components/cards/CardContainer.astro))
**The base for ALL cards.** Handles:
- Link wrapping (automatic if href provided)
- Hover states (auto-enabled for links)
- Background icons
- Consistent padding
- Proper semantics

```astro
<!-- Basic usage -->
<CardContainer href="/link" backgroundIcon="🚀">
  <h3>Title</h3>
  <p>Content</p>
</CardContainer>

<!-- Without link (no hover) -->
<CardContainer>
  <h3>Static content</h3>
</CardContainer>

<!-- Custom hover behavior -->
<CardContainer href="/link" hasHover={false}>
  <h3>Link without hover effect</h3>
</CardContainer>
```

### Cards Grid (→ [`styles/components/_grid.scss`](./components/_grid.scss))
Smart grid that adds borders between items automatically.

```html
<div class="cards-grid">
  <!-- Auto borders between cards -->
  <CardContainer>...</CardContainer>
  <CardContainer>...</CardContainer>
  <CardContainer>...</CardContainer>
</div>
```

Features:
- 3 columns on desktop
- 2 columns on tablet  
- 1 column on mobile
- Smart borders (no -m-px hack!)
- No border on last items in row

### Container System (→ mixins in [`variables.scss`](./variables.scss))
```scss
// THREE types - memorize these!
.container-bordered   // max-width + side borders (disappear <1450px)
.container-padded    // max-width + responsive padding
.container-simple    // ONLY max-width centering

// Common combinations
.container-bordered.spacing-md  // Bordered + padding
.container-padded              // Already has padding
```

### PostMeta Component (→ [`components/PostMeta.astro`](../components/PostMeta.astro))
Handles author, date, category in one line.

```astro
<PostMeta 
  author={authorObject}
  date="2024-01-15"
  category="technology"
/>
```

### TruncateText (→ [`components/TruncateText.astro`](../components/TruncateText.astro))
Smart text truncation that fits container.

```astro
<TruncateText 
  text={longText}
  class="text-lg text-gray-300"
/>
```

## 📐 Layout Patterns

### Standard Page Structure (MEMORIZE THIS!)
```astro
<Layout title="Page Title">
  <!-- Optional hero -->
  <Hero title="Big Title" subtitle="Subtitle" />
  
  <!-- Main content sections -->
  <section class="section-full">
    <div class="container-bordered">
      <div class="cards-grid">
        <CardContainer href="/1">...</CardContainer>
        <CardContainer href="/2">...</CardContainer>
        <CardContainer href="/3">...</CardContainer>
      </div>
    </div>
  </section>
  
  <!-- Another section -->
  <section class="section-full">
    <div class="container-padded">
      <!-- Non-card content -->
    </div>
  </section>
</Layout>
```

### Section Variants
```html
<!-- Standard section -->
<section class="section-full">
  <!-- border-bottom, full width -->
</section>

<!-- With background pattern -->
<section class="section-grid">
  <!-- Same + grid pattern -->
</section>
```

## 🛠️ Mixins & Utilities

### Responsive Spacing Mixin (→ [`mixins.scss`](./mixins.scss))
```scss
// THIS IS YOUR MAIN TOOL!
@include spacing('padding', 10);     // 64px → 48px → 32px
@include spacing('margin-top', 6);   // 32px → 24px → 16px
@include spacing('gap', 4);          // 16px → 12px → 8px

// Turn off responsive
@include spacing('padding', 10, false);  // Always 64px
```

### Container Mixin
```scss
// In your SCSS
.my-special-section {
  @include container($bordered: true, $padded: true);
}
```

### Media Query Helpers
```scss
// Mobile first
@include media-up('tablet') {
  // 770px and up
}

// Desktop first  
@include media-down('tablet') {
  // 770px and down
}

// Range
@include media-between('mobile', 'tablet') {
  // 480px to 770px
}
```

## 🚨 Common Patterns & Solutions

### Card Types Quick Reference
```astro
<!-- Offer Card -->
<CardContainer href="/offer/item" backgroundIcon="🚀">
  <div class="text-gray-500 text-sm mb-2">01</div>
  <h3 class="text-xl font-bold mb-3">Service Name</h3>
  <p class="text-gray-300">Description here...</p>
</CardContainer>

<!-- Blog Card -->
<CardContainer href={post.url}>
  <PostMeta author={author} date={date} category={category} />
  <h3 class="text-2xl font-light text-white mt-3">{title}</h3>
  <TruncateText text={excerpt} class="mt-5 text-lg text-gray-300" />
</CardContainer>

<!-- Portfolio Card -->
<CardContainer href="/portfolio/project">
  <img src={image} alt={title} class="mb-4 rounded" />
  <h3 class="text-xl font-bold mb-2">{title}</h3>
  <p class="text-gray-300 mb-4">{description}</p>
  <div class="flex flex-wrap gap-2">
    {techs.map(t => <span class="tag">{t}</span>)}
  </div>
</CardContainer>
```

### Responsive Text Patterns
```html
<!-- Use Tailwind responsive prefixes -->
<h1 class="text-3xl md:text-4xl lg:text-5xl">
  Responsive heading
</h1>

<!-- Mobile-first approach -->
<p class="text-sm md:text-base lg:text-lg">
  Responsive paragraph
</p>
```

### When @apply Doesn't Work
```scss
// In .astro components, sometimes @apply fails

// ❌ Doesn't work
.my-class { @apply text-white bg-black; }

// ✅ Solution 1: Regular CSS
.my-class { 
  color: white;
  background-color: black;
}

// ✅ Solution 2: Move to external SCSS
// In components/_my-component.scss
.my-class { @apply text-white bg-black; }

// ✅ Solution 3: Use classes in template
<div class="text-white bg-black">
```

## 📝 Decision Matrix

### "Should I create a component?"
```
Used 3+ times?          → YES, create component
Complex state/logic?    → YES, create component  
Just styling?          → NO, use Tailwind
Variations needed?     → YES, create with props
```

### "Where should styles go?"
```
Shared across components?  → /styles/components/
Specific to component?     → <style> in .astro
Quick prototype?          → Tailwind in template
Complex responsive?       → SCSS with mixins
```

### "Which spacing to use?"
```
Component padding?     → $space-6 (32px)
Section padding?      → $space-10 (64px)
Small gaps?          → $space-4 (16px)
Micro adjustments?   → Tailwind (p-2, m-1)
```

## 🔍 Quick Debug Checklist

- [ ] Container not centered? → Missing `.container` class
- [ ] Borders not showing? → Check if < 1450px screen
- [ ] Padding too big on mobile? → Use responsive mixins
- [ ] Cards not aligned? → Use `.cards-grid`
- [ ] Hover not working? → Check `hasHover` prop
- [ ] Text overflowing? → Add `TruncateText`

## 📌 Remember These Files

1. **ALWAYS OPEN**: `variables.scss` - your bible
2. **FOR MIXINS**: `mixins.scss` - your tools  
3. **FOR PATTERNS**: This file (`design.mdc`) - your guide
4. **FOR PROGRESS**: `refactor-next.md` - your todo

---

*Last updated: [date] - Keep this as your desktop background! 😄*