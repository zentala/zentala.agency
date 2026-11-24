import type { GalleryGroup } from '../manifest'

export const TECH_LOGOS_GROUP: GalleryGroup = {
  title: 'Technology logos',
  items: [
    {
      id: 'tech-logo-wall',
      name: 'TechLogoWall',
      path: 'primitives/TechLogoWall.astro',
      purpose:
        'A container-wide wall of technology logos built from a list of slugs or names: monochrome at rest, the real brand colour and a glow of that colour on the hovered cell only, centred logos, and an expanding note per tile.',
      props:
        'logos (slugs or names), columns (8; or wide, medium, narrow), size (32; 24, 40), label (hover; always, none), layout (cells; field), title, notes (slug to text; the tile expands)',
      note: 'Used on /about/capabilities in the cells layout (owner decision DB-9 A); the field layout stays here as an alternative.',
    },
    {
      id: 'logo-wall-note',
      name: 'LogoWallNote',
      path: 'primitives/LogoWallNote.astro',
      purpose:
        'The expanding panel of one TechLogoWall cell: logo in its brand colour, name and a short note. Absolute over the neighbouring cells, so no grid rect moves; opens on hover, focus and tap.',
      props: 'id, entry (a tech-icons entry), note',
      note: 'Rendered by TechLogoWall for every logo that has a note. Its dev variants are the "logo-expand" axis of the Warianty switcher.',
    },
  ],
}
