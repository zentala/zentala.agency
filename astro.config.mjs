import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

export default defineConfig({
  integrations: [tailwind(), mdx()],
  vite: {
    server: {
      watch: {
        usePolling: true, // Włącza polling, co może pomóc w niektórych środowiskach
      },
      hmr: {
        overlay: false, // Wyłącza overlay dla HMR
      },
    },
  },
})
