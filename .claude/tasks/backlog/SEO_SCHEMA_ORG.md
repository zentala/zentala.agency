# SEO & Schema.org Implementation

**Status:** Backlog (not started)
**Priority:** High
**Estimated effort:** 2-3 days

## 🎯 Goal

Implement comprehensive SEO meta tags and Schema.org structured data across all page types to improve search visibility and rich snippets.

## 📋 Scope

### 1. Schema.org Implementation

**Page Types:**
- Homepage: Organization + Person + Service list
- Blog Articles: Article/BlogPosting + Person (author)
- Services/Capabilities: Service schema (4 services)
- Portfolio: CreativeWork
- About: AboutPage + Organization + Person (full bio)
- Contact: ContactPage + contactPoint

**Services to include:**
1. IoT Product Development (DevStage.io)
2. Fractional CTO / Technical Consulting
3. Rapid Prototyping (MVP development)
4. Project Kickstarting (PoC + Team Assembly)

### 2. Meta Tags

**Global:**
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs
- Dynamic descriptions per page

**Page-specific:**
- Homepage: Main positioning (Fractional CTO, Rapid Prototyping)
- Blog: Article-specific with author
- Services: Service descriptions

### 3. Components to Create

- `<MetaTags />` - dynamic meta tags
- `<SchemaOrg />` - JSON-LD generator
- Update Layout.astro to use new components

## 🔑 Target Keywords

**Primary:**
- Fractional CTO
- Rapid Prototyping
- Technical Consulting
- PoC Development
- Team Assembly

**See:** `.claude/CLAUDE.META.md` for full keyword strategy

## ✅ Success Criteria

- [ ] All pages have proper meta tags
- [ ] Schema.org validates in Google Rich Results Test
- [ ] Open Graph previews work on social media
- [ ] Dynamic descriptions per page type
- [ ] Author schema for blog posts

## 📚 Resources

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org docs: https://schema.org/
- Open Graph: https://ogp.me/

---

**Next Steps:**
1. Review CLAUDE.META.md for keywords
2. Create MetaTags component
3. Create SchemaOrg component
4. Implement per page type
5. Test with Google tools