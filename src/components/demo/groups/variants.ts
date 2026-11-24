import type { GalleryGroup } from '../manifest'

export const VARIANTS_GROUP: GalleryGroup = {
  title: 'Variants under review',
  items: [
    {
      id: 'section-header-variants',
      name: 'SectionHeader variants',
      path: 'primitives/sections/SectionHeader.astro',
      purpose:
        'The four looks of the one section header: a (the default), b (small caps label), c (thin larger label) and d (label on the section line).',
      props:
        'variant (a; b, c, d), labelIcon (SiteIcon name before the headline), meta (short note on the right)',
      note: 'Variant a is the default (the home page call to action keeps it); b, c and d are chosen with the variant prop for other uses, for example a left-aligned standalone header.',
      noteHref: '/mockups/design-board#board-t4',
    },
    {
      id: 'variant-switcher',
      name: 'VariantSwitcher (dev only)',
      path: 'dev/variant-switcher/VariantSwitcher.astro',
      purpose:
        'A small fixed panel that sets data-v-<axis> attributes on <html> and remembers the choice, so shared components can be compared on real pages.',
      props: 'none; the axes are listed in dev/variant-switcher/axes.ts',
      usedNote:
        'Every page in astro dev, through a DEV-only dynamic import in Layout; absent from the production build.',
    },
  ],
}
