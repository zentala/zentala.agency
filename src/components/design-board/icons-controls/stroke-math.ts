import type { BoardIconSet, BoardIconSpec, PhosphorWeight } from './board-icons'

/**
 * Rendered stroke width of an icon in CSS px. Every set draws on a fixed grid, so the
 * stroke scales with the icon: the same weight is thinner in a smaller icon.
 */

/** Phosphor draws on a 256-unit grid; stroke width per weight in grid units. */
export const PHOSPHOR_GRID = 256
export const PHOSPHOR_STROKE_UNITS: Record<Exclude<PhosphorWeight, 'fill'>, number> = {
  thin: 8,
  light: 12,
  regular: 16,
  bold: 24,
}

/** Lucide, Tabler, Iconoir and Material Symbols draw on a 24-unit grid. */
export const LUCIDE_GRID = 24
export const LUCIDE_DEFAULT_STROKE = 2

/** Stroke of each 24-grid set as drawn by its authors, in grid units. */
const GRID_24_STROKE: Partial<Record<BoardIconSet, number>> = {
  lucide: LUCIDE_DEFAULT_STROKE,
  tabler: 2,
  iconoir: 1.5,
  ms: 2,
}

/** Material Symbols are filled outlines: the stroke cannot be changed. */
const FIXED_STROKE_SETS: readonly BoardIconSet[] = ['ms']

export const SMALL_SIZES = [16, 18, 20, 24] as const

export type StrokeStyle = Pick<BoardIconSpec, 'set' | 'size' | 'weight' | 'stroke' | 'hairline'>

/** Stroke width in CSS px, or null for sets and weights that draw filled shapes. */
export function strokePx(style: StrokeStyle): number | null {
  if (style.set === 'ph') {
    const weight = style.weight ?? 'regular'
    if (weight === 'fill') return null
    return (PHOSPHOR_STROKE_UNITS[weight] * style.size) / PHOSPHOR_GRID
  }
  const drawn = GRID_24_STROKE[style.set]
  if (drawn === undefined) return null
  const stroke = FIXED_STROKE_SETS.includes(style.set) ? drawn : (style.stroke ?? drawn)
  return style.hairline ? stroke : (stroke * style.size) / LUCIDE_GRID
}

/** Polish decimal comma, at most two decimals: 0.9375 becomes "0,94 px". */
export function formatPx(value: number): string {
  return `${value.toLocaleString('pl-PL', { maximumFractionDigits: 2 })} px`
}

/** A stroke under one device pixel cannot light a whole pixel, so it renders grey. */
export const isSubPixel = (value: number) => value < 1
