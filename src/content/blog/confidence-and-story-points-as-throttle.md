---
title: 'Confidence and Story Points Are the Throttle on an Autonomous Agent'
date: '2026-08-27'
category: 'DevEx'
excerpt: "Every finding my agents produce carries two numbers: a confidence and a Fibonacci story point. Those two numbers decide what gets fixed without asking me, what lands in the backlog for my judgement, how big a task an implementer may take, and how much of an epic an orchestrator may swallow. Two integers, four control surfaces."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 8
---

## TLDR

My agents grade their own output. Every finding, every task, every epic carries a
**confidence** and a **story point estimate** on the same Fibonacci scale I would use in
a sprint planning meeting. Those two numbers are not documentation. They are a throttle:
high confidence under five points gets implemented without asking me, everything else
lands in the backlog with a recommendation. The same two numbers cap how large a task an
implementer agent may accept and how much work an orchestrator may pull into one run.
The result is a self-improvement loop I can tune with two integers instead of rewriting
prompts.

## The problem nobody names

An agent that reviews its own work produces a list. The list is usually right. And then
it dies, because the list arrives at the end of a session as fourteen bullet points and a
question: *which of these should I implement?*

That question is the failure. It moves the work back to me at the exact moment the agent
had all the context and I had none. I have to reload a codebase I stopped thinking about
twenty minutes ago, to adjudicate fourteen items, most of which are obvious.

The naive fixes are both bad. Let the agent implement everything it finds, and you get
scope creep, an unreviewable diff, and taste decisions made by a model that has no taste.
Let it implement nothing, and you get a backlog that grows faster than you read it.

## The fix: grade the finding, not the code

Each finding my review agents emit carries five fields. Two matter here:

```
confidence:    high | medium | low
points:        1 | 2 | 3 | 5 | 8 | 13 | 21
tasteDecision: true | false
```

`confidence: high` means one thing and it is written into the prompt in those words:
*I saw this in the code and I know it is a bug.* Not "this looks suspicious". Not "this
pattern is often wrong". Seen, in the diff, with a line number.

`points` is the standard Fibonacci scale — 1 is a typo, 5 is several files and a real
design choice, 21 must be split before anyone touches it. The agent estimates its own fix
on the same scale I estimate my own work.

`tasteDecision` is the escape hatch: scope, architecture, UX copy, anything where being
right is not a technical property. It forces `false` on the auto-apply path regardless of
the other two numbers.

The routing rule is then arithmetic, not judgement:

| Confidence | Points | What happens |
|---|---|---|
| high | ≤ 5 | implemented immediately, committed, reported in one line |
| medium | ≤ 2 | implemented immediately |
| anything | above threshold | backlog entry with a recommendation |
| any | `tasteDecision: true` | backlog, always — I decide |

And one hard rule above all of it: **a finding is either fixed or filed. There is no third
option.** A finding that lives only in a chat response is a finding that never happened.
Chat scrollback is not storage.

## Why this is a throttle and not a policy

Here is the part I did not expect when I built it.

Once every unit of work carries a point estimate, the same number that routes findings
also sizes everything else in the system:

**It caps the implementer.** A task over 21 points must be split at planning time. That
is not a bureaucratic rule — it is a context-window rule wearing a project-management
costume. A 21-point task does not fit in one agent's working memory well enough for the
agent to stay coherent to the end. Sizing tasks in points is sizing them to the model.

**It caps the wave.** A wave over 40 points gets split across parallel agents. Points are
how I decide fan-out width without eyeballing a diff that does not exist yet.

**It caps the orchestrator.** An epic carries a total. The orchestrator can refuse, or
split, or hand back — before spending anything — on a number the planner already wrote
down.

**It tunes autonomy itself.** Want more autonomy this week? Raise the auto-apply ceiling
from 5 points to 8. Want less, because you are shipping to production on Friday? Drop it
to 2. One integer, changed in one rule file, moves the boundary between "the agent handled
it" and "you decide". No prompt archaeology.

I did not design four control surfaces. I designed one estimate, and it turned out to be
load-bearing in four places.

## The loop this makes possible

With routing settled by arithmetic, the improvement cycle closes without me:

1. An agent implements a task.
2. A **different** agent verifies it against the acceptance criteria — the author is the
   weakest possible reviewer of their own diff.
3. A third agent reviews for quality, grades every finding, applies what clears the
   threshold, and files the rest with a one-line recommendation.
4. Whatever the run learned about the *process* — a plan that described a file that did
   not exist, a tool that wasted ten minutes — goes to a feedback store that another agent
   mines later.

Nothing waits for me. When I come back, I read a table: what shipped, what was fixed
along the way, and a short list of genuine decisions, each with a recommendation and the
cost of saying no.

That last part is the point. I am not reviewing fourteen bullets. I am making three
decisions that actually needed a human.

## What it costs

Two things, honestly.

The estimates are guesses, and early on they are bad guesses. A model that has never
shipped in your codebase calls a 5-pointer a 2. The correction is boring and it works:
log the estimate, log what it actually took, and feed the drift back as calibration.
Systematic drift is a fixable bug; the scale still routes correctly while it is being
fixed, because relative ordering survives absolute error.

And `confidence: high` is a claim a model will make too readily unless you define it in
the prompt as a *sighting*, not a *belief*. That single sentence — "high means I saw it
in the code and I know it is a bug" — did more for precision than any threshold I tuned.

## Steal the shape

You do not need my stack. You need three things:

- every finding carries a confidence and a size, on scales you already use for humans;
- a written threshold that turns those two numbers into an action, so the routing is
  arithmetic and not vibes;
- a rule that no finding may end anywhere except a commit or a backlog file.

The estimates are the interface between what your agents produce and how much of it you
are willing to let through. Most people are trying to build that interface out of prose.
Two integers are better.
