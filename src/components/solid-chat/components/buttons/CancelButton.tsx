import type { JSX } from 'solid-js'
import { XIcon } from '../icons'

type CancelButtonProps = {
  buttonColor?: string
  isDisabled?: boolean
  isLoading?: boolean
  disableIcon?: boolean
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>

export const CancelButton = (props: CancelButtonProps) => {
  return (
    <button
      type="submit"
      disabled={props.isDisabled || props.isLoading}
      {...props}
      class={
        'chatbot-button flex items-center justify-center px-4 py-2 font-semibold filter transition-all hover:brightness-90 focus:outline-none active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100 ' +
        props.class
      }
      style={{ background: 'transparent', border: 'none' }}
    >
      <XIcon color={props.buttonColor} />
    </button>
  )
}
