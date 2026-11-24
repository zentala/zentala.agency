import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { HEADER_IMAGES, headerImageSlot } from '@/config/features'
import { VARIANT_AXES, variantAttribute } from '@/components/dev/variant-switcher/axes'

/**
 * The HEADER_IMAGES switch (owner request R1, 2026-11-24): off means no header image in a
 * production build, on brings them back; dev keeps them in the markup so the switcher axis
 * can show them.
 */
const SRC = join(process.cwd(), 'src')
const SWITCHER_DIR = join(SRC, 'components', 'dev', 'variant-switcher')
const AXIS_ID = 'header-images'
const COMPONENTS_READING_THE_SWITCH = [
  'components/blog/index/SlugCover.astro',
  'components/banners/variants/SimpleWithImage.astro',
  'components/cards/PortfolioItem.astro',
  'sections/home/ProjectCard.astro',
]

describe('headerImageSlot', () => {
  it('switch on: renders in production and in dev, never marked off', () => {
    for (const dev of [false, true]) {
      const slot = headerImageSlot(true, dev)
      expect(slot.render).toBe(true)
      expect(slot.attrs).toEqual({ 'data-header-image': '' })
    }
  })

  it('switch off in production: renders nothing', () => {
    expect(headerImageSlot(false, false)).toEqual({ render: false, attrs: {} })
  })

  it('switch off in dev: stays in the markup, marked off by default', () => {
    const slot = headerImageSlot(false, true)
    expect(slot.render).toBe(true)
    expect(slot.attrs['data-header-image-default']).toBe('off')
  })

  it('ships with the switch off', () => {
    expect(HEADER_IMAGES).toBe(false)
  })
})

describe('header-images axis', () => {
  const axis = VARIANT_AXES.find((candidate) => candidate.id === AXIS_ID)

  it('has the build default first and the opposite second', () => {
    expect(axis?.options.map((option) => option.value)).toEqual(
      HEADER_IMAGES ? ['default', 'off'] : ['default', 'on'],
    )
  })

  it('is read by the dev stylesheet through its data attribute', () => {
    const css = readFileSync(join(SWITCHER_DIR, 'dev-variants.scss'), 'utf8')
    expect(css).toContain(`${variantAttribute(AXIS_ID)}='on'`)
    expect(css).toContain(`${variantAttribute(AXIS_ID)}='off'`)
  })
})

describe('components that render a header image', () => {
  it.each(COMPONENTS_READING_THE_SWITCH)('%s reads the switch', (file) => {
    const source = readFileSync(join(SRC, file), 'utf8')
    expect(source).toContain("from '@/config/features'")
    expect(source).toContain('headerImage.render')
  })
})

describe('variant links', () => {
  it('the switcher script reads ?v-<axis>=<value> and checks it against the known options', () => {
    const source = readFileSync(join(SWITCHER_DIR, 'VariantSwitcher.astro'), 'utf8')
    expect(source).toContain("'v-' + item.id")
    expect(source).toContain('item.options.some((option) => option.value === value)')
  })
})
