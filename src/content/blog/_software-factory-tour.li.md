One coding agent on a laptop needs a prompt. Ten agents working at once need ten things the laptop never gave the first one.

I wrote down the ten layers under my agents, bottom to top:

1. A Linux machine that only runs agents. It needs RAM, not a graphics card.
2. Names instead of ports: .lan for machines, .internal for services.
3. One process manager that owns every process, port and log.
4. A secret broker: agents use a token and never read it.
5. Sessions in visible terminals, reachable over VPN from a browser.
6. One writer on main, every other agent in its own worktree.
7. A plan kept as a fixed tree of files in the repository.
8. Separate roles: owner, manager, implementer, and a verifier with a clean context.
9. One source of instructions, generated for every agent client.
10. Shared packages, one check command, deploy by push.

None of them is large. Each is an afternoon to a few days, and each pays for itself without the others.

You do not build them from the bottom. You build the one that hurts: the second agent in a repository means worktrees and a lease; a dev server nobody owns means a process manager; an agent that calls its own work finished means a separate verifier.

The article has a diagram for every layer and the order to build them in. Link in the first comment.
