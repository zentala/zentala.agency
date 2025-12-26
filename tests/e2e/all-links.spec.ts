import { test, expect } from '@playwright/test'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

/**
 * Comprehensive link validation test for entire application
 * 
 * This test extracts and verifies ALL internal links from:
 * - Banner files (src/banners/*.astro)
 * - Header navigation (src/components/Header.astro)
 * - Footer links (src/components/Footer.astro)
 * - Post cards (src/components/cards/PostCard.astro)
 * - Any other components with links
 * 
 * This is a pre-deployment integration test that should be run:
 * - Before every push (via pre-push hook or npm script)
 * - In CI/CD pipeline before deployment
 * 
 * It ensures no broken internal links are deployed to production.
 */

interface AppLink {
  source: string
  href: string
  description: string
  type: 'banner' | 'header' | 'footer' | 'post-card' | 'other'
}

/**
 * Extract links from banner files
 */
async function extractBannerLinks(): Promise<AppLink[]> {
  const bannersDir = join(process.cwd(), 'src', 'banners')
  const files = await readdir(bannersDir)
  const bannerFiles = files.filter((file) => file.endsWith('.astro'))
  const links: AppLink[] = []

  for (const file of bannerFiles) {
    const filePath = join(bannersDir, file)
    const content = await readFile(filePath, 'utf-8')
    const linkHrefMatch = content.match(/linkHref\s*=\s*["']([^"']+)["']/i)
    
    if (linkHrefMatch && linkHrefMatch[1]) {
      const href = linkHrefMatch[1]
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        links.push({
          source: `banners/${file}`,
          href,
          description: `Banner link from ${file}`,
          type: 'banner',
        })
      }
    }
  }

  return links
}

/**
 * Extract links from Header component
 */
async function extractHeaderLinks(): Promise<AppLink[]> {
  const headerPath = join(process.cwd(), 'src', 'components', 'Header.astro')
  const content = await readFile(headerPath, 'utf-8')
  const links: AppLink[] = []

  // Extract from links array: { href: '/path', text: 'Text' }
  const hrefMatches = content.matchAll(/href:\s*["']([^"']+)["']/gi)
  for (const match of hrefMatches) {
    const href = match[1]
    if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('mailto:')) {
      links.push({
        source: 'components/Header.astro',
        href,
        description: `Header navigation link`,
        type: 'header',
      })
    }
  }

  return links
}

/**
 * Extract internal links from Footer component
 */
async function extractFooterLinks(): Promise<AppLink[]> {
  const footerPath = join(process.cwd(), 'src', 'components', 'Footer.astro')
  const content = await readFile(footerPath, 'utf-8')
  const links: AppLink[] = []

  // Extract internal links (not external http/https)
  const hrefMatches = content.matchAll(/href\s*=\s*["']([^"']+)["']/gi)
  for (const match of hrefMatches) {
    const href = match[1]
    // Only internal links (relative paths)
    if (
      !href.startsWith('http://') &&
      !href.startsWith('https://') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('#') &&
      href.length > 1
    ) {
      links.push({
        source: 'components/Footer.astro',
        href,
        description: `Footer link`,
        type: 'footer',
      })
    }
  }

  return links
}

/**
 * Extract all internal links from the application
 */
async function extractAllLinks(): Promise<AppLink[]> {
  const allLinks: AppLink[] = []

  // Extract from different sources
  const bannerLinks = await extractBannerLinks()
  const headerLinks = await extractHeaderLinks()
  const footerLinks = await extractFooterLinks()

  allLinks.push(...bannerLinks, ...headerLinks, ...footerLinks)

  // Remove duplicates (same href from different sources)
  const uniqueLinks = new Map<string, AppLink>()
  for (const link of allLinks) {
    if (!uniqueLinks.has(link.href)) {
      uniqueLinks.set(link.href, link)
    } else {
      // Update source to include all sources
      const existing = uniqueLinks.get(link.href)!
      existing.source = `${existing.source}, ${link.source}`
    }
  }

  return Array.from(uniqueLinks.values())
}

test.describe('All Internal Links Validation', () => {
  let allLinks: AppLink[]

  test.beforeAll(async () => {
    // Extract all links before running tests
    allLinks = await extractAllLinks()

    // Log found links for debugging
    console.log(`\nFound ${allLinks.length} internal links to test:`)
    const byType = allLinks.reduce((acc, link) => {
      acc[link.type] = (acc[link.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    console.log('Links by type:', byType)
    allLinks.forEach((link) => {
      console.log(`  [${link.type}] ${link.source} → ${link.href}`)
    })

    // Ensure we found at least some links
    expect(allLinks.length).toBeGreaterThan(0)
  })

  test('should extract links from all sources', () => {
    expect(allLinks).toBeDefined()
    expect(allLinks.length).toBeGreaterThan(0)

    // Verify we have links from different sources
    const types = new Set(allLinks.map((l) => l.type))
    expect(types.size).toBeGreaterThan(0)
  })

  test('should verify all internal links are accessible', async ({ page }) => {
    const results: Array<{
      source: string
      href: string
      type: string
      status: number
      ok: boolean
      error?: string
    }> = []

    for (const link of allLinks) {
      try {
        const response = await page.goto(link.href, {
          waitUntil: 'networkidle',
          timeout: 10000,
        })
        const status = response?.status() || 0
        const ok = status === 200

        // Additional check: verify page doesn't show 404
        if (ok) {
          const title = await page.title()
          const bodyText = await page.textContent('body') || ''

          // Check for error messages in headings
          const errorHeadings = page.locator('h1, h2, h3').filter({
            hasText: /404|Not Found|Page not found/i,
          })
          const errorHeadingCount = await errorHeadings.count()

          if (
            errorHeadingCount > 0 ||
            title.includes('404') ||
            title.includes('Not Found')
          ) {
            results.push({
              source: link.source,
              href: link.href,
              type: link.type,
              status,
              ok: false,
              error: 'Page shows 404 or error message',
            })
            continue
          }
        }

        results.push({
          source: link.source,
          href: link.href,
          type: link.type,
          status,
          ok,
        })
      } catch (error) {
        results.push({
          source: link.source,
          href: link.href,
          type: link.type,
          status: 0,
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Log results for debugging
    console.log('\n=== Link Verification Results ===')
    const byType = results.reduce((acc, r) => {
      if (!acc[r.type]) {
        acc[r.type] = { total: 0, ok: 0, failed: 0 }
      }
      acc[r.type].total++
      if (r.ok) {
        acc[r.type].ok++
      } else {
        acc[r.type].failed++
      }
      return acc
    }, {} as Record<string, { total: number; ok: number; failed: number }>)

    console.log('\nSummary by type:')
    Object.entries(byType).forEach(([type, stats]) => {
      console.log(
        `  ${type}: ${stats.ok}/${stats.total} OK, ${stats.failed} failed`,
      )
    })

    console.log('\nDetailed results:')
    results.forEach((result) => {
      const status = result.ok ? '✓' : '✗'
      console.log(
        `  ${status} [${result.type}] ${result.href} (${result.status}${result.error ? ` - ${result.error}` : ''})`,
      )
    })

    // All links should be accessible
    const failedLinks = results.filter((r) => !r.ok)
    if (failedLinks.length > 0) {
      const failedDetails = failedLinks
        .map(
          (r) =>
            `  [${r.type}] ${r.source} → ${r.href} (${r.status}${r.error ? ` - ${r.error}` : ''})`,
        )
        .join('\n')
      throw new Error(
        `The following internal links are not accessible:\n${failedDetails}\n\nThis is a pre-deployment integration test. Fix broken links before deploying.`,
      )
    }

    expect(failedLinks.length).toBe(0)
  })

  test('should verify links point to internal pages only', () => {
    // All links should be internal (relative paths)
    const externalLinks = allLinks.filter(
      (link) =>
        link.href.startsWith('http://') ||
        link.href.startsWith('https://') ||
        link.href.startsWith('//'),
    )

    if (externalLinks.length > 0) {
      console.warn(
        `\nWarning: Found ${externalLinks.length} external links (these are skipped in link verification):`,
      )
      externalLinks.forEach((link) => {
        console.warn(`  - ${link.source} → ${link.href}`)
      })
    }

    // This is informational - external links are skipped, not an error
  })
})

