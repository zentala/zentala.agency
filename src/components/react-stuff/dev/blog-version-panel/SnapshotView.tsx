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

function parseToNodes(sanitizedHtml: string): Node[] {
  const doc = new DOMParser().parseFromString(sanitizedHtml, 'text/html')
  return Array.from(doc.body.childNodes)
}

/**
 * Swaps the live blog body with historical HTML at the given SHA.
 * On unmount or sha change, restores the original DOM captured on entry.
 * Uses DOMPurify + DOMParser.replaceChildren (no innerHTML assignment).
 */
export function SnapshotView({ collection, slug, sha, targetSelector = DEFAULT_TARGET }: Props) {
  const [state, setState] = useState<FetchState>({ kind: 'idle' })
  const originalChildrenRef = useRef<Node[] | null>(null)
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
    if (originalChildrenRef.current === null) {
      originalChildrenRef.current = Array.from(el.childNodes).map((n) => n.cloneNode(true))
    }
    targetRef.current = el
    el.dataset.snapshotSha = state.payload.sha
    const sanitized = sanitizeSnapshot(state.payload.html)
    el.replaceChildren(...parseToNodes(sanitized))
    return () => {
      const original = originalChildrenRef.current
      const target = targetRef.current
      if (target && original !== null) {
        target.replaceChildren(...original)
        delete target.dataset.snapshotSha
      }
      originalChildrenRef.current = null
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
