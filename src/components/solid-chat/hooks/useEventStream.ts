// This file will contain the useEventStream hook.

import { createSignal } from 'solid-js'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import type {
  IAgentReasoning,
  PredictionBody,
  SourceDocument,
  UsedTool,
} from '../types/chat'

type UseEventStreamProps = {
  botId: string
  apiHost?: string
  onMessage: (message: string) => void
  onSourceDocuments: (sourceDocuments: SourceDocument[]) => void
  onUsedTools: (usedTools: UsedTool[]) => void
  onStreamEnd: () => void
}

export const useEventStream = (props: UseEventStreamProps) => {
  let ctrl: AbortController

  const [isMessageStreaming, setIsMessageStreaming] = createSignal(false)
  const [isStreamStarted, setIsStreamStarted] = createSignal(false)
  const [lastAgentReasoning, setLastAgentReasoning] = createSignal<
    IAgentReasoning[]
  >([])

  const fetchResponseFromEventStream = async (body: PredictionBody) => {
    ctrl = new AbortController()
    setIsMessageStreaming(true)
    setIsStreamStarted(false)
    setLastAgentReasoning([])

    await fetchEventSource(
      `${props.apiHost ?? 'http://localhost:3000'}/api/v1/prediction/${props.botId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: ctrl.signal,
        onopen: async (response) => {
          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
          }
        },
        onmessage: (event) => {
          const { data, type } = JSON.parse(event.data)
          if (type === 'start') {
            setIsStreamStarted(true)
          } else if (type === 'token') {
            props.onMessage(data)
          } else if (type === 'sourceDocuments') {
            props.onSourceDocuments(data)
          } else if (type === 'usedTools') {
            props.onUsedTools(data)
          } else if (type === 'end') {
            setIsMessageStreaming(false)
            props.onStreamEnd()
          }
        },
        onerror: (err) => {
          setIsMessageStreaming(false)
          props.onStreamEnd()
          throw err // Rethrow to be caught by the outer catch block
        },
        onclose: () => {
          setIsMessageStreaming(false)
          props.onStreamEnd()
        },
      },
    )
  }

  const abortMessage = () => {
    if (ctrl) {
      ctrl.abort()
    }
    setIsMessageStreaming(false)
  }

  return {
    isMessageStreaming,
    isStreamStarted,
    lastAgentReasoning,
    fetchResponseFromEventStream,
    abortMessage,
  }
}
