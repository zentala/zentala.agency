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

- Base URL: `http://localhost:4321` (or `PLAYWRIGHT_TEST_BASE_URL` env var)
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

- Ensure dev server is running: `npm run dev`
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
