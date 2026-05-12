import { useEffect, useRef, useState } from 'react'
import type { VersionPayload } from './types'
import { sanitizeSnapshot } from './sanitize'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  collection: string
  slug: string
  sha: string | null
  targetSelector?: string
}

type FetchState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ready'; payload: VersionPayload }
  | { kind: 'error'; message: string }

const DEFAULT_TARGET = '#post-content'

type Swap = { el: HTMLElement; original: string }

function parseToNodes(sanitizedHtml: string): Node[] {
  const doc = new DOMParser().parseFromString(sanitizedHtml, 'text/html')
  return Array.from(doc.body.childNodes)
}

function captureBody(el: HTMLElement): { children: Node[]; sha: string | undefined } {
  return {
    children: Array.from(el.childNodes).map((n) => n.cloneNode(true)),
    sha: el.dataset.snapshotSha,
  }
}

function setText(selector: string, value: unknown, swaps: Swap[]): void {
  if (typeof value !== 'string' || value.length === 0) return
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return
  swaps.push({ el, original: el.textContent ?? '' })
  el.textContent = value
}

function setTextFormatted(
  selector: string,
  raw: unknown,
  format: (s: string) => string,
  swaps: Swap[],
): void {
  if (typeof raw !== 'string' || raw.length === 0) return
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return
  swaps.push({ el, original: el.textContent ?? '' })
  el.textContent = format(raw)
}

function formatBlogDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * Swaps the live blog body + header (title, excerpt, date) with the historical
 * version. Restores everything on unmount or sha change. DOMPurify on body HTML;
 * frontmatter strings injected via textContent (no HTML injection).
 */
export function SnapshotView({ collection, slug, sha, targetSelector = DEFAULT_TARGET }: Props) {
  const [state, setState] = useState<FetchState>({ kind: 'idle' })
  const originalBodyRef = useRef<{ children: Node[]; sha: string | undefined } | null>(null)
  const headerSwapsRef = useRef<Swap[]>([])
  const targetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!sha) return
    const controller = new AbortController()
    setState({ kind: 'loading' })
    fetch(`/api/dev/version/${collection}/${slug}/${sha}.json`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const payload = (await res.json()) as VersionPayload
        setState({ kind: 'ready', payload })
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        const message = err instanceof Error ? err.message : String(err)
        setState({ kind: 'error', message })
      })
    return () => controller.abort()
  }, [collection, slug, sha])

  useEffect(() => {
    if (state.kind !== 'ready') return
    const el = document.querySelector<HTMLElement>(targetSelector)
    if (!el) return
    if (originalBodyRef.current === null) originalBodyRef.current = captureBody(el)
    targetRef.current = el
    el.dataset.snapshotSha = state.payload.sha
    const sanitized = sanitizeSnapshot(state.payload.html)
    el.replaceChildren(...parseToNodes(sanitized))

    // Header swap — frontmatter fields. Strings only, via textContent.
    const swaps: Swap[] = []
    const fm = state.payload.frontmatter
    setText('[data-blog-title]', fm.title, swaps)
    setText('[data-blog-excerpt]', fm.excerpt, swaps)
    setTextFormatted('[data-blog-date]', fm.date, formatBlogDate, swaps)
    headerSwapsRef.current = swaps

    return () => {
      const original = originalBodyRef.current
      const target = targetRef.current
      if (target && original !== null) {
        target.replaceChildren(...original.children)
        delete target.dataset.snapshotSha
      }
      for (const { el: hEl, original: text } of headerSwapsRef.current) {
        hEl.textContent = text
      }
      headerSwapsRef.current = []
      originalBodyRef.current = null
      targetRef.current = null
    }
  }, [state, targetSelector])

  if (state.kind === 'loading') {
    return <div className={styles.state} data-state="loading">Loading snapshot…</div>
  }
  if (state.kind === 'error') {
    return <div className={styles.state} data-state="error">Snapshot failed: {state.message}</div>
  }
  if (state.kind === 'ready') {
    const warnings = state.payload.warnings
    return (
      <div className={styles.state} data-state="ready">
        Viewing snapshot at <code>{state.payload.sha.slice(0, 7)}</code>
        {warnings.length > 0 && (
          <div style={{ marginTop: 8, opacity: 0.7 }}>
            {warnings.map((w, i) => (
              <div key={i}>⚠ {w}</div>
            ))}
          </div>
        )}
      </div>
    )
  }
  return <div className={styles.state}>Select a version from the timeline.</div>
}
