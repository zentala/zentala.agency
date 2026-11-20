import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveIconName } from '@/lib/siteIcon'

/**
 * Guard for the one icon set: UI icons render through SiteIcon (Phosphor Light) and
 * technology logos through TechIcon (simple-icons). Nothing else may import astro-icon,
 * name a Lucide or non-light Phosphor icon, or draw an inline icon <svg>.
 */

const SRC = join(process.cwd(), 'src')
const RENDERERS = new Set([
  'components/primitives/SiteIcon.astro',
  'components/primitives/TechIcon.astro',
])
const SOURCE_EXT = /\.(astro|tsx|ts|jsx|mdx)$/

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

const files = listSources(SRC)
  .map((file) => ({
    path: relative(SRC, file).split(sep).join('/'),
    text: readFileSync(file, 'utf8'),
  }))
  .filter((file) => !file.path.startsWith('content/'))

const offenders = (test: (file: { path: string; text: string }) => boolean) =>
  files.filter(test).map((file) => file.path)

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
      offenders(
        (f) => /lucide[:-]/i.test(f.text) && f.path !== 'lib/siteIcon.ts',
      ),
    ).toEqual([])
  })

  it('names no Phosphor icon outside the light weight', () => {
    expect(
      offenders(
        (f) =>
          f.path !== 'lib/siteIcon.ts' &&
          [...f.text.matchAll(/['"`]ph:([a-z0-9-]+)['"`]/g)].some(
            (m) => !m[1].endsWith('-light'),
          ),
      ),
    ).toEqual([])
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

  it('resolves every short icon name used by callers to a real Phosphor Light icon', () => {
    const used = new Set<string>()
    for (const f of files) {
      for (const m of f.text.matchAll(
        /\b(?:icon|eyebrowIcon|backgroundIcon)(?:=|:\s*)['"]([a-z][a-z0-9-]+)['"]/g,
      ))
        used.add(m[1])
      for (const m of f.text.matchAll(/<SiteIcon\s+name="([a-z][a-z0-9-]+)"/g))
        used.add(m[1])
    }
    expect(used.size).toBeGreaterThan(10)
    for (const name of used) expect(() => resolveIconName(name), name).not.toThrow()
  })

  it('rejects an unknown icon name', () => {
    expect(() => resolveIconName('no-such-icon')).toThrow()
  })
})
