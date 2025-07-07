// This file will contain the useAudioRecording hook.

import { createSignal, onCleanup } from 'solid-js'
import {
  startAudioRecording,
  stopAudioRecording,
  cancelAudioRecording,
} from '../utils/audioRecording'

type UseAudioRecordingProps = {
  botId: string
  apiHost?: string
  onTranscription: (text: string) => void
  onRecordingError: (error: Error) => void
}

export const useAudioRecording = (props: UseAudioRecordingProps) => {
  const [isRecording, setIsRecording] = createSignal(false)
  const [elapsedTime, setElapsedTime] = createSignal(0)
  let timer: NodeJS.Timeout | undefined

  const startTimer = () => {
    setElapsedTime(0)
    timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
    setElapsedTime(0)
  }

  const handleTranscription = async (audioBlob: Blob) => {
    try {
      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.wav')

      const response = await fetch(
        `${props.apiHost ?? 'http://localhost:3000'}/api/v1/speech-to-text/${props.botId}`,
        {
          method: 'POST',
          body: formData,
        },
      )
      const result = await response.json()

      if (response.ok && result.text) {
        props.onTranscription(result.text)
      } else {
        throw new Error(result.message || 'Transcription failed')
      }
    } catch (error) {
      props.onRecordingError(error as Error)
    }
  }

  const startRecording = () => {
    if (isRecording()) return

    const onRecordingStart = () => {
      setIsRecording(true)
      startTimer()
    }

    const onUnsupportedBrowser = () => {
      props.onRecordingError(
        new Error('Audio recording is not supported in this browser.'),
      )
    }

    startAudioRecording(onRecordingStart, onUnsupportedBrowser, () => {})
  }

  const stopRecording = (isCancel = false) => {
    if (!isRecording()) return

    setIsRecording(false)
    stopTimer()

    if (isCancel) {
      cancelAudioRecording()
    } else {
      stopAudioRecording(handleTranscription)
    }
  }

  const onMicrophoneClicked = () => {
    if (!isRecording()) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  onCleanup(() => {
    stopTimer()
    if (isRecording()) {
      cancelAudioRecording()
    }
  })

  return {
    isRecording,
    elapsedTime,
    startRecording,
    stopRecording,
    onMicrophoneClicked,
  }
}
