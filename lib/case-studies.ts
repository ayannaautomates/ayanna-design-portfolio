export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyQuote = {
  text: string;
  attribution: string;
};

export type CaseStudySection = {
  id: string;
  label: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: CaseStudyQuote;
};

export type CaseStudy = {
  slug: string;
  headline: string;
  subtitle: string;
  meta: Array<{ label: string; value: string }>;
  stats: CaseStudyStat[];
  sections: CaseStudySection[];
};

export const supplySaCaseStudy: CaseStudy = {
  slug: "supply-sa-vendor-assistant",
  headline: "Closing the Gap Between Owning AI and Having It Actually Work",
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
  sections: [
    {
      id: "summary",
      label: "EXECUTIVE SUMMARY",
      title: "Executive Summary",
      paragraphs: [
        "Supply SA partnered with Soulwire Studio to eliminate a costly bottleneck in its vendor certification process: every applicant's first step was a live, one-on-one walkthrough with a staff specialist, just to learn which of 40+ possible documents applied to their situation. At 10–15 vendors a week and 30–45 minutes per walkthrough, that bottleneck was consuming roughly 34 hours of specialist time every month — confirmed by Supply SA staff — time that didn't require specialist judgment, only correctly-sequenced information.",
        "The solution was a production AI chatbot, live on supply-sa.org, that runs the same walkthrough automatically, around the clock. The result: a 30–40 step manual process compressed into a 7–11 screen guided flow, zero hallucinated compliance answers, and no added headcount.",
      ],
    },
    {
      id: "problem",
      label: "THE PROBLEM",
      title: "Real Specialist Knowledge, Locked Behind a Live Conversation",
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
      label: "THE VISION",
      title: "Automate the Walkthrough Without Losing the Nuance",
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
      label: "THE SOLUTION",
      title: "A Deterministic Core With an AI Voice",
      paragraphs: [
        "The central architectural decision: certification requirements are never decided by the language model. A branching rules engine — plain code, not a prompt — takes a vendor's profile and computes exactly which document groups apply. The model's only job is narrating that computed result conversationally. It cannot invent, omit, or guess at a requirement.",
        "This was not a demo bot. It was built to run continuously in a real, revenue- and compliance-relevant environment from day one.",
      ],
      bullets: [
        "Claude API (Haiku 4.5) for cost-optimized, high-volume conversational responses",
        "A deterministic JavaScript rules engine for all compliance-critical logic",
        "A dedicated knowledge-grounding layer sourced from three real internal documents: a 93-rule, 46-document-type validation workbook, the internal Certification Navigation SOP, and the live Supply SA FAQ page",
        "A Node.js/Express backend on Render, with a vanilla HTML/CSS/JS frontend embedded directly into the Supply SA WordPress site",
      ],
    },
    {
      id: "how-it-works",
      label: "HOW IT WORKS",
      title: "How It Works",
      paragraphs: [
        "Every vendor who opens the “Check Certification Readiness” flow is walked through profile questions — application type, certification sought, entity structure, industry, jurisdiction, ownership split — that branch automatically into only the document groups relevant to them, typically 7–11 screens instead of one per document. The flow ends in a tailored ready/missing summary. Renewals short-circuit into a separate, correct 6-item checklist instead of running the full new-applicant flow.",
        "When a vendor asks a free-text “why” question — why is this document required, what does it need to show — that question is matched against the grounded knowledge layer before the model responds, with an explicit instruction not to answer from anything outside that real text. Low-confidence answers, eligibility judgment calls, and any request to speak with staff route to a real handoff: a support email and the live Meet the Team page. No dead ends.",
      ],
    },
    {
      id: "differentiators",
      label: "WHAT MAKES IT DIFFERENT",
      title: "What Makes This System Different",
      quote: {
        text: "This is AMAZING!",
        attribution: "Melanie M., Executive Director, Supply SA",
      },
      paragraphs: [
        "This wasn't “LLM plus prompt.” The build process surfaced and fixed two real production issues that a less rigorous build would have shipped with:",
      ],
      bullets: [
        "A live hallucination, caught and root-caused. Asked what a bank letter was for, the model invented a plausible-sounding but false explanation involving ACH payment setup. The real reason — verifying the business bank account and initial capital contribution — existed elsewhere in the system but wasn't connected to that code path. The fix wasn't a better prompt; it was a rebuilt grounding architecture so every “why” answer pulls from real source material.",
        "A silent matching bug. A substring-matching bug (“office” falsely matching inside “officers”) would have quietly reintroduced bad answers if left unaddressed — caught through direct testing, not user complaints.",
        "Correct scoping of a sensitive distinction. Early responses blurred certification with contracting, implying certified vendors were “registered to bid.” The bot's core persona was rewritten to state the distinction explicitly, while still pointing vendors toward a Procurement Navigator for real contract opportunities.",
      ],
    },
    {
      id: "results",
      label: "MEASURABLE RESULTS",
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
      label: "BUSINESS IMPACT",
      title: "Business Impact",
      paragraphs: [
        "What changed wasn't just call volume off a specialist's desk — it was the shape of their job. Routine, repetitive walkthroughs that consumed roughly a third of a specialist's week now run unattended, correctly, every time. The specialist time freed up goes toward the parts of the job that actually require a trained human: eligibility judgment calls, complex edge cases, and the relationship-building work of helping vendors succeed.",
        "For Supply SA, the certification process no longer scales linearly with staff headcount. A vendor at midnight gets the same correct, grounded answer a vendor gets at 10am on a Tuesday.",
      ],
    },
    {
      id: "why-it-matters",
      label: "WHY THIS MATTERS",
      title: "Why This Matters",
      paragraphs: [
        "For any organization whose value depends on correctly explaining a complex, rules-bound process — certification bodies, licensing boards, compliance-heavy services — the lesson generalizes: AI doesn't earn trust by being clever. It earns trust by being constrained. The parts of a system where being wrong has real consequences should run as auditable code with no model inference involved. The parts where natural language genuinely helps — explaining, reassuring, routing — are exactly where to point the AI, and nowhere else.",
      ],
    },
    {
      id: "takeaway",
      label: "THE TAKEAWAY",
      title: "The Takeaway",
      paragraphs: [
        "This isn't a FAQ bot, and it isn't a demo. It's a production system handling a compliance-critical conversation correctly, at scale, with a documented track record of catching and fixing its own failure modes before they reached a vendor.",
        "Supply SA didn't just add a chatbot. They removed a staffing bottleneck — without trading away the accuracy their certification process depends on.",
      ],
    },
  ],
};

const caseStudies: Record<string, CaseStudy> = {
  [supplySaCaseStudy.slug]: supplySaCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
