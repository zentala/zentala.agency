import { describe, it, expect } from 'vitest'
import {
  validateSlug,
  validateSha,
  validateCollection,
} from '@/lib/dev/git-history/validators'

describe('validateSlug', () => {
  it('accepts valid kebab slug', () => {
    expect(validateSlug('valid-slug-123').ok).toBe(true)
  })
  it('rejects traversal', () => {
    expect(validateSlug('../etc/passwd').ok).toBe(false)
  })
  it('rejects spaces', () => {
    expect(validateSlug('Slug With Spaces').ok).toBe(false)
  })
  it('rejects non-string', () => {
    expect(validateSlug(42).ok).toBe(false)
  })
})

describe('validateSha', () => {
  it('accepts 7-char hex', () => expect(validateSha('abc1234').ok).toBe(true))
  it('accepts 40-char hex', () =>
    expect(validateSha('abcdef0123456789abcdef0123456789abcdef01').ok).toBe(true))
  it('rejects injection', () =>
    expect(validateSha('deadbeef; rm -rf /').ok).toBe(false))
  it('rejects short hex', () => expect(validateSha('abc').ok).toBe(false))
})

describe('validateCollection', () => {
  it('accepts blog', () => expect(validateCollection('blog').ok).toBe(true))
  it('rejects secrets', () => expect(validateCollection('secrets').ok).toBe(false))
  it('rejects notes (until allowlisted)', () =>
    expect(validateCollection('notes').ok).toBe(false))
})
