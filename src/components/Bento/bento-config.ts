export interface BentoState {
  id: string
  title: string
  description: string
  image?: string
  tags?: string[]
  theme?: 'dark' | 'light'
}

export const BENTO_STATES: Record<string, BentoState> = {
  avatar: {
    id: 'avatar',
    title: 'Paweł Żentała',
    image: 'https://cdn.zentala.io/images/avatar.jpg',
    description:
      'Architect, Engineer, and Technical Leader with business and client understanding. I bridge the gap between abstract vision and functional reality.',
    tags: ['#Architect', '#Leader', '#HandsOn'],
  },
  prototyping: {
    id: 'prototyping',
    title: 'Fast-Track MVP',
    description:
      'I focus on technological processes, providing the shortest path from strategy to successful validation.',
    tags: ['#Workshops', '#MVP', '#Validation'],
  },
  cto: {
    id: 'cto',
    title: 'Fractional CTO',
    description:
      'I architect the future of your product while building the team that will carry it forward.',
    tags: ['#Strategy', '#Leadership', '#Scaling'],
  },
  ai: {
    id: 'ai',
    title: 'AI Orchestration',
    description:
      'I operate as an architect leading a "team" of AI agents to build production-ready prototypes.',
    tags: ['#AI-Agents', '#LLMs', '#Automation'],
  },
  logo: {
    id: 'logo',
    title: 'Zentala Innovation Agency',
    description:
      'The ultimate format for software prototyping and technological bootstrapping.',
    theme: 'light',
  },
}
