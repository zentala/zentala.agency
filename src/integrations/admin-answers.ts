/**
 * Dev-only Astro integration: mounts POST /__admin/answers on the dev server for the
 * /admin/decisions page. `astro:server:setup` runs for `astro dev` only, so nothing of this
 * exists in a build or in `astro preview`.
 */
import type { AstroIntegration } from 'astro'
import { ANSWERS_ROUTE, handleAnswersRequest } from '../lib/admin/answers-handler'

export const adminAnswersIntegration: AstroIntegration = {
  name: 'admin-answers',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use(ANSWERS_ROUTE, (req, res) => {
        void handleAnswersRequest(req, res)
      })
    },
  },
}
