# `Logo` component notes (tagline auto-scaling)

## Goal (what we want)

When `Logo` is used with a `tagline`, the tagline text should **automatically scale** so that:

- The tagline width is effectively the same as the rendered logo width.
- The tagline remains **single-line** (no wrapping).
- Consumers of `Logo` should not have to implement custom "fit text to width" logic per-section; it should be **built into `Logo`**.

In other words: “wherever someone uses `Logo`, the tagline should scale with it”.

## What we tried (chronological log)

### Attempt A — match tagline *box width* to logo width (failed: text size unchanged)

**Idea**: set `style="width: {props.width}"` on the tagline (or wrapper) so the tagline container is as wide as the logo.

**Result**:

- The tagline **box** got a width, but the **font-size did not change**.
- This is expected: container width ≠ font-size; CSS does not auto-fit text to container width by default.

### Attempt B — make SVG fill wrapper width (partial; still not text-fitting)

**Idea**:

- If `width` is fixed (e.g. `400px`), put that width on the wrapper.
- Make SVG use `width="100%"`.
- Give tagline `display:block; width:100%`.

**Result**:

- SVG and tagline block can share the same width.
- Still **no automatic font scaling** without additional CSS logic.

### Attempt C — use CSS container query units (`cqw`) + `clamp()` for font-size (promising, but currently “not working”)

**Idea**: treat the logo wrapper as a **size container** and compute tagline font-size from container width:

- Add `[container-type:inline-size]` on the wrapper.
- Use `font-size: clamp(min, 3cqw, max)` for the tagline.

**Result**: reported as “not working”.

**Important pitfalls spotted in the current code**:

- The current class uses `text-[clamp(50px,3cqw,12px)]`.
  - `clamp(min, preferred, max)` requires **min ≤ max**.
  - With `50px` as min and `12px` as max, browsers may treat the whole `clamp(...)` value as **invalid**, so `font-size` doesn’t apply at all.
- There is also `font-size-xl` in the class list.
  - Tailwind’s built-in size utilities are typically `text-xl`, not `font-size-xl`.
  - If `font-size-xl` is not defined anywhere, it does nothing; if it *is* defined, it may override what we think is applied.

Because we didn’t verify computed styles in DevTools, this attempt is currently inconclusive (but the invalid `clamp()` is a strong explanation for “no effect”).

## Current state (code-level intent)

In `src/components/Logo.astro` we attempted to:

- Make the wrapper a container: `[container-type:inline-size]`
- Render tagline with:
  - `block w-full whitespace-nowrap text-center`
  - `text-[clamp(..., 3cqw, ...)]` for auto scaling

If done correctly, the tagline font-size should respond to `props.width` when it is a fixed width (e.g. `400px`).

## How to debug this properly (next person can follow)

### 1) Confirm whether container queries are active

In browser DevTools, select the wrapper element (the `<a>` or `<div>` created by `Logo`) and verify:

- **Computed**: `container-type: inline-size` is present.
- If not present, the class `[container-type:inline-size]` is not being emitted/applied.

### 2) Confirm the tagline font-size is not invalid

Select the tagline `<span>` and check **Computed → font-size**:

- If the `font-size` rule is crossed out or missing, check the exact `clamp()` value.
- Ensure `clamp(min, preferred, max)` has sane ordering, e.g.:
  - `clamp(8px, 3cqw, 12px)` (example numbers)

### 3) Check class order / overrides

Because Tailwind resolves conflicts by rule order/specificity:

- If `taglineClass` includes `text-xs` or `text-sm`, it may override the clamp font-size (depending on CSS output order).
- Verify in DevTools which rule “wins”.

### 4) Verify container sizing inputs

If `props.width` is `'auto'` or not set:

- The wrapper might not have a predictable inline-size.
- `cqw` might evaluate unexpectedly (or not at all if container isn’t established).

### 5) Browser support sanity

Container queries + container units (`cqw`) require modern browsers.
If behavior differs across browsers, test at least:

- Chromium (Chrome/Edge)
- Firefox
- Safari (if relevant)

## Alternatives (if `cqw` ends up being flaky here)

If we need the tagline to *exactly* match the logo width visually, consider:

- **Render tagline as SVG text** and scale it with `viewBox` (most deterministic).
- **Transform scale** approach:
  - measure text width, then `scaleX(containerWidth / textWidth)` (requires JS).
- **Text-fit JS** (fitty / bespoke):
  - robust but adds runtime JS and reflow cost.

## Files involved

- `src/components/Logo.astro` — implementation
- `src/sections/home/BentoAboutMe.astro` — a consumer that exposed the issue

