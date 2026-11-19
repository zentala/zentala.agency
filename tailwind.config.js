import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // md and lg match the SCSS tablet (771) and medium (1001) edges. sm, xl and 2xl
      // keep their defaults: the blog rail depends on xl (1280).
      screens: {
        md: '771px',
        lg: '1001px',
      },
      fontFamily: {
        sans: ['InterVariable', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      // Semantic colours, values live in src/styles/tokens.scss
      colors: {
        fg: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
          hover: 'var(--color-surface-hover)',
        },
        line: {
          DEFAULT: 'var(--color-line)',
          strong: 'var(--color-line-strong)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          solid: 'var(--color-accent-solid)',
        },
        warn: 'var(--color-warn)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
      },
      fontSize: {
        label: [
          'var(--text-label)',
          { letterSpacing: 'var(--tracking-label)', lineHeight: '1rem' },
        ],
      },
      transitionDuration: {
        fast: 'var(--motion-fast)',
        base: 'var(--motion-base)',
        slow: 'var(--motion-slow)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        enter: 'var(--ease-enter)',
      },
    },
  },
  plugins: [typography, animate],
}
