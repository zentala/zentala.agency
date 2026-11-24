/**
 * Client behaviour of TechLogoWall tiles that expand into a note. Hover and keyboard focus are CSS only; this
 * adds the tap toggle (`aria-expanded` on the tile), and the ways to close: Escape, leaving the cell with the
 * mouse and a tap elsewhere.
 */
const TILE = '.logo-wall__tile[aria-expanded]'
const ITEM = '.logo-wall__item'
const DISMISSED = 'data-dismissed'

function closeAll(except?: Element | null): void {
  document.querySelectorAll(`${TILE}[aria-expanded="true"]`).forEach((tile) => {
    if (tile !== except) tile.setAttribute('aria-expanded', 'false')
  })
}

document.addEventListener('click', (event) => {
  const tile = (event.target as Element).closest(TILE)
  closeAll(tile)
  if (tile) tile.setAttribute('aria-expanded', String(tile.getAttribute('aria-expanded') !== 'true'))
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  closeAll()
  document
    .querySelectorAll(`${ITEM}:is(:hover, :has(:focus-visible))`)
    .forEach((item) => item.setAttribute(DISMISSED, ''))
})

document.querySelectorAll(ITEM).forEach((item) => {
  const reopen = () => item.removeAttribute(DISMISSED)
  item.addEventListener('pointerleave', (event) => {
    reopen()
    if ((event as PointerEvent).pointerType === 'mouse') {
      item.querySelector(TILE)?.setAttribute('aria-expanded', 'false')
    }
  })
  item.addEventListener('focusout', reopen)
})
