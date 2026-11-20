import type { BoardOption } from './BoardQuestion.astro'
import type { ButtonKind, ButtonLook } from './BoardButton.astro'
import type { SemanticIconName } from './icon-map'
import type { SystemKey } from './icon-systems'

/**
 * The button looks compared in question I2 and the real labels they are shown with.
 * One list feeds both the rendered buttons and the icon inventory under them.
 */
export interface LookSpec extends BoardOption {
  /** Which button styling draws this option; E and F reuse the neutral look of C. */
  style: ButtonLook
  /** The icon system this look was drawn with. */
  icons: SystemKey
  /** False: the button shows its label and the chevron only. */
  leadingIcon: boolean
  main: ButtonKind
  second: ButtonKind
  /** Kinds used on /contact for "Book a call" and "Send message". */
  contact: readonly [ButtonKind, ButtonKind]
}

export const LOOKS: readonly LookSpec[] = [
  {
    key: 'A',
    label: 'Przed zmianami',
    consequence:
      'Pogrubiony napis, główna akcja w pełnym niebieskim, na /contact biała ramka; strzałka stoi w miejscu.',
    style: 'A',
    icons: 'A',
    leadingIcon: true,
    main: 'primary',
    second: 'secondary',
    contact: ['outline', 'outline'],
  },
  {
    key: 'B',
    label: 'Koniec fali 5',
    consequence:
      'Pogrubiony napis, główna akcja biała pełna, „Book a Call” na /contact pełny niebieski z niebieską ramką.',
    style: 'B',
    icons: 'A',
    leadingIcon: true,
    main: 'primary',
    second: 'secondary',
    contact: ['accent', 'secondary'],
  },
  {
    key: 'C',
    label: 'Obecnie',
    consequence:
      'Szara ramka i ledwo widoczne wypełnienie, zwykła waga, strzałka rusza się na hover; brak koloru odróżniającego główną akcję.',
    style: 'C',
    icons: 'B',
    leadingIcon: true,
    main: 'primary',
    second: 'secondary',
    contact: ['accent', 'secondary'],
  },
  {
    key: 'D',
    label: 'Niebieska ramka (odrzucone)',
    consequence:
      'Cienka niebieska ramka, niebieska strzałka i biały napis. Właściciel odrzucił niebieską ramkę i niebieską ikonę obok białego tekstu; zostaje tylko dla porównania.',
    style: 'D',
    icons: 'C',
    leadingIcon: true,
    main: 'primary',
    second: 'secondary',
    contact: ['primary', 'secondary'],
  },
  {
    key: 'E',
    label: 'Obecny bez ikony z lewej',
    consequence:
      'Szara ramka, biały napis i biała strzałka Regular 16 px, która się rusza. Znika pytanie, co to za ikony; przycisk jest węższy i spokojniejszy.',
    style: 'C',
    icons: 'E',
    leadingIcon: false,
    main: 'primary',
    second: 'secondary',
    contact: ['primary', 'secondary'],
  },
  {
    key: 'F',
    label: 'Obecny z ikoną 16 px',
    consequence:
      'Szara ramka i biała ikona z lewej w Phosphor Regular 16 px zamiast Light 20 px: kreska ma równo 1 px, więc znak jest ostry i mniejszy od napisu.',
    style: 'C',
    icons: 'E',
    leadingIcon: true,
    main: 'primary',
    second: 'secondary',
    contact: ['primary', 'secondary'],
  },
]

export interface ButtonSample {
  text: string
  href: string
  icon: SemanticIconName
  role: 'main' | 'second'
}

export interface ButtonGroup {
  label: string
  hover?: boolean
  context?: 'contact'
  buttons: readonly ButtonSample[]
}

const CAL_URL = 'http://cal.com/zentala'

export const BUTTON_GROUPS: readonly ButtonGroup[] = [
  {
    label: 'Główna i druga akcja',
    buttons: [
      { text: 'Get started', href: '/contact', icon: 'chat', role: 'main' },
      { text: 'View Portfolio', href: '/portfolio', icon: 'nav-portfolio', role: 'second' },
    ],
  },
  {
    label: 'To samo na hover (pokazane na stałe)',
    hover: true,
    buttons: [
      { text: 'Get started', href: '/contact', icon: 'chat', role: 'main' },
      { text: 'View Portfolio', href: '/portfolio', icon: 'nav-portfolio', role: 'second' },
    ],
  },
  {
    label: '/contact',
    context: 'contact',
    buttons: [
      { text: 'Book a Call', href: CAL_URL, icon: 'book-call', role: 'main' },
      { text: 'Send message', href: '/contact#write', icon: 'send', role: 'second' },
    ],
  },
  {
    label: 'Strona główna',
    buttons: [
      { text: 'Schedule Discovery Call', href: CAL_URL, icon: 'book-call', role: 'main' },
      { text: 'View Portfolio', href: '/portfolio', icon: 'nav-portfolio', role: 'second' },
    ],
  },
]

/** What each button icon stands for, in the order the inventory lists them. */
export const BUTTON_GLYPHS: readonly { icon: SemanticIconName; usedBy: string; noun: string }[] = [
  { icon: 'chat', usedBy: 'Get started', noun: 'dymek rozmowy' },
  { icon: 'nav-portfolio', usedBy: 'View Portfolio', noun: 'teczka' },
  { icon: 'book-call', usedBy: 'Book a Call, Schedule Discovery Call', noun: 'kalendarz' },
  { icon: 'send', usedBy: 'Send message', noun: 'papierowy samolot' },
  { icon: 'arrow-next', usedBy: 'strzałka z prawej w każdym przycisku', noun: 'szewron' },
]

export function kindFor(look: LookSpec, group: ButtonGroup, sample: ButtonSample): ButtonKind {
  if (group.context === 'contact') return look.contact[sample.role === 'main' ? 0 : 1]
  return sample.role === 'main' ? look.main : look.second
}
