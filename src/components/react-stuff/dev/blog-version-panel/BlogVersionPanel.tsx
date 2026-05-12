import { useEffect, useState } from 'react'
import { PanelChrome } from './PanelChrome'
import { ModeSwitcher } from './ModeSwitcher'
import { VersionTimeline } from './VersionTimeline'
import { SnapshotView } from './SnapshotView'
import { DiffView } from './DiffView'
import { summarizeHistory } from './summarizeHistory'
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
  const [secondarySha, setSecondarySha] = useState<string | null>(null)
  const [retryToken, setRetryToken] = useState(0)

  // Ctrl+H / Cmd+H toggles collapsed state via event bus.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('blog-version-panel:toggle'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Restore mode + SHAs from URL hash on mount.
  useEffect(() => {
    const hash = window.location.hash
    const vMatch = hash.match(/^#v=([a-f0-9]{4,40})$/)
    const dMatch = hash.match(/^#diff=([a-f0-9]{4,40})\.\.([a-f0-9]{4,40})$/)
    if (vMatch) {
      setMode('snapshot')
      setPrimarySha(vMatch[1])
    } else if (dMatch) {
      setMode('diff')
      setPrimarySha(dMatch[1])
      setSecondarySha(dMatch[2])
    }
  }, [])

  // Sync mode + SHAs to URL hash.
  useEffect(() => {
    if (mode === 'snapshot' && primarySha) {
      window.history.replaceState(null, '', `#v=${primarySha}`)
    } else if (mode === 'diff' && primarySha && secondarySha) {
      window.history.replaceState(null, '', `#diff=${primarySha}..${secondarySha}`)
    } else if (mode === 'live') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [mode, primarySha, secondarySha])

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

  function handleSelect(sha: string) {
    if (mode === 'diff') {
      if (primarySha === null) {
        setPrimarySha(sha)
      } else if (sha === primarySha) {
        setPrimarySha(null)
      } else if (sha === secondarySha) {
        setSecondarySha(null)
      } else if (secondarySha === null) {
        setSecondarySha(sha)
      } else {
        setPrimarySha(sha)
        setSecondarySha(null)
      }
      return
    }
    setPrimarySha(sha)
    if (mode === 'live') setMode('snapshot')
  }

  function handleSwap() {
    setPrimarySha(secondarySha)
    setSecondarySha(primarySha)
  }

  const selectionForTimeline = mode === 'diff' ? primarySha : primarySha

  return (
    <PanelChrome>
      <ModeSwitcher mode={mode} onChange={setMode} enabledModes={['live', 'snapshot', 'diff']} />
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
        <>
          <div className={styles.summary} data-testid="history-summary">
            {summarizeHistory(state.entries)}
          </div>
          <VersionTimeline
            entries={state.entries}
            selectedSha={selectionForTimeline}
            onSelect={handleSelect}
          />
          {mode === 'snapshot' && primarySha && (
            <SnapshotView collection={collection} slug={slug} sha={primarySha} />
          )}
          {mode === 'diff' && (
            <DiffView
              collection={collection}
              slug={slug}
              primarySha={primarySha}
              secondarySha={secondarySha}
              entries={state.entries}
              onSwap={handleSwap}
            />
          )}
        </>
      )}
    </PanelChrome>
  )
}
