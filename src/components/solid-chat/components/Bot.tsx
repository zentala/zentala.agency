import { For, Show, Switch, Match } from 'solid-js'
import type { BotProps } from '../types/chat'
import { useChat } from '../hooks/useChat'
import { GuestBubble } from '../components/bubbles/GuestBubble'
import { BotBubble } from '../components/bubbles/BotBubble'
import { LoadingBubble } from '../components/bubbles/LoadingBubble'
import { TextInput } from '../components/inputs/textInput/components/TextInput'
import { TypingBubble } from '../components/TypingBubble'
import { LeadCaptureBubble } from '../components/bubbles/LeadCaptureBubble'
import { FeedbackDialog } from '../dialogs/FeedbackDialog'

export const Bot = (props: BotProps) => {
  const chat = useChat(props)

  return (
    <div
      class="flex h-full flex-col"
      style={{ 'background-color': props.backgroundColor ?? '#ffffff' }}
    >
      <Show when={props.showTitle}>
        <div
          class="flex items-center p-4"
          style={{
            'background-color': props.titleBackgroundColor ?? '#f7f8ff',
            color: props.titleTextColor ?? '#303235',
          }}
        >
          <img
            src={props.titleAvatarSrc}
            alt="Avatar"
            class="mr-3 h-10 w-10 rounded-full"
          />
          <span class="text-lg font-semibold">{props.title ?? 'Chatbot'}</span>
        </div>
      </Show>

      <div class="flex-grow overflow-y-auto p-4">
        <For each={chat.messages()}>
          {(message) => (
            <Switch>
              <Match when={message.type === 'userMessage'}>
                <GuestBubble message={message} />
              </Match>
              <Match when={message.type === 'apiMessage'}>
                <BotBubble
                  message={message}
                  onThumbsUpClick={() =>
                    chat.openFeedbackDialog(message.messageId!, 'THUMBS_UP')
                  }
                  onThumbsDownClick={() =>
                    chat.openFeedbackDialog(message.messageId!, 'THUMBS_DOWN')
                  }
                />
              </Match>
              <Match when={message.type === 'usermessagewaiting'}>
                <LoadingBubble />
              </Match>
              <Match when={message.type === 'leadCaptureMessage'}>
                <LeadCaptureBubble
                  leadsConfig={
                    props.chatflowConfig?.leadsToCapture as
                      | import('../types/chat').LeadsConfig
                      | undefined
                  }
                  onSave={(data) => chat.handleSaveLead(props.chatId!, data)}
                  isSaved={chat.isLeadSaved()}
                  isSaving={chat.isLeadSaving()}
                />
              </Match>
            </Switch>
          )}
        </For>
        <Show when={chat.isMessageStreaming()}>
          <TypingBubble />
        </Show>
      </div>

      <TextInput
        backgroundColor={props.textInput?.backgroundColor}
        textColor={props.textInput?.textColor}
        placeholder={props.textInput?.placeholder}
        sendButtonColor={props.textInput?.sendButtonColor}
        value={chat.input()}
        onInput={chat.setInput}
        onSend={() => chat.handleSubmit({ preventDefault: () => {} } as Event)}
        isRecording={chat.isRecording()}
        onMicrophoneClicked={chat.onMicrophoneClicked}
        elapsedTime={chat.elapsedTime()}
        previews={chat.previews()}
        onDeletePreview={chat.handleDeletePreview}
        onFileChange={chat.handleFileChange}
      />

      <Show when={chat.isFeedbackDialogOpen()}>
        <FeedbackDialog
          isOpen={chat.isFeedbackDialogOpen()}
          onClose={chat.closeFeedbackDialog}
          onSubmit={chat.handleSubmitFeedback}
        />
      </Show>
    </div>
  )
}

export type {
  BotProps,
  observersConfigType,
  FileUpload,
  IAction,
} from '../types/chat'
