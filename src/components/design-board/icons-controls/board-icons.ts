import { SET_LABEL, findGlyph, type BoardIconSet, type ResolvedIcon } from '../icon-sets/sets'
import { formatPx, strokePx } from './stroke-math'

/**
 * Icon lookup for the dev-only design board. It compares icon sets side by side, so it
 * reads several sets on purpose. The site itself keeps one renderer and one map.
 */
export type { BoardIconSet, ResolvedIcon }
export type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill'

export interface BoardIconSpec {
  set: BoardIconSet
  name: string
  /** Rendered size in whole pixels. */
  size: number
  /** Phosphor only. */
  weight?: PhosphorWeight
  /** Stroke sets only: stroke width in the set's 24-unit grid, or in px when `hairline` is set. */
  stroke?: number
  /** Stroke sets only: the stroke keeps its pixel width at any icon size. */
  hairline?: boolean
}

/** Sets drawn as strokes, so the board can set the stroke width. */
const STROKE_SETS: readonly BoardIconSet[] = ['lucide', 'tabler', 'iconoir']
const SOURCE_STROKE = /stroke-width="[\d.]+"/g

function iconKey(spec: BoardIconSpec): string {
  if (spec.set !== 'ph' || !spec.weight || spec.weight === 'regular')
    return spec.name
  return `${spec.name}-${spec.weight}`
}

/** Resolves a spec to drawable SVG data. Throws on an unknown name so a typo fails the page. */
export function resolveBoardIcon(spec: BoardIconSpec): ResolvedIcon {
  const key = iconKey(spec)
  const icon = findGlyph(spec.set, key)
  if (!icon) throw new Error(`Design board: no icon "${key}" in set "${spec.set}"`)
  if (spec.stroke === undefined || !STROKE_SETS.includes(spec.set)) return icon
  return { ...icon, body: icon.body.replace(SOURCE_STROKE, `stroke-width="${spec.stroke}"`) }
}

/** A one-line description of a spec for the caption under each sample. */
export function describeBoardIcon(spec: BoardIconSpec): string {
  const weight = spec.set === 'ph' ? ` ${spec.weight ?? 'regular'}` : ''
  const px = strokePx(spec)
  const stroke = px === null ? '' : ` · kreska ${formatPx(px)}${spec.hairline ? ' stała' : ''}`
  return `${SET_LABEL[spec.set]}${weight} · ${spec.size}px${stroke}`
}
