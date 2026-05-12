import type { Plugin } from 'vite'
import { getHistory } from './getHistory'
import { getVersion } from './getVersion'
import { validateCollection, validateSha, validateSlug } from './validators'

/**
 * Dev-only Vite plugin: serves `/api/dev/history/...` and `/api/dev/version/...`
 * directly from the dev server. Never runs in production builds because
 * `configureServer` is only invoked by `astro dev`.
 *
 * Replaces the file-based Astro endpoints which would require an adapter +
 * non-static output to work as server routes.
 */
export function blogVersionHistoryDevPlugin(): Plugin {
  return {
    name: 'blog-version-history-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? ''
        const historyMatch = url.match(/^\/api\/dev\/history\/([^/]+)\/([^/.]+)\.json(?:\?.*)?$/)
        const versionMatch = url.match(
          /^\/api\/dev\/version\/([^/]+)\/([^/]+)\/([^/.]+)\.json(?:\?.*)?$/,
        )

        if (historyMatch) {
          const [, collection, slug] = historyMatch
          await handleHistory(collection, slug, res)
          return
        }
        if (versionMatch) {
          const [, collection, slug, sha] = versionMatch
          await handleVersion(collection, slug, sha, res)
          return
        }
        next()
      })
    },
  }
}

function json(res: import('node:http').ServerResponse, status: number, body: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

async function handleHistory(
  collectionRaw: string,
  slugRaw: string,
  res: import('node:http').ServerResponse,
): Promise<void> {
  const collection = validateCollection(collectionRaw)
  if (!collection.ok) return json(res, 400, { error: collection.error })
  const slug = validateSlug(slugRaw)
  if (!slug.ok) return json(res, 400, { error: slug.error })
  try {
    const { entries, warnings } = await getHistory(collection.value, slug.value)
    json(res, 200, { collection: collection.value, slug: slug.value, entries, warnings })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes('ENOENT')) {
      return json(res, 500, { error: 'git binary missing', hint: 'install git' })
    }
    if (message.toLowerCase().includes('not a git repository')) {
      return json(res, 500, { error: 'no .git dir', hint: 'run from a git repo' })
    }
    json(res, 500, { error: message })
  }
}

async function handleVersion(
  collectionRaw: string,
  slugRaw: string,
  shaRaw: string,
  res: import('node:http').ServerResponse,
): Promise<void> {
  const collection = validateCollection(collectionRaw)
  if (!collection.ok) return json(res, 400, { error: collection.error })
  const slug = validateSlug(slugRaw)
  if (!slug.ok) return json(res, 400, { error: slug.error })
  const sha = validateSha(shaRaw)
  if (!sha.ok) return json(res, 400, { error: sha.error })
  try {
    const result = await getVersion(collection.value, slug.value, sha.value)
    res.setHeader('X-Cache', result.ok && result.cacheHit ? 'hit' : 'miss')
    const status = result.ok ? 200 : result.status
    json(res, status, result.payload)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    json(res, 500, { error: message })
  }
}
