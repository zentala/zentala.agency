import phIcons from '@iconify-json/ph/icons.json'

/** The one icon set of the site: Phosphor Light. Decision and evidence: DESIGN.md, Decisions table. */
export const ICON_SET_PREFIX = 'ph'
export const ICON_WEIGHT = 'light'

export const ICON_SIZES = { sm: 16, md: 20, lg: 24 } as const
export type IconSize = keyof typeof ICON_SIZES

/** Short names that earlier code used (mostly Lucide) mapped to the Phosphor base name. */
const ALIASES: Record<string, string> = {
  calendar: 'calendar-blank',
  'external-link': 'arrow-square-out',
  linkedin: 'linkedin-logo',
  globe: 'globe-hemisphere-west',
  'message-circle': 'chat-circle',
  rocket: 'rocket-launch',
  'triangle-alert': 'warning',
  layers: 'stack',
  bot: 'robot',
  'layout-grid': 'squares-four',
  radar: 'broadcast',
  network: 'graph',
  terminal: 'terminal-window',
  server: 'hard-drives',
  'square-stack': 'stack-simple',
  blocks: 'cube',
  'pencil-line': 'pencil-simple-line',
  'arrow-right': 'caret-right',
  'chevron-right': 'caret-right',
}

/**
 * Resolves a short icon name to its astro-icon name in the site set.
 * Throws on an unknown name so a typo fails the build instead of rendering an empty box.
 */
export function resolveIconName(name: string): string {
  const base = ALIASES[name] ?? name
  const full = `${base}-${ICON_WEIGHT}`
  const known = phIcons.icons as Record<string, unknown>
  const aliases = (phIcons as { aliases?: Record<string, unknown> }).aliases ?? {}
  if (!(full in known) && !(full in aliases)) {
    throw new Error(`SiteIcon: no Phosphor Light icon "${full}" (from "${name}")`)
  }
  return `${ICON_SET_PREFIX}:${full}`
}
