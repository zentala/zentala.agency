import { TypingBubble } from '@/components/solid-chat/components'

export const LoadingBubble = () => (
  <div class="animate-fade-in host-container mb-2 flex items-start justify-start">
    <span
      class="chatbot-host-bubble ml-2 max-w-full whitespace-pre-wrap px-4 py-4"
      data-testid="host-bubble"
    >
      <TypingBubble />
    </span>
  </div>
)
