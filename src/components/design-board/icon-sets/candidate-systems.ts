import type { BoardIconSpec } from '../icons-controls/board-icons'
import { ICON_PLACES, type IconContext } from '../icons-controls/icon-map'
import type { IconSystem } from '../icons-controls/icon-systems'

/**
 * The sets compared in the second round of question I1. Every candidate follows the
 * same size rule (icon 2 px larger than the text) and keeps the Font Awesome footer
 * marks, so the samples differ only in the set and its stroke.
 */
export interface CandidateSystem extends IconSystem {
  /** What the samples and the measurement show, in one or two plain sentences. */
  finding: string
}

type SetStyle = Omit<BoardIconSpec, 'name' | 'size'>
type ContextStyle = Omit<BoardIconSpec, 'name'>

const FOOTER: ContextStyle = { set: 'fa', size: 33 }
const BACKGROUND_SIZE = 176
const BACKGROUND_OPACITY = 0.1
/** Next to 14 px text. */
const META_SIZE = 16
/** Next to 16 px text. */
const INLINE_SIZE = 18

const chosenContexts = Object.fromEntries(
  ICON_PLACES.map((place) => [place.context, place.style]),
) as Record<IconContext, ContextStyle>

function candidate(
  key: string,
  label: string,
  finding: string,
  small: SetStyle,
  large: SetStyle,
): CandidateSystem {
  return {
    key,
    label,
    finding,
    backgroundOpacity: BACKGROUND_OPACITY,
    contactPlacement: 'background',
    contexts: {
      footer: FOOTER,
      cardBackground: { ...large, size: BACKGROUND_SIZE },
      contactCard: { ...large, size: BACKGROUND_SIZE },
      meta: { ...small, size: META_SIZE },
      button: { ...small, size: INLINE_SIZE },
      buttonArrow: { ...small, size: INLINE_SIZE },
      nav: { ...small, size: INLINE_SIZE },
    },
  }
}

/** A stroke of 0,75 on the 24 grid is as thin as Phosphor Thin at the same size. */
const THIN_STROKE = 0.75

export const CANDIDATE_SYSTEMS: readonly CandidateSystem[] = [
  {
    key: 'G',
    label: 'Phosphor, waga wg rozmiaru',
    finding:
      'Zostaje jeden zestaw o ostrych narożnikach. Bold przy 18 px ma kreskę 1,69 px i najwięcej w pełni białych pikseli spośród skalowanych opcji. W meta zostaje wybrany Regular 16 px.',
    backgroundOpacity: BACKGROUND_OPACITY,
    contactPlacement: 'background',
    contexts: chosenContexts,
  },
  candidate(
    'H',
    'Lucide 2',
    'Kreska równo 1,5 px przy 18 px, w meta 1,33 px. Narożniki i końce okrągłe, rysunek lżejszy niż Phosphor Bold.',
    { set: 'lucide', stroke: 2 },
    { set: 'lucide', stroke: THIN_STROKE },
  ),
  candidate(
    'J',
    'Lucide 2,25',
    'Ta sama grubość co Phosphor Bold (1,69 px przy 18 px), więc widać samą różnicę rysunku: okrągłe przeciw ostrym.',
    { set: 'lucide', stroke: 2.25 },
    { set: 'lucide', stroke: THIN_STROKE },
  ),
  candidate(
    'K',
    'Tabler 2',
    'Ta sama siatka i kreska co Lucide, pomiar wychodzi tak samo. Inny rysunek, też okrągły; ma własne znaki marek.',
    { set: 'tabler', stroke: 2 },
    { set: 'tabler', stroke: THIN_STROKE },
  ),
  candidate(
    'L',
    'Iconoir 1,5',
    'Najcieńszy: 1,13 px przy 18 px i 1 px w meta. Przy 16 px prawie nie ma w pełni białych pikseli (3%).',
    { set: 'iconoir', stroke: 1.5 },
    { set: 'iconoir', stroke: THIN_STROKE },
  ),
  candidate(
    'M',
    'Material Symbols Sharp',
    'Proste narożniki bez zaokrągleń. Najostrzejszy przy 24 px (71%), przy 18 px podobny do Lucide. Nie ma cienkiej wagi do dużych ikon w tej paczce ani znaków marek.',
    { set: 'ms' },
    { set: 'ms' },
  ),
]
