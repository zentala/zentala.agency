import { type JSX, Show } from 'solid-js'
import { SendButton } from './SendButton'

type LeadCaptureButtonProps = {
  buttonLabel?: string
  isLoading?: boolean
  disableIcon?: boolean
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>

export const SaveLeadButton = (props: LeadCaptureButtonProps) => {
  return (
    <SendButton
      disableIcon={props.isLoading || props.disableIcon}
      isDisabled={props.isLoading || props.disabled}
      isLoading={props.isLoading}
      {...props}
    >
      <Show when={!props.isLoading} keyed>
        <span>{props.buttonLabel ?? 'Send'}</span>
      </Show>
    </SendButton>
  )
}
