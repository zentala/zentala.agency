import { useEffect, useRef, useState } from 'react'
import { createPatch } from 'diff'
import { html as diffHtml } from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import type { HistoryEntry, VersionPayload } from './types'
import { sanitizeSnapshot } from './sanitize'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  collection: string
  slug: string
  primarySha: string | null
  secondarySha: string | null
  entries: HistoryEntry[]
  onSwap: () => void
}

type LoadState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ready'; a: VersionPayload; b: VersionPayload }
  | { kind: 'error'; message: string }

function orderByDate(
  a: HistoryEntry | undefined,
  b: HistoryEntry | undefined,
): [HistoryEntry, HistoryEntry] | null {
  if (!a || !b) return null
  const ta = new Date(a.date).getTime()
  const tb = new Date(b.date).getTime()
  return ta <= tb ? [a, b] : [b, a]
}

async function fetchVersion(
  collection: string,
  slug: string,
  sha: string,
  signal: AbortSignal,
): Promise<VersionPayload> {
  const res = await fetch(`/api/dev/version/${collection}/${slug}/${sha}.json`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${sha.slice(0, 7)}`)
  return (await res.json()) as VersionPayload
}

function parseToNodes(safeHtml: string): Node[] {
  const doc = new DOMParser().parseFromString(safeHtml, 'text/html')
  return Array.from(doc.body.childNodes)
}

/** Renders side-by-side diff of two versions of the same blog post. */
export function DiffView({ collection, slug, primarySha, secondarySha, entries, onSwap }: Props) {
  const [state, setState] = useState<LoadState>({ kind: 'idle' })
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!primarySha || !secondarySha) {
      setState({ kind: 'idle' })
      return
    }
    if (primarySha === secondarySha) {
      setState({ kind: 'error', message: 'Pick two different versions to diff' })
      return
    }
    const controller = new AbortController()
    setState({ kind: 'loading' })
    Promise.all([
      fetchVersion(collection, slug, primarySha, controller.signal),
      fetchVersion(collection, slug, secondarySha, controller.signal),
    ])
      .then(([a, b]) => setState({ kind: 'ready', a, b }))
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        const message = err instanceof Error ? err.message : String(err)
        setState({ kind: 'error', message })
      })
    return () => controller.abort()
  }, [collection, slug, primarySha, secondarySha])

  useEffect(() => {
    if (state.kind !== 'ready') return
    const el = containerRef.current
    if (!el) return
    const aEntry = entries.find((e) => e.sha === state.a.sha)
    const bEntry = entries.find((e) => e.sha === state.b.sha)
    const ordered = orderByDate(aEntry, bEntry)
    const [older, newer] = ordered
      ? [
          state.a.sha === ordered[0].sha ? state.a : state.b,
          state.a.sha === ordered[1].sha ? state.a : state.b,
        ]
      : [state.a, state.b]
    const patch = createPatch(
      slug,
      older.body,
      newer.body,
      `${older.sha.slice(0, 7)} (older)`,
      `${newer.sha.slice(0, 7)} (newer)`,
    )
    const rawHtml = diffHtml(patch, {
      drawFileList: false,
      outputFormat: 'side-by-side',
      matching: 'lines',
    })
    const safeHtml = sanitizeSnapshot(rawHtml)
    el.replaceChildren(...parseToNodes(safeHtml))
  }, [state, slug, entries])

  if (state.kind === 'idle')
    return <div className={styles.state}>Pick two versions from the timeline to diff.</div>
  if (state.kind === 'loading')
    return <div className={styles.state} data-state="loading">Loading diff…</div>
  if (state.kind === 'error')
    return <div className={styles.state} data-state="error">{state.message}</div>

  return (
    <div className={styles.state} data-state="ready">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <code>{state.a.sha.slice(0, 7)}</code>
        <button className={styles.retryBtn} onClick={onSwap} aria-label="Swap A/B">
          Swap A/B
        </button>
        <code>{state.b.sha.slice(0, 7)}</code>
      </div>
      <div ref={containerRef} style={{ overflow: 'auto', maxHeight: '50vh' }} />
    </div>
  )
}
