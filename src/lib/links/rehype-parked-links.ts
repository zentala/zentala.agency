import type { Element, Root, RootContent } from 'hast'
import type { ParkedLink } from '../../data/parked-links'
import { PARKED_LINKS } from '../../data/parked-links'
import { isParkedLink } from './parked'

type Parent = Root | Element

/** Replaces every `<a>` whose href is parked with its own children, so the text stays and the link goes. */
function unwrapParked(parent: Parent, list: readonly ParkedLink[]): void {
  const next: RootContent[] = []
  for (const child of parent.children) {
    if (child.type === 'element') unwrapParked(child, list)
    const href = child.type === 'element' ? child.properties?.href : undefined
    const parked =
      child.type === 'element' &&
      child.tagName === 'a' &&
      typeof href === 'string' &&
      isParkedLink(href, list)
    if (parked) next.push(...child.children)
    else next.push(child)
  }
  parent.children = next
}

/** Rehype plugin: hides parked links in Markdown and MDX content without editing the files. */
export function rehypeParkedLinks(options: { list?: readonly ParkedLink[] } = {}) {
  const list = options.list ?? PARKED_LINKS
  return (tree: Root) => unwrapParked(tree, list)
}
