import type { GalleryGroup } from '../manifest'

export const LINE_GRID_GROUP: GalleryGroup = {
  title: 'Line-grid primitives',
  items: [
    {
      id: 'section',
      name: 'Section',
      path: 'primitives/sections/Section.astro',
      purpose:
        'Page section: section-grid plus container-bordered. Owns the line below it.',
      props: 'id, class',
    },
    {
      id: 'section-header',
      name: 'SectionHeader',
      path: 'primitives/sections/SectionHeader.astro',
      purpose:
        'Headline block with the line under it, in four variants: A (default), B (small caps label), C (thin larger label), D (label on the line).',
      props:
        'headline, subhead, eyebrow, eyebrowIcon, icon, logoSrc, logoAlt, compact, tag (h2; h1, h3), align (left; center), variant (a; b, c, d), labelIcon, meta',
      note: 'The header text starts on the page left edge (the logo edge) and the header takes the full cell padding (DESIGN.md, Left edge).',
    },
    {
      id: 'section-grid',
      name: 'SectionGrid',
      path: 'primitives/sections/SectionGrid.astro',
      purpose: 'Line grid of equal cells, 2 to 5 columns above 1000px.',
      props: 'columns (3; 2 to 5)',
    },
    {
      id: 'section-content',
      name: 'SectionContent',
      path: 'primitives/sections/SectionContent.astro',
      purpose:
        'One cell or full block of prose. A grid cell takes the full cell padding; inside a padded BentoCard the card pads instead.',
      props: 'context (full; grid), prose (true)',
    },
    {
      id: 'section-image',
      name: 'SectionImage',
      path: 'primitives/sections/SectionImage.astro',
      purpose: 'Image cell with aspect ratios and an optional overlay slot.',
      props:
        'src, alt, aspectRatio (square; 16/9, 4/3, auto), objectFit, background, hoverZoom, overlayPosition',
    },
    {
      id: 'section-cta',
      name: 'SectionCTA',
      path: 'primitives/sections/SectionCTA.astro',
      purpose: 'Full-width call-to-action link block (line-block).',
      props:
        'href, text, icon, arrow (true), tier (primary; cta, secondary, tertiary), external, bgText',
    },
    {
      id: 'section-block-quote',
      name: 'SectionBlockQuote',
      path: 'primitives/sections/SectionBlockQuote.astro',
      purpose: 'Full-width quote block (line-block).',
      props: 'quote, author, role, variant (default; large, minimal)',
    },
    {
      id: 'tech-icon-grid',
      name: 'TechIconGrid',
      path: 'primitives/sections/TechIconGrid.astro',
      purpose:
        'A line grid of technology logos, muted until hovered. A Section of its own.',
      props: 'items (every logo), columns (5; 4), id',
    },
    {
      id: 'section-bento',
      name: 'SectionBento',
      path: 'primitives/sections/SectionBento.astro',
      purpose: 'Asymmetric bento line grid: 4, 2 and 1 columns.',
      props: 'rowHeight (1fr)',
    },
    {
      id: 'bento-card-sections',
      name: 'BentoCard (sections)',
      path: 'primitives/sections/BentoCard.astro',
      purpose:
        'Bento cell with spans. Padding sm, md and lg all take the full cell padding (64/48/32/24/16 px by width); none leaves the cell bare. Used by BentoShowcase.',
      props:
        'colSpan (1; 1 to 4), rowSpan (1; 1 to 3), padding (md; none, sm, lg)',
    },
    {
      id: 'bento-card',
      name: 'BentoCard (bento)',
      path: 'primitives/sections/bento/BentoCard.astro',
      purpose:
        'Bento cell with spans, hover state and the cell overlay. Padding sm, md and lg all take the full cell padding; none leaves the cell bare. Used by the home bento.',
      props: 'colSpan, rowSpan, padding, hoverState, class',
    },
    {
      id: 'bento-central-stage',
      name: 'BentoCentralStage',
      path: 'primitives/sections/bento/BentoCentralStage.astro',
      purpose:
        'The 2x2 stage cell of the home bento; its states swap on card hover.',
      props: 'slots: default, label-primary, label-secondary',
    },
    {
      id: 'bento-stage-state',
      name: 'BentoStageState',
      path: 'primitives/sections/bento/BentoStageState.astro',
      purpose: 'One state of the central stage.',
      props: 'state, class',
    },
  ],
}
