/**
 * The one icon map (DESIGN.md P7, DB-1): components ask `SiteIcon` for a meaning and
 * this file names the Phosphor base glyph that draws it, so a glyph changes in one place.
 * Callers never write a Phosphor or Lucide name. The weight comes from the rendered size
 * (`src/lib/siteIcon.ts`), not from this map.
 */
export const ICON_MAP = {
  // Navigation and arrows
  next: 'caret-right',
  prev: 'caret-left',
  'external-link': 'arrow-square-out',
  home: 'house',
  capabilities: 'squares-four',
  portfolio: 'briefcase',
  blog: 'article',

  // Post meta
  date: 'calendar-blank',
  tag: 'tag',
  series: 'stack',
  'reading-time': 'clock',
  person: 'user',
  profile: 'user-circle',
  draft: 'pencil-simple-line',
  review: 'eye',
  edit: 'pencil-simple',

  // Contact and actions
  email: 'envelope-simple',
  phone: 'phone',
  linkedin: 'linkedin-logo',
  github: 'github-logo',
  teams: 'microsoft-teams-logo',
  location: 'map-pin',
  worldwide: 'globe-hemisphere-west',
  message: 'chat-circle',
  comments: 'chat-text',
  'book-call': 'calendar-plus',
  send: 'paper-plane-tilt',
  search: 'magnifying-glass',
  'copy-link': 'link-simple',
  copy: 'copy',
  save: 'floppy-disk',
  add: 'plus',
  faq: 'question',
  'get-started': 'door-open',

  // Offer and capabilities
  strategy: 'lightbulb',
  idea: 'lightbulb-filament',
  design: 'palette',
  architecture: 'blueprint',
  web: 'globe-hemisphere-west',
  commerce: 'shopping-cart',
  mobile: 'device-mobile',
  desktop: 'desktop',
  terminal: 'terminal-window',
  cloud: 'cloud',
  server: 'hard-drives',
  database: 'database',
  network: 'graph',
  iot: 'cpu',
  'ai-agent': 'robot',
  ai: 'brain',
  code: 'code',
  devops: 'git-branch',
  'indoor-location': 'broadcast',
  'smart-home': 'house-line',
  launch: 'rocket-launch',
  partnership: 'handshake',
  projects: 'folder',
  enterprise: 'buildings',
  team: 'users-three',
  training: 'chalkboard-teacher',
  security: 'shield-check',
  audit: 'list-checks',
  build: 'hammer',
  tooling: 'wrench',
  configure: 'gear-six',
  integrations: 'plugs-connected',
  workflow: 'flow-arrow',
  speed: 'lightning',
  continuous: 'infinity',
  discovery: 'compass',
  demo: 'play-circle',
  observe: 'eye',

  // State and notes
  done: 'check',
  'note-tip': 'lightbulb',
  'note-info': 'info',
  'note-success': 'check-circle',
  'note-warning': 'warning',
  recommended: 'star',
  'checkbox-off': 'square',
  'status-open': 'circle',
  'status-declined': 'prohibit',
  'status-outdated': 'clock-counter-clockwise',
  'status-removed': 'eye-slash',
  approve: 'thumbs-up',
  reject: 'thumbs-down',

  // Admin tools
  decisions: 'check-square',
  'broken-links': 'link-break',
  gallery: 'squares-four',
} as const

export type IconMeaning = keyof typeof ICON_MAP
