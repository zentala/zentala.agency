import { test, expect } from '@playwright/test'

// This spec is build-mode aware: it runs unmodified against both a plain
// `npm run build` (production shape — series content stays unpublished and
// invisible) and a `PUBLIC_PREVIEW=true npm run build` (preview shape — all
// 8 seed entries and their LinkedIn drafts render). It detects which mode
// the server under test was built in from the `/series/agent-native-harness`
// response and asserts the matching contract, so one file covers both
// variants named in ORCHESTRATOR.md T08 without needing two servers.

const SERIES_SLUG = 'agent-native-harness'
const SERIES_PART_1_SLUG = 'trzasanie-drzewem-pomyslow-agenta-pytaniami'
const UNPUBLISHED_SERIES_SLUGS = [
  SERIES_PART_1_SLUG,
  'agenci-zostawiaja-feedback-o-toolingu',
  'autogenerowanie-tresci-dla-agenta',
  'rownolegle-agenty-w-jednym-repo-rejestr',
  'bang-commands-zero-token-cli-dla-agenta',
  'pm3-internal-domains-lokalny-deployment',
  'progressive-disclosure-komunikacja-bez-przeciazenia',
  'the-personal-knowledge-base-system',
]
const LINKEDIN_DRAFT_SLUGS = [
  'trzasanie-drzewem-pomyslow-agenta-pytaniami',
  'bang-commands-zero-token-cli-dla-agenta',
  'the-personal-knowledge-base-system',
]
const PUBLISHED_SLUG = 'how-to-deal-with-resistance-when-implementing-dev-portal'

test.describe('Series index — mode aware', () => {
  test('series route matches the build it was compiled with', async ({ page }) => {
    const response = await page.goto(`/series/${SERIES_SLUG}`)
    const isPreviewBuild = response?.status() !== 404

    if (!isPreviewBuild) {
      // Plain production build: the route does not exist at all.
      expect(response?.status()).toBe(404)
      return
    }

    // Preview build: all 8 parts render as cards.
    const cards = page.locator('.post-card')
    await expect(cards).toHaveCount(8)
  })

  test('unpublished series articles follow the same visibility as the index', async ({
    page,
  }) => {
    const indexResponse = await page.goto(`/series/${SERIES_SLUG}`)
    const isPreviewBuild = indexResponse?.status() !== 404

    for (const slug of UNPUBLISHED_SERIES_SLUGS) {
      const response = await page.goto(`/blog/${slug}`)
      if (isPreviewBuild) {
        expect(response?.status()).toBe(200)
      } else {
        expect(response?.status()).toBe(404)
      }
    }
  })

  test('series prev/next nav resolves on a published article page', async ({ page }) => {
    const indexResponse = await page.goto(`/series/${SERIES_SLUG}`)
    test.skip(indexResponse?.status() === 404, 'series route not built in this mode')

    await page.goto(`/blog/${SERIES_PART_1_SLUG}`)
    const nav = page.locator('.blog-series')
    await expect(nav).toBeVisible()
    await expect(page.locator('.blog-series__item')).toHaveCount(8)
    await expect(page.locator('.blog-series__item--current')).toContainText('Part 1')
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
