/**
 * Draft public copy for the /mockups/capabilities sketch (dev only, English).
 * Every claim comes from a public page: the home page, /about/capabilities,
 * /portfolio, /case-studies/zntl-desk, the Backstage and harness offers, and the
 * stack in package.json. The page marks all of it as draft copy, and each claim
 * the owner has not confirmed yet (`unconfirmed`) carries a marker of its own.
 */

export const CAL_URL = 'https://cal.com/zentala'

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
  /** The proof is not confirmed by the owner yet: shows the dev-only marker. */
  unconfirmed?: boolean
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
      unconfirmed: true,
    },
    {
      title: 'Product thinking',
      body: 'Before I pick a technology I ask who the product is for, what it must prove and what can wait. Those answers pick the stack.',
      proof: 'Backstage portals for teams of 50 to 200+ developers',
      href: '/about/capabilities/backstage',
      unconfirmed: true,
    },
  ] satisfies Outcome[],
}

export interface Field {
  name: string
  detail: string
  /** The detail is not confirmed by the owner yet: shows the dev-only marker. */
  unconfirmed?: boolean
}

export interface StackLayer {
  name: string
  /** simple-icons slugs, rendered through TechIcon. */
  logos: string[]
  /** The text under the logos: the tool names, or one line for the language. */
  detail: string
  /** The detail is not confirmed by the owner yet: shows the dev-only marker. */
  unconfirmed?: boolean
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
    { name: 'Robotics', detail: 'Humanoid robot prototypes, ROS', unconfirmed: true },
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
      unconfirmed: true,
    },
    {
      name: 'Delivery & agents',
      logos: ['playwright', 'githubactions', 'docker', 'claude'],
      detail: 'Playwright, GitHub Actions, Docker, Claude Code',
    },
  ] satisfies StackLayer[],
}

export interface Area {
  title: string
  body: string
  href: string
  linkLabel: string
  /** Owner-facing (Polish): which of the 18 old cards this area absorbs. */
  devNote: string
  /** The body is not confirmed by the owner yet: shows the dev-only marker. */
  unconfirmed?: boolean
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
      devNote: 'Karty 01, 02 · brak własnej podstrony',
    },
    {
      title: 'Product & UX design',
      body: 'Interfaces designed in code, for the person using them.',
      href: '/case-studies/zntl-desk',
      linkLabel: 'zntlDesk case study',
      devNote: 'Karta 03',
    },
    {
      title: 'Apps & cloud',
      body: 'Web, mobile and desktop apps on one TypeScript codebase, with the pipelines and data behind them.',
      href: '/portfolio',
      linkLabel: 'Portfolio',
      devNote:
        'Karty 04 do 11 · 05 (sklepy WooCommerce) nie pasuje do stacka TS: zostaje czy znika?',
    },
    {
      title: 'IoT, robotics & smart home',
      body: 'Connected devices, indoor location, long-range wireless links and robot prototypes.',
      href: '/portfolio',
      linkLabel: 'Portfolio',
      devNote: 'Karty 12, 13, 16, 17, 18 · brak własnej podstrony',
    },
    {
      title: 'Developer portals',
      body: 'Backstage portals and custom plugins for teams of 50 to 200+ developers.',
      href: '/about/capabilities/backstage',
      linkLabel: 'Backstage offer',
      devNote: 'Karta 15',
      unconfirmed: true,
    },
    {
      title: 'Harness engineering',
      body: 'An outside architect in your team, building the setup that lets developers and their agents move fast.',
      href: '/offer/harness-engineering',
      linkLabel: 'Harness engineering offer',
      devNote: 'Karta 14 i nowa oferta',
    },
  ] satisfies Area[],
}

export const CTA = {
  headline: 'Tell me about your product',
  subhead:
    'A 30-minute call: what you want to build, for whom, and what a first working version could look like.',
  button: 'Book a call',
}
