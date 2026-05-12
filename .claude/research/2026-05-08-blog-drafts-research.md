# Research Report — Drafts Reinforcement

**Date:** 2026-05-08
**Author:** research pass for content writer
**Scope:** two draft blog posts in `src/content/blog/` flagged `published: false`

- `async-continous-onboarding-on-demand.md` — "Continuous Async Onboarding"
- `autonomous-agents-on-backstage.md` — "Developer Portals as the Missing Link for AI Agents"

Each finding below includes: **Claim** (1–10 sentences), **Source link**, **Use** (which thesis it supports / counters / extends).

---

## ARTICLE #2 — Developer Portals as the Missing Link for AI Agents

This is the more market-timed of the two articles — MCP, agent IDE adoption and IDP convergence are all peaking simultaneously. Lead with this.

---

### A. MCP adoption — the headline hook

#### A1. MCP server registry exploded 8x in one year

The public MCP server registry expanded from ~1,200 servers in Q1 2025 to **9,400+ in April 2026**, with month-over-month growth still tracking at +18% across Q1 2026. **7,800 GitHub repositories** carry the `mcp-server` topic tag. Python and TypeScript SDKs alone see roughly **97 million monthly downloads**. **78% of enterprise AI teams report at least one MCP-backed agent in production** (April 2026); **67% of CTOs surveyed name MCP their default agent-integration standard within 12 months**. Competing protocols A2A, ACP, UCP trail at 23%, 8%, 4% respectively.

- **Source:** [MCP Adoption Statistics 2026](https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol)
- **Use:** **Headline opening statistic.** Replaces the speculative "MCP zdobywa popularność" line with hard data. Use the 1,200 → 9,400 growth as the article's lede.

#### A2. OpenAI, Microsoft, Google, Amazon all back MCP

All four hyperscalers have publicly embraced MCP as a standard. The maintainers' 2026 roadmap focuses explicitly on production-readiness (auth, scale, governance) rather than feature expansion — a sign of maturity.

- **Source:** [The 2026 MCP Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/) · [The New Stack](https://thenewstack.io/model-context-protocol-roadmap-2026/)
- **Use:** Supports the thesis that MCP is no longer a bet — it's the default. Cite when arguing IDPs must expose MCP.

---

### B. Backstage as MCP infrastructure (this is the strongest evidence for the article's central thesis)

#### B1. Roadie's "agentic Backstage" — agent:human ratio of 100:1

At BackstageCon Europe (2026), Sam Nixon (Roadie) shared that Roadie's **agent-to-human interaction ratio has hit 100:1**. Human usage of the portal is static; agent activity is exploding. **Roadie can resolve ~80% of support requests and on-call alerts via this system without engineer intervention.**

- **Source:** [BackstageCon Europe — Agentic Backstage](https://tldrecap.tech/posts/2026/backstagecon-europe/backstage-agentic-future/) · [Roadie blog: AI Cometh](https://roadie.io/blog/ai-cometh/)
- **Use:** **This is the single best statistic in the entire research file.** The thesis "agents need IDP" stops being prediction and becomes empirical fact. Use as the central pillar of the article.

#### B2. Roadie ships 6 production MCP servers for Backstage

Roadie offers six MCP servers (API Docs Query, Catalog Query, TechDocs, Tech Radar, Scorecards, Software Templates) that any MCP client (Cursor, VS Code Copilot, Claude Code) can authenticate against. Permissions inherit from the user's Backstage RBAC — solving the security objection upfront.

- **Source:** [Roadie MCP Servers (Beta)](https://roadie.io/docs/api/roadie-mcp/) · [Announcing the Roadie MCP Server(s)](https://roadie.io/blog/announcing-the-roadie-mcp/)
- **Use:** Concrete example for "imagine onboarding a new developer who joined yesterday" thesis. The agent reads catalog-info, TechDocs, scorecards via MCP — that *is* async onboarding for agents.

#### B3. Backstage core team is shipping native MCP support

GitHub issue #29349 ("Feature: MCP server support for Backstage") tracks first-party MCP integration in Backstage core. Community plugins from Heikki Hellgren and others already exist. The "IDP your AI Goldmine" framing has crossed from blog-speculation to product roadmap.

- **Source:** [Backstage GitHub issue #29349](https://github.com/backstage/backstage/issues/29349) · [Roadie: Your IDP Is an AI Goldmine](https://roadie.io/blog/idp-ai-goldmine-context-engineering/) · [Backstage Meets AI — Hellgren](https://drodil.medium.com/backstage-meets-ai-the-mcp-integration-ba3c67e41e05)
- **Use:** Forward-looking section. Argue that within 12 months MCP-on-Backstage will be a checkbox feature, not a differentiator.

---

### C. Agent protocols — A2A complements MCP (don't pit them)

#### C1. A2A is "agent-to-agent", MCP is "agent-to-tool" — they compose

Originally launched with 50+ partners, Google's Agent2Agent has reached **150 organizations in production** (not pilot). Now governed by the Linux Foundation's Agentic AI Foundation. **Microsoft, AWS, Salesforce, SAP, ServiceNow run A2A in production.** Most production multi-agent systems in 2026 use *both* — each agent uses MCP for tools, A2A for inter-agent coordination. NIST's AI Agent Standards Initiative (Feb 2026) cites A2A as a foundational protocol.

- **Source:** [Stellagent — A2A Protocol Explained](https://stellagent.ai/insights/a2a-protocol-google-agent-to-agent) · [Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) · [AI Agent Protocol Ecosystem Map](https://www.digitalapplied.com/blog/ai-agent-protocol-ecosystem-map-2026-mcp-a2a-acp-ucp)
- **Use:** **Correct the original draft's framing.** The article hints at MCP/A2A as competing. Reframe as: MCP makes Backstage a context source; A2A lets multiple specialized agents collaborate on a Backstage-mediated task. This is more sophisticated than the current draft.

---

### D. AI coding agents — who actually ships code

#### D1. SWE-bench: top agents now resolve 80%+ of real GitHub issues

As of May 2026: **Claude Mythos Preview leads SWE-bench Verified at 93.9%**, Claude Opus 4.7 (Adaptive) at 87.6%, Claude Opus 4.5 at 80.9%. Devin 2.0 stands at 45.8% in standard unassisted evaluation. **OpenAI deprecated SWE-bench Verified due to data contamination concerns and now recommends SWE-bench Pro.**

- **Source:** [SWE-Bench Verified Leaderboard](https://llm-stats.com/benchmarks/swe-bench-verified) · [SWE-Bench Pro: Why 46% Beats 81%](https://www.morphllm.com/swe-bench-pro)
- **Use:** Hard evidence that agents *can* code — closes the "but they hallucinate" objection. Note the SWE-bench Pro caveat to look credible to a technical audience.

#### D2. GitHub Copilot Coding Agent — 1.2M autonomous PRs/month

**4.7M paid subscribers** (Jan 2026, +75% YoY). **Deployed at ~90% of Fortune 100.** The autonomous coding agent (launched 2025) contributes **~1.2M PRs/month** — choosing files, running terminal commands, iterating on errors without human prompts. Copilot generates **46% of code written** by users (Java: 61%). Pull request cycle time dropped from 9.6 days to 2.4 days (**−75%**).

- **Source:** [GitHub Copilot Statistics 2026 — getpanto.ai](https://www.getpanto.ai/blog/github-copilot-statistics) · [Second Talent](https://www.secondtalent.com/resources/github-copilot-statistics/)
- **Use:** Frame Copilot Coding Agent as the *demand side* of the equation: 1.2M autonomous PRs/month each need context. Where does that context come from? IDP via MCP. Tie back to thesis.

#### D3. Cursor / Anysphere — fastest B2B SaaS to $2B ARR ever

**Anysphere reached $2B ARR by Feb 2026**, fastest in B2B software history. Forecasting **$6B ARR by end of 2026** (3x in 10 months). Trajectory: $100M (Jan 2025) → $500M (June) → $1B (Nov) → $2B (Feb 2026). **Cursor 3 (April 2 2026)** introduced a multi-agent workspace running parallel agents across repos/branches. **1M+ daily active users** by Dec 2025.

- **Source:** [Tech Insider — Cursor $60B Valuation](https://tech-insider.org/cursor-60-billion-valuation-anysphere-ai-coding-2026/) · [The Next Web](https://thenextweb.com/news/cursor-anysphere-2-billion-funding-50-billion-valuation-ai-coding)
- **Use:** Quantifies the "ide is becoming agent platform" thesis. Cursor's multi-agent UX *requires* shared context — IDP becomes that shared substrate.

#### D4. Devin — "senior at understanding, junior at execution"

Devin 2.0: **67% PR merge rate** (vs 34% in 2025). **4x faster, 2x more efficient.** One enterprise saved 5–10% of total dev time using Devin for security fixes; another reported **20x efficiency gain on vulnerabilities (30 min → 1.5 min)**. Cost dropped from $500/month to $20/month.

- **Source:** [Cognition — Devin Annual Performance Review 2025](https://cognition.ai/blog/devin-annual-performance-review-2025) · [Idlen review](https://www.idlen.io/blog/devin-ai-engineer-review-limits-2026/)
- **Use:** Counter to "agents don't really work in production" objection. The 5–10% time savings figure is conservative and credible.

#### D5. OpenHands — open-source SWE agent at 70k stars

**66K+ users, 70k+ GitHub stars, ~500 contributors.** $18.8M Series A. **72% on SWE-Bench**, paired with Claude 4.5 resolves 53%+ of real-world GitHub issues on SWE-bench Verified. v1.6.0 (March 2026) added Kubernetes support and Planning Mode.

- **Source:** [OpenHands GitHub](https://github.com/OpenHands/OpenHands) · [Introducing the OpenHands Index](https://openhands.dev/blog/openhands-index)
- **Use:** Add open-source angle. Article currently feels vendor-y (Roadie, Backstage, Anthropic). OpenHands proves the agentic workflow is broadly democratized.

---

### E. IDP market landscape

#### E1. Backstage adoption: 3,400+ companies, ~100k devs

**3,400+ companies have adopted Backstage**, including Spotify, American Airlines (Runway, deploys in <6 min), Expedia (5,000+ devs across 15+ brands, ~20,000 microservices). **At Spotify, onboarding time dropped 55%** (measured to 10th merged PR). **CNCF 2025 Application Delivery Radar puts Backstage in 'Adopt'** alongside Helm and kro. Backstage ranks #5 by velocity among 230+ CNCF projects.

- **Source:** [Backstage Adopters List](https://github.com/backstage/backstage/blob/master/ADOPTERS.md) · [Spotify Engineering: 5 Years of Backstage](https://engineering.atspotify.com/2025/4/celebrating-five-years-of-backstage) · [CNCF Platform Engineering Report 2026](https://www.cncf.io/announcements/2026/03/24/cncf-and-slashdata-report-finds-platform-engineering-tools-maturing-as-organizations-prepare-for-ai-driven-infrastructure/)
- **Use:** Drop the 55% onboarding-time figure into the "imagine onboarding a developer with only Backstage" thought experiment — anchors it in real outcomes. Spotify *already* halved onboarding before agents.

#### E2. Port leads on AI vision; Cortex/OpsLevel/Roadie compete

**Cortex** ($65/user/month enterprise tier) markets itself as "the AI-powered IDP." **Port** raised $100M to position as "agentic engineering platform — command-and-control center for AI agents." **OpsLevel** competes on fast time-to-value (30–45 days vs Backstage's months). **Roadie** offers managed Backstage at $22/dev/month.

- **Source:** [Tasrie — Port vs Backstage vs Cortex 2026](https://tasrieit.com/blog/port-vs-backstage-vs-cortex-developer-portal-comparison-2026) · [Encore — Platform Engineering Tools Compared](https://encore.cloud/resources/platform-engineering-tools)
- **Use:** Counter to "Backstage is hard". Acknowledge managed alternatives. Strengthens credibility with enterprise readers who can't afford to staff Backstage themselves.

---

### F. Counter-arguments to neutralize

#### F1. MCP has *real* security problems — address head-on

**A "by-design" RCE weakness affects Anthropic's official MCP SDK across all supported languages, exposing 7,000+ public servers and 150M+ downloads.** Cursor, VS Code, Windsurf, Claude Code, Gemini-CLI all confirmed vulnerable to MCP-based prompt injection (Windsurf: zero user interaction required). OWASP launched an **MCP Top 10** project. Three named attack vectors: resource theft, conversation hijacking, covert tool invocation.

- **Source:** [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) · [The Hacker News — Anthropic MCP RCE](https://thehackernews.com/2026/04/anthropic-mcp-design-vulnerability.html) · [Practical DevSecOps](https://www.practical-devsecops.com/mcp-security-vulnerabilities/) · [Docker — MCP Horror Stories](https://www.docker.com/blog/mcp-horror-stories-github-prompt-injection/)
- **Use:** **Critical to address.** Add a "What about security?" section. Position IDP-mediated MCP (with RBAC inheritance, audit logs) as the *enterprise-safe* alternative to ad-hoc MCP servers. This actually strengthens the IDP-as-mediator argument.

#### F2. Monolithic codebases are an AI agent ceiling

Per Gergely Orosz: agents have a ceiling of **0.5M–few M LOC** that fits effectively in context. Monolithic enterprise codebases break this. **The constraint is deployment capability, not model capability.** "Token maximizing" — Meta, Microsoft, Salesforce devs intentionally inflating AI usage to hit metrics.

- **Source:** [Pragmatic Engineer — AI Tooling for SE in 2026](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026) · [TLDRecap — Token Maximizing](https://tldrecap.tech/posts/2026/aie-europe/token-maximizing-big-tech-metrics/)
- **Use:** Lend nuance. IDP doesn't fix the LOC ceiling, but *does* let agents work across many smaller services rather than one monolith — argues for microservice + IDP as the AI-native architecture.

---

### G. Forward-looking thesis to add

**New thesis to incorporate (suggested):** *MCP-on-IDP will become the enterprise default by 2027, just as IDP-on-K8s became the default by 2024. The unsolved problem is governance, not capability.*

Supporting signals:
- 2026 MCP roadmap focuses on auth/scale/governance ([source](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/))
- Port's $100M raise on agent-platform thesis
- Backstage core MCP work in flight
- A2A adoption in regulated industries (Salesforce, SAP, ServiceNow)

---

## ARTICLE #1 — Continuous Async Onboarding

This article is more evergreen but less timely. Strengthen with structural frameworks (Diátaxis, DevEx) and quantitative outcome data.

---

### A. Quantifying the problem

#### A1. McKinsey: GenAI doubles coding speed but only on familiar tasks

McKinsey study: developers complete coding tasks **up to 2x faster** with GenAI, but **time savings shrink to <10%** on tasks deemed high in complexity due to *lack of familiarity with a needed framework*. Developers using GenAI tools were **>2x more likely** to report flow/satisfaction — partly because tools "put information at their fingertips faster than searching online platforms." Inner-loop vs outer-loop time: maximizing inner-loop is the productivity goal.

- **Source:** [McKinsey: Unleashing developer productivity with GenAI](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/unleashing-developer-productivity-with-generative-ai) · [DX summary](https://getdx.com/blog/mckinsey-developer-productivity/)
- **Use:** **Strong opening evidence.** Connects directly to the "developers spend ages searching" pain point. The "<10% on unfamiliar frameworks" stat is the smoking gun — *that's exactly the onboarding problem the article describes.*

#### A2. Stack Overflow 2025: docs is the #1 learning resource

**68% of developers use technical documentation** to learn (#1 source) — above online resources (59%) and Stack Overflow (51%). **Trust in AI hit an all-time low** in 2025; developers remain "willing but reluctant" to use AI.

- **Source:** [2025 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2025/) · [Stack Overflow blog: 2025 results](https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/)
- **Use:** Counters the "just use ChatGPT" cynicism. Devs want docs *first*. Then layer AI on top — which is what async onboarding becomes.

#### A3. DORA 2025: AI amplifies high-quality platforms, does nothing for low-quality ones

DORA 2025 (State of AI-Assisted SE): **"High-quality platforms amplify AI's benefits across the board; AI impact on low-quality platforms is negligible."** "AI is only as good as the data it learns from — high-quality, accessible, unified internal data is the fuel for context-aware AI assistance." DORA introduces the **AI Capabilities Model** — 7 practices that amplify AI benefits.

- **Source:** [DORA 2025 Report](https://dora.dev/dora-report-2025/) · [Faros AI — DORA 2025 Takeaways](https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025)
- **Use:** **Pivotal evidence for the article's central premise.** "High-quality docs = AI multiplier" is no longer opinion — it's a DORA finding. Cite explicitly.

---

### B. Frameworks to anchor the argument

#### B1. Diátaxis — adopt this framing or look unserious

Daniele Procida's Diátaxis framework defines four documentation modes: **tutorials (learning-oriented), how-to guides (problem-oriented), reference (information-oriented), explanation (understanding-oriented).** Adopted by OpenAI, LangChain, Cloudflare, StreamingFast, hundreds of projects. Procida no longer accepts adoption registrations because the list is too long.

- **Source:** [Diátaxis official site](https://diataxis.fr/) · [I'd Rather Be Writing review](https://idratherbewriting.com/blog/what-is-diataxis-documentation-framework)
- **Use:** **Must cite.** Article currently lacks a structural framework — Diátaxis is the contemporary standard. Frame "continuous async onboarding" as how-to + reference + explanation working together, with tutorials handled once at start.

#### B2. DevEx framework (Noda et al., ACM Queue) — three dimensions

Abi Noda + Margaret-Anne Storey + Nicole Forsgren + Michaela Greiler published the DevEx framework in ACM Queue. **Three dimensions: feedback loops, cognitive load, flow state.** McKinsey 2020 study: companies with better dev environments saw **4–5x revenue growth** vs competitors. **DX Core 4** unifies DORA + SPACE + DevEx; tested on 300+ orgs; **3–12% efficiency gains, 14% increase in R&D feature time.**

- **Source:** [DevEx: What Actually Drives Productivity (ACM Queue)](https://queue.acm.org/detail.cfm?id=3595878) · [DX Core 4 announcement](https://getdx.com/news/introducing-the-dx-core-4/)
- **Use:** Frame technical writing as a *cognitive load reduction* tool (DevEx dimension #2). This is more rigorous than the current article's "developers aren't writers" framing — same conclusion, better foundation.

---

### C. Tooling landscape — what content writers should know exists

#### C1. Mintlify vs GitBook — converging on AI doc agents

**GitBook** has a built-in proactive AI Agent that connects to Intercom/Slack to **identify knowledge gaps** and **auto-create doc updates** from user prompts. **Mintlify** is Git-first ("docs live with code"), AI agent suggests improvements based on code changes. **Mintlify fits dev-owned docs; GitBook fits shared ownership.**

- **Source:** [GitBook vs Mintlify 2026 — GitBook blog](https://www.gitbook.com/blog/gitbook-vs-mintlify) · [Featurebase comparison](https://www.featurebase.app/blog/gitbook-vs-mintlify)
- **Use:** Article's "implementing the change" section needs concrete tools. Recommend GitBook for shared ownership / Mintlify for dev-owned. Don't shill — present trade-off.

#### C2. Glean — RAG over enterprise knowledge as the new default

Glean connects to **100+ enterprise apps** to build a per-customer knowledge graph. RAG retrieval first, then LLM synthesis. Common use cases: AI assistants surfacing personalized real-time answers, search across fragmented sources, generating up-to-date reports from authoritative documents.

- **Source:** [Glean — What is RAG](https://www.glean.com/resources/guides/what-is-retrieval-augmented-generation-rag) · [Glean Knowledge Graph](https://www.glean.com/resources/guides/glean-knowledge-graph)
- **Use:** Connect to article's "AI też potrzebuje dokumentacji" half-finished thought. RAG over docs is *the* enterprise pattern. Your high-quality docs become the dataset Glean (or Backstage + MCP) feeds to agents.

---

### D. The async-first benchmark — GitLab's handbook

#### D1. GitLab handbook: 2,700+ pages, public, "handbook-first" rule

GitLab's public handbook is **2,700+ pages**. Cultural rule: "Look it up in the handbook before asking." Every meeting needs a documented agenda; meetings are optional by default. New hires spend their **first week reading the handbook**, not doing the job. Documented in INSEAD case study (Marco Minervini).

- **Source:** [The GitLab Handbook](https://handbook.gitlab.com/) · [GitLab All-Remote Guide](https://handbook.gitlab.com/handbook/company/culture/all-remote/guide/) · [INSEAD case via Tidaro](https://www.tidaro.com/blog/stories/gitlab-remote-work/)
- **Use:** **Use as the closing case study.** GitLab is the existence proof that async-first onboarding *works at scale*. The article currently makes the case theoretically — GitLab makes it concrete. "If GitLab can run 2,000-person engineering org without sync onboarding, your team can too."

---

### E. Counter-arguments to neutralize

#### E1. McKinsey's productivity research is contested

Dan North + LeadDev published prominent rebuttals of McKinsey's developer-productivity framework — argument that McKinsey conflates activity with outcomes. Use McKinsey carefully; pair with DORA/DX which have stronger methodology.

- **Source:** [Dan North — McKinsey Review](https://dannorth.net/blog/mckinsey-review/) · [LeadDev — What McKinsey Got Wrong](https://leaddev.com/career-development/what-mckinsey-got-wrong-about-developer-productivity)
- **Use:** Pre-empt criticism by acknowledging the McKinsey controversy in a footnote, then citing DORA/DX as the more credible follow-up research.

---

## CROSS-CUTTING — bridge between the two articles

Both articles share an underlying thesis: **structured, machine-readable knowledge is the prerequisite for the next era of software work.** Article #1 argues this from the human side (continuous onboarding). Article #2 argues it from the agent side (autonomous coding). Consider:

- **Mention each article in the other** (cross-link) — strengthens both
- **Possibly write a third "framing" piece** that ties them together: *"Documentation is no longer for humans alone — it's the substrate AI agents will work over. Investing in docs quality is investing in agent capability. Continuous async onboarding is the unified design principle."*

This third piece would let the two existing drafts stay focused while the framing piece carries the bigger idea. Marketing-wise: 3 articles in a series performs better on LinkedIn than 2 standalone.

---

## Format guide for content writer

For each finding above, you have:
1. **Claim** — already written, ready to drop into prose with light editing
2. **Source link** — primary where available; cite inline as `[anchor text](url)`
3. **Use** — explicit instruction on which thesis the finding supports

**Suggested next step:** content writer reads draft #2 first (more time-sensitive), incorporates findings A1, A2, B1, B2, B3, D1, D2, D3, F1, G as the spine of the rewrite. Findings C1, D4, D5, E1, E2, F2 are supporting depth.

Then draft #1 — incorporate findings A1, A3, B1, B2, D1 as spine. C1, C2, E1 as supporting.

**Time estimate:** ~4–6h editing per article with this brief in hand vs ~10–12h doing research from scratch.
