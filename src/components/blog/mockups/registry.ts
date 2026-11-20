import BlogSeriesMockup from './BlogSeriesMockup.astro'
import ReviewLayerMockup from '@/components/review-mockup/ReviewLayerMockup.astro'

/**
 * Dev-only mockups served at /mockups/<name> by src/pages/mockups/[mockup].astro.
 * Add a mockup: one entry here plus its component.
 */
export const MOCKUPS = {
  'blog-series': {
    title: 'Mockup: series-first blog',
    Component: BlogSeriesMockup,
  },
  'review-layer': {
    title: 'Mockup: in-context review layer',
    Component: ReviewLayerMockup,
  },
} as const

export type MockupName = keyof typeof MOCKUPS
