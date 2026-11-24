import { describe, expect, it } from 'vitest'
import { TECH_WALL } from '@/components/capabilities/copy'
import { resolveTechIcon } from '@/data/tech-icons'
import { TECH_NOTES } from '@/data/tech-notes'

/** The wall's column bands used on /about/capabilities (TechWall.astro). */
const COLUMN_BANDS = [8, 4, 4]
const EXPECTED_NOTES = 16

describe('technology wall data', () => {
  it('fills the last row at every column band', () => {
    for (const columns of COLUMN_BANDS) {
      expect(TECH_WALL.logos.length % columns).toBe(0)
    }
  })

  it('has a draft note only for logos that are on the wall', () => {
    const slugs = TECH_WALL.logos.map((logo) => resolveTechIcon(logo).slug)
    const noted = Object.keys(TECH_NOTES)
    expect(noted).toHaveLength(EXPECTED_NOTES)
    for (const slug of noted) expect(slugs).toContain(slug)
  })

  it('keeps every note a single short sentence', () => {
    for (const note of Object.values(TECH_NOTES)) {
      expect(note.length).toBeLessThanOrEqual(160)
      expect(note.endsWith('.')).toBe(true)
    }
  })
})
