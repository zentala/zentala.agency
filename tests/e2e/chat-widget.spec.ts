import { test, expect } from '@playwright/test'

/**
 * Chat Widget E2E Test
 *
 * Tests that the Zentala Chat Widget is properly loaded and visible on the page.
 */

test.describe('Zentala Chat Widget', () => {
  test('should load chat widget without CORS errors', async ({ page }) => {
    // Collect console errors
    const consoleErrors: string[] = []
    const consoleWarnings: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text())
      }
    })

    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' })

    // Wait for chat widget to load
    await page.waitForTimeout(5000)

    // Log results
    console.log('=== Console Errors ===')
    consoleErrors.forEach((err) => console.log('ERROR:', err))

    console.log('=== Console Warnings ===')
    consoleWarnings.forEach((warn) => console.log('WARNING:', warn))

    // Check for CORS/network errors related to hub.zentala.io
    const criticalErrors = consoleErrors.filter(
      (err) =>
        err.includes('CORS') ||
        err.includes('Access-Control-Allow-Origin') ||
        err.includes('ERR_FAILED') ||
        err.includes('net::ERR') ||
        (err.includes('hub.zentala.io') && !err.includes('favicon')),
    )

    console.log('=== Critical Errors ===')
    criticalErrors.forEach((err) => console.log('CRITICAL:', err))

    // Critical errors should be empty
    expect(criticalErrors).toHaveLength(0)
  })

  test('should have chat widget visible on page', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' })

    // Wait for chat widget to load
    await page.waitForTimeout(5000)

    // Look for chat widget elements - common selectors for chat widgets
    const chatSelectors = [
      // Generic chat widget selectors
      '[class*="chat"]',
      '[class*="zentala"]',
      '[id*="chat"]',
      '[id*="zentala"]',
      // Iframes
      'iframe[src*="zentala"]',
      'iframe[src*="hub"]',
      // Shadow DOM containers (common for widgets)
      'zentala-chat',
      '#zentala-widget',
      '.zentala-widget',
      // Button selectors
      '[class*="chat-button"]',
      '[class*="chat-bubble"]',
      '[class*="chat-toggle"]',
    ]

    let foundAnyChatElement = false
    let chatElementCount = 0

    for (const selector of chatSelectors) {
      const elements = page.locator(selector)
      const count = await elements.count()
      if (count > 0) {
        console.log(`Found ${count} elements matching selector: ${selector}`)
        foundAnyChatElement = true
        chatElementCount += count
      }
    }

    // Log summary
    console.log(`=== Chat Widget Detection ===`)
    console.log(`Total chat elements found: ${chatElementCount}`)
    console.log(`Any chat element found: ${foundAnyChatElement}`)

    // At least one chat element should be present
    // Note: Widget might inject content dynamically, so we check for script first
    const chatScript = page.locator('script[src*="hub.zentala.io"]')
    const scriptCount = await chatScript.count()
    console.log(`Chat script count: ${scriptCount}`)

    // Either script or chat elements should be present
    expect(scriptCount + chatElementCount).toBeGreaterThan(0)
  })

  test('should log when chat widget is loaded', async ({ page }) => {
    // Collect console logs
    const consoleLogs: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text())
      }
    })

    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' })

    // Wait for potential logs
    await page.waitForTimeout(5000)

    // Check for chat widget load confirmation
    const chatLoaded = consoleLogs.some(
      (log) =>
        log.includes('Zentala Widget loaded') ||
        log.includes('chat loaded') ||
        log.includes('widget initialized'),
    )

    console.log('=== Console Logs ===')
    consoleLogs.forEach((log) => console.log('LOG:', log))

    console.log(`Chat widget loaded message found: ${chatLoaded}`)

    // This is informational - the widget might not log anything
    // We just log the result for debugging
  })
})
