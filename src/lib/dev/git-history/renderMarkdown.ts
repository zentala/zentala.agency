import { createMarkdownProcessor } from '@astrojs/markdown-remark'

let processorPromise: ReturnType<typeof createMarkdownProcessor> | null = null

function getProcessor() {
  if (!processorPromise) {
    // Astro's defaults (matching astro.config.mjs which has no custom remark/rehype plugins).
    processorPromise = createMarkdownProcessor({})
  }
  return processorPromise
}

export type RenderResult = { html: string; warnings: string[] }

/**
 * Renders raw markdown to HTML via `@astrojs/markdown-remark` — the same library
 * Astro uses internally. Keeps dev snapshot bytes-identical to prod render.
 * Returns a fallback HTML string + warning if rendering throws.
 */
export async function renderMarkdown(body: string): Promise<RenderResult> {
  const warnings: string[] = []
  try {
    const processor = await getProcessor()
    const result = await processor.render(body)
    return { html: result.code, warnings }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    warnings.push(`markdown render failed: ${message}`)
    return { html: '<pre>render failed</pre>', warnings }
  }
}
