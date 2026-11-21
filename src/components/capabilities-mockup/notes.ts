/**
 * Owner-facing notes for the /mockups/capabilities sketch (dev only, Polish):
 * what the sketch is, the two open questions (N1 name, T1 T-shape layout),
 * their options and recommendations. Public copy lives in copy.ts.
 */

export const REAL_PAGE = '/about/capabilities'

/** Marker next to each claim in copy.ts that the owner has not confirmed yet. */
export const CONFIRM_LABEL = 'Do potwierdzenia'

export const OWNER_NOTE = {
  title: 'Szkic nowej strony /capabilities',
  intro:
    'Obecna strona to 18 osobnych kart. Tu wszystko stoi pod jednym parasolem: product engineering. To szkic do reakcji, prawdziwa strona się nie zmienia. Angielskie teksty to wersja robocza zbudowana z faktów z obecnych stron.',
  compare:
    'Porównaj dwie rzeczy: N1, nazwę parasola (kliknięcie opcji zmienia tytuł strony), i T1, sposób narysowania kształtu T. Przy każdym obszarze pracy na dole strony stoi numer starej karty, więc widać, że nic nie zginęło.',
  open: 'Otwarte poza pytaniami: nagłówek strony stoi przy lewej krawędzi logo, jak w kierunku S1-C. Prawdziwe strony mają dziś nagłówek wyśrodkowany, to osobna decyzja.',
}

export const QUESTION_INDEX = [
  { id: 'N1', label: 'Nazwa parasola' },
  { id: 'T1', label: 'Kształt T' },
]

export interface NameOption {
  letter: string
  name: string
  consequence: string
  recommended?: boolean
}

export const N1 = {
  id: 'N1',
  question: 'Jak nazwać parasol nad całą stroną?',
  recommendation:
    'C, Product Engineering. Jest krótka, obejmuje i software, i urządzenia, i nie robi z nazwy listy. Konkret (software, urządzenia, jeden stack TypeScript) niesie zdanie pod tytułem. Sama nazwa jest ogólna i używają jej też duże software house’y, dlatego to zdanie musi zostać.',
  note: 'Kliknij opcję, a tytuł strony powyżej pokaże tę nazwę. Słowo „technological” odpadło: mówi tyle, co nic.',
}

export const NAME_OPTIONS: NameOption[] = [
  {
    letter: 'A',
    name: 'Digital Product Engineering',
    consequence:
      '„Digital” czyta się jak ekran i web: elektronika, IoT i roboty znikają z nazwy. Na telefonie (390 px) tytuł w 2 liniach.',
  },
  {
    letter: 'B',
    name: 'Software & IoT Product Engineering',
    consequence:
      'Najdokładniejsza, ale najdłuższa i znowu jest listą: nazywa dwie z pięciu dziedzin, bez UX, robotyki i DevEx. Na telefonie 2 linie.',
  },
  {
    letter: 'C',
    name: 'Product Engineering',
    consequence:
      'Najkrótsza, mieści sprzęt i software, na telefonie 1 linia. Sama w sobie ogólna: konkret daje podtytuł.',
    recommended: true,
  },
]

export const T1 = {
  id: 'T1',
  question: 'Jak narysować kształt T na liniach strony?',
  recommendation:
    'A, litera T. Kształt sam mówi „szeroko i głęboko”, bez zdania wyjaśnienia. Twoja intuicja się zgadza: w klasycznym T poziomy pasek to szerokość (dziedziny od UX po DevEx), a pionowa noga to głębokość (jeden stack TypeScript). Poniżej 1001 px litera rozkłada się na dwie listy, jak w B.',
  note: 'Pola po bokach nogi T niosą tylko podpisy osi i nie da się ich usunąć: to ich linie domykają kształt T. Noga to jedna komórka, żeby te pola były jak najniższe. Jeśli wyglądają jak dziury, wybierz B. Między 1001 a około 1200 px komórki są wąskie i nazwy dziedzin łamią się na 2 linie.',
}

export const T1_OPTIONS = [
  {
    letter: 'A',
    name: 'Litera T',
    consequence:
      'Górny rząd to pięć dziedzin, kolumna pod środkową to stack. Kształt widać od 1001 px.',
    recommended: true,
  },
  {
    letter: 'B',
    name: 'Dwie połowy',
    consequence:
      'Lewa połowa dziedziny, prawa stack, ten sam nagłówek co w A. Spokojniej i tak samo na każdej szerokości, ale T trzeba opisać słowami.',
  },
]
