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
    { key: 'A', label: 'Jak teraz', consequence: 'Etykieta zawsze mała u góry, przycisk na całą szerokość. Zostaje tylko dla porównania.' },
    { key: 'B', label: 'Pływająca etykieta w siatce', consequence: 'Wybrane. Pola dzielą linie jak reszta strony, także pionową między kolumnami.' },
    { key: 'C', label: 'Pływająca etykieta, same linie poziome', consequence: 'To samo bez pionowej linii między kolumnami: spokojniej, ale pola w wierszu słabiej się oddzielają.' },
    { key: 'D', label: 'Siatka z niebieską linią przy fokusie', consequence: 'Odrzucone: aktywne pole ma zostać neutralne. Zwinięte pod formularzem, do wglądu.' },
  ],
  recommendation:
    'B, jak wybrałeś; C włączysz przyciskiem nad formularzem. W obu: formularz nie ma własnej ramki ani odstępu, jego linie są liniami komórki. Biały przycisk stoi z prawej na linii siatki, a po lewej jest blok z odstępem na zgodę i notę o prywatności. Aktywne pole tylko jaśnieje, bez niebieskiego. Pola wypełnione przez przeglądarkę zostają ciemne z jasnym tekstem.',
}

export const F2: Question = {
  id: 'F2',
  question: 'Jak oznaczać szkic i tekst do recenzji na listach części? (widoczne tylko w dev)',
  options: [
    { key: 'A', label: 'Jak w ostatnim commicie', consequence: 'Kreska 1 px przy lewej krawędzi wiersza, przed numerem. Zostaje dla porównania.' },
    { key: 'B', label: 'Kreska 2 px, półprzezroczysta', consequence: 'Odrzucone: kreska stoi przy lewej krawędzi. Zwinięte pod listami, do wglądu.' },
    { key: 'C', label: 'Kreska 2 px i napis po najechaniu', consequence: 'Odrzucone z tego samego powodu; nazwa stanu pojawia się dopiero pod kursorem.' },
    { key: 'D', label: 'Kreska 1 px, półprzezroczysta', consequence: 'Odrzucone miejsce, została grubość: z niej powstało E.' },
    { key: 'E', label: 'Linia między numerem a tytułem', consequence: 'Wybrane. Kreska 1 px stoi między numerem części a tytułem: przerywana dla szkicu, ciągła dla recenzji. Opublikowane części nie mają kreski, a tytuły zaczynają się w tej samej linii.' },
  ],
  recommendation:
    'E, jak wybrałeś. Na szerszych wierszach serii nazwa stanu stoi dodatkowo zaraz po tytule, szarym tekstem tego samego kroju, bo sama kreska nie mówi, czy to szkic, czy recenzja.',
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
