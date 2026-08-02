export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyQuote = {
  text: string;
  attribution: string;
};

export type CaseStudyPhase = {
  id: string;
  step: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  meta: Array<{ label: string; value: string }>;
  stats: CaseStudyStat[];
  testimonial?: CaseStudyQuote;
  phases: CaseStudyPhase[];
  isConcept?: boolean;
  conceptNote?: string;
};

export const supplySaCaseStudy: CaseStudy = {
  slug: "supply-sa-vendor-assistant",
  title: "Supply SA Vendor Chatbot",
  subtitle:
    "How Supply SA replaced a 30–45 minute manual certification walkthrough with a production AI chatbot — without introducing a single hallucinated answer.",
  meta: [
    { label: "Sector", value: "Nonprofit / Government Agency" },
    { label: "Team Size", value: "7" },
    { label: "Location", value: "San Antonio, TX" },
    { label: "Established", value: "2025" },
    { label: "Core Features", value: "AI Chatbot, Deterministic Rules Engine" },
    { label: "Status", value: "Live in Production" },
  ],
  stats: [
    {
      value: "7–11",
      label: "Screens replacing a 30–40 step process",
    },
    {
      value: "34 hrs/mo",
      label: "Specialist time freed",
    },
    {
      value: "~$11.5–12K",
      label: "Annual staff capacity value",
    },
  ],
  testimonial: {
    text: "This is AMAZING!",
    attribution: "Melanie M., Executive Director, Supply SA",
  },
  phases: [
    {
      id: "summary",
      step: "01",
      title: "Executive Summary",
      paragraphs: [
        "Supply SA partnered with Soulwire Studio to eliminate a costly bottleneck in its vendor certification process: every applicant's first step was a live, one-on-one walkthrough with a staff specialist, just to learn which of 40+ possible documents applied to their situation. At 10–15 vendors a week and 30–45 minutes per walkthrough, that bottleneck was consuming roughly 34 hours of specialist time every month — confirmed by Supply SA staff — time that didn't require specialist judgment, only correctly-sequenced information.",
        "The solution was a production AI chatbot, live on supply-sa.org, that runs the same walkthrough automatically, around the clock. The result: a 30–40 step manual process compressed into a 7–11 screen guided flow, zero hallucinated compliance answers, and no added headcount.",
      ],
    },
    {
      id: "problem",
      step: "02",
      title: "The Problem",
      paragraphs: [
        "Vendor certification document requirements aren't one-size-fits-all. What a vendor needs to submit depends on a web of interacting factors: new application vs. renewal, which certification(s) they're pursuing, entity structure (sole proprietor, partnership, corporation, LLC), industry, jurisdiction, ownership structure, and more. A construction LLC seeking MBE and VBE certification needs a meaningfully different document set than a sole-proprietor consultant renewing an SBE.",
        "Supply SA didn't need a chatbot that could talk. They needed one that could be trusted with a compliance-critical conversation, every single time.",
      ],
      bullets: [
        "Every first-time vendor needing live staff time just to learn what applied to them, before they'd even started gathering documents",
        "An earlier no-code prototype (Voiceflow) hitting a credit-cost wall — a naive one-question-per-document design would have run 30–40 screens per vendor, and per-conversation platform credits made that expensive to scale",
        "A worse failure mode than slowness: an LLM improvising or hallucinating which documents a vendor needs, or fabricating why a document is required, actively misleading vendors applying for a real government certification",
      ],
    },
    {
      id: "vision",
      step: "03",
      title: "The Vision",
      paragraphs: [
        "The goal was specific and uncompromising: replicate the judgment of a trained Certification Navigator, on demand, at zero marginal cost per conversation — without the system ever inventing a requirement, fabricating a reason, or overstepping into a determination that belongs to certification staff.",
      ],
      bullets: [
        "Compute exactly which documents apply to a given vendor's profile, with zero room for improvisation",
        "Explain why each document is required, grounded in real internal guidance — not the model's general knowledge",
        "Correctly distinguish certification (what Supply SA does) from contracting (what vendors separately register for elsewhere)",
        "Escalate cleanly to real staff for eligibility judgment calls and anything outside its scope",
        "Run continuously in production, not just survive a demo",
      ],
    },
    {
      id: "solution",
      step: "04",
      title: "The Solution",
      paragraphs: [
        "The central architectural decision: certification requirements are never decided by the language model. A branching rules engine — plain code, not a prompt — takes a vendor's profile and computes exactly which document groups apply. The model's only job is narrating that computed result conversationally. It cannot invent, omit, or guess at a requirement.",
        "This was not a demo bot. It was built to run continuously in a real, revenue- and compliance-relevant environment from day one.",
      ],
      bullets: [
        "Claude API (Haiku 4.5) for cost-optimized, high-volume conversational responses",
        "A deterministic JavaScript rules engine for all compliance-critical logic",
        "A dedicated knowledge-grounding layer sourced from three real internal documents: a 93-rule, 46-document-type validation workbook, the internal Certification Navigation SOP, and the live Supply SA FAQ page",
        "A Node.js/Express backend on Render, with a vanilla HTML/CSS/JS frontend embedded directly into the Supply SA WordPress site",
        "A live hallucination caught and root-caused — grounding architecture rebuilt so every “why” answer pulls from real source material",
        "A silent substring-matching bug caught in testing before it reached vendors",
        "Certification vs. contracting distinction scoped correctly in the bot's persona",
      ],
    },
    {
      id: "how-it-works",
      step: "05",
      title: "How It Works",
      paragraphs: [
        "Every vendor who opens the “Check Certification Readiness” flow is walked through profile questions — application type, certification sought, entity structure, industry, jurisdiction, ownership split — that branch automatically into only the document groups relevant to them, typically 7–11 screens instead of one per document. The flow ends in a tailored ready/missing summary. Renewals short-circuit into a separate, correct 6-item checklist instead of running the full new-applicant flow.",
        "When a vendor asks a free-text “why” question — why is this document required, what does it need to show — that question is matched against the grounded knowledge layer before the model responds, with an explicit instruction not to answer from anything outside that real text. Low-confidence answers, eligibility judgment calls, and any request to speak with staff route to a real handoff: a support email and the live Meet the Team page. No dead ends.",
      ],
    },
    {
      id: "results",
      step: "06",
      title: "Measurable Results",
      bullets: [
        "~34 hours of specialist time freed per month (10–15 vendors/week × 30–45 min/walkthrough, confirmed by Supply SA staff) — roughly $1,000/month, ~$11,500–12,000/year in staff capacity, redirected from repetitive walkthroughs to higher-value work.",
        "30–40 steps reduced to 7–11 screens, branching automatically based on the vendor's actual profile instead of running a fixed script.",
        "Fractions of a cent per conversation, with zero platform fee — the entire AI cost is metered Claude API token usage.",
        "Zero hallucinated compliance answers after the grounding architecture was rebuilt — every “why” answer traces to real internal source material.",
        "Live in production on supply-sa.org, available to every vendor visiting the site, with a built-in escalation path for anything outside the bot's scope.",
      ],
    },
    {
      id: "impact",
      step: "07",
      title: "Business Impact",
      paragraphs: [
        "What changed wasn't just call volume off a specialist's desk — it was the shape of their job. Routine, repetitive walkthroughs that consumed roughly a third of a specialist's week now run unattended, correctly, every time. The specialist time freed up goes toward the parts of the job that actually require a trained human: eligibility judgment calls, complex edge cases, and the relationship-building work of helping vendors succeed.",
        "For Supply SA, the certification process no longer scales linearly with staff headcount. A vendor at midnight gets the same correct, grounded answer a vendor gets at 10am on a Tuesday.",
      ],
    },
    {
      id: "why-it-matters",
      step: "08",
      title: "Why This Matters",
      paragraphs: [
        "For any organization whose value depends on correctly explaining a complex, rules-bound process — certification bodies, licensing boards, compliance-heavy services — the lesson generalizes: AI doesn't earn trust by being clever. It earns trust by being constrained. The parts of a system where being wrong has real consequences should run as auditable code with no model inference involved. The parts where natural language genuinely helps — explaining, reassuring, routing — are exactly where to point the AI, and nowhere else.",
        "This isn't a FAQ bot, and it isn't a demo. It's a production system handling a compliance-critical conversation correctly, at scale, with a documented track record of catching and fixing its own failure modes before they reached a vendor. Supply SA didn't just add a chatbot. They removed a staffing bottleneck — without trading away the accuracy their certification process depends on.",
      ],
    },
  ],
};

export const rentalOpsCaseStudy: CaseStudy = {
  slug: "rental-portfolio-ops-dashboard",
  title: "Rental Portfolio Ops Dashboard",
  subtitle:
    "A concept build: how a single relational Airtable base and a live Bolt dashboard could replace six disconnected spreadsheets for a small rental portfolio operator.",
  isConcept: true,
  conceptNote:
    "This was built as a self-initiated demonstration of the workflow pattern for small property managers and rental arbitrage operators. It is not attached to a paying client, and the metrics below are modeled estimates rather than confirmed results — the assumptions behind each number are stated explicitly so they can be verified or adjusted.",
  meta: [
    { label: "Sector", value: "Concept: Property Management" },
    { label: "Portfolio Size", value: "3–5 properties, 7–10 units (modeled)" },
    { label: "Location", value: "Hypothetical — portable to any market" },
    { label: "Built", value: "2026" },
    { label: "Core Features", value: "Relational Data Layer, Live Dashboard" },
    { label: "Status", value: "Concept Build — Live Demo" },
  ],
  stats: [
    {
      value: "~6 hrs/wk",
      label: "reclaimed from manual tracking & reporting (modeled)",
    },
    {
      value: "~310 hrs/yr",
      label: "redirected toward higher-value work (modeled)",
    },
    {
      value: "Zero",
      label: "duplicate data entry between database and dashboard",
    },
  ],
  phases: [
    {
      id: "summary",
      step: "01",
      title: "Executive Summary",
      paragraphs: [
        "Small rental portfolio operators — typically 3–5 properties, 5–10 units — usually run occupancy tracking, applicant screening, lease management, rent collection, and maintenance requests across a patchwork of spreadsheets, texts, and sticky notes. None of it lives in one place, so answering a basic question like \"which leases are expiring soon?\" means manually cross-referencing multiple sources.",
        "This concept build replaces that patchwork with a single relational Airtable base and a live, read-only dashboard hosted on Bolt. At an assumed 7–10 hours a week spent on manual tracking and reporting, the modeled result is roughly 6 hours a week reclaimed — about 310 hours a year redirected toward sourcing units, tenant relationships, or owner communication instead of spreadsheet reconciliation.",
      ],
    },
    {
      id: "problem",
      step: "02",
      title: "The Problem",
      paragraphs: [
        "The real cost of a spreadsheet-and-sticky-notes system isn't just the time spent compiling information for an owner update — it's the risk of missing something important, like a lease renewal deadline or a payment that's gone quiet, because nothing surfaces it automatically.",
      ],
      bullets: [
        "Occupancy, applicants, leases, payments, and maintenance tracked across disconnected spreadsheets, texts, and notes",
        "Every owner update or status check requires manually cross-referencing multiple sources",
        "No automatic surfacing of at-risk items — expiring leases, late payments — until someone goes looking",
        "An estimated 7–10 hours a week spent on manual tracking and reporting at this portfolio scale",
      ],
    },
    {
      id: "approach",
      step: "03",
      title: "The Approach",
      paragraphs: [
        "A single relational data layer instead of six disconnected spreadsheets. The foundation is an Airtable base with six linked tables — Properties, Units, Applicants, Leases, Payments, and Maintenance Requests — so a unit's status, its current lease, its payment history, and any open maintenance requests are all one click apart instead of living in separate files.",
        "Formula fields do the calculating instead of the person. Rather than manually figuring out how many days are left on a lease or how late a payment came in, three formula fields — Days Until Lease End, Days Late, and Turnaround Days — compute those automatically from the raw dates already being entered. The person keeps entering the same dates they always would; they just stop doing the subtraction by hand.",
        "Bolt as the presentation layer, not the source of truth. The Airtable base is the single source of truth; the Bolt-hosted dashboard reads from it live rather than duplicating data. That separation means the underlying data structure can be reused for other interfaces later — a client portal, a mobile view — without rebuilding the data model.",
        "Applicant stage as a first-class field, not a note. Applicant status is tracked as a structured single-select field (Inquiry → Screening → Approved → Denied → Leased) rather than freeform notes, which is what makes a funnel visualization possible on the dashboard side — a small schema decision that unlocks a specific reporting capability downstream.",
      ],
    },
    {
      id: "architecture",
      step: "04",
      title: "Architecture",
      bullets: [
        "Data layer: Airtable base — 6 linked tables (Properties, Units, Applicants, Leases, Payments, Maintenance Requests)",
        "Computed fields: Airtable formula fields (Days Until Lease End, Days Late, Turnaround Days)",
        "Presentation layer: dashboard hosted on Bolt, reading live from Airtable",
        "Relationships: Units → Properties, Applicants/Leases → Units, Payments → Leases, Maintenance → Units",
      ],
    },
    {
      id: "results",
      step: "05",
      title: "Modeled Results",
      paragraphs: [
        "As a concept build, these are modeled estimates based on the stated assumptions above — not confirmed client results.",
      ],
      bullets: [
        "~6 hrs/week reclaimed from manual tracking and reporting, based on a 3–5 property / 7–10 unit portfolio (assumes the dashboard removes the compilation and reporting layer, not raw data entry)",
        "~26 hrs/month, ~310 hrs/year redirected toward higher-value work — sourcing new units, tenant relationships, or owner communication — rather than spreadsheet reconciliation",
        "One live view for occupancy rate, applicant funnel, revenue vs. target rent, lease renewals at risk, maintenance turnaround, and late-payment rate — replacing five or six separate manual pulls",
        "Zero duplicate data entry between the operational database and the reporting layer, since the dashboard reads directly from Airtable",
      ],
    },
    {
      id: "why-it-matters",
      step: "06",
      title: "Why This Matters",
      paragraphs: [
        "For small operators, the barrier to a real operations system usually isn't willingness — it's the perceived cost of building one. This concept demonstrates that a relational data layer plus a lightweight live dashboard can be assembled quickly, without a custom backend, by making a few deliberate schema decisions upfront: link tables instead of duplicating data, compute derived fields instead of tracking them by hand, and keep a single source of truth even when there are multiple ways to view it.",
        "The same pattern generalizes past rental portfolios to any small operation running on scattered spreadsheets: the fix usually isn't more software, it's one well-modeled data layer with a live view on top of it.",
      ],
    },
  ],
};

export const marigoldMediumCaseStudy: CaseStudy = {
  slug: "marigold-medium",
  title: "Marigold Medium + Healing",
  subtitle:
    "How a solo practitioner moved off a rented Wix template onto a hand-coded, 10-page site she owns outright, with a 301-frame film that plays against the scroll and not a single third-party JavaScript library.",
  meta: [
    { label: "Client", value: "Jen-L Morris, Marigold Medium + Healing" },
    { label: "Sector", value: "Wellness / Solo Practitioner" },
    { label: "Team Size", value: "1" },
    { label: "Location", value: "Littleton, CO" },
    { label: "Core Features", value: "Scroll-Driven Film Homepage, 10-Page Static Site" },
    { label: "Status", value: "Live at jenlmorris.com" },
  ],
  stats: [
    {
      value: "301",
      label: "film frames scrubbed against the scroll on the homepage",
    },
    {
      value: "0",
      label: "JavaScript frameworks or third-party libraries shipped",
    },
    {
      value: "10",
      label: "pages hand-built to replace a rented template",
    },
  ],
  phases: [
    {
      id: "summary",
      step: "01",
      title: "Executive Summary",
      paragraphs: [
        "Jen-L Morris is a certified psychic-medium and licensed massage therapist working out of Littleton, Colorado. Her practice sat on a Wix template: fine for getting online, but a site she rented rather than owned, on a platform that decided what her homepage could do.",
        "The rebuild is a 10-page static site written by hand. The homepage opens on a continuous film that runs frame by frame against the scroll, plays once, and never replays. Everything ships as HTML, CSS, and vanilla JavaScript, with the domain, repository, and source code transferred into the client's own accounts at handoff.",
      ],
    },
    {
      id: "problem",
      step: "02",
      title: "The Problem",
      paragraphs: [
        "The work of a medium is hard to explain in a paragraph. What it needs is a feeling, established before anyone reads a word. A template builder cannot deliver that, because the interesting part of the page is the part the template will not let you touch.",
      ],
      bullets: [
        "The site lived on a rented platform, so the practice did not own its own storefront",
        "Template constraints ruled out the one thing the brand most needed: a genuinely cinematic opening",
        "Platform page weight and third-party scripts sat outside the practitioner's control",
        "Moving off later meant a domain, DNS, and hosting migration nobody had scoped",
      ],
    },
    {
      id: "approach",
      step: "03",
      title: "The Approach",
      paragraphs: [
        "Build the feeling first, then hang the site on it. The concept was one unbroken shot called The Marigold Path: a dusk marigold field, a dive into a single bloom, a petal veil, a candle flame, a reading table. Footage was generated and mastered at 1080p, then exported to 301 stills so the browser could scrub it like film rather than play it like video.",
        "Play once, then get out of the way. An early build tied the film to the scrollbar in both directions, which made the homepage feel like a toy. The shipped version plays the film one time on the first scroll, lands the visitor in the content, and returns to the still field hero if they scroll back up. It never replays.",
        "Never freeze the frame. A draft paused the film dead on each line of text so it could be read. The client's note was that the stopping broke the spell, so the timeline was rebuilt to glide quickly between beats and crawl slowly through each one. The film always moves, and the text still holds long enough to read.",
        "No frameworks, on purpose. Nothing on the page comes from a CDN or a package. A solo practitioner should not inherit a dependency tree she has no way to maintain, and a site with no build step is a site that still works in five years.",
      ],
    },
    {
      id: "architecture",
      step: "04",
      title: "Architecture",
      bullets: [
        "Homepage film: 301 stills drawn to a canvas element, advanced by a scroll-driven timeline in vanilla JavaScript",
        "Progressive reveal: the page unlocks after buffering the first 24 frames and streams the remaining frames in the background, falling back to the nearest loaded frame while drawing",
        "Pages: 10 hand-written HTML documents sharing one CSS custom-property token set for color, type, and spacing",
        "Type: Fraunces for headings, Jost for body, Pinyon Script for the name lockup",
        "Contact: FormSubmit posting to the practice inbox; booking hands off to her existing Vagaro scheduler",
        "Hosting: Porkbun static hosting, auto-publishing on every push from the client's own GitHub repository",
      ],
    },
    {
      id: "shipped",
      step: "05",
      title: "What Shipped",
      bullets: [
        "A play-once film homepage with a skip control, a still hero to return to, and no replay on back-scroll",
        "Nine content pages covering offerings, readings, coaching, energy work, ingredients, resources, about, contact, and terms",
        "A multi-column footer and a full top navigation with a dropdown, built in CSS with no JavaScript",
        "Verified at 375px with no horizontal overflow, on top of a mobile menu that scrolls when the link list runs long",
        "A full migration off Wix: domain, DNS, and hosting moved, with the repository transferred to the client's GitHub account",
      ],
    },
    {
      id: "why-it-matters",
      step: "06",
      title: "Why This Matters",
      paragraphs: [
        "The pitch for a template builder is that it is cheaper. The cost it hides is that the practice never owns the thing customers judge it by, and the most distinctive idea it has is usually the exact idea the template forbids.",
        "This build is the counter-argument. The animation that makes the homepage worth remembering is under three hundred lines of plain JavaScript over a canvas element. There is no framework to upgrade, no plugin to renew, no platform to ask permission from. When the work was done, everything got handed over: the domain, the repository, and the code. That is the difference between a site you rent and a site you own.",
      ],
    },
  ],
};

export const coldEmailPersonalizerCaseStudy: CaseStudy = {
  slug: "cold-email-personalizer",
  title: "Cold Email Personalizer",
  subtitle:
    "A lead-to-draft outbound system tested against a real, verified 270-lead list, where every draft traced back to something actually on the lead's own website.",
  isConcept: true,
  conceptNote:
    "A self-directed build, not a client engagement. The lead sourcing and draft figures below come from an actual run against a real, verified list rather than modeled math, but the system has not been deployed for a named client. The pipeline deliberately stops at Airtable instead of connecting a sender.",
  meta: [
    { label: "Sector", value: "Concept: Any outbound sales operation" },
    { label: "Lead List", value: "500 sourced, 270 verified (real data)" },
    { label: "Built", value: "2026" },
    { label: "Core Feature", value: "Scrape-grounded writing with a fact ban" },
    { label: "Review", value: "Airtable gate before anything sends" },
    { label: "Status", value: "Tested on a real list, not client-deployed" },
  ],
  stats: [
    {
      value: "500 → 270",
      label: "raw leads cleaned to unique, verified-email leads",
    },
    {
      value: "Zero",
      label: "invented details across the tested batch",
    },
    {
      value: "8",
      label: "target industries filtered before a single draft",
    },
  ],
  phases: [
    {
      id: "summary",
      step: "01",
      title: "Executive Summary",
      paragraphs: [
        "This build turns a raw lead list into a folder of cold email drafts that each reference something real about the business they are going to. Every lead's company domain gets scraped for actual page copy before the writing model sees the row, which narrows the model's job to connecting what is genuinely there instead of guessing what a company like this probably does.",
        "It was tested end to end against a real, verified list: 500 raw leads sourced across eight target industries, cleaned and deduplicated down to 270 unique leads with verified emails. Every draft in the tested batch traced back to something actually on the lead's website. The pipeline stops at Airtable on purpose. Nothing sends without a human reading it first.",
      ],
    },
    {
      id: "problem",
      step: "02",
      title: "The Problem",
      paragraphs: [
        "Cold email personalization tends to fail in one of two directions. The cheap version is mail-merge: swap in a name and a company, keep the same six sentences for everyone, and hope volume covers for the fact that it reads like a template. The expensive version throws a model at the problem and asks it to personalize, which sounds better right up until it invents a product line the company does not have or a recent expansion that never happened.",
      ],
      bullets: [
        "A prospect who gets an email that is wrong about their own business trusts the sender less than one who got a generic template",
        "Researching each lead's site by hand for one honest hook works, but it does not scale past a handful of sends a day",
        "The model needs real, defensible context at list volume, without quietly filling gaps with plausible-sounding fiction",
      ],
    },
    {
      id: "approach",
      step: "03",
      title: "The Approach",
      paragraphs: [
        "Scrape before writing, not instead of it. Every lead's company domain gets scraped for real homepage or about-page copy before the writing model ever sees the row. The model summarizes and connects what is actually on the page. It is not asked to know anything it was not handed.",
        "A hallucination bug traced to its root, not patched over. An earlier version had a quiet failure: when a scrape failed, the error message itself got passed downstream as if it were page content, and the writing model dutifully personalized against garbage. The fix was not a better prompt. It was making the scrape step fail loudly and skip the row cleanly, so the model only ever sees real content or nothing at all.",
        "Airtable as the review gate, not the send button. Every generated draft, subject and body both, lands in Airtable next to the lead's info, and nothing connects to a sending tool at this stage. That seam is deliberate. Getting to a batch of drafts worth reading is one problem. Deciding to send is a different one, and it belongs to a person.",
        "Dedupe before the list loads, not after drafts exist. Leads are deduplicated by email before they enter the sheet the workflow reads from. That is what turned 500 raw scraped leads into a clean list of 270, rather than 500 rows with a chunk of quiet duplicates burning API calls twice.",
      ],
    },
    {
      id: "architecture",
      step: "04",
      title: "Architecture",
      bullets: [
        "Lead sourcing: Apify (microworlds/leads-finder), an Apollo alternative that needs no Apollo login",
        "Filtering: job title, company size (1 to 10 and 11 to 20 employees), US-based, eight target industries, verified-email status only",
        "Automation: n8n, a single batch-loop workflow",
        "Context gathering: a per-lead website scrape of homepage and about-page copy",
        "Writing: GPT-4.1-mini, one generation per lead, with a voice-fenced and fact-fenced system prompt",
        "Review: an Airtable draft table with human approval before any send tool is connected",
      ],
    },
    {
      id: "results",
      step: "05",
      title: "Results",
      paragraphs: [
        "These come from an actual run against a real, verified lead list rather than modeled math. They are still concept-build results, not a client engagement outcome.",
      ],
      bullets: [
        "500 raw leads sourced across eight target industries, cleaned and deduplicated to 270 unique, verified-email leads",
        "The scrape-error bug caught and fixed at the source, so a failed scrape now skips the row instead of feeding the model its own error message",
        "Every draft in the tested batch grounded in real scraped site copy, with the never-invent-facts rule holding across the run",
        "The pipeline stops at Airtable. Scaling to the full list and connecting a sender are the two remaining, deliberately separate steps",
      ],
    },
    {
      id: "why-it-matters",
      step: "06",
      title: "Why This Matters",
      paragraphs: [
        "The interesting work here was not the writing step. It was the bug. A scrape that failed silently and handed its own error message to the model looks fine in testing: you get a draft, it reads like an email, nothing throws. It is only wrong. Fixing that at the root instead of writing a cleverer prompt is the difference between a batch you skim and approve and a batch you have to fact-check line by line.",
        "The ban on inventing facts is what makes the review step cheap. Because the model can only write from what was actually scraped, a human reading the batch is checking tone, not accuracy. That is also why the build stops at Airtable rather than wiring in a sender. Getting to drafts worth reading is one problem, and deciding to send is a different one.",
      ],
    },
  ],
};

export const proposalAutopilotCaseStudy: CaseStudy = {
  slug: "proposal-autopilot",
  title: "Proposal Autopilot",
  subtitle:
    "A discovery-call-to-PDF proposal system built in n8n. It reads the call transcript, drafts the proposal from what was actually said, and sends the finished PDF, with nobody replaying the recording.",
  isConcept: true,
  conceptNote:
    "Adapted from an internal course project and rebuilt with real bug fixes and a different architecture. The test result is a confirmed fact from the build log: 14 of 14 nodes succeeded on a manual run and the finished PDF landed in the test inbox. The time-saved and monthly-volume figures are illustrative estimates, not numbers confirmed by a client.",
  meta: [
    { label: "Sector", value: "Concept: Any operation running discovery calls" },
    { label: "Built", value: "2026" },
    { label: "Test Run", value: "14 of 14 nodes passed (execution 2017)" },
    { label: "Core Feature", value: "One AI call, fenced to the transcript" },
    { label: "Tooling Cost", value: "$0 in paid design tooling" },
    { label: "Status", value: "Tested end to end, not client-deployed" },
  ],
  stats: [
    {
      value: "14/14",
      label: "nodes passed on an end-to-end run",
    },
    {
      value: "1",
      label: "AI call instead of two, removing a failure mode at no cost",
    },
    {
      value: "~6–8 hrs/mo",
      label: "redirected from drafting and formatting (modeled)",
    },
  ],
  phases: [
    {
      id: "summary",
      step: "01",
      title: "Executive Summary",
      paragraphs: [
        "The moment a client record is marked ready in Airtable, this system finds the matching call in Fireflies, pulls the full transcript, and hands it to Claude. Claude drafts four sections from the conversation itself. A code node assembles those sections into a branded HTML proposal using the client's name, business, and logo already sitting in Airtable, converts it to a PDF, and emails it.",
        "Nobody opens a template. Nobody replays a recording to remember what was quoted. It was tested end to end on a manual run against a test client record: all 14 nodes succeeded, the transcript matched correctly, and the finished PDF, logo and pricing included, landed in the inbox.",
      ],
    },
    {
      id: "problem",
      step: "02",
      title: "The Problem",
      paragraphs: [
        "After a discovery call, someone has to turn a conversation into a document: replay the call, draft what was discussed, make it look professional, and get it into the client's inbox before the moment cools off. None of that work is hard. All of it is manual, all of it repeats for every prospect, and all of it competes with the time that should go to the next call.",
      ],
      bullets: [
        "The failure mode is usually not a bad proposal. It is a slow one, or an inconsistent one",
        "The person writing it is working from memory of a conversation that happened hours or days earlier",
        "Every proposal is the same four questions answered from scratch, by hand, exactly when attention is worth the most elsewhere",
      ],
    },
    {
      id: "approach",
      step: "03",
      title: "The Approach",
      paragraphs: [
        "One AI call, constrained to the words already spoken. Claude reads the full transcript and drafts four sections: What We Discussed, Key Takeaways, What Happens Next, and Pricing. The system prompt instructs it to work only from the transcript, so the proposal cannot quote a number or a commitment that never came up on the call.",
        "Deterministic HTML, not a second AI call. The original version used a second model call to turn the drafted JSON into HTML, and that is where most of the debugging time went: broken image tags, escaped characters, output that would not start with an html tag no matter how the prompt was worded. Replacing that step with a code node that assembles the HTML directly from Airtable fields plus the drafted sections removed an entire category of failure at zero extra cost.",
        "Transcript matching by content, not position. The original build filtered on the first transcript in the account. That works by coincidence when there is exactly one call on file and breaks silently the moment there is a second. It was replaced with a code node that searches the full transcript list for a title containing the client's email and throws a loud error if nothing matches. A wrong proposal is worse than a failed run, and a failed run is at least visible.",
        "Real bugs, caught in testing rather than production. Airtable's API returns record data nested under .fields rather than flat on the record, so every expression reading Airtable data had to be corrected after a full failed run surfaced it. A later, unrelated node edit silently dropped the Gmail node's operation parameter. And PDF.co's authentication needs the API key in a header literally named x-api-key, not a Bearer-prefixed token, which looks like a broken integration until you know it.",
      ],
    },
    {
      id: "architecture",
      step: "04",
      title: "Architecture",
      bullets: [
        "Trigger: manual for testing, an Airtable status-change automation in production",
        "Client data: an Airtable Clients table holding email, name, business, and logo",
        "Call transcript: the Fireflies GraphQL API, matched by client email in the transcript title",
        "Drafting: Claude in an AI Agent node with a Structured Output Parser, returning four labeled sections as JSON",
        "Document build: a code node assembling branded HTML from Airtable fields plus the drafted sections",
        "PDF conversion: PDF.co, HTML to PDF on the free tier, with no paid design tooling required",
        "Delivery: Gmail OAuth2, sending the PDF to the client's email on file",
      ],
    },
    {
      id: "results",
      step: "05",
      title: "Results",
      paragraphs: [
        "The test result is a confirmed fact from the build log. The time and volume figures are illustrative estimates, not client-confirmed numbers.",
      ],
      bullets: [
        "14 of 14 nodes succeeded on a manual end-to-end run against a test client record, with the transcript matched correctly and the finished PDF landing in the test inbox",
        "One AI call instead of two, removing the HTML-generation failure mode entirely at no added cost",
        "Zero paid design tooling, running on PDF.co's free tier rather than a paid subscription",
        "Roughly 45 to 60 minutes of drafting, formatting, and sending removed per proposal, modeled at about 8 discovery calls a month",
      ],
    },
    {
      id: "why-it-matters",
      step: "06",
      title: "Why This Matters",
      paragraphs: [
        "The interesting decision here was taking work away from the AI. A second model call to write the HTML sounds like the modern answer, and it is the part that broke constantly: tags that would not close, characters that escaped themselves, output that refused to start where it was told. Handing that job to a code node made the proposal render correctly every time, for free. Claude writes the words. The system builds the document.",
        "The transcript matching is the same lesson in a different place. Grabbing the first transcript in the account passes every test you run with one call on file, then quietly sends the wrong client the wrong proposal the day there are two. Matching on the client's email and throwing a loud error when nothing matches means the system fails visibly instead of confidently. That is the trade worth making every time.",
      ],
    },
  ],
};

export const knowledgeAssistantCaseStudy: CaseStudy = {
  slug: "document-knowledge-assistant",
  title: "Document Knowledge Assistant",
  subtitle:
    "A concept build: turning a company's own contracts, manuals, and transcripts into an assistant that answers in seconds, grounded in the source material and honest when the answer is not there.",
  isConcept: true,
  conceptNote:
    "Built as a self-initiated demonstration of the pattern for document-heavy businesses. It is not attached to a paying client, and the figures below describe the capability of the architecture rather than confirmed results from a specific engagement.",
  meta: [
    { label: "Sector", value: "Concept: Any document-heavy business" },
    { label: "Knowledge Source", value: "Unstructured docs (PDFs, transcripts, manuals)" },
    { label: "Built", value: "2026" },
    { label: "Core Feature", value: "Retrieval with a reranking pass" },
    { label: "Interface", value: "One webhook endpoint, any front end" },
    { label: "Status", value: "Working demo, not client-deployed" },
  ],
  stats: [
    {
      value: "Seconds",
      label: "to a sourced answer instead of manual searching",
    },
    {
      value: "1 drop",
      label: "a new file updates the whole knowledge base",
    },
    {
      value: "2-stage",
      label: "retrieval: wide recall, then reranked for precision",
    },
  ],
  phases: [
    {
      id: "summary",
      step: "01",
      title: "Executive Summary",
      paragraphs: [
        "Most businesses of any age are sitting on a pile of documents that hold the answers people need: contracts, manuals, policies, past proposals, training material, transcripts. The knowledge is there. Finding it means someone opening files and reading until they land on the right paragraph.",
        "This concept build turns that document pile into an assistant. Ask a plain-language question and it returns an answer drawn only from the company's own material, in seconds. Add a new file to a watched folder and it folds into the knowledge base automatically, with no retraining and no manual upkeep.",
      ],
    },
    {
      id: "problem",
      step: "02",
      title: "The Problem",
      paragraphs: [
        "The cost of buried knowledge is quiet but real. It is the new hire who cannot find the standard clause and asks a partner. It is the same question answered five different ways because nobody can point to the source. It is a shelf of policy PDFs that only gets read when someone is already in trouble.",
      ],
      bullets: [
        "Answers live inside long documents nobody has time to read end to end",
        "The same questions get asked and re-answered because the source is hard to locate",
        "Generic AI tools make confident guesses instead of citing the company's actual material",
        "The knowledge walks out the door when the person holding it leaves",
      ],
    },
    {
      id: "approach",
      step: "03",
      title: "The Approach",
      paragraphs: [
        "Retrieval instead of a bigger prompt. Documents are broken into overlapping chunks, turned into mathematical representations, and stored in a vector database. When a question comes in, the system pulls only the handful of passages actually relevant to it rather than trying to stuff an entire library into the model. That is what keeps answers fast and grounded no matter how large the document set grows.",
        "A reranking step for precision, not just recall. A first pass gathers a wide net of possibly relevant passages. A second model then re-scores that set and keeps only the few that best answer the specific question. This two-stage retrieval is the difference between an assistant that is roughly on topic and one that is actually correct.",
        "Grounded answers, with the honesty to say it is not there. The assistant is instructed to answer only from the passages it retrieved, and to say plainly when the answer is not in the material. That single design choice is what makes it safe to put in front of staff or clients. It does not invent. It reports.",
        "The assistant is a service, separate from its face. The knowledge engine sits behind a single endpoint that any front end can call: a web app, a chat widget, an internal tool. The interface can change without touching the pipeline, and the pipeline can serve several interfaces at once.",
      ],
    },
    {
      id: "architecture",
      step: "04",
      title: "Architecture",
      bullets: [
        "Ingestion trigger: a watched cloud folder, where new files enter the pipeline automatically",
        "Chunking and embedding: documents split into overlapping chunks and embedded into vectors",
        "Vector store: Supabase with pgvector and a similarity match function",
        "Retrieval and rerank: a wide set of matches pulled, then re-scored by a reranker for relevance",
        "Generation: a language model answering strictly from the reranked passages",
        "Memory: per-user conversation history so follow-up questions keep context",
        "Interface: a single webhook endpoint any front end can call",
      ],
    },
    {
      id: "delivers",
      step: "05",
      title: "What It Delivers",
      paragraphs: [
        "As a concept build, these describe the capability of the pattern rather than confirmed results from a specific engagement.",
      ],
      bullets: [
        "Seconds from a plain-language question to a sourced answer, instead of minutes of opening and scanning files",
        "One drop: a file added to the watched folder is chunked, embedded, and searchable with no manual upkeep",
        "Answers drawn only from the company's own documents, with the assistant saying when something is not covered",
        "The same knowledge engine powering a public widget, an internal tool, and a client portal from one endpoint",
      ],
    },
    {
      id: "why-it-matters",
      step: "06",
      title: "Why This Matters",
      paragraphs: [
        "The instinct with a document problem is to buy more software or reorganize the folders again. Usually the fix is different: take the material you already have and make it answerable. Retrieval with a reranking step, grounded generation, and a clean interface is enough to turn a static archive into something a person can simply ask.",
        "This pattern is not right for every case. A short, fixed set of facts belongs in a simple assistant, and structured records belong in a database. It earns its place when the knowledge is large, unstructured, and buried in prose. When someone says the answer is in there somewhere but nobody can find it, this is the build that fixes it.",
      ],
    },
  ],
};

const caseStudies: Record<string, CaseStudy> = {
  [supplySaCaseStudy.slug]: supplySaCaseStudy,
  [rentalOpsCaseStudy.slug]: rentalOpsCaseStudy,
  [marigoldMediumCaseStudy.slug]: marigoldMediumCaseStudy,
  [coldEmailPersonalizerCaseStudy.slug]: coldEmailPersonalizerCaseStudy,
  [proposalAutopilotCaseStudy.slug]: proposalAutopilotCaseStudy,
  [knowledgeAssistantCaseStudy.slug]: knowledgeAssistantCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
