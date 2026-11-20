# Blog content contract

Moved verbatim from the former `.claude/CLAUDE.md` section "Blog content" (2026-11-20). Entry point: [AGENTS.md](../../AGENTS.md).

## Blog content

### What this author shares, and who reads it

The register is **architecture and strategy** (Paweł's own words) — not
tutorials for beginners, not opinion without a mechanism behind it. Every
post either gives the reader a working mechanism they can hand to their own
agent, or argues a position backed by a system that actually runs, not a
hypothetical. Readers are DevEx practitioners, engineering leads weighing an
internal developer portal or a Backstage rollout, and people building
agent-native tooling of their own — competent by default; nothing gets
explained from zero for them. Before drafting or editing any post, load the
skill `authorship` (`~/.claude/skills/authorship/SKILL.md`) — it holds the
reader-first rules and the editor's checklist this register runs on.

### Four series, one split by question

The blog runs **four article series** (`src/content/series-descriptions/`),
and most new posts belong to one of them. The split is by the question a
post answers, not by its topic:

| Series | Slug | Answers | Holds |
|---|---|---|---|
| **Agent-Native Harness** | `agent-native-harness` | **how** | the machinery that already runs: agent registry, bang commands, PM3, the knowledge base, the feedback loop, the main-branch lease |
| **Multi-Interface** | `multi-interface` | **why** | UX, DX and AX as one discipline: content negotiation, Markdown/MDX as the substrate, agent-native architecture (A2A + MCP + API at once), addressing, brokers |
| **Developer Experience** | `developer-experience` | **why it pays, how to start** | DevEx as a practice, why an internal developer portal is the usual first move, how a Backstage rollout survives contact with a real organization, and the turn where the same catalog data an internal portal built for humans turns out to be what an AI agent needs too |
| **Information Architecture** | `information-architecture` | **how people and agents learn** | taxonomy, ontology, metadata and navigation as engineering concerns; documentation written for two readers at once (the next developer and the next agent); onboarding as continuous, not a first week |

Harness links to Multi-Interface as its justification; Multi-Interface links to
Harness as its proof. A post that explains a mechanism goes to Harness. A post
that argues a position goes to Multi-Interface. Developer Experience and
Information Architecture each read standalone — read their full descriptions
in `src/content/series-descriptions/*.md` before assigning a post to one, they
carry more than the one-line "answers" column above.

A post that fits none of the four stays outside `series:` entirely (see
`static-webistes-no-time.md`, `agenci-zostawiaja-feedback-o-toolingu.md` for
examples already in the tree) — do not force a series assignment a post
doesn't earn.

### Which blog, first

Which blog gets an article at all is a global rule (`~/.claude/CLAUDE.md`):
commercial topics — harness, agent-native, multi-interface, AI agency, DevEx —
are written **here**, straight away. Everything else goes to `log.zentala.pl`
(repo `zntl-portal`). That repo's `src/content/ideas/` is the workshop and stays
the source: drafts may be **moved here as files, never summarized**.

### How an article gets written — draft on the site, no `.plan/` planning

Operator decision, 2026-11-19. An article does **not** go through planning in
`.plan/`: no epic, no tasks, no `HANDOFF.md`.

1. Write the article straight away in `src/content/blog/` with
   `published: false`.
2. Show Paweł the working local link, `http://zentala.internal/blog/<slug>/`.
3. Iterate on his remarks in the same file until he publishes it.

Planning in `.plan/` is for technical and UX work only, for example a new
diagram component an article needs. That work runs separately, the normal
way, and the article does not wait for it: build article blocks as the draft
needs them (`src/components/blog/rich/`).

### Frontmatter contract (`src/content/config.ts`, `blogCollection`)

| Field | Required | Meaning |
|---|---|---|
| `title` | yes | Post title, single-quoted string |
| `date` | yes | `'YYYY-MM-DD'` |
| `category` | yes | One of the existing categories (`DevEx`, `Harness`, `Agent Orchestration`, `IA`, `Innovation`, `Knowledge & Leverage`, `WebDev`) unless the post genuinely starts a new one — a `category-descriptions/<slug>.md` entry is needed for a new category (only `devex.md` exists today; others render without one, but adding the description is still the contract) |
| `excerpt` | yes | 1–3 sentences, reader-facing — this is the card/preview copy, held to the same reader-first rule as the post itself |
| `author` | no | Defaults to `pawel-zentala` (`src/content/authors/zentala.yaml`) |
| `authorRole` | no | e.g. `'DevEx Consultant'` |
| `published` | no | `false` keeps a post out of the production build while leaving it visible in `npm run dev` — draft posts stay `false` until reviewed |
| `review` | no | `true` marks a draft the agent judges ready for the owner's publication review; meaningful only with `published: false`. Dev shows it with a blue "Review" marker instead of the amber "Draft" one. It publishes nothing; see "Publication needs the owner's separate review" |
| `series` | no | One of the four slugs above; a series page only materializes if at least one post carries its slug (`getStaticPaths` groups by posts, not by the description file) |
| `part` | no | A number, only meaningful alongside `series` |
| `linkedinPost` | no | **Legacy.** Older posts still carry the LinkedIn companion inline as an escaped string. New posts use the sidecar file below instead — see "Surface sidecars" |
| `imageUrl` / `bannerEnd` | no | Optional visual fields |

### Publication needs the owner's separate review

Operator decision, 2026-11-20. An agent may set `review: true` on a draft it
judges ready (checked against the `authorship` editor checklist). Only the
owner's explicit approval sets `published: true`; an agent never does, and never
removes `published: false` on its own judgment.

### Thin-series rule

In production (drafts hidden) a series counts as a series only with at least
two published parts. Fewer, and the series has no card on `/blog`, no
`/series/<slug>` page, no series rail and no "Part n of m" label; its published
parts show as standalone posts. Drafts never count. In dev everything stays
visible, and a series that production would hide carries the corner tag "Hidden
in production (n published)" on its card. The rule lives in
`src/lib/blog/visibility.ts` (`selectVisiblePosts`, `findThinSeries`), covered by
`tests/unit/blog-visibility.test.ts`.

### Surface sidecars — one topic, several surfaces, kept close together

A post's LinkedIn (or Reddit, or any other surface) companion is its own
**file**, not a frontmatter string. Paweł, on why: *"Ja chcę, żeby LinkedIn
był jako osobne pliki i to musi być łatwe do czytania dla mnie do edycji. Ja
chcę to zobaczyć tak, jakbym to widział na LinkedInie, a nie tak, że to jest
[frontmatter]."* A LinkedIn post can also exist with no article at all, and
one topic can carry several posts over time — the sidecar model has to allow
both.

**Naming**: `_<slug>.li.md`, living in `src/content/blog/` next to
`<slug>.md`. The leading underscore is Astro's own content-collection
exclusion convention (files/dirs starting with `_` are skipped by every
collection loader) — without it, `blogCollection`'s schema (title, date,
category, excerpt all required) would reject the sidecar at build time. The
suffix names the surface: `.li.md` today; `.reddit.md` would follow the same
pattern the day a post gets a Reddit companion. **No frontmatter, no
escaping** — the file's body is exactly the text posted to that surface, so
opening it in an editor shows what a reader would see there.

Wired through a second, minimal content collection (`linkedin` in
`src/content/config.ts`, an `astro/loaders` `glob()` loader scoped to
`_*.li.md`, empty schema) — not a new top-level `src/content/` directory.
`src/pages/linkedin-preview/[postSlug].astro` reads the sidecar by slug
(falling back to the legacy `linkedinPost` field for posts not yet
migrated) and feeds it to `LinkedInPostCard.astro` unchanged; that component
already treats the text as newline-separated paragraphs, so real markdown
line breaks work exactly like the old escaped `\n\n` did.

**LinkedIn's own constraints** (derived from the five `linkedinPost` bodies
already written for this blog — `bang-commands-zero-token-cli-dla-agenta.md`,
`the-lease-one-writer-at-a-time.md`, `the-personal-knowledge-base-system.md`,
`trzasanie-drzewem-pomyslow-agenta-pytaniami.md`, and the sidecar for
`file-based-lease-for-parallel-agents.md` — not invented):

- No headings, no tables — every one of the five is plain paragraphs plus,
  at most, a numbered or dashed list.
- Opens with the sharpest concrete claim in the piece ("Run two coding
  agents against one checkout and you don't get a crash. You get something
  worse…"), never a summary sentence ("New post about…").
- Short paragraphs, blank line between them — LinkedIn's reading pattern is
  vertical scanning, not paragraph blocks.
- Closes by pointing at the full piece ("Full article on the blog, link in
  the first comment." / "Part 7 (closing) of the agent-native harness
  series.") rather than restating it.
- No emoji, no hashtags in any of the five — do not add them by reflex.
