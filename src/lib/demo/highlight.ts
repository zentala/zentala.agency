/**
 * Minimal syntax highlighting for the gallery's props blocks. Returns escaped HTML
 * with `tok-*` spans; the colours live in GalleryEntry and come from site tokens.
 */

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const span = (kind: string, text: string) =>
  `<span class="tok-${kind}">${escapeHtml(text)}</span>`

const TS_TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('[^']*'|"[^"]*"|`[^`]*`)|\b(interface|type|export|extends|readonly)\b|([A-Za-z_]\w*)(\??:)|\b([A-Z]\w*|string|number|boolean|unknown|any|null|undefined|never)\b|(\d+)|([{}()[\];,|<>=?:])/g

/** TypeScript interface source: keys, types, strings, comments. */
export function highlightTypeScript(code: string): string {
  let html = ''
  let last = 0
  for (const match of code.matchAll(TS_TOKEN)) {
    html += escapeHtml(code.slice(last, match.index))
    const [text, comment, str, keyword, key, keySuffix, type, num, punct] = match
    if (comment) html += span('comment', comment)
    else if (str) html += span('str', str)
    else if (keyword) html += span('keyword', keyword)
    else if (key) html += span('key', key) + span('punct', keySuffix)
    else if (type) html += span('type', type)
    else if (num) html += span('str', num)
    else if (punct) html += span('punct', punct)
    else html += escapeHtml(text)
    last = (match.index ?? 0) + text.length
  }
  return html + escapeHtml(code.slice(last))
}

const PLAIN_TOKEN = /([A-Za-z_]\w*)|(\([^)]*\))/g

/** The manifest's plain props summary: `name, variant (a; b, c)`. Names as keys, options as values. */
export function highlightPlainProps(summary: string): string {
  let html = ''
  let last = 0
  for (const match of summary.matchAll(PLAIN_TOKEN)) {
    html += escapeHtml(summary.slice(last, match.index))
    html += match[1] ? span('key', match[1]) : span('str', match[2])
    last = (match.index ?? 0) + match[0].length
  }
  return html + escapeHtml(summary.slice(last))
}
