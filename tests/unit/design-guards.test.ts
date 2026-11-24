import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Guards for the owner's rulings of 2026-11-20 (DESIGN.md): no orange, amber or yellow;
 * no underlined links; no bold type. They scan the code in src/ (templates, styles,
 * scripts); prose in src/content is not scanned. Each allowlist entry carries its reason.
 */

const SRC = join(process.cwd(), 'src')
const CODE_EXT = /\.(astro|scss|css|tsx|ts|jsx|js)$/

interface Source {
  path: string
  lines: string[]
}

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory())
      return name === 'content' ? [] : listFiles(full)
    return CODE_EXT.test(name) ? [full] : []
  })
}

const sources: Source[] = listFiles(SRC).map((file) => ({
  path: relative(SRC, file).split(sep).join('/'),
  lines: readFileSync(file, 'utf8').split(/\r?\n/),
}))

const COMMENT_LINE = /^\s*(?:\/\*|\/\/|\*|<!--)/

function findLines(
  pattern: RegExp,
  allowlist: Record<string, string> = {},
): string[] {
  return sources.flatMap(({ path, lines }) =>
    path in allowlist
      ? []
      : lines.flatMap((line, i) =>
          !COMMENT_LINE.test(line) && pattern.test(line)
            ? [`${path}:${i + 1}: ${line.trim()}`]
            : [],
        ),
  )
}

/** Hue, saturation and lightness of a 6-digit hex colour. */
function hsl(hex: string): { h: number; s: number; l: number } {
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  )
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h =
    max === r
      ? ((g - b) / d + (g < b ? 6 : 0)) * 60
      : max === g
        ? ((b - r) / d + 2) * 60
        : ((r - g) / d + 4) * 60
  return { h, s, l }
}

const WARM_HEX = /#[0-9a-fA-F]{6}\b/g
const KNOWN_WARM_HEXES = [
  '#f59e0b',
  '#fbbf24',
  '#f97316',
  '#eab308',
  '#facc15',
  '#fb923c',
  '#fcd34d',
  '#d97706',
  '#ea580c',
]

function isWarm(hex: string): boolean {
  if (KNOWN_WARM_HEXES.includes(hex.toLowerCase())) return true
  const { h, s, l } = hsl(hex)
  return h >= 20 && h <= 65 && s >= 0.5 && l >= 0.3 && l <= 0.85
}

/** Files that may contain an underline utility or declaration, each with the reason. */
const UNDERLINE_ALLOWLIST: Record<string, string> = {
  'components/blog/rich/Term.astro':
    'a glossary term that is not a link: dotted underline marks the defined word',
}

/** Files that may use a weight of 600 or more, each with the reason. Empty: nothing may. */
const BOLD_ALLOWLIST: Record<string, string> = {}

const TAILWIND_WARM =
  /(?<![\w-])(?:[a-z-]+:)*(?:bg|text|border|ring|from|via|to|fill|stroke|outline|decoration|divide|shadow|accent|caret)-(?:amber|orange|yellow)(?![\w-]*[a-z])/
const UNDERLINE_UTILITY =
  /(?<![\w-])(?:[a-z-]+:)*(?:underline|underline-offset-\d+|decoration-[\w/[\]-]+)(?![\w-])/
const BOLD_UTILITY =
  /(?<![\w-])(?:[a-z-]+:)*font-(?:bold|semibold|extrabold|black)(?![\w-])/
const BOLD_DECLARATION = /font-weight:\s*(?:bold|bolder|[6-9]00)(?!\d)/

describe('guard patterns fire on decoys', () => {
  it('catches each forbidden shape and passes the allowed one', () => {
    expect(TAILWIND_WARM.test('class="text-amber-400"')).toBe(true)
    expect(TAILWIND_WARM.test('class="hover:bg-orange-500/10"')).toBe(true)
    expect(TAILWIND_WARM.test('class="text-accent"')).toBe(false)
    expect(isWarm('#f59e0b') && isWarm('#e8a317') && isWarm('#d4b106')).toBe(
      true,
    )
    expect(isWarm('#60a5fa') || isWarm('#ffffff') || isWarm('#0d0d0d')).toBe(
      false,
    )
    expect(UNDERLINE_UTILITY.test('class="hover:underline"')).toBe(true)
    expect(UNDERLINE_UTILITY.test('class="underline-offset-4"')).toBe(true)
    expect(UNDERLINE_UTILITY.test('class="no-underline"')).toBe(false)
    expect(BOLD_UTILITY.test('class="md:font-semibold"')).toBe(true)
    expect(BOLD_UTILITY.test('class="font-medium"')).toBe(false)
    expect(BOLD_DECLARATION.test('font-weight: 600;')).toBe(true)
    expect(BOLD_DECLARATION.test('font-weight: 500;')).toBe(false)
  })
})

describe('colour restraint', () => {
  it('has no warn colour role', () => {
    expect(
      findLines(/--color-warn|\b(?:text|bg|border|ring|fill|stroke)-warn\b/),
    ).toEqual([])
  })

  it('uses no amber, orange or yellow Tailwind class', () => {
    const tailwind =
      /\b(?:[a-z-]+:)*(?:bg|text|border|ring|from|via|to|fill|stroke|outline|decoration|divide|shadow|accent|caret)-(?:amber|orange|yellow)(?:-\d{2,3})?\b/
    expect(findLines(tailwind)).toEqual([])
  })

  it('uses no orange, amber or yellow hex', () => {
    const offenders = sources.flatMap(({ path, lines }) =>
      lines.flatMap((line, i) =>
        (line.match(WARM_HEX) ?? [])
          .filter(isWarm)
          .map((hex) => `${path}:${i + 1}: ${hex}`),
      ),
    )
    expect(offenders).toEqual([])
  })

  it('sees no warm hex in the logo data because it stores bare digits', () => {
    const logoData = sources.find(({ path }) => path === 'data/tech-icons.ts')
    expect(logoData).toBeDefined()
    expect(logoData?.lines.filter((line) => WARM_HEX.test(line))).toEqual([])
  })
})

describe('no underlined links', () => {
  it('uses no underline utility', () => {
    expect(findLines(UNDERLINE_UTILITY, UNDERLINE_ALLOWLIST)).toEqual([])
  })

  it('declares no text-decoration underline', () => {
    expect(
      findLines(
        /text-decoration(?:-line)?:\s*[^;]*underline/,
        UNDERLINE_ALLOWLIST,
      ),
    ).toEqual([])
  })
})

describe('no bold type', () => {
  it('uses no bold Tailwind class', () => {
    expect(findLines(BOLD_UTILITY, BOLD_ALLOWLIST)).toEqual([])
  })

  it('declares no font-weight of 600 or more', () => {
    expect(
      findLines(/font-weight:\s*(?:bold|bolder|[6-9]00)\b/, BOLD_ALLOWLIST),
    ).toEqual([])
  })

  it('keeps every allowlist entry pointing at an existing file', () => {
    const known = new Set(sources.map((s) => s.path))
    const stale = [
      ...Object.keys(UNDERLINE_ALLOWLIST),
      ...Object.keys(BOLD_ALLOWLIST),
    ].filter((p) => !known.has(p))
    expect(stale).toEqual([])
  })

  it('keeps no allowlist entry that has nothing to allow', () => {
    const offender = new RegExp(
      `${BOLD_UTILITY.source}|${BOLD_DECLARATION.source}`,
    )
    const unused = Object.keys(BOLD_ALLOWLIST).filter(
      (path) =>
        !sources.some(
          (s) => s.path === path && s.lines.some((l) => offender.test(l)),
        ),
    )
    expect(unused).toEqual([])
  })
})
