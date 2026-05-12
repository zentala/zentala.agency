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
  it('large absolute change at low % is NOT major (blog-tuned)', () =>
    expect(computeIsMajor(10, 100, 100)).toBe(false))
  it('exactly 30% is major regardless of line count', () =>
    expect(computeIsMajor(30, 1, 0)).toBe(true))
})
