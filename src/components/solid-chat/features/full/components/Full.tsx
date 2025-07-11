import styles from '../../../assets/index.css'
import { Bot, type BotProps } from '@/components/solid-chat/components/Bot'
import type { BubbleParams } from '@/components/solid-chat/features/bubble/types'
import { createSignal, onCleanup, onMount, Show } from 'solid-js'

const defaultButtonColor = '#3B81F6'
const defaultIconColor = 'white'

export type FullProps = BotProps & BubbleParams

export const Full = (
  props: FullProps,
  { element }: { element: HTMLElement },
) => {
  const [isBotDisplayed, setIsBotDisplayed] = createSignal(false)

  const launchBot = () => {
    setIsBotDisplayed(true)
    document.body.style.margin = '0' // Ensure no margin
    document.documentElement.style.padding = '0' // Ensure no padding

    // Set viewport meta tag dynamically
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, interactive-widget=resizes-content',
      )
    }
  }

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting))
      launchBot()
  })

  onMount(() => {
    botLauncherObserver.observe(element)
  })

  onCleanup(() => {
    botLauncherObserver.disconnect()
    document.body.style.margin = '' // Reset margin
    document.documentElement.style.padding = '' // Reset padding

    // Reset viewport meta tag if needed
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0',
      )
    }
  })

  return (
    <>
      <Show when={props.theme?.customCSS}>
        <style>{props.theme?.customCSS}</style>
      </Show>
      <style>{styles}</style>
      <Show when={isBotDisplayed()}>
        <div
          style={{
            'background-color':
              props.theme?.chatWindow?.backgroundColor || '#ffffff',
            height: props.theme?.chatWindow?.height
              ? `${props.theme?.chatWindow?.height.toString()}px`
              : '100dvh',
            width: props.theme?.chatWindow?.width
              ? `${props.theme?.chatWindow?.width.toString()}px`
              : '100%',
            margin: '0px',
            overflow: 'hidden', // Ensure no extra scrolling due to content overflow
          }}
        >
          <Bot
            backgroundColor={props.theme?.chatWindow?.backgroundColor}
            formBackgroundColor={props.theme?.form?.backgroundColor}
            formTextColor={props.theme?.form?.textColor}
            bubbleBackgroundColor={
              props.theme?.button?.backgroundColor ?? defaultButtonColor
            }
            bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
            showTitle={props.theme?.chatWindow?.showTitle}
            showAgentMessages={props.theme?.chatWindow?.showAgentMessages}
            title={props.theme?.chatWindow?.title}
            titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
            titleTextColor={props.theme?.chatWindow?.titleTextColor}
            titleBackgroundColor={props.theme?.chatWindow?.titleBackgroundColor}
            welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
            errorMessage={props.theme?.chatWindow?.errorMessage}
            textInput={props.theme?.chatWindow?.textInput}
            botMessage={props.theme?.chatWindow?.botMessage}
            userMessage={props.theme?.chatWindow?.userMessage}
            feedback={props.theme?.chatWindow?.feedback}
            fontSize={props.theme?.chatWindow?.fontSize}
            footer={props.theme?.chatWindow?.footer}
            starterPrompts={props.theme?.chatWindow?.starterPrompts}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            onRequest={props.onRequest}
            isFullPage={true}
            observersConfig={props.observersConfig}
            starterPromptFontSize={
              props.theme?.chatWindow?.starterPromptFontSize
            }
            clearChatOnReload={props.theme?.chatWindow?.clearChatOnReload}
            disclaimer={props.theme?.disclaimer}
            dateTimeToggle={props.theme?.chatWindow?.dateTimeToggle}
            renderHTML={props.theme?.chatWindow?.renderHTML}
            botId={props.botId}
          />
        </div>
      </Show>
    </>
  )
}
