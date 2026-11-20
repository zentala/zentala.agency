import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { GALLERY_ITEMS } from '@/components/demo/manifest'

/**
 * Guard for the component gallery at /demo (dev only): every component file must be
 * imported by the gallery and have a manifest row with a rendered `GalleryEntry`.
 * A new component without a gallery entry fails here.
 */

const ROOT = process.cwd()
const COMPONENTS_DIR = join(ROOT, 'src', 'components')
const DEMO_DIR = join(COMPONENTS_DIR, 'demo')
const DEMO_PAGE = join(ROOT, 'src', 'pages', 'demo', '[...slug].astro')
const SECTIONS_DIR = join(ROOT, 'src', 'sections')
const COMPONENT_IMPORT_PREFIX = '@/components/'
const SECTION_IMPORT_PREFIX = '@/sections/'
/** Manifest paths for files in src/sections/ start with this, relative to src/components. */
const SECTION_PATH_PREFIX = '../sections/'

/**
 * Directories whose every .astro file needs a gallery entry (recursive).
 * `home` and `preview` are guarded on purpose: both hold real, page-used components.
 * `react-stuff` and `solid-chat` are out of scope: they are isolated framework islands, not Astro primitives.
 */
const GUARDED_DIRS = [
  'primitives',
  'cards',
  'blog',
  'banners',
  'home',
  'preview',
]

/** Component files that are not in the gallery, each with the reason. Keys are paths relative to src/components. */
const EXEMPT: Record<string, string> = {
  'Header.astro': 'page chrome, rendered on every page including the gallery',
  'Footer.astro': 'page chrome, rendered on every page including the gallery',
  '../sections/home/HeroWithVariations.astro':
    'wrapper that picks one Hero variant for the home page; the Hero (home) entry shows both layouts',
  '../sections/home/HeroVariantA.astro':
    'not imported by any page: a hero exploration kept for reference, a candidate for deletion',
  '../sections/home/HeroVariantB.astro':
    'not imported by any page: a hero exploration kept for reference, a candidate for deletion',
  '../sections/home/HeroVariantC.astro':
    'not imported by any page: a hero exploration kept for reference, a candidate for deletion',
  '../sections/home/HeroVariantD.astro':
    'not imported by any page: a hero exploration kept for reference, a candidate for deletion',
  '../sections/home/HeroVariantE.astro':
    'not imported by any page: a hero exploration kept for reference, a candidate for deletion',
  '../sections/home/ServiceBackstage.astro':
    'not imported by any page: home service copy kept for reference, built from ServiceSection, FeaturedProjects and ProjectCard, which are in the gallery',
  '../sections/home/ServiceIoT.astro':
    'not imported by any page: home service copy kept for reference, built from ServiceSection, FeaturedProjects and ProjectCard, which are in the gallery',
  '../sections/home/ServiceRapidDev.astro':
    'not imported by any page: home service copy kept for reference, built from ServiceSection, FeaturedProjects and ProjectCard, which are in the gallery',
}

/** Whole directories that are not in the gallery, with the reason. Keys end with a slash. */
const EXEMPT_DIRS: Record<string, string> = {
  'blog/mockups/':
    'owner-facing mockups shown at /mockups/<name>; promoted into real components (and the gallery) when the owner accepts one',
  'review-mockup/':
    'owner-facing E008 mockup shown at /mockups/review-layer; promoted into real components (and the gallery) when the owner accepts it',
}

const isExempt = (path: string) =>
  path in EXEMPT || Object.keys(EXEMPT_DIRS).some((dir) => path.startsWith(dir))

function listAstroFiles(dir: string, recursive: boolean): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory())
      return recursive ? listAstroFiles(full, true) : []
    return name.endsWith('.astro') ? [full] : []
  })
}

const toComponentPath = (file: string) =>
  relative(COMPONENTS_DIR, file).split(sep).join('/')

const sectionFiles = listAstroFiles(SECTIONS_DIR, true).map(
  (file) =>
    `${SECTION_PATH_PREFIX}${relative(SECTIONS_DIR, file).split(sep).join('/')}`,
)

const guardedComponents = [
  ...sectionFiles,
  ...listAstroFiles(COMPONENTS_DIR, false).map(toComponentPath),
  ...GUARDED_DIRS.flatMap((dir) =>
    listAstroFiles(join(COMPONENTS_DIR, dir), true).map(toComponentPath),
  ),
].sort()

const gallerySource = [DEMO_PAGE, ...listAstroFiles(DEMO_DIR, true)]
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n')

/** Components the gallery source imports, as paths relative to src/components. */
function importedComponents(source: string): Set<string> {
  const components = new RegExp(
    `from '${COMPONENT_IMPORT_PREFIX}([^']+\\.astro)'`,
    'g',
  )
  const sections = new RegExp(
    `from '${SECTION_IMPORT_PREFIX}([^']+\\.astro)'`,
    'g',
  )
  return new Set([
    ...[...source.matchAll(components)].map((match) => match[1]),
    ...[...source.matchAll(sections)].map(
      (match) => `${SECTION_PATH_PREFIX}${match[1]}`,
    ),
  ])
}

/** Component paths that have a manifest row AND a GalleryEntry with that id. */
function enteredComponents(source: string): Set<string> {
  return new Set(
    GALLERY_ITEMS.filter((item) =>
      source.includes(`<GalleryEntry id="${item.id}"`),
    ).map((item) => item.path),
  )
}

describe('component gallery guard', () => {
  it('discovers the component files it guards', () => {
    expect(guardedComponents.length).toBeGreaterThan(40)
    expect(guardedComponents).toContain('primitives/sections/Section.astro')
    expect(guardedComponents).toContain('Button.astro')
  })

  it('has a reason for every exempt component and no exempt file is missing', () => {
    for (const [path, reason] of Object.entries(EXEMPT)) {
      expect(reason.length, `${path} needs a reason`).toBeGreaterThan(10)
      expect(
        guardedComponents,
        `${path} is exempt but not a guarded component`,
      ).toContain(path)
    }
  })

  it('has a reason for every exempt directory that still exists', () => {
    for (const [dir, reason] of Object.entries(EXEMPT_DIRS)) {
      expect(reason.length, `${dir} needs a reason`).toBeGreaterThan(10)
      expect(
        existsSync(join(COMPONENTS_DIR, dir)),
        `${dir} is exempt but missing`,
      ).toBe(true)
    }
  })

  it('imports every component in the gallery', () => {
    const imported = importedComponents(gallerySource)
    const missing = guardedComponents.filter(
      (path) => !isExempt(path) && !imported.has(path),
    )
    expect(
      missing,
      'components with no import in the gallery: add them to src/components/demo/',
    ).toEqual([])
  })

  it('has a manifest row and a rendered GalleryEntry for every component', () => {
    const entered = enteredComponents(gallerySource)
    const missing = guardedComponents.filter(
      (path) => !isExempt(path) && !entered.has(path),
    )
    expect(
      missing,
      'components with no GalleryEntry: add a manifest row and an entry',
    ).toEqual([])
  })

  it('keeps the manifest free of stale rows and duplicate ids', () => {
    const ids = GALLERY_ITEMS.map((item) => item.id)
    expect(new Set(ids).size, 'duplicate manifest ids').toBe(ids.length)
    const stale = GALLERY_ITEMS.filter(
      (item) => !existsSync(join(COMPONENTS_DIR, item.path)),
    )
    expect(
      stale.map((item) => item.path),
      'manifest rows for files that do not exist',
    ).toEqual([])
    const exemptInManifest = GALLERY_ITEMS.filter((item) => isExempt(item.path))
    expect(
      exemptInManifest.map((item) => item.path),
      'exempt files must not also have rows',
    ).toEqual([])
  })

  it('fails when a component has no gallery entry (decoy check on in-memory data)', () => {
    const decoy = 'cards/DecoyCard.astro'
    const imported = importedComponents(gallerySource)
    const entered = enteredComponents(gallerySource)
    const files = [...guardedComponents, decoy]
    const unimported = files.filter(
      (path) => !isExempt(path) && !imported.has(path),
    )
    const unentered = files.filter(
      (path) => !isExempt(path) && !entered.has(path),
    )
    expect(unimported).toEqual([decoy])
    expect(unentered).toEqual([decoy])
  })
})
