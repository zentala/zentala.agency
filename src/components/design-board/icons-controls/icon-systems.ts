import type { BoardIconSpec } from './board-icons'
import { mapIcon, type SemanticIconName } from './icon-map'

/**
 * The icon systems compared in question I1. A system is one answer for the whole
 * site: which set, and which weight and size it uses in each context.
 */
export type IconContext =
  | 'footer'
  | 'cardBackground'
  | 'contactCard'
  | 'meta'
  | 'button'
  | 'buttonArrow'
  | 'nav'

export type SystemKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

type ContextStyle = Omit<BoardIconSpec, 'name'>

export interface IconSystem {
  key: SystemKey
  label: string
  /** `null`: this system shows no icon in that context. */
  contexts: Record<IconContext, ContextStyle | null>
  /** Resting opacity of the large background icon. */
  backgroundOpacity: number
  /** Where the /contact card icon sits. */
  contactPlacement: 'background' | 'heading'
}

/** Font Awesome glyph names of the original footer, by semantic name. */
const LEGACY_FOOTER_GLYPHS: Partial<Record<SemanticIconName, string>> = {
  linkedin: 'linkedin',
  github: 'github',
  email: 'envelope',
}

export const ICON_SYSTEMS: readonly IconSystem[] = [
  {
    key: 'A',
    label: 'Przed zmianami',
    backgroundOpacity: 0.06,
    contactPlacement: 'background',
    contexts: {
      footer: { set: 'fa', size: 33 },
      cardBackground: { set: 'ph', weight: 'thin', size: 128 },
      contactCard: { set: 'ph', weight: 'thin', size: 128 },
      meta: { set: 'lucide', stroke: 1.5, size: 16 },
      button: { set: 'lucide', stroke: 1.5, size: 20 },
      buttonArrow: { set: 'lucide', stroke: 2, size: 16 },
      nav: null,
    },
  },
  {
    key: 'B',
    label: 'Obecnie',
    backgroundOpacity: 0.06,
    contactPlacement: 'heading',
    contexts: {
      footer: { set: 'ph', weight: 'light', size: 24 },
      cardBackground: { set: 'ph', weight: 'light', size: 128 },
      contactCard: { set: 'ph', weight: 'light', size: 40 },
      meta: { set: 'ph', weight: 'light', size: 16 },
      button: { set: 'ph', weight: 'light', size: 20 },
      buttonArrow: { set: 'ph', weight: 'light', size: 16 },
      nav: { set: 'ph', weight: 'light', size: 16 },
    },
  },
  {
    key: 'C',
    label: 'Phosphor, waga wg miejsca',
    backgroundOpacity: 0.1,
    contactPlacement: 'background',
    contexts: {
      footer: { set: 'ph', weight: 'fill', size: 32 },
      cardBackground: { set: 'ph', weight: 'thin', size: 176 },
      contactCard: { set: 'ph', weight: 'thin', size: 176 },
      meta: { set: 'ph', weight: 'regular', size: 16 },
      button: { set: 'ph', weight: 'regular', size: 20 },
      buttonArrow: { set: 'ph', weight: 'regular', size: 16 },
      nav: { set: 'ph', weight: 'regular', size: 16 },
    },
  },
  {
    key: 'D',
    label: 'Lucide (odrzucone)',
    backgroundOpacity: 0.1,
    contactPlacement: 'background',
    contexts: {
      footer: { set: 'lucide', stroke: 1.5, size: 32 },
      cardBackground: { set: 'lucide', stroke: 1.25, hairline: true, size: 176 },
      contactCard: { set: 'lucide', stroke: 1.25, hairline: true, size: 176 },
      meta: { set: 'lucide', stroke: 1.5, size: 16 },
      button: { set: 'lucide', stroke: 1.25, size: 20 },
      buttonArrow: { set: 'lucide', stroke: 1.5, size: 16 },
      nav: { set: 'lucide', stroke: 1.5, size: 16 },
    },
  },
  {
    key: 'E',
    label: 'Regular w ostrych rozmiarach',
    backgroundOpacity: 0.06,
    contactPlacement: 'background',
    contexts: {
      footer: { set: 'ph', weight: 'regular', size: 32 },
      cardBackground: { set: 'ph', weight: 'thin', size: 128 },
      contactCard: { set: 'ph', weight: 'thin', size: 128 },
      meta: { set: 'ph', weight: 'regular', size: 16 },
      button: { set: 'ph', weight: 'regular', size: 16 },
      buttonArrow: { set: 'ph', weight: 'regular', size: 16 },
      nav: { set: 'ph', weight: 'regular', size: 16 },
    },
  },
  {
    key: 'F',
    label: 'Stała kreska 1,5 px',
    backgroundOpacity: 0.06,
    contactPlacement: 'background',
    contexts: {
      footer: { set: 'ph', weight: 'light', size: 32 },
      cardBackground: { set: 'ph', weight: 'thin', size: 128 },
      contactCard: { set: 'ph', weight: 'thin', size: 128 },
      meta: { set: 'ph', weight: 'bold', size: 16 },
      button: { set: 'ph', weight: 'regular', size: 24 },
      buttonArrow: { set: 'ph', weight: 'bold', size: 16 },
      nav: { set: 'ph', weight: 'bold', size: 16 },
    },
  },
]

export const getSystem = (key: SystemKey): IconSystem =>
  ICON_SYSTEMS.find((system) => system.key === key) as IconSystem

/** The drawable spec for a semantic icon in one context of a system, or null when it shows none. */
export function systemIcon(
  system: IconSystem,
  context: IconContext,
  name: SemanticIconName,
): BoardIconSpec | null {
  const style = system.contexts[context]
  if (!style) return null
  if (style.set === 'fa') {
    const glyph = LEGACY_FOOTER_GLYPHS[name]
    if (!glyph) throw new Error(`Design board: no legacy footer glyph for "${name}"`)
    return { ...style, name: glyph }
  }
  if (style.set !== 'ph' && style.set !== 'lucide')
    throw new Error(`Design board: set "${style.set}" has no semantic map`)
  const { set, ...options } = style
  return mapIcon(name, set, options)
}
