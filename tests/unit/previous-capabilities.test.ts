import { describe, expect, it } from 'vitest'
import { ICON_MAP } from '@/lib/icons/icon-map'
import { PREVIOUS_OFFERS } from '@/components/blog/mockups/previousCapabilitiesOffers'

/** The dev-only mockup /mockups/capabilities-previous draws 18 old cards; every icon must resolve. */
describe('previous capabilities mockup', () => {
  it('has the 18 old offers', () => {
    expect(PREVIOUS_OFFERS).toHaveLength(18)
  })

  it('names only icons that exist in the icon map', () => {
    const missing = PREVIOUS_OFFERS.map((offer) => offer.icon).filter((icon) => !(icon in ICON_MAP))
    expect(missing).toEqual([])
  })
})
