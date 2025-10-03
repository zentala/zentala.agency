# Homepage Implementation Architecture & Plan

## CURRENT PROJECT ANALYSIS

### ✅ What We Already Have (Strengths)

**Design System:**
- ✅ SCSS with well-organized variables (`variables.scss`)
- ✅ Responsive mixins system (`@mixin mobile`, `@mixin tablet`, etc.)
- ✅ Spacing system (64px → 48px → 32px → 24px → 16px)
- ✅ Container system (`container-bordered`, `container-padded`)
- ✅ Cards grid system with borders (`cards-grid`, modifiers like `--halves`, `--two-one`)
- ✅ Component-scoped styles with SCSS modules
- ✅ Tailwind + SCSS hybrid approach (works well!)

**Reusable Components:**
- ✅ `CardContainer.astro` - flexible card wrapper with hover, background icons
- ✅ `Hero.astro` - simple title/subtitle hero
- ✅ `OfferCard.astro` - numbered cards with icons
- ✅ `PortfolioItem.astro` - project cards with images
- ✅ `Button.astro` - CTA buttons with variants
- ✅ `Layout.astro` - base layout with header/footer

**Styling Patterns:**
- ✅ SCSS placeholders (`%card-title`, `%card-content`) for reusable styles
- ✅ BEM-like naming in components
- ✅ Responsive padding/spacing mixins
- ✅ Dark theme established (black bg, gray borders)

---

## IMPLEMENTATION PLAN: How to Build Homepage

### Strategy: REUSE + EXTEND (Not Rebuild)

**Philosophy:**
1. **Reuse existing components** where possible (CardContainer, Button, etc.)
2. **Extend with new specialized components** for homepage needs
3. **Keep component structure modular** - one component = one responsibility
4. **Use composition** - combine small components into larger sections

---

## FILE STRUCTURE & COMPONENT ARCHITECTURE

```
src/
├── pages/
│   └── index.astro                    # NEW: Main homepage (orchestrates all sections)
│
├── components/
│   ├── home/                          # NEW FOLDER: Homepage-specific components
│   │   ├── HeroWithVariations.astro   # NEW: Hero with A/B test switcher
│   │   ├── HeroVariantA.astro         # NEW: "Hands-On CTO" variant
│   │   ├── HeroVariantB.astro         # NEW: "Problem-Solution" variant
│   │   ├── HeroVariantC.astro         # NEW: "Department Builder" variant
│   │   ├── HeroVariantD.astro         # NEW: "Builder Identity" variant
│   │   ├── HeroVariantE.astro         # NEW: "Expertise-First" variant
│   │   │
│   │   ├── ServiceSection.astro       # NEW: Wrapper for each service section
│   │   ├── ServiceIoT.astro           # NEW: IoT service content
│   │   ├── ServiceBackstage.astro     # NEW: Backstage service content
│   │   ├── ServiceRapidDev.astro      # NEW: Rapid dev service content
│   │   │
│   │   ├── FeaturedProjects.astro     # NEW: 3-project grid subsection
│   │   ├── ProjectCard.astro          # NEW: Individual project card
│   │   │
│   │   ├── WhyWorkWithMe.astro        # NEW: Capabilities section
│   │   ├── CapabilityBlock.astro      # NEW: Individual capability block
│   │   │
│   │   ├── EngagementModels.astro     # NEW: How I Work section
│   │   ├── EngagementCard.astro       # NEW: Individual engagement model card
│   │   │
│   │   └── CTASection.astro           # NEW: Final CTA with buttons
│   │
│   ├── cards/                         # EXISTING: Card components
│   │   ├── CardContainer.astro        # ✅ REUSE: Base card wrapper
│   │   ├── OfferCard.astro           # ✅ REUSE/REFERENCE
│   │   └── PortfolioItem.astro       # ✅ REUSE/REFERENCE
│   │
│   ├── Button.astro                   # ✅ REUSE: CTA buttons
│   ├── Hero.astro                     # ❌ DON'T REUSE (too simple for homepage)
│   └── Logo.astro                     # ✅ REUSE: Logo component
│
├── styles/
│   ├── components/
│   │   ├── _home.scss                 # NEW: Homepage-specific styles
│   │   └── _hero-variations.scss      # NEW: Hero variant styles
│   │
│   └── variables.scss                 # ✅ EXTEND: Add new variables if needed
│
└── layouts/
    └── Layout.astro                    # ✅ REUSE: Base layout

```

---

## DETAILED COMPONENT BREAKDOWN

### 1. HERO SECTION: A/B Test Approach

**File: `src/components/home/HeroWithVariations.astro`**

**Purpose:** Container that shows different hero variants with switcher

**Implementation:**
```astro
---
import HeroVariantA from './HeroVariantA.astro'
import HeroVariantB from './HeroVariantB.astro'
import HeroVariantC from './HeroVariantC.astro'
import HeroVariantD from './HeroVariantD.astro'
import HeroVariantE from './HeroVariantE.astro'

// Accept variant prop (default 'A')
const { variant = 'A' } = Astro.props
---

<section class="hero-section section-grid">
  <div class="container-bordered">

    {variant === 'A' && <HeroVariantA />}
    {variant === 'B' && <HeroVariantB />}
    {variant === 'C' && <HeroVariantC />}
    {variant === 'D' && <HeroVariantD />}
    {variant === 'E' && <HeroVariantE />}

    <!-- Optional: Dev switcher (remove in production) -->
    <div class="hero-switcher" data-dev-only>
      <button data-variant="A">Variant A</button>
      <button data-variant="B">Variant B</button>
      <button data-variant="C">Variant C</button>
      <button data-variant="D">Variant D</button>
      <button data-variant="E">Variant E</button>
    </div>

  </div>
</section>

<script>
  // Client-side variant switcher for testing
  // Shows all variants on same page with scroll/tabs
  // Implementation details...
</script>
```

---

**File: `src/components/home/HeroVariantA.astro`**

**Purpose:** Single hero variant with logo + photo + copy

**Reuses:** `Logo.astro`, `Button.astro`

**Implementation:**
```astro
---
import Logo from '../Logo.astro'
import Button from '../Button.astro'
---

<div class="hero-variant hero-variant--a">

  <!-- Logo -->
  <div class="hero-variant__logo">
    <Logo />
  </div>

  <!-- Photo -->
  <div class="hero-variant__photo">
    <img
      src="/images/pawel-zentala.jpg"
      alt="Paweł Żentała"
      class="hero-variant__photo-img"
    />
  </div>

  <!-- Name -->
  <h1 class="hero-variant__name">Paweł Żentała</h1>

  <!-- Headline -->
  <h2 class="hero-variant__headline">
    Hands-On CTO for Innovation Projects
  </h2>

  <!-- Value Proposition -->
  <p class="hero-variant__value-prop">
    I build complex technology solutions from vision to working prototype -
    and assemble teams to scale them. With 20+ years across full-stack
    development, IoT, robotics, DevOps, and UX, I act as your technical
    co-founder until you have a team.
  </p>

  <!-- Tagline -->
  <p class="hero-variant__tagline">
    Where you have nothing, I build everything.
  </p>

  <!-- CTAs -->
  <div class="hero-variant__ctas">
    <Button
      href="https://cal.com/zentala"
      text="Schedule Discovery Call"
      variant="primary"
      target="_blank"
    />
    <Button
      href="/portfolio"
      text="View Portfolio"
      variant="secondary"
    />
  </div>

</div>

<style lang="scss">
  @use '../../styles/variables' as *;

  .hero-variant {
    @include py-responsive('lg'); // Large vertical padding
    text-align: center;
    color: white;
  }

  .hero-variant__logo {
    max-width: 300px;
    margin: 0 auto 3rem;

    @include mobile {
      max-width: 200px;
      margin-bottom: 2rem;
    }
  }

  .hero-variant__photo {
    margin: 0 auto 2rem;

    @include mobile {
      margin-bottom: 1.5rem;
    }
  }

  .hero-variant__photo-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $border-color-hover;

    @include mobile {
      width: 100px;
      height: 100px;
    }
  }

  .hero-variant__name {
    font-size: 2rem; // text-3xl
    font-weight: 300;
    margin-bottom: 1rem;

    @include mobile {
      font-size: 1.5rem;
    }
  }

  .hero-variant__headline {
    font-size: 3rem; // text-5xl
    font-weight: 400;
    margin-bottom: 2rem;
    line-height: 1.2;

    @include tablet {
      font-size: 2.5rem;
    }

    @include mobile {
      font-size: 1.875rem;
      margin-bottom: 1.5rem;
    }
  }

  .hero-variant__value-prop {
    font-size: 1.25rem; // text-xl
    color: #d1d5db; // gray-300
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.6;

    @include mobile {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }

  .hero-variant__tagline {
    font-size: 1.5rem; // text-2xl
    font-weight: 500;
    color: #60a5fa; // blue-400
    margin-bottom: 3rem;

    @include mobile {
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
  }

  .hero-variant__ctas {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
```

**Note:** Create variants B, C, D, E following same structure, just changing copy.

---

### 2. SERVICE SECTIONS: Modular Approach

**File: `src/components/home/ServiceSection.astro`**

**Purpose:** Reusable wrapper for each service section

**Reuses:** Existing `section-full`, `container-bordered` classes

**Implementation:**
```astro
---
interface Props {
  id: string
  headline: string
  subhead: string
}

const { id, headline, subhead } = Astro.props
---

<section class="service-section section-full" id={id}>
  <div class="container-bordered">

    <!-- Service Header -->
    <div class="service-section__header">
      <h2 class="service-section__headline">{headline}</h2>
      <p class="service-section__subhead">{subhead}</p>
    </div>

    <!-- Service Content (slot for specific service details) -->
    <div class="service-section__content">
      <slot name="content" />
    </div>

    <!-- Featured Projects (slot for projects grid) -->
    <div class="service-section__projects">
      <slot name="projects" />
    </div>

    <!-- CTA (slot for bottom CTA) -->
    <div class="service-section__cta">
      <slot name="cta" />
    </div>

  </div>
</section>

<style lang="scss">
  @use '../../styles/variables' as *;

  .service-section__header {
    @include px-responsive();
    @include py-responsive('lg');
    text-align: center;
    border-bottom: 1px solid $border-color;
  }

  .service-section__headline {
    font-size: 3rem;
    font-weight: 300;
    color: white;
    margin-bottom: 1rem;

    @include tablet {
      font-size: 2.5rem;
    }

    @include mobile {
      font-size: 2rem;
    }
  }

  .service-section__subhead {
    font-size: 1.5rem;
    color: #9ca3af; // gray-400

    @include mobile {
      font-size: 1.125rem;
    }
  }

  .service-section__content {
    @include px-responsive();
    @include py-responsive('md');
    border-bottom: 1px solid $border-color;
  }

  .service-section__projects {
    // No padding - FeaturedProjects handles it with cards-grid
  }

  .service-section__cta {
    @include px-responsive();
    @include py-responsive('md');
    text-align: center;
  }
</style>
```

---

**File: `src/components/home/ServiceIoT.astro`**

**Purpose:** IoT service specific content

**Implementation:**
```astro
---
import ServiceSection from './ServiceSection.astro'
import FeaturedProjects from './FeaturedProjects.astro'
import Button from '../Button.astro'

const projects = [
  {
    title: 'RTLS Indoor Location Systems',
    description: 'Real-time indoor location tracking for retail...',
    image: '/images/portfolio/rtls.jpg',
    href: '/portfolio#rtls'
  },
  {
    title: 'Smart Height Adjustable Desk',
    description: 'Open research project automating ergonomic...',
    image: '/images/portfolio/open-smart-desk.jpg',
    href: 'https://desk.zentala.io'
  },
  {
    title: 'Smart Home System',
    description: 'Complete 50m² apartment automation...',
    image: '/images/portfolio/smart-home.jpg',
    href: 'https://ihome.zentala.io'
  }
]
---

<ServiceSection
  id="iot-engineering"
  headline="IoT Product Engineering"
  subhead="From vision to working prototype to production-ready systems"
>

  <!-- Content Slot -->
  <div slot="content" class="service-content">

    <p class="service-content__description">
      End-to-end development of IoT solutions - hardware selection, firmware,
      cloud infrastructure, mobile and web applications. I create the technical
      vision, build initial prototypes, and if needed, assemble specialized teams
      to scale production.
    </p>

    <div class="service-content__grid">

      <div class="service-content__block">
        <h3 class="service-content__block-title">What I deliver:</h3>
        <ul class="service-content__list">
          <li>Product architecture & technical strategy</li>
          <li>Hardware integration & firmware development</li>
          <li>Cloud infrastructure & data pipelines</li>
          <li>Mobile & web application development</li>
          <li>Team assembly & technical leadership</li>
        </ul>
      </div>

      <div class="service-content__block">
        <h3 class="service-content__block-title">Experience highlights:</h3>
        <ul class="service-content__list service-content__list--companies">
          <li><strong>Ubudu</strong> (French IoT startup) - RTLS indoor location systems</li>
          <li><strong>BSH</strong> (Bosch Siemens) - Smart home appliances firmware</li>
          <li><strong>Cheil Poland</strong> (Samsung) - Socially-aware humanoid robot</li>
        </ul>
      </div>

    </div>

  </div>

  <!-- Projects Slot -->
  <FeaturedProjects slot="projects" projects={projects} />

  <!-- CTA Slot -->
  <Button
    slot="cta"
    href="/contact"
    text="Discuss your IoT project →"
    variant="outline"
  />

</ServiceSection>

<style lang="scss">
  @use '../../styles/variables' as *;

  .service-content__description {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #d1d5db;
    margin-bottom: 3rem;

    @include mobile {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }

  .service-content__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    @include tablet {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .service-content__block-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin-bottom: 1rem;
  }

  .service-content__list {
    list-style: none;
    padding: 0;

    li {
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: #9ca3af;
      position: relative;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: #60a5fa; // blue-400
      }
    }

    &--companies li {
      strong {
        color: white;
      }
    }
  }
</style>
```

**Note:** Create `ServiceBackstage.astro` and `ServiceRapidDev.astro` following same pattern.

---

### 3. FEATURED PROJECTS: Reusable Grid

**File: `src/components/home/FeaturedProjects.astro`**

**Purpose:** 3-column grid of project cards (reuses existing grid system)

**Reuses:** `cards-grid` class, existing grid system

**Implementation:**
```astro
---
import ProjectCard from './ProjectCard.astro'

interface Project {
  title: string
  description: string
  image?: string
  href: string
}

interface Props {
  projects: Project[]
}

const { projects } = Astro.props
---

<div class="featured-projects">
  <div class="cards-grid">
    {projects.map(project => (
      <ProjectCard {...project} />
    ))}
  </div>
</div>

<style lang="scss">
  .featured-projects {
    // cards-grid handles borders/layout
    // No additional wrapper styles needed
  }
</style>
```

---

**File: `src/components/home/ProjectCard.astro`**

**Purpose:** Individual project card

**Reuses:** `CardContainer.astro` as base

**Implementation:**
```astro
---
import CardContainer from '../cards/CardContainer.astro'

interface Props {
  title: string
  description: string
  image?: string
  href: string
}

const { title, description, image, href } = Astro.props
---

<CardContainer href={href} target="_blank" class="project-card">

  {image && (
    <div class="project-card__image">
      <img src={image} alt={title} />
    </div>
  )}

  <h3 class="project-card__title">{title}</h3>
  <p class="project-card__description">{description}</p>

  <div class="project-card__link">
    Learn more →
  </div>

</CardContainer>

<style lang="scss">
  @use '../../styles/variables' as *;
  @use '../../styles/components/cards' as *;

  .project-card__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    margin-bottom: 1.5rem;
    background: #111827; // gray-900

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  .project-card:hover .project-card__image img {
    transform: scale(1.05);
  }

  .project-card__title {
    @extend %card-title-medium;
    margin-bottom: 1rem;
  }

  .project-card__description {
    @extend %card-content;
    color: #9ca3af;
    margin-bottom: 1.5rem;
  }

  .project-card__link {
    color: #60a5fa; // blue-400
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .project-card:hover .project-card__link {
    color: #93c5fd; // blue-300
  }
</style>
```

---

### 4. WHY WORK WITH ME SECTION

**File: `src/components/home/WhyWorkWithMe.astro`**

**Purpose:** Capabilities showcase

**Reuses:** `cards-grid` system

**Implementation:**
```astro
---
import CapabilityBlock from './CapabilityBlock.astro'

const capabilities = [
  {
    title: 'Complete Technical Capabilities',
    items: [
      'Programming: TypeScript, Python, Bash',
      'DevOps: CI/CD, cloud, Docker',
      'IoT & Robotics: Hardware, firmware, ROS',
      'UX/Design: Interfaces, architecture',
      'Product & Business: Marketing, sales',
      'Leadership: Team assembly, management'
    ]
  },
  {
    title: 'Corporate Experience',
    items: [
      'BSH (Bosch Siemens) - Smart home',
      'Cheil Poland (Samsung) - Robotics',
      'Ubudu (French IoT) - RTLS systems',
      'Multiple product roles'
    ]
  },
  {
    title: 'From Vision to Team',
    items: [
      '1. Vision & Architecture',
      '2. Prototype Development',
      '3. Team Assembly (if needed)',
      '4. Knowledge Transfer'
    ]
  }
]
---

<section class="why-section section-full">
  <div class="container-bordered">

    <div class="why-section__header">
      <h2 class="why-section__headline">
        Not Just a Developer. Hands-On CTO With Business & UX Understanding.
      </h2>
      <p class="why-section__subhead">
        Where others need specialized teams, I bring broad-horizon expertise
        across the entire technical stack - plus business strategy and user
        experience perspective.
      </p>
    </div>

    <div class="cards-grid cards-grid--halves">
      {capabilities.map(cap => (
        <CapabilityBlock {...cap} />
      ))}
    </div>

  </div>
</section>

<style lang="scss">
  @use '../../styles/variables' as *;

  .why-section__header {
    @include px-responsive();
    @include py-responsive('lg');
    text-align: center;
    border-bottom: 1px solid $border-color;
  }

  .why-section__headline {
    font-size: 2.5rem;
    font-weight: 300;
    color: white;
    margin-bottom: 1.5rem;

    @include mobile {
      font-size: 1.875rem;
    }
  }

  .why-section__subhead {
    font-size: 1.25rem;
    color: #9ca3af;
    max-width: 900px;
    margin: 0 auto;

    @include mobile {
      font-size: 1rem;
    }
  }
</style>
```

---

## MAIN HOMEPAGE ORCHESTRATION

**File: `src/pages/index.astro`**

**Purpose:** Compose all sections together

**Implementation:**
```astro
---
import Layout from '../layouts/Layout.astro'
import HeroWithVariations from '../components/home/HeroWithVariations.astro'
import ServiceIoT from '../components/home/ServiceIoT.astro'
import ServiceBackstage from '../components/home/ServiceBackstage.astro'
import ServiceRapidDev from '../components/home/ServiceRapidDev.astro'
import WhyWorkWithMe from '../components/home/WhyWorkWithMe.astro'
import EngagementModels from '../components/home/EngagementModels.astro'
import CTASection from '../components/home/CTASection.astro'

// Get variant from URL param for A/B testing
const url = Astro.url
const variant = url.searchParams.get('hero') || 'A'
---

<Layout
  title="Home"
  description="Paweł Żentała - Hands-On CTO for innovation projects. I build complex technology solutions from vision to working prototype."
>

  <!-- Hero with variants -->
  <HeroWithVariations variant={variant} />

  <!-- Service Sections (each is separate section) -->
  <ServiceIoT />
  <ServiceBackstage />
  <ServiceRapidDev />

  <!-- Why Work With Me -->
  <WhyWorkWithMe />

  <!-- Engagement Models -->
  <EngagementModels />

  <!-- Final CTA -->
  <CTASection />

</Layout>
```

---

## REUSABILITY STRATEGY

### ✅ What We Reuse As-Is:

1. **`CardContainer.astro`** - Base for all card-based components
2. **`Button.astro`** - All CTAs
3. **`Logo.astro`** - Hero logo
4. **`Layout.astro`** - Page wrapper
5. **Grid system** - `cards-grid` classes
6. **Container system** - `container-bordered`, `section-full`
7. **Spacing mixins** - `@include px-responsive()`, etc.
8. **SCSS placeholders** - `%card-title`, `%card-content`

### 🔧 What We Extend:

1. **New homepage components** in `src/components/home/`
2. **New SCSS files** for homepage-specific styles
3. **ServiceSection pattern** - reusable wrapper for all 3 services

### ❌ What We DON'T Reuse:

1. **`Hero.astro`** - Too simple, build new `HeroWithVariations`
2. **`OfferCard.astro`** - Different use case, create new `ProjectCard`

---

## STYLING APPROACH

### Hybrid Strategy (Keep Current Approach):

```scss
// Component-scoped SCSS
<style lang="scss">
  @use '../../styles/variables' as *;
  @use '../../styles/components/cards' as *;

  // Component styles
  .my-component {
    @include py-responsive('md'); // Use mixins
    @extend %card-title; // Use placeholders
    @apply text-white; // Use Tailwind utilities
  }
</style>
```

**Why this works:**
- ✅ Scoped styles (no conflicts)
- ✅ Reusable mixins/placeholders
- ✅ Tailwind for quick utilities
- ✅ SCSS for complex responsive logic

---

## RESPONSIVE STRATEGY

### Mobile-First + Existing Breakpoints:

```scss
// Use existing breakpoint system
.hero-headline {
  font-size: 3rem; // Desktop default

  @include tablet {
    font-size: 2.5rem;
  }

  @include mobile {
    font-size: 1.875rem;
  }
}
```

**Breakpoints (from `variables.scss`):**
- Mobile: `max-width: 480px`
- Tablet: `max-width: 770px`
- Medium: `max-width: 1000px`
- Large: `max-width: 1440px`

---

## WHAT DEVS NEED TO CONSIDER

### 1. **Component Composition Pattern:**

```astro
<!-- Parent component provides structure -->
<ServiceSection>
  <!-- Children provide content -->
  <div slot="content">...</div>
  <FeaturedProjects slot="projects" />
  <Button slot="cta" />
</ServiceSection>
```

**Why:** Keeps components focused, easy to test, reusable

---

### 2. **Props Interface Pattern:**

```typescript
interface Props {
  title: string         // Required
  description?: string  // Optional
  variant?: 'A' | 'B'  // Typed variants
}
```

**Why:** Type safety, IntelliSense, prevents bugs

---

### 3. **Styling Scope:**

```astro
<div class="my-component">...</div>

<style lang="scss">
  // ✅ GOOD: Scoped to component
  .my-component {
    color: white;
  }

  // ❌ BAD: Global styles leak
  h1 {
    color: white;
  }
</style>
```

---

### 4. **Image Optimization:**

```astro
<!-- Use width/height for CLS prevention -->
<img
  src="/images/photo.jpg"
  alt="Description"
  width="150"
  height="150"
  loading="lazy"  // Lazy load below fold
/>
```

---

### 5. **Accessibility:**

```astro
<!-- Semantic HTML -->
<section aria-labelledby="service-heading">
  <h2 id="service-heading">Service Name</h2>
</section>

<!-- Keyboard navigation -->
<a href="/link" class="card-link">
  <span class="sr-only">Read more about Project Name</span>
</a>
```

---

### 6. **Performance:**

- ✅ Use `loading="lazy"` for images below fold
- ✅ Minimize JS (Astro ships 0 JS by default)
- ✅ Use CSS for interactions (`:hover`, transitions)
- ❌ Avoid heavy client-side frameworks unless needed

---

### 7. **Testing A/B Variants:**

```
# URL-based variant switching
https://zentala.agency/?hero=A
https://zentala.agency/?hero=B
https://zentala.agency/?hero=C
```

**Implementation:**
```astro
const variant = Astro.url.searchParams.get('hero') || 'A'
<HeroWithVariations variant={variant} />
```

---

## IMPLEMENTATION STEPS FOR DEVS

### Phase 1: Setup (30 min)
1. Create `src/components/home/` folder
2. Create `src/styles/components/_home.scss`
3. Import new SCSS in `global.scss`

### Phase 2: Hero Variants (2-3 hours)
1. Build `HeroWithVariations.astro` container
2. Build `HeroVariantA.astro` (primary)
3. Copy/adapt for B, C, D, E variants
4. Test all variants with URL params

### Phase 3: Service Sections (4-6 hours)
1. Build `ServiceSection.astro` wrapper (1h)
2. Build `ProjectCard.astro` + `FeaturedProjects.astro` (1h)
3. Build `ServiceIoT.astro` with content (1.5h)
4. Build `ServiceBackstage.astro` (1h)
5. Build `ServiceRapidDev.astro` (1h)

### Phase 4: Supporting Sections (3-4 hours)
1. Build `WhyWorkWithMe.astro` + `CapabilityBlock.astro` (1.5h)
2. Build `EngagementModels.astro` + `EngagementCard.astro` (1.5h)
3. Build `CTASection.astro` (30min)

### Phase 5: Homepage Orchestration (1 hour)
1. Build new `src/pages/index.astro`
2. Compose all sections
3. Test responsive behavior
4. Check accessibility

### Phase 6: Polish & Test (2-3 hours)
1. Responsive testing (mobile, tablet, desktop)
2. Cross-browser testing
3. Image optimization
4. Performance audit
5. Accessibility audit

**Total: ~15-20 hours** for mid-level dev

---

## QUESTIONS TO CONSIDER

### Technical:
1. **Image formats** - Use WebP with JPG fallback?
2. **Lazy loading** - Below fold only or all images?
3. **Analytics** - Track which hero variant performs best?
4. **Animation** - Fade-in on scroll? Keep minimal or add motion?

### Content:
5. **Professional photo** - Do we have it? Size/format?
6. **Project images** - All exist in `/public/images/portfolio/`?
7. **Company logos** - BSH, Samsung, Ubudu - show or text only?

### UX:
8. **Hero variant switching** - Dev-only or show to users?
9. **Sticky header** - Keep current behavior?
10. **Scroll anchors** - Jump to services from menu?

### SEO:
11. **Meta descriptions** - Per variant or single?
12. **Structured data** - Add Schema.org Person/Organization?
13. **OG images** - Different per hero variant?

---

## FOLLOW-UP TASKS (Future Enhancements)

### Phase 2 Features (After Launch):

1. **Interactive Hero Comparison**
   - Side-by-side view of all 5 variants
   - User feedback form: "Which resonates more?"
   - Analytics tracking

2. **Service Page Expansion**
   - Dedicated `/services/iot-engineering/` page
   - Detailed case studies
   - Process diagrams

3. **Portfolio Integration**
   - Filter portfolio by service type
   - Richer project detail pages
   - Before/after showcases

4. **Testimonials Section**
   - Client quotes
   - LinkedIn recommendations
   - Company logos

5. **Blog Integration**
   - Recent posts on homepage
   - Link to DevStage.io blog
   - Technical writing showcase

6. **Contact Form Enhancement**
   - Multi-step wizard
   - Service selection
   - Project scope questions

7. **Animation & Polish**
   - Scroll-triggered fade-ins
   - Parallax effects (subtle)
   - Hover microinteractions

8. **Performance Optimization**
   - Image CDN
   - Critical CSS inlining
   - Font optimization

9. **A/B Testing Framework**
   - Analytics integration
   - Conversion tracking
   - Variant performance dashboard

10. **Localization**
    - Polish version
    - Language switcher
    - Localized portfolio items

---

## SUMMARY

### ✅ Key Decisions Made:

1. **Reuse existing design system** (SCSS mixins, grid system, containers)
2. **Create modular components** in `src/components/home/`
3. **Hybrid styling** (Tailwind + SCSS + component-scoped)
4. **Composition pattern** (ServiceSection with slots)
5. **A/B test hero variants** via URL params
6. **Mobile-first responsive** using existing breakpoints

### ✅ What Makes This Maintainable:

- **Single Responsibility** - Each component does one thing
- **Reusable Primitives** - CardContainer, Button, grids
- **Consistent Patterns** - All services use same structure
- **Type Safety** - Props interfaces for all components
- **Scoped Styles** - No style conflicts

### ✅ What Makes This Performant:

- **Zero JS** - Pure HTML/CSS (Astro default)
- **Lazy loading** - Images below fold
- **Responsive images** - Proper sizing
- **CSS-only interactions** - No framework overhead

### ✅ What Makes This Scalable:

- **Component library** - Reuse for other pages
- **Design tokens** - SCSS variables
- **Grid system** - Easy layouts
- **Slot pattern** - Flexible composition

---

## NEXT STEPS

**Ready to code? Start here:**

1. Review this architecture doc
2. Ask questions about unclear parts
3. Begin with Phase 1 (Setup)
4. Build HeroVariantA first
5. Test, iterate, expand

**Questions for you (Paweł):**

1. Do we have professional photo ready? (Size/format?)
2. Any specific animations/interactions you want?
3. Priority order for hero variants? (A first, then B, etc.?)
4. Launch timeline? (When do devs need to deliver?)
