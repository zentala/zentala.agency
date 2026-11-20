# Page recipes

Code copied from current files. Procedure and rules: [SKILL.md](SKILL.md). Numbers and props: [DESIGN.md](../../../DESIGN.md) sections 3 and 4.

## New page: header plus a card grid

From `src/pages/portfolio.astro`. Each `PortfolioItem` wraps a `CardContainer`, so it is a grid cell.

```astro
---
import Layout from '../layouts/Layout.astro'
import Hero from '../components/Hero.astro'
import PortfolioItem from '../components/cards/PortfolioItem.astro'

const heroProps = { title: 'Portfolio', subtitle: 'Best examples of my works' }
---

<Layout title="Portfolio" description="...">
  <Hero {...heroProps} />
  <section class="section-full">
    <div class="container-bordered">
      <div class="cards-grid">
        {elements.map((element, index) => <PortfolioItem key={`portfolio-${index}`} {...element} />)}
      </div>
    </div>
  </section>
</Layout>
```

`src/pages/about/capabilities.astro` has the same shape with `OfferCard`. A route needs no registration for the guard: it is found in `dist/`.

## Page with header and grid sections

From `src/pages/offer/harness-engineering.astro` (the `Section` primitive is `section-grid` plus `container-bordered`; `SectionHeader` owns the line under the header).

```astro
<Section id="what-i-do">
  <SectionHeader
    eyebrow="What the engagement looks like"
    icon="handshake"
    headline="Inside the engagement"
    subhead="..."
  />
  <SectionGrid columns={3}>
    {items.map((item) => (
      <SectionContent context="grid" prose={false}>
        <CardBackgroundIcon icon={item.icon} />
        ...
      </SectionContent>
    ))}
  </SectionGrid>
</Section>

<Section id="who-i-am">
  <SectionHeader headline="..." subhead="..." />
  <SectionContent context="full"><p>...</p></SectionContent>
</Section>
```

Imports: `Section`, `SectionHeader`, `SectionGrid` from `src/components/primitives/sections/`, `CardBackgroundIcon` from `src/components/primitives/`. `SectionContent` is a transparent prose block; `.content-grid__text` is the lighter alternative for static cells. Icon names are short Phosphor Light names (`handshake`, `compass`); an unknown name fails the build.

## Prose cell in a grid

A static text cell uses `.content-grid__text` (padding and vertical centring from `_grids.scss`). Unstyled text is not white by default, so set the colours:

```astro
<div class="content-grid content-grid--halves">
  <div class="content-grid__text">
    <h2 class="text-3xl font-light text-fg">Strategy</h2>
    <p class="mt-4 text-lg text-fg-secondary">Find where new technology pays off.</p>
  </div>
  <div class="content-grid__text prose prose-blog max-w-none">...</div>
</div>
```

## New section

1. Prose or equal cards: `Section` + `SectionHeader` + `SectionGrid columns={2..5}` (above).
2. Cells in a custom shape: `<div class="line-grid" style="--cols-wide: 4">` inside `container-bordered`. Set `--cols-wide`, `--cols-medium`, `--cols-narrow` on the element; never write a media query for columns.
3. Custom proportions: `--grid-columns: 1.67fr 1fr` (replaces the whole template). The blog post body uses a three-column static grid, from `src/pages/blog/[postSlug].astro`:

```css
.blog-post-grid { --cols-wide: 1; --cols-medium: 1; --cols-narrow: 1; }
@media (min-width: 1280px) {
  .blog-post-grid { --grid-columns: minmax(15rem, 1fr) minmax(0, 54rem) minmax(18rem, 1fr); }
}
```

4. A listing whose count varies: add `line-grid--fill-last` to the wrapper (from `src/pages/blog/index.astro`):

```astro
<section class="section-full">
  <div class="container-bordered">
    <div class="cards-grid line-grid--fill-last">
      {feed.map((entry) => <PostCard ... />)}
    </div>
  </div>
</section>
```

5. Standalone block after a grid: `SectionCTA`, `SectionBlockQuote` or a banner. They carry `line-block` themselves. A banner needs a `container-bordered` parent (from the post page):

```astro
{Banner && (
  <section class="section-full">
    <div class="container-bordered"><Banner /></div>
  </section>
)}
```

```astro
<SectionCTA href="https://example.com" text="Visit the site" icon="external-link" variant="primary" bgText="Visit" />
```

`variant` is `primary`, `secondary`, `accent` or `ghost`; none is a solid fill. `bgText` is normal case (`Visit`, not `VISIT`).

## Buttons, arrows, icons, tags

From `src/pages/contact.astro` (a `Button` inside a `CardContainer` cell). No solid button exists; use `primary` for the main action and `secondary` for the rest:

```astro
<Button href="http://cal.com/zentala" text="Book a Call" target="_blank" variant="primary" icon="calendar" />
<Button href="/portfolio" text="See the work" variant="ghost" />
```

Every arrow is the same chevron. Put it inside the link, button or `.group` so it moves on hover (a text arrow or a shaft icon is a defect):

```astro
<a href="/blog" class="group">All posts <SiteIcon name="caret-right" size="sm" class="arrow-nudge" /></a>
```

Icons: `<SiteIcon name="calendar" size="lg" />` (sizes `sm` 16, `md` 20, `lg` 24) and `<TechIcon name="astro" />` for a logo. Tags: `<TagGroup tags={['UWB', 'BLE']} tech />` shows a logo where `src/data/tech-icons.ts` has one; a single chip is `<Tag text="astro" />`.

## Form

A form is a `.line-grid` of field cells (from `src/components/ContactForm.astro`). The label is the `placeholder` prop, shown inside the cell:

```astro
<form class="line-grid contact-form" action="..." method="post">
  <ThemedInput type="text" id="fName" placeholder="First name" icon="user" required />
  <ThemedInput type="email" id="email" placeholder="Email" icon="envelope-simple" required />
  <ThemedTextarea id="msg" placeholder="Your message" icon="chat-circle" />
  <button type="submit" class="contact-form__submit">...</button>
</form>
```

Put the form in `<Section id="write"><SectionHeader ... /><ContactForm /></Section>`, as `/contact` does.

## New card component

A card is a grid cell. Root it on `CardContainer` (`src/components/cards/CardContainer.astro`; props `href`, `hasHover`, `backgroundIcon`, `class`, `target`). It draws no line and clips inside an inner wrapper. The real `OfferCard` also takes a required `number` string; the sketch below is shortened.

```astro
---
import CardContainer from './CardContainer.astro'
import CardBackgroundIcon from '../primitives/CardBackgroundIcon.astro'

const { title, description, icon, href } = Astro.props
---

<CardContainer href={href} class="offer-card">
  <CardBackgroundIcon icon={icon} />
  <h3 class="offer-card__title">{title}</h3>
  <p class="offer-card__description">{description}</p>
</CardContainer>
```

Based on `src/components/cards/OfferCard.astro`. With `href` the cell is an `<a>` and gets the hover and focus overlay; without it the cell is static.

What never goes in the card styles: `border`, `overflow: hidden`, fixed `aspect-ratio`, opaque `background`, `margin` or `transform` or `z-index` for hover. Height comes from `min-height`; a tall card uses `grid-row: span N` on the cell.

A custom interactive cell that is not an `<a>` opts in with the mixin:

```scss
@use '../../styles/variables' as *;

.my-cell { @include cell-interactive; }
```

Clipping lives on an inner element, as `CardContainer` does:

```scss
.card-container__clip { position: relative; flex: 1; overflow: clip; isolation: isolate; }
```

## Responsive spacing

```html
<div class="py-responsive-md">   <!-- 16 to 64px -->
<div class="px-responsive">      <!-- horizontal: 64 to 16px; -lg and -xl variants exist -->
<div class="py-responsive-lg">   <!-- heroes: 24 to 96px -->
```

## New component: gallery entry

Add the component to the gallery at `/demo` in the same change. A manifest row, in `src/components/demo/groups/<group>.ts`:

```ts
{
  id: 'offer-card',
  name: 'OfferCard',
  path: 'cards/OfferCard.astro',
  purpose: 'Numbered offer tile with a background icon.',
  props: 'number, title, description, icon, href',
}
```

And the entry with one example per variant, in the matching `src/components/demo/Gallery*.astro` (cards go straight into the grid, they are cells):

```astro
<GalleryEntry id="offer-card" cols={2}>
  <OfferCard number="01" title="Harness engineering" description="..." icon="bot" href="/offer/harness-engineering" />
  <OfferCard number="02" title="Backstage rollout" description="..." icon="layout-grid" />
</GalleryEntry>
```

Other contents use `<GalleryCell label="variant">`. Standalone blocks use `<GalleryEntry bare>`. Import the component as `@/components/<path>.astro`: the guard `tests/unit/component-gallery.test.ts` matches that string.

## Checking a page the guard cannot see

Dev-only routes, mockups and drafts are not built into `dist/`. Run the dev server (PM3), then:

```bash
MSYS_NO_PATHCONV=1 node scripts/visual-check.mjs http://127.0.0.1:4300/mockups/<name>
MSYS_NO_PATHCONV=1 node scripts/visual-check.mjs http://127.0.0.1:4300/blog/<draft-slug> 1920 1280 390
```

Default widths are 1920, 1450, 1280, 1024, 768 and 390. It prints doubled, edge, floating and horizontal-scroll findings per width and exits 1 on any. It needs Node 22.6 or newer (`.nvmrc` says 18). Then look at the screenshots and judge them against DESIGN.md "Principles": subtle, no warm colour, no large blue, nothing heavy. Links handed to the owner use `http://zentala.internal`. Against a preview use `http://localhost:<port>`: `astro preview` binds `[::1]`.
