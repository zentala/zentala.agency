import { describe, expect, it } from 'vitest'
import { resolveIconName } from '@/lib/siteIcon'

/** Icons the admin pages use: SiteIcon throws at render time on a name the set lacks. */
const ADMIN_ICONS = [
  'check-square',
  'link-break',
  'palette',
  'chat-text',
  'stack',
  'squares-four',
  'star',
  'circle',
  'check-circle',
  'external-link',
  'copy',
  'floppy-disk',
  'caret-right',
]

describe('admin icons', () => {
  it.each(ADMIN_ICONS)('%s exists in the Phosphor Light set', (name) => {
    expect(resolveIconName(name)).toMatch(/^ph:/)
  })
})
