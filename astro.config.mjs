import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import react from '@astrojs/react'

export default defineConfig({
  output: 'hybrid',
  integrations: [
    tailwind(),
    mdx(),
    icon({ include: { lucide: ['*'] } }),
    react(),
  ],
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
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
})
