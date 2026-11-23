/**
 * Links hidden from the built site until they work again (owner decision CNT-1, 2026-11-23).
 * The list is the single source: the footer, the rehype plugin for Markdown/MDX, the `.astro`
 * pages and the link monitor all read it. To bring a link back, delete its entry.
 */
export interface ParkedLink {
  url: string
  reason: string
  reenableWhen: string
}

export const PARKED_LINKS: readonly ParkedLink[] = [
  {
    url: 'https://dev.edu.zentala.agency/',
    reason: 'subdomain not deployed (ENOTFOUND)',
    reenableWhen: 'the subdomain resolves and serves the site',
  },
  {
    url: 'https://wifi.edu.zentala.agency/',
    reason: 'subdomain not deployed (ENOTFOUND)',
    reenableWhen: 'the subdomain resolves and serves the site',
  },
  {
    url: 'https://ideas.zentala.agency/',
    reason: 'subdomain not deployed (ENOTFOUND)',
    reenableWhen: 'the subdomain resolves and serves the site',
  },
  {
    url: 'https://gpnf.labs.zentala.agency/',
    reason: 'subdomain not deployed (ENOTFOUND)',
    reenableWhen: 'the gPNF prototype is deployed again',
  },
  {
    url: 'https://github.com/zentala/skills',
    reason: 'repository is private or missing (404)',
    reenableWhen: 'the repository is public',
  },
  {
    url: 'https://github.com/zentala/zntl-tray',
    reason: 'repository is private or missing (404)',
    reenableWhen: 'the repository is public',
  },
]
