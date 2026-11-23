import phIcons from '@iconify-json/ph/icons.json'
import { ICON_MAP, type IconMeaning } from '@/lib/icons/icon-map'

/** The one icon set of the site: Phosphor, drawn in the weight its rendered size calls for. */
export const ICON_SET_PREFIX = 'ph'

/** Named sizes; any whole pixel from `MIN_ICON_PX` up is allowed as a number too (18, 32, 64, 176). */
export const ICON_SIZES = { sm: 16, md: 20, lg: 24 } as const
export type IconSize = keyof typeof ICON_SIZES
export type SiteIconSize = IconSize | number

export const MIN_ICON_PX = 16

export type IconWeight = 'bold' | 'regular' | 'light' | 'thin'

/** Largest size per weight band: Bold to 20 px, Regular to 24 px, Light up to 63 px, Thin from 64 px. */
const BOLD_MAX_PX = 20
const REGULAR_MAX_PX = 24
const LIGHT_MAX_PX = 63

/** Phosphor names the regular weight without a suffix. */
const WEIGHT_SUFFIX: Record<IconWeight, string> = {
  bold: '-bold',
  regular: '',
  light: '-light',
  thin: '-thin',
}

/** Rendered pixel size of a named or numeric size. Throws on a fractional or too small size. */
export function iconPx(size: SiteIconSize): number {
  const px = typeof size === 'number' ? size : ICON_SIZES[size]
  if (!Number.isInteger(px) || px < MIN_ICON_PX) {
    throw new Error(`SiteIcon: size ${px} must be a whole pixel of at least ${MIN_ICON_PX}`)
  }
  return px
}

/** The weight that keeps the stroke between 1.5 and 1.9 px at this rendered size (DESIGN.md section 5, Icons). */
export function iconWeightForSize(px: number): IconWeight {
  if (px <= BOLD_MAX_PX) return 'bold'
  if (px <= REGULAR_MAX_PX) return 'regular'
  if (px <= LIGHT_MAX_PX) return 'light'
  return 'thin'
}

/** Every weight a meaning can render at, so the test can check each glyph exists in each. */
export const ICON_WEIGHTS = Object.keys(WEIGHT_SUFFIX) as IconWeight[]

/** The Phosphor icon name of a base glyph in one weight. */
export function phosphorName(base: string, weight: IconWeight): string {
  return `${base}${WEIGHT_SUFFIX[weight]}`
}

function isMeaning(name: string): name is IconMeaning {
  return Object.hasOwn(ICON_MAP, name)
}

/**
 * Resolves an icon meaning and a rendered size to the astro-icon name.
 * Throws on an unknown meaning or a glyph the set lacks in that weight, so a typo
 * fails the build instead of rendering an empty box.
 */
export function resolveIconName(meaning: string, size: SiteIconSize): string {
  if (!isMeaning(meaning)) throw new Error(`SiteIcon: no icon meaning "${meaning}" in the icon map`)
  const full = phosphorName(ICON_MAP[meaning], iconWeightForSize(iconPx(size)))
  const known = phIcons.icons as Record<string, unknown>
  const aliases = (phIcons as { aliases?: Record<string, unknown> }).aliases ?? {}
  if (!(full in known) && !(full in aliases)) {
    throw new Error(`SiteIcon: no Phosphor icon "${full}" (from "${meaning}")`)
  }
  return `${ICON_SET_PREFIX}:${full}`
}
