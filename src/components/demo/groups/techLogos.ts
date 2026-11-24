import type { GalleryGroup } from '../manifest'

export const TECH_LOGOS_GROUP: GalleryGroup = {
  title: 'Technology logos',
  items: [
    {
      id: 'tech-logo-wall',
      name: 'TechLogoWall',
      path: 'primitives/TechLogoWall.astro',
      purpose:
        'A container-wide wall of technology logos built from a list of slugs or names: monochrome at rest, the real brand colour on hover, and an inner glow of the wall in that colour.',
      props:
        'logos (slugs or names), columns (8; or wide, medium, narrow), size (32; 24, 40), label (hover; always, none), layout (cells; field), title',
      note: 'Used on /about/capabilities in the cells layout (owner decision DB-9 A); the field layout stays here as an alternative.',
    },
  ],
}
