import type { GalleryGroup } from '../manifest'

const PAGE_NOTE = 'Used on /about/capabilities (owner decision DB-9 A).'

export const CAPABILITIES_GROUP: GalleryGroup = {
  title: 'Capabilities page',
  items: [
    {
      id: 'cap-hero',
      name: 'CapHero',
      path: 'capabilities/CapHero.astro',
      purpose:
        'Header of /about/capabilities: eyebrow, the name "Product Engineering" as h1 and two lines, left-aligned on the logo edge.',
      props: 'none (text from capabilities/copy.ts)',
      note: PAGE_NOTE,
    },
    {
      id: 'cap-outcomes',
      name: 'Outcomes',
      path: 'capabilities/Outcomes.astro',
      purpose:
        'What the client gets: three linked cells, each a claim plus one real example.',
      props: 'none (text from capabilities/copy.ts)',
    },
    {
      id: 'cap-domains',
      name: 'Domains',
      path: 'capabilities/Domains.astro',
      purpose:
        '"T-shaped experience": six domain cells (icon, name, keywords), each a link to its area card.',
      props: 'none (text from capabilities/copy.ts)',
    },
    {
      id: 'cap-area-image',
      name: 'AreaImagePlaceholder',
      path: 'capabilities/AreaImagePlaceholder.astro',
      purpose:
        'Hatched monochrome band with the area glyph and the words "Image placeholder", at the top of an area card. Dev only on the page (SHOW_AREA_IMAGES).',
      props: 'icon',
    },
    {
      id: 'cap-tech-wall',
      name: 'TechWall',
      path: 'capabilities/TechWall.astro',
      purpose:
        '"Technologies I use": the four layers of the stack as a row of cells, then a TechLogoWall, each logo in its own grid cell.',
      props: 'none (logo list from capabilities/copy.ts)',
    },
    {
      id: 'cap-areas',
      name: 'Areas',
      path: 'capabilities/Areas.astro',
      purpose:
        'Six areas of work that replace the 18 old cards: anchor id, background icon, title, line, a short list of facts and a link; image placeholder on top in dev.',
      props: 'none (text from capabilities/copy.ts)',
    },
    {
      id: 'cap-cta',
      name: 'CapCta',
      path: 'capabilities/CapCta.astro',
      purpose:
        'The one call to action of the page: heading, one sentence, one cta-tier Button.',
      props: 'none (text from capabilities/copy.ts)',
    },
  ],
}
