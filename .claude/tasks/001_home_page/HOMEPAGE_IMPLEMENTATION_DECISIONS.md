# Homepage Implementation - Final Decisions & Ready to Code

## ✅ DECYZJE ZATWIERDZONE

### Assets & Content
- ✅ **Professional photo**: `https://cdn.zentala.io/images/avatar.jpg` (square, black bg, dark theme)
- ✅ **Portfolio images**: Create placeholder mocks initially, upload real images later (matching site colors)
- ✅ **Company logos**: Start with text, prepare for logo integration (BSH, Samsung/Cheil, Ubudu)

### Features - NOW
- ✅ **Hero variant switcher**: DEV ONLY (URL params like `?hero=A`)
- ✅ **Scroll anchors**: YES - to every section on homepage
- ✅ **Meta tags**: Single default meta (not per variant)
- ✅ **Hero state management**: Keep as simple as possible (URL-based, no complex state)

### Features - FOLLOW-UP TASKS (Later)
- 📋 WebP images optimization
- 📋 Analytics for variant tracking
- 📋 Scroll animations
- 📋 Schema.org structured data (site-wide)
- 📋 Font loading optimization
- 📋 Image pipeline automation

### Testing Strategy
- ✅ Use same approach as documented in `LIGHT_THEME_IMPLEMENTATION_PLAN.md`

### Technical Infrastructure
- ✅ **CI/CD**: Already in place
- ✅ **Contact form**: NOT on homepage (use `forms.zentala.io` API on Cloudflare Workers if needed elsewhere)
- ⛔ **CMS**: Not planned
- ⛔ **i18n**: Not now (English only)

---

## 🎯 SIMPLIFIED HERO SWITCHER IMPLEMENTATION

### Simple URL-Based Approach (No Complex State)

**File: `src/components/home/HeroWithVariations.astro`**

```astro
---
import HeroVariantA from './HeroVariantA.astro'
import HeroVariantB from './HeroVariantB.astro'
import HeroVariantC from './HeroVariantC.astro'
import HeroVariantD from './HeroVariantD.astro'
import HeroVariantE from './HeroVariantE.astro'

// Get variant from URL param (default: A)
const variant = Astro.url.searchParams.get('hero')?.toUpperCase() || 'A'

// Validate variant
const validVariants = ['A', 'B', 'C', 'D', 'E']
const activeVariant = validVariants.includes(variant) ? variant : 'A'
---

<section class="hero-section section-grid">
  <div class="container-bordered">

    <!-- Show single variant based on URL param -->
    {activeVariant === 'A' && <HeroVariantA />}
    {activeVariant === 'B' && <HeroVariantB />}
    {activeVariant === 'C' && <HeroVariantC />}
    {activeVariant === 'D' && <HeroVariantD />}
    {activeVariant === 'E' && <HeroVariantE />}

    <!-- DEV ONLY: Variant switcher (remove in production or hide with env var) -->
    {import.meta.env.DEV && (
      <div class="hero-switcher">
        <div class="hero-switcher__label">Dev Only - Hero Variant:</div>
        <div class="hero-switcher__buttons">
          <a href="/?hero=A" class:list={['hero-switcher__btn', { active: activeVariant === 'A' }]}>A</a>
          <a href="/?hero=B" class:list={['hero-switcher__btn', { active: activeVariant === 'B' }]}>B</a>
          <a href="/?hero=C" class:list={['hero-switcher__btn', { active: activeVariant === 'C' }]}>C</a>
          <a href="/?hero=D" class:list={['hero-switcher__btn', { active: activeVariant === 'D' }]}>D</a>
          <a href="/?hero=E" class:list={['hero-switcher__btn', { active: activeVariant === 'E' }]}>E</a>
        </div>
      </div>
    )}

  </div>
</section>

<style lang="scss">
  .hero-switcher {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid #374151;
    padding: 0.75rem;
    border-radius: 0.5rem;
    z-index: 9999;
  }

  .hero-switcher__label {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-bottom: 0.5rem;
  }

  .hero-switcher__buttons {
    display: flex;
    gap: 0.5rem;
  }

  .hero-switcher__btn {
    padding: 0.5rem 0.75rem;
    background: #1f2937;
    color: white;
    text-decoration: none;
    border: 1px solid #374151;
    transition: all 0.2s;
    font-size: 0.875rem;

    &:hover {
      background: #374151;
    }

    &.active {
      background: #3b82f6;
      border-color: #3b82f6;
    }
  }
</style>
```

**Usage:**
- Development: Switcher visible in bottom-right corner
- Production: Switcher hidden (only URL params work)
- URLs: `/?hero=A`, `/?hero=B`, `/?hero=C`, etc.

---

## 🔗 SCROLL ANCHORS IMPLEMENTATION

### Add IDs to All Sections

**File: `src/pages/index.astro`**

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

const variant = Astro.url.searchParams.get('hero') || 'A'
---

<Layout title="Home" description="...">

  <!-- Each section has unique ID for anchor linking -->
  <div id="hero">
    <HeroWithVariations variant={variant} />
  </div>

  <div id="iot-engineering">
    <ServiceIoT />
  </div>

  <div id="backstage">
    <ServiceBackstage />
  </div>

  <div id="rapid-prototyping">
    <ServiceRapidDev />
  </div>

  <div id="why-work-with-me">
    <WhyWorkWithMe />
  </div>

  <div id="engagement-models">
    <EngagementModels />
  </div>

  <div id="contact">
    <CTASection />
  </div>

</Layout>
```

### Update Header Navigation

**File: `src/components/Header.astro`** (update nav links)

```astro
<nav>
  <a href="/#hero">Home</a>
  <a href="/#iot-engineering">IoT Engineering</a>
  <a href="/#backstage">Backstage</a>
  <a href="/#rapid-prototyping">Rapid Prototyping</a>
  <a href="/#why-work-with-me">Why Me</a>
  <a href="/#contact">Contact</a>
</nav>
```

### Smooth Scroll Behavior

**File: `src/styles/global.scss`** (add if not exists)

```scss
html {
  scroll-behavior: smooth;
}

// Offset for fixed header (if applicable)
[id] {
  scroll-margin-top: 100px; // Adjust based on header height
}
```

---

## 🖼️ PLACEHOLDER IMAGES STRATEGY

### Create Consistent Mocks

**Approach:** Use placeholder service or simple colored backgrounds

**File: `src/components/home/ProjectCard.astro`** (update)

```astro
---
const { title, description, image, href } = Astro.props

// Fallback to placeholder if image not provided
const imageSrc = image || '/images/placeholders/project-placeholder.jpg'
---

<CardContainer href={href} target="_blank" class="project-card">

  <div class="project-card__image">
    <img
      src={imageSrc}
      alt={title}
      loading="lazy"
      width="800"
      height="450"
    />
  </div>

  <!-- Rest of component -->
</CardContainer>
```

### Create Placeholder Images

**Option 1: Generate programmatically**

Create `/public/images/placeholders/project-placeholder.jpg`:
- Size: 800x450px (16:9 aspect ratio)
- Color: Dark gray (#1f2937) with subtle gradient
- Optional: Add project title text overlay

**Option 2: Use placeholder service temporarily**

```astro
const imageSrc = image || `https://placehold.co/800x450/1f2937/9ca3af?text=${encodeURIComponent(title)}`
```

---

## 📸 PROFESSIONAL PHOTO INTEGRATION

### Use CDN URL Directly

**File: `src/components/home/HeroVariantA.astro` (all variants)**

```astro
---
// ... props
---

<div class="hero-variant hero-variant--a">

  <!-- Logo -->
  <div class="hero-variant__logo">
    <img src="/logo.ext.svg" alt="Żentała" />
  </div>

  <!-- Professional Photo from CDN -->
  <div class="hero-variant__photo">
    <img
      src="https://cdn.zentala.io/images/avatar.jpg"
      alt="Paweł Żentała"
      class="hero-variant__photo-img"
      width="150"
      height="150"
      loading="eager"
    />
  </div>

  <!-- Rest of content -->
</div>
```

**Note:** `loading="eager"` because hero image is above fold

---

## 🏢 COMPANY LOGOS STRATEGY

### Flexible Implementation

**File: `src/components/home/ServiceIoT.astro`**

```astro
---
const showLogos = false // Toggle: set to true when logos ready

const companies = [
  {
    name: 'Ubudu',
    logo: '/images/logos/ubudu.svg',
    description: 'French IoT startup - RTLS indoor location systems'
  },
  {
    name: 'BSH',
    logo: '/images/logos/bsh.svg',
    description: 'Bosch Siemens Hausgeräte - Smart home appliances firmware'
  },
  {
    name: 'Cheil Poland',
    logo: '/images/logos/cheil.svg',
    description: 'Samsung subsidiary - Socially-aware humanoid robot'
  }
]
---

<div class="service-content__block">
  <h3 class="service-content__block-title">Experience highlights:</h3>

  {showLogos ? (
    <!-- Logo version (when ready) -->
    <div class="company-logos">
      {companies.map(company => (
        <div class="company-logo">
          <img src={company.logo} alt={company.name} />
          <p>{company.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <!-- Text version (current) -->
    <ul class="service-content__list service-content__list--companies">
      {companies.map(company => (
        <li>
          <strong>{company.name}</strong> - {company.description}
        </li>
      ))}
    </ul>
  )}
</div>
```

**When logos ready:**
1. Add logo files to `/public/images/logos/`
2. Set `showLogos = true`
3. No component changes needed

---

## 📋 FOLLOW-UP TASKS DOCUMENTED

### Create Follow-Up Tasks File

**File: `HOMEPAGE_FOLLOW_UP_TASKS.md`**

```markdown
# Homepage Follow-Up Tasks (Post-Launch Enhancements)

## Phase 2: Performance & Analytics
- [ ] WebP image optimization with fallbacks
- [ ] Analytics integration for hero variant tracking
- [ ] Font loading optimization (FOUT/FOIT prevention)
- [ ] Bundle size analysis and optimization

## Phase 3: UX Enhancements
- [ ] Scroll-triggered animations (fade-in, parallax)
- [ ] Interactive hero variant comparison tool
- [ ] Testimonials section with client quotes
- [ ] Video backgrounds or demo videos

## Phase 4: SEO & Discoverability
- [ ] Schema.org structured data (Person, Organization, Project)
- [ ] OpenGraph images per page/variant
- [ ] Sitemap generation
- [ ] robots.txt optimization

## Phase 5: Content Expansion
- [ ] Dedicated service detail pages (/services/iot-engineering/)
- [ ] Case study detail pages with before/after
- [ ] Blog integration (recent posts on homepage)
- [ ] Portfolio filtering by technology/domain

## Phase 6: Conversion Optimization
- [ ] A/B testing framework with analytics
- [ ] Contact form with multi-step wizard
- [ ] Lead magnet (downloadable resources)
- [ ] Exit-intent popup or slide-in CTA

## Phase 7: Localization
- [ ] Polish version (pl.zentala.agency or /pl/)
- [ ] Language switcher component
- [ ] Localized content for portfolio items

## Phase 8: Advanced Features
- [ ] Dark/Light theme toggle (from LIGHT_THEME_IMPLEMENTATION_PLAN.md)
- [ ] Image pipeline automation (WebP conversion, sizing)
- [ ] Advanced image lazy loading (blur-up technique)
- [ ] Service worker for offline support
```

---

## 🚀 READY TO START - IMPLEMENTATION CHECKLIST

### Pre-Development
- [x] Architecture designed
- [x] Component structure planned
- [x] Styling strategy decided
- [x] Assets identified (photo URL, placeholder strategy)
- [x] Features prioritized (now vs. follow-up)

### Phase 1: Foundation (Now)
- [ ] Create `src/components/home/` folder structure
- [ ] Set up placeholder images in `/public/images/placeholders/`
- [ ] Create `_home.scss` and `_hero-variations.scss`
- [ ] Update `global.scss` with smooth scroll behavior

### Phase 2: Hero Variants
- [ ] Build `HeroWithVariations.astro` with URL-based switcher
- [ ] Build `HeroVariantA.astro` with CDN photo
- [ ] Copy to variants B, C, D, E (change only copy)
- [ ] Test switcher in dev mode
- [ ] Verify responsive behavior

### Phase 3: Service Sections
- [ ] Build `ServiceSection.astro` wrapper component
- [ ] Build `ProjectCard.astro` with placeholder support
- [ ] Build `FeaturedProjects.astro` grid
- [ ] Build `ServiceIoT.astro` with placeholder projects
- [ ] Build `ServiceBackstage.astro`
- [ ] Build `ServiceRapidDev.astro`

### Phase 4: Supporting Sections
- [ ] Build `WhyWorkWithMe.astro`
- [ ] Build `CapabilityBlock.astro`
- [ ] Build `EngagementModels.astro`
- [ ] Build `EngagementCard.astro`
- [ ] Build `CTASection.astro`

### Phase 5: Homepage Integration
- [ ] Update `src/pages/index.astro` with all sections
- [ ] Add scroll anchor IDs to all sections
- [ ] Update Header navigation with anchor links
- [ ] Test scroll behavior and offsets

### Phase 6: Testing & Polish
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Accessibility audit (ARIA, semantic HTML, keyboard nav)
- [ ] Performance check (Lighthouse)
- [ ] Fix any visual bugs or alignment issues

### Phase 7: Deployment Prep
- [ ] Remove or hide dev-only hero switcher for production
- [ ] Optimize images (compress placeholders)
- [ ] Check all links work (internal and external)
- [ ] Meta tags review
- [ ] Final QA pass

---

## 📝 DEVELOPER NOTES

### Quick Start Commands

```bash
# Start dev server
npm run dev

# Access with hero variants
http://localhost:4321/?hero=A
http://localhost:4321/?hero=B
# etc.

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing Checklist Per Component

For each new component:
1. ✅ Props interface defined (TypeScript)
2. ✅ Responsive at all breakpoints
3. ✅ Accessible (ARIA, semantic HTML)
4. ✅ Works with and without optional props
5. ✅ Styles scoped (no global leaks)
6. ✅ Images have width/height/alt
7. ✅ Loading states considered

### File Naming Convention

- **Components**: PascalCase (e.g., `HeroVariantA.astro`)
- **SCSS files**: kebab-case with underscore prefix (e.g., `_hero-variations.scss`)
- **Pages**: kebab-case (e.g., `index.astro`)

### Import Order Convention

```astro
---
// 1. Layout imports
import Layout from '../layouts/Layout.astro'

// 2. Component imports (alphabetical)
import Button from '../components/Button.astro'
import Hero from '../components/home/HeroVariantA.astro'

// 3. Type imports
import type { Props } from './types'

// 4. Props destructuring
const { title, description } = Astro.props

// 5. Data/logic
const items = [...]
---
```

---

## 🎯 SUCCESS CRITERIA

### Minimum Viable Homepage (MVP)
- ✅ All 5 hero variants working with switcher
- ✅ All 3 service sections with content
- ✅ Featured projects display (even with placeholders)
- ✅ Why Work With Me section
- ✅ Engagement Models section
- ✅ CTA section with working buttons
- ✅ Scroll anchors to all sections
- ✅ Mobile responsive
- ✅ Accessible (passes basic a11y audit)

### Definition of Done
- Code passes linting (`npm run lint`)
- No console errors or warnings
- Works in Chrome, Firefox, Safari
- Mobile responsive (tested at 375px, 768px, 1024px, 1440px)
- Images optimized and loading properly
- All links functional
- Performance score >90 (Lighthouse)
- Accessibility score >90 (Lighthouse)

---

## ❓ QUESTIONS RESOLVED

| Question | Answer |
|----------|--------|
| Professional photo? | ✅ `https://cdn.zentala.io/images/avatar.jpg` |
| Portfolio images? | ✅ Placeholders first, real images later |
| Company logos? | ✅ Text first, logos ready for later |
| Hero switcher? | ✅ Dev only (URL-based, simple) |
| Scroll anchors? | ✅ Yes, to all sections |
| Meta per variant? | ✅ No, single default meta |
| Schema.org? | 📋 Follow-up task |
| WebP images? | 📋 Follow-up task |
| Analytics tracking? | 📋 Follow-up task |
| Scroll animations? | 📋 Follow-up task |
| Contact form? | ⛔ Not on homepage |
| CMS? | ⛔ Not planned |
| i18n? | 📋 Follow-up task |

---

## 🎬 FINAL WORDS

**Ready to code!** 🚀

All decisions made, architecture clear, components planned. Mid-level devs have:
- Clear file structure
- Code examples for each component
- Styling patterns to follow
- Testing checklist
- Success criteria

**Estimated time:** 15-20 hours for complete implementation.

**Next action:** Create `src/components/home/` folder and start with `HeroVariantA.astro`.
