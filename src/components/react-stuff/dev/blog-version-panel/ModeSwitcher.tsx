import type { PanelMode } from './types'
import styles from './BlogVersionPanel.module.scss'

type Props = {
  mode: PanelMode
  onChange: (mode: PanelMode) => void
  enabledModes?: PanelMode[]
}

const ALL_MODES: { id: PanelMode; label: string }[] = [
  { id: 'live', label: 'Live' },
  { id: 'snapshot', label: 'Snapshot' },
  { id: 'diff', label: 'Diff' },
]

/** Three-pill mode switcher. Disabled pills show "Coming soon" tooltip. */
export function ModeSwitcher({ mode, onChange, enabledModes = ['live'] }: Props) {
  return (
    <div className={styles.modeSwitcher} role="tablist" aria-label="View mode">
      {ALL_MODES.map((m) => {
        const enabled = enabledModes.includes(m.id)
        const active = m.id === mode
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={active}
            aria-disabled={!enabled}
            title={enabled ? undefined : 'Coming soon'}
            className={`${styles.modePill} ${active ? styles.modePillActive : ''}`}
            onClick={() => enabled && onChange(m.id)}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
