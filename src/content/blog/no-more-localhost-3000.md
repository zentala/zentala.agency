---
title: 'No More localhost:3000 — One Address a Person and an Agent Can Both Use'
date: '2026-08-08'
category: 'DevEx'
excerpt: "Local development is usually a zoo of ports: localhost:3000, :5173, :8055, :9229. Nobody remembers what runs where, two projects fight over the same port, and a dev server silently jumps 5199 to 5200 while you test someone else's app. A name fixes that for the person — and the same name, answering a different Accept header, fixes it for the agent."
authorRole: 'DevEx Consultant'
published: false
series: 'multi-interface'
part: 6
---

## Part 6 of the multi-interface series

A port number is an address only a machine could love. It carries no meaning,
it changes without telling you, and it cannot be said out loud. Every time I
paste `localhost:5173` into a chat I am asking the reader — human or agent —
to hold one more arbitrary fact in a head that has better uses for the space.

So every app on this machine gets a name instead: `pm3.internal`,
`kb.internal`, `inbox.internal`, `zentala.internal`. A process manager keeps
those services alive across sessions, a local proxy maps names to whatever
port the thing happened to grab, and a registry knows which repo is behind
each name. A 502 on `.internal` is almost always a dead upstream, not an
application bug — which is itself a diagnosis you can make from the address
alone.

That is the human half. The multi-interface half is what the same address
does for an agent.

The name is stable, so it can be written into a rule, a task file or a
handoff and still resolve six weeks later. The agent never guesses a port and
never verifies the wrong app. And because one address now serves one thing,
it can serve it twice: the page answers HTML to a browser and Markdown to a
client that asks for it — `Accept: text/markdown` — from the same source.
The agent reads the page the reader reads, minus the chrome, without a second
API and without a second copy to keep in sync.

Naming, process supervision and content negotiation look like three unrelated
pieces of plumbing. They are one move: give the thing an address, and both
audiences can stop spending attention on where it lives.

*(Full article coming soon.)*
