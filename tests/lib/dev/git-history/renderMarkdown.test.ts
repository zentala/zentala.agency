import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '@/lib/dev/git-history/renderMarkdown'

describe('renderMarkdown', () => {
  it('renders headings', async () => {
    const { html } = await renderMarkdown('# hello')
    expect(html).toContain('<h1')
    expect(html).toContain('hello')
  })

  it('renders code blocks with syntax highlighting', async () => {
    const { html } = await renderMarkdown('```js\nconst x = 1\n```\n')
    expect(html).toContain('<pre')
    // Shiki produces span-wrapped tokens
    expect(html).toMatch(/<code|<span/)
  })

  it('renders links', async () => {
    const { html } = await renderMarkdown('[zentala](https://zentala.agency)')
    expect(html).toContain('<a href="https://zentala.agency"')
  })

  it('renders tables', async () => {
    const md = '| a | b |\n|---|---|\n| 1 | 2 |\n'
    const { html } = await renderMarkdown(md)
    expect(html).toContain('<table')
  })

  it('returns fallback on render throw', async () => {
    // Force a throw by passing a non-string; renderMarkdown should catch.
    const { html, warnings } = await renderMarkdown(null as unknown as string)
    expect(warnings.length).toBeGreaterThan(0)
    expect(html).toBe('<pre>render failed</pre>')
  })
})
