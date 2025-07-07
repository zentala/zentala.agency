import { For, createEffect } from 'solid-js'
import { Marked } from '@ts-stack/markdown'
import type { FileUpload } from '../../types/chat'
import { cloneDeep } from 'lodash'

type Props = {
  apiHost?: string
  chatflowid: string
  chatId: string
  agentName: string
  agentMessage: string
  agentArtifacts?: FileUpload[]
  backgroundColor?: string
  textColor?: string
  fontSize?: number
  renderHTML?: boolean
}

const defaultBackgroundColor = '#f7f8ff'
const defaultTextColor = '#303235'
const defaultFontSize = 16

export const AgentReasoningBubble = (props: Props) => {
  let botMessageEl: HTMLDivElement | undefined
  Marked.setOptions({
    isNoP: true,
    sanitize: props.renderHTML !== undefined ? !props.renderHTML : true,
  })

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(
        `**✅ ${props.agentName}** \n\n${props.agentMessage}`,
      )
      botMessageEl.querySelectorAll('a').forEach((link) => {
        link.target = '_blank'
      })
    }
  })

  const agentReasoningArtifacts = (artifacts: FileUpload[]) => {
    const newArtifacts = cloneDeep(artifacts)
    for (let i = 0; i < newArtifacts.length; i++) {
      const artifact = newArtifacts[i]
      if (artifact && (artifact.type === 'png' || artifact.type === 'jpeg')) {
        const data = artifact.data as string
        newArtifacts[i].data =
          `${props.apiHost}/api/v1/get-upload-file?chatflowId=${props.chatflowid}&chatId=${props.chatId}&fileName=${data.replace(
            'FILE-STORAGE::',
            '',
          )}`
      }
    }
    return newArtifacts
  }

  const renderArtifacts = (item: Partial<FileUpload>) => {
    if (item.type === 'png' || item.type === 'jpeg') {
      const src = item.data as string
      return (
        <div class="m-0 mr-[10px] flex max-w-[128px] items-center justify-center p-0">
          <img class="h-full w-full bg-cover" src={src} />
        </div>
      )
    } else if (item.type === 'html') {
      const src = item.data as string
      return (
        <div class="mt-2">
          <div innerHTML={src} />
        </div>
      )
    } else {
      const src = item.data as string
      return (
        <span
          innerHTML={Marked.parse(src)}
          class="prose"
          style={{
            'background-color': props.backgroundColor ?? defaultBackgroundColor,
            color: props.textColor ?? defaultTextColor,
            'border-radius': '6px',
            'font-size': props.fontSize
              ? `${props.fontSize}px`
              : `${defaultFontSize}px`,
          }}
        />
      )
    }
  }

  return (
    <div class="mb-6">
      {props.agentArtifacts && (
        <div class="flex w-full flex-row flex-wrap items-start gap-2">
          <For each={agentReasoningArtifacts(props.agentArtifacts)}>
            {(item) => {
              return item !== null ? <>{renderArtifacts(item)}</> : null
            }}
          </For>
        </div>
      )}
      {props.agentMessage && (
        <span
          ref={botMessageEl}
          class="prose"
          style={{
            'background-color': props.backgroundColor ?? defaultBackgroundColor,
            color: props.textColor ?? defaultTextColor,
            'font-size': props.fontSize
              ? `${props.fontSize}px`
              : `${defaultFontSize}px`,
          }}
        />
      )}
    </div>
  )
}
