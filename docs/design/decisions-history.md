# Design decisions: history

Superseded rows from the Decisions table in [DESIGN.md](../../DESIGN.md) section 10 (moved 2026-11-20). They no longer describe live behaviour; they are kept for the reasoning.

| Date | Decision | Replaces | Why |
| --- | --- | --- | --- |
| 2026-11-19 | Focus ring on cells sits at inset 0 (hover overlay stays -1px) | Focus ring at -1px | Container overflow clip cut the left/right edge of edge-column cells; hover keeps the open edge on purpose Superseded by the 2px ring at `inset: -1px` (2026-11-19, `--focus-ring-width`). |
| 2026-11-19 | Focus ring uses the hover geometry (`inset: -1px`, on the line pixels); at <= 1450px the edge columns pull the ring in by 1px on the viewport-edge side only (`:nth-of-type` + `@container style(--cols)`, full-bleed blocks on both sides) | Ring 1px inside every cell (read as a doubled line) | The ring must coincide with the line; only the clipped, off-screen side needs the exception Superseded by the 2px ring at `inset: -1px` (2026-11-19, `--focus-ring-width`). |
| 2026-11-19 | Tag `label` and `simple` chips fg-muted on tint, fg-subtle on black; `pill` stays rounded-full (C6 open) | Hard-coded greys | Tokens. Superseded 2026-11-20: square chips, theme `pill` renamed `chip` (C6). |
| 2026-11-20 | Button secondary and outline variants use line and surface tokens | `border-gray-700 bg-gray-800` and `border-white/30` | Tokens. Superseded 2026-11-20 by the C7 button system (primary white, secondary outlined, accent blue). |
| 2026-11-19 | Colour table: surface raised `#0a0a0a`, surface hover solid `#111827` | raw grays | Superseded 2026-11-20 by `#0b0f17` and the accent wash (C7). |
