/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  // theme: {
  //   daisyui: {
  //     zentala: [
  //       {
  //         mytheme: {
  //           primary: '#374151',
  //           secondary: '#1e40af',
  //           accent: '#fde047',
  //           neutral: '#f3f4f6',
  //           'base-100': '#1c1917',
  //           info: '#0ea5e9',
  //           success: '#84cc16',
  //           warning: '#ca8a04',
  //           error: '#991b1b',
  //         }
  //       }
  //     ]
  //   }
  // },
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'light', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
  plugins: [daisyui],
}
