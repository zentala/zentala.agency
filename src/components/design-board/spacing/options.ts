/**
 * S1: the four spacing systems the owner compares. A "bar" is a header strip
 * (section header, option bar); a "cell" is a content cell of the line grid.
 */
export type SpacingVariant = 'a' | 'b' | 'c' | 'd'

export interface SpacingOption {
  letter: string
  variant: SpacingVariant
  name: string
  consequence: string
  recommended?: boolean
}

export const SPACING_OPTIONS: SpacingOption[] = [
  {
    letter: 'A',
    variant: 'a',
    name: 'Tablica z pierwszej rundy',
    consequence:
      'Niskie belki na krawędzi logo i komórki przycięte od góry: nad tekstem jest około jednej trzeciej tego, co z boku.',
  },
  {
    letter: 'B',
    variant: 'b',
    name: 'Belki wysunięte w lewo, komórki z pełnym odstępem',
    consequence:
      'Belka ma mały odstęp z góry i z boków, więc jej tekst stoi na lewo od treści i od logo: hierarchię widać, ale pionowa oś z menu się łamie.',
  },
  {
    letter: 'C',
    variant: 'c',
    name: 'Belki na krawędzi logo, komórki z pełnym odstępem',
    consequence:
      'Logo, belki i treść zaczynają się na jednej pionowej linii; belka zostaje niska, a komórki wracają do równego odstępu z góry i z boków.',
    recommended: true,
  },
  {
    letter: 'D',
    variant: 'd',
    name: 'Jedna proporcja wszędzie: góra to trzy czwarte boku',
    consequence:
      'Komórki i nagłówek sekcji mają tę samą proporcję i jedną oś z logo; nagłówek dostaje większy cienki tytuł, ale jest dużo wyższy.',
  },
]

/** Parts shown per series in the slice, so four options stay comparable on one screen. */
export const SLICE_PARTS = 4

/** Post cells shown in the slice: one grid row. */
export const SLICE_POSTS = 3
