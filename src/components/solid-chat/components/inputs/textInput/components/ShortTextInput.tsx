import { createSignal, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'

type ShortTextInputProps = {
  ref: HTMLInputElement | HTMLTextAreaElement | undefined
  onInput: (value: string) => void
  fontSize?: number
  disabled?: boolean
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'>

const DEFAULT_HEIGHT = 56

export const ShortTextInput = (props: ShortTextInputProps) => {
  const [local, others] = splitProps(props, ['ref', 'onInput'])
  const [height, setHeight] = createSignal(56)

  // @ts-expect-error: unknown type
  const handleInput = (e) => {
    if (props.ref) {
      if (e.currentTarget.value === '') {
        // reset height when value is empty
        setHeight(DEFAULT_HEIGHT)
      } else {
        setHeight(e.currentTarget.scrollHeight - 24)
      }
      e.currentTarget.scrollTo(0, e.currentTarget.scrollHeight)
      local.onInput(e.currentTarget.value)
    }
  }

  // @ts-expect-error: unknown type
  const handleKeyDown = (e) => {
    // Handle Shift + Enter new line
    if (e.keyCode == 13 && e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.value += '\n'
      handleInput(e)
    }
  }

  return (
    <textarea
      ref={props.ref}
      class="text-input h-full max-h-[128px] min-h-[56px] w-full flex-1 bg-transparent px-4 py-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100"
      disabled={props.disabled}
      style={{
        'font-size': props.fontSize ? `${props.fontSize}px` : '16px',
        resize: 'none',
        height: `${props.value !== '' ? height() : DEFAULT_HEIGHT}px`,
      }}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      {...others}
    />
  )
}
