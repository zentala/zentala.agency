import { useEffect, useState, type ReactNode } from 'react'
import styles from './BlogVersionPanel.module.scss'

const STORAGE_KEY = 'blog-version-panel:collapsed'

type Props = {
  children: ReactNode
}

/** Floating panel chrome with collapse/expand and persisted state. */
export function PanelChrome({ children }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  useEffect(() => {
    try {
      const v = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
      if (v === '1') setCollapsed(true)
    } catch {
      // ignore — localStorage may be blocked
    }
  }, [])

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        // ignore
      }
      return next
    })
  }

  if (collapsed) {
    return (
      <div
        className={`${styles.panel} ${styles.panelCollapsed}`}
        role="button"
        aria-label="Expand blog version panel"
        onClick={toggle}
        data-collapsed="true"
      >
        ⟁
      </div>
    )
  }

  return (
    <aside className={styles.panel} aria-label="Blog version history" data-collapsed="false">
      <header className={styles.header}>
        <span className={styles.title}>BLOG VERSION HISTORY</span>
        <div className={styles.headerActions}>
          <span className={styles.kbdHint} title="Press Ctrl+H to toggle">
            ⌨
          </span>
          <button
            className={styles.collapseBtn}
            onClick={toggle}
            aria-label="Collapse blog version panel"
          >
            —
          </button>
        </div>
      </header>
      {children}
    </aside>
  )
}
