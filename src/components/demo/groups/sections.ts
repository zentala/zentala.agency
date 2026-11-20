import type { GalleryGroup } from '../manifest'

export const SECTIONS_GROUP: GalleryGroup = {
  title: 'Page sections',
  items: [
    {
      id: 'home-hero',
      name: 'Hero (home)',
      path: '../sections/home/Hero.astro',
      purpose:
        'The home hero in two layouts: a profile with avatar and logo, or a split with image and quote.',
      props:
        'layout (profile; split), title, description, ctas, name, question, tagline, avatarSrc, quote, imageSrc',
    },
    {
      id: 'service-section',
      name: 'ServiceSection',
      path: '../sections/home/ServiceSection.astro',
      purpose: 'A titled block of the home page: a header over any content.',
      props: 'id, headline, subhead',
    },
    {
      id: 'featured-projects',
      name: 'FeaturedProjects',
      path: '../sections/home/FeaturedProjects.astro',
      purpose: 'A small title over a grid of project cards.',
      props: 'title (Featured Projects), columns (3; 2, 4), hideTitle',
    },
    {
      id: 'project-card',
      name: 'ProjectCard',
      path: '../sections/home/ProjectCard.astro',
      purpose: 'Image, title, description and link for one project.',
      props: 'title, description, image, link, linkText (Learn more)',
    },
    {
      id: 'why-work-with-me',
      name: 'WhyWorkWithMe',
      path: '../sections/home/WhyWorkWithMe.astro',
      purpose:
        'Header, optional top boxes and columns of text with lists, then a call to action.',
      props: 'headline, subhead, columns, topBoxes, showHeader, cta, showCta',
    },
    {
      id: 'engagement-models',
      name: 'EngagementModels',
      path: '../sections/home/EngagementModels.astro',
      purpose:
        'Ways of working together: cards with who it is for, what you get and the format.',
      props: 'headline, subhead, cards, note, cta',
    },
    {
      id: 'cta-section',
      name: 'CTASection',
      path: '../sections/home/CTASection.astro',
      purpose: 'The closing call to action of a page, built on CTA.',
      props: 'headline, subhead, buttons, footerItems',
    },
    {
      id: 'bento-about-me',
      name: 'BentoAboutMe',
      path: '../sections/home/BentoAboutMe.astro',
      purpose:
        'The home bento: a central stage that changes with the hovered card.',
      props: 'none',
    },
    {
      id: 'bento-showcase',
      name: 'BentoShowcase',
      path: 'home/BentoShowcase.astro',
      purpose: 'A sample bento that shows the section primitives together.',
      props: 'none',
    },
    {
      id: 'linkedin-post-card',
      name: 'LinkedInPostCard',
      path: 'preview/LinkedInPostCard.astro',
      purpose:
        'A LinkedIn post as it would look on LinkedIn, so the owner can review a sidecar text.',
      props: 'title, text, articleLink, authorName',
    },
  ],
}
