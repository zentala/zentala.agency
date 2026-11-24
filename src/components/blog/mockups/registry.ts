import ReviewLayerMockup from '@/components/review-mockup/ReviewLayerMockup.astro'
import DesignBoard from '@/components/design-board/DesignBoard.astro'

/**
 * Dev-only mockups served at /mockups/<name> by src/pages/mockups/[mockup].astro.
 * Add a mockup: one entry here plus its component.
 */
export const MOCKUPS = {
  'review-layer': {
    title: 'Mockup: in-context review layer',
    Component: ReviewLayerMockup,
  },
  'design-board': {
    title: 'Design decision board',
    Component: DesignBoard,
  },
} as const

export type MockupName = keyof typeof MOCKUPS
