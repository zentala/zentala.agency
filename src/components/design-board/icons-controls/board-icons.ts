import phIcons from '@iconify-json/ph/icons.json'
import lucideIcons from '@iconify-json/lucide/icons.json'
import simpleIcons from '@iconify-json/simple-icons/icons.json'

/**
 * Icon lookup for the dev-only design board. It compares icon sets side by side, so it
 * reads several sets on purpose. The site itself keeps one renderer and one map.
 */

/** `fa` is the Font Awesome 6 artwork the original footer used (CC BY 4.0), kept only for option A. */
export type BoardIconSet = 'ph' | 'lucide' | 'si' | 'fa'
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

export interface ResolvedIcon {
  body: string
  width: number
  height: number
}

interface IconifyIcon {
  body: string
  width?: number
  height?: number
}

interface IconifySet {
  icons: Record<string, IconifyIcon>
  aliases?: Record<string, { parent: string }>
  width?: number
  height?: number
}

const LEGACY_FA: IconifySet = {
  width: 512,
  height: 512,
  icons: {
    linkedin: {
      width: 448,
      body: '<path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3M135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5c0 21.3-17.2 38.5-38.5 38.5m282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7c-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5c67.2 0 79.7 44.3 79.7 101.9z"/>',
    },
    github: {
      width: 496,
      body: '<path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6m-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3m44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9M244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8M97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1m-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7m32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1m-11.4-14.7c-1.6 1-1.6 3.6 0 5.9s4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2"/>',
    },
    envelope: {
      body: '<path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1l172.5 141.6c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16zM48 212.2V384c0 8.8 7.2 16 16 16h384c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0zM0 128c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64z"/>',
    },
  },
}

const SETS: Record<BoardIconSet, IconifySet> = {
  ph: phIcons as IconifySet,
  lucide: lucideIcons as IconifySet,
  si: simpleIcons as IconifySet,
  fa: LEGACY_FA,
}

const DEFAULT_GRID = 24
const SOURCE_STROKE = 'stroke-width="2"'

function iconKey(spec: BoardIconSpec): string {
  if (spec.set !== 'ph' || !spec.weight || spec.weight === 'regular')
    return spec.name
  return `${spec.name}-${spec.weight}`
}

/** Resolves a spec to drawable SVG data. Throws on an unknown name so a typo fails the page. */
export function resolveBoardIcon(spec: BoardIconSpec): ResolvedIcon {
  const set = SETS[spec.set]
  const key = iconKey(spec)
  const icon = set.icons[key] ?? set.icons[set.aliases?.[key]?.parent ?? '']
  if (!icon) throw new Error(`Design board: no icon "${key}" in set "${spec.set}"`)
  const body =
    spec.set === 'lucide'
      ? icon.body.replaceAll(SOURCE_STROKE, `stroke-width="${spec.stroke ?? 2}"`)
      : icon.body
  return {
    body,
    width: icon.width ?? set.width ?? DEFAULT_GRID,
    height: icon.height ?? set.height ?? DEFAULT_GRID,
  }
}

/** A one-line description of a spec for the caption under each sample. */
export function describeBoardIcon(spec: BoardIconSpec): string {
  const SET_LABEL: Record<BoardIconSet, string> = {
    ph: 'Phosphor',
    lucide: 'Lucide',
    si: 'Simple Icons',
    fa: 'Font Awesome',
  }
  const weight = spec.set === 'ph' ? ` ${spec.weight ?? 'regular'}` : ''
  const stroke =
    spec.set === 'lucide'
      ? spec.hairline
        ? ` kreska ${spec.stroke}px stała`
        : ` kreska ${spec.stroke ?? 2}`
      : ''
  return `${SET_LABEL[spec.set]}${weight}${stroke} · ${spec.size}px`
}
