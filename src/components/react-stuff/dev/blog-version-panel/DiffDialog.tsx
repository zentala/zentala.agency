import { useEffect, useRef, useState } from 'react'
import { createPatch } from 'diff'
import { html as diffHtml } from 'diff2html'
import { ColorSchemeType } from 'diff2html/lib/types'
import 'diff2html/bundles/css/diff2html.min.css'
import type { HistoryEntry, VersionPayload } from './types'
import { sanitizeSnapshot } from './sanitize'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  open: boolean
  collection: string
  slug: string
  a: HistoryEntry | null
  b: HistoryEntry | null
  repoUrl: string | null
  onClose: () => void
  onSwap: () => void
}

type LoadState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ready'; a: VersionPayload; b: VersionPayload }
  | { kind: 'error'; message: string }

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

/**
 * Full-screen diff overlay rendered into a native <dialog>. Side-by-side
 * diff2html output with DOMPurify sanitization, GitHub compare-URL as
 * secondary action when origin remote is detected.
 */
export function DiffDialog({ open, collection, slug, a, b, repoUrl, onClose, onSwap }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<LoadState>({ kind: 'idle' })

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  useEffect(() => {
    if (!open || !a || !b) {
      setState({ kind: 'idle' })
      return
    }
    if (a.sha === b.sha) {
      setState({ kind: 'error', message: 'Pick two different versions to diff' })
      return
    }
    const controller = new AbortController()
    setState({ kind: 'loading' })
    Promise.all([
      fetchVersion(collection, slug, a.sha, controller.signal),
      fetchVersion(collection, slug, b.sha, controller.signal),
    ])
      .then(([va, vb]) => setState({ kind: 'ready', a: va, b: vb }))
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        const message = err instanceof Error ? err.message : String(err)
        setState({ kind: 'error', message })
      })
    return () => controller.abort()
  }, [open, collection, slug, a, b])

  useEffect(() => {
    if (state.kind !== 'ready') return
    const el = containerRef.current
    if (!el) return
    const ta = new Date(state.a.sha === a?.sha ? a.date : b!.date).getTime()
    const tb = new Date(state.b.sha === b?.sha ? b!.date : a!.date).getTime()
    const [older, newer] = ta <= tb ? [state.a, state.b] : [state.b, state.a]
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
      colorScheme: ColorSchemeType.DARK,
    })
    el.replaceChildren(...parseToNodes(sanitizeSnapshot(rawHtml)))
  }, [state, slug, a, b])

  const ghUrl = repoUrl && a && b ? `${repoUrl}/compare/${a.sha}..${b.sha}` : null

  return (
    <dialog
      ref={dialogRef}
      className={styles.diffDialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className={styles.diffDialogInner}>
        <header className={styles.diffHeader}>
          <div>
            <strong>Diff</strong>
            {a && b && (
              <span className={styles.diffShaPair}>
                <code>{a.shortSha}</code> ↔ <code>{b.shortSha}</code>
              </span>
            )}
          </div>
          <div className={styles.diffHeaderActions}>
            <button className={styles.diffActionBtn} onClick={onSwap}>
              Swap A↔B
            </button>
            {ghUrl && (
              <a
                className={styles.diffActionBtn}
                href={ghUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Open on GitHub ↗
              </a>
            )}
            <button className={styles.diffActionBtn} onClick={onClose} aria-label="Close diff">
              ✕ Close
            </button>
          </div>
        </header>
        {state.kind === 'idle' && <div className={styles.state}>Pick two versions.</div>}
        {state.kind === 'loading' && <div className={styles.state}>Loading diff…</div>}
        {state.kind === 'error' && <div className={styles.state}>{state.message}</div>}
        <div ref={containerRef} className={styles.diffBody} hidden={state.kind !== 'ready'} />
      </div>
    </dialog>
  )
}
