import { createSignal } from 'solid-js'

type FeedbackContentDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (text: string) => void
  backgroundColor?: string
  textColor?: string
}

const defaultBackgroundColor = '#ffffff'
const defaultTextColor = '#303235'

const FeedbackContentDialog = (props: FeedbackContentDialogProps) => {
  const [inputValue, setInputValue] = createSignal('')
  let inputRef: HTMLInputElement | HTMLTextAreaElement | undefined

  const handleInput = (value: string) => setInputValue(value)

  const checkIfInputIsValid = () =>
    inputValue() !== '' && inputRef?.reportValidity()

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue())
    setInputValue('')
  }

  const onClose = () => {
    props.onClose()
  }

  return (
    <>
      <div class="fixed inset-0 z-[1002] flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div class="relative mx-4 my-6 w-full max-w-3xl">
          <div
            class="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none"
            style={{
              'background-color':
                props.backgroundColor ?? defaultBackgroundColor,
              color: props.textColor ?? defaultTextColor,
            }}
          >
            <div
              class="border-blueGray-200 flex items-center justify-between rounded-t border-b border-solid p-5"
              style={{
                border: '1px solid #eeeeee',
              }}
            >
              <span class="max-w-full whitespace-pre-wrap font-semibold">
                Provide additional feedback
              </span>
              <button
                class="float-right ml-auto border-0 bg-transparent p-1 text-xl font-semibold leading-none text-black outline-none focus:outline-none"
                type="button"
                onClick={onClose}
              >
                <span class="block bg-transparent outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              </button>
            </div>
            <div class="relative flex-auto p-6">
              <textarea
                onInput={(e) => handleInput(e.currentTarget.value)}
                ref={(el) => (inputRef = el)}
                rows={4}
                class="feedback-input block w-full flex-1 rounded-lg border bg-transparent p-2.5 font-normal focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100"
                style={{
                  border: '1px solid #eeeeee',
                  color: props.textColor ?? defaultTextColor,
                }}
                placeholder="What do you think of the response?"
                value={inputValue()}
              />
            </div>
            <div class="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-4">
              <button
                class="mb-1 mr-1 rounded bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
                onClick={submit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed inset-0 z-[1001] flex bg-black opacity-25" />
    </>
  )
}

export default FeedbackContentDialog
