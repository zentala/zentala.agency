import { describe, it, expect } from 'vitest'
import { clampPercent, computeIsMajor } from '@/lib/dev/git-history/heuristics'

describe('clampPercent', () => {
  it('caps at 100', () => expect(clampPercent(150)).toBe(100))
  it('floors at 0', () => expect(clampPercent(-5)).toBe(0))
  it('passes value through', () => expect(clampPercent(42.5)).toBe(42.5))
  it('handles NaN', () => expect(clampPercent(NaN)).toBe(0))
})

describe('computeIsMajor', () => {
  it('29.9% is not major', () => expect(computeIsMajor(29.9, 5, 5)).toBe(false))
  it('30% is major', () => expect(computeIsMajor(30, 5, 5)).toBe(true))
  it('49 absolute lines is not major (below %)', () =>
    expect(computeIsMajor(5, 25, 24)).toBe(false))
  it('50 absolute lines is major', () => expect(computeIsMajor(5, 25, 25)).toBe(true))
})
