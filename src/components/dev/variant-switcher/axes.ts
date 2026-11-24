/**
 * Axes of the dev-only variant switcher. Each axis becomes one row of buttons in the
 * panel and one `data-v-<id>` attribute on `<html>`; shared components read that
 * attribute in CSS. The first option is the current look and sets no attribute.
 * Add an axis: one `axis(...)` line here, plus the CSS that reads its attribute.
 */
export interface VariantOption {
  value: string
  label: string
}

export interface VariantAxis {
  id: string
  label: string
  options: VariantOption[]
}

const DEFAULT_VALUE = 'default'

/** `options` are `value:label` pairs; a bare label gets the value `default`. */
const axis = (
  id: string,
  label: string,
  ...options: string[]
): VariantAxis => ({
  id,
  label,
  options: options.map((option) => {
    const separator = option.indexOf(':')
    return separator < 0
      ? { value: DEFAULT_VALUE, label: option }
      : {
          value: option.slice(0, separator),
          label: option.slice(separator + 1),
        }
  }),
})

export const VARIANT_AXES: VariantAxis[] = [
  axis('first-view', 'Pierwszy ekran', 'zwykły', 'full:na cały ekran'),
  axis(
    'font',
    'Czcionka',
    'Segoe UI',
    'selawik:Selawik',
    'open-sans:Open Sans',
    'noto-sans:Noto Sans',
    'source-sans:Source Sans 3',
  ),
  axis(
    'form',
    'Formularz',
    'B (linie w obu kierunkach)',
    'line:C (tylko poziome)',
  ),
  axis(
    'cta',
    'Przycisk "Book a call"',
    'Niebieski (obecny)',
    'steel:Stalowy niebieski',
    'ice:Lodowy jasny',
    'white:Biały (poziom primary)',
    'ghost:Cichy szary z niebieskim tekstem',
  ),
  axis(
    'card-hover',
    'Najechanie na kartę',
    'Wypełnienie (obecne)',
    'inner-light:Światło od środka',
    'spotlight:Reflektor za kursorem',
  ),
  axis(
    'logo-expand',
    'Rozwijanie logo technologii',
    'Rośnie 2 x 2 (w prawo i w dół)',
    'span-right:Rozciąga się w prawo (3 komórki)',
    'note-strip:Pas z notatką nad ścianą',
  ),
]

export const VARIANT_STORAGE_KEY = 'dev-variants'
export const variantAttribute = (id: string) => `data-v-${id}`
