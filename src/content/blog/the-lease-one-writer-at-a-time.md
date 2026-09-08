---
title: 'The Lease: One Writer at a Time for Your Shared Checkout'
date: '2026-09-08'
category: 'DevEx'
excerpt: "Run more than one coding agent against the same repo and something quietly breaks: a stray file rides along in someone else's commit, a checkout throws away fourteen live lines. Here is the lease that stops it — the numbers that make it safe, and the three traps that make it honest."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 14
linkedinPost: "Run two coding agents against one checkout and you don't get a crash. You get something worse: a quiet, plausible-looking commit that is wrong.\n\nWe've had all of these actually happen:\n- an agent staged two files, committed, and a third file from a concurrent session rode along\n- git checkout -- <file> discarded fourteen uncommitted lines of someone else's work\n- our own gate once counted a JavaScript => arrow and a shell >/dev/null as \"writes\" — which taught people to reword commands instead of taking the lease\n\nThe fix isn't a bigger warning. It's a lease: one writer per repo, a heartbeat, a timeout ladder, and a hook that asks before every write and fails closed when it can't get an answer.\n\nFull mechanism, the three traps that made ours honest, and how to measure whether yours actually works — on the blog, link in the first comment."
---

## Do you have this problem?

You run more than one coding agent — two sessions on the same feature, say, or a
background agent cleaning up while you work in the foreground. They share one
checkout: one working directory, one `.git`, one index. Something creeps in. None
of what follows is hypothetical; each happened, on a real repo, to real work:

- An agent staged two files it meant to commit. The commit went through — and a third
  file, belonging to a different session working at the same time, rode along with it.
  Nobody told it to add that file. The index is shared mutable state, and nothing in
  git says so out loud.
- A cleanup step ran `git checkout -- <file>` to discard a bad edit. It discarded
  fourteen uncommitted lines that belonged to a different, live session. The command
  did exactly what it was told; what it was told was wrong for a shared checkout.
- Twice, an agent overwrote lines a parallel session had just written, and the only
  reason the result still worked was that the two edits happened to land on different
  lines. Luck, not design, is not a plan.
- One agent's own cleanup tooling deleted a live service's dependency folder — through
  a filesystem junction it did not know was there, into a directory it thought was
  disposable.

Every one is the same failure in a different coat: two writers, one piece of shared
state, and nothing between them that says "not now." A linter will not catch it. A
code review will not catch it — the commit looks clean. You find out when the build
breaks somewhere unrelated, hours later, and spend the afternoon reconstructing what
happened.

## Rule zero: stop sharing the thing

Before any locking mechanism, there is a cheaper move: don't let agents write to the
same directory at all. Keep one checkout as **merge-only** — nothing writes there
directly, work lands in it only through a merge — and give every agent its own
**worktree**: a separate working directory that shares the same repository history but
has its own files, its own index, its own `HEAD`. Most git tooling supports this
natively (git's own `worktree` command, for instance).

This alone removes most of the problem. An agent editing files in its own worktree
cannot stomp on another agent's uncommitted lines — there are no shared lines to
stomp on. Stop here and you have already fixed the majority of collisions. Everything
below is for what is left: the merge-only checkout itself, and any place two agents
still end up pointed at the same directory.

## The lease: one writer at a time

For the checkout that *is* shared — the merge-only main tree, or any resource two
agents might legitimately need to touch — the answer is a lease: a short-lived,
renewable claim that says "I am the one writing here right now."

A small daemon, or even a single lock file used with discipline, hands out one lease
per protected resource. Three numbers govern it, and they form a ladder:

```
heartbeat interval  <  time-to-live (TTL)  <  takeover threshold
```

- **Heartbeat interval** — how often the holder renews. Set this well inside the TTL,
  so an ordinary scheduling delay never costs the lease.
- **TTL** — how long a lease survives with no renewal. Short enough that a crashed
  holder does not block everyone else for long; long enough that normal renewal jitter
  never trips it.
- **Takeover threshold** — a longer silence, past the TTL, after which another agent
  is allowed to seize the lease outright, not just wait for it to expire.

The ordering is not a preference, it is a correctness property. If the TTL were
shorter than the heartbeat interval, a healthy holder would lose its own lease between
renewals — a false eviction. If takeover were not strictly the longest of the three, a
transient hiccup could look identical to a dead holder, and two agents could both
believe they own the resource at once, which is the exact failure the lease exists to
prevent.

One more decision, easy to get wrong: what renews the lease? The tempting answer is
"a background timer." The better answer is to make the holder's own liveness — the
fact that it is still doing work — *be* the heartbeat. Tie renewal to something the
agent already does constantly, and a working agent never has to remember to renew,
because forgetting is not a step it can skip. Only a stuck or dead agent goes quiet,
which is exactly the case the TTL should catch.

## The gate: asking before every write

A lease that nothing checks is a suggestion. The enforcement point is a pre-write
hook: something that intercepts a write attempt — a file write, a shell command that
would write — before it happens, and answers one question: does the caller hold the
lease for this target?

```
write attempt
     │
     ▼
is the target a protected (merge-only) checkout? ──no──▶ allow, no lease needed
     │ yes
     ▼
ask the daemon: who holds the lease?
     │
     ├── I do, and it's valid ─────────────────────────▶ allow
     ├── someone else holds it ────────────────────────▶ refuse
     └── daemon didn't answer (timeout, unreachable) ──▶ refuse (fail closed)
```

Three properties decided whether ours was honest or decorative.

**Fail closed, with a named escape hatch.** When the daemon cannot be reached, the
answer is *unknown* — and unknown must never be read as *allowed*. An unreachable
lock server is not evidence that nobody is writing; it is evidence you cannot tell.
Refuse by default. But say the other half of this out loud too: a guard whose only
failure mode is "now nobody can work" gets switched off within a week, and then it
protects nothing. So the fail-closed path needs a rescue: a way to proceed anyway that
is explicit, time-boxed, logged with who invoked it and why, and loud about the fact
that it happened. A silent override is worse than no guard.

**A write detector that does not teach evasion.** Deciding whether a shell command
"writes" is a heuristic, not a fact, and a sloppy one gets learned around. Ours once
flagged an `=>` inside a piece of JavaScript being echoed to a file, and a
`> /dev/null` redirect, as write signals — false positives on commands that changed
nothing. People did not report the false positive; they reworded the command until
the pattern-match missed it. A gate wrong in the paranoid direction teaches the exact
behavior it was meant to prevent, just more quietly. Treat every false positive as a
bug in the gate, never a nuisance to route around.

**Every spelling of a path.** A gate that never sees the write it should have
blocked gives false confidence, which is worse than no gate. Ours missed every path
written with a home-directory shorthand instead of the full absolute form, silently
allowing exactly the writes it existed to catch. Enumerate every way your platform
lets a path be spelled — relative, absolute, shorthand, symlinked, junctioned — and
test the gate against each one, not only the one you wrote first.

## Identity: who is "the one" writing

The lease is only as good as its notion of "who." The wrong answer is a process ID: an
agent that spawns a fresh process for every command has a new PID every time, so a
PID-keyed lease looks like a different holder on every renewal — indistinguishable
from someone else grabbing it. The right granularity is the **session**: one
long-lived identifier for one continuous unit of work, however many processes it
spawns underneath.

Get this deliberately, not by discovery: decide up front whether a sub-task spawned
by an agent inherits its parent's session identity or gets its own. Neither answer is
wrong, but picking it by accident — letting the runtime's default become the policy —
is how you end up with a lease a legitimate sub-task cannot renew, or one a genuinely
separate agent can silently piggyback on.

## Making neighbors visible

The lease answers "may I write." A cheaper, second layer answers "is anyone else
here, and what are they touching." Three checks, cheapest first, each catching what
the one before it missed:

| Layer | Question it answers | What it refuses |
|---|---|---|
| Presence registry | Who else is active in this repo right now, and what did they claim they're working on? | Starting a second agent in a checkout that already has a live one |
| Claim overlap | Does my write land inside a file another live agent has declared as its own? | Two agents editing the same file without either knowing |
| Sweep detector | Does this command touch *everything* rather than the files I actually own? | `add -A`, `commit -a`, bare `checkout --`, `stash` with no pathspec — named by whose files they would silently take |

None of these three needs the daemon or the lease's own machinery — they are cheap
lookups against a small shared record of who is doing what. Catch the sweeping,
unscoped command before it needs a lock at all: a command that touches everything is
a mistake regardless of who currently holds the lease.

## Knowing it actually works

Building the mechanism is the easy half. Most of what these lessons cost us was
learning it can look like it's working and not be.

**Assert the number of things checked, not the exit code.** A verification step that
examined zero files and one that checked every file both return success. Only the
count tells them apart — log how many paths, commands, or claims the gate actually
evaluated, every time.

**Three states, not two.** *Passed*, *failed*, and — the one people skip — **not
checked**. A dashboard, a CI step, a report that only has room for green and red will
render "we never ran this check" as green, because green is the default when nothing
else is written. Not-checked has to block exactly as hard as failed, or it quietly
becomes an escape hatch.

**Name distinct failures distinctly.** We once logged "you wrote a file outside the
set you declared" and "the merge target had uncommitted changes before you started"
under the same word. Collapsing two problems with different fixes cost a supervisor
forty minutes chasing the wrong one. If two failures need different responses, give
them different names in the log.

**Measure the gate's own cost before making it strict.** A pre-write hook that runs on
every single write has to be cheap enough that nobody has a reason to disable it.
Measure the check's own latency — ours sits well under a millisecond at the 99th
percentile over a local connection — before deciding it may refuse rather than merely
warn. A slow gate gets bypassed; a fast one gets trusted.

**Instrument from day one.** Log every lease acquired, renewed, refused, and taken
over, with who and when. You will not know the right TTL, takeover threshold, or
write-detector patterns from first principles — you will know them from watching real
contention happen. Guess once to ship it, then let the numbers already logged tell
you what to change.

## What this buys you

None of this stops an agent from writing bad code. It stops two agents from writing
*over* each other, silently, in the one place with no version history of its own: the
moment between "I read this file" and "I wrote it back." Rule zero — don't share the
checkout — removes most of that moment. The lease, the gate, and the neighbor checks
handle what is left, cheaply enough that nobody has a reason to turn them off.
