---
title: 'Bang Commands: A Zero-Token CLI for Your Agent (and for You)'
date: '2026-08-08'
category: 'DevEx'
excerpt: "Some of what an AI agent does needs no judgment at all — open a file, check a secret, tear down a worktree. We stopped paying a skill load and a model turn for that work. It runs as a plain script now: the agent calls it once, cheap; you call the same script yourself with a `!` prefix, for free."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 5
linkedinPost: "Not every 'skill' an AI agent has needs to burn tokens.\n\nThe rule we landed on: if a task's whole body can be written as pseudocode with no \"decide whether…\" step inside it, it does not belong in a skill — it belongs in a plain script.\n\nTen scripts I run daily, one PATH folder, one prefix (!name = zero tokens for me, Bash: name = one cheap call for the agent):\n\n1. open-md — render + open a markdown file\n2. open-diff — side-by-side diff as a local page\n3. resolve — any address → every other form\n4. secret-has — is a secret SET, never its value\n5. wt-add — create a git worktree, apply setup\n6. wt-remove — tear one down, junction-safe\n7. wt-list — inventory of live worktrees\n8. agents-say — tell other agents what I'm doing\n9. review-log — review freshness by tree hash\n10. feedback — append to the feedback log, no server needed\n\nFull article on the blog, link in the first comment."
---

## The file that cost more than it should

I had a "skill" whose whole job was to open a markdown file in a browser tab. Nice
formatting, a note on why the file matters, done. Every time I asked for it, the agent
loaded the skill's instructions into context, then spent a full model turn deciding to
run a script that had no decisions in it. The script itself took milliseconds. The
overhead around it did not.

The same waste showed up everywhere: checking whether a secret was set, listing open
git worktrees, tearing one down, telling other agents in the family what I was working
on. None of these need a model. They need a script and an exit code.

## The rule: no judgment call, no model

If a task's whole body can be written as pseudocode with no "decide whether…" step
inside it, it does not belong in a skill. It belongs in a plain executable.

The test comes straight from the pattern we settled on for the harness:

> If you can write the skill's body as pseudocode with no "decide whether…" step, it
> is a bang-command wearing a skill's clothes.

A skill still earns its place when the work involves judgment — reading code and
proposing a fix, weighing two designs, writing prose. A bang-command earns its place
when the work is the same few steps every time. The AI's only job left is deciding
*whether* to run it, never re-deriving *what it does*.

## Two callers, one script

Every bang-command lives once, as a script, and answers to two different callers:

- **You** run `!name`, and it costs zero model tokens — Claude Code passes it straight
  to the shell without asking the model to react to the output. This only works with
  `respondToBashCommands: false` set in `settings.json`; without it, the model still
  reads and comments on every bang output, which defeats the point.
- **The agent** runs `Bash: name` — one cheap tool call, no skill file loaded into
  context, no MCP schema to carry around. The command already knows how to fail loudly
  and print help, so the agent does not need to remember its syntax between sessions.

```sh
#!/usr/bin/env sh
exec node "$HOME/.claude/open-md/render-md.mjs" "$@"
```

That is the entire shim for `open-md`. The real logic sits in its own folder
(`open-md/render-md.mjs`); the shim on `PATH` is a one-liner, because `PATH` does not
recurse into subfolders and keeping it flat keeps it stable as commands are added.

## The 10 I use most

All ten live in `~/.claude/bin/`, one `PATH` entry, each with a POSIX shim and a
`.cmd` twin so the same name works from Git Bash, PowerShell, and cmd alike.

| Command | What it does | A real call | Why it exists |
|---|---|---|---|
| `open-md` | Renders one markdown file to HTML and opens it in the browser | `open-md .plan/epics/E017/PLAN.md --why "approve scope" --expects decision` | Replaced a skill that did nothing but this |
| `open-diff` | Renders a side-by-side diff of two files as a local page | `open-diff old.ts new.ts --context 3` | You should never approve a change by reading a raw `git diff` in chat |
| `resolve` | Turns any address — local path, git URL, `int://`, `*.internal` URL, inbox id — into every other form | `resolve C:/code/internal-domains --only int` | One address, many shapes; stop guessing the URL by hand |
| `secret-has` | Reports whether a named secret is configured — SET or MISSING, never the value | `secret-has gitea-token` | The agent must answer "is X configured" without ever reading X |
| `wt-add` | The only sanctioned way to create a git worktree, applying a repo's setup manifest | `wt-add ../E033-W2 -Branch feat/w2` | Three bare `git worktree` commands, done consistently, every time |
| `wt-remove` | The only sanctioned way to tear one down, unlinking junctions before deleting | `wt-remove ../E033-W2` | A junction inside a worktree once let `git worktree remove` delete a shared `node_modules` — twice |
| `wt-list` | Inventory of every worktree in the repo family: live, orphaned, parked | `wt-list` | Tells you whose uncommitted work is sitting where |
| `agents-say` | Tells every other live agent in the repo family what you're doing | `agents-say "E033 round 4: rewriting flapBin.ts"` | Cheap coordination between parallel sessions, no daemon required |
| `review-log` | Tracks review readiness, aged by tree hash — not by date | `review-log record review --status clean --findings 0` | "Reviewed yesterday" means nothing after six new commits |
| `feedback` | Appends one entry to the plain-file feedback store | `feedback correction "Assumed X, should have checked Y first"` | Works even when the MCP server backing the same data is down |

## What makes a good bang-command

Four traits, all learned the hard way:

- **No arguments prints help.** The agent should not have to carry a command's syntax
  in memory across sessions; it looks the syntax up only when it needs it, at the cost
  of one call.
- **Deterministic.** Same input, same output, every time. No model call inside the
  script itself.
- **Report a count, not just an exit code.** A script that processed zero files and
  exited 0 looks identical to one that processed everything — unless it also prints
  how many things it touched. Silence is never proof of success; a good bang-command
  says "3 files updated" or "0 matches, nothing done", never just a green exit code.
- **Never fail silently.** Every failure path writes to stderr and exits non-zero.
  `feedback`, for instance, was built around exactly this: the MCP server behind the
  same data goes down often enough that a rule depending only on it silently stops
  being enforceable. The plain-file writer cannot have that failure mode — it has no
  server to lose.

## What stays a skill

Anything with a decision inside it. Writing a review of a diff, choosing between two
architectures, drafting a plan, deciding what a vague brain-dump should turn into —
none of that reduces to a fixed sequence of steps. The line is not "how often you use
it" or "how simple it looks" — a one-line skill that still has to *decide* something
stays a skill. A ten-step script that never has to decide anything becomes a
bang-command.

## How to start

Pick the three things you do most often that involve zero judgment, in this order:

1. **The thing you open constantly** — a file, a dashboard, a status page. That is
   your `open-md` equivalent.
2. **The thing you check before doing something risky** — is a secret set, is a
   worktree clean, does a service respond. That is your `secret-has` equivalent.
3. **The thing you tear down or clean up, where getting it wrong once cost you real
   work** — a worktree, a branch, a temp directory. That is your `wt-remove`
   equivalent; write the guard rail into the script, not into a rule you hope
   everyone remembers.

Write each as a plain script with a shim on `PATH`, make it print help with no
arguments, make it fail loud. That's the whole pattern.

If you run an agent setup and want to compare notes, write to me.
