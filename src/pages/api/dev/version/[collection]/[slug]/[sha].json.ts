import type { APIRoute } from 'astro'
import { getVersion } from '@/lib/dev/git-history/getVersion'
import {
  validateCollection,
  validateSha,
  validateSlug,
} from '@/lib/dev/git-history/validators'

/**
 * Empty static paths → endpoint is NOT generated in prod build (output: 'static').
 * In `astro dev`, the dev server still routes requests to this file.
 */
export function getStaticPaths() {
  return []
}

/**
 * Dev-only endpoint: returns content of a content-collection entry at a given SHA.
 * Includes parsed frontmatter, raw body, and pre-rendered HTML.
 */
export const GET: APIRoute = async ({ params }) => {
  if (!import.meta.env.DEV) {
    return new Response(null, { status: 404 })
  }

  const collection = validateCollection(params.collection)
  if (!collection.ok) return json(400, { error: collection.error })
  const slug = validateSlug(params.slug)
  if (!slug.ok) return json(400, { error: slug.error })
  const sha = validateSha(params.sha)
  if (!sha.ok) return json(400, { error: sha.error })

  try {
    const result = await getVersion(collection.value, slug.value, sha.value)
    const status = result.ok ? 200 : result.status
    const cacheHeader =
      result.ok && result.cacheHit !== undefined ? (result.cacheHit ? 'hit' : 'miss') : 'miss'
    return new Response(JSON.stringify(result.payload), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': cacheHeader,
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return json(500, { error: message })
  }
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
