import { LINE_GRID_GROUP } from './groups/lineGrid'
import { PRIMITIVES_GROUP } from './groups/primitives'
import { CARDS_GROUP } from './groups/cards'
import { BLOG_GROUP } from './groups/blog'
import { BANNERS_GROUP } from './groups/banners'
import { GENERAL_GROUP } from './groups/general'
import { SECTIONS_GROUP } from './groups/sections'
import { VARIANTS_GROUP } from './groups/variants'
import { TECH_LOGOS_GROUP } from './groups/techLogos'
import { CAPABILITIES_GROUP } from './groups/capabilities'

/**
 * The gallery manifest: one row per component shown on /demo. `GalleryEntry` reads
 * its title, path, purpose and props from here by `id`, and the index at the top of
 * the page is built from it. `tests/unit/component-gallery.test.ts` fails when a
 * component file has no row here or no `<GalleryEntry id="...">` using it.
 */
export interface GalleryItem {
  id: string
  name: string
  /** Path relative to `src/components/`; `../sections/...` for files in `src/sections/`. */
  path: string
  purpose: string
  /** Plain props summary: names, with options and defaults in parentheses. */
  props: string
  /** What the owner should know that the source does not say (an article widget, missing assets). */
  note?: string
  /** Link target for the note, when it points at a page. */
  noteHref?: string
  /** Where it is used when the import graph cannot see it (a dynamic import). */
  usedNote?: string
}

export interface GalleryGroup {
  title: string
  items: GalleryItem[]
}

export const GALLERY_GROUPS: GalleryGroup[] = [
  LINE_GRID_GROUP,
  PRIMITIVES_GROUP,
  CARDS_GROUP,
  BLOG_GROUP,
  BANNERS_GROUP,
  GENERAL_GROUP,
  SECTIONS_GROUP,
  VARIANTS_GROUP,
  TECH_LOGOS_GROUP,
  CAPABILITIES_GROUP,
]

export const GALLERY_ITEMS: GalleryItem[] = GALLERY_GROUPS.flatMap(
  (group) => group.items,
)
