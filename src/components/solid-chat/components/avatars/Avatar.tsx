import { isMobile } from '@/components/solid-chat/utils/isMobileSignal'
import { createEffect, createSignal, Show } from 'solid-js'
import { isNotEmpty } from '@/components/solid-chat/utils/index'
import { DefaultAvatar } from './DefaultAvatar'

export const Avatar = (props: { initialAvatarSrc?: string }) => {
  const [avatarSrc, setAvatarSrc] = createSignal(props.initialAvatarSrc)

  createEffect(() => {
    if (
      avatarSrc()?.startsWith('{{') &&
      props.initialAvatarSrc?.startsWith('http')
    )
      setAvatarSrc(props.initialAvatarSrc)
  })

  return (
    <Show when={isNotEmpty(avatarSrc())} keyed fallback={<DefaultAvatar />}>
      <figure
        class={
          'relative flex flex-shrink-0 items-center justify-center rounded-full text-white ' +
          (isMobile() ? 'h-6 w-6 text-sm' : 'h-10 w-10 text-xl')
        }
      >
        <img
          src={avatarSrc()}
          alt="Bot avatar"
          class="h-full w-full rounded-full object-cover"
        />
      </figure>
    </Show>
  )
}
