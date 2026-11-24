import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  VARIANT_AXES,
  variantAttribute,
} from '@/components/dev/variant-switcher/axes'

/**
 * The dev "cta" and "card-hover" axes offer the owner's candidate looks. Each axis must keep
 * the current look first, and every other option must be read by the dev stylesheet.
 */
const CSS = readFileSync(
  join(
    process.cwd(),
    'src',
    'components',
    'dev',
    'variant-switcher',
    'dev-variants.scss',
  ),
  'utf8',
)

const EXPECTED: Record<string, string[]> = {
  cta: ['default', 'steel', 'ice', 'white', 'ghost'],
  'card-hover': ['default', 'inner-light', 'spotlight'],
  'logo-expand': ['default', 'span-right', 'note-strip'],
}

describe.each(Object.entries(EXPECTED))('axis %s', (id, values) => {
  const axis = VARIANT_AXES.find((candidate) => candidate.id === id)

  it('lists the current look first, then the candidates', () => {
    expect(axis?.options.map((option) => option.value)).toEqual(values)
  })

  it('has CSS for every candidate', () => {
    for (const value of values.slice(1)) {
      expect(CSS).toContain(`${variantAttribute(id)}='${value}'`)
    }
  })
})
