/**
 * Public copy of /about/capabilities (English), from the accepted sketch of
 * owner decision DB-9 A. Every claim comes from a public page: the home page,
 * the old capabilities cards, /portfolio, /case-studies/zntl-desk, the Backstage
 * and harness offers, and the stack in package.json.
 * CAVEAT: the sketch marked these claims as not yet confirmed by the owner:
 * the Ubudu proof line and the Backstage "50 to 200+ developers" proof
 * (Outcomes), "Humanoid robot prototypes, ROS" (T-shape field), Node.js and
 * Supabase (stack layer) and the Backstage area line. The markers are gone
 * from the page; the owner reviews these lines in the diff.
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
      title: 'Products built for people',
      body: 'I design in code and for the person using it, so the screen you approve is the screen that ships.',
      proof: 'zntlDesk: a desk designed to change sitting habits',
      href: '/case-studies/zntl-desk',
    },
    {
      title: 'Problems solved through products',
      body: 'I start from the problem and finish with something that runs: a version you can put in front of real users.',
      proof: 'Indoor location systems deployed worldwide at Ubudu',
      href: '/portfolio',
    },
    {
      title: 'Product thinking',
      body: 'Before I pick a technology I ask who the product is for, what it must prove and what can wait. Those answers pick the stack.',
      proof: 'Backstage portals for teams of 50 to 200+ developers',
      href: '/about/capabilities/backstage',
    },
  ] satisfies Outcome[],
}

export interface Field {
  name: string
  detail: string
}

export interface StackLayer {
  name: string
  /** simple-icons slugs, rendered through TechIcon. */
  logos: string[]
  /** The text under the logos: the tool names, or one line for the language. */
  detail: string
}

export const TSHAPE = {
  headline: 'Broad experience, one stack to build it',
  subhead:
    'I have shipped work from interface design to electronics and developer platforms. Across those fields I deliver with one stack, TypeScript, from the interface to the services and tooling behind it.',
  breadth: {
    label: 'Breadth',
    caption: 'Fields I have shipped work in, from interfaces to developer platforms.',
  },
  depth: {
    label: 'Depth',
    caption: 'One stack to deliver it: interface, services, tests and agents.',
  },
  fields: [
    { name: 'Product & UX', detail: 'Interface design, information architecture' },
    { name: 'IoT & electronics', detail: 'Sensors, smart home, indoor location' },
    { name: 'Robotics', detail: 'Humanoid robot prototypes, ROS' },
    { name: 'Cloud & DevOps', detail: 'CI/CD, Docker, cloud infrastructure' },
    { name: 'DevEx & AI agents', detail: 'Backstage portals, agent harnesses' },
  ] satisfies Field[],
  stack: [
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

/** The logo wall under the T-shape: one list, rendered by TechLogoWall. */
export const TECH_WALL = {
  headline: 'Technologies I use',
  subhead: 'The languages, frameworks, services and hardware behind the work on this page.',
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

export interface Area {
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
      title: 'Product & UX design',
      body: 'Interfaces designed in code, for the person using them.',
      href: '/case-studies/zntl-desk',
      linkLabel: 'zntlDesk case study',
      facts: [
        'Code-first UI and UX design',
      ],
    },
    {
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
      title: 'Developer portals',
      body: 'Backstage portals and custom plugins for teams of 50 to 200+ developers.',
      href: '/about/capabilities/backstage',
      linkLabel: 'Backstage offer',
      facts: [
        'Backstage developer portals',
        'Developer Experience',
      ],
    },
    {
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
