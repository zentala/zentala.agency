# 007 — Homepage bottom-left tile becomes the portfolio entry point

**Status:** ready for implementation
**Created:** 2026-08-26
**Owner:** zentala
**Points:** 5 · **Importance:** High

## TLDR

The 1x2 tile in the bottom-left of the homepage bento is a **stock photo from
Unsplash** (`src/sections/home/BentoAboutMe.astro:359`, "Technology
workspace") — a stranger's desk standing in for Pawel's work on his own front
page. Replace it with a tile that shows **his own work** and, on hover,
reveals a portfolio blurb plus a link, exactly the way the avatar tile at the
top-right already behaves. Clicking anywhere on the tile goes to
`/portfolio`.

## Context — how it works today

`BentoAboutMe.astro` renders the whole homepage above the CTA. Its grid holds
one tile per idea. Two of them matter here:

- **The avatar tile** (`BentoAboutMe.astro:174-195`) — the pattern to copy.
  A full-bleed grayscale image at `opacity-40`, and an absolutely positioned
  overlay (`inset-0`, `bg-gradient-to-t from-black`) holding an `h3` and a
  paragraph, that fades in on hover. This is the "jak w Pawel Zentala"
  behaviour Pawel asked for.
- **The stock tile** (`BentoAboutMe.astro:356-365`) — a bare `SectionImage`
  inside `<BentoCard colSpan={1} rowSpan={2} padding="none">`, no link, no
  text, no hover content. This is what gets replaced.

`SectionImage` (`src/components/primitives/sections/SectionImage.astro`)
already supports `aspectRatio`, `objectFit`, `hoverZoom` and an
`overlayPosition` — read it before writing anything new.

## The problem

1. The image is not his. It is a stock photo of somebody else's desk.
2. The tile is dead weight: it carries no message and goes nowhere.
3. **The homepage never links to `/portfolio` at all.** The one page that
   proves twenty years of work is unreachable from the front page.

## Proposal

One tile, three jobs: show his work, say what the portfolio is, take you
there.

- **Whole tile is a link** to `/portfolio` (`<a>` wrapping the card, or
  `BentoCard` with an `href` — check whether `BentoCard` already takes one
  before adding it).
- **Resting state:** one portfolio screenshot, grayscale, `opacity-40`, same
  treatment as the avatar tile so the grid stays one visual language.
- **Hover state:** the image lifts to full opacity/colour, and a bottom
  gradient overlay fades in with:
  - `h3`: **Portfolio**
  - one paragraph, at most two lines: what is inside. Draft copy, reuse or
    rewrite: *"Twenty years of shipped work — indoor location systems for
    retail, a socially-aware humanoid robot, Backstage portals for
    enterprises, and a smart home built into my own walls."*
  - a link affordance: `See the portfolio ->` (styled, not a nested `<a>` —
    the whole tile is already the link).
- **Aspect ratio:** the tile is `rowSpan={2}`, so it is tall and narrow.
  A landscape screenshot inside it must be `object-cover` and cropped, or it
  will letterbox. Prefer a portrait-friendly crop, or a vertical stack of two
  screenshots — decide by looking at it in the browser, not in the abstract.

## The blocker — there are no images

**Verified 2026-08-26: this repo contains zero portfolio images.**
`public/images/portfolio/` does not exist; the `image:` fields in
`src/pages/portfolio.astro` point at files that were never added
(`rtls.jpg`, `smart-home.jpg`, `backstage.jpg`, `open-smart-desk.jpg`,
`robot.jpg`), and `PortfolioItem.astro:30` has the `<img>` **commented out**,
which is why the portfolio page has never shown a broken image — it shows no
images at all. The only picture the site owns is `avatar.jpg` on the CDN.

So this task cannot finish on assets that exist. Options, in order of
preference:

1. **Screenshot what is still live.** Of the portfolio links, these answer
   today: `ubudu.com`, `zentala.eu`, `behance.net/zentala`, the YouTube robot
   playlist, and the WiFi-Live archive on `web.archive.org`. A screenshot of
   the robot video or of `zentala.eu` is genuinely his work and costs one
   browser session.
2. **Pawel supplies a file.** Photos of the robot, the smart-home panel, or
   an RTLS deployment would beat any screenshot. Ask once, do not block on it.
3. **Ship the mechanic with the strongest available image and swap the file
   later.** The layout work is independent of which JPEG lands in it.

Whatever is used goes to `public/images/portfolio/` and is committed — not
hotlinked from a third-party host, which is how the site got into this mess.

## Acceptance criteria

1. No `images.unsplash.com` URL remains in
   `src/sections/home/BentoAboutMe.astro`. (`grep` it — the file has a second
   Unsplash reference in the unused `BentoShowcase.astro`; that one is out of
   scope but note it.)
2. Clicking the bottom-left tile lands on `/portfolio`.
3. Hovering it reveals a heading, a description and a link cue, and the
   transition matches the avatar tile's timing (`duration-500`/`duration-700`).
4. The image is a file in `public/images/portfolio/`, served from this repo.
5. `npx astro build` exits 0. (`npm run build` is still blocked by the 276
   solid-chat `astro check` errors — see `.plan/BACKLOG.md`; that is not this
   task's problem.)
6. **Verified in a real browser** at `zentala.internal`: the tile renders at
   the bottom-left, `naturalWidth > 0` on its image, hover reveals the text,
   and the click actually navigates. Screenshot both states.

## Out of scope

- Redesigning the rest of the bento.
- Fixing `/portfolio` itself (its dead `*.zentala.io` links and missing
  images are separate backlog entries).
- Un-commenting `PortfolioItem.astro:30`.
