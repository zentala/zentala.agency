import { For } from 'solid-js'
import { Marked } from '@ts-stack/markdown'
import type { FileUpload, MessageType } from '../../types/chat'
import { AttachmentIcon } from '../icons'

type Props = {
  message: MessageType
}

const defaultBackgroundColor = '#3B81F6'
const defaultTextColor = '#ffffff'
const defaultFontSize = 16

export const GuestBubble = (props: Props) => {
  Marked.setOptions({
    isNoP: true,
    sanitize: true,
  })

  // Callback ref to set innerHTML and apply text color to all Markdown elements
  const setUserMessageRef = (el: HTMLSpanElement) => {
    if (el) {
      el.innerHTML = Marked.parse(props.message.message)

      // Apply default textColor to all links, headings, and other markdown elements
      el.querySelectorAll(
        'a, h1, h2, h3, h4, h5, h6, strong, em, blockquote, li',
      ).forEach((element) => {
        ;(element as HTMLElement).style.color = defaultTextColor
      })

      // Code blocks (with pre) get white text
      el.querySelectorAll('pre').forEach((element) => {
        ;(element as HTMLElement).style.color = '#FFFFFF'
        // Also ensure any code elements inside pre have white text
        element.querySelectorAll('code').forEach((codeElement) => {
          ;(codeElement as HTMLElement).style.color = '#FFFFFF'
        })
      })

      // Inline code (not in pre) gets green text
      el.querySelectorAll('code:not(pre code)').forEach((element) => {
        ;(element as HTMLElement).style.color = '#4CAF50' // Green color
      })

      // Set target="_blank" for links
      el.querySelectorAll('a').forEach((link) => {
        link.target = '_blank'
      })
    }
  }

  const renderFileUploads = (item: Partial<FileUpload>) => {
    if (item?.mime?.startsWith('image/')) {
      // No apiHost/chatflowid/chatId available, so just use item.data or empty string
      const src = (item.data as string) ?? ''
      return (
        <div class="m-0 mr-[10px] flex max-w-[128px] items-center justify-center p-0">
          <img class="h-full w-full bg-cover" src={src} />
        </div>
      )
    } else if (item?.mime?.startsWith('audio/')) {
      const src = (item.data as string) ?? ''
      return (
        <audio
          class="block h-10 w-[200px] rounded-none bg-cover bg-center text-transparent"
          controls
        >
          Your browser does not support the &lt;audio&gt; tag.
          <source src={src} type={item.mime} />
        </audio>
      )
    } else {
      return (
        <div
          class={`mr-1 inline-flex h-12 max-w-max flex-none items-center rounded-md border border-gray-300 bg-transparent p-2`}
        >
          <AttachmentIcon color={defaultTextColor} />
          <span class={`ml-1.5 text-inherit`}>{item.name}</span>
        </div>
      )
    }
  }

  return (
    <div
      class="guest-container mb-2 flex items-end justify-end"
      style={{ 'margin-left': '50px' }}
    >
      <div
        class="chatbot-guest-bubble mr-2 flex max-w-full flex-col items-start justify-center gap-2 px-4 py-2"
        data-testid="guest-bubble"
        style={{
          'background-color': defaultBackgroundColor,
          color: defaultTextColor,
          'border-radius': '6px',
        }}
      >
        {props.message.fileUploads && props.message.fileUploads.length > 0 && (
          <div class="flex w-full flex-col flex-wrap items-start gap-2">
            <For each={props.message.fileUploads}>
              {(item) => {
                return renderFileUploads(item)
              }}
            </For>
          </div>
        )}
        {props.message.message && (
          <span
            ref={setUserMessageRef}
            class="mr-2 whitespace-pre-wrap"
            style={{
              'font-size': `${defaultFontSize}px`,
            }}
          />
        )}
      </div>
    </div>
  )
}
