import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const DIST_DIR = join(__dirname, '../../dist')
const ASTRO_CONFIG_PATH = join(__dirname, '../../astro.config.mjs')

/**
 * Astro's `redirects` config option produces pages @astrojs/sitemap excludes
 * automatically. Ad-hoc `Astro.redirect()` calls inside a page's frontmatter
 * render an identical-looking stub but are NOT excluded by the sitemap
 * integration — so the two cannot be told apart by page content alone.
 * Read the declared source paths straight from the config this task owns.
 */
function redirectSourceDistPaths(): string[] {
  const config = readFileSync(ASTRO_CONFIG_PATH, 'utf-8')
  const block = config.match(/redirects:\s*{([^}]*)}/)?.[1] ?? ''
  const sources = [...block.matchAll(/'([^']+)':/g)].map((m) => m[1])
  return sources.map((source) => join(DIST_DIR, ...source.split('/').filter(Boolean), 'index.html'))
}

/**
 * Walks dist/ and returns every generated HTML file's absolute path.
 * Fails loudly (empty array is a bug, not a valid state) rather than
 * silently reporting zero pages as success.
 */
function listHtmlFiles(dir: string): string[] {
  const entries = readdirSync(dir)
  const files: string[] = []
  for (const entry of entries) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...listHtmlFiles(full))
    } else if (entry.endsWith('.html')) {
      files.push(full)
    }
  }
  return files
}

function isExcludedFromSitemap(path: string, configRedirectPaths: string[]): boolean {
  if (path === join(DIST_DIR, '404.html')) return true
  if (path.includes('linkedin-preview')) return true
  if (configRedirectPaths.includes(path)) return true
  return false
}

/**
 * Any page whose entire body is Astro's redirect stub — declared via the
 * `redirects` config OR an ad-hoc `Astro.redirect()` call — regardless of
 * which mechanism produced it. Used to keep the og:title check scoped to
 * actual content pages.
 */
function isRedirectStub(html: string): boolean {
  return html.startsWith('<!doctype html><title>Redirecting to:')
}

describe('SEO — built site (dist/)', () => {
  if (!existsSync(DIST_DIR)) {
    it.skip('dist/ not found — run `npx astro build` before this suite', () => {})
    return
  }

  const htmlFiles = listHtmlFiles(DIST_DIR)

  it('produced at least one page', () => {
    expect(htmlFiles.length).toBeGreaterThan(0)
  })

  it('every page has exactly one canonical link', () => {
    for (const file of htmlFiles) {
      const html = readFileSync(file, 'utf-8')
      const matches = html.match(/<link rel="canonical"/g) ?? []
      expect(matches.length, `${file} canonical count`).toBe(1)
    }
  })

  it('every real page has a non-empty og:title', () => {
    // Redirect stubs (meta-refresh only, any mechanism) carry no <head> meta
    // beyond the refresh — they are not content pages.
    const contentPages = htmlFiles.filter((file) => {
      if (file === join(DIST_DIR, '404.html')) return false
      return !isRedirectStub(readFileSync(file, 'utf-8'))
    })
    expect(contentPages.length).toBeGreaterThan(0)
    for (const file of contentPages) {
      const html = readFileSync(file, 'utf-8')
      const match = html.match(/<meta property="og:title" content="([^"]*)"/)
      expect(match, `${file} missing og:title`).not.toBeNull()
      expect(match?.[1].length ?? 0, `${file} og:title is empty`).toBeGreaterThan(0)
    }
  })

  it('sitemap URL count equals the number of indexable built routes', () => {
    const sitemapPath = join(DIST_DIR, 'sitemap-0.xml')
    expect(existsSync(sitemapPath), 'dist/sitemap-0.xml missing').toBe(true)
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    const sitemapUrlCount = (sitemap.match(/<loc>/g) ?? []).length

    const configRedirectPaths = redirectSourceDistPaths()
    const expectedRoutes = htmlFiles.filter(
      (file) => !isExcludedFromSitemap(file, configRedirectPaths),
    )

    expect(sitemapUrlCount).toBeGreaterThan(0)
    expect(sitemapUrlCount).toBe(expectedRoutes.length)
  })

  it('excludes /linkedin-preview/ routes from the sitemap', () => {
    const sitemapPath = join(DIST_DIR, 'sitemap-0.xml')
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    expect(sitemap.includes('linkedin-preview')).toBe(false)
  })
})
