import { Show, createSignal } from 'solid-js'

/* FeedbackDialog component - for collecting user feedback */
export const FeedbackDialog = (props: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (value: string) => void
}) => {
  const [feedbackValue, setFeedbackValue] = createSignal('')
  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm"
        style={{ background: 'rgba(0, 0, 0, 0.4)' }}
      >
        <div
          class="mx-4 w-full max-w-md rounded-lg p-6 text-center font-sans shadow-lg"
          style={{ background: 'white', color: 'black' }}
        >
          <h2 class="mb-4 flex items-center justify-center text-xl font-semibold">
            Your Feedback
          </h2>

          <textarea
            class="mb-4 w-full rounded-md border border-gray-300 p-2"
            rows={4}
            placeholder="Please provide your feedback..."
            value={feedbackValue()}
            onInput={(e) => setFeedbackValue(e.target.value)}
          />

          <div class="flex justify-center space-x-4">
            <button
              class="focus:shadow-outline rounded px-6 py-2 font-bold focus:outline-none"
              style={{ background: '#ef4444', color: 'white' }}
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              class="focus:shadow-outline rounded px-6 py-2 font-bold focus:outline-none"
              style={{ background: '#3b82f6', color: 'white' }}
              onClick={() => props.onSubmit(feedbackValue())}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}
