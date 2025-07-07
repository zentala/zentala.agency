// This file will contain the useFileUploads hook.

import { createSignal } from 'solid-js'
import type { FilePreview } from '../types/chat'

export const useFileUploads = () => {
  const [previews, setPreviews] = createSignal<FilePreview[]>([])
  const [isDragActive, setIsDragActive] = createSignal(false)

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleFileChange = (files: FileList | null) => {
    if (!files) return

    const newPreviews: FilePreview[] = []
    for (const file of Array.from(files)) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        newPreviews.push({
          file: file,
          data: reader.result as string,
          preview: reader.result as string,
          name: file.name,
          mime: file.type,
          type: file.type.split('/')[0],
        })
        setPreviews((prev) => [
          ...prev,
          ...newPreviews.filter(
            (p) => !prev.some((existing) => existing.name === p.name),
          ),
        ])
      }
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    if (e.dataTransfer?.files) {
      handleFileChange(e.dataTransfer.files)
    }
  }

  const handleDeletePreview = (previewName: string) => {
    setPreviews((prev) => prev.filter((p) => p.name !== previewName))
  }

  const clearPreviews = () => {
    setPreviews([])
  }

  return {
    previews,
    isDragActive,
    handleDrag,
    handleDrop,
    handleFileChange,
    handleDeletePreview,
    clearPreviews,
  }
}
