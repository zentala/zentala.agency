import type {
  FeedbackRatingType,
  IncomingInput,
  LeadCaptureInput,
} from '@/components/solid-chat/queries/sendMessageQuery'
import type {
  BotMessageTheme,
  DateTimeToggleTheme,
  DisclaimerPopUpTheme,
  FeedbackTheme,
  FooterTheme,
  TextInputTheme,
  UserMessageTheme,
} from '@/components/solid-chat/features/bubble/types'

export type FileEvent<T = EventTarget> = {
  target: T
}

export type FormEvent<T = EventTarget> = {
  preventDefault: () => void
  currentTarget: T
}

type IUploadConstraits = {
  fileTypes: string[]
  maxUploadSize: number
}

export type UploadsConfig = {
  imgUploadSizeAndTypes: IUploadConstraits[]
  fileUploadSizeAndTypes: IUploadConstraits[]
  isImageUploadAllowed: boolean
  isSpeechToTextEnabled: boolean
  isRAGFileUploadAllowed: boolean
}

type FilePreviewData = string

export type FilePreview = {
  data: FilePreviewData
  mime: string
  name: string
  preview: string
  type: string
  file: File
}

export type messageType =
  | 'apiMessage'
  | 'userMessage'
  | 'usermessagewaiting'
  | 'leadCaptureMessage'
type ExecutionState =
  | 'INPROGRESS'
  | 'FINISHED'
  | 'ERROR'
  | 'TERMINATED'
  | 'TIMEOUT'
  | 'STOPPED'

export type IAgentReasoning = {
  agentName?: string
  messages?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usedTools?: any[]
  artifacts?: FileUpload[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sourceDocuments?: any[]
  instructions?: string
  nextAgent?: string
}

export type SourceDocument = {
  pageContent: string
  metadata: Record<string, unknown>
}

export type UsedTool = {
  tool: string
  input: string
  output: string
}

export type IAction = {
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  elements?: Array<{
    type: string
    label: string
  }>
  mapping?: {
    approve: string
    reject: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toolCalls: any[]
  }
}

export type FileUpload = Omit<FilePreview, 'preview'>

export type AgentFlowExecutedData = {
  nodeLabel: string
  nodeId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  previousNodeIds: string[]
  status?: ExecutionState
}

export type MessageType = {
  messageId?: string
  message: string
  type: messageType
  sourceDocuments?: SourceDocument[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileAnnotations?: any
  fileUploads?: Partial<FileUpload>[]
  artifacts?: Partial<FileUpload>[]
  agentReasoning?: IAgentReasoning[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execution?: any
  agentFlowEventStatus?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agentFlowExecutedData?: any
  usedTools?: UsedTool[]
  action?: IAction | null
  rating?: FeedbackRatingType
  id?: string
  followUpPrompts?: string
  dateTime?: string
}

export type IUploads = {
  data: FilePreviewData
  type: string
  name: string
  mime: string
}[]

type observerConfigType = (
  accessor: string | boolean | object | MessageType[],
) => void
export type observersConfigType = Record<
  'observeUserInput' | 'observeLoading' | 'observeMessages',
  observerConfigType
>

export type BotProps = {
  botId: string
  chatId?: string
  apiHost?: string
  onRequest?: (request: RequestInit) => Promise<void>
  chatflowConfig?: Record<string, unknown>
  backgroundColor?: string
  welcomeMessage?: string
  errorMessage?: string
  botMessage?: BotMessageTheme
  userMessage?: UserMessageTheme
  textInput?: TextInputTheme
  feedback?: FeedbackTheme
  bubbleBackgroundColor?: string
  bubbleTextColor?: string
  showTitle?: boolean
  showAgentMessages?: boolean
  title?: string
  titleAvatarSrc?: string
  titleTextColor?: string
  titleBackgroundColor?: string
  formBackgroundColor?: string
  formTextColor?: string
  fontSize?: number
  isFullPage?: boolean
  footer?: FooterTheme
  sourceDocsTitle?: string
  observersConfig?: observersConfigType
  starterPrompts?: string[] | Record<string, { prompt: string }>
  starterPromptFontSize?: number
  clearChatOnReload?: boolean
  disclaimer?: DisclaimerPopUpTheme
  dateTimeToggle?: DateTimeToggleTheme
  renderHTML?: boolean
  closeBot?: () => void
}

export type PredictionBody = {
  question: string
  history: MessageType[]
  chatId?: string
  uploadedFiles?: Partial<FileUpload>[]
}

export type LeadsConfig = {
  status: boolean
  title?: string
  name?: boolean
  email?: boolean
  phone?: boolean
  successMessage?: string
}

// Re-exporting FeedbackRatingType since it's used in MessageType
/* export type {
  FeedbackRatingType,
  IncomingInput,
  LeadCaptureInput,
} from '@/components/solid-chat/queries/sendMessageQuery' */
