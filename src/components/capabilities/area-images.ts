/**
 * Switch for the image placeholders at the top of the area cards. DESIGN.md section 8 forbids
 * placeholder images in production and the owner turned the mock cover images off (feedback
 * 2026-11-24, R1), so the placeholders show in `astro dev` only until the owner supplies images.
 * NOTE(intent): when the cover-image switch of R1 lands, read it here instead of DEV.
 */
export const SHOW_AREA_IMAGES: boolean = import.meta.env.DEV
