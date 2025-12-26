# Banner Component System

Unified banner system with reusable variants and per-banner content files.

## Structure

```
src/
├── components/banners/
│   ├── Banner.astro          # Main component (wrapper)
│   ├── types.ts              # TypeScript interfaces
│   ├── variants/
│   │   └── Simple.astro      # Simple banner variant template
│   └── README.md            # This file
└── banners/
    ├── devex.astro           # DevEx banner (content + design)
    ├── devex-category.astro  # DevEx category banner
    └── ai-automation.astro   # AI Automation banner
```

## Usage

### Option 1: Using existing banner files (recommended)

Each banner in `src/banners/` is a self-contained `.astro` file with its own content and can have custom design:

```astro
---
// src/banners/devex.astro
import Banner from '../components/banners/Banner.astro'
---

<Banner
  variant="simple"
  title="Want to enhance your Developer Experience?"
  description="Let me help you design and execute your DevEx strategy through Backstage implementation."
  linkText="Learn more →"
  linkHref="/offer/backstage-developer-experience"
/>
```

You can also add custom styles directly in the banner file if needed:

```astro
---
import Banner from '../components/banners/Banner.astro'
---

<Banner
  variant="simple"
  title="Custom Banner"
  description="With custom styling"
  linkText="Learn more →"
  linkHref="/link"
  class="my-custom-banner"
/>

<style>
  .my-custom-banner {
    /* Your custom styles here */
  }
</style>
```

### Option 2: Direct usage in pages

```astro
---
import Banner from '../components/banners/Banner.astro'
---

<Banner
  variant="simple"
  title="Your Title"
  description="Your description text"
  linkText="Learn more →"
  linkHref="/your-link"
/>
```

## Creating New Banners

Create a new `.astro` file in `src/banners/`:

```astro
---
// src/banners/your-banner.astro
import Banner from '../components/banners/Banner.astro'
---

<Banner
  variant="simple"
  title="Your Title"
  description="Your description"
  linkText="Learn more →"
  linkHref="/your-link"
/>

<!-- Optional: Add custom styles, images, or other assets -->
<style>
  /* Custom banner-specific styles */
</style>
```

Then use it in your content by referencing the filename (without `.astro`):

```yaml
# In your blog post frontmatter
bannerEnd: 'your-banner'
```

## Creating New Variants

1. Create new variant file in `variants/`:
   ```astro
   <!-- src/components/banners/variants/SimpleWithImage.astro -->
   ---
   interface Props {
     title: string
     description: string
     linkText: string
     linkHref: string
     image: string
     class?: string
   }
   const { title, description, linkText, linkHref, image, class: className } = Astro.props
   ---
   
   <a href={linkHref} class={`banner banner-with-image ${className}`}>
     <img src={image} alt={title} />
     <h3>{title}</h3>
     <p>{description}</p>
     <span class="banner-link">{linkText}</span>
   </a>
   
   <style lang="scss">
     /* Your styles */
   </style>
   ```

2. Update `types.ts`:
   ```typescript
   export type BannerVariant = 'simple' | 'simpleWithImage'
   ```

3. Update `Banner.astro` to handle new variant:
   ```astro
   {variant === 'simpleWithImage' && (
     <SimpleWithImage
       title={title}
       description={description}
       linkText={linkText}
       linkHref={linkHref}
       image={image!}
       class={className}
     />
   )}
   ```

## Design Principles

- **Self-contained banners**: Each banner in `src/banners/` has its own content and can have custom design
- **Reusable variants**: Variants in `src/components/banners/variants/` provide consistent templates
- **Flexible**: You can write custom design directly in banner files, or extract to variants later
- **Type-safe**: Full TypeScript support

## Current Variants

- `simple` - Basic clickable banner with title, description, and link (entire banner is clickable)

## Future Variants (planned)

- `simpleWithImage` - Simple banner with image
- `centered` - Centered content layout
- `split` - Split layout with image and content
