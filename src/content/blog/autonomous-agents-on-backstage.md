---
title: 'Your Internal Developer Portal Is the Missing Link for AI Agents'
date: '2026-05-12'
category: 'DevEx'
imageUrl: 'https://zentala.io/images/developer-portals-ai-bridge.jpg'
excerpt: "Anthropic's Model Context Protocol grew from 1,200 to 9,400+ servers in twelve months. Roadie reports that AI agents now interact with their Backstage platform 100 times more often than humans do. The race isn't about building smarter agents anymore — it's about giving them the structured context to do real work. That context lives in your developer portal."
authorRole: 'DevEx Consultant'
bannerEnd: 'devex'
published: false
---

Anthropic's Model Context Protocol grew from 1,200 to 9,400+ servers in twelve months. Roadie reports that AI agents now interact with their Backstage platform 100 times more often than humans do. The race isn't about building smarter agents anymore — it's about giving them the structured context to do real work. That context lives in your developer portal.

## The wall every coding agent hits

The frontier coding agents are good. Claude's top SWE-bench Verified runs sit in the 80–93% range. GitHub Copilot's autonomous coding agent now contributes roughly 1.2 million pull requests per month. Cursor went from zero to $2B ARR in three years — the fastest B2B SaaS ramp on record. The benchmark trend says capability is no longer the bottleneck.

The bottleneck is context. Gergely Orosz, summarizing what he hears from enterprise engineering leaders, puts it plainly: AI agents work effectively across roughly 0.5 to a few million lines of code — the ceiling of what they can hold in context at once. If your codebase is a monolith too large to fit, agents won't help you. The constraint isn't the model. It's the discipline of how you've structured your software, your docs, and your ownership metadata.

Which is exactly the discipline a good Internal Developer Portal (IDP) imposes.

## What an IDP actually is

An IDP — most famously Backstage from Spotify, but also Port, Cortex, OpsLevel, Roadie's managed Backstage — is the catalog of your engineering reality. Services, libraries, APIs, websites, data pipelines: each one an entity with a known owner, a known lifecycle, a known set of dependencies. Layered on top: TechDocs (Markdown documentation living alongside code), scorecards (production-readiness, security, ownership coverage), software templates (golden paths for scaffolding new services), tech radar, on-call routing.

Read that list back and notice what it is from an agent's perspective. It is a structured, machine-readable description of an organization's software, with relationships, owners, and embedded documentation. It is *exactly* the corpus a context-hungry agent needs.

Until recently, the agent couldn't read it. Now it can.

## MCP turned IDPs into AI infrastructure

The Model Context Protocol, introduced by Anthropic in late 2024, is the standard that lets an AI client — Cursor, Claude Code, VS Code with Copilot, Claude Desktop — discover and invoke external tools and data sources as native tools. By April 2026 the public registry had crossed 9,400 servers; 78% of enterprise AI teams reported at least one MCP-backed agent in production; 67% of surveyed CTOs named MCP their default agent-integration standard within twelve months. OpenAI, Microsoft, Google, and Amazon have all aligned on it.

Roadie, the managed Backstage vendor, shipped six MCP servers exposing the catalog, TechDocs, scorecards, tech radar, software templates, and API docs to any MCP client. At BackstageCon Europe earlier this year, Roadie shared a statistic that landed harder than any market forecast: the ratio of agent interactions to human interactions on their platform has hit 100 to 1. Human usage of the portal has stayed roughly static. Agent traffic has exploded. About 80% of their support requests and on-call alerts are now resolved through agent workflows without an engineer touching them.

That is the punchline. The portal that was built to make life easier for developers turned out to be the perfect substrate for agents. The catalog tells the agent what exists. TechDocs tells it how things work. Scorecards tell it what's healthy. Templates tell it how to make new things correctly. Ownership metadata tells it whom to notify when it makes a mistake.

The Backstage core team is now tracking native MCP support (issue #29349). Within a year this will be a checkbox feature, not a differentiator.

## What this looks like in practice

Three concrete patterns are already in production.

**Pattern one — context for IDE agents.** A developer opens Cursor in an unfamiliar service. They ask the agent: who owns this, what does it talk to, and where do I find the runbook? Without MCP the agent improvises from grep results. With MCP it reads the catalog entity, follows the `dependsOn` edges, fetches the TechDocs, and returns a sourced answer in seconds. Onboarding latency on a new service collapses from days to minutes.

**Pattern two — autonomous PR generation against golden paths.** GitHub Copilot's autonomous coding agent (the source of those 1.2 million monthly PRs) is currently strongest on bounded, well-specified tasks: dependency bumps, security fixes, small feature flags. Pair it with Backstage software templates exposed through MCP and the same agent can scaffold an entirely new service — using the organization's blessed patterns — and open a PR with correct ownership, scorecard wiring, and CI hooks. Cognition's data on Devin makes the case quantitatively: one enterprise saved 5–10% of total developer time using Devin on security work; another reported a 20x speedup on vulnerability remediation (30 minutes per vuln down to 90 seconds). These gains compound when the agent doesn't have to guess organizational conventions.

**Pattern three — multi-agent workflows over a shared truth source.** Google's Agent2Agent (A2A) protocol — now governed by the Linux Foundation's Agentic AI Foundation, with 150+ organizations running it in production, including Microsoft, AWS, Salesforce, SAP, and ServiceNow — handles agent-to-agent communication. Most production multi-agent systems in 2026 use both: MCP for each agent's tool access, A2A for coordination between agents. An incident workflow might involve a triage agent (reads alerts, catalog, recent deploys), a fix agent (writes the patch), and a reviewer agent (validates against scorecards and security policies). All three reach into the same Backstage instance via MCP. None of them improvise.

## The numbers behind the wave

If you are skeptical that any of this is mainstream, look at where the money and the users actually are.

GitHub Copilot reports 4.7 million paid subscribers as of January 2026, up roughly 75% year over year, deployed at approximately 90% of the Fortune 100. Cursor crossed $2B ARR in February 2026 and is forecasting $6B by year-end; daily active users passed one million in late 2025. Devin dropped from $500/month to $20/month with the 2.0 release, putting autonomous agents in reach of individual developers. OpenHands, the open-source SWE agent (formerly OpenDevin), sits at 70k+ GitHub stars, ~500 contributors, and a 72% SWE-Bench score; paired with Claude 4.5 it resolves over half of real-world GitHub issues end to end.

These products are not in pilot. They are eating real engineering work, today. Every one of them is healthier when given organizational context — and every one of them speaks MCP.

## "But what about security?"

This is the right question, and it is the section most articles on agent infrastructure dodge. The threat surface is real.

OWASP launched an MCP Top 10 project in early 2026. Researchers documented a "by-design" remote code execution weakness in Anthropic's official MCP SDK, affecting all supported languages, over 7,000 publicly accessible servers, and 150 million+ downloads. Prompt injection through MCP-attached data sources has been demonstrated against Cursor, VS Code, Windsurf, Claude Code, and Gemini-CLI; Windsurf needed zero user interaction. Three named attack vectors have working proofs of concept: resource theft (draining your compute), conversation hijacking (compromised servers injecting persistent instructions and exfiltrating data), and covert tool invocation (the agent doing things the user didn't see).

The lesson is not "don't deploy MCP." It is "don't deploy unsupervised MCP." This is where an IDP-mediated approach pays off the second time. Roadie's MCP servers inherit the user's Backstage RBAC: an engineer's API token grants exactly the permissions they have in the web UI, nothing more. Every call is auditable. Permissions are centralized. Agents that try to overreach hit the same walls humans do. Compare this to the bare alternative — sixteen ad-hoc community MCP servers wired directly into a developer's IDE, each with its own authentication model.

The enterprise-safe path to agent infrastructure runs through your portal, not around it.

## What to expect by 2027

Two predictions, both with evidence behind them.

First: MCP-on-IDP becomes a checkbox feature, the way Kubernetes-on-IDP became one between 2022 and 2024. The 2026 MCP roadmap from the maintainers focuses explicitly on production concerns — auth, scale, governance — not new capability. Port's recent $100M raise positions the company as "the command-and-control center for AI agents." Cortex markets itself as "the AI-powered IDP." OpsLevel and Roadie are moving the same direction. The market is converging.

Second: regulated industries lead, not lag. A2A adoption among Salesforce, SAP, and ServiceNow customers is the early evidence that enterprises with strict audit requirements *prefer* protocol-mediated agent workflows over ungoverned ones, because the protocol gives them the audit trail and permission model they need to actually approve the deployment. NIST cited A2A as a foundational protocol in its February 2026 AI Agent Standards Initiative. That signal points one direction.

## What to do this quarter

If you run a platform team, the move is not "evaluate AI agents." That conversation is over; the agents are already in your engineers' IDEs. The move is to give those agents the same well-governed access you'd give a new senior hire — not less, not more.

Three concrete steps. Audit your catalog: is ownership coverage above 90%, are lifecycle states honest, do scorecards exist for production-readiness and security? If not, an agent reading your portal will get the same wrong answers a human would. Expose at least one MCP surface against your IDP — TechDocs is the lowest-risk starting point. Pick one bounded agent use case (incident triage, dependency upgrades, scaffolding from templates) and measure outcomes — PR merge rate, time-to-resolution, engineer hours saved.

You're not building agent infrastructure from scratch. You already have it. The work is to expose it correctly.

---

*If you're designing this kind of substrate for your organization — Backstage adoption, MCP exposure, agent governance — this is exactly what I do as a consultant. Reach out.*
