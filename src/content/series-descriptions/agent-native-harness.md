---
title: 'Agent-Native Harness'
tagline: 'How to build a repo an AI agent can actually work in'
ctaVariant: 'harness'
---

Most teams give an AI agent a repo and a prompt, then wonder why it keeps
making the same mistakes across sessions. This series documents a different
approach: building the harness around the agent first — the registry that
keeps parallel sessions from colliding, the feedback loop that lets tooling
fix itself, the zero-token commands that skip the model entirely, and the
knowledge base that survives context loss.

Nine parts, one running system. Each part is a piece of the harness I
actually run, not a proposal — the wins and the failures are both in here.
