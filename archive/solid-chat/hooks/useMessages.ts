// This file will contain the useMessages hook.

import { createSignal } from 'solid-js'
import { v4 as uuidv4 } from 'uuid'
import type {
  MessageType,
  FileUpload,
  messageType,
  AgentFlowExecutedData,
  IAction,
  IAgentReasoning,
} from '../types/chat'

export const useMessages = () => {
  const [messages, setMessages] = createSignal<MessageType[]>([], {
    equals: false,
  })

  const addChatMessage = (
    message: string,
    type: messageType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sourceDocuments?: any,
    fileUploads?: Partial<FileUpload>[],
  ): MessageType => {
    const messageId = uuidv4()
    const dateTime = new Date().toLocaleString()
    const newMessage: MessageType = {
      messageId,
      message,
      type,
      sourceDocuments,
      fileUploads,
      dateTime,
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage
  }

  const updateLastMessage = (message: string) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      newMessages[newMessages.length - 1].message += message
      return newMessages
    })
  }

  const updateLastMessageSourceDocuments = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sourceDocuments: any,
  ) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      newMessages[newMessages.length - 1].sourceDocuments = sourceDocuments
      return newMessages
    })
  }

  const updateLastMessageUsedTools = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    usedTools: any[],
  ) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      newMessages[newMessages.length - 1].usedTools = usedTools
      return newMessages
    })
  }

  const updateLastMessageAgentReasoning = (
    agentReasoning: IAgentReasoning[],
  ) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      newMessages[newMessages.length - 1].agentReasoning = agentReasoning
      return newMessages
    })
  }

  const updateLastMessageAgentFlowStatus = (agentFlowEventStatus: string) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      newMessages[newMessages.length - 1].agentFlowEventStatus =
        agentFlowEventStatus
      return newMessages
    })
  }

  const updateLastMessageAgentFlowExecutedData = (
    agentFlowExecutedData: AgentFlowExecutedData,
  ) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]
      if (!lastMessage.agentFlowExecutedData)
        lastMessage.agentFlowExecutedData = []
      lastMessage.agentFlowExecutedData.push(agentFlowExecutedData)
      return newMessages
    })
  }

  const updateLastMessageAction = (action: IAction) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      newMessages[newMessages.length - 1].action = action
      return newMessages
    })
  }

  const updateErrorMessage = (message: string) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]
      if (lastMessage.type === 'apiMessage') {
        lastMessage.message = message
        lastMessage.type = 'apiMessage'
      } else {
        lastMessage.type = 'apiMessage'
      }
      return newMessages
    })
  }

  const clearChat = () => {
    setMessages([])
  }

  return {
    messages,
    setMessages,
    addChatMessage,
    updateLastMessage,
    updateLastMessageSourceDocuments,
    updateLastMessageUsedTools,
    updateLastMessageAgentReasoning,
    updateLastMessageAgentFlowStatus,
    updateLastMessageAgentFlowExecutedData,
    updateLastMessageAction,
    updateErrorMessage,
    clearChat,
  }
}
