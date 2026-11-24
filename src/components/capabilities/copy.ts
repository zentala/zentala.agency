/**
 * Public copy of /about/capabilities (English), from the accepted sketch of
 * owner decision DB-9 A. Every claim comes from a public page: the home page,
 * the old capabilities cards, /portfolio, /case-studies/zntl-desk, the Backstage
 * and harness offers, and the stack in package.json.
 * CAVEAT: claims still to be confirmed by the owner: the Ubudu proof line, "teams
 * of 50 to 200+ developers" (the outcome proof and the Developer portals area),
 * the merch robot line (domain IoT & robotics; the area fact "Robotics prototypes
 * from existing software and hardware" is still plural), and Node.js and Supabase
 * (stack layer). The Developer Experience, Developer portals and AI agents
 * keywords are the owner's words only; he has not given more.
 */

export const CAL_URL = 'https://cal.com/zentala'

export const NAME = 'Product Engineering'

export const HERO = {
  eyebrow: 'Capabilities',
  subtitle:
    'Software and connected devices, designed for the people who use them and built on one TypeScript stack.',
  approach:
    'Every project starts with the same three questions: who uses it, which problem it solves, and what the smallest working version looks like.',
}

export interface Outcome {
  /** Background icon (meaning from the icon map). */
  icon: string
  title: string
  body: string
  proof: string
  href: string
}

export const OUTCOMES = {
  headline: 'What you get',
  subhead: 'Three things I aim for in every project.',
  items: [
    {
      icon: 'team',
      title: 'Products built for people',
      body: 'I design in code and for the person using it, so the screen you approve is the screen that ships.',
      proof: 'zntlDesk: a desk designed to change sitting habits',
      href: '/case-studies/zntl-desk',
    },
    {
      icon: 'solution',
      title: 'Problems solved through products',
      body: 'I start from the problem and finish with something that runs: a version you can put in front of real users.',
      proof: 'Indoor location systems deployed worldwide at Ubudu',
      href: '/portfolio',
    },
    {
      icon: 'discovery',
      title: 'Product thinking',
      body: 'Before I pick a technology I ask who the product is for, what it must prove and what can wait. Those answers pick the stack.',
      proof: 'Backstage portals for teams of 50 to 200+ developers',
      href: '/about/capabilities/backstage',
    },
  ] satisfies Outcome[],
}

export interface Domain {
  name: string
  /** Icon meaning from the icon map. */
  icon: string
  keywords: string[]
  /** `id` of the area card the cell links to. */
  areaId: AreaId
}

export interface StackLayer {
  name: string
  /** simple-icons slugs, rendered through TechIcon. */
  logos: string[]
  /** The text under the logos: the tool names, or one line for the language. */
  detail: string
}

/**
 * Experience, not offer: keywords only. The owner's own words (feedback 2026-11-24, R5), English.
 * Cloud & DevOps is not a domain: it is a tool, and its facts live in the areas list.
 */
export const DOMAINS = {
  headline: 'T-shaped experience',
  subhead:
    'Broad across six fields, deep in one stack: TypeScript, from the interface to the services and tooling behind it.',
  items: [
    {
      name: 'Product & marketing',
      icon: 'domain-product',
      keywords: [
        'Product thinking',
        'Marketing strategy',
        'Hands-on marketing',
        'Strategy and analytics',
        'Building digital products',
        'Internet marketing',
        'Selling through websites',
      ],
      areaId: 'area-strategy',
    },
    {
      name: 'UX & web',
      icon: 'domain-ux',
      keywords: [
        'UX design',
        'Websites',
        'Web apps for clients',
        'Online shops',
      ],
      areaId: 'area-ux',
    },
    {
      name: 'IoT & robotics',
      icon: 'domain-iot',
      keywords: [
        'Sensors',
        'Smart home',
        'IoT devices',
        'Indoor location',
        'A merch robot prototype',
      ],
      areaId: 'area-iot',
    },
    {
      name: 'Developer Experience',
      icon: 'domain-devex',
      keywords: ['DevEx as a practice'],
      areaId: 'area-harness',
    },
    {
      name: 'Developer portals',
      icon: 'domain-portals',
      keywords: ['Backstage portals and plugins'],
      areaId: 'area-portals',
    },
    {
      name: 'AI agents',
      icon: 'ai-agent',
      keywords: ['Agent harnesses'],
      areaId: 'area-harness',
    },
  ] satisfies Domain[],
}

/** The four layers of the one stack, the lead row of the Technologies section. */
export const STACK = {
  layers: [
    {
      name: 'TypeScript',
      logos: ['typescript'],
      detail: 'One language, from the interface to the tooling',
    },
    {
      name: 'Interfaces',
      logos: ['react', 'astro', 'tailwindcss'],
      detail: 'React, Astro, Tailwind CSS',
    },
    {
      name: 'Services & data',
      logos: ['nodedotjs', 'supabase'],
      detail: 'Node.js, Supabase',
    },
    {
      name: 'Delivery & agents',
      logos: ['playwright', 'githubactions', 'docker', 'claude'],
      detail: 'Playwright, GitHub Actions, Docker, Claude Code',
    },
  ] satisfies StackLayer[],
}

/** The logo wall under the stack row: one list, rendered by TechLogoWall. */
export const TECH_WALL = {
  headline: 'Technologies I use',
  subhead:
    'The languages, frameworks, services and hardware behind the work on this page.',
  logos: [
    'typescript',
    'javascript',
    'html5',
    'css3',
    'react',
    'astro',
    'tailwindcss',
    'sass',
    'nodedotjs',
    'supabase',
    'postgresql',
    'docker',
    'cloudflare',
    'linux',
    'git',
    'npm',
    'githubactions',
    'playwright',
    'vitest',
    'backstage',
    'claude',
    'openai',
    'modelcontextprotocol',
    'figma',
    'espressif',
    'arduino',
    'raspberrypi',
    'homeassistant',
    'esphome',
    'zigbee',
    'bluetooth',
    'ros',
  ],
}

export type AreaId =
  | 'area-strategy'
  | 'area-ux'
  | 'area-apps'
  | 'area-iot'
  | 'area-portals'
  | 'area-harness'

export interface Area {
  /** Anchor the domain cells link to. */
  id: AreaId
  /** One glyph per area: the image placeholder (32 px) and the background icon (176 px). */
  icon: string
  title: string
  body: string
  href: string
  linkLabel: string
  /** Facts of the old capability cards the area absorbs, as a short list. */
  facts: string[]
}

export const AREAS = {
  headline: 'Areas of work',
  subhead:
    'Pick the one closest to your project. Each leads to examples or a full offer.',
  items: [
    {
      id: 'area-strategy',
      icon: 'strategy',
      title: 'Strategy & prototypes',
      body: 'Feasibility, specification and a first version that works.',
      href: '/portfolio',
      linkLabel: 'Portfolio',
      facts: [
        'Strategic innovation consulting',
        'Prototype concept and specification development',
      ],
    },
    {
      id: 'area-ux',
      icon: 'design',
      title: 'Product & UX design',
      body: 'Interfaces designed in code, for the person using them.',
      href: '/case-studies/zntl-desk',
      linkLabel: 'zntlDesk case study',
      facts: [
        'Code-first UI and UX design',
        'Interface design, information architecture',
      ],
    },
    {
      id: 'area-apps',
      icon: 'apps',
      title: 'Apps & cloud',
      body: 'Web, mobile and desktop apps on one TypeScript codebase, with the pipelines and data behind them.',
      href: '/portfolio',
      linkLabel: 'Portfolio',
      facts: [
        'Web applications and microservices in JavaScript',
        'WooCommerce online stores',
        'React Native apps for Android, Android TV, iOS and tvOS',
        'Electron.js desktop apps for Linux, Windows and macOS',
        'Console tools in Bash and Node.js',
        'Cloud infrastructure instead of servers to administer',
        'CI/CD and data pipelines',
        'Database selection and modeling',
      ],
    },
    {
      id: 'area-iot',
      icon: 'area-iot',
      title: 'IoT, robotics & smart home',
      body: 'Connected devices, indoor location, long-range wireless links and robot prototypes.',
      href: '/portfolio',
      linkLabel: 'Portfolio',
      facts: [
        'IoT prototypes from ready-made components',
        'Robotics prototypes from existing software and hardware',
        'Real-time location systems (RTLS): UWB, BLE, RFID, NFC and location algorithms',
        'Long-range wireless networks: urban and point-to-point links, WiFi bridges, antenna systems',
        'Smart homes: electrical infrastructure, lighting, alarms, admin panels, AI voice assistants',
      ],
    },
    {
      id: 'area-portals',
      icon: 'architecture',
      title: 'Developer portals',
      body: 'Backstage portals and custom plugins for teams of 50 to 200+ developers.',
      href: '/about/capabilities/backstage',
      linkLabel: 'Backstage offer',
      facts: ['Backstage developer portals', 'Developer Experience'],
    },
    {
      id: 'area-harness',
      icon: 'integrations',
      title: 'Harness engineering',
      body: 'An outside architect in your team, building the setup that lets developers and their agents move fast.',
      href: '/offer/harness-engineering',
      linkLabel: 'Harness engineering offer',
      facts: [
        'Machine learning and AI: ready-made models put to work in business operations',
      ],
    },
  ] satisfies Area[],
}

export const CTA = {
  headline: 'Tell me about your product',
  subhead:
    'A 30-minute call: what you want to build, for whom, and what a first working version could look like.',
  button: 'Book a call',
}
