/**
 * Technology logos for tech tags and the TechIconGrid.
 *
 * Sources (technologies that appear on the site):
 * - /about/capabilities/backstage `techStack`: Backstage, TypeScript, Node.js, React, MCP, Docker, Kubernetes, PostgreSQL
 * - /portfolio and /about/capabilities: RTLS stack (UWB, BLE, RFID, NFC), IoT, robotics, WordPress, WiFi
 * - blog posts and the harness series: Astro, MDX, Markdown, GitHub, Gitea, Claude, Anthropic, OpenAI, Rust,
 *   Playwright, Vite, Tailwind, Linux, Caddy, Cloudflare, Figma, Obsidian, Notion, Slack, Python
 * - site build: Astro, Tailwind CSS, Sass, ESLint, Prettier, npm, GitHub Pages
 *
 * `slug` is the simple-icons name. `brand` is the colour a logo takes on hover. Owner ruling 2026-11-20: no
 * orange, amber or yellow anywhere, so brands in those hues (JavaScript, Rust, HTML5, Git, ...) use the neutral
 * hover colour, and brands too dark for a black page use it too.
 */
export interface TechIconEntry {
  /** Display name, also the tooltip and the tag lookup key. */
  name: string
  /** simple-icons slug. */
  slug: string
  /** Hover colour (hex). */
  brand: string
  /** Extra names a tag may use for the same technology. */
  aliases?: string[]
}

const NEUTRAL = '#e5e7eb'

/** 60 entries: a full last row at 5 columns (wide), 4 (medium) and 3 (narrow). */
export const TECH_ICONS: TechIconEntry[] = [
  { name: 'Backstage', slug: 'backstage', brand: '#9bf0e1' },
  { name: 'TypeScript', slug: 'typescript', brand: '#3178c6', aliases: ['ts'] },
  { name: 'JavaScript', slug: 'javascript', brand: NEUTRAL, aliases: ['js'] },
  { name: 'Node.js', slug: 'nodedotjs', brand: '#5fa04e', aliases: ['node', 'nodejs'] },
  { name: 'React', slug: 'react', brand: '#61dafb' },
  { name: 'Astro', slug: 'astro', brand: '#bc52ee' },
  { name: 'Vite', slug: 'vite', brand: '#a78bfa' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', brand: '#38bdf8', aliases: ['tailwind'] },
  { name: 'Sass', slug: 'sass', brand: '#cd6799', aliases: ['scss'] },
  { name: 'HTML', slug: 'html5', brand: NEUTRAL, aliases: ['html5'] },
  { name: 'CSS', slug: 'css', brand: '#60a5fa', aliases: ['css3'] },
  { name: 'MDX', slug: 'mdx', brand: NEUTRAL },
  { name: 'Markdown', slug: 'markdown', brand: NEUTRAL },
  { name: 'Python', slug: 'python', brand: '#4b8bbe' },
  { name: 'Rust', slug: 'rust', brand: NEUTRAL },
  { name: 'Go', slug: 'go', brand: '#00add8', aliases: ['golang'] },
  { name: 'Docker', slug: 'docker', brand: '#2496ed' },
  { name: 'Kubernetes', slug: 'kubernetes', brand: '#326ce5', aliases: ['k8s'] },
  { name: 'PostgreSQL', slug: 'postgresql', brand: '#4f7fb0', aliases: ['postgres'] },
  { name: 'SQLite', slug: 'sqlite', brand: '#5b9bd5' },
  { name: 'Redis', slug: 'redis', brand: '#dc382d' },
  { name: 'Linux', slug: 'linux', brand: NEUTRAL },
  { name: 'Ubuntu', slug: 'ubuntu', brand: NEUTRAL },
  { name: 'Caddy', slug: 'caddy', brand: '#1f88c0' },
  { name: 'Cloudflare', slug: 'cloudflare', brand: NEUTRAL },
  { name: 'GitHub', slug: 'github', brand: NEUTRAL },
  { name: 'GitHub Actions', slug: 'githubactions', brand: '#2088ff' },
  { name: 'Gitea', slug: 'gitea', brand: '#609926' },
  { name: 'Git', slug: 'git', brand: NEUTRAL },
  { name: 'npm', slug: 'npm', brand: '#cb3837' },
  { name: 'pnpm', slug: 'pnpm', brand: NEUTRAL },
  { name: 'ESLint', slug: 'eslint', brand: '#8080f2' },
  { name: 'Prettier', slug: 'prettier', brand: '#56b3b4' },
  { name: 'Playwright', slug: 'playwright', brand: '#2ead33' },
  { name: 'Vitest', slug: 'vitest', brand: '#6e9f18' },
  { name: 'Anthropic', slug: 'anthropic', brand: NEUTRAL },
  { name: 'Claude', slug: 'claude', brand: NEUTRAL, aliases: ['claude code'] },
  { name: 'OpenAI', slug: 'openai', brand: NEUTRAL, aliases: ['codex'] },
  { name: 'Model Context Protocol', slug: 'modelcontextprotocol', brand: NEUTRAL, aliases: ['mcp', 'mcp server'] },
  { name: 'LangChain', slug: 'langchain', brand: '#1c8a7f' },
  { name: 'Ollama', slug: 'ollama', brand: NEUTRAL },
  { name: 'Figma', slug: 'figma', brand: '#a259ff' },
  { name: 'Obsidian', slug: 'obsidian', brand: '#a78bfa' },
  { name: 'Notion', slug: 'notion', brand: NEUTRAL },
  { name: 'Slack', slug: 'slack', brand: '#9b59b6' },
  { name: 'Jira', slug: 'jira', brand: '#2684ff' },
  { name: 'WordPress', slug: 'wordpress', brand: '#3b82c4' },
  { name: 'Home Assistant', slug: 'homeassistant', brand: '#18bcf2' },
  { name: 'ESP32', slug: 'espressif', brand: '#e7352c', aliases: ['espressif', 'esp'] },
  { name: 'Arduino', slug: 'arduino', brand: '#00979d' },
  { name: 'Raspberry Pi', slug: 'raspberrypi', brand: '#c51a4a' },
  { name: 'Bluetooth', slug: 'bluetooth', brand: '#0082fc', aliases: ['ble'] },
  { name: 'NFC', slug: 'nfc', brand: NEUTRAL, aliases: ['rfid'] },
  { name: 'Grafana', slug: 'grafana', brand: NEUTRAL },
  { name: 'Prometheus', slug: 'prometheus', brand: NEUTRAL },
  { name: 'Stripe', slug: 'stripe', brand: '#635bff' },
  { name: 'Vue', slug: 'vuedotjs', brand: '#42b883', aliases: ['vue.js'] },
  { name: 'Android', slug: 'android', brand: '#3ddc84' },
  { name: 'Apache Kafka', slug: 'apachekafka', brand: NEUTRAL, aliases: ['kafka'] },
  { name: 'Windows', slug: 'windows', brand: '#0078d4' },
]

const BY_KEY = new Map<string, TechIconEntry>()
for (const entry of TECH_ICONS) {
  BY_KEY.set(entry.name.toLowerCase(), entry)
  for (const alias of entry.aliases ?? []) BY_KEY.set(alias.toLowerCase(), entry)
}

/** The logo entry for a tag text (case-insensitive, name or alias), or undefined when none exists. */
export function findTechIcon(text: string): TechIconEntry | undefined {
  return BY_KEY.get(text.trim().toLowerCase())
}
