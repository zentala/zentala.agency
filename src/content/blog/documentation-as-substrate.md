---
title: 'Documentation Is No Longer for Humans Alone'
date: '2026-05-12'
category: 'DevEx'
imageUrl: 'https://zentala.io/images/documentation-as-substrate.jpg'
excerpt: "For thirty years we wrote documentation for the next developer. Now we write it for the next developer and the next agent. They want the same thing: structured, accurate, machine-readable knowledge with clear ownership. The investment that fixes onboarding is the same investment that makes AI agents productive in your codebase. This is the unifying design principle for the next decade of engineering organizations."
authorRole: 'DevEx Consultant'
bannerEnd: 'devex'
published: false
---

For thirty years we wrote documentation for the next developer. Now we write it for the next developer and the next agent. The good news is that they want the same thing: structured, accurate, machine-readable knowledge with clear ownership. The investment that fixes onboarding is the same investment that makes AI agents productive in your codebase. This is the unifying design principle for the next decade of engineering organizations.

In the first piece of this series I argued that the Internal Developer Portal has become AI infrastructure — that Backstage and its peers, exposed through the Model Context Protocol, are now the substrate over which autonomous agents do real work. In the second piece I argued that onboarding is no longer an event but a continuous, asynchronous condition affecting every engineer in every quarter — and that organizations need to design for that explicitly. These are the same argument viewed from two angles. The unifying concept is what I want to name here: the *knowledge substrate*.

## What the substrate is

A knowledge substrate is the structured, navigable, machine-addressable layer where an organization's engineering reality is described well enough to be useful. It is the catalog of what exists, the documentation of how it works, the ownership metadata that says who is responsible, and the relational fabric that connects those things to each other. Backstage is one implementation. GitLab's handbook is another, in a different shape. Roadie, Port, Cortex, OpsLevel and the in-house portals at Stripe, Spotify, Netflix and Expedia are all building variants of the same thing.

Three properties define a substrate that is actually useful:

**Structured.** Entities have types: service, library, website, data pipeline. Relationships are explicit: this service depends on that one, this team owns that domain. Ownership is not a Slack channel; it is a field in a manifest that resolves to a human or a group. The structure is what makes the substrate addressable — by an engineer, by an agent, by a script.

**Discoverable.** A new engineer or a new agent can navigate from "I have a task" to "I have the right context" in seconds, not days. Search works. Links work. Browse paths work. Documentation is co-located with the entity it describes, not scattered across three SaaS tools.

**Machine-addressable.** APIs exist. Schemas are stable. MCP servers, or equivalents, let an LLM client ask the substrate the same questions a human can ask the portal — and get answers in a form a model can act on. This is the property that turned the IDP into AI infrastructure between 2024 and 2026.

Substrate isn't a buzzword for documentation. It is what documentation, catalog, and ownership become when you stop treating them as separate tools and start treating them as one designed surface.

## Why it compounds twice

The case for investing in a knowledge substrate used to rest entirely on the human audience. That argument is strong on its own. The 2020 McKinsey study found companies with high developer experience grow revenue four to five times faster than competitors. Spotify, after deploying Backstage, cut onboarding time by 55% — measured as time to a new hire's tenth merged PR. The DX Core 4, tested across 300+ organizations, delivers consistent 3–12% efficiency gains and a 14% lift in feature work when DevEx, DORA, and SPACE dimensions are addressed together. These are real numbers, repeatable, defensible.

What changed in 2025 and 2026 is that the same substrate also serves a non-human audience, and the non-human audience is scaling faster than the human one. Roadie's data point — agent interactions running 100x human interactions on their platform, with agents resolving roughly 80% of support requests and on-call alerts without engineer involvement — is not an outlier. GitHub Copilot's coding agent contributes roughly 1.2 million autonomous pull requests per month. Devin, in enterprise deployments, has produced 20x speedups on security work (30 minutes per vulnerability down to 90 seconds). Cursor and Claude Code, when granted MCP access to a developer portal, answer onboarding questions in seconds that previously cost a senior engineer thirty minutes.

These two payoffs come from one investment. The technical writer who rewrites a service's TechDocs along Diátaxis lines makes the docs better for the next human engineer *and* materially improves the agent's success rate on tasks in that service. The platform engineer who tightens `catalog-info.yaml` ownership coverage makes incident routing faster for humans *and* makes A2A workflow handoffs reliable for agents. The auditing work that improves your portal hygiene is the same auditing work that improves your AI ROI. Two compounding curves. One spend.

## Architectural implications

If the substrate is load-bearing, the architecture that surrounds it changes shape.

Monoliths become a problem in a way they weren't before. Gergely Orosz observes that agents have an effective ceiling of half a million to a few million lines of code — the limit of what fits in a useful context window. Organizations whose engineering reality is one enormous repository are now structurally disadvantaged for agentic workflows. The migration toward microservices, contested for years on operational-complexity grounds, gets a new and harder-to-dismiss argument: it makes your code agent-tractable. The portal, with its per-service ownership and TechDocs, becomes the navigational layer that holds the resulting fragmentation together.

Docs-as-code becomes docs-as-RAG-source. The Markdown files in your repository are no longer the artifact; they are the seed corpus for retrieval-augmented generation across the organization. Glean, internal RAG layers built on Backstage TechDocs, vendor-supplied chatbots — all of them index what you have written. The quality of every AI-mediated answer your engineers receive is bounded above by the quality of what you wrote down. Documentation moves from a discretionary investment to a load-bearing one.

Ownership metadata becomes routing. The `owner:` field in `catalog-info.yaml` used to drive a few PagerDuty integrations and a Slack mention. In an agent-mediated future it drives the A2A handoff: agent A finishes its part of a workflow, looks up the next responsible party in the portal, and hands off to the correct downstream agent or human. The metadata that was occasionally consulted is now perpetually queried.

## What this means for roles

The role architecture inside engineering organizations is starting to shift around the substrate.

The technical writer evolves into something closer to a *knowledge substrate engineer*. The output is no longer "a doc page"; it is "a node in the substrate that humans and agents read from." The skill stack expands: Diátaxis as the structural discipline, instructional design as the writing craft, basic familiarity with how RAG pipelines and MCP servers consume the artifact, and a working understanding of catalog metadata. The role is now a peer to platform engineering, not adjacent to it.

The platform engineer's mandate expands to include MCP exposure and agent governance. It is no longer enough to run a healthy Kubernetes cluster and a Backstage instance. The platform team is now also responsible for which agent capabilities are wired to which catalog surfaces, what permissions agents inherit, and how agent actions are audited and rolled back when they go wrong. This is the layer where MCP's well-documented security risks — OWASP MCP Top 10 attack vectors, the design-level RCE in Anthropic's SDK, prompt injection chains — are actually defended against.

The engineering manager measures both sides. The DX Core 4 metrics that track human productivity sit alongside a new family of agent-task metrics: merge rate of autonomous PRs, time-to-resolution for agent-handled incidents, rollback rate of agent-initiated changes, percentage of routine work delegated. The manager's job is to balance the two — to ensure that agent throughput doesn't degrade human flow state and that human review capacity doesn't become the new bottleneck.

## A 2026–2028 roadmap

Three predictions, each with evidence behind it rather than vibe.

**2026: MCP-on-IDP becomes table stakes.** The 2026 MCP roadmap from the protocol maintainers explicitly prioritizes production concerns — authentication, scale, governance — over new capability. Port's $100M raise targets exactly this convergence. Cortex markets itself as "the AI-powered IDP." Roadie ships six production MCP servers. Backstage core is tracking native support. By the end of this year exposing your portal to MCP-aware clients will be expected, not innovative.

**2027: A2A workflows reach regulated industries.** Microsoft, AWS, Salesforce, SAP and ServiceNow are already running A2A in production. NIST's February 2026 AI Agent Standards Initiative cited A2A as a foundational protocol. Regulated industries — finance, healthcare, government — will prefer protocol-mediated agent workflows precisely because the protocol provides the audit trail and permission model their compliance teams require. The conservative sectors lead, not lag.

**2028: routine engineering is mostly agent-driven.** This is the prediction that sounds the most aggressive and is in fact the most evidence-backed. The trajectory from 1% of pull requests being agent-authored in early 2025 to a meaningful percentage today, combined with current model capability curves and the substrate-readiness of an increasing share of large engineering orgs, points clearly. Humans set direction, review outputs, intervene on novel problems, and own the cases that require taste and judgment. Routine work — dependency upgrades, security patches, scaffolding, well-specified bug fixes — moves under the line.

The substrate is what makes any of this safe and any of this work.

## What to do on Monday

Four steps. They are the same regardless of the size of your organization.

Audit your portal honestly. Ownership coverage above 90%? Lifecycle states truthful (not all "production" because that was the default)? Scorecards measuring at least production-readiness, security, and ownership completeness? TechDocs current on the entities that matter? Most organizations score badly on this and don't realize it because nobody runs the audit.

Pick one agent use case with a measurable outcome. Incident triage, dependency upgrade automation, scaffolding from templates, security-patch generation, on-call summarization. Wire it through your portal with the MCP exposure your IDP vendor or your platform team can ship in a sprint. Measure: PR merge rate, time-to-resolution, engineer hours saved. Publish the numbers internally. This is your case for further investment.

Restructure your top-priority docs along Diátaxis lines. Tutorials, how-to guides, reference, explanation — four kinds of writing, four locations, predictable. Start with the service or domain where the cost of onboarding is highest. Expect to feel slow for a quarter and notice the compounding by the second.

Track both halves of the picture. DX Core 4 metrics for the humans. A new shortlist of agent-task metrics for the machines. The manager who treats these as one dashboard, not two, is the manager who will run an organization that handles the next three years gracefully.

## Closing

This series began with a market observation: developer portals are becoming AI infrastructure. It continued with a cultural observation: onboarding is no longer an event. The unifying point is structural. We are in the middle of a quiet shift in what documentation is *for*. The artifact looks the same. The audience has doubled. The investment now pays in two currencies — human productivity and agent productivity — from the same balance sheet entry.

Organizations that recognize this and design accordingly will look very different from organizations that don't, by the end of this decade. The substrate is the differentiator. The discipline is the work.

---

*This is the third and final piece in a series. The first looked at how Internal Developer Portals are becoming AI infrastructure via MCP. The second examined continuous asynchronous onboarding as the DevEx pattern AI forces on every engineering org. If you're designing any of this for your organization, [reach out](/contact).*
