/**
 * Input validators for the dev-only blog version history tool.
 * All defenses are belt-and-suspenders behind the DEV gate, but we still
 * validate strictly to keep the surface tiny.
 */

export const CONTENT_COLLECTIONS = ['blog'] as const
export type ContentCollection = (typeof CONTENT_COLLECTIONS)[number]

const SLUG_REGEX = /^[a-z0-9-]+$/
const SHA_REGEX = /^[a-f0-9]{4,40}$/

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string }

/** Returns `ok` if the slug matches `[a-z0-9-]+`, else `{ ok: false, error }`. */
export function validateSlug(input: unknown): ValidationResult<string> {
  if (typeof input !== 'string') return { ok: false, error: 'slug must be string' }
  if (!SLUG_REGEX.test(input)) return { ok: false, error: 'invalid slug' }
  return { ok: true, value: input }
}

/** Returns `ok` if the SHA matches `[a-f0-9]{4,40}`. */
export function validateSha(input: unknown): ValidationResult<string> {
  if (typeof input !== 'string') return { ok: false, error: 'sha must be string' }
  if (!SHA_REGEX.test(input)) return { ok: false, error: 'invalid sha' }
  return { ok: true, value: input }
}

/** Returns `ok` if the collection is in the V1 allowlist. */
export function validateCollection(input: unknown): ValidationResult<ContentCollection> {
  if (typeof input !== 'string') return { ok: false, error: 'collection must be string' }
  if (!(CONTENT_COLLECTIONS as readonly string[]).includes(input)) {
    return { ok: false, error: 'unknown collection' }
  }
  return { ok: true, value: input as ContentCollection }
}
