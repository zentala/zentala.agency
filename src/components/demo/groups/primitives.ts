import type { GalleryGroup } from '../manifest'

export const PRIMITIVES_GROUP: GalleryGroup = {
  title: 'Primitives',
  items: [
    {
      id: 'site-icon',
      name: 'SiteIcon',
      path: 'primitives/SiteIcon.astro',
      purpose: 'The only UI icon: Phosphor Light, currentColor, whole-pixel sizes.',
      props: 'name, size (sm 16; md 20, lg 24), class',
    },
    {
      id: 'tech-icon',
      name: 'TechIcon',
      path: 'primitives/TechIcon.astro',
      purpose: 'Technology logo from simple-icons, monochrome unless a brand colour is passed.',
      props: 'name, size (sm; md, lg), brand (hex), class',
    },
    {
      id: 'badge',
      name: 'Badge',
      path: 'primitives/Badge.astro',
      purpose: 'Small square label without border.',
      props: 'variant (tech; accent), size (sm; md), class',
    },
    {
      id: 'tag',
      name: 'Tag',
      path: 'primitives/Tag.astro',
      purpose: 'Hashtag-style label, a link when href is set.',
      props: 'text, href, prefix (#), theme (chip; simple and label are the same chip), class',
    },
    {
      id: 'tag-group',
      name: 'TagGroup',
      path: 'primitives/TagGroup.astro',
      purpose: 'Wrapped row of Tags.',
      props: 'tags, theme, prefix, hrefPrefix, class, tagClass',
    },
    {
      id: 'draft-badge',
      name: 'DraftBadge',
      path: 'primitives/DraftBadge.astro',
      purpose:
        'The one dev-only DRAFT marker; the review state marks a draft ready for the owner.',
      props: 'placement (corner; edge, inline), review (false), label',
    },
    {
      id: 'phase-label',
      name: 'PhaseLabel',
      path: 'primitives/PhaseLabel.astro',
      purpose: 'Small uppercase phase number.',
      props: 'phase, class',
    },
    {
      id: 'note-box',
      name: 'NoteBox',
      path: 'primitives/NoteBox.astro',
      purpose: 'Callout box with an icon and an optional title.',
      props:
        'icon (lightbulb), title, variant (default; info, success, warning)',
    },
    {
      id: 'truncate-text',
      name: 'TruncateText',
      path: 'primitives/TruncateText.astro',
      purpose: 'Text cut at a word boundary.',
      props: 'text, maxLength (150), element (p; span, div), class',
    },
    {
      id: 'image-circle',
      name: 'ImageCircle',
      path: 'primitives/ImageCircle.astro',
      purpose: 'Round image, the one place a circle is allowed.',
      props: 'src, alt, loading, animateIn, hoverZoom (true), class',
    },
    {
      id: 'card-background-icon',
      name: 'CardBackgroundIcon',
      path: 'primitives/CardBackgroundIcon.astro',
      purpose: 'Large faint icon behind a card or header.',
      props: 'icon',
    },
    {
      id: 'card-icon-mosaic',
      name: 'CardIconMosaic',
      path: 'primitives/CardIconMosaic.astro',
      purpose: 'Generated artwork: dot grid, glow and drifting icons.',
      props: 'icons, class',
    },
  ],
}
