import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { blogVersionHistoryDevPlugin } from './src/lib/dev/git-history/vitePlugin'

/** True when Astro was invoked as `astro build`, false for `astro dev`/`preview`. */
const isBuild = process.argv.includes('build')

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
    sitemap({
      filter: (page) => !page.includes('/linkedin-preview/'),
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    // `astro build` and the long-running `astro dev` service must NOT share a
    // dep-optimizer cache. Vite bakes NODE_ENV into the pre-bundle at optimize
    // time and its invalidation hash carries no command/mode, so a build run
    // overwrites the dev server's `react/jsx-dev-runtime` with the production
    // build — where `jsxDEV` is undefined — and every React island on the
    // running dev server dies with `TypeError: jsxDEV is not a function`.
    // Separate cache dirs; neither run can poison the other.
    cacheDir: isBuild ? 'node_modules/.vite-build' : 'node_modules/.vite-dev',
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
