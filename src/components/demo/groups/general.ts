import type { GalleryGroup } from '../manifest'

export const GENERAL_GROUP: GalleryGroup = {
  title: 'General',
  items: [
    {
      id: 'button',
      name: 'Button',
      path: 'Button.astro',
      purpose: 'Link styled as a button.',
      props:
        'href, text, target, variant (primary; secondary, accent, ghost), icon, arrow (true)',
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
      purpose: 'Form input in the site theme.',
      props: 'type (text), id, placeholder',
    },
    {
      id: 'themed-textarea',
      name: 'ThemedTextarea',
      path: 'ThemedTextarea.astro',
      purpose: 'Form textarea in the site theme.',
      props: 'id, placeholder',
    },
    {
      id: 'contact-form',
      name: 'ContactForm',
      path: 'ContactForm.astro',
      purpose: 'Contact form layout from the themed controls.',
      props: 'none',
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
