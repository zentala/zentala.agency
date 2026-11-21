import { createRequire } from 'node:module'

/**
 * The icon sets the dev-only design board can draw, read from the local iconify JSON
 * packages. A set is parsed on first use and only the glyphs a page asks for reach the
 * HTML, so no icon font and no CDN kit is involved.
 */
export type BoardIconSet = 'ph' | 'lucide' | 'tabler' | 'iconoir' | 'ms' | 'si' | 'fa'

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

/** `fa` is Font Awesome 6 Free (CC BY 4.0): brand marks first, then the regular style. */
const PACKAGES: Record<BoardIconSet, readonly string[]> = {
  ph: ['ph'],
  lucide: ['lucide'],
  tabler: ['tabler'],
  iconoir: ['iconoir'],
  ms: ['material-symbols'],
  si: ['simple-icons'],
  fa: ['fa6-brands', 'fa6-regular'],
}

export const SET_LABEL: Record<BoardIconSet, string> = {
  ph: 'Phosphor',
  lucide: 'Lucide',
  tabler: 'Tabler',
  iconoir: 'Iconoir',
  ms: 'Material Symbols Sharp',
  si: 'Simple Icons',
  fa: 'Font Awesome',
}

const DEFAULT_GRID = 24
const requireJson = createRequire(import.meta.url)
const loaded = new Map<string, IconifySet>()

function loadPackage(name: string): IconifySet {
  const cached = loaded.get(name)
  if (cached) return cached
  const set = requireJson(`@iconify-json/${name}/icons.json`) as IconifySet
  loaded.set(name, set)
  return set
}

/** Looks a glyph up by its name in the set; null when no package of the set has it. */
export function findGlyph(set: BoardIconSet, key: string): ResolvedIcon | null {
  for (const name of PACKAGES[set]) {
    const pack = loadPackage(name)
    const icon = pack.icons[key] ?? pack.icons[pack.aliases?.[key]?.parent ?? '']
    if (icon) {
      return {
        body: icon.body,
        width: icon.width ?? pack.width ?? DEFAULT_GRID,
        height: icon.height ?? pack.height ?? DEFAULT_GRID,
      }
    }
  }
  return null
}
