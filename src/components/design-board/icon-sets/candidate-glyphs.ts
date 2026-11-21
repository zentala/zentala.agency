import type { SemanticIconName } from '../icons-controls/icon-map'

/**
 * Glyph names in the sets the board only compares (question I1). They cover the icons
 * of the six sampled places, not the whole map: a set becomes a full column of the map
 * only when the owner picks it.
 */
export type CandidateSet = 'tabler' | 'iconoir' | 'ms'

export const CANDIDATE_GLYPHS: Record<CandidateSet, Partial<Record<SemanticIconName, string>>> = {
  tabler: {
    'nav-home': 'home',
    'nav-capabilities': 'layout-grid',
    'nav-portfolio': 'briefcase',
    'nav-blog': 'news',
    'nav-contact': 'message-circle',
    'arrow-next': 'chevron-right',
    date: 'calendar',
    tag: 'tag',
    series: 'stack-2',
    linkedin: 'brand-linkedin',
    'book-call': 'calendar-plus',
    send: 'send',
    strategy: 'bulb',
  },
  iconoir: {
    'nav-home': 'home',
    'nav-capabilities': 'view-grid',
    'nav-portfolio': 'suitcase',
    'nav-blog': 'journal',
    'nav-contact': 'chat-bubble-empty',
    'arrow-next': 'nav-arrow-right',
    date: 'calendar',
    tag: 'label',
    series: 'multiple-pages',
    linkedin: 'linkedin',
    'book-call': 'calendar-plus',
    send: 'send-diagonal',
    strategy: 'light-bulb',
  },
  ms: {
    'nav-home': 'home-outline-sharp',
    'nav-capabilities': 'grid-view-outline-sharp',
    'nav-portfolio': 'work-outline-sharp',
    'nav-blog': 'newspaper-sharp',
    'nav-contact': 'chat-bubble-outline-sharp',
    'arrow-next': 'chevron-right-sharp',
    date: 'calendar-today-outline-sharp',
    tag: 'sell-outline-sharp',
    series: 'layers-outline-sharp',
    'book-call': 'calendar-add-on-outline-sharp',
    send: 'send-outline-sharp',
    strategy: 'lightbulb-outline-sharp',
  },
}

/** Font Awesome glyphs: the footer marks, and the fallback for a set with no brand marks. */
export const FA_GLYPHS: Partial<Record<SemanticIconName, string>> = {
  linkedin: 'linkedin',
  github: 'github',
  email: 'envelope',
}
