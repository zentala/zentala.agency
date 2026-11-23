import { describe, expect, it } from 'vitest'
import { resolveIconName } from '@/lib/siteIcon'

/** Icon meanings the admin pages use: SiteIcon throws at render time on a meaning the map lacks. */
const ADMIN_ICONS = [
  'decisions',
  'broken-links',
  'design',
  'comments',
  'series',
  'gallery',
  'recommended',
  'checkbox-off',
  'done',
  'add',
  'external-link',
  'copy',
  'save',
  'next',
]

describe('admin icons', () => {
  it.each(ADMIN_ICONS)('%s resolves to a Phosphor glyph', (name) => {
    expect(resolveIconName(name, 20)).toMatch(/^ph:/)
  })
})
