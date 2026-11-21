import type { StrokeStyle } from '../icons-controls/stroke-math'

/**
 * Measured sharpness of each compared set at small sizes.
 *
 * EVIDENCE: Chromium, white icons on black, 2026-11-21, device pixel ratio 1 and 1.25,
 * icons placed on whole device pixels. Six glyphs per set (calendar, tag, stack, home,
 * chat bubble, chevron). The number is the share of lit pixels (over 5% white) that are
 * fully white (90% or more), summed over the six glyphs. A higher share reads sharper.
 */
export const COVERAGE_SIZES = [16, 18, 20, 24] as const

export interface CoverageRow {
  label: string
  note?: string
  style: Omit<StrokeStyle, 'size'>
  /** Percent of fully white pixels per size in COVERAGE_SIZES, at pixel ratio 1 and 1.25. */
  crisp: { dpr1: readonly number[]; dpr125: readonly number[] }
}

export const COVERAGE_ROWS: readonly CoverageRow[] = [
  {
    label: 'Phosphor Light',
    note: 'strona dziś',
    style: { set: 'ph', weight: 'light' },
    crisp: { dpr1: [0, 2, 6, 10], dpr125: [6, 17, 14, 34] },
  },
  {
    label: 'Phosphor Regular',
    note: 'wybrane w meta',
    style: { set: 'ph', weight: 'regular' },
    crisp: { dpr1: [30, 11, 14, 36], dpr125: [14, 27, 29, 40] },
  },
  {
    label: 'Phosphor Bold',
    note: 'wybrane w menu',
    style: { set: 'ph', weight: 'bold' },
    crisp: { dpr1: [32, 40, 41, 46], dpr125: [41, 47, 50, 55] },
  },
  {
    label: 'Lucide 2',
    note: 'drugi wybór',
    style: { set: 'lucide', stroke: 2 },
    crisp: { dpr1: [27, 32, 36, 54], dpr125: [36, 40, 48, 52] },
  },
  {
    label: 'Lucide 2,25',
    style: { set: 'lucide', stroke: 2.25 },
    crisp: { dpr1: [28, 35, 39, 52], dpr125: [39, 44, 51, 57] },
  },
  {
    label: 'Lucide, stała kreska 1,5 px',
    style: { set: 'lucide', stroke: 1.5, hairline: true },
    crisp: { dpr1: [28, 32, 32, 21], dpr125: [39, 40, 40, 42] },
  },
  {
    label: 'Lucide, stała kreska 2 px',
    style: { set: 'lucide', stroke: 2, hairline: true },
    crisp: { dpr1: [48, 42, 40, 54], dpr125: [49, 51, 50, 52] },
  },
  {
    label: 'Tabler 2',
    style: { set: 'tabler', stroke: 2 },
    crisp: { dpr1: [29, 32, 39, 56], dpr125: [39, 40, 44, 54] },
  },
  {
    label: 'Iconoir 1,5',
    style: { set: 'iconoir', stroke: 1.5 },
    crisp: { dpr1: [3, 23, 27, 15], dpr125: [27, 29, 37, 39] },
  },
  {
    label: 'Material Symbols Sharp',
    style: { set: 'ms' },
    crisp: { dpr1: [29, 35, 36, 71], dpr125: [36, 39, 48, 54] },
  },
]
