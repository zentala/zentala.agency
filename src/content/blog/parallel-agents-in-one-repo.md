---
title: 'Parallel Agents in One Repo — How to Stop Them Killing Each Other'
date: '2026-08-08'
category: 'DevEx'
excerpt: "Start a second, third agent session in the same repo, and it begins: one session rebases over 15 uncommitted commits from another, two sessions grab the same ADR number, git add -A sweeps up someone else's file into the wrong commit."
authorRole: 'DevEx Consultant'
published: false
series: 'agent-native-harness'
part: 4
---

## Part 4 of the agent-native harness series

The first instinct is worktrees — each agent in its own directory, isolated by the filesystem. It helps, but isn't enough. A worktree isolates files; it doesn't give agents awareness of each other. That's what a registry adds: presence, collision detection, and cleanup after the dead.

*(Full article coming soon.)*
