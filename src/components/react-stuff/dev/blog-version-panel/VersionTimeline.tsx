import type { HistoryEntry } from './types'
import { formatRelative } from './formatRelative'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  entries: HistoryEntry[]
  selectedSha: string | null
  onSelect: (sha: string) => void
}

/** Vertical list of commits with major-change dot indicator. */
export function VersionTimeline({ entries, selectedSha, onSelect }: Props) {
  if (entries.length === 0) {
    return <div className={styles.state}>No commits found for this post yet.</div>
  }
  return (
    <div className={styles.timeline} role="list">
      {entries.map((e) => {
        const isSelected = e.sha === selectedSha
        const indicatorTitle = e.isMajor
          ? `Major change — ${e.percentChanged.toFixed(0)}% of lines changed (+${e.linesAdded} / -${e.linesRemoved})`
          : `Minor change — ${e.percentChanged.toFixed(0)}% of lines changed (+${e.linesAdded} / -${e.linesRemoved})`
        return (
          <div
            key={e.sha}
            role="listitem"
            tabIndex={0}
            data-sha={e.sha}
            data-selected={isSelected || undefined}
            data-major={e.isMajor || undefined}
            className={`${styles.row} ${isSelected ? styles.rowSelected : ''} ${e.isMajor ? styles.rowMajor : ''}`}
            onClick={() => onSelect(e.sha)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault()
                onSelect(e.sha)
              }
            }}
            title={e.message}
          >
            <span
              className={`${styles.dot} ${e.isMajor ? styles.dotMajor : ''}`}
              role="img"
              aria-label={indicatorTitle}
              title={indicatorTitle}
              tabIndex={0}
            />
            <span className={styles.rowMessage}>{e.message}</span>
            <span className={styles.rowMeta}>
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
