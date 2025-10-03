# Homepage Follow-Up Tasks (Post-Launch Enhancements)

## Phase 2: Performance & Analytics (Priority: High)

### WebP Image Optimization
**Goal:** Reduce image file sizes by 30-50% without quality loss

**Tasks:**
- [ ] Set up automated WebP conversion pipeline
- [ ] Implement `<picture>` element with WebP + fallback
- [ ] Test WebP support detection
- [ ] Measure load time improvements

**Example implementation:**
```astro
<picture>
  <source srcset="/images/project.webp" type="image/webp" />
  <source srcset="/images/project.jpg" type="image/jpeg" />
  <img src="/images/project.jpg" alt="Project" />
</picture>
```

---

### Analytics for Hero Variant Tracking
**Goal:** Determine which hero variant converts best

**Tasks:**
- [ ] Add analytics tracking (Google Analytics or Plausible)
- [ ] Track hero variant view events
- [ ] Track CTA click rates per variant
- [ ] Set up conversion funnel
- [ ] Create dashboard for variant performance

**Metrics to track:**
- Variant impressions
- CTA clicks per variant
- Time on page per variant
- Scroll depth per variant
- Conversion rate (contact form, Cal.com bookings)

---

### Font Loading Optimization
**Goal:** Prevent FOUT (Flash of Unstyled Text) and improve LCP

**Tasks:**
- [ ] Analyze current font loading strategy
- [ ] Implement font preloading for critical fonts
- [ ] Use `font-display: swap` or `optional`
- [ ] Consider system font stack as fallback
- [ ] Test perceived performance

**Example:**
```html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

---

### Bundle Size Analysis
**Goal:** Minimize JavaScript and CSS payload

**Tasks:**
- [ ] Run Astro build analyzer
- [ ] Identify large dependencies
- [ ] Code-split non-critical components
- [ ] Lazy load below-fold components
- [ ] Measure improvement

---

## Phase 3: UX Enhancements (Priority: Medium)

### Scroll-Triggered Animations
**Goal:** Enhance visual engagement with subtle animations

**Tasks:**
- [ ] Install Intersection Observer library (or use native)
- [ ] Add fade-in on scroll for sections
- [ ] Add stagger animations for card grids
- [ ] Parallax effect on hero (subtle)
- [ ] Ensure animations respect `prefers-reduced-motion`

**Libraries to consider:**
- AOS (Animate On Scroll)
- Framer Motion (if adding React components)
- CSS-only approach with Intersection Observer

---

### Interactive Hero Variant Comparison Tool
**Goal:** Let users compare all variants side-by-side

**Tasks:**
- [ ] Create comparison page (`/hero-comparison/`)
- [ ] Display all 5 variants in scrollable layout
- [ ] Add user feedback form: "Which resonates more?"
- [ ] Collect anonymous feedback data
- [ ] Analyze results to choose final variant

**Layout ideas:**
- Tab interface switching between variants
- Split-screen side-by-side (2 at a time)
- Vertical scroll with all variants stacked

---

### Testimonials Section
**Goal:** Build social proof with client quotes

**Tasks:**
- [ ] Collect testimonials from clients
- [ ] Pull LinkedIn recommendations
- [ ] Design testimonial card component
- [ ] Add section to homepage (after "Why Work With Me")
- [ ] Optional: Add company logos of clients

**Content needed:**
- Client name, role, company
- Quote (2-3 sentences)
- Optional: Photo or company logo

---

### Video Backgrounds or Demo Videos
**Goal:** Show work in action (optional, bandwidth-heavy)

**Tasks:**
- [ ] Identify projects suitable for video showcase
- [ ] Record screen captures or product demos
- [ ] Compress and optimize videos
- [ ] Implement lazy loading for videos
- [ ] Add as background or in project cards

---

## Phase 4: SEO & Discoverability (Priority: High)

### Schema.org Structured Data (Site-Wide)
**Goal:** Help search engines understand content

**Tasks:**
- [ ] Add Person schema for Paweł Żentała
- [ ] Add Organization schema for agency
- [ ] Add Project/CreativeWork schema for portfolio items
- [ ] Add BreadcrumbList for navigation
- [ ] Validate with Google Rich Results Test

**Example (Person schema):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Paweł Żentała",
  "jobTitle": "Hands-On CTO",
  "url": "https://zentala.agency",
  "sameAs": [
    "https://linkedin.com/in/zentala",
    "https://github.com/zentala"
  ]
}
```

---

### OpenGraph Images
**Goal:** Better social media sharing previews

**Tasks:**
- [ ] Design OG image template (1200x630px)
- [ ] Generate variant-specific OG images (optional)
- [ ] Add OG meta tags to Layout component
- [ ] Test with Facebook Debugger and Twitter Card Validator

---

### Sitemap Generation
**Goal:** Help search engines discover all pages

**Tasks:**
- [ ] Enable Astro sitemap integration
- [ ] Configure sitemap.xml generation
- [ ] Submit to Google Search Console
- [ ] Monitor indexing status

**Astro config:**
```js
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://zentala.agency',
  integrations: [sitemap()]
})
```

---

### robots.txt Optimization
**Goal:** Control crawler behavior

**Tasks:**
- [ ] Create `/public/robots.txt`
- [ ] Allow all relevant pages
- [ ] Block admin/dev URLs if any
- [ ] Link to sitemap

**Example:**
```
User-agent: *
Allow: /
Sitemap: https://zentala.agency/sitemap.xml
```

---

## Phase 5: Content Expansion (Priority: Medium)

### Dedicated Service Detail Pages
**Goal:** Deep-dive into each service offering

**Tasks:**
- [ ] Create `/services/iot-engineering/`
- [ ] Create `/services/backstage/`
- [ ] Create `/services/rapid-prototyping/`
- [ ] Detailed process diagrams
- [ ] FAQ per service
- [ ] Pricing details (if applicable)

---

### Case Study Detail Pages
**Goal:** Showcase projects with before/after, metrics, results

**Tasks:**
- [ ] Select 3-5 flagship projects for case studies
- [ ] Write detailed case studies (problem, solution, results)
- [ ] Add metrics (e.g., "50% faster deployment")
- [ ] Before/after screenshots or metrics
- [ ] Client quotes (if available)

---

### Blog Integration
**Goal:** Show recent writing and expertise

**Tasks:**
- [ ] Link to DevStage.io blog for Backstage content
- [ ] Add "Recent Posts" section on homepage
- [ ] Create RSS feed
- [ ] Cross-link blog posts with relevant services

---

### Portfolio Filtering
**Goal:** Let visitors explore projects by type/tech

**Tasks:**
- [ ] Add filter UI to portfolio page
- [ ] Filter by: IoT, Web, DevEx, Robotics
- [ ] Filter by tech: TypeScript, Python, ROS, etc.
- [ ] Preserve filters in URL (e.g., `/portfolio?tech=iot`)

---

## Phase 6: Conversion Optimization (Priority: High)

### A/B Testing Framework
**Goal:** Systematically improve conversion rates

**Tasks:**
- [ ] Choose A/B testing tool (Google Optimize, VWO, or custom)
- [ ] Set up conversion tracking
- [ ] Test hero variants with real traffic
- [ ] Test CTA button text variations
- [ ] Test service section order
- [ ] Analyze results and iterate

---

### Contact Form with Multi-Step Wizard
**Goal:** Qualify leads with contextual questions

**Tasks:**
- [ ] Design 3-step wizard (Service → Details → Contact)
- [ ] Integrate with `forms.zentala.io` API
- [ ] Add validation and error handling
- [ ] Confirmation page with next steps
- [ ] Email notifications

**Wizard flow:**
1. Select service (IoT, Backstage, Rapid Dev, Consulting)
2. Project details (budget range, timeline, description)
3. Contact info (name, email, company)

---

### Lead Magnet
**Goal:** Capture emails with valuable downloadable resources

**Ideas:**
- "IoT Product Development Checklist" (PDF)
- "Backstage Implementation Guide" (whitepaper)
- "Rapid Prototyping Best Practices" (ebook)

**Tasks:**
- [ ] Create downloadable resource
- [ ] Design landing page
- [ ] Email capture form
- [ ] Automated delivery via email
- [ ] Add to email sequence

---

### Exit-Intent Popup or Slide-In CTA
**Goal:** Capture leaving visitors

**Tasks:**
- [ ] Design subtle exit-intent modal
- [ ] Offer: Newsletter, consultation, download
- [ ] Implement with low annoyance factor
- [ ] Respect "close" action (don't show again)
- [ ] A/B test messaging

---

## Phase 7: Localization (Priority: Low)

### Polish Version
**Goal:** Serve Polish market with native language

**Tasks:**
- [ ] Translate all content to Polish
- [ ] Choose URL structure (`pl.zentala.agency` or `/pl/`)
- [ ] Implement language switcher component
- [ ] Handle portfolio items (some may stay English)
- [ ] Update sitemap with `hreflang` tags

---

## Phase 8: Advanced Features (Priority: Low)

### Dark/Light Theme Toggle
**Reference:** `LIGHT_THEME_IMPLEMENTATION_PLAN.md`

**Tasks:**
- [ ] Design light theme color palette
- [ ] Implement theme switcher component
- [ ] Persist preference in localStorage
- [ ] Respect `prefers-color-scheme`
- [ ] Test all components in both themes

---

### Image Pipeline Automation
**Goal:** Automate image processing on upload

**Tasks:**
- [ ] Set up image processing service (Cloudinary, Imgix, or custom)
- [ ] Auto-convert to WebP
- [ ] Generate responsive sizes (srcset)
- [ ] Lazy loading with blur-up technique
- [ ] CDN integration

---

### Service Worker for Offline Support
**Goal:** PWA capabilities

**Tasks:**
- [ ] Create service worker
- [ ] Cache static assets
- [ ] Offline fallback page
- [ ] Add to homescreen prompt (mobile)
- [ ] Test offline behavior

---

## Prioritization Matrix

| Task | Impact | Effort | Priority | When |
|------|--------|--------|----------|------|
| Analytics tracking | High | Low | 🔴 High | Week 1 |
| Schema.org | High | Low | 🔴 High | Week 1 |
| Sitemap | High | Low | 🔴 High | Week 1 |
| WebP images | High | Medium | 🔴 High | Week 2 |
| A/B testing | High | High | 🔴 High | Week 3-4 |
| Testimonials | Medium | Medium | 🟡 Medium | Month 2 |
| Service detail pages | Medium | High | 🟡 Medium | Month 2 |
| Scroll animations | Low | Low | 🟢 Low | Month 3 |
| Polish version | Medium | Very High | 🟢 Low | Month 4+ |
| PWA/Offline | Low | High | 🟢 Low | Future |

---

## Tracking Progress

Create issues/tickets for each task:
- Label with priority (High, Medium, Low)
- Assign to sprints/milestones
- Track completion in project board

**Recommended approach:**
- Week 1 post-launch: High priority SEO & analytics
- Month 1: Performance optimization
- Month 2: Content expansion & conversion optimization
- Month 3+: UX enhancements & advanced features
