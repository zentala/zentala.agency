import type { BoardIconSet, BoardIconSpec } from './board-icons'
import { CANDIDATE_GLYPHS, FA_GLYPHS, type CandidateSet } from '../icon-sets/candidate-glyphs'

/**
 * The semantic icon map (question I4): our names say what an icon means, the map says
 * which glyph draws it and which size and weight each place uses. The board resolves
 * every sample through it, so the tables in I4 are the same data the samples use.
 */
export type IconGroup = 'Nawigacja' | 'Meta wpisu' | 'Kontakt' | 'Akcje' | 'Oferta' | 'Stan'

export interface IconMapEntry {
  /** The meaning-based name a component would ask for. */
  name: string
  group: IconGroup
  /** What the icon stands for on the site. */
  meaning: string
  /** Base glyph name in the chosen set (Phosphor) and in the second choice (Lucide). */
  ph: string
  lucide: string
}

export const ICON_MAP = [
  { name: 'nav-home', group: 'Nawigacja', meaning: 'strona główna', ph: 'house', lucide: 'house' },
  { name: 'nav-capabilities', group: 'Nawigacja', meaning: 'kompetencje', ph: 'squares-four', lucide: 'layout-grid' },
  { name: 'nav-portfolio', group: 'Nawigacja', meaning: 'portfolio, projekty', ph: 'briefcase', lucide: 'briefcase' },
  { name: 'nav-blog', group: 'Nawigacja', meaning: 'blog', ph: 'newspaper', lucide: 'newspaper' },
  { name: 'nav-contact', group: 'Nawigacja', meaning: 'kontakt', ph: 'chat-circle', lucide: 'message-circle' },
  { name: 'arrow-next', group: 'Nawigacja', meaning: 'dalej: jedyna strzałka, bez trzonka', ph: 'caret-right', lucide: 'chevron-right' },
  { name: 'arrow-prev', group: 'Nawigacja', meaning: 'wstecz', ph: 'caret-left', lucide: 'chevron-left' },
  { name: 'external', group: 'Nawigacja', meaning: 'link poza stronę', ph: 'arrow-square-out', lucide: 'external-link' },
  { name: 'date', group: 'Meta wpisu', meaning: 'data publikacji', ph: 'calendar-blank', lucide: 'calendar' },
  { name: 'tag', group: 'Meta wpisu', meaning: 'kategoria, tag', ph: 'tag', lucide: 'tag' },
  { name: 'series', group: 'Meta wpisu', meaning: 'część serii', ph: 'stack', lucide: 'layers' },
  { name: 'reading-time', group: 'Meta wpisu', meaning: 'czas czytania', ph: 'clock', lucide: 'clock' },
  { name: 'author', group: 'Meta wpisu', meaning: 'autor', ph: 'user', lucide: 'user' },
  { name: 'email', group: 'Kontakt', meaning: 'e-mail', ph: 'envelope-simple', lucide: 'mail' },
  { name: 'phone', group: 'Kontakt', meaning: 'telefon', ph: 'phone', lucide: 'phone' },
  { name: 'linkedin', group: 'Kontakt', meaning: 'profil LinkedIn', ph: 'linkedin-logo', lucide: 'linkedin' },
  { name: 'github', group: 'Kontakt', meaning: 'profil GitHub', ph: 'github-logo', lucide: 'github' },
  { name: 'location', group: 'Kontakt', meaning: 'miejsce, lokalizacja', ph: 'map-pin', lucide: 'map-pin' },
  { name: 'book-call', group: 'Akcje', meaning: 'umów rozmowę', ph: 'calendar-plus', lucide: 'calendar-plus' },
  { name: 'send', group: 'Akcje', meaning: 'wyślij wiadomość', ph: 'paper-plane-tilt', lucide: 'send' },
  { name: 'chat', group: 'Akcje', meaning: 'czat na stronie', ph: 'chats-circle', lucide: 'messages-square' },
  { name: 'search', group: 'Akcje', meaning: 'szukaj', ph: 'magnifying-glass', lucide: 'search' },
  { name: 'strategy', group: 'Oferta', meaning: 'doradztwo, pomysł', ph: 'lightbulb', lucide: 'lightbulb' },
  { name: 'design', group: 'Oferta', meaning: 'design i UX', ph: 'palette', lucide: 'palette' },
  { name: 'web', group: 'Oferta', meaning: 'aplikacje webowe', ph: 'globe-hemisphere-west', lucide: 'globe' },
  { name: 'server', group: 'Oferta', meaning: 'serwery, infrastruktura', ph: 'hard-drives', lucide: 'server' },
  { name: 'cloud', group: 'Oferta', meaning: 'chmura', ph: 'cloud', lucide: 'cloud' },
  { name: 'iot', group: 'Oferta', meaning: 'IoT, elektronika', ph: 'cpu', lucide: 'cpu' },
  { name: 'ai-agent', group: 'Oferta', meaning: 'agenci AI, robotyka', ph: 'robot', lucide: 'bot' },
  { name: 'devops', group: 'Oferta', meaning: 'CI/CD, potoki', ph: 'git-branch', lucide: 'git-branch' },
  { name: 'note-info', group: 'Stan', meaning: 'informacja w treści', ph: 'info', lucide: 'info' },
  { name: 'note-warning', group: 'Stan', meaning: 'ostrzeżenie w treści', ph: 'warning', lucide: 'triangle-alert' },
  { name: 'done', group: 'Stan', meaning: 'zrobione, potwierdzenie', ph: 'check', lucide: 'check' },
] as const satisfies readonly IconMapEntry[]

export type SemanticIconName = (typeof ICON_MAP)[number]['name']

/** The set the owner keeps as the main one; Lucide stays as the second choice. */
export const CHOSEN_SET = 'ph' satisfies BoardIconSet

/** One meaning per icon: a glyph that draws two names fails the page. */
for (const column of ['ph', 'lucide'] as const) {
  const glyphs = ICON_MAP.map((entry) => entry[column])
  const repeated = glyphs.find((glyph, index) => glyphs.indexOf(glyph) !== index)
  if (repeated) throw new Error(`Design board: glyph "${repeated}" (${column}) has two meanings`)
}

type MappedSet = 'ph' | 'lucide' | 'fa' | CandidateSet

function glyphFor(name: SemanticIconName, set: MappedSet): string | undefined {
  if (set === 'fa') return FA_GLYPHS[name]
  if (set === 'ph' || set === 'lucide')
    return ICON_MAP.find((entry) => entry.name === name)?.[set]
  return CANDIDATE_GLYPHS[set][name]
}

/**
 * Builds a drawable spec for a semantic name in one set. A set without brand marks
 * borrows the Font Awesome mark, as the footer does.
 */
export function mapIcon(
  name: SemanticIconName,
  set: BoardIconSet,
  options: Omit<BoardIconSpec, 'set' | 'name'>,
): BoardIconSpec {
  if (set === 'si') throw new Error('Design board: Simple Icons has no semantic map')
  const glyph = glyphFor(name, set)
  if (glyph) return { set, name: glyph, ...options }
  const brand = FA_GLYPHS[name]
  if (!brand) throw new Error(`Design board: no "${name}" icon in set "${set}"`)
  return { set: 'fa', name: brand, size: options.size }
}

/** The places an icon appears in. */
export type IconContext =
  | 'footer'
  | 'cardBackground'
  | 'contactCard'
  | 'meta'
  | 'button'
  | 'buttonArrow'
  | 'nav'

export interface IconPlace {
  context: IconContext
  label: string
  /** Size of the text next to the icon in px; null when the icon stands alone. */
  textPx: number | null
  style: Omit<BoardIconSpec, 'name'>
  /** `wybrane`: the owner picked it on the board. `propozycja`: still to be confirmed. */
  status: 'wybrane' | 'propozycja'
  rule: string
}

/** Size and weight per place: the one rule the map carries, so no component picks its own. */
export const ICON_PLACES: readonly IconPlace[] = [
  {
    context: 'footer',
    label: 'Stopka: znaki obok logo',
    textPx: null,
    style: { set: 'fa', size: 33 },
    status: 'wybrane',
    rule: 'Znaki marek z Font Awesome, wypełnione. Wysokość to 0,75 wysokości logo: 33 px przy logo 44 px.',
  },
  {
    context: 'contactCard',
    label: 'Karta na /contact',
    textPx: null,
    style: { set: 'ph', weight: 'thin', size: 176 },
    status: 'wybrane',
    rule: 'Opcja C: duża cienka ikona w tle karty, za tekstem.',
  },
  {
    context: 'cardBackground',
    label: 'Tło karty oferty',
    textPx: null,
    style: { set: 'ph', weight: 'thin', size: 176 },
    status: 'propozycja',
    rule: 'Tak samo jak karta na /contact. Waga Thin tylko od 64 px w górę.',
  },
  {
    context: 'meta',
    label: 'Meta wpisu',
    textPx: 14,
    style: { set: 'ph', weight: 'regular', size: 16 },
    status: 'wybrane',
    rule: 'Opcja E (w meta taka sama jak C): tekst 14 px, ikona 16 px, kreska równo 1 px.',
  },
  {
    context: 'nav',
    label: 'Nawigacja',
    textPx: 16,
    style: { set: 'ph', weight: 'bold', size: 18 },
    status: 'wybrane',
    rule: 'Opcja F: stała kreska, waga Bold. Rozmiar z reguły +2: tekst 16 px, ikona 18 px.',
  },
  {
    context: 'button',
    label: 'Przycisk: ikona',
    textPx: 16,
    style: { set: 'ph', weight: 'bold', size: 18 },
    status: 'propozycja',
    rule: 'Jak nawigacja: tekst 16 px, ikona 18 px, Bold. Dziś ikona ma 20 px i wagę Light.',
  },
  {
    context: 'buttonArrow',
    label: 'Przycisk: strzałka',
    textPx: 16,
    style: { set: 'ph', weight: 'bold', size: 18 },
    status: 'propozycja',
    rule: 'Ta sama ikona i waga co w przycisku; rusza się po najechaniu.',
  },
]

/** Weight by rendered size in the chosen set: the stroke stays between 1,5 and 1,9 px. */
export const WEIGHT_BY_SIZE = [
  { sizes: '16–20 px', weight: 'bold', stroke: '1,5–1,88 px' },
  { sizes: '24 px', weight: 'regular', stroke: '1,5 px' },
  { sizes: '32 px', weight: 'light', stroke: '1,5 px' },
  { sizes: '64 px i więcej', weight: 'thin', stroke: 'od 2 px, rośnie z ikoną' },
] as const

export const placeFor = (context: IconContext): IconPlace =>
  ICON_PLACES.find((place) => place.context === context) as IconPlace
