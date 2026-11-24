/**
 * Site-wide feature switches. One constant per switch, read by every component it governs.
 */

/**
 * Whether header and cover images render: the generated slug covers on the /blog index,
 * the image of a banner, of a project card and of a portfolio item.
 * NOTE(intent): off on the owner's request 2026-11-24 (R1), because no real header image
 * exists yet, only mocks. Flip to `true` to bring every one of them back unchanged.
 */
export const HEADER_IMAGES = false

/** What a component does with one header image slot. */
export interface HeaderImageSlot {
  /** Whether the image is in the markup at all. */
  render: boolean
  /** Attributes for the image element, read by the dev switcher's CSS. */
  attrs: Record<string, string>
}

const ATTR_IMAGE = 'data-header-image'
const ATTR_DEFAULT_OFF = 'data-header-image-default'

/**
 * Decides how a header image slot renders. Switch on: in the markup, always. Switch off:
 * absent, so a production build ships no cover; in dev it stays in the markup, marked
 * as off by default, so the "header-images" axis of the variant switcher can show it.
 */
export function headerImageSlot(enabled: boolean, dev: boolean): HeaderImageSlot {
  if (enabled) return { render: true, attrs: { [ATTR_IMAGE]: '' } }
  if (dev) return { render: true, attrs: { [ATTR_IMAGE]: '', [ATTR_DEFAULT_OFF]: 'off' } }
  return { render: false, attrs: {} }
}

/** The slot as this build sees it. */
export const headerImage = headerImageSlot(HEADER_IMAGES, import.meta.env.DEV)
