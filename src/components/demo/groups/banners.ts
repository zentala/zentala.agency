import type { GalleryGroup } from '../manifest'

const POST_END_NOTE =
  'Shown at the end of every post whose frontmatter sets this banner in bannerEnd.'

export const BANNERS_GROUP: GalleryGroup = {
  title: 'Banners',
  items: [
    {
      id: 'banner',
      name: 'Banner',
      path: 'banners/Banner.astro',
      purpose:
        'A full-width promotion block: a title, one sentence and a link. It picks the variant; each real banner lives in src/sections/banners.',
      props:
        'variant (simple; simpleWithImage), title, description, linkText, linkHref, image',
    },
    {
      id: 'banner-simple',
      name: 'Simple',
      path: 'banners/variants/Simple.astro',
      purpose: 'Banner variant without an image. The three post-end banners use it.',
      props: 'title, description, linkText, linkHref, class',
    },
    {
      id: 'banner-simple-with-image',
      name: 'SimpleWithImage',
      path: 'banners/variants/SimpleWithImage.astro',
      purpose: 'Banner variant with an image above the text. No page uses it yet.',
      props: 'title, description, linkText, linkHref, image, class',
    },
    {
      id: 'banner-devex',
      name: 'DevEx banner',
      path: '../sections/banners/devex.astro',
      purpose: 'Ends posts about developer experience and Backstage; links to the Backstage capability page.',
      props: 'none',
      usedNote: POST_END_NOTE,
    },
    {
      id: 'banner-devex-category',
      name: 'DevEx category banner',
      path: '../sections/banners/devex-category.astro',
      purpose: 'Points readers to the DevEx category listing (/category/devex).',
      props: 'none',
      usedNote: "Available as bannerEnd: 'devex-category'; no post sets it yet.",
    },
    {
      id: 'banner-ai-automation',
      name: 'AI automation banner',
      path: '../sections/banners/ai-automation.astro',
      purpose: 'Points readers to more articles in the Innovation category (/category/innovation).',
      props: 'none',
      usedNote: POST_END_NOTE,
    },
  ],
}
