/**
 * Disabling dead links in built HTML.
 *
 * `<a href="https://dead.example/x" class="c">text</a>` becomes
 * `<span class="link-disabled" data-dead-href="https://dead.example/x">text</span>`.
 * The text and everything inside the link stay; other links are not touched.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { Parser } from 'htmlparser2'
import { linkKey, listHtmlFiles } from './extract.mjs'

const escapeAttribute = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * @param {string} html
 * @param {Set<string>} deadKeys link keys (see `linkKey`) to disable
 * @returns {{ html: string, count: number }}
 */
export function disableDeadLinks(html, deadKeys) {
  const edits = []
  let open = null
  const parser = new Parser({
    onopentag(name, attribs) {
      if (name !== 'a') return
      const key = typeof attribs.href === 'string' ? linkKey(attribs.href) : null
      open = key && deadKeys.has(key)
        ? { start: parser.startIndex, end: parser.endIndex + 1, href: attribs.href }
        : null
    },
    onclosetag(name, isImplied) {
      if (name !== 'a' || !open) return
      const closeStart = parser.startIndex
      const closeEnd = isImplied ? closeStart : parser.endIndex + 1
      const opening = `<span class="link-disabled" data-dead-href="${escapeAttribute(open.href)}">`
      edits.push({ ...open, opening, closeStart, closeEnd })
      open = null
    },
  })
  parser.write(html)
  parser.end()

  let result = html
  for (const edit of edits.reverse()) {
    result =
      result.slice(0, edit.start) +
      edit.opening +
      result.slice(edit.end, edit.closeStart) +
      '</span>' +
      result.slice(edit.closeEnd)
  }
  return { html: result, count: edits.length }
}

/**
 * Rewrite every HTML file under a build output.
 * @param {string} distDir
 * @param {Set<string>} deadKeys
 * @returns {{ files: number, links: number }} files changed and links disabled
 */
export function disableDeadLinksInDist(distDir, deadKeys) {
  const totals = { files: 0, links: 0 }
  if (deadKeys.size === 0) return totals
  for (const file of listHtmlFiles(distDir)) {
    const { html, count } = disableDeadLinks(readFileSync(file, 'utf8'), deadKeys)
    if (count === 0) continue
    writeFileSync(file, html)
    totals.files += 1
    totals.links += count
  }
  return totals
}
