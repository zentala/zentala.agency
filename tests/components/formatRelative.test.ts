import { describe, it, expect } from 'vitest'
import { formatRelative } from '@/components/react-stuff/dev/blog-version-panel/formatRelative'

const NOW = new Date('2026-05-12T12:00:00Z')

describe('formatRelative', () => {
  it('returns "just now" within 60s', () => {
    expect(formatRelative('2026-05-12T11:59:30Z', NOW)).toBe('just now')
  })
  it('returns minutes for sub-hour', () => {
    expect(formatRelative('2026-05-12T11:30:00Z', NOW)).toBe('30m ago')
  })
  it('returns hours for sub-day', () => {
    expect(formatRelative('2026-05-12T05:00:00Z', NOW)).toBe('7h ago')
  })
  it('returns days for sub-month', () => {
    expect(formatRelative('2026-05-09T12:00:00Z', NOW)).toBe('3d ago')
  })
  it('handles invalid input', () => {
    expect(formatRelative('not-a-date', NOW)).toBe('not-a-date')
  })
})
