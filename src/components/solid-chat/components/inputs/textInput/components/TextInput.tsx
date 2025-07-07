import { SendButton } from '@/components/solid-chat/components/buttons/SendButton'
import { RecordAudioButton } from '@/components/solid-chat/components/buttons/RecordAudioButton'

// Only the orchestrator props
// backgroundColor, textColor, placeholder, sendButtonColor, value, onInput, onSend, isRecording, onMicrophoneClicked, elapsedTime, previews, onDeletePreview, onFileChange

type TextInputProps = {
  backgroundColor?: string
  textColor?: string
  placeholder?: string
  sendButtonColor?: string
  value: string
  onInput: (value: string) => void
  onSend: () => void
  isRecording: boolean
  onMicrophoneClicked: () => void
  elapsedTime: number
  previews: { name: string }[]
  onDeletePreview: (name: string) => void
  onFileChange: (files: FileList | null) => void
}

const defaultBackgroundColor = '#ffffff'
const defaultTextColor = '#303235'

export const TextInput = (props: TextInputProps) => {
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    props.onInput(target.value)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - keyCode is deprecated but still used for IME composition detection
      const isIMEComposition =
        e.isComposing ||
        (e as KeyboardEvent & { keyCode?: number }).keyCode === 229
      if (!isIMEComposition) {
        e.preventDefault()
        props.onSend()
      }
    }
  }

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    props.onFileChange(target.files)
    if (target) target.value = ''
  }

  return (
    <div
      class="chatbot-input flex h-auto min-h-[56px] w-full items-end border border-[#eeeeee]"
      data-testid="input"
      style={{
        margin: 'auto',
        'background-color': props.backgroundColor ?? defaultBackgroundColor,
        color: props.textColor ?? defaultTextColor,
      }}
      onKeyDown={handleKeyDown}
    >
      <textarea
        class="flex-1 resize-none bg-transparent px-4 py-4 focus:outline-none"
        value={props.value}
        onInput={handleInput}
        placeholder={props.placeholder ?? 'Type your question'}
        rows={1}
      />
      <RecordAudioButton
        buttonColor={props.sendButtonColor}
        type="button"
        class="start-recording-button m-0 flex h-14 items-center justify-center"
        isDisabled={props.isRecording}
        on:click={props.onMicrophoneClicked}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>
          Record Audio
        </span>
      </RecordAudioButton>
      <SendButton
        sendButtonColor={props.sendButtonColor}
        type="button"
        isDisabled={false}
        class="m-0 flex h-14 items-center justify-center"
        on:click={props.onSend}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
      </SendButton>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {props.previews.map((preview) => (
        <div>
          <span>{preview.name}</span>
          <button onClick={() => props.onDeletePreview(preview.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
