import DOMPurify from 'dompurify'

const ALLOWED_TAGS = [
  'a', 'p', 'br', 'hr', 'span', 'div', 'section', 'article',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote',
  'pre', 'code', 'em', 'strong', 'i', 'b', 'u', 's', 'del', 'mark', 'kbd', 'sub', 'sup',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'img', 'figure', 'figcaption',
  'ins',
]

const ALLOWED_ATTR = [
  'href', 'title', 'alt', 'src', 'class', 'id', 'data-line', 'data-language',
  'style', 'target', 'rel', 'aria-hidden', 'role',
]

/** Sanitizes HTML for safe injection into the live page. Defense-in-depth. */
export function sanitizeSnapshot(html: string): string {
  if (typeof window === 'undefined') return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: true,
  })
}
