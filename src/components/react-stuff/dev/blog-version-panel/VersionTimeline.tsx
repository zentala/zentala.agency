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
        return (
          <div
            key={e.sha}
            role="listitem"
            data-sha={e.sha}
            data-selected={isSelected || undefined}
            data-major={e.isMajor || undefined}
            className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
            onClick={() => onSelect(e.sha)}
            title={e.message}
          >
            <span
              className={`${styles.dot} ${e.isMajor ? styles.dotMajor : ''}`}
              aria-label={e.isMajor ? 'major change' : 'minor change'}
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
