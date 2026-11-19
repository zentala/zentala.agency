import { Agentation } from 'agentation'

/** Same-origin Vite proxy to the shared Agentation backend (see astro.config.mjs). */
const AGENTATION_ENDPOINT = '/__agentation'

/** Dev-only visual feedback toolbar; annotations also sync to the agent backend. */
export function AgentationReview() {
  return <Agentation endpoint={AGENTATION_ENDPOINT} appName="zentala.agency" />
}
