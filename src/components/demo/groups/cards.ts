import type { GalleryGroup } from '../manifest'

export const CARDS_GROUP: GalleryGroup = {
  title: 'Cards',
  items: [
    {
      id: 'card-container',
      name: 'CardContainer',
      path: 'cards/CardContainer.astro',
      purpose:
        'Root of every card: a transparent grid cell, a link when href is set.',
      props: 'href, hasHover, backgroundIcon, class, target (_self)',
    },
    {
      id: 'offer-card',
      name: 'OfferCard',
      path: 'cards/OfferCard.astro',
      purpose: 'Numbered offer tile with a background icon.',
      props: 'number, title, description, icon, href',
    },
    {
      id: 'portfolio-item',
      name: 'PortfolioItem',
      path: 'cards/PortfolioItem.astro',
      purpose: 'Portfolio tile with subtitle, tags and an optional link.',
      props: 'title, subtitle, link, linkTitle, tags, key',
    },
    {
      id: 'post-card',
      name: 'PostCard',
      path: 'cards/PostCard.astro',
      purpose: 'Blog listing card from a content entry.',
      props:
        'title, date, category, excerpt, authorVersion, link, series, isDraft',
    },
    {
      id: 'series-card',
      name: 'SeriesCard',
      path: 'cards/SeriesCard.astro',
      purpose: 'Blog listing card for one series with its parts.',
      props: 'title, slug, parts, newestSlug, isFresh',
    },
  ],
}
