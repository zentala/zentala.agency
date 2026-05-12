/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { sanitizeSnapshot } from '@/components/react-stuff/dev/blog-version-panel/sanitize'

describe('sanitizeSnapshot', () => {
  it('strips onerror from img tags', () => {
    const dirty = '<img src=x onerror="alert(1)">'
    const clean = sanitizeSnapshot(dirty)
    expect(clean).not.toContain('onerror')
    expect(clean).not.toContain('alert')
  })

  it('strips <script> tags', () => {
    const dirty = '<div>ok<script>alert(1)</script></div>'
    const clean = sanitizeSnapshot(dirty)
    expect(clean).not.toContain('<script')
    expect(clean).not.toContain('alert')
  })

  it('strips event-handler attributes globally', () => {
    const dirty = '<div onclick="alert(1)">x</div>'
    const clean = sanitizeSnapshot(dirty)
    expect(clean).not.toContain('onclick')
  })

  it('preserves diff2html structural class names', () => {
    const dirty = '<div class="d2h-wrapper"><div class="d2h-ins">+</div><div class="d2h-del">-</div></div>'
    const clean = sanitizeSnapshot(dirty)
    expect(clean).toContain('d2h-wrapper')
    expect(clean).toContain('d2h-ins')
    expect(clean).toContain('d2h-del')
  })

  it('preserves safe markdown structure (h1, code, a[href])', () => {
    const dirty = '<h1>title</h1><p><a href="https://example.com">x</a> <code>y</code></p>'
    const clean = sanitizeSnapshot(dirty)
    expect(clean).toContain('<h1')
    expect(clean).toContain('href="https://example.com"')
    expect(clean).toContain('<code')
  })
})
