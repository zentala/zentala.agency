import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [typography, animate],
}
