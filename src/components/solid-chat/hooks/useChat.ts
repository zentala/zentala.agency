// This file will contain the useChat orchestrator hook.

import { createSignal } from 'solid-js'
import { useMessages } from './useMessages'
import { useFileUploads } from './useFileUploads'
import { useEventStream } from './useEventStream'
import { useAudioRecording } from './useAudioRecording'
import { useLeadForm } from './useLeadForm'
import { useFeedback } from './useFeedback'
import { createAttachmentWithFormData } from '../queries/sendMessageQuery'
import type { BotProps, FileUpload } from '../types/chat'

export const useChat = (props: BotProps) => {
  const [input, setInput] = createSignal('')

  const {
    messages,
    addChatMessage,
    updateLastMessage,
    updateLastMessageSourceDocuments,
    updateLastMessageUsedTools,
    clearChat: clearMessages,
  } = useMessages()

  const {
    previews,
    isDragActive,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleDeletePreview,
    clearPreviews,
  } = useFileUploads()

  const {
    isMessageStreaming,
    isStreamStarted,
    lastAgentReasoning,
    fetchResponseFromEventStream,
    abortMessage,
  } = useEventStream({
    botId: props.botId,
    apiHost: props.apiHost,
    onMessage: updateLastMessage,
    onSourceDocuments: updateLastMessageSourceDocuments,
    onUsedTools: updateLastMessageUsedTools,
    onStreamEnd: () => {
      /* Handle stream end if needed */
    },
  })

  const {
    isRecording,
    elapsedTime,
    startRecording,
    stopRecording,
    onMicrophoneClicked,
  } = useAudioRecording({
    botId: props.botId,
    apiHost: props.apiHost,
    onTranscription: (text) => {
      setInput(text)
    },
    onRecordingError: (error) => {
      addChatMessage(error.message, 'apiMessage')
    },
  })

  const { isLeadSaving, isLeadSaved, handleSaveLead } = useLeadForm({
    botId: props.botId,
    apiHost: props.apiHost,
  })

  const {
    isFeedbackDialogOpen,
    feedback,
    openFeedbackDialog,
    closeFeedbackDialog,
    handleSubmitFeedback,
  } = useFeedback({ botId: props.botId, apiHost: props.apiHost })

  const handleFileUploads = async (): Promise<Partial<FileUpload>[]> => {
    if (previews().length === 0) return []

    const uploadPromises = previews().map(async (preview) => {
      const formData = new FormData()
      formData.append('chatId', props.chatId ?? '')
      formData.append('file', preview.file)

      const { data, error } = await createAttachmentWithFormData({
        chatflowid: props.botId,
        apiHost: props.apiHost,
        formData,
      })

      if (error) {
        console.error(`File upload failed: ${preview.name}`, error)
        return null
      }
      return data as FileUpload
    })

    const results = await Promise.all(uploadPromises)
    return results.filter((result) => result !== null) as FileUpload[]
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const userInput = input()
    if (!userInput.trim() && previews().length === 0) return

    addChatMessage(userInput, 'userMessage')
    setInput('')

    const uploadedFiles = await handleFileUploads()
    clearPreviews()

    await fetchResponseFromEventStream({
      question: userInput,
      history: messages().slice(0, -1),
      chatId: props.chatId,
      ...(uploadedFiles.length > 0 && { uploadedFiles }),
    })
  }

  const clearChat = () => {
    clearMessages()
    clearPreviews()
  }

  return {
    input,
    messages,
    previews,
    isDragActive,
    isMessageStreaming,
    isStreamStarted,
    lastAgentReasoning,
    isRecording,
    elapsedTime,
    isLeadSaving,
    isLeadSaved,
    isFeedbackDialogOpen,
    feedback,
    setInput,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleDeletePreview,
    handleSubmit,
    abortMessage,
    startRecording,
    stopRecording,
    onMicrophoneClicked,
    handleSaveLead,
    openFeedbackDialog,
    closeFeedbackDialog,
    handleSubmitFeedback,
    clearChat,
    ...props,
  }
}
