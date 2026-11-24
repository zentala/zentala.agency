import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { VARIANT_AXES, variantAttribute } from '@/components/dev/variant-switcher/axes'

/**
 * The dev "Formularz" axis switches the contact form between B (default) and C
 * (horizontal lines only). The axis and the CSS that reads its attribute must agree.
 */
const SWITCHER_DIR = join(process.cwd(), 'src', 'components', 'dev', 'variant-switcher')
const FORM_AXIS_ID = 'form'
const LINE_OPTION = 'line'

describe('form variant axis', () => {
  const axis = VARIANT_AXES.find((candidate) => candidate.id === FORM_AXIS_ID)

  it('offers B as the default and C as the line option', () => {
    expect(axis).toBeDefined()
    expect(axis?.options.map((option) => option.value)).toEqual(['default', LINE_OPTION])
  })

  it('is read by the dev stylesheet through its data attribute', () => {
    const css = readFileSync(join(SWITCHER_DIR, 'dev-variants.scss'), 'utf8')
    expect(css).toContain(`${variantAttribute(FORM_AXIS_ID)}='${LINE_OPTION}'`)
  })
})
