import { useEffect, useState } from 'react'
import { PanelChrome } from './PanelChrome'
import { ModeSwitcher } from './ModeSwitcher'
import { VersionTimeline } from './VersionTimeline'
import type { HistoryEntry, PanelMode } from './types'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  collection: string
  slug: string
}

type FetchState =
  | { kind: 'loading' }
  | { kind: 'ready'; entries: HistoryEntry[]; warnings: string[] }
  | { kind: 'error'; message: string }

/** Top-level state machine for the dev blog version panel. */
export default function BlogVersionPanel({ collection, slug }: Props) {
  const [state, setState] = useState<FetchState>({ kind: 'loading' })
  const [mode, setMode] = useState<PanelMode>('live')
  const [primarySha, setPrimarySha] = useState<string | null>(null)
  const [retryToken, setRetryToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ kind: 'loading' })
    fetch(`/api/dev/history/${collection}/${slug}.json`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as { entries: HistoryEntry[]; warnings: string[] }
        setState({ kind: 'ready', entries: json.entries ?? [], warnings: json.warnings ?? [] })
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        const message = err instanceof Error ? err.message : String(err)
        setState({ kind: 'error', message })
      })
    return () => controller.abort()
  }, [collection, slug, retryToken])

  return (
    <PanelChrome>
      <ModeSwitcher mode={mode} onChange={setMode} enabledModes={['live']} />
      {state.kind === 'loading' && (
        <div className={styles.timeline} aria-busy="true" data-state="loading">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      )}
      {state.kind === 'error' && (
        <div className={styles.state} data-state="error">
          Couldn't load history. Check dev console.
          <br />
          <button
            className={styles.retryBtn}
            onClick={() => setRetryToken((n) => n + 1)}
          >
            Retry
          </button>
        </div>
      )}
      {state.kind === 'ready' && (
        <VersionTimeline
          entries={state.entries}
          selectedSha={primarySha}
          onSelect={setPrimarySha}
        />
      )}
    </PanelChrome>
  )
}
