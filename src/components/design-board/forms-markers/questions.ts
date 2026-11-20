/**
 * Copy and sample data of the three owner questions on the forms / markers /
 * mosaic board. The owner reads the board in Polish; the site content stays English.
 */
import type { BoardOption } from './BoardQuestion.astro'

interface Question {
  id: string
  question: string
  options: BoardOption[]
  recommendation: string
}

export const F1: Question = {
  id: 'F1',
  question: 'Jak ma wyglądać pole formularza? (kliknij i wpisz coś, żeby zobaczyć ruch etykiety)',
  options: [
    { key: 'A', label: 'Jak teraz', consequence: 'Etykieta zawsze mała u góry, przycisk na całą szerokość, uchwyt textarea odsunięty od rogu.' },
    { key: 'B', label: 'Pływająca etykieta w siatce', consequence: 'Pola dzielą linie jak reszta strony; fokus to biała ramka komórki, bez koloru.' },
    { key: 'C', label: 'Pływająca etykieta, dolna linia', consequence: 'Najbliżej Material v1, ale formularz wychodzi z siatki linii — jedyne takie miejsce na stronie.' },
    { key: 'D', label: 'Siatka + niebieska linia', consequence: 'Pola w siatce jak B, a fokus to cienka niebieska linia pod polem i niebieska etykieta; przycisk z niebieską ramką.' },
  ],
  recommendation: 'D — zostaje w siatce linii, a niebieski pojawia się tylko jako 1 px pod aktywnym polem.',
}

export const F2: Question = {
  id: 'F2',
  question: 'Jak oznaczać szkic i tekst do recenzji na listach części? (widoczne tylko w dev)',
  options: [
    { key: 'A', label: 'Jak w ostatnim commicie', consequence: 'Kreska 1 px: przerywana dla szkicu, jaśniejsza ciągła dla recenzji; dwie różne jasności.' },
    { key: 'B', label: '2 px, półprzezroczyste', consequence: 'Obie kreski tej samej szerokości i jasności; szkic przerywany, recenzja ciągła.' },
    { key: 'C', label: '2 px + napis po najechaniu', consequence: 'Jak B, a po najechaniu z prawej pojawia się DRAFT / REVIEW; wiersz traci trochę szerokości, na dotyku napisu nie ma.' },
    { key: 'D', label: '1 px, półprzezroczyste', consequence: 'Najcichsze; przy 1 px przerywaną trudno odróżnić od ciągłej.' },
  ],
  recommendation: 'B — 2 px, o które prosiłeś; przerywana i ciągła różnią się bez najeżdżania.',
}

export const F3: Question = {
  id: 'F3',
  question: 'Czym wypełnić górę karty Portfolio na stronie głównej?',
  options: [
    { key: 'A', label: 'Jak teraz', consequence: 'Cztery małe ikony na środku, dużo pustego miejsca wokół.' },
    { key: 'B', label: 'Więcej ikon', consequence: 'Szesnaście ikon wypełnia szerokość karty; trzeba dobrać 16 znaczeń, część będzie ogólna.' },
    { key: 'C', label: 'Większe ikony', consequence: 'Te same cztery ikony 48 px w większych ramkach; cienka kreska robi się wyraźna.' },
    { key: 'D', label: 'Logotypy technologii', consequence: 'Trzydzieści szarych logotypów, każdy zapala się kolorem marki pod kursorem; mówi o stacku, nie o projektach.' },
  ],
  recommendation: 'C na karcie Portfolio — cztery ikony to cztery projekty z opisu; D zachowałbym na kartę o technologiach.',
}

/** Marker demo: the first parts are published, then two in review, then two drafts. */
export const MARKER_STATES = ['published', 'published', 'review', 'review', 'draft', 'draft'] as const

/** The icons the home Portfolio card shows today (BentoAboutMe). */
export const MOSAIC_CURRENT = ['radar', 'bot', 'layout-grid', 'house']

/** Sixteen icons for the denser mosaic: the four above plus the owner's fields of work. */
export const MOSAIC_MORE = [
  ...MOSAIC_CURRENT,
  'cpu',
  'circuitry',
  'plugs',
  'terminal',
  'server',
  'network',
  'code',
  'database',
  'tree-structure',
  'cube',
  'wrench',
  'compass',
]
