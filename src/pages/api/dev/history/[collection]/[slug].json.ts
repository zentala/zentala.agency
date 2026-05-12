import type { APIRoute } from 'astro'
import { getHistory } from '@/lib/dev/git-history/getHistory'
import { validateCollection, validateSlug } from '@/lib/dev/git-history/validators'

/**
 * Empty static paths → endpoint is NOT generated in prod build (output: 'static').
 * In `astro dev`, the dev server still routes requests to this file.
 */
export function getStaticPaths() {
  return []
}

/**
 * Dev-only endpoint: returns full version history for a content-collection entry.
 * Returns 404 in any non-dev environment.
 */
export const GET: APIRoute = async ({ params }) => {
  if (!import.meta.env.DEV) {
    return new Response(null, { status: 404 })
  }

  const collection = validateCollection(params.collection)
  if (!collection.ok) {
    return json(400, { error: collection.error })
  }
  const slug = validateSlug(params.slug)
  if (!slug.ok) {
    return json(400, { error: slug.error })
  }

  try {
    const { entries, warnings } = await getHistory(collection.value, slug.value)
    return json(200, { collection: collection.value, slug: slug.value, entries, warnings })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes('ENOENT')) {
      return json(500, { error: 'git binary missing', hint: 'install git' })
    }
    if (message.toLowerCase().includes('not a git repository')) {
      return json(500, { error: 'no .git dir', hint: 'run from a git repo' })
    }
    return json(500, { error: message })
  }
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
