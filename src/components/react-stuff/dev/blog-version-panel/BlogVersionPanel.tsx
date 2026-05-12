import { useEffect, useState } from 'react'
import { PanelChrome } from './PanelChrome'
import { VersionTimeline } from './VersionTimeline'
import { SnapshotView } from './SnapshotView'
import { DiffDialog } from './DiffDialog'
import { summarizeHistory } from './summarizeHistory'
import type { HistoryEntry } from './types'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  collection: string
  slug: string
}

type FetchState =
  | { kind: 'loading' }
  | { kind: 'ready'; entries: HistoryEntry[]; warnings: string[]; repoUrl: string | null }
  | { kind: 'error'; message: string }

/** Top-level state machine. HEAD row = live; any other = snapshot. Diff opens dialog. */
export default function BlogVersionPanel({ collection, slug }: Props) {
  const [state, setState] = useState<FetchState>({ kind: 'loading' })
  // primarySha === null → showing HEAD (live). otherwise snapshot mode.
  const [primarySha, setPrimarySha] = useState<string | null>(null)
  const [diffMode, setDiffMode] = useState(false)
  const [diffPickSha, setDiffPickSha] = useState<string | null>(null)
  const [diffOpen, setDiffOpen] = useState(false)
  const [retryToken, setRetryToken] = useState(0)

  // Ctrl+H / Cmd+H toggles panel via event bus.
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

  // Restore from URL hash on mount.
  useEffect(() => {
    const hash = window.location.hash
    const vMatch = hash.match(/^#v=([a-f0-9]{4,40})$/)
    const dMatch = hash.match(/^#diff=([a-f0-9]{4,40})\.\.([a-f0-9]{4,40})$/)
    if (vMatch) setPrimarySha(vMatch[1])
    else if (dMatch) {
      setDiffMode(true)
      setPrimarySha(dMatch[1])
      setDiffPickSha(dMatch[2])
      setDiffOpen(true)
    }
  }, [])

  // Sync URL hash.
  useEffect(() => {
    if (diffMode && primarySha && diffPickSha) {
      window.history.replaceState(null, '', `#diff=${primarySha}..${diffPickSha}`)
    } else if (primarySha) {
      window.history.replaceState(null, '', `#v=${primarySha}`)
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [primarySha, diffPickSha, diffMode])

  useEffect(() => {
    const controller = new AbortController()
    setState({ kind: 'loading' })
    fetch(`/api/dev/history/${collection}/${slug}.json`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as {
          entries: HistoryEntry[]
          warnings: string[]
          repoUrl: string | null
        }
        setState({
          kind: 'ready',
          entries: json.entries ?? [],
          warnings: json.warnings ?? [],
          repoUrl: json.repoUrl ?? null,
        })
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return
        const message = err instanceof Error ? err.message : String(err)
        setState({ kind: 'error', message })
      })
    return () => controller.abort()
  }, [collection, slug, retryToken])

  function handleSelect(sha: string) {
    if (state.kind !== 'ready') return
    const isHead = state.entries[0]?.sha === sha
    setPrimarySha(isHead ? null : sha)
    setDiffPickSha(null)
  }

  function handleDiffPick(sha: string) {
    if (!primarySha) {
      setPrimarySha(sha)
    } else if (sha === primarySha) {
      setPrimarySha(null)
    } else {
      setDiffPickSha(sha)
      setDiffOpen(true)
    }
  }

  function toggleDiffMode() {
    setDiffMode((prev) => {
      const next = !prev
      if (!next) {
        setDiffPickSha(null)
        setDiffOpen(false)
      }
      return next
    })
  }

  function swapDiff() {
    const a = primarySha
    setPrimarySha(diffPickSha)
    setDiffPickSha(a)
  }

  const aEntry =
    state.kind === 'ready' && primarySha ? state.entries.find((e) => e.sha === primarySha) ?? null : null
  const bEntry =
    state.kind === 'ready' && diffPickSha ? state.entries.find((e) => e.sha === diffPickSha) ?? null : null

  return (
    <PanelChrome>
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
          <button className={styles.retryBtn} onClick={() => setRetryToken((n) => n + 1)}>
            Retry
          </button>
        </div>
      )}
      {state.kind === 'ready' && (
        <>
          <div className={styles.toolbar}>
            <span className={styles.summary}>{summarizeHistory(state.entries)}</span>
            <button
              className={`${styles.diffToggle} ${diffMode ? styles.diffToggleActive : ''}`}
              onClick={toggleDiffMode}
              aria-pressed={diffMode}
            >
              {diffMode ? 'Cancel diff' : 'Compare…'}
            </button>
          </div>
          {diffMode && (
            <div className={styles.diffHint}>
              {primarySha && diffPickSha
                ? 'Two picks selected — see overlay.'
                : primarySha
                  ? 'Pick a second version to compare.'
                  : 'Pick the first version.'}
            </div>
          )}
          <VersionTimeline
            entries={state.entries}
            selectedSha={primarySha}
            diffPickSha={diffPickSha}
            diffMode={diffMode}
            onSelect={handleSelect}
            onDiffPick={handleDiffPick}
          />
          {!diffMode && primarySha && (
            <SnapshotView collection={collection} slug={slug} sha={primarySha} />
          )}
          <DiffDialog
            open={diffOpen}
            collection={collection}
            slug={slug}
            a={aEntry}
            b={bEntry}
            repoUrl={state.repoUrl}
            onClose={() => setDiffOpen(false)}
            onSwap={swapDiff}
          />
        </>
      )}
    </PanelChrome>
  )
}
