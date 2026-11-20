/**
 * DEV-ONLY mockup switches for the heading weight/size and font decisions (C5).
 * Loaded from Layout.astro behind `import.meta.env.DEV`, so Vite drops it from
 * production. Reads ?headings=300|200|off and ?font=system|inter, remembers the
 * last choices in localStorage, sets html[data-headings] / html[data-font] and
 * injects its own CSS and toggles. The Inter variable font is imported only when
 * chosen, so the system font stays the default and nothing ships to production.
 */
interface Switch<T extends string> {
  label: string
  param: string
  storageKey: string
  attribute: string
  variants: readonly T[]
  labels: Record<T, string>
  fallback: T
  onApply?: (variant: T) => void
}

const HEADINGS_SWITCH: Switch<'off' | '300' | '200'> = {
  label: 'Headings:',
  param: 'headings',
  storageKey: 'zdr:headings',
  attribute: 'headings',
  variants: ['off', '300', '200'],
  labels: { off: 'current', '300': '300', '200': '200' },
  fallback: 'off',
}

const FONT_SWITCH: Switch<'system' | 'inter'> = {
  label: 'Font:',
  param: 'font',
  storageKey: 'zdr:font',
  attribute: 'font',
  variants: ['system', 'inter'],
  labels: { system: 'system', inter: 'Inter' },
  fallback: 'system',
  onApply: (variant) => {
    if (variant === 'inter') void import('@fontsource-variable/inter/index.css')
  },
}

const INTER_STACK = "'Inter Variable', InterVariable, Inter, ui-sans-serif, system-ui, sans-serif"

/** Page titles, section titles and card titles: h1 to h3 inside <main>, not the footer or navbar. */
const HEADINGS = 'main :is(h1, h2, h3)'

/** zoom scales the heading's own font-size at every breakpoint by one step (+13%), whatever token or utility set it. */
const STYLE = `
html { --headings-scale: 1.13; }
html[data-headings='300'] ${HEADINGS} { zoom: var(--headings-scale); font-weight: 300 !important; }
html[data-headings='200'] ${HEADINGS} { zoom: var(--headings-scale); font-weight: 200 !important; }
html[data-headings='200'] :is(.desktop-nav, .mobile-nav) a { font-weight: 400 !important; }
html[data-font='inter'] :is(body, body *):not(:is(code, pre, kbd, samp, svg, svg *)) { font-family: ${INTER_STACK} !important; }
.heading-switch {
  position: fixed; left: 8px; bottom: 8px; z-index: 60;
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 4px 6px;
  background: #000; border: 1px solid var(--color-line, #27272a);
  font: 400 11px/1 ui-sans-serif, system-ui, sans-serif; color: #a1a1aa;
}
.heading-switch [role='group'] { display: flex; align-items: center; gap: 4px; }
.heading-switch button {
  font: inherit; color: inherit; background: transparent; cursor: pointer;
  border: 1px solid transparent; padding: 5px 7px;
  transition: color var(--motion-fast, 150ms), border-color var(--motion-fast, 150ms);
}
.heading-switch button:hover { color: #fff; }
.heading-switch button:focus-visible { outline: 2px solid var(--color-accent, #60a5fa); outline-offset: 1px; }
.heading-switch button[aria-pressed='true'] { color: #fff; border-color: #52525b; }
`

function readInitial<T extends string>(sw: Switch<T>): T {
  const fromUrl = new URLSearchParams(location.search).get(sw.param)
  if (sw.variants.includes(fromUrl as T)) return fromUrl as T
  const stored = localStorage.getItem(sw.storageKey)
  return sw.variants.includes(stored as T) ? (stored as T) : sw.fallback
}

function mountSwitch<T extends string>(sw: Switch<T>, container: HTMLElement): void {
  const group = document.createElement('div')
  group.setAttribute('role', 'group')
  group.setAttribute('aria-label', sw.label)
  group.append(sw.label)
  const buttons = new Map<T, HTMLButtonElement>()

  const apply = (variant: T): void => {
    document.documentElement.dataset[sw.attribute] = variant
    localStorage.setItem(sw.storageKey, variant)
    const url = new URL(location.href)
    url.searchParams.set(sw.param, variant)
    history.replaceState(null, '', url)
    buttons.forEach((button, key) => button.setAttribute('aria-pressed', String(key === variant)))
    sw.onApply?.(variant)
  }

  for (const variant of sw.variants) {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = sw.labels[variant]
    button.addEventListener('click', () => apply(variant))
    buttons.set(variant, button)
    group.append(button)
  }
  container.append(group)
  apply(readInitial(sw))
}

function mount(): void {
  const style = document.createElement('style')
  style.textContent = STYLE
  document.head.append(style)

  const bar = document.createElement('div')
  bar.className = 'heading-switch'
  bar.setAttribute('aria-label', 'Typography mockup')
  mountSwitch(HEADINGS_SWITCH, bar)
  mountSwitch(FONT_SWITCH, bar)
  document.body.append(bar)
}

mount()

export {}
