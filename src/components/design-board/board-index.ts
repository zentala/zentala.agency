/**
 * Index of the design decision board: the four question groups in page order and
 * the one-line question behind every id. Anchors follow the `board-<id>` ids the
 * group components render.
 */
export interface BoardIndexQuestion {
  id: string
  question: string
}

export interface BoardIndexGroup {
  name: string
  questions: BoardIndexQuestion[]
}

export const BOARD_INDEX: BoardIndexGroup[] = [
  {
    name: 'Blog i odstępy',
    questions: [
      { id: 'B1', question: 'Jak ma być zbudowana strona /blog?' },
      { id: 'B2', question: 'Jak ma wyglądać blok jednej serii?' },
      { id: 'S1', question: 'Odstępy: proporcje i wcięcia nagłówków' },
    ],
  },
  {
    name: 'Typografia',
    questions: [
      { id: 'T1', question: 'Jaki krój pisma ma mieć strona?' },
      { id: 'T2', question: 'Jaki system rozmiarów i wag?' },
      { id: 'T3', question: 'Jak wyważyć nagłówek: logo wobec menu?' },
      { id: 'T4', question: 'Jak ma wyglądać nagłówek sekcji?' },
    ],
  },
  {
    name: 'Ikony i przyciski',
    questions: [
      { id: 'I1', question: 'Który zestaw ikon i jaka waga w każdym miejscu?' },
      { id: 'I2', question: 'Jak mają wyglądać przyciski i CTA?' },
      { id: 'I3', question: 'Jak karta ma reagować na najechanie?' },
      { id: 'I4', question: 'Czy ikony mają mieć jedną mapę znaczeń?' },
    ],
  },
  {
    name: 'Formularz, znaczniki, mozaika',
    questions: [
      { id: 'F1', question: 'Jak ma wyglądać pole formularza?' },
      { id: 'F2', question: 'Jak oznaczać szkic i tekst do recenzji?' },
      { id: 'F3', question: 'Czym wypełnić górę karty Portfolio?' },
    ],
  },
]

export const boardAnchor = (id: string) => `#board-${id.toLowerCase()}`
