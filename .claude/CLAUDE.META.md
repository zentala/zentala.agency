# Meta Tags & SEO Strategy

Target keywords, Schema.org implementation, and SEO guidelines for zentala.agency.

**Created:** 2025-10-05
**Last Updated:** 2025-10-05

---

## 🎯 Primary Keywords

- **Fractional CTO** - CTO as a service, hourly/project-based
- **Rapid Prototyping** - MVP development, quick validation
- **Technical Consulting** - Architecture, tech stack decisions
- **PoC Development** - Proof of Concept for startups
- **Team Assembly** - Building development teams for projects

## 🔑 Secondary Keywords

- IoT Development
- Developer Experience (DevEx)
- Backstage.io implementation
- Innovation consulting
- Technology prototyping
- Startup technical advisor

## 🎯 Long-tail Keywords

- "CTO on demand Warsaw Poland"
- "rapid MVP development for startups"
- "technical consulting for non-technical founders"
- "IoT product development consultant"
- "Backstage developer portal implementation"
- "fractional CTO vs full-time CTO"
- "how much does MVP development cost"

---

## 📊 Services (for Schema.org)

### Service 1: IoT Product Development
- **Focus:** DevStage.io platform, connected devices
- **Keywords:** IoT, hardware prototyping, connected products
- **Future URL:** /services/iot-development

### Service 2: Fractional CTO / Technical Consulting
- **Focus:** On-demand CTO expertise, architecture decisions, team leadership
- **Keywords:** Fractional CTO, technical advisor, startup CTO, architecture consulting
- **Future URL:** /services/fractional-cto

### Service 3: Rapid Prototyping
- **Focus:** MVP development, quick validation, startup prototyping
- **Keywords:** MVP, rapid development, prototype, validation
- **Future URL:** /services/rapid-prototyping

### Service 4: Project Kickstarting (PoC + Team Assembly)
- **Focus:** Proof of Concept, team building, project launch
- **Keywords:** PoC, team assembly, project launch, technical team building
- **Future URL:** /services/project-kickstarting

---

## 📝 Meta Description Templates

### Homepage
"Fractional CTO & Innovation Consultant. Rapid prototyping, technical consulting, and PoC development for startups. Based in Warsaw, Poland."

### Blog Articles
Use custom excerpt or first 155 characters of content.
Template: "[Topic] by Paweł Żentała - Fractional CTO specializing in [service area]"

### Capabilities (/offer)
"Technical capabilities: IoT development, Backstage.io, rapid MVP prototyping, team assembly, and fractional CTO services."

### About
"Paweł Żentała - Fractional CTO and Innovation Consultant based in Warsaw. Helping startups with rapid prototyping, technical strategy, and team building."

### Contact
"Get in touch for fractional CTO services, rapid prototyping, or technical consulting. Free discovery call available."

---

## 🏷️ Schema.org Implementation Strategy

### Page Types Mapping

**Homepage (index.astro):**
- Organization (Żentała Innovation Agency)
- Person (Paweł Żentała)
- Service (ItemList of 4 services)
- WebPage

**Blog Articles (blog/[postSlug].astro):**
- Article or BlogPosting
- Person (author)
- BreadcrumbList

**Services/Capabilities:**
- Service (individual)
- WebPage

**Portfolio:**
- CreativeWork or WebPage
- ItemList for listing

**About:**
- AboutPage
- Organization (detailed)
- Person (full bio)

**Contact:**
- ContactPage
- Organization with contactPoint

---

## 🎯 Target Audience

### Primary
- Non-technical founders needing CTO guidance
- Early-stage startups needing rapid validation
- Scale-ups needing temporary CTO coverage

### Secondary
- CTOs/VPs Engineering looking for DevEx/Backstage help
- Product managers needing prototyping support
- Investors looking for technical advisors for portfolio companies

---

## 📈 Content Strategy Notes

### Voice & Tone
- Professional but approachable
- Technical but business-focused
- Show value and outcomes, not just tech specs
- Focus on founder pain points

### Content Pillars
1. **Technical Leadership** - CTO topics, architecture decisions
2. **Rapid Development** - MVP, prototyping, speed to market
3. **Developer Experience** - DevEx, Backstage, team productivity
4. **Innovation Process** - PoC, validation, experimentation

---

## ✅ TODO

- [ ] Expand keyword research with tools (Ahrefs, SEMrush)
- [ ] Create FAQ schema for common questions
- [ ] Add breadcrumb navigation with schema
- [ ] Implement hreflang if going multilingual (Polish?)
- [ ] Add aggregate ratings when we have testimonials
- [ ] Create JSON-LD generator utility
- [ ] Monitor Google Search Console for opportunities
- [ ] A/B test meta descriptions for better CTR

---

## 🔗 Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

**Note:** This is a living document. Update keywords, descriptions, and schema as the business evolves and we learn what resonates with our audience.

**See also:**
- `.claude/tasks/backlog/SEO_SCHEMA_ORG.md` - Implementation task
- `.claude/tasks/backlog/CONTENT_STRATEGY.md` - Content planning