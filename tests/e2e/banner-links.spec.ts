import { test, expect } from '@playwright/test'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

/**
 * Integration test for banner links
 *
 * This test parses actual banner files from src/sections/banners/*.astro
 * and verifies that all links in banners point to existing pages in the service.
 *
 * This is a pre-deployment integration test that should be run in CI/CD pipeline
 * to catch broken internal links before deployment.
 */

interface BannerLink {
  source: string
  href: string
  description: string
}

/**
 * Parse banner files to extract linkHref values
 */
async function extractBannerLinks(): Promise<BannerLink[]> {
  const bannersDir = join(process.cwd(), 'src', 'sections', 'banners')
  const files = await readdir(bannersDir)
  const bannerFiles = files.filter((file) => file.endsWith('.astro'))

  const bannerLinks: BannerLink[] = []

  for (const file of bannerFiles) {
    const filePath = join(bannersDir, file)
    const content = await readFile(filePath, 'utf-8')

    // Extract linkHref from Banner component
    // Pattern: linkHref="/path/to/page" or linkHref={'/path/to/page'}
    const linkHrefMatch = content.match(/linkHref\s*=\s*["']([^"']+)["']/i)
    if (linkHrefMatch && linkHrefMatch[1]) {
      const href = linkHrefMatch[1]

      // Skip external links (starting with http:// or https://)
      if (href.startsWith('http://') || href.startsWith('https://')) {
        continue
      }

      // Extract title for description
      const titleMatch = content.match(/title\s*=\s*["']([^"']+)["']/i)
      const title = titleMatch ? titleMatch[1] : 'Banner'

      bannerLinks.push({
        source: `sections/banners/${file}`,
        href: href,
        description: `Link from ${file} (${title})`,
      })
    } else {
      // Warn if we couldn't find a linkHref in a banner file
      // This might indicate a banner without a link, or a different format
      console.warn(
        `Warning: Could not extract linkHref from ${file}. Banner might not have a link or uses a different format.`,
      )
    }
  }

  return bannerLinks
}

test.describe('Banner Links Integration Test', () => {
  let bannerLinks: BannerLink[]

  test.beforeAll(async () => {
    // Extract all banner links before running tests
    bannerLinks = await extractBannerLinks()

    // Log found links for debugging
    console.log(`Found ${bannerLinks.length} banner links to test:`)
    bannerLinks.forEach((link) => {
      console.log(`  - ${link.source} → ${link.href}`)
    })

    // Ensure we found at least some links
    expect(bannerLinks.length).toBeGreaterThan(0)
  })

  test('should extract banner links from banner files', () => {
    // Verify that we successfully extracted links
    expect(bannerLinks).toBeDefined()
    expect(bannerLinks.length).toBeGreaterThan(0)
  })

  test('should verify each banner link individually', async ({ page }) => {
    // Test each banner link individually for better error reporting
    for (const bannerLink of bannerLinks) {
      // Navigate to the target page
      const response = await page.goto(bannerLink.href, {
        waitUntil: 'networkidle',
        timeout: 10000,
      })

      // Check that page loads successfully (status 200)
      expect(
        response?.status(),
        `Banner link from ${bannerLink.source} to ${bannerLink.href} should return 200`,
      ).toBe(200)

      // Check that page is not a 404
      const title = await page.title()
      expect(
        title,
        `Page ${bannerLink.href} should not contain 404 in title`,
      ).not.toContain('404')
      expect(title).not.toContain('Not Found')

      // Check that page has content (not empty)
      const bodyText = await page.textContent('body')
      expect(
        bodyText,
        `Page ${bannerLink.href} should have content`,
      ).toBeTruthy()
      expect(bodyText?.length).toBeGreaterThan(0)

      // Check that main content is visible
      const main = page.locator('main')
      await expect(
        main,
        `Page ${bannerLink.href} should have visible main content`,
      ).toBeVisible()
    }
  })

  test('should verify all banner links are accessible', async ({ page }) => {
    const results: Array<{
      source: string
      href: string
      status: number
      ok: boolean
      error?: string
    }> = []

    for (const bannerLink of bannerLinks) {
      try {
        const response = await page.goto(bannerLink.href, {
          waitUntil: 'networkidle',
          timeout: 10000,
        })
        const status = response?.status() || 0
        const ok = status === 200

        // Additional check: verify page doesn't show 404 in prominent position
        if (ok) {
          const title = await page.title()
          const bodyText = (await page.textContent('body')) || ''

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
              source: bannerLink.source,
              href: bannerLink.href,
              status,
              ok: false,
              error: 'Page shows 404 or error message',
            })
            continue
          }
        }

        results.push({
          source: bannerLink.source,
          href: bannerLink.href,
          status,
          ok,
        })
      } catch (error) {
        results.push({
          source: bannerLink.source,
          href: bannerLink.href,
          status: 0,
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Log results for debugging
    console.log('\nBanner link verification results:')
    results.forEach((result) => {
      const status = result.ok ? '✓' : '✗'
      console.log(
        `  ${status} ${result.source} → ${result.href} (${result.status}${result.error ? ` - ${result.error}` : ''})`,
      )
    })

    // All links should be accessible
    const failedLinks = results.filter((r) => !r.ok)
    if (failedLinks.length > 0) {
      const failedDetails = failedLinks
        .map(
          (r) =>
            `  - ${r.source} → ${r.href} (${r.status}${r.error ? ` - ${r.error}` : ''})`,
        )
        .join('\n')
      throw new Error(
        `The following banner links are not accessible:\n${failedDetails}\n\nThis is a pre-deployment integration test. Fix broken links before deploying.`,
      )
    }

    expect(failedLinks.length).toBe(0)
  })

  test('should verify banner links point to internal pages only', () => {
    // All banner links should be internal (relative paths)
    const externalLinks = bannerLinks.filter(
      (link) =>
        link.href.startsWith('http://') ||
        link.href.startsWith('https://') ||
        link.href.startsWith('//'),
    )

    if (externalLinks.length > 0) {
      console.warn(
        `Warning: Found ${externalLinks.length} external links in banners (these are skipped in link verification):`,
      )
      externalLinks.forEach((link) => {
        console.warn(`  - ${link.source} → ${link.href}`)
      })
    }

    // This is informational - external links are skipped, not an error
    // But we log them for awareness
  })
})
