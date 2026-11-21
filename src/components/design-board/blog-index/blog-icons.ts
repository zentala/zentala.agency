import type { BoardIconSpec } from '../icons-controls/board-icons'
import type { BoardPost } from './data'

/**
 * Own icons for series, categories and single posts (B1, option G): one Phosphor
 * glyph per subject. A post without an entry takes its category icon, a category
 * without one the generic article icon. Names are checked when the board renders:
 * an unknown name fails the page.
 */
const FALLBACK_ICON = 'article'

/** Text plus 2 px, the owner's rule for an icon next to a line of text. */
const ICON_OVER_TEXT_PX = 2
const BACKDROP_ICON_SIZE = 176

const SERIES_ICONS: Record<string, string> = {
  'agent-native-harness': 'toolbox',
  'multi-interface': 'intersect',
  'developer-experience': 'code',
}

const CATEGORY_ICONS: Record<string, string> = {
  DevEx: 'code',
  Harness: 'toolbox',
  'Agent Orchestration': 'robot',
  IA: 'tree-structure',
  Innovation: 'lightbulb',
  'Knowledge & Leverage': 'brain',
  WebDev: 'browser',
}

const POST_ICONS: Record<string, string> = {
  'software-factory-tour': 'factory',
  'software-factory-is-an-automated-sdlc': 'flow-arrow',
  'file-based-lease-for-parallel-agents': 'handshake',
  'the-lease-one-writer-at-a-time': 'signature',
  'i-start-from-the-prototype': 'pencil-ruler',
  'backlog-as-a-self-improvement-structure': 'list-checks',
  'parallel-agents-in-one-repo': 'git-branch',
  'bang-commands-zero-token-cli-for-agents': 'terminal-window',
  'the-context-ladder': 'ladder',
  'the-personal-knowledge-base-system': 'books',
  'confidence-and-story-points-as-throttle': 'gauge',
  'self-executing-instructions': 'file-text',
  'filesystem-is-your-agents-interface': 'folder-open',
  'repeatable-data-structures-agents-generate': 'table',
  'shaking-the-idea-tree': 'tree',
  'agents-leave-feedback-about-their-tooling': 'chat-circle-dots',
  'autogeneration-agent-writes-its-own-environment': 'magic-wand',
  'no-more-localhost-3000': 'globe-simple',
  'one-interface-two-audiences-human-and-agentic': 'users-three',
  'markdown-and-mdx-as-the-substrate': 'markdown-logo',
  'agent-native-how-a-company-processes-data': 'door-open',
  'point-dont-describe-deixis': 'hand-pointing',
  'polymorphic-links-knowledge-graph': 'graph',
  'devex-purpose': 'compass',
  'how-to-deal-with-resistance-when-implementing-dev-portal': 'hand-palm',
  'kickart-backstage-implementation': 'rocket-launch',
  'autonomous-agents-on-backstage': 'robot',
  ia: 'tree-structure',
  'async-continous-onboarding-on-demand': 'graduation-cap',
  'documentation-as-substrate': 'book-open-text',
  'future-of-agentic-ai-automation': 'binoculars',
  'static-webistes-no-time': 'lightning',
}

export const seriesIconName = (slug: string) =>
  SERIES_ICONS[slug] ?? FALLBACK_ICON

export const categoryIconName = (category: string) =>
  CATEGORY_ICONS[category] ?? FALLBACK_ICON

export const postIconName = (post: BoardPost) =>
  POST_ICONS[post.slug] ?? categoryIconName(post.data.category)

/** Phosphor Regular next to text of the given size: thin weights blur this small. */
export const textIcon = (name: string, textPx: number): BoardIconSpec => ({
  set: 'ph',
  name,
  weight: 'regular',
  size: textPx + ICON_OVER_TEXT_PX,
})

/** The large decorative icon behind a cell: Phosphor Thin, which only works big. */
export const backdropIcon = (name: string): BoardIconSpec => ({
  set: 'ph',
  name,
  weight: 'thin',
  size: BACKDROP_ICON_SIZE,
})
