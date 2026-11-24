/**
 * Short personal notes shown when a technology tile of the logo wall expands (TechLogoWall).
 * Keys are simple-icons slugs from `tech-icons.ts`. A logo without a note shows only its name.
 *
 * Every note is a DRAFT: the owner rewrites them later (owner feedback 2026-11-24, R13). Counts come from the
 * top-level package.json of 139 local repositories on mATX, counted 2026-11-24; monorepos and other machines are
 * not counted.
 */

/** Slug of the logo to its draft note. */
export const TECH_NOTES: Record<string, string> = {
  // DRAFT. SOURCE: count on mATX 2026-11-24, top-level package.json of 139 local repositories
  typescript: 'Main language in 64 of my repositories.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  javascript: 'My first language for the web. I started with jQuery.',
  // DRAFT. SOURCE: count on mATX 2026-11-24, top-level package.json of 139 local repositories
  nodedotjs: '96 of my repositories run on Node.js.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  linux: 'Several of my machines run Linux.',
  // DRAFT. SOURCE: count on mATX 2026-11-24, 139 Git repositories
  git: '139 Git repositories on my main workstation alone.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  npm: 'I publish private packages to my own npm registry on Gitea.',
  // DRAFT. SOURCE: count on mATX 2026-11-24, top-level package.json of 139 local repositories
  playwright:
    'My framework of choice for end-to-end GUI tests. 29 of my repositories use it.',
  // DRAFT. SOURCE: count on mATX 2026-11-24, top-level package.json of 139 local repositories
  vitest: 'Unit tests in 33 of my repositories.',
  // DRAFT. SOURCE: count on mATX 2026-11-24, top-level package.json of 139 local repositories
  react: 'React in 35 of my repositories.',
  // DRAFT. SOURCE: count on mATX 2026-11-24, top-level package.json of 139 local repositories
  astro: '19 of my repositories are Astro sites, this one included.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  backstage: 'Developer portals and custom plugins.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  claude: 'My daily coding agent. I build the harness around it.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  modelcontextprotocol: 'I run several MCP servers, some of them my own.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  homeassistant: 'Runs my own home.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  bluetooth: 'BLE beacons for indoor location.',
  // DRAFT. SOURCE: owner feedback 2026-11-24
  espressif: 'ESP32 sensors and controllers in my smart home.',
}
