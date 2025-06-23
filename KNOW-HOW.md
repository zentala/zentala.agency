# Know-How

How to develop this website.
List of usefull links and technologies to use.

## Astro

- [Astro](https://astro.build/) - web framework for content-first, client-side web apps
- https://github.com/natemoo-re/astro-icon#readme
  - https://iconify.design/
  - https://github.com/astro-community/icons#readme
- https://github.com/RafidMuhymin/astro-imagetools#readme
- https://docs.astro.build/en/guides/integrations-guide/sitemap/
- https://github.com/jonasmerlin/astro-seo#readme
- https://astro-i18next.yassinedoghri.com/
- https://github.com/astro-community
-

## Tailwind

- [Tailwind CSS Framework](https://tailwindcss.com/)
- [Daisy UI Tailwind Plugin](https://daisyui.com/) - semantic classes

## Components

### Cards

To create consistent cards across the website, a set of base components and SCSS styles have been created.

#### `CardContainer.astro`

This is the main wrapper component for any card. It should be used as the root element for new card variations.

- **Location**: `src/components/cards/CardContainer.astro`
- **Purpose**: Provides a consistent container with responsive padding, background color, hover effects, and handling for links.
- **Usage**: Wrap your card content within this component. You can pass an `href` to make the entire card a clickable link.

```astro
---
import CardContainer from '~/components/cards/CardContainer.astro';
---
<CardContainer href="/your-link">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</CardContainer>
```

#### Shared SCSS Styles (`_cards.scss`)

A set of shared styles are available in `src/styles/components/_cards.scss` to ensure consistent typography for titles and content within cards.

**Placeholders for `@extend`:**

- `%card-title`: Base styles for titles (color, font-weight).
- `%card-title-medium`: Extends `%card-title` with `text-2xl` font size.
- `%card-title-large`: Extends `%card-title` with `text-3xl` font size.
- `%card-content`: Base styles for paragraph text and lists.

**Usage with `@extend`:**

```scss
// In your component's <style lang="scss">
@use '~/styles/components/cards' as *;

.my-card__title {
  @extend %card-title-medium;
}

.my-card__description {
  @extend %card-content;
}
```

**Wrapper Class:**

- `.card-content-wrapper`: A utility class that applies default styles to `h2`, `h3`, `p`, and `ul` elements inside it.
- `.card-content-wrapper--large-title`: A modifier to apply the large title style.

**Usage with wrapper class:**

```astro
<div class="card-content-wrapper">
  <h3>This title will be styled automatically</h3>
  <p>This paragraph will also be styled.</p>
</div>
```

#### `CardBackgroundIcon.astro`

A reusable component to display a large, decorative icon in the top-right corner of a card.

- **Location**: `src/components/primitives/CardBackgroundIcon.astro`
- **Usage**: Place this component inside a container that has `position: relative` (like `CardContainer`).

```astro
---
import CardContainer from '~/components/cards/CardContainer.astro';
import CardBackgroundIcon from '~/components/primitives/CardBackgroundIcon.astro';
---
<CardContainer>
  <CardBackgroundIcon icon="🎉" />
  ...
</CardContainer>
```

### Infile styles

whenver possible use

```astro
<style lang="postcss">
```

i dziedzciz style za pomocą `@apply` z tailwind i innych klas jakie mamy, bo chcemy miec max reuzywanlny kod
