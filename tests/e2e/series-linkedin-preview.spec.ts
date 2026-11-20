import { test, expect } from '@playwright/test'

// This spec is build-mode aware: it runs unmodified against both a plain
// `npm run build` (production shape — series content stays unpublished and
// invisible) and a `PUBLIC_PREVIEW=true npm run build` (preview shape — all
// seed entries and their LinkedIn drafts render). It detects which mode
// the server under test was built in from the `/series/agent-native-harness`
// response and asserts the matching contract, so one file covers both
// variants named in ORCHESTRATOR.md T08 without needing two servers.

const SERIES_SLUG = 'agent-native-harness'
/** Has four published parts, so the thin-series rule keeps it in production. */
const VISIBLE_SERIES_SLUG = 'developer-experience'
const SERIES_PART_1_SLUG = 'shaking-the-idea-tree'
const UNPUBLISHED_SERIES_SLUGS = [
  SERIES_PART_1_SLUG,
  'agents-leave-feedback-about-their-tooling',
  'autogeneration-agent-writes-its-own-environment',
  'parallel-agents-in-one-repo',
  'bang-commands-zero-token-cli-for-agents',
  'no-more-localhost-3000',
  'the-context-ladder',
  'the-personal-knowledge-base-system',
]
const LINKEDIN_DRAFT_SLUGS = [
  'shaking-the-idea-tree',
  'bang-commands-zero-token-cli-for-agents',
  'the-personal-knowledge-base-system',
]
const PUBLISHED_SERIES_POST = 'devex-purpose'
const PUBLISHED_SLUG = 'how-to-deal-with-resistance-when-implementing-dev-portal'

test.describe('Series index — mode aware', () => {
  test('series route lists the published parts of the series', async ({ page }) => {
    // A series with at least two published parts keeps its route in every
    // build (thin-series rule, docs/agents/blog-content.md).
    const response = await page.goto(`/series/${VISIBLE_SERIES_SLUG}`)
    expect(response?.status()).toBe(200)
    expect(await page.locator('.post-card').count()).toBeGreaterThanOrEqual(2)
  })

  test('a series with fewer than two published parts has no route in production', async ({
    page,
  }) => {
    const probe = await page.goto(`/blog/${SERIES_PART_1_SLUG}`)
    const isPreviewBuild = probe?.status() !== 404
    const response = await page.goto(`/series/${SERIES_SLUG}`)
    expect(response?.status()).toBe(isPreviewBuild ? 200 : 404)
  })

  test('unpublished series articles follow the same visibility as the preview build', async ({
    page,
  }) => {
    const probe = await page.goto(`/blog/${SERIES_PART_1_SLUG}`)
    const isPreviewBuild = probe?.status() !== 404

    for (const slug of UNPUBLISHED_SERIES_SLUGS) {
      const response = await page.goto(`/blog/${slug}`)
      expect(response?.status()).toBe(isPreviewBuild ? 200 : 404)
    }
  })

  test('series navigation resolves on a published article page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(`/blog/${PUBLISHED_SERIES_POST}`)
    const nav = page.getByRole('navigation', { name: 'Series navigation' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link').first()).toBeVisible()
  })
})

test.describe('LinkedIn preview route — mode aware', () => {
  test('404s on a plain build for every slug, including a published article', async ({
    page,
  }) => {
    const probe = await page.goto(`/linkedin-preview/${LINKEDIN_DRAFT_SLUGS[0]}`)
    const isPreviewBuild = probe?.status() !== 404
    test.skip(isPreviewBuild, 'this assertion only applies to the plain build')

    for (const slug of [...LINKEDIN_DRAFT_SLUGS, PUBLISHED_SLUG]) {
      const response = await page.goto(`/linkedin-preview/${slug}`)
      expect(response?.status()).toBe(404)
    }
  })

  test('renders a LinkedInPostCard for every seed with a draft under preview', async ({
    page,
  }) => {
    const probe = await page.goto(`/linkedin-preview/${LINKEDIN_DRAFT_SLUGS[0]}`)
    test.skip(probe?.status() === 404, 'linkedin-preview route not built in this mode')

    for (const slug of LINKEDIN_DRAFT_SLUGS) {
      const response = await page.goto(`/linkedin-preview/${slug}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('.li-card')).toBeVisible()
      await expect(page.locator('.li-card__link')).toHaveAttribute(
        'href',
        `/blog/${slug}`,
      )
    }
  })

  test('a published article without a linkedinPost still 404s under preview', async ({
    page,
  }) => {
    const probe = await page.goto(`/linkedin-preview/${LINKEDIN_DRAFT_SLUGS[0]}`)
    test.skip(probe?.status() === 404, 'linkedin-preview route not built in this mode')

    const response = await page.goto(`/linkedin-preview/${PUBLISHED_SLUG}`)
    expect(response?.status()).toBe(404)
  })
})
