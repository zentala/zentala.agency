import type { GalleryGroup } from '../manifest'

const ARTICLE_WIDGET_NOTE =
  'An article widget: written inside a post (MDX), not on a page. See it in the software factory tour.'
const ARTICLE_WIDGET_HREF = '/blog/software-factory-tour'

export const BLOG_GROUP: GalleryGroup = {
  title: 'Blog',
  items: [
    {
      id: 'post-meta',
      name: 'PostMeta',
      path: 'blog/PostMeta.astro',
      purpose: 'Part, date and category line.',
      props: 'date, category, partLabel, size (sm; md), tone (subtle; muted)',
    },
    {
      id: 'post-nav',
      name: 'PostNav',
      path: 'blog/PostNav.astro',
      purpose:
        'End-of-article navigation: previous and next part, or related posts.',
      props: 'seriesSlug, seriesPosts, related, currentSlug',
    },
    {
      id: 'post-toc',
      name: 'PostToc',
      path: 'blog/PostToc.astro',
      purpose: '"On this page" heading list.',
      props: 'headings',
    },
    {
      id: 'series-rail',
      name: 'SeriesRail',
      path: 'blog/SeriesRail.astro',
      purpose: 'Series navigation in the post rail.',
      props: 'seriesSlug, seriesTitle, posts, currentSlug, currentLabel',
    },
    {
      id: 'share-buttons',
      name: 'ShareButtons',
      path: 'blog/ShareButtons.astro',
      purpose: 'Share links and a copy-link button.',
      props: 'postUrl, title',
    },
    {
      id: 'box-grid',
      name: 'BoxGrid',
      path: 'blog/rich/BoxGrid.astro',
      note: ARTICLE_WIDGET_NOTE,
      noteHref: ARTICLE_WIDGET_HREF,
      purpose: 'Article widget: grid of titled boxes with items.',
      props: 'boxes ({ title, sub, items, highlight }), mono',
    },
    {
      id: 'disclosure',
      name: 'Disclosure',
      path: 'blog/rich/Disclosure.astro',
      note: ARTICLE_WIDGET_NOTE,
      noteHref: ARTICLE_WIDGET_HREF,
      purpose: 'Article widget: collapsed detail on a native details element.',
      props: 'summary',
    },
    {
      id: 'figure',
      name: 'Figure',
      path: 'blog/rich/Figure.astro',
      note: ARTICLE_WIDGET_NOTE,
      noteHref: ARTICLE_WIDGET_HREF,
      purpose: 'Article widget: labelled frame and caption for a diagram.',
      props: 'label, caption',
    },
    {
      id: 'file-tree',
      name: 'FileTree',
      path: 'blog/rich/FileTree.astro',
      note: ARTICLE_WIDGET_NOTE,
      noteHref: ARTICLE_WIDGET_HREF,
      purpose: 'Article widget: annotated file tree.',
      props: 'nodes ({ name, depth, note })',
    },
    {
      id: 'flow',
      name: 'Flow',
      path: 'blog/rich/Flow.astro',
      note: ARTICLE_WIDGET_NOTE,
      noteHref: ARTICLE_WIDGET_HREF,
      purpose: 'Article widget: boxes joined by arrows.',
      props: 'steps ({ label, note, highlight }), returnNote',
    },
    {
      id: 'term',
      name: 'Term',
      path: 'blog/rich/Term.astro',
      note: ARTICLE_WIDGET_NOTE,
      noteHref: ARTICLE_WIDGET_HREF,
      purpose:
        'Article widget: inline term with a definition on hover and focus.',
      props: 'definition',
    },
  ],
}
