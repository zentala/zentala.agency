// This file will contain the useLeadForm hook.

import { createSignal } from 'solid-js'
import { addLeadQuery } from '../queries/sendMessageQuery'
import type { LeadCaptureInput } from '../queries/sendMessageQuery'

type UseLeadFormProps = {
  botId: string
  apiHost?: string
}

type LeadData = {
  name?: string
  email?: string
  phone?: string
}

export const useLeadForm = (props: UseLeadFormProps) => {
  const [isLeadSaving, setIsLeadSaving] = createSignal(false)
  const [isLeadSaved, setIsLeadSaved] = createSignal(false)

  const handleSaveLead = async (chatId: string, leadData: LeadData) => {
    setIsLeadSaving(true)
    const body: LeadCaptureInput = {
      chatflowid: props.botId,
      chatId: chatId,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
    }

    const result = await addLeadQuery({
      apiHost: props.apiHost,
      body,
    })

    if (result.data) {
      setIsLeadSaved(true)
    }
    // TODO: Handle error case, maybe return it

    setIsLeadSaving(false)
    return result
  }

  return {
    isLeadSaving,
    isLeadSaved,
    handleSaveLead,
  }
}
