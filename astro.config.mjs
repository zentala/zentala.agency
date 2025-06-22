import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

export default defineConfig({
  integrations: [tailwind(), mdx(), icon({ include: { lucide: ['*'] } })],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        overlay: false,
      },
    },
  },
})
