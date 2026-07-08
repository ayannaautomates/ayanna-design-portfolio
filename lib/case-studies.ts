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

const caseStudies: Record<string, CaseStudy> = {
  [supplySaCaseStudy.slug]: supplySaCaseStudy,
  [rentalOpsCaseStudy.slug]: rentalOpsCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
