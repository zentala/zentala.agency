import type { GalleryGroup } from '../manifest'

export const BANNERS_GROUP: GalleryGroup = {
  title: 'Banners',
  items: [
    {
      id: 'banner',
      name: 'Banner',
      path: 'banners/Banner.astro',
      purpose:
        'Picks a banner variant; a standalone block that needs a container-bordered parent.',
      props:
        'variant (simple; simpleWithImage), title, description, linkText, linkHref, image',
    },
    {
      id: 'banner-simple',
      name: 'Simple',
      path: 'banners/variants/Simple.astro',
      purpose: 'Text-only banner variant.',
      props: 'title, description, linkText, linkHref, class',
    },
    {
      id: 'banner-simple-with-image',
      name: 'SimpleWithImage',
      path: 'banners/variants/SimpleWithImage.astro',
      purpose: 'Banner variant with an image.',
      props: 'title, description, linkText, linkHref, image, class',
    },
  ],
}
