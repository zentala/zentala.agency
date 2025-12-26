/**
 * Banner component types and interfaces
 */

export type BannerVariant = 'simple' | 'simpleWithImage'

export interface BannerProps {
  /** Banner variant/template to use */
  variant: BannerVariant
  /** Banner title/heading */
  title: string
  /** Banner description text */
  description: string
  /** Link text (e.g., "Learn more →") */
  linkText: string
  /** Link href/URL */
  linkHref: string
  /** Optional image URL (for future variants) */
  image?: string
  /** Optional additional CSS classes */
  class?: string
}

