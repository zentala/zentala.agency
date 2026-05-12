import { useRef } from 'react'
import type { HistoryEntry } from './types'
import { formatRelative } from './formatRelative'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  entries: HistoryEntry[]
  selectedSha: string | null
  diffPickSha: string | null
  diffMode: boolean
  repoUrl: string | null
  onSelect: (sha: string) => void
  onDiffPick: (sha: string) => void
}

function formatAbsoluteDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'
}

/**
 * Vertical timeline. First row is HEAD = "current"; clicking it restores live view.
 * In diff-pick mode, rows show a checkbox to choose the second SHA.
 * Arrow Up/Down navigates focus across rows.
 */
export function VersionTimeline({
  entries,
  selectedSha,
  diffPickSha,
  diffMode,
  repoUrl,
  onSelect,
  onDiffPick,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  if (entries.length === 0) {
    return <div className={styles.state}>No commits found for this post yet.</div>
  }

  function focusSibling(currentIndex: number, delta: number) {
    const next = Math.max(0, Math.min(entries.length - 1, currentIndex + delta))
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-row-index="${next}"]`)
    el?.focus()
  }

  return (
    <div className={styles.timeline} role="list" ref={containerRef}>
      {entries.map((e, i) => {
        const isHead = i === 0
        const isSelected = e.sha === selectedSha
        const isDiffPick = e.sha === diffPickSha
        const indicatorTitle = e.isMajor
          ? `Major change — ${e.percentChanged.toFixed(0)}% of lines changed (+${e.linesAdded} / -${e.linesRemoved})`
          : `Minor change — ${e.percentChanged.toFixed(0)}% of lines changed (+${e.linesAdded} / -${e.linesRemoved})`
        const handleClick = () => {
          if (diffMode) onDiffPick(e.sha)
          else onSelect(e.sha)
        }
        const ghHref = repoUrl ? `${repoUrl}/commit/${e.sha}` : null
        const absoluteDate = formatAbsoluteDate(e.date)
        return (
          <div
            key={e.sha}
            role="listitem"
            tabIndex={0}
            data-row-index={i}
            data-sha={e.sha}
            data-selected={isSelected || undefined}
            data-major={e.isMajor || undefined}
            data-head={isHead || undefined}
            className={`${styles.row} ${isSelected ? styles.rowSelected : ''} ${e.isMajor ? styles.rowMajor : ''}`}
            onClick={handleClick}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault()
                handleClick()
              } else if (ev.key === 'ArrowDown') {
                ev.preventDefault()
                focusSibling(i, 1)
              } else if (ev.key === 'ArrowUp') {
                ev.preventDefault()
                focusSibling(i, -1)
              }
            }}
            title={e.message}
          >
            <span
              className={`${styles.dot} ${e.isMajor ? styles.dotMajor : ''}`}
              role="img"
              aria-label={indicatorTitle}
              title={indicatorTitle}
            />
            <span className={styles.rowMessage}>
              {isHead && <span className={styles.currentBadge}>current</span>}
              {e.message}
            </span>
            <span className={styles.rowMeta}>
              {diffMode && (
                <span className={styles.diffCheck} data-checked={isDiffPick || undefined}>
                  {isDiffPick ? '☑' : '☐'}
                </span>
              )}
              <span>{e.shortSha}</span>
              <span className={styles.linesAdd}>+{e.linesAdded}</span>
              <span className={styles.linesRemove}>-{e.linesRemoved}</span>
              <span title={absoluteDate}>{formatRelative(e.date)}</span>
              {ghHref && (
                <a
                  className={styles.ghIcon}
                  href={ghHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={`View commit on GitHub (${e.shortSha})`}
                  aria-label={`View commit ${e.shortSha} on GitHub`}
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}
