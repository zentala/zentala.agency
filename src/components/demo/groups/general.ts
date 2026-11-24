import type { GalleryGroup } from '../manifest'

export const GENERAL_GROUP: GalleryGroup = {
  title: 'General',
  items: [
    {
      id: 'button',
      name: 'Button',
      path: 'Button.astro',
      purpose: 'Link or button in one of four solid tiers.',
      props:
        'href, text, target, tier (primary; cta, secondary, tertiary), icon, iconPosition (left; right), arrow (true), type (none; submit, button: renders a button), slot icon',
      note: 'At most one cta tier per page; the rest use primary, secondary or tertiary.',
    },
    {
      id: 'cta',
      name: 'CTA',
      path: 'CTA.astro',
      purpose: 'Call-to-action section: headline, buttons, footer facts.',
      props: 'headline, subhead, buttons, footerItems, class',
    },
    {
      id: 'post-cta',
      name: 'PostCta',
      path: 'PostCta.astro',
      purpose: 'CTA at the end of a post or series page.',
      props: 'variant (harness; default)',
    },
    {
      id: 'quote',
      name: 'Quote',
      path: 'Quote.astro',
      purpose: 'Pull quote with optional author and source.',
      props:
        'text, author, source, quoteMarkVariant (typographic; heavy)',
    },
    {
      id: 'hero',
      name: 'Hero',
      path: 'Hero.astro',
      purpose: 'Page hero: eyebrow, title, subtitle. A section of its own.',
      props: 'title, subtitle, eyebrow',
    },
    {
      id: 'logo',
      name: 'Logo',
      path: 'Logo.astro',
      purpose: 'Full logo or sygnet, optional tagline.',
      props: 'type (full; sygnet), link, color, width, height, tagline',
    },
    {
      id: 'tag-list',
      name: 'TagList',
      path: 'TagList.astro',
      purpose: 'Row of tag links.',
      props: 'tags, className',
    },
    {
      id: 'text-block-icon',
      name: 'TextBlockIcon',
      path: 'TextBlockIcon.astro',
      purpose: 'Centered block with a large glyph.',
      props: 'title, description, icon',
    },
    {
      id: 'themed-input',
      name: 'ThemedInput',
      path: 'ThemedInput.astro',
      purpose:
        'Form field as a line-grid cell: floating label, no border or inner padding, neutral focus, fixed autofill colours. The one field implementation (the design board reuses it).',
      props:
        'type (text; email, tel, password, url, number), id, name, placeholder (the label text), icon, multiline, size (default; large), required, disabled, error, class',
    },
    {
      id: 'themed-textarea',
      name: 'ThemedTextarea',
      path: 'ThemedTextarea.astro',
      purpose: 'ThemedInput as a multi-line field.',
      props: 'id, name, placeholder, icon, size (default; large), required, disabled, error',
    },
    {
      id: 'contact-form',
      name: 'ContactForm',
      path: 'ContactForm.astro',
      purpose: 'Contact form: ThemedInput cells in a two-column line grid and a FormFoot row. In dev, the Formularz axis switches to variant C.',
      props: 'none',
    },
    {
      id: 'form-foot',
      name: 'FormFoot',
      path: 'FormFoot.astro',
      purpose: 'Last row of a line-grid form: padded privacy note (optional consent checkbox) and the submit button on the right, flush with the row lines.',
      props: 'note, checkName, checkLabel, class',
    },
    {
      id: 'trusted-me',
      name: 'TrustedMe',
      path: 'TrustedMe.astro',
      purpose: 'Client logo strip with hover descriptions.',
      props: 'none',
      note: 'Needs real client logos. It renders nothing until a client in the file has a logo; there are no placeholder logos.',
    },
  ],
}
