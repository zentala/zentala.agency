/**
 * Makes links to the dev site work from every computer: a URL on one of the dev hosts becomes a
 * site-relative path, so it opens on whichever host the page was loaded from. Other hosts stay absolute.
 */
const DEV_HOSTS = new Set(['agency.internal', 'agency.matx.lan', 'agency.matx.lan:4300'])

/** `http://agency.internal/mockups/x#y` gives `/mockups/x#y`; a missing link gives undefined. */
export function localizeLink(url: string | undefined): string | undefined {
  if (!url) return undefined
  const match = /^https?:\/\/([^/?#]+)([/?#].*)?$/i.exec(url)
  if (!match || !DEV_HOSTS.has(match[1].toLowerCase())) return url
  const rest = match[2] ?? ''
  return rest.startsWith('/') ? rest : `/${rest}`
}
