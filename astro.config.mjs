import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import react from '@astrojs/react'
import solidJs from '@astrojs/solid-js'

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
    mdx(),
    icon({ include: { lucide: ['*'] } }),
    react({ include: ['src/components/react-stuff/**/*'] }),
    solidJs({ include: ['src/components/solid-chat/**/*'] }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
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
