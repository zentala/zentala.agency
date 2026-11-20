import type { BoardIconSet, BoardIconSpec } from './board-icons'

/**
 * The proposed semantic icon map (question I4): our names say what an icon means,
 * the map says which glyph draws it. The board resolves every sample through it,
 * so the table in I4 is the same data the samples use.
 */
export type IconGroup = 'Nawigacja' | 'Meta wpisu' | 'Kontakt' | 'Akcje' | 'Oferta' | 'Stan'

export interface IconMapEntry {
  /** The meaning-based name a component would ask for. */
  name: string
  group: IconGroup
  /** What the icon stands for on the site. */
  meaning: string
  /** Base glyph name in each candidate set. */
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
  { name: 'book-call', group: 'Akcje', meaning: 'umów rozmowę', ph: 'calendar-blank', lucide: 'calendar' },
  { name: 'send', group: 'Akcje', meaning: 'wyślij wiadomość', ph: 'paper-plane-tilt', lucide: 'send' },
  { name: 'chat', group: 'Akcje', meaning: 'czat na stronie', ph: 'chat-circle', lucide: 'message-circle' },
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

type MappedSet = Extract<BoardIconSet, 'ph' | 'lucide'>

/** Builds a drawable spec for a semantic name in one of the two candidate sets. */
export function mapIcon(
  name: SemanticIconName,
  set: MappedSet,
  options: Omit<BoardIconSpec, 'set' | 'name'>,
): BoardIconSpec {
  const entry = ICON_MAP.find((candidate) => candidate.name === name)
  if (!entry) throw new Error(`Design board: no semantic icon "${name}"`)
  return { set, name: entry[set], ...options }
}
