import type { BoardIconSpec, PhosphorWeight } from './board-icons'

/**
 * Rendered stroke width of an icon in CSS px. Both sets draw on a fixed grid, so the
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

/** Lucide draws on a 24-unit grid with a configurable stroke (2 by default). */
export const LUCIDE_GRID = 24
export const LUCIDE_DEFAULT_STROKE = 2

export const SMALL_SIZES = [16, 20, 24] as const

type StrokeStyle = Pick<BoardIconSpec, 'set' | 'size' | 'weight' | 'stroke' | 'hairline'>

/** Stroke width in CSS px, or null for sets and weights that draw filled shapes. */
export function strokePx(style: StrokeStyle): number | null {
  if (style.set === 'lucide') {
    const stroke = style.stroke ?? LUCIDE_DEFAULT_STROKE
    return style.hairline ? stroke : (stroke * style.size) / LUCIDE_GRID
  }
  if (style.set !== 'ph') return null
  const weight = style.weight ?? 'regular'
  if (weight === 'fill') return null
  return (PHOSPHOR_STROKE_UNITS[weight] * style.size) / PHOSPHOR_GRID
}

/** Polish decimal comma, at most two decimals: 0.9375 becomes "0,94 px". */
export function formatPx(value: number): string {
  return `${value.toLocaleString('pl-PL', { maximumFractionDigits: 2 })} px`
}

/** A stroke under one device pixel cannot light a whole pixel, so it renders grey. */
export const isSubPixel = (value: number) => value < 1

/** The stroke styles listed in the I1 stroke table, thinnest first within each set. */
export interface StrokeRow {
  label: string
  note?: string
  style: Omit<StrokeStyle, 'size' | 'set'> & { set: 'ph' | 'lucide' }
}

export const STROKE_ROWS: readonly StrokeRow[] = [
  { label: 'Phosphor Thin', note: 'tylko duże ikony w tle', style: { set: 'ph', weight: 'thin' } },
  { label: 'Phosphor Light', note: 'strona dziś', style: { set: 'ph', weight: 'light' } },
  { label: 'Phosphor Regular', style: { set: 'ph', weight: 'regular' } },
  { label: 'Phosphor Bold', style: { set: 'ph', weight: 'bold' } },
  { label: 'Lucide 1,25', note: 'odrzucone', style: { set: 'lucide', stroke: 1.25 } },
  { label: 'Lucide 1,5', note: 'odrzucone', style: { set: 'lucide', stroke: 1.5 } },
  { label: 'Lucide 2', note: 'odrzucone', style: { set: 'lucide', stroke: 2 } },
]
