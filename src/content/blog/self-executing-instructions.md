---
title: 'Self-Executing Instructions: When the Filename Is the Whole Prompt'
date: '2026-08-27'
category: 'DevEx'
excerpt: "Programmers know self-documenting code. The agent-native equivalent is a repository whose structure already tells the agent what to do. I write BACKLOG.md and the agent knows the format, the audience, the lifecycle and the routing rule — without me writing any of it down twice."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 9
---

## TLDR

Self-documenting code is a settled idea: name things well and the comment becomes
unnecessary. The agent-native version goes further. A filename, a folder, a two-integer
annotation can carry not just meaning but *behaviour* — the agent reads `BACKLOG.md` and
knows the entry format, who reads it, when it gets triaged and where a finding must go
instead of into a chat message. The instruction is not written next to the artifact. The
artifact **is** the instruction. I have been calling these self-executing instructions,
and they are the cheapest form of context I know.

## The name problem

There is no good term for this yet, so let me put two on the table and pick one.

**Self-describing structure** is the accurate one: the layout of the repository describes
its own semantics, the way a well-named function describes its own contract.

**Self-executing instructions** is the useful one, because it captures the part that
matters — the agent does not merely *understand* the structure, it *acts* on it without
being told. Reading is not the point. Behaviour is.

I use the second. A `.plan/BACKLOG.md` in a repository is not a description of a backlog.
It is a standing order: *findings go here, in this format, and they wait for a human*.

## What a filename can carry

Here is one line from a backlog of mine:

```markdown
- [ ] **Domain shows 502 after restart** — Caddy points at dead port, found in E024 verify (High, 3)
```

Nothing in that line explains itself, and it does not have to. Every element is load-
bearing and every element is conventional:

- **the path** (`.plan/BACKLOG.md`, in the repository that owns the bug) says who is
  accountable — not the repository I happened to be working in;
- **the checkbox** says lifecycle: open, and it is a human who closes it;
- **the bold symptom** says this is written for someone with no context loaded;
- **`(High, 3)`** says importance and Fibonacci story points, and those two numbers route
  the item automatically;
- **`.plan/`** says untracked, private, never shipped in the public repository.

I wrote none of that in the file. It lives once, in a rule the agent already has, and
every future file of that name inherits it. Convention is compression.

## Three properties that make it work

**One name, one meaning, everywhere.** `BACKLOG.md` means the same thing in every one of
my repositories. The moment it means "backlog" in one place and "ideas" in another, the
agent has to ask, and asking is the cost I was trying to avoid.

**The structure is the routing table.** "A discovered bug is written to the
`.plan/BACKLOG.md` of the repository the bug belongs to" is a complete instruction because
the path resolves the ownership question. Compare this to "tell me about bugs you find" —
which resolves nothing, and dies with the session.

**Annotations travel with the item, not with the prose.** Importance and points are on
the line, not in a paragraph three files away. An agent that moves the line moves the
metadata.

## What else deserves to be annotated

Confidence and story points earn their place because they trigger behaviour. Which is
exactly the test any new annotation has to pass: **does something act on it, automatically,
without a human in the loop?** If not, it is decoration, and decoration on every line is
a tax.

Four that pass the test in my system, or are close to passing it:

**Ownership** — which repository, service or agent is accountable. Already implicit in the
path; worth making explicit the moment an item crosses a repository boundary.

**Evidence status** — was this *seen* working, or merely *believed* to work? My hardest
rule is that a passing test is not proof that a user's path works. That distinction
deserves a field, not a tone of voice: `verified: seen | inferred | not-checked`. It makes
"I did not check" a first-class result instead of silence that looks like success.

**Freshness against the tree, not the calendar** — a review is fresh with respect to a
commit and a working tree, never a date. "Reviewed yesterday" means nothing after six
commits. My review log ages by tree hash for exactly this reason, and never prints `0`
where it means `unknown`.

**Cost** — tokens or wall-clock actually spent versus estimated. This is the calibration
signal that makes point estimates converge instead of drifting forever.

And one I am deliberately not adding: priority as a separate field from importance. Two
numbers that mean almost the same thing get filled in inconsistently, and an annotation
nobody trusts is worse than no annotation.

## Why this beats a longer prompt

The alternative to convention is explanation, and explanation is paid for on every single
run. A prompt that re-teaches the format of a backlog entry costs tokens each time, drifts
when I edit one copy of it, and competes for attention with the actual task.

A convention costs once. It is enforced by the filename, which cannot silently disagree
with itself the way two paragraphs in two files can.

There is a real trade-off, and it is worth naming: conventions are invisible to a newcomer,
human or model. A folder called `.plan/` tells you nothing on first contact. That is the
price, and it is paid once per person, per project — against a cost that would otherwise
be paid on every run, forever. Take the trade.

## Steal the shape

Look at your repository and ask, for every recurring artifact: **would an agent know what
to do with this from the name alone?**

If the answer is no, you have a choice. Rename it until the answer is yes, or write the
rule once — where the agent will actually load it — and make every future file inherit
the behaviour.

What you should not do is explain it again in the next prompt. That is the version that
never stops costing.
