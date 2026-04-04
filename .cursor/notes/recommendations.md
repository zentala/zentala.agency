# Zalecenia dla Owner (na podstawie rozmowy + wiedzy o serwisie)

Data: 2026-01-15

---

## 🔴 KRYTYCZNE (zrób teraz)

### 1. Ustaw ceny za każdą fazę

**Problem**: Nie masz jasnych cen → klienci nie wiedzą czego się spodziewać, Ty tracisz czas na custom wyceny

**Rozwiązanie**: 
- **Phase #1 (Discovery)**: 2,000-5,000 EUR (fixed price, 1-2 tygodnie)
- **Phase #2 (R&D + Prototype)**: 5,000-12,000 EUR (fixed price, 2-4 tygodnie)
- **Phase #3 (Execution)**: 15,000-40,000 EUR (based on scope, 4-8 tygodni)

**Dlaczego to ważne**: 
- Klient może kupić Phase 1 bez commitment do całości
- Masz revenue już po Phase 1
- Łatwiej sprzedać 5k niż 50k

**Jak przedstawić na stronie**:
```
Phase #1: Discovery & Strategy — from 2,500 EUR
Phase #2: R&D & Prototyping — from 7,500 EUR
Phase #3: Execution & Delivery — custom quote based on scope
```

---

### 2. Stwórz 1-2 case studies (nawet jeśli to Twoje własne projekty)

**Problem**: Brak social proof = trudniej sprzedać

**Rozwiązanie**: Opisz 1-2 projekty (nawet własne side projects) w formacie:
- **Problem**: Klient miał pomysł na X, ale nie wiedział jak zacząć
- **Approach**: Phase 1 → Product Strategy (2 tyg) → Phase 2 → Prototype (3 tyg) → Phase 3 → MVP live (6 tyg)
- **Outcome**: Deployed MVP, 50 early users, validation metric X

**Gdzie umieścić**: 
- Nowa sekcja na homepage pod bento
- Osobna strona `/portfolio` lub `/case-studies`

**Template dla case study**:
```markdown
## [Project Name] — [Industry]

### Challenge
[Client] needed to validate [idea/problem] but didn't have technical co-founder.

### Approach
- **Phase 1 (2 weeks)**: Discovery sessions → Product Strategy document
- **Phase 2 (3 weeks)**: UX mockups + clickable prototype → aligned on spec
- **Phase 3 (6 weeks)**: Built MVP with [tech stack], deployed on [platform]

### Outcome
- ✅ Deployed MVP in 11 weeks (total)
- ✅ [X] early users in first month
- ✅ [Metric]: [value]
- ✅ Client validated core hypothesis and raised [funding/continued development]

### Tech Stack
[List technologies used]

### Deliverables
- Product Strategy document (12 pages)
- Clickable Figma prototype (15 screens)
- Production code (GitHub repo)
- Deployment on [AWS/Vercel/etc]
```

---

### 3. Dodaj konkretny lead magnet dla Phase 1

**Problem**: Trudno sprzedać cały projekt od razu

**Rozwiązanie**: Oferuj **"Product Strategy Workshop" (Phase 1) jako standalone**
- 1 dzień warsztatów (remote)
- Output: Problem statement, MVP scope, user journeys (light version)
- Cena: 1,500-2,500 EUR
- **Pitch**: "Not sure if we're a good fit? Start with a 1-day workshop — you get tangible strategy doc, I get to understand your vision."

**CTA na stronie**: "Book Strategy Workshop" jako alternatywa do "Schedule Discovery Call"

**Jak to sprzedać**:
```
🎯 Product Strategy Workshop — 1,500 EUR

Not ready to commit to a full project? Start here.

What you get:
✅ 1-day remote workshop (6 hours)
✅ Product Strategy document (light version)
✅ Problem statement + MVP scope
✅ 3-5 key user journeys
✅ Success metrics framework

Perfect for:
- Validating your idea before big investment
- Getting clarity on MVP scope
- Creating spec to share with investors/team
- Deciding if we're a good fit to work together

Book now →
```

---

## 🟡 WAŻNE (następne 2-4 tygodnie)

### 4. Zdefiniuj idealnego klienta (ICP) i napisz dla niego

**Problem**: Piszesz dla "wszystkich" → nikt się nie czuje adresowany

**Rozwiązanie**: Wybierz 1-2 profile i pisz konkretnie do nich:

#### Profil A: Non-technical Founder (SaaS/web app)
- **Kim jest**: Założyciel z biznesowym/produktowym background, bez tech skills
- **Ma pomysł**: SaaS, marketplace, platform
- **Budżet**: 20-50k EUR
- **Timeline**: 3-6 miesięcy do MVP
- **Pain points**:
  - Nie wie jak zacząć ("co najpierw?")
  - Boi się przepalić budżet na złym kierunku
  - Nie ma technicznego co-foundera
  - Nie wie jak wybrać dewelopera/agencję
  - Chce szybko walidować z rynkiem

#### Profil B: Small Company (5-50 osób) - internal tool
- **Kim jest**: COO, Operations Manager, Product Manager
- **Potrzebują**: Custom internal tool (CRM, dashboard, workflow automation)
- **Budżet**: 30-80k EUR
- **Timeline**: 2-4 miesiące
- **Pain points**:
  - Agencje są za drogie (100k+ budgets)
  - Freelancerzy są za wolni lub brakuje im big-picture thinking
  - Nie mają własnego dev teamu
  - Potrzebują kogoś kto "ogarnie" całość

**Akcja**: 
- Przepisz homepage pod **Profil A** (większy rynek)
- Dla Profilu B zrób osobną landing page `/for-companies`

---

### 5. Dodaj "Risk Reversal" do Phase 1

**Problem**: Klient boi się że wyda kasę i nic nie dostanie

**Rozwiązanie**: Oferuj gwarancję:
- **Opcja 1**: "If after Phase 1 you're not satisfied with the Product Strategy document, I'll refund 50% — no questions asked."
- **Opcja 2**: "Phase 1 is standalone — even if we don't continue, you have a clear strategy to take to any dev team."

**Gdzie dodać**: 
- Na stronie `/offer` 
- W CTA section
- W email po zapisie na call

**Przykładowe sformułowanie**:
```
💰 Phase 1 Guarantee

If you're not satisfied with the Product Strategy document, 
I'll refund 50% of the Phase 1 cost — no questions asked.

Why? Because Phase 1 should give you clarity and direction. 
If it doesn't, I haven't done my job.
```

---

### 6. Stwórz prosty email sequence dla leads

**Problem**: Ktoś zapisze się na call, ale nie przyjdzie / nie odpowie

**Rozwiązanie**: 3-email sequence (automatyzacja przez Calendly + Mailchimp/ConvertKit):

#### Email 1 (zaraz po zapisie): Confirmation + "What to prepare"
```
Subject: Your discovery call is confirmed — here's what to prepare

Hi [Name],

Thanks for booking a discovery call! Looking forward to discussing your project.

📅 [Date & Time]
🔗 [Zoom/Meet link]

To make the most of our 30 minutes, please prepare:
✅ Brief description of your idea (3-5 sentences)
✅ Who is your target user?
✅ What's your timeline?
✅ Do you have a budget range in mind?

No need to send answers now — we'll discuss on the call.

See you soon,
Paweł

P.S. If you need to reschedule, use this link: [reschedule link]
```

#### Email 2 (dzień przed): Reminder + 1-page PDF
```
Subject: Tomorrow: Your discovery call at [time]

Hi [Name],

Quick reminder — we have a call tomorrow at [time].

🔗 [Zoom/Meet link]

I prepared a short guide on how to get the most from our discovery session:
📄 [Link to 1-page PDF: "How to prepare for a discovery call"]

See you tomorrow!

Paweł
```

#### Email 3 (po call): Follow-up + proposal
```
Subject: Great talking to you — here's the next step

Hi [Name],

Thanks for the call today! I enjoyed learning about [project idea].

As discussed, here's what I propose:

🎯 Phase #1: Discovery & Strategy
- 2 weeks
- [Specific deliverables for their project]
- Investment: [X] EUR

If you'd like to move forward, reply to this email or book Phase 1 here:
[Link to booking/payment page]

Questions? Just reply — happy to clarify anything.

Best,
Paweł

P.S. If timing isn't right now, no worries — feel free to reach out when ready.
```

---

## 🟢 DOBRE DO ZROBIENIA (1-3 miesiące)

### 7. Rozbuduj content marketing (lead generation)

**Problem**: Brak organic traffic → musisz aktywnie szukać klientów

**Rozwiązanie**: 

#### LinkedIn (2-3 posty/tydzień)
Tematy:
- "5 mistakes founders make when building their first MVP"
- "How I validate SaaS ideas in 8 weeks (Phase-based approach)"
- "Behind the scenes: How AI agents speed up my development"
- "Why your MVP should be 'rough but usable' (not perfect)"
- Case studies (when you have them)

Format: Short post (3-5 akapitów) + 1 image/screenshot

#### Blog (1 artykuł/miesiąc)
Tematy:
- "The Phase-Based Approach to MVP Development"
- "How to Validate Your SaaS Idea Without Building the Full Product"
- "Product Strategy First: Why Discovery Phase Saves Time and Money"
- "What to Expect from a Technical Co-Founder (and Alternatives)"

Format: 1,000-1,500 słów, SEO-optimized

#### Newsletter (co 2 tygodnie)
Content mix:
- 1x case study or project update
- 1x tip/advice
- 1x behind-the-scenes / personal note

**ROI**: Long-term (3-6 miesięcy), ale buduje authority i organic leads

---

### 8. Zbuduj "productized services" packages

**Problem**: Każdy projekt custom → trudno skalować, trudno wyceniać

**Rozwiązanie**: Oferuj 2-3 fixed packages:

#### Package 1: "MVP Starter" (Phase 1+2)
- **What's included**: Discovery + Product Strategy + Clickable Prototype
- **Fixed price**: 12,000 EUR
- **Timeline**: 6 tygodni
- **Perfect for**: Non-tech founders testing idea, early-stage startups
- **Output**: 
  - Product Strategy document
  - UX mockups (Figma)
  - Clickable prototype
  - Technical specification (ready to hand off to any dev team)

#### Package 2: "0→Live MVP" (Phase 1+2+3)
- **What's included**: Discovery → Prototype → Deployed MVP
- **Fixed price**: 35,000 EUR
- **Timeline**: 12 tygodni
- **Perfect for**: Funded startups, SMBs with clear product vision
- **Output**: 
  - Product Strategy document
  - UX mockups + Clickable prototype
  - Production-ready code
  - Deployed MVP (live on web)
  - 2 weeks post-launch support

#### Package 3: "CTO Sprint" (custom)
- **What's included**: Technical leadership for 1-3 months
- **Price**: 8,000-15,000 EUR/month (part-time, ~10-20h/week)
- **Perfect for**: Companies with dev team, need technical direction
- **Output**: 
  - Architecture decisions
  - Code reviews
  - Technical roadmap
  - Team mentoring

**Dlaczego to działa**: 
- Łatwiej sprzedać fixed package niż custom quote
- Klient wie co dostaje
- Ty możesz optymalizować process (reusable templates, tools)

---

### 9. Dodaj "Anti-Portfolio" sekcję

**Problem**: Klienci nie wiedzą czy jesteś dla nich, tracisz czas na bad-fit leads

**Rozwiązanie**: Jasno napisz **dla kogo NIE jesteś**

**Przykład**:
```markdown
## Who I'm NOT a good fit for

I'm transparent about my focus — I'm NOT the right choice if you need:

❌ **Long-term maintenance & support**  
I specialize in bootstrapping (0→MVP), not ongoing operations.  
After delivery, you'll need an in-house team or maintenance partner.

❌ **Enterprise-scale architecture**  
I build MVPs for validation, not production systems for 1M+ users.  
If you're at scale, you need a full dev team.

❌ **Marketing & growth support**  
I deliver the product, you validate the market.  
I can recommend growth partners if needed.

❌ **Very tight budgets (<10k EUR)**  
Quality work takes time. If budget is very limited,  
consider no-code tools or junior developers.

❌ **Projects requiring large teams**  
I work solo (with AI assistance). If you need 5+ developers  
working simultaneously, an agency is better.
```

**Dlaczego to działa**: 
- Filtruje bad-fit leads (oszczędza Twój czas)
- Buduje trust (honesty signal)
- Pokazuje że wiesz czego NIE robisz (specjalizacja)

**Gdzie dodać**: 
- Strona `/offer` lub `/faq`
- Pod głównym CTA na homepage

---

### 10. Rozważ partnership z 1-2 agencjami

**Problem**: Sam nie zdobędziesz wystarczająco leads, zwłaszcza na początku

**Rozwiązanie**: Znajdź agencje które:
- Robią design/UX, ale nie mają dev capacity
- Robią marketing, ale nie mają technical co-founder dla swoich klientów
- Mają overflow work (za dużo projektów, za mało devs)

**Oferta dla nich**:
```
"I deliver MVPs for your clients. You keep client relationship,  
I handle technical execution. Revenue split: 60/40 (you/me)  
or fixed subcontractor rate."
```

**Gdzie szukać**: 
- LinkedIn (Warsaw-based agencies)
- Lokalne startup events (Reaktor, Campus Warsaw)
- Design agencies (Pure, ReasonWhy, iteo)
- Marketing agencies wanting to offer "product development"

**Pitch email template**:
```
Subject: Partnership opportunity — MVP development for your clients

Hi [Name],

I'm Paweł, a technical architect specializing in rapid MVP development.

I noticed [Agency] works with [type of clients]. I'm reaching out because  
I often partner with agencies who need technical execution for their clients.

What I offer:
✅ End-to-end MVP development (8-12 weeks)
✅ You keep client relationship, I handle technical delivery
✅ Fixed-price phases (transparent for your client)
✅ 20+ years experience (IoT, SaaS, internal tools)

Would you be open to a quick call to explore if this makes sense?

Best,
Paweł
[Link to portfolio]
```

**Benefit**: 
- They get technical capacity without hiring
- You get qualified leads without marketing spend
- Win-win

---

## 🔵 DŁUGOTERMINOWE (3-12 miesięcy)

### 11. Rozważ "retainer model" dla fazy maintenance

**Obecna pozycja**: "Nie robię maintenance"

**W przyszłości**: Po 5-10 dostarczonych projektach, możesz:
- Oferować 2-4h/tydzień support dla wybranych klientów
- Zakres: Bug fixes, small features, minor improvements
- Cena: 2,000-3,000 EUR/miesiąc (per client)
- Max 3-5 klientów jednocześnie

**Dlaczego to ma sens**:
- **Recurring revenue** (MRR) = stabilność finansowa
- **Mniej sales work** (retainer clients = stały dochód)
- **Relationship deepening** (długoterminowe relacje = referencje)

**Kiedy wprowadzić**: Jak będziesz mieć 5+ dostarczonych projektów

---

### 12. Zbuduj "AI-powered dev toolkit" (product)

**Obserwacja**: Używasz AI agents do przyspieszenia pracy

**Opportunity**: Możesz stworzyć własne narzędzia/templates i sprzedawać jako produkty

**Pomysły**:
- **"AI-powered MVP boilerplate"** — starter kit dla typowych SaaS
- **"Product Strategy Template Pack"** — templates z Phase 1
- **"Prototype-to-Code AI Workflow"** — Twój process jako course/template

**Benefit**:
- **Pasywny dochód** (sprzedajesz raz, zarabiasz wielokrotnie)
- **Marketing tool** (pokazujesz expertise)
- **Lower touch** (mniej czasu niż consulting)

**Format**:
- Digital products ($99-499)
- Gumroad, Lemon Squeezy
- Promowane przez LinkedIn + blog

**ROI**: 6-12 miesięcy do pierwszych sales, ale long-term win

---

## Podsumowanie priorytetów

| Priorytet | Akcja | Czas do zrobienia | Impact | Deadline |
|-----------|-------|-------------------|--------|----------|
| **🔴 #1** | Ustaw ceny za fazy | 1 dzień | 🔥 Natychmiastowy (łatwiej sprzedać) | Tydzień 1 |
| **🔴 #2** | 1-2 case studies | 2-3 dni | 🔥 Natychmiastowy (social proof) | Tydzień 1-2 |
| **🔴 #3** | Lead magnet (Phase 1 standalone) | 1 dzień | 🔥 Natychmiastowy (więcej leads) | Tydzień 1 |
| **🟡 #4** | Zdefiniuj ICP | 1 dzień | ⚡ Krótkoterminowy (lepszy messaging) | Tydzień 2 |
| **🟡 #5** | Risk reversal | 1 dzień | ⚡ Krótkoterminowy (więcej konwersji) | Tydzień 2 |
| **🟡 #6** | Email sequence | 2-3 dni | ⚡ Krótkoterminowy (mniej no-shows) | Tydzień 3 |
| **🟢 #7** | Content marketing | Ongoing | 📈 Średnioterminowy (3-6 mies) | Start tydzień 4 |
| **🟢 #8** | Productized packages | 1 tydzień | 📈 Średnioterminowy | Miesiąc 2 |
| **🟢 #9** | Anti-portfolio | 1 dzień | 📈 Średnioterminowy | Miesiąc 2 |
| **🟢 #10** | Agency partnerships | 1-2 tygodnie | 📈 Średnioterminowy (2-4 mies) | Miesiąc 2-3 |
| **🔵 #11** | Retainer model | - | 🌱 Długoterminowy (6+ mies) | Po 5+ projektach |
| **🔵 #12** | AI toolkit (product) | 1-2 miesiące | 🌱 Długoterminowy (12+ mies) | Rok 2 |

---

## Moja rekomendacja na najbliższe 2 tygodnie:

### Week 1:
- [ ] Ustaw ceny (Phase 1, 2, 3)
- [ ] Lead magnet: "Product Strategy Workshop" offer
- [ ] Rozpocznij pisanie 1 case study

### Week 2:
- [ ] Dokończ case study, dodaj na stronę
- [ ] Zdefiniuj ICP (Profil A + B)
- [ ] Dodaj "Risk Reversal" do Phase 1
- [ ] Setup email sequence (3 emails)

**Po tych 2 tygodniach będziesz mieć**: 
✅ Jasne ceny (łatwiej sprzedać)  
✅ Social proof (case study)  
✅ Lead magnet (więcej konwersji)  
✅ Better messaging (ICP-focused)  
✅ Automated follow-up (mniej ręcznej pracy)

---

## Resources & Tools

### Pricing research:
- Benchmarking: Sprawdź ceny podobnych freelancerów/small agencies
- Rule of thumb: MVP projects w EU = 20-60k EUR (ty jesteś na dolnej granicy = competitive)

### Email automation:
- **Calendly** + **Mailchimp** (free tier OK na start)
- Albo **ConvertKit** (lepsze dla creators)

### Case study template:
- Zobacz: Basecamp, UserVoice, inne SaaS — jak piszą case studies
- Format: Problem → Approach → Outcome (+ metrics!)

### Content calendar (LinkedIn):
- Plan 8-12 postów na miesiąc (2-3/tydzień)
- Schedule przez Buffer lub Hypefury

---

## Pytania do siebie (self-assessment):

1. **Czy jestem gotów przestać custom-pricing każdy projekt?** <TAK/>
   → Jeśli nie, productized packages nie zadziałają

2. **Czy chcę robić content marketing (LinkedIn, blog)?**  <TAK/>
   → Jeśli nie, focus na partnerships (agencies, referrals)

3. **Jaki jest mój target: 5 projektów/rok po 40k czy 15 projektów/rok po 15k?**  <5>
   → To zmienia strategię (premium vs volume)

4. **Czy mogę pokazać przynajmniej 1 case study (nawet side project)?**  <TAK/>
   → Jeśli nie, zrób 1 pro-bono/discounted projekt dla testimonial

5. **Ile czasu mogę poświęcić na marketing/sales?**  <5%/>
   → 20% czasu (1 dzień/tydzień) to minimum dla solo founder

---

## Next Steps

Po przeczytaniu tego dokumentu, wybierz:
1. **Top 3 priorytety na najbliższe 2 tygodnie**
2. **1 długoterminowy cel na Q1 2026**

I zacznij działać — execution > perfect plan.

---

---

## 📄 STRUKTURA WITRYNY (Sitemap)

### Rekomendacja: MVP Sitemap (4 strony)

**Filozofia**: "Less is more" — wszystko kluczowe na home, reszta tylko jeśli koniecznie

```
zentala.agency/
├── / (home)                    ← 80% contentu tutaj
│   ├── Hero + value prop
│   ├── 3-Phase Process (bento)
│   ├── Case study preview (1-2)
│   ├── About me (short)
│   └── CTA section
│
├── /offer                      ← Szczegóły oferty
│   ├── Phase breakdown (szczegóły)
│   ├── Pricing ranges
│   ├── Deliverables list
│   ├── FAQ
│   └── Anti-portfolio
│
├── /portfolio                  ← Social proof
│   ├── 2-3 case studies (full)
│   └── Tech stack showcase
│
└── /contact                    ← Lead capture
    ├── Calendly embed
    ├── Contact form (backup)
    └── Email/LinkedIn links
```

**Dlaczego ta struktura**:
- ✅ **Home**: Wszystko kluczowe w jednym miejscu (user journey: zainteresowanie → zrozumienie → CTA)
- ✅ **Offer**: Dla tych co chcą szczegółów (pricing, FAQ, "co NIE robię")
- ✅ **Portfolio**: Social proof (case studies = credibility)
- ✅ **Contact**: Prosty lead capture

---

### Co JEST na home (scroll, ale nie za długi):

1. **Hero** (już masz)
   - Headline: "Let's Turn Your Vision Into a Product"
   - Subhead: "From discovery session to production-ready MVP"
   - CTA: "Schedule Discovery Call" + "Book Strategy Workshop"

2. **3-Phase Process** (już masz — bento)
   - Phase #1: Discovery & Strategy
   - Phase #2: R&D & Prototyping
   - Phase #3: Execution & Delivery

3. **Case Study Preview** (DODAJ — nowe)
   ```html
   <section>
     <h2>Recent Work</h2>
     
     <div class="case-study-card">
       <h3>[Project Name] — [Industry]</h3>
       <p>Challenge: [1 sentence]</p>
       <p>Outcome: [Metric + timeline]</p>
       <a href="/portfolio/project-1">Read full case study →</a>
     </div>
     
     <a href="/portfolio">See all projects →</a>
   </section>
   ```

4. **About Me (short version)** (DODAJ — nowe)
   ```html
   <section>
     <h2>Who I Am</h2>
     <p>20+ years in IT — from marketing and UX to IoT and robotics.
        I design end-to-end solutions with a systems-thinking approach.</p>
     <a href="/about">More about me →</a> (optional)
   </section>
   ```

5. **CTA Section** (już masz)
   - Headline: "Let's Turn Your Vision Into a Product"
   - Buttons: Schedule Call + LinkedIn

---

### Co NA /OFFER

```markdown
# How I Work

## The 3-Phase Process

### Phase #1: Discovery & Strategy
- Duration: 1-2 weeks
- Investment: from 2,500 EUR
- What you get:
  • Product Strategy document
  • Problem statement + MVP scope
  • User personas & journeys
  • Success metrics framework

### Phase #2: R&D & Prototyping
- Duration: 2-4 weeks
- Investment: from 7,500 EUR
- What you get:
  • UX mockups (Figma)
  • Clickable prototype
  • Technical specification
  • Feasibility report

### Phase #3: Execution & Delivery
- Duration: 4-8 weeks
- Investment: custom quote (typically 15-40k EUR)
- What you get:
  • Production-ready code
  • Deployed MVP (live on web)
  • Documentation
  • 2 weeks post-launch support

---

## Frequently Asked Questions

Q: Can I start with just Phase 1?
A: Yes! Phase 1 is standalone. You get a Product Strategy document that you can take to any dev team.

Q: Do you do maintenance after delivery?
A: I specialize in bootstrapping (0→MVP). After delivery, you'll need an in-house team or maintenance partner. I can recommend partners if needed.

Q: What tech stack do you use?
A: Depends on the project — I choose based on your needs, team, and scaling plans. Typically: TypeScript, React/Node.js, PostgreSQL, AWS/Vercel.

Q: How long does it take?
A: Full process (Phase 1+2+3): 8-12 weeks. But you can start with just Phase 1 (1-2 weeks).

Q: What if we don't continue after Phase 1?
A: No problem. Phase 1 deliverables are standalone — you have a clear strategy to move forward with anyone.

---

## Who I'm NOT a good fit for

I'm transparent about my focus — I'm NOT the right choice if you need:

❌ **Long-term maintenance & support**  
I specialize in bootstrapping (0→MVP), not ongoing operations.

❌ **Enterprise-scale architecture**  
I build MVPs for validation, not production systems for 1M+ users.

❌ **Marketing & growth support**  
I deliver the product, you validate the market.

❌ **Very tight budgets (<10k EUR)**  
Quality work takes time. If budget is very limited, consider no-code tools.

❌ **Projects requiring large teams**  
I work solo (with AI assistance). If you need 5+ developers, an agency is better.

---

[CTA: Ready to start? Schedule a call →]
```

---

### Co NA /PORTFOLIO

**Index page** (grid of case study cards):
```markdown
# Portfolio

<Grid of case study cards>

[Card 1: Project Name — Industry]
Short description (1-2 sentences)
"Read case study →"

[Card 2: Project Name — Industry]
...
```

**Case Study Detail Page** (/portfolio/project-1):
```markdown
## [Project Name] — [Industry]

### Challenge
[Client] needed to validate [idea/problem] but didn't have technical co-founder.

### Approach
- **Phase 1 (2 weeks)**: Discovery sessions → Product Strategy document
- **Phase 2 (3 weeks)**: UX mockups + clickable prototype → aligned on spec
- **Phase 3 (6 weeks)**: Built MVP with [tech stack], deployed on [platform]

### Outcome
✅ Deployed MVP in 11 weeks (total)
✅ [X] early users in first month
✅ [Metric]: [value]
✅ Client validated core hypothesis and raised [funding/continued development]

### Tech Stack
- Frontend: React + TypeScript
- Backend: Node.js + PostgreSQL
- Deployment: AWS / Vercel
- [Other tools used]

### Deliverables
- Product Strategy document (12 pages)
- Clickable Figma prototype (15 screens)
- Production code (GitHub repo)
- Deployed MVP: [link]

[CTA: Want similar results? Let's talk →]
```

---

### Co NA /CONTACT

```markdown
# Let's Talk

Ready to turn your vision into a product? Schedule a discovery call or reach out directly.

<Calendly embed>

## Or reach me directly:
- Email: zentala@gmail.com
- LinkedIn: linkedin.com/in/zentala
- GitHub: github.com/zentala

Based in Warsaw, Poland (CET timezone)
Working with clients worldwide
```

---

### Navigation (menu główne)

**Wersja MVP** (teraz):
```
[Logo]  Home  |  Offer  |  Portfolio  |  Contact
```

**Wersja rozszerzona** (po 3 miesiącach, optional):
```
[Logo]  Home  |  Offer  |  Portfolio  |  Workshop  |  Blog  |  Contact
```

---

### Kiedy dodać więcej stron?

**NIE TERAZ** — dopiero po 3 miesiącach, jak będziesz mieć:
- ✅ 2-3 case studies
- ✅ Clear pricing
- ✅ Email sequence
- ✅ Pierwszy klient

**Wtedy rozważ**:
- `/workshop` — Lead magnet (Phase 1 standalone) jako osobna landing page
- `/for-founders` — Landing page dla non-tech founders (Profil A)
- `/blog` — Content marketing (SEO, authority building)

---

### ✅ DO ZROBIENIA (najbliższe 2 tygodnie):

**Home page** (już masz 80%):
- ✅ Hero (done)
- ✅ Bento 3-phase (done)
- ➕ Dodaj: Case study preview (1 card)
- ➕ Dodaj: Short "About me" (2 akapity)
- ✅ CTA section (done)

**Strona /offer** (nowa):
- Phase breakdown z cenami
- FAQ (5-10 pytań)
- Anti-portfolio
- CTA

**Strona /portfolio** (nowa):
- Index page (grid of case studies)
- 1-2 full case study pages

**Strona /contact** (sprawdź czy masz):
- Calendly embed
- Backup contact form

---

_Created: 2026-01-15  
Last updated: 2026-01-15  
Next review: 2026-02-15_
