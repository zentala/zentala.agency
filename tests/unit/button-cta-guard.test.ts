import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Guard for DESIGN.md "Buttons" (DB-2): at most one `cta` tier button per page.
 * It reads the built HTML in dist/, so it sees what a visitor sees, whichever
 * component or data object produced the button. Run `npm run build` first.
 */

const DIST_DIR = join(process.cwd(), 'dist')
const CTA_BUTTON = /class="[^"]*\b(?:button|section-cta)--cta\b/g
const MIN_PAGES = 10

function listHtml(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return listHtml(full)
    return name.endsWith('.html') ? [full] : []
  })
}

describe('one cta tier button per page (built site)', () => {
  if (!existsSync(DIST_DIR)) {
    // `just check` builds first; a missing dist/ must fail, never pass silently.
    it('needs dist/ to exist: run `npm run build` first', () => {
      expect(existsSync(DIST_DIR)).toBe(true)
    })
    return
  }

  const pages = listHtml(DIST_DIR).map((file) => ({
    route: relative(DIST_DIR, file),
    ctaCount: (readFileSync(file, 'utf8').match(CTA_BUTTON) ?? []).length,
  }))

  it('scans the built pages', () => {
    expect(pages.length).toBeGreaterThan(MIN_PAGES)
  })

  it('finds a cta button on the pages that carry the main action', () => {
    const withCta = pages.filter((page) => page.ctaCount > 0)
    expect(withCta.map((page) => page.route)).toContain(join('contact', 'index.html'))
  })

  it('has no page with more than one cta button', () => {
    const offenders = pages
      .filter((page) => page.ctaCount > 1)
      .map((page) => `${page.route}: ${page.ctaCount}`)
    expect(offenders).toEqual([])
  })
})
