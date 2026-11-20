import { LINE_GRID_GROUP } from './groups/lineGrid'
import { PRIMITIVES_GROUP } from './groups/primitives'
import { CARDS_GROUP } from './groups/cards'
import { BLOG_GROUP } from './groups/blog'
import { BANNERS_GROUP } from './groups/banners'
import { GENERAL_GROUP } from './groups/general'

/**
 * The gallery manifest: one row per component shown on /demo. `GalleryEntry` reads
 * its title, path, purpose and props from here by `id`, and the index at the top of
 * the page is built from it. `tests/unit/component-gallery.test.ts` fails when a
 * component file has no row here or no `<GalleryEntry id="...">` using it.
 */
export interface GalleryItem {
  id: string
  name: string
  /** Path relative to `src/components/`. */
  path: string
  purpose: string
  props: string
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
]

export const GALLERY_ITEMS: GalleryItem[] = GALLERY_GROUPS.flatMap(
  (group) => group.items,
)
