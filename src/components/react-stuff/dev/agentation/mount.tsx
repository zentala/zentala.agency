import { createRoot } from 'react-dom/client'
import { AgentationReview } from './AgentationReview'

const CONTAINER_ID = 'agentation-review-root'
/** Keeps the round button clear of the chat bubble slot (bottom-right). */
const TOOLBAR_OFFSET_CSS = 'agentation-toolbar { bottom: 5.5rem; }'

if (!document.getElementById(CONTAINER_ID)) {
  const container = document.createElement('div')
  container.id = CONTAINER_ID
  document.body.appendChild(container)

  const style = document.createElement('style')
  style.textContent = TOOLBAR_OFFSET_CSS
  document.head.appendChild(style)

  createRoot(container).render(<AgentationReview />)
}
