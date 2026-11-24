import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import phIcons from '@iconify-json/ph/icons.json'
import fa6Brands from '@iconify-json/fa6-brands/icons.json'
import fa6Regular from '@iconify-json/fa6-regular/icons.json'
import { ICON_MAP } from '@/lib/icons/icon-map'
import {
  ICON_WEIGHTS,
  iconPx,
  iconWeightForSize,
  phosphorName,
  resolveIconName,
  type IconWeight,
} from '@/lib/siteIcon'

/**
 * Guard for the one icon set: UI icons render through SiteIcon (Phosphor, weight by rendered
 * size, glyphs only through the icon map) and technology logos through TechIcon (simple-icons).
 * Nothing else may import astro-icon, name a Lucide or raw Phosphor icon, or draw an inline icon <svg>.
 */

const SRC = join(process.cwd(), 'src')
const RENDERERS = new Set([
  'components/primitives/SiteIcon.astro',
  'components/primitives/TechIcon.astro',
  'components/primitives/BrandIcon.astro',
])
const SOURCE_EXT = /\.(astro|tsx|ts|jsx|mdx)$/

/**
 * The dev-only design board (/mockups/design-board) shows the owner other icon sets side
 * by side so he can choose one; it must name them. The mockup registry imports it only in
 * DEV, and the prod-bundle audit keeps it out of dist.
 */
const COMPARISON_BOARD = 'components/design-board/'

/** Files allowed to contain an inline <svg>, each with the reason. Keys are paths relative to src. */
const INLINE_SVG_ALLOWLIST: Record<string, string> = {
  'components/Logo.astro': 'the site logo: brand artwork, not a UI icon',
  'components/react-stuff/dev/blog-version-panel/DiffDialog.tsx':
    'dev-only React panel: GitHub mark; React islands cannot use astro-icon',
  'components/react-stuff/dev/blog-version-panel/VersionTimeline.tsx':
    'dev-only React panel: GitHub mark; React islands cannot use astro-icon',
}

function listSources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return listSources(full)
    return SOURCE_EXT.test(name) ? [full] : []
  })
}

const sources = listSources(SRC)
  .map((file) => ({
    path: relative(SRC, file).split(sep).join('/'),
    text: readFileSync(file, 'utf8'),
  }))
  .filter((file) => !file.path.startsWith('content/'))
const files = sources.filter((file) => !file.path.startsWith(COMPARISON_BOARD))

const offenders = (test: (file: { path: string; text: string }) => boolean) =>
  files.filter(test).map((file) => file.path)

/**
 * Icon meanings that callers name: SiteIcon names, `icon` props and keys, mosaic lists,
 * `const icon = cond ? 'a' : 'b'` picks and the `VARIANT_ICON` table of NoteBox.
 */
function usedMeanings(scanned = files): Set<string> {
  const used = new Set<string>()
  for (const f of scanned) {
    for (const pick of f.text.matchAll(/const icon = [^\n]*/g))
      for (const m of pick[0].matchAll(/'([a-z][a-z0-9-]+)'/g)) used.add(m[1])
    for (const table of f.text.matchAll(/VARIANT_ICON = \{([^}]*)\}/g))
      for (const m of table[1].matchAll(/:\s*'([a-z][a-z0-9-]+)'/g)) used.add(m[1])
    for (const m of f.text.matchAll(
      /\b(?:icon|eyebrowIcon|labelIcon|backgroundIcon)(?:=|:\s*)['"]([a-z][a-z0-9-]+)['"]/g,
    ))
      used.add(m[1])
    for (const m of f.text.matchAll(/<SiteIcon\s+name="([a-z][a-z0-9-]+)"/g)) used.add(m[1])
    for (const list of f.text.matchAll(/icons=\{\[([^\]]*)\]\}/g))
      for (const m of list[1].matchAll(/'([a-z][a-z0-9-]+)'/g)) used.add(m[1])
  }
  return used
}

describe('icon set guard', () => {
  it('scans the source tree', () => {
    expect(files.length).toBeGreaterThan(50)
  })

  it('imports astro-icon only in SiteIcon and TechIcon', () => {
    expect(
      offenders(
        (f) => /from 'astro-icon/.test(f.text) && !RENDERERS.has(f.path),
      ),
    ).toEqual([])
  })

  it('names no Lucide icon', () => {
    expect(
      offenders((f) => /lucide[:-]/i.test(f.text)),
    ).toEqual([])
  })

  it('passes no raw "ph:" name: callers name a meaning', () => {
    expect(offenders((f) => /['"`]ph:[a-z0-9-]/.test(f.text))).toEqual([])
  })

  it('draws no inline <svg> outside the allowlist', () => {
    expect(
      offenders((f) => /<svg[\s>]/.test(f.text) && !(f.path in INLINE_SVG_ALLOWLIST)),
    ).toEqual([])
  })

  it('keeps every allowlisted file in use', () => {
    for (const path of Object.keys(INLINE_SVG_ALLOWLIST)) {
      const file = files.find((f) => f.path === path)
      expect(file, path).toBeDefined()
      expect(/<svg[\s>]/.test(file!.text), path).toBe(true)
    }
  })

  it('resolves every icon meaning used by callers through the icon map', () => {
    const used = usedMeanings()
    expect(used.size).toBeGreaterThan(40)
    for (const name of used) {
      expect(Object.keys(ICON_MAP), name).toContain(name)
      expect(() => resolveIconName(name, 20), name).not.toThrow()
    }
  })

  it('keeps no icon map entry that no caller uses', () => {
    const used = usedMeanings(sources.filter((f) => f.path !== 'lib/icons/icon-map.ts'))
    const unused = Object.keys(ICON_MAP).filter((name) => !used.has(name))
    expect(unused).toEqual([])
  })

  it('rejects an unknown icon meaning, including a raw Phosphor name', () => {
    expect(() => resolveIconName('no-such-icon', 20)).toThrow()
    expect(() => resolveIconName('calendar-blank', 20)).toThrow()
  })
})

describe('footer and header icons', () => {
  const read = (path: string) => sources.find((f) => f.path === path)!.text

  it('resolves every BrandIcon glyph in the installed Font Awesome sets', () => {
    const glyphs = [
      ...read('components/primitives/BrandIcon.astro').matchAll(
        /'fa6-(brands|regular):([a-z0-9-]+)'/g,
      ),
    ]
    expect(glyphs).toHaveLength(3)
    for (const [, set, name] of glyphs) {
      const icons = (set === 'brands' ? fa6Brands : fa6Regular).icons as Record<string, unknown>
      expect(name in icons, `${set}:${name}`).toBe(true)
    }
  })

  it('draws the footer marks with BrandIcon', () => {
    const footer = read('components/Footer.astro')
    for (const name of ['linkedin', 'github', 'email']) {
      expect(footer).toContain(`<BrandIcon name="${name}"`)
    }
  })

  it('draws card backgrounds at 176 px Thin and nav icons at 18 px Bold', () => {
    expect(read('components/primitives/CardBackgroundIcon.astro')).toMatch(
      /BACKGROUND_ICON_PX = 176/,
    )
    expect(read('components/Header.astro')).toMatch(/NAV_ICON_SIZE = 18/)
    expect(iconWeightForSize(176)).toBe('thin')
    expect(iconWeightForSize(18)).toBe('bold')
  })

  it('draws header nav icons with SiteIcon and no board NavIcon', () => {
    expect(read('components/Header.astro')).toContain('<SiteIcon name={link.icon}')
    expect(sources.filter((f) => /NavIcon/.test(f.text)).map((f) => f.path)).toEqual([])
  })
})

describe('icon weight by size', () => {
  const BANDS: [number, IconWeight][] = [
    [16, 'bold'],
    [18, 'bold'],
    [20, 'bold'],
    [24, 'regular'],
    [32, 'light'],
    [40, 'light'],
    [48, 'light'],
    [63, 'light'],
    [64, 'thin'],
    [96, 'thin'],
    [176, 'thin'],
  ]

  it.each(BANDS)('%i px draws %s', (px, weight) => {
    expect(iconWeightForSize(px)).toBe(weight)
    expect(resolveIconName('date', px)).toBe(`ph:${phosphorName('calendar-blank', weight)}`)
  })

  it('names the sm, md and lg sizes 16, 20 and 24 px', () => {
    expect(['sm', 'md', 'lg'].map((size) => iconPx(size as 'sm'))).toEqual([16, 20, 24])
  })

  it('rejects a fractional size and a size under 16 px', () => {
    expect(() => iconPx(17.5)).toThrow()
    expect(() => iconPx(12)).toThrow()
  })

  it('has every map glyph in every weight it can render at', () => {
    const known = phIcons.icons as Record<string, unknown>
    const aliases = (phIcons as { aliases?: Record<string, unknown> }).aliases ?? {}
    const missing = Object.entries(ICON_MAP).flatMap(([meaning, base]) =>
      ICON_WEIGHTS.map((weight) => ({ meaning, name: phosphorName(base, weight) })).filter(
        ({ name }) => !(name in known) && !(name in aliases),
      ),
    )
    expect(missing).toEqual([])
  })
})
