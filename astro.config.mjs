import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import react from '@astrojs/react'
import { blogVersionHistoryDevPlugin } from './src/lib/dev/git-history/vitePlugin'

export default defineConfig({
  site: 'https://zentala.agency',
  output: 'static',
  redirects: {
    '/offer': '/about/capabilities',
    '/blog/index.old': '/blog',
  },
  integrations: [
    tailwind(),
    mdx(),
    icon({ include: { lucide: ['*'], ph: ['*'] } }),
    react({ include: ['src/components/react-stuff/**/*'] }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    plugins: [blogVersionHistoryDevPlugin()],
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
      allowedHosts: ['zentala.internal', 'localhost'],
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
