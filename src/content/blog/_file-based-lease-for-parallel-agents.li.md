Three coding agents, one repo, one main checkout: the second write wins and nobody gets an error.

The fix is not a framework. It is three things:

1. A holder file inside .git — who holds main, since when, TTL.
2. A PreToolUse hook — reads the file before every Edit, Write and Bash; exit 2 refuses and the agent sees why.
3. One settings.json entry that wires the hook to those tools.

Rules the hook enforces:
- main checkout is merge-only; worktrees are exempt
- no lease, no write; someone else's lease, no write
- cannot read the file → refuse, with a logged, 15-minute bypass as the only way through

Measured cost per call: p99 under 0.45 ms. That number is what earned it the right to refuse instead of warn.

Three traps that made ours honest are in the article — a detector that counted => as a write, a resolver that never saw ~ paths, one log word for two failures.

Full wiring, holder-file schema and the messages the agent gets: on the blog, link in the first comment.
