import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { blogVersionHistoryDevPlugin } from './src/lib/dev/git-history/vitePlugin'

/** True when Astro was invoked as `astro build`, false for `astro dev`/`preview`. */
const isBuild = process.argv.includes('build')

const AGENTATION_PREFIX = '/__agentation'
const AGENTATION_BACKEND = 'http://127.0.0.1:4747'
/** Only the routes the widget uses (it probes /health first); never /mcp, /status, /events or /pending. */
const AGENTATION_WIDGET_ROUTES = [
  /^\/health$/,
  /^\/sessions$/,
  /^\/sessions\/[^/]+$/,
  /^\/sessions\/[^/]+\/(events|pending|action|annotations)$/,
  /^\/annotations\/[^/]+$/,
  /^\/annotations\/[^/]+\/thread$/,
]

const agentationToken = process.env.AGENTATION_MCP_AUTH_TOKEN
const isAgentationReview =
  !isBuild &&
  process.env.PUBLIC_AGENTATION_REVIEW === '1' &&
  Boolean(agentationToken)

if (
  !isBuild &&
  process.env.PUBLIC_AGENTATION_REVIEW === '1' &&
  !agentationToken
) {
  console.warn(
    '[agentation] PUBLIC_AGENTATION_REVIEW=1 but AGENTATION_MCP_AUTH_TOKEN is missing: the toolbar renders without the sync proxy.',
  )
}

/**
 * Same-origin proxy for the Agentation review widget. The broker token is added
 * here, server-side; the browser Origin is forwarded untouched so the backend's
 * CORS allow-list stays in charge.
 */
const agentationProxy = {
  [AGENTATION_PREFIX]: {
    target: AGENTATION_BACKEND,
    changeOrigin: true,
    rewrite: (path) => path.slice(AGENTATION_PREFIX.length),
    bypass: (req) => {
      const route = (req.url ?? '').slice(AGENTATION_PREFIX.length).split('?')[0]
      return AGENTATION_WIDGET_ROUTES.some((re) => re.test(route)) ? undefined : false
    },
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.setHeader('Authorization', `Bearer ${agentationToken}`)
      })
    },
  },
}

/** Dev-only: mounts the review toolbar from a client script, so no template, CSS or chunk reaches `astro build`. */
const agentationReviewIntegration = {
  name: 'agentation-review',
  hooks: {
    'astro:config:setup': ({ command, injectScript }) => {
      if (command !== 'dev' || process.env.PUBLIC_AGENTATION_REVIEW !== '1') return
      // The page has no React island, so @astrojs/react never installs the Fast Refresh
      // preamble that @vitejs/plugin-react requires before mount.tsx loads.
      injectScript(
        'page',
        `import RefreshRuntime from '/@react-refresh'
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
import('/src/components/react-stuff/dev/agentation/mount.tsx')`,
      )
    },
  },
}

export default defineConfig({
  site: 'https://zentala.agency',
  output: 'static',
  redirects: {
    '/offer': '/about/capabilities',
    '/capabilities': '/about/capabilities',
    '/offer/backstage': '/about/capabilities/backstage',
    '/blog/index.old': '/blog',
    '/series/information-architecture': '/series/developer-experience',
  },
  integrations: [
    tailwind(),
    agentationReviewIntegration,
    mdx(),
    icon({ include: { ph: ['*'], 'simple-icons': ['*'] } }),
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
      allowedHosts: ['agency.internal', 'zentala.internal', 'localhost'],
      proxy: isAgentationReview ? agentationProxy : undefined,
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
