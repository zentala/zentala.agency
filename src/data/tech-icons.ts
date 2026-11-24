/**
 * Technology logos for tech tags, TechIconGrid and TechLogoWall.
 *
 * Sources (technologies that appear on the site):
 * - /about/capabilities/backstage `techStack`: Backstage, TypeScript, Node.js, React, MCP, Docker, Kubernetes, PostgreSQL
 * - /portfolio and /about/capabilities: RTLS stack (UWB, BLE, RFID, NFC), IoT, robotics (ROS), WordPress, WooCommerce,
 *   smart home (Home Assistant, ESPHome, Zigbee), ESP32, Arduino, Raspberry Pi
 * - blog posts and the harness series: Astro, MDX, Markdown, GitHub, Gitea, Claude, Anthropic, OpenAI, Gemini, Rust,
 *   Playwright, Vite, Tailwind, Linux, Caddy, Cloudflare, Figma, Penpot, Obsidian, Notion, Slack, Python, Bun, Deno, Hono
 * - the capabilities sketch and the owner's stack: Supabase, Solid, Next.js, Electron, Tauri, Proxmox, Tailscale, Nextcloud
 * - site build: Astro, Tailwind CSS, Sass, ESLint, Prettier, npm, Vitest, GitHub Pages
 *
 * `slug` is the simple-icons name. `hex` is the brand colour exactly as simple-icons publishes it: six hex digits,
 * no `#`. Owner ruling 2026-11-21: a technology logo shows its real brand colour on hover, warm hues included
 * (JavaScript yellow, HTML5 orange-red); the no-warm-colour rule stays for the site's own UI. The warm-hex scan in
 * tests/unit/design-guards.test.ts exempts this file by path (`LOGO_DATA_PATH`) and no other.
 *
 * A brand colour too dark to see on the black page (under 3:1, WCAG 1.4.11) falls back to `onDark`, a lighter colour
 * from the same brand's own palette, and otherwise to white: black and near-black marks (GitHub, Notion, Rust) are
 * drawn white on dark backgrounds.
 */
export interface TechIconEntry {
  /** Display name, also the tooltip and the tag lookup key. */
  name: string
  /** simple-icons slug. */
  slug: string
  /** Hover colour on the black page (`#rrggbb`): the brand colour, or its legible fallback. */
  brand: string
  /** Extra names a tag may use for the same technology. */
  aliases?: string[]
}

interface TechIconRow {
  name: string
  slug: string
  hex: string
  onDark?: string
  aliases?: string[]
}

/** Graphics need 3:1 against their background (WCAG 1.4.11); the page is black. */
const MIN_CONTRAST_ON_BLACK = 3
const WHITE = 'ffffff'

const ROWS: TechIconRow[] = [
  // Languages and formats
  { name: 'TypeScript', slug: 'typescript', hex: '3178C6', aliases: ['ts'] },
  { name: 'JavaScript', slug: 'javascript', hex: 'F7DF1E', aliases: ['js'] },
  { name: 'HTML', slug: 'html5', hex: 'E34F26', aliases: ['html5'] },
  { name: 'CSS', slug: 'css3', hex: '1572B6', aliases: ['css3'] },
  { name: 'Sass', slug: 'sass', hex: 'CC6699', aliases: ['scss'] },
  { name: 'Python', slug: 'python', hex: '3776AB' },
  { name: 'Rust', slug: 'rust', hex: '000000' },
  { name: 'Go', slug: 'go', hex: '00ADD8', aliases: ['golang'] },
  { name: 'MDX', slug: 'mdx', hex: '1B1F24' },
  { name: 'Markdown', slug: 'markdown', hex: '000000' },
  // Interfaces and frameworks
  { name: 'React', slug: 'react', hex: '61DAFB' },
  { name: 'Astro', slug: 'astro', hex: 'BC52EE' },
  { name: 'Vue', slug: 'vuedotjs', hex: '4FC08D', aliases: ['vue.js'] },
  { name: 'Solid', slug: 'solid', hex: '2C4F7C', onDark: '76B3E1', aliases: ['solidjs'] },
  { name: 'Next.js', slug: 'nextdotjs', hex: '000000', aliases: ['nextjs'] },
  { name: 'Vite', slug: 'vite', hex: '9135FF' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', hex: '06B6D4', aliases: ['tailwind'] },
  { name: 'Storybook', slug: 'storybook', hex: 'FF4785' },
  { name: 'Electron', slug: 'electron', hex: '47848F' },
  { name: 'Tauri', slug: 'tauri', hex: '24C8D8' },
  { name: 'Android', slug: 'android', hex: '3DDC84' },
  { name: 'Hono', slug: 'hono', hex: 'E36002' },
  { name: 'Zod', slug: 'zod', hex: '408AFF' },
  // Runtimes and data
  { name: 'Node.js', slug: 'nodedotjs', hex: '5FA04E', aliases: ['node', 'nodejs'] },
  { name: 'Bun', slug: 'bun', hex: '000000' },
  { name: 'Deno', slug: 'deno', hex: '000000' },
  { name: 'Supabase', slug: 'supabase', hex: '3FCF8E' },
  { name: 'PostgreSQL', slug: 'postgresql', hex: '4169E1', aliases: ['postgres'] },
  { name: 'SQLite', slug: 'sqlite', hex: '003B57', onDark: '0F80CC' },
  { name: 'Redis', slug: 'redis', hex: 'FF4438' },
  { name: 'Apache Kafka', slug: 'apachekafka', hex: '231F20', aliases: ['kafka'] },
  { name: 'Stripe', slug: 'stripe', hex: '635BFF' },
  // Infrastructure
  { name: 'Docker', slug: 'docker', hex: '2496ED' },
  { name: 'Kubernetes', slug: 'kubernetes', hex: '326CE5', aliases: ['k8s'] },
  { name: 'Linux', slug: 'linux', hex: 'FCC624' },
  { name: 'Ubuntu', slug: 'ubuntu', hex: 'E95420' },
  { name: 'Windows', slug: 'windows', hex: '0078D4' },
  { name: 'Proxmox', slug: 'proxmox', hex: 'E57000' },
  { name: 'Caddy', slug: 'caddy', hex: '1F88C0' },
  { name: 'NGINX', slug: 'nginx', hex: '009639' },
  { name: 'Cloudflare', slug: 'cloudflare', hex: 'F38020' },
  { name: 'Vercel', slug: 'vercel', hex: '000000' },
  { name: 'Tailscale', slug: 'tailscale', hex: '242424' },
  { name: 'Nextcloud', slug: 'nextcloud', hex: '0082C9' },
  { name: 'Grafana', slug: 'grafana', hex: 'F46800' },
  { name: 'Prometheus', slug: 'prometheus', hex: 'E6522C' },
  // Delivery
  { name: 'Git', slug: 'git', hex: 'F03C2E' },
  { name: 'GitHub', slug: 'github', hex: '181717' },
  { name: 'GitHub Actions', slug: 'githubactions', hex: '2088FF' },
  { name: 'Gitea', slug: 'gitea', hex: '609926' },
  { name: 'npm', slug: 'npm', hex: 'CB3837' },
  { name: 'pnpm', slug: 'pnpm', hex: 'F69220' },
  { name: 'ESLint', slug: 'eslint', hex: '4B32C3', onDark: '8080F2' },
  { name: 'Prettier', slug: 'prettier', hex: 'F7B93E' },
  { name: 'Playwright', slug: 'playwright', hex: '2EAD33' },
  { name: 'Vitest', slug: 'vitest', hex: '00FF74' },
  { name: 'Jest', slug: 'jest', hex: 'C21325' },
  // AI
  { name: 'Anthropic', slug: 'anthropic', hex: '191919' },
  { name: 'Claude', slug: 'claude', hex: 'D97757', aliases: ['claude code'] },
  { name: 'OpenAI', slug: 'openai', hex: '412991', aliases: ['codex'] },
  { name: 'Gemini', slug: 'googlegemini', hex: '8E75B2', aliases: ['google gemini'] },
  { name: 'Model Context Protocol', slug: 'modelcontextprotocol', hex: '000000', aliases: ['mcp', 'mcp server'] },
  { name: 'LangChain', slug: 'langchain', hex: '7FC8FF' },
  { name: 'Ollama', slug: 'ollama', hex: '000000' },
  { name: 'OpenRouter', slug: 'openrouter', hex: '94A3B8' },
  // Design, documents and work
  { name: 'Figma', slug: 'figma', hex: 'F24E1E' },
  { name: 'Penpot', slug: 'penpot', hex: '000000' },
  { name: 'Obsidian', slug: 'obsidian', hex: '7C3AED' },
  { name: 'Notion', slug: 'notion', hex: '000000' },
  { name: 'Slack', slug: 'slack', hex: '4A154B' },
  { name: 'Jira', slug: 'jira', hex: '0052CC' },
  { name: 'WordPress', slug: 'wordpress', hex: '21759B' },
  { name: 'WooCommerce', slug: 'woocommerce', hex: '96588A' },
  { name: 'Backstage', slug: 'backstage', hex: '9BF0E1' },
  // Hardware, IoT and robotics
  { name: 'Home Assistant', slug: 'homeassistant', hex: '18BCF2' },
  { name: 'ESPHome', slug: 'esphome', hex: '18BCF2' },
  { name: 'ESP32', slug: 'espressif', hex: 'E7352C', aliases: ['espressif', 'esp'] },
  { name: 'Arduino', slug: 'arduino', hex: '00878F' },
  { name: 'Raspberry Pi', slug: 'raspberrypi', hex: 'A22846', onDark: 'C51A4A' },
  { name: 'Zigbee', slug: 'zigbee', hex: 'EB0443' },
  { name: 'Bluetooth', slug: 'bluetooth', hex: '0082FC', aliases: ['ble'] },
  { name: 'NFC', slug: 'nfc', hex: '002E5F', aliases: ['rfid'] },
  { name: 'ROS', slug: 'ros', hex: '22314E', aliases: ['ros2'] },
]

/** Contrast ratio of a colour against pure black. */
function contrastOnBlack(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05) / 0.05
}

function hoverColour({ hex, onDark }: TechIconRow): string {
  const legible = [hex, onDark].find(
    (candidate) => candidate !== undefined && contrastOnBlack(candidate) >= MIN_CONTRAST_ON_BLACK,
  )
  return `#${legible ?? WHITE}`
}

/** Every logo of the site, in the order above. */
export const TECH_ICONS: TechIconEntry[] = ROWS.map((row) => ({
  name: row.name,
  slug: row.slug,
  brand: hoverColour(row),
  aliases: row.aliases,
}))

const BY_KEY = new Map<string, TechIconEntry>()
for (const entry of TECH_ICONS) {
  BY_KEY.set(entry.name.toLowerCase(), entry)
  for (const alias of entry.aliases ?? []) BY_KEY.set(alias.toLowerCase(), entry)
}

const BY_SLUG = new Map(TECH_ICONS.map((entry) => [entry.slug, entry]))

/** The logo entry for a tag text (case-insensitive, name or alias), or undefined when none exists. */
export function findTechIcon(text: string): TechIconEntry | undefined {
  return BY_KEY.get(text.trim().toLowerCase())
}

/**
 * The logo entry for a simple-icons slug or a name or alias. Throws on an unknown key, so a typo in a logo list
 * fails the build instead of leaving a gap.
 */
export function resolveTechIcon(key: string): TechIconEntry {
  const entry = BY_SLUG.get(key) ?? findTechIcon(key)
  if (!entry) throw new Error(`Tech icons: no logo "${key}" in src/data/tech-icons.ts`)
  return entry
}
