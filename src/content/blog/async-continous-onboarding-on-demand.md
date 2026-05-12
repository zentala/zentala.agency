---
title: 'Continuous Async Onboarding: The DevEx Pattern AI Will Force on Every Engineering Org'
date: '2026-05-12'
category: 'DevEx'
imageUrl: 'https://zentala.io/images/continuous-onboarding.jpg'
excerpt: "DORA's 2025 report found that high-quality engineering platforms amplify AI's benefits — and low-quality ones get nothing. McKinsey measured GenAI doubling coding speed, but only when developers already knew the framework. The lesson: every developer (and every agent) is in continuous, asynchronous onboarding. Organizations that design for that win twice — once for the humans, once for the machines."
authorRole: 'DevEx Consultant'
bannerEnd: 'devex'
published: false
---

DORA's 2025 State of AI-Assisted Software Development report found that high-quality engineering platforms amplify AI's benefits across the board — and low-quality platforms get essentially nothing from AI investment. McKinsey, measuring developer productivity under GenAI, found coding speed roughly doubled on familiar tasks. On tasks where developers lacked familiarity with the necessary framework, the speedup collapsed to under 10%. The lesson is the same from both ends: every developer — and every AI agent — is in continuous, asynchronous onboarding. Organizations that design for that win twice. Once for the humans. Once for the machines.

## The myth we're still operating under

We still treat onboarding as an event. Someone joins the team; they get a buddy, a checklist, two weeks of slow-paced exposure, and after a month or two they're considered "onboarded." After that, the assumption is: they know the system.

They don't. Nobody does. Every time a developer integrates a new internal API, wires up a Kafka broker they haven't touched before, picks up a translation library, pulls in a CDN configuration they didn't write — they are onboarding themselves to a new piece of the organization's surface area. The system never stops being partially unfamiliar. Software evolves continuously, team boundaries shift, the people who knew the original context move on. The "fully onboarded engineer" is a fiction.

This was already true before AI. AI made it impossible to ignore.

## Why AI breaks the old model

Three things changed at once.

Code creation got cheap. GitHub Copilot generates roughly 46% of code written by its users on average; for Java developers the figure is 61%. Pull request cycle time, in controlled measurements, dropped from 9.6 days to 2.4 days — a 75% reduction. Cheap code creation means more services, more libraries, more integration surface — *more onboarding events per engineer per quarter*, not fewer.

Team boundaries got fluid. The Pragmatic Engineer's 2026 tooling roundup notes that 55% of professional developers now report regularly using AI agents, up from near-zero in early 2024. As agents take on more routine tasks, human engineers move between projects more often. The stable, multi-year team — the social structure that used to carry tribal knowledge — is becoming rarer.

The new audience for documentation isn't human. Agents read your docs too. They don't ask the senior engineer at the next desk; they read what is written, or they hallucinate. DORA's 2025 finding — "AI is only as good as the data it learns from; high-quality, accessible, unified internal data is the fuel for context-aware AI assistance" — is the polite version. The blunt version: if your docs are bad, you don't just frustrate humans, you actively degrade your AI investment.

## Diátaxis as the structural baseline

Before tooling, before headcount, before strategy, there is a question of *what shape* documentation should take. The dominant answer in 2026 is Diátaxis, the framework Daniele Procida developed and which has been adopted by OpenAI, LangChain, Cloudflare, and several hundred other projects. The list of adopters has grown so long Procida no longer accepts new registrations.

The framework identifies four kinds of documentation, each serving a different user need:

- **Tutorials** — learning-oriented. You walk a newcomer through their first success. Read once, then archive in the back of the mind.
- **How-to guides** — problem-oriented. The reader has a goal and needs the steps. Pragmatic, scoped, repeatable.
- **Reference** — information-oriented. API surfaces, configuration schemas, exhaustive listings. Authoritative and dry.
- **Explanation** — understanding-oriented. Why the system is shaped the way it is. The mental model.

Most internal documentation in most organizations is an unintentional pile of these four modes mashed together, written by the same person in the same Markdown file. Splitting them out is the single highest-leverage refactor you can do. A new engineer arriving at your service should be able to find each mode in a predictable location.

## The cognitive load argument

If you want a framework to justify the investment to leadership, the rigorous one is DevEx as defined by Abi Noda and co-authors in ACM Queue. Three dimensions, all measurable: feedback loops, cognitive load, flow state. The DX Core 4, which unifies DORA, SPACE, and DevEx, has been tested across more than 300 organizations and consistently shows 3–12% efficiency gains and a 14% increase in the proportion of R&D time spent on feature work when these dimensions improve.

Documentation lives squarely in the cognitive load dimension. Every minute a developer spends reconstructing context — searching Slack, pinging the one person who knows, reading a stale wiki page — is a minute of cognitive overhead with zero output. The McKinsey study noted that GenAI's biggest perceived benefit, beyond raw speed, was *putting information at fingertips faster than searching online platforms*. The pattern is consistent: the bottleneck is finding and trusting context. Tools help. So does writing the context down once, in a discoverable place, with clear ownership.

## Why developers shouldn't (mostly) write the documentation

The current default in most engineering orgs is "developers document their own code." This is roughly as sensible as "developers do their own legal review." Writing effective documentation requires a distinct skill stack: linguistic precision, instructional design sense, empathy for the reader's gap in knowledge, comfort with visual communication, the patience to revise. These are real skills, and they are not the skills most developers were hired for.

The high-functioning pattern, visible at Stripe, Twilio, Spotify, Atlassian and a handful of others, treats technical writing as a specialized role on the DevEx team. The job description that works looks roughly like: junior-developer competence in at least one stack, high linguistic precision, formal training or significant practice in instructional design, and a temperament that gets satisfaction from making other people's expertise legible. Such a person is not a developer who failed at coding; they are a specialist with a different combination of strengths.

The mode that works: the developer is responsible for accuracy and the technical writer is responsible for legibility. A short structured conversation produces a documented module faster than the developer would write it alone and at substantially higher quality. The developer's contribution shrinks to the minimum they can actually sustain.

## The tooling has caught up

A few years ago this kind of pipeline required custom infrastructure. In 2026 the platforms exist.

GitBook and Mintlify are the two converging defaults. GitBook is shared-ownership, visual-first, with a built-in AI Agent that connects to Slack and Intercom to *identify knowledge gaps* from the questions users actually ask, and proactively drafts updates. Mintlify is Git-first, dev-owned, docs-live-with-code, AI suggestions driven by changes in the source repo. The decision rule is almost mechanical: if developers want to own the artifact and engineers are the primary writers, Mintlify fits. If you want technical writers and product folks editing alongside engineers, GitBook fits.

For internal documentation tied to the developer portal, Backstage TechDocs remains the path of least resistance — Markdown alongside code, rendered inside the portal, owned by the team listed in `catalog-info.yaml`. The portal also provides Qeta-style Q&A plugins that make documentation gaps visible: every unanswered question is a missing how-to guide.

Above all of this sits the RAG layer. Glean and its competitors index 100+ enterprise apps to provide a single retrieval surface over the organization's knowledge — the corporate equivalent of asking your docs in natural language. The shape of the future, already visible: a developer or an agent asks a question, retrieval pulls the right paragraphs from TechDocs / Confluence / Slack, the LLM synthesizes. The quality of the answer is bounded above by the quality of what was written. Garbage in, garbage out — at scale, in real time, in front of every engineer.

## GitLab as the existence proof

The standard objection at this point is: "this works for a startup, not at scale." GitLab is the response to that objection.

GitLab runs a 2,700+ page public handbook that documents nearly every aspect of how the company operates. The cultural rule is "look it up in the handbook before asking." Meetings are optional by default; running one requires a documented agenda. New hires spend their first week reading the handbook, not doing the job. The case has been formally studied by INSEAD researcher Marco Minervini. The company itself runs as a 2,000-person all-remote engineering organization on the back of this artifact.

If async-first onboarding works at GitLab's scale, it works at yours. The question isn't whether the model is viable. The question is whether you are willing to make the investment that it takes.

## What good measurement looks like

The goal isn't to count pages produced. It is to count problems solved per unit of engineer time.

Useful signals: per-page feedback ratings (a thumbs-up/thumbs-down on every doc page), search success rate (queries that produced a click), search no-result rate (queries that returned nothing — these are your highest-priority gaps), median time-to-first-PR for new hires, the volume of recurring Slack questions answered by docs versus by humans, the percentage of catalog entities with current TechDocs. Backstage exposes most of these out of the box. The rest are a Datadog dashboard away.

Pair this with the DX Core 4 baseline — three to twelve percent efficiency gains are real and they show up in this data within a quarter or two of disciplined investment.

## What to do on Monday

Three concrete moves, in priority order.

Audit your top-10 onboarding Slack threads of the last quarter. Every recurring question is a missing how-to guide. Address those ten first; you will eliminate a measurable chunk of your senior engineers' interrupt load within a week.

Pick one service. Restructure its docs along Diátaxis lines — tutorial, how-to, reference, explanation, in clearly labeled directories. Use it as the reference example to roll the pattern out elsewhere.

Hire or designate a technical writer with the DevEx team affiliation. Not as a documentation enforcer — as a partner who pulls developers' expertise into legible form. Measure their impact on the DX Core 4 metrics above.

The investment doesn't need leadership approval for a strategic transformation. It needs one person's attention and one quarter of patience. The compounding starts the day the first refactored doc ships.

---

*This is the second piece in a three-part series. The first looked at how developer portals are becoming AI infrastructure. The next ties both threads together.*
