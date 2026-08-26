// This file will contain the useFeedback hook.

import { createSignal } from 'solid-js'
import {
  sendFeedbackQuery,
  updateFeedbackQuery,
} from '../queries/sendMessageQuery'
import type { FeedbackRatingType } from '../queries/sendMessageQuery'

type UseFeedbackProps = {
  botId: string
  apiHost?: string
}

export const useFeedback = (props: UseFeedbackProps) => {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = createSignal(false)
  const [feedback, setFeedback] = createSignal<{
    messageId: string
    rating: FeedbackRatingType
    feedbackId?: string
  } | null>(null)

  const openFeedbackDialog = (
    messageId: string,
    rating: FeedbackRatingType,
  ) => {
    setFeedback({ messageId, rating })
    // For THUMBS_DOWN, we open a dialog to get more info.
    // For THUMBS_UP, we can just send the feedback directly.
    if (rating === 'THUMBS_DOWN') {
      setIsFeedbackDialogOpen(true)
    } else {
      handleSubmitFeedback() // Submit immediately for thumbs up
    }
  }

  const closeFeedbackDialog = () => {
    setIsFeedbackDialogOpen(false)
    setFeedback(null)
  }

  const handleSubmitFeedback = async (content?: string) => {
    const currentFeedback = feedback()
    if (!currentFeedback) return

    const { messageId, rating } = currentFeedback

    // If we already have a feedbackId, we are updating it with content.
    // Otherwise, we are creating a new feedback entry.
    if (currentFeedback.feedbackId && content) {
      await updateFeedbackQuery({
        id: currentFeedback.feedbackId,
        apiHost: props.apiHost,
        body: { content },
      })
      closeFeedbackDialog()
    } else {
      const result = await sendFeedbackQuery({
        chatflowid: props.botId,
        apiHost: props.apiHost,
        body: {
          chatId: '', // TODO: Get chatId from somewhere
          messageId,
          rating,
          ...(content && { content }),
        },
      })

      if (result.data?.id) {
        // If it was a thumbs down, we now have an ID and can wait for content submission
        if (rating === 'THUMBS_DOWN' && !content) {
          setFeedback({ ...currentFeedback, feedbackId: result.data.id })
        } else {
          closeFeedbackDialog()
        }
      }
    }
  }

  return {
    isFeedbackDialogOpen,
    feedback,
    openFeedbackDialog,
    closeFeedbackDialog,
    handleSubmitFeedback,
  }
}
