import { createSignal } from 'solid-js'
import { z } from 'zod'
import type { FormEvent, LeadsConfig } from '../../types/chat'
import { SaveLeadButton } from '../buttons/LeadCaptureButtons'

type Props = {
  leadsConfig?: LeadsConfig
  onSave: (data: { name?: string; email?: string; phone?: string }) => void
  isSaved: boolean
  isSaving: boolean
}

const defaultBackgroundColor = '#f7f8ff'
const defaultTextColor = '#303235'
const defaultFontSize = 16
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
)

const LeadCaptureSchema = z.object({
  name: z.string().min(2, 'Name is too short').optional(),
  email: z.string().email('Please provide a valid email').optional(),
  phone: z
    .string()
    .min(5, 'Phone number is too short')
    .regex(phoneRegex, 'Invalid Number!')
    .optional(),
})

export const LeadCaptureBubble = (props: Props) => {
  const [leadName, setLeadName] = createSignal<string>('')
  const [leadEmail, setLeadEmail] = createSignal<string>('')
  const [leadPhone, setLeadPhone] = createSignal<string>('')
  const [leadFormError, setLeadFormError] =
    createSignal<Record<string, string[]>>()

  const handleLeadCaptureSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const res = LeadCaptureSchema.safeParse(data)

    if (res.success) {
      props.onSave({ name: leadName(), email: leadEmail(), phone: leadPhone() })
    } else {
      const error = res.error.flatten()
      setLeadFormError(error.fieldErrors)
    }
  }

  return (
    <div
      class="host-container mb-2 flex flex-row items-start justify-start"
      style={{ 'margin-right': '50px' }}
    >
      <div
        class="chatbot-host-bubble prose ml-2 max-w-full px-4 py-2"
        data-testid="host-bubble"
        style={{
          'background-color': defaultBackgroundColor,
          color: defaultTextColor,
          'border-radius': '6px',
          'font-size': `${defaultFontSize}px`,
        }}
      >
        {props.isSaved ? (
          <div class="flex flex-col gap-2">
            <span style={{ 'white-space': 'pre-line' }}>
              {props.leadsConfig?.successMessage ||
                'Thank you for submitting your contact information.'}
            </span>
          </div>
        ) : (
          <form class="flex flex-col gap-2" onSubmit={handleLeadCaptureSubmit}>
            <span style={{ 'white-space': 'pre-line' }}>
              {props.leadsConfig?.title ||
                'Let us know where we can reach you:'}
            </span>
            <div class="flex w-full flex-col gap-2">
              {props.leadsConfig?.name && (
                <div class="flex w-full flex-col items-start justify-start gap-1">
                  <div
                    class={
                      'chatbot-input flex w-full items-center justify-between border border-[#eeeeee]'
                    }
                  >
                    <input
                      class="text-input h-full max-h-[128px] min-h-[56px] w-full flex-1 bg-transparent px-4 py-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100"
                      placeholder="Name"
                      name="name"
                      style={{ width: '100%' }}
                      value={leadName()}
                      onChange={(e) => setLeadName(e.currentTarget.value)}
                    />
                  </div>
                  {leadFormError() && leadFormError()?.name && (
                    <span class="text-sm text-red-500">
                      {leadFormError()?.name[0]}
                    </span>
                  )}
                </div>
              )}
              {props.leadsConfig?.email && (
                <div class="flex w-full flex-col items-start justify-start gap-1">
                  <div
                    class={
                      'chatbot-input flex w-full items-center justify-between border border-[#eeeeee]'
                    }
                  >
                    <input
                      class="text-input h-full max-h-[128px] min-h-[56px] w-full flex-1 bg-transparent px-4 py-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100"
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      style={{ width: '100%' }}
                      value={leadEmail()}
                      onChange={(e) => setLeadEmail(e.currentTarget.value)}
                    />
                  </div>
                  {leadFormError() && leadFormError()?.email && (
                    <span class="text-sm text-red-500">
                      {leadFormError()?.email[0]}
                    </span>
                  )}
                </div>
              )}
              {props.leadsConfig?.phone && (
                <div class="flex w-full flex-col items-start justify-start gap-1">
                  <div
                    class={
                      'chatbot-input flex w-full items-center justify-between border border-[#eeeeee]'
                    }
                  >
                    <input
                      class="text-input h-full max-h-[128px] min-h-[56px] w-full flex-1 bg-transparent px-4 py-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100"
                      type="number"
                      placeholder="Phone Number"
                      name="phone"
                      style={{ width: '100%' }}
                      value={leadPhone()}
                      onChange={(e) => setLeadPhone(e.target.value)}
                    />
                  </div>
                  {leadFormError() && leadFormError()?.phone && (
                    <span class="text-sm text-red-500">
                      {leadFormError()?.phone[0]}
                    </span>
                  )}
                </div>
              )}
              <div class="flex w-full justify-end">
                <SaveLeadButton isLoading={props.isSaving} />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
