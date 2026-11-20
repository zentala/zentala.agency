# E2E Tests Documentation

## Overview

This directory contains end-to-end (E2E) tests for the Żentała Agency website. All tests use Playwright and validate both GUI functionality and link integrity.

## Test Structure

### Test Files

1. **`all-links.spec.ts`** - Comprehensive link validation test
   - Validates ALL internal links in the application
   - Extracts links from:
     - Banner files (`src/sections/banners/*.astro`)
     - Header navigation (`src/components/Header.astro`)
     - Footer links (`src/components/Footer.astro`)
   - **Use this before deployment** to catch any broken internal links
   - Runs automatically in CI/CD pipeline

2. **`banner-links.spec.ts`** - Focused banner link test
   - Validates only banner links
   - Useful for quick checks during development
   - Automatically extracts links from banner files

3. **`blog-post.spec.ts`** - Blog post page functionality tests
   - Tests hero section sizing
   - Tests scroll indicator
   - Tests UI interactions

4. **`line-geometry.spec.ts`** - guard for the one line model (DESIGN.md section 3)
   - Routes come from `dist/**/index.html` at test time (redirect stubs are replaced by their destination, `/linkedin-preview/*` is excluded as a mock of LinkedIn's UI, a not-built path covers the 404 page)
   - Per route at 1920, 1450, 768, 390 (1280 for `/`, `/blog`, `/about/capabilities`, `/portfolio`): no doubled line, no vertical line at the viewport edge at 1450px and below, no floating vertical segment (`FLOATING_SEGMENT_CHECK`), containers (`.container-bordered`, `.container-padded`, `.container-header`, `.container-footer-small`) span the viewport at 1450px and below
   - Hover at 1920 on every route with an interactive cell changes no layout rect
5. **`bento-showcase.spec.ts`**, **`series-linkedin-preview.spec.ts`** - critical specs of the bento grid and the series/LinkedIn preview pages

### What the line guard does not cover

- Dev-only routes (`/demo`, `/mockups/*`) and drafts (`published: false`) are never in `dist/`, so the guard cannot see them. Check them by hand with the same pixel analysis at 1920, 1450, 1280, 768 and 390. `analyzeLines` is not exported from the spec; copy its logic into a scratch script.
- A page taller than about 16k px must be measured in chunks: Chrome paints black rectangles in a taller screenshot, which gives false floating-line findings.
- Article blocks in `src/components/blog/rich/` carry `data-prose-widget`; the guard skips them for the doubled-line and the floating-segment check (`PROSE_WIDGET_SELECTOR`). A new kind of in-prose box takes the same attribute.
- Series with fewer than 2 published parts are not built, so their routes drop out of the list.

### Critical specs in `just check`

`just check` runs `blog-post`, `bento-showcase`, `series-linkedin-preview` and `line-geometry` on chromium against `npm run preview` of a build made with `PUBLIC_PLAYWRIGHT_TEST=true`. Run the build first; `line-geometry` reads `dist/`.

### Line geometry rule

A new route is covered automatically. A new kind of line needs an allowlist entry or a fix, never a silent exclusion. The allowlists live at the top of `line-geometry.spec.ts` (`EXCLUDED_ROUTE_PREFIXES`, `PROSE_WIDGET_SELECTOR`, `HIDDEN_WIDGETS_CSS`); each entry needs a reason in a comment.

## Running Tests

### Local Development

```bash
# Run all E2E tests
npm run test:e2e

# Run only link validation tests (all links)
npm run test:links

# Run only banner link tests
npm run test:links:banners

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug

# Pre-push validation (build + link tests)
npm run prepush
```

### CI/CD Pipeline

Tests run automatically:

- **On pull requests** to `main` branch
- **Before deployment** - deployment workflow includes link validation
- **On manual trigger** via GitHub Actions

## Test Configuration

Tests are configured in `playwright.config.ts`:

- Base URL: `http://localhost:4333` (or `PLAYWRIGHT_TEST_BASE_URL` env var)
- Browsers: Chromium, Firefox, WebKit
- Retries: 2 on CI, 0 locally
- Screenshots: Only on failure
- Traces: On first retry

## Link Validation

### How It Works

1. **Extraction Phase**: Tests parse source files to extract all internal links
   - Uses regex patterns to find `href` attributes
   - Filters out external links (http://, https://, mailto:)
   - Groups links by source (banner, header, footer, etc.)

2. **Validation Phase**: For each internal link:
   - Navigates to the URL
   - Checks HTTP status (must be 200)
   - Verifies page title doesn't contain "404" or "Not Found"
   - Checks that main content is visible
   - Verifies no error messages in headings

3. **Reporting**: Detailed results with:
   - Summary by link type
   - Individual link status
   - Error messages for failed links

### Adding New Link Sources

To add validation for links from new components:

1. Create extraction function in `all-links.spec.ts`:

```typescript
async function extractMyComponentLinks(): Promise<AppLink[]> {
  const path = join(process.cwd(), 'src', 'components', 'MyComponent.astro')
  const content = await readFile(path, 'utf-8')
  // Extract links using regex
  // Return AppLink[]
}
```

2. Add to `extractAllLinks()`:

```typescript
const myComponentLinks = await extractMyComponentLinks()
allLinks.push(...myComponentLinks)
```

## Pre-Push Validation

**Always run link validation before pushing:**

```bash
npm run prepush
```

This will:

1. Build the application
2. Run comprehensive link validation tests
3. Fail if any broken links are found

**Never push code with broken internal links!**

## CI/CD Integration

### GitHub Actions Workflows

1. **`.github/workflows/test.yml`** - Standalone test workflow
   - Runs on PRs and pushes
   - Can be triggered manually
   - Uploads test reports as artifacts

2. **`.github/workflows/deploy.yml`** - Deployment workflow
   - Includes link validation as a required step
   - Deployment only proceeds if all links are valid
   - Prevents broken links from reaching production

### Workflow Steps

1. Checkout repository
2. Setup Node.js
3. Install dependencies
4. Install Playwright browsers
5. Build application
6. Run E2E tests
7. Upload test reports (if failures)

## Best Practices

1. **Run tests locally before pushing** - Use `npm run prepush`
2. **Fix broken links immediately** - Don't push with broken links
3. **Add tests for new UI features** - All new UI should have E2E tests
4. **Keep link extraction updated** - When adding new link sources, update tests
5. **Check CI/CD results** - Monitor test results in GitHub Actions

## Troubleshooting

### Tests fail locally

- Ensure preview server is running: `npm run preview -- --port 4333`
- Check `PLAYWRIGHT_TEST_BASE_URL` environment variable
- Verify all pages exist and are accessible

### Tests fail in CI/CD

- Check build logs for specific failing links
- Verify all pages are built correctly
- Check for typos in link paths

### Link not detected

- Verify link format matches extraction patterns
- Check if link is external (external links are skipped)
- Ensure file is in expected location

## Future Improvements

- [ ] Add link validation for blog post content
- [ ] Add link validation for portfolio items
- [ ] Add visual regression tests
- [ ] Add performance tests
- [ ] Add accessibility tests
