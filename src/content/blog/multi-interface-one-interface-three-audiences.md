---
title: 'One Interface, Three Audiences — Why Your Agent and Your Developer Need the Same Thing'
date: '2026-08-26'
category: 'DevEx'
excerpt: 'A human and an AI agent fail in the same way: give either one a pile of unstructured information and watch the cost explode. That shared weakness is the design brief for everything I build.'
authorRole: 'DevEx Consultant'
published: false
series: 'multi-interface'
part: 1
---

## Part 1 of the multi-interface series

We talk about Developer Experience and Agent Experience as if they were two
disciplines. They are one, and it is the old one: User Experience, applied to a
reader who happens to bill in tokens.

The reason is a coincidence that turns out not to be a coincidence at all. A
person and a model both work against a hard ceiling on how much they can hold
at once. Hand either of them a heap of unstructured, scattered, contradictory
material and the reading is not the expensive part — the stitching is. Working
out what relates to what, what is current, what was already decided. That cost
lands on a tired architect at 6pm and on a context window at 80% capacity in
almost the same shape.

Once you accept that, most of the arguments about "designing for AI" dissolve.
You do not need a separate discipline. You need to apply what interface design
already knows to a second audience that cannot complain.

## What the three audiences actually want

| Audience | Needs | What that is, concretely |
|---|---|---|
| **Human** | to click, see, read | a page, a link, rendered markdown |
| **Agent** | to parse, resolve, address | `Accept: text/markdown`, JSON, a tool call, frontmatter |
| **Third machine** — a script, CI, another box on the network | a stable identifier | a git URL, an ID — never a local disk path |

Write those three rows out for whatever you are building, before the first line
of code. An empty row is a gap, not an exemption.

The governing rule is symmetrical: **if a human can see it, an agent must be
able to read it mechanically — and the other way round.** An interface where
one side has the full picture and the other has to guess or scrape HTML is not
finished.

## Progressive disclosure is a token budget

Progressive disclosure came out of UI design, where the cost of showing
everything at once is a confused user. Move it onto agent communication and the
cost becomes literal: every irrelevant paragraph in a file that loads on every
session is paid for, every session, forever.

The mechanism is the same in both directions. Structure first, detail on
request. A summary that stands on its own, a link to the layer below, and a
guarantee that the reader can stop at any level and still have something true.

## Repeatable is cheaper than clever

The other half is predictability. A process that ran the same way twice should
run from a file the third time, not from a model. Not because the model is bad
at it, but because a deterministic step costs nothing, cannot drift, and frees
attention for the part that genuinely needs judgment.

This is where the automation argument lands. I am building toward an automated
software development lifecycle, but the interesting question was never how much
of it a model can do. It is where the human stays — the architect who has to
understand what the agent did, debug it when it goes wrong, feed it what it
could not know, and learn from what it found. That seat has to be designed in,
not left over.

## What this series covers

The companion series, [Agent-Native Harness](/series/agent-native-harness), is
the **how**: the registry that keeps parallel sessions from colliding, the
zero-token commands, the local deployment layer, the knowledge base that
survives a lost context.

This one is the **why**, and the patterns that generalize beyond my own setup —
content negotiation instead of a second address, machine-readable frontmatter
over human prose, addressing schemes that resolve for all three audiences, and
brokers that give each side exactly as much as it is allowed to have.

*(Full article coming soon.)*
