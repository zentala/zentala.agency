import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import tailwindConfig from '../../tailwind.config.js'
import { VARIANT_AXES } from '../../src/components/dev/variant-switcher/axes'

/** The system font stack, the dev font axis and the prod audit's font check (T30f). */

const AUDIT_SCRIPT = join(process.cwd(), 'scripts', 'audit-prod-bundle.mjs')
const tempDirs: string[] = []

afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

function auditFixture(extraFile?: string) {
  const root = mkdtempSync(join(tmpdir(), 'audit-'))
  tempDirs.push(root)
  mkdirSync(join(root, 'dist'))
  writeFileSync(join(root, 'dist', 'index.html'), '<html><body>ok</body></html>')
  if (extraFile) writeFileSync(join(root, 'dist', extraFile), 'x')
  return spawnSync(process.execPath, [AUDIT_SCRIPT], { cwd: root, encoding: 'utf8' })
}

describe('font stack', () => {
  it('tailwind sans reads --font-sans and medium is 600', () => {
    const extend = tailwindConfig.theme.extend
    expect(extend.fontFamily.sans).toEqual(['var(--font-sans)'])
    expect(extend.fontWeight.medium).toBe('600')
  })

  it('--font-sans names Segoe UI, then Selawik, and no Inter', () => {
    const tokens = readFileSync(join(process.cwd(), 'src/styles/tokens.scss'), 'utf8')
    const stack = /--font-sans:\s*([^;]+);/.exec(tokens)?.[1] ?? ''
    expect(stack.startsWith("'Segoe UI', Selawik")).toBe(true)
    expect(stack).not.toMatch(/inter/i)
  })

  it('the dev switcher has the font axis with the five fonts', () => {
    const font = VARIANT_AXES.find((axis) => axis.id === 'font')
    expect(font?.options.map((option) => option.label)).toEqual([
      'Segoe UI',
      'Selawik',
      'Open Sans',
      'Noto Sans',
      'Source Sans 3',
    ])
  })
})

describe('audit-prod-bundle font check', () => {
  it('passes on a dist without font files', () => {
    expect(auditFixture().status).toBe(0)
  })

  it('fails when dist holds a .woff2', () => {
    const result = auditFixture('font.woff2')
    expect(result.status).toBe(1)
    expect(result.stderr).toContain('font file')
  })
})
