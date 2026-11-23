import { PARKED_LINKS, type ParkedLink } from '../../data/parked-links'

const normalise = (url: string) => url.trim().replace(/\/+$/, '')

/** The parked entry for `href` (trailing slash ignored), or undefined for an empty or other link. */
export function findParkedLink(
  href: string | null | undefined,
  list: readonly ParkedLink[] = PARKED_LINKS,
): ParkedLink | undefined {
  if (!href) return undefined
  const wanted = normalise(href)
  return list.find((entry) => normalise(entry.url) === wanted)
}

export const isParkedLink = (
  href: string | null | undefined,
  list: readonly ParkedLink[] = PARKED_LINKS,
): boolean => findParkedLink(href, list) !== undefined
