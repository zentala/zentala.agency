# Banner Component System

Unified banner system with reusable templates and easy content management.

## Structure

```
src/components/banners/
├── Banner.astro          # Main component (wrapper)
├── types.ts             # TypeScript interfaces
├── config.ts            # Banner content configurations
├── variants/
│   └── Simple.astro     # Simple banner template
└── README.md           # This file
```

## Usage

### Option 1: Using existing banner files (recommended)

Existing banner files in `src/banners/` automatically use the new system:

```astro
---
// src/banners/devex.astro
import Banner from '../components/banners/Banner.astro'
import { getBannerConfig } from '../components/banners/config'

const config = getBannerConfig('devex')
---

<Banner variant="simple" {...config} />
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

### Option 3: Using config file

```astro
---
import Banner from '../components/banners/Banner.astro'
import { getBannerConfig } from '../components/banners/config'

const config = getBannerConfig('devex')
---

<Banner variant="simple" {...config} />
```

## Adding New Banner Content

Edit `src/components/banners/config.ts`:

```typescript
export const bannerConfigs: Record<string, Omit<BannerProps, 'variant'>> = {
  'your-banner-key': {
    title: 'Your Title',
    description: 'Your description',
    linkText: 'Learn more →',
    linkHref: '/your-link',
  },
}
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
   
   <div class={`banner banner-with-image ${className}`}>
     <img src={image} alt={title} />
     <h3>{title}</h3>
     <p>{description}</p>
     <a href={linkHref} class="banner-link">{linkText}</a>
   </div>
   
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

- **Consistent styling**: All banners use the same design system
- **Easy content management**: All text content in `config.ts`
- **Future-proof**: Easy to add new variants without breaking existing ones
- **Type-safe**: Full TypeScript support

## Current Variants

- `simple` - Basic banner with title, description, and link (white left border)

## Future Variants (planned)

- `simpleWithImage` - Simple banner with image
- `centered` - Centered content layout
- `split` - Split layout with image and content

