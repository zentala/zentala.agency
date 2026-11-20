/**
 * Static sample data for the E008 review-layer mockup (/mockups/review-layer).
 * Nothing here is stored or sent anywhere: the real store is described in the
 * E008 architecture document.
 */

export const REVIEW_POST_SLUG =
  'how-to-deal-with-resistance-when-implementing-dev-portal'

/** Quote the "try it" button selects to demo the selection popover. */
export const DEMO_QUOTE = 'codification of previously informal knowledge'

export type ThreadStatus = 'open' | 'done' | 'declined' | 'outdated' | 'removed'
export type ThreadKind = 'comment' | 'proposal'
export type Author = 'agent' | 'owner'

export interface ReviewMessageData {
  author: Author
  body: string
  when: string
  /** Owner input the agent has not picked up yet. */
  pending?: boolean
}

export interface ReviewThreadData {
  id: string
  kind: ThreadKind
  status: ThreadStatus
  /** Exact words in the rendered article (TextQuoteSelector "exact"). */
  quote: string
  messages: ReviewMessageData[]
  likes: number
  dislikes: number
  /** The quoted words no longer exist: the thread keeps its place, with no highlight. */
  lostAnchor?: boolean
  /** One line the agent leaves when it closes a thread. */
  resolution?: string
  /** Owner's inline edit, waiting for the agent. */
  proposal?: { after: string }
}

export const STATUS_META: Record<
  ThreadStatus,
  { label: string; icon: string }
> = {
  open: { label: 'Open', icon: 'circle' },
  done: { label: 'Done', icon: 'check' },
  declined: { label: 'Declined', icon: 'prohibit' },
  outdated: { label: 'Outdated', icon: 'clock-counter-clockwise' },
  removed: { label: 'Removed', icon: 'eye-slash' },
}

export const AUTHOR_META: Record<Author, { name: string; icon: string }> = {
  agent: { name: 'Agent', icon: 'robot' },
  owner: { name: 'Paweł', icon: 'user' },
}

export const SAMPLE_THREADS: ReviewThreadData[] = [
  {
    id: 't-localization',
    kind: 'comment',
    status: 'open',
    quote: 'localization systems',
    likes: 0,
    dislikes: 0,
    messages: [
      {
        author: 'agent',
        when: '2 h ago',
        body: 'A reader just below the CTO may not know what a localization system is here. Is it indoor positioning, as at Ubudu? One clause would do, or should I cut the comparison?',
      },
    ],
  },
  {
    id: 't-inspire',
    kind: 'comment',
    status: 'open',
    quote: 'the key is to inspire teams with the potential',
    likes: 1,
    dislikes: 0,
    messages: [
      {
        author: 'agent',
        when: '2 h ago',
        body: 'This says the same as the intro paragraph, almost word for word. Keep it here and trim the intro, or the other way round?',
      },
      {
        author: 'owner',
        when: '12 min ago',
        body: 'Trim the intro. This is where the thought belongs.',
        pending: true,
      },
    ],
  },
  {
    id: 't-surprises',
    kind: 'proposal',
    status: 'open',
    quote: 'especially when they can affect',
    likes: 0,
    dislikes: 0,
    messages: [],
    proposal: { after: 'least of all ones that touch' },
  },
  {
    id: 't-find-me',
    kind: 'comment',
    status: 'done',
    quote: 'An example is a "Find Me" option',
    likes: 1,
    dislikes: 0,
    resolution: 'Kept as written. No change to the file.',
    messages: [
      {
        author: 'agent',
        when: 'yesterday',
        body: 'Is "Find Me" the real name of the option, or your description of it? If it is a name, the quotes stay.',
      },
      { author: 'owner', when: 'yesterday', body: 'Real name. Keep it.' },
      {
        author: 'agent',
        when: 'yesterday',
        body: 'Kept as written. No change to the file.',
      },
    ],
  },
  {
    id: 't-workshops',
    kind: 'comment',
    status: 'declined',
    quote: 'Workshops and Consultations',
    likes: 0,
    dislikes: 1,
    resolution:
      'Not moved: the list runs from personal value to group practice.',
    messages: [
      {
        author: 'owner',
        when: '2 days ago',
        body: 'Maybe this one should open the list?',
      },
      {
        author: 'agent',
        when: '2 days ago',
        body: 'Not moved: the list runs from personal value to group practice, and this point is the group one. Reopen the thread if you still want it first.',
      },
    ],
  },
  {
    id: 't-principles',
    kind: 'comment',
    status: 'outdated',
    quote: 'To summarize, here are some key principles:',
    lostAnchor: true,
    likes: 0,
    dislikes: 0,
    resolution: 'The quoted words were rewritten on 12 November.',
    messages: [
      {
        author: 'agent',
        when: '8 days ago',
        body: 'The sentence promised four principles and the list has three.',
      },
    ],
  },
  {
    id: 't-closing',
    kind: 'comment',
    status: 'removed',
    quote: 'It is worth remembering that empowerment and education',
    likes: 0,
    dislikes: 1,
    resolution: 'Removed by Paweł. The agent will not raise it again.',
    messages: [
      {
        author: 'agent',
        when: '3 days ago',
        body: 'The closing sentence repeats the summary above it. Cut it?',
      },
    ],
  },
]
