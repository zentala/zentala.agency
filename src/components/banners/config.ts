/**
 * Banner configurations - easy to modify text content
 * Each banner has its own configuration object
 */

import type { BannerProps } from './types'

export const bannerConfigs: Record<string, Omit<BannerProps, 'variant'>> = {
  devex: {
    title: 'Want to enhance your Developer Experience?',
    description:
      'Let me help you design and execute your DevEx strategy through Backstage implementation.',
    linkText: 'Learn more →',
    linkHref: '/offer/backstage-developer-experience',
  },
  'devex-category': {
    title: 'Interested in DevEx?',
    description: 'Check out more articles about Developer Experience:',
    linkText: 'See more →',
    linkHref: '/category/DevEx',
  },
  'ai-automation': {
    title: 'Interested in AI Automation?',
    description: 'Explore more articles about AI Automation:',
    linkText: 'See more →',
    linkHref: '/category/AIAutomation',
  },
}

/**
 * Get banner config by key
 */
export function getBannerConfig(key: string): Omit<BannerProps, 'variant'> | undefined {
  return bannerConfigs[key]
}

