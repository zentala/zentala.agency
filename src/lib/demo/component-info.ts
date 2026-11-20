import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, normalize, relative, sep } from 'node:path'

/**
 * Dev-time facts about a component for the /demo gallery, computed from the source
 * files themselves: the Props interface and the pages that render it. Reads the
 * working tree with `fs`; only the dev-only gallery imports this module.
 */

const SRC = join(process.cwd(), 'src')
const POSIX = (path: string) => path.split(sep).join('/')
const MAX_LISTED_PAGES = 8

export interface UsedIn {
  /** Every page renders it (through the layout). */
  everywhere: boolean
  pages: { route: string; href?: string }[]
  /** Pages beyond the listed ones. */
  more: number
}

/** A component path as the manifest writes it: relative to `src/components/`, or `../` for `src/`. */
export function toSrcPath(path: string): string {
  return path.startsWith('../') ? `src/${path.slice(3)}` : `src/components/${path}`
}

function listFiles(dir: string, extensions: string[]): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return listFiles(full, extensions)
    return extensions.some((ext) => name.endsWith(ext)) ? [full] : []
  })
}

const readSource = (file: string) => readFileSync(file, 'utf8')

const IMPORT_PATTERN = /from\s+['"]([^'"]+\.astro)['"]/g

function resolveImport(from: string, specifier: string): string | null {
  const target = specifier.startsWith('@/')
    ? join(SRC, specifier.slice(2))
    : specifier.startsWith('.')
      ? normalize(join(dirname(from), specifier))
      : null
  return target && existsSync(target) ? target : null
}

/** `import(`./dir/${name}.astro`)` reaches every file of that directory with that suffix. */
const DYNAMIC_IMPORT_PATTERN = /import\(\s*`([^`$]*)\$\{[^}]*\}([^`]*)`\s*\)/g

function dynamicImportsOf(file: string, source: string): string[] {
  return [...source.matchAll(DYNAMIC_IMPORT_PATTERN)].flatMap((match) => {
    const dir = resolveImport(file, match[1].replace(/\/$/, '') || '.')
    return dir && statSync(dir).isDirectory()
      ? listFiles(dir, [match[2]])
      : []
  })
}

function importsOf(file: string): string[] {
  const source = readSource(file)
  const staticImports = [...source.matchAll(IMPORT_PATTERN)].flatMap((match) => {
    const resolved = resolveImport(file, match[1])
    return resolved ? [resolved] : []
  })
  return [...staticImports, ...dynamicImportsOf(file, source)]
}

interface Graph {
  importedBy: Map<string, Set<string>>
}

let cachedGraph: Graph | null = null

function importGraph(): Graph {
  if (cachedGraph) return cachedGraph
  const importedBy = new Map<string, Set<string>>()
  const files = [
    ...listFiles(SRC, ['.astro']),
    ...listFiles(join(SRC, 'content', 'blog'), ['.mdx', '.md']),
  ]
  for (const file of files) {
    const source = file.endsWith('.astro') ? importsOf(file) : mdImports(file)
    for (const target of source) {
      if (!importedBy.has(target)) importedBy.set(target, new Set())
      importedBy.get(target)?.add(file)
    }
  }
  cachedGraph = { importedBy }
  return cachedGraph
}

function mdImports(file: string): string[] {
  return [...readSource(file).matchAll(IMPORT_PATTERN)].flatMap((match) => {
    const resolved = resolveImport(file, match[1])
    return resolved ? [resolved] : []
  })
}

const HIDDEN_PAGE = /(^|\/)(demo|mockups|zz-[^/]*)(\/|\.astro$)/

/** The route a page file serves, `[param]` kept as written. Null for hidden dev pages. */
function routeOf(file: string): string | null {
  const rel = POSIX(relative(join(SRC, 'pages'), file))
  if (HIDDEN_PAGE.test(rel)) return null
  const route = `/${rel.replace(/\.astro$/, '').replace(/(^|\/)index$/, '')}`
  return route === '/' ? '/' : route.replace(/\/$/, '')
}

function blogRoute(file: string): string {
  return `/blog/${file.split(sep).pop()?.replace(/\.mdx?$/, '')}`
}

/** Pages that render a component, found by walking the import graph upwards. */
export function usedIn(path: string): UsedIn {
  const start = join(process.cwd(), toSrcPath(path))
  const { importedBy } = importGraph()
  const seen = new Set<string>([start])
  const queue = [start]
  const routes = new Set<string>()
  let everywhere = false
  while (queue.length) {
    const current = queue.shift() as string
    for (const parent of importedBy.get(current) ?? []) {
      if (seen.has(parent)) continue
      seen.add(parent)
      const rel = POSIX(relative(SRC, parent))
      if (rel.startsWith('layouts/')) everywhere = true
      else if (rel.startsWith('content/blog/')) routes.add(blogRoute(parent))
      else if (rel.startsWith('pages/')) {
        const route = routeOf(parent)
        if (route) routes.add(route)
      } else queue.push(parent)
    }
  }
  const sorted = [...routes].sort()
  return {
    everywhere,
    pages: sorted.slice(0, MAX_LISTED_PAGES).map((route) => ({
      route,
      href: route.includes('[') ? undefined : route,
    })),
    more: Math.max(0, sorted.length - MAX_LISTED_PAGES),
  }
}

/** The body of the component's `Props` interface, dedented; null when it has none. */
export function propsInterface(path: string): string | null {
  const file = join(process.cwd(), toSrcPath(path))
  if (!existsSync(file)) return null
  const source = readSource(file)
  const start = source.search(/(interface|type)\s+\w*Props\b[^{=]*[={]/)
  if (start < 0) return null
  const open = source.indexOf('{', start)
  let depth = 0
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1
    if (source[index] === '}') depth -= 1
    if (depth === 0) return dedent(source.slice(start, index + 1))
  }
  return null
}

function dedent(block: string): string {
  const lines = block.split('\n')
  const indents = lines.slice(1).filter((line) => line.trim())
  const common = Math.min(
    ...indents.map((line) => line.length - line.trimStart().length),
    Infinity,
  )
  return [lines[0], ...lines.slice(1).map((line) => line.slice(common === Infinity ? 0 : common))]
    .join('\n')
    .trim()
}
