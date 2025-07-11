import { Show } from 'solid-js'
import { Marked } from '@ts-stack/markdown'
import type { MessageType } from '../../types/chat'

const defaultBackgroundColor = '#f7f8ff'
const defaultTextColor = '#303235'
const defaultFontSize = 16

export type Props = {
  message: MessageType
  onThumbsUpClick: () => void
  onThumbsDownClick: () => void
}

export const BotBubble = (props: Props) => {
  Marked.setOptions({
    isNoP: true,
    sanitize: true,
  })

  const setBotMessageRef = (el: HTMLSpanElement) => {
    if (el) {
      el.innerHTML = Marked.parse(props.message.message)
      el.querySelectorAll(
        'a, h1, h2, h3, h4, h5, h6, strong, em, blockquote, li',
      ).forEach((element) => {
        ;(element as HTMLElement).style.color = defaultTextColor
      })
      el.querySelectorAll('pre').forEach((element) => {
        ;(element as HTMLElement).style.color = '#FFFFFF'
        element.querySelectorAll('code').forEach((codeElement) => {
          ;(codeElement as HTMLElement).style.color = '#FFFFFF'
        })
      })
      el.querySelectorAll('code:not(pre code)').forEach((element) => {
        ;(element as HTMLElement).style.color = '#4CAF50'
      })
      el.querySelectorAll('a').forEach((link) => {
        link.target = '_blank'
      })
    }
  }

  return (
    <div
      class="bot-container mb-2 flex items-end justify-start"
      style={{ 'margin-right': '50px' }}
    >
      <div
        class="chatbot-bot-bubble mr-2 flex max-w-full flex-col items-start justify-center gap-2 px-4 py-2"
        data-testid="bot-bubble"
        style={{
          'background-color': defaultBackgroundColor,
          color: defaultTextColor,
          'border-radius': '6px',
        }}
      >
        <span
          ref={setBotMessageRef}
          class="mr-2 whitespace-pre-wrap"
          style={{ 'font-size': `${defaultFontSize}px` }}
        />
        <div class="mt-2 flex gap-2">
          <button
            class="rounded bg-green-500 px-3 py-1 text-white"
            onClick={props.onThumbsUpClick}
          >
            👍
          </button>
          <button
            class="rounded bg-red-500 px-3 py-1 text-white"
            onClick={props.onThumbsDownClick}
          >
            👎
          </button>
        </div>
      </div>
    </div>
  )
}
