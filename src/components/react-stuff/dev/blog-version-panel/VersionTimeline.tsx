import type { HistoryEntry } from './types'
import { formatRelative } from './formatRelative'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  entries: HistoryEntry[]
  selectedSha: string | null
  diffPickSha: string | null
  diffMode: boolean
  onSelect: (sha: string) => void
  onDiffPick: (sha: string) => void
}

/**
 * Vertical timeline. First row is HEAD = "current"; clicking it restores live view.
 * In diff-pick mode, rows show a checkbox to choose the second SHA.
 */
export function VersionTimeline({
  entries,
  selectedSha,
  diffPickSha,
  diffMode,
  onSelect,
  onDiffPick,
}: Props) {
  if (entries.length === 0) {
    return <div className={styles.state}>No commits found for this post yet.</div>
  }
  return (
    <div className={styles.timeline} role="list">
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
        return (
          <div
            key={e.sha}
            role="listitem"
            tabIndex={0}
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
              <span>{formatRelative(e.date)}</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
