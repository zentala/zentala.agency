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
      id: 'cap-t-shape',
      name: 'TShapeLiteral',
      path: 'capabilities/TShapeLiteral.astro',
      purpose:
        'Five domains as the bar of a T, one TypeScript stack as the stem, drawn with the line grid; two labelled lists at 1000px and below.',
      props: 'none (text from capabilities/copy.ts)',
    },
    {
      id: 'cap-field-item',
      name: 'FieldItem',
      path: 'capabilities/FieldItem.astro',
      purpose: 'One breadth field of the T: a name and a short detail line.',
      props: 'name, detail',
    },
    {
      id: 'cap-stack-item',
      name: 'StackItem',
      path: 'capabilities/StackItem.astro',
      purpose:
        'One depth layer of the T: layer name, technology logos and the tool names in text.',
      props: 'name, logos, detail',
    },
    {
      id: 'cap-tech-wall',
      name: 'TechWall',
      path: 'capabilities/TechWall.astro',
      purpose:
        '"Technologies I use": a section header over a TechLogoWall, each logo in its own grid cell.',
      props: 'none (logo list from capabilities/copy.ts)',
    },
    {
      id: 'cap-areas',
      name: 'Areas',
      path: 'capabilities/Areas.astro',
      purpose:
        'Six areas of work that replace the 18 old cards: title, line, a short list of facts and a link.',
      props: 'none (text from capabilities/copy.ts)',
    },
    {
      id: 'cap-cta',
      name: 'CapCta',
      path: 'capabilities/CapCta.astro',
      purpose: 'The one call to action of the page: heading, one sentence, one cta-tier Button.',
      props: 'none (text from capabilities/copy.ts)',
    },
  ],
}
