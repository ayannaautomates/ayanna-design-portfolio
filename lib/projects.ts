export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  isConcept?: boolean;
};

export const projects: Project[] = [
  {
    slug: "supply-sa-vendor-assistant",
    title: "Supply SA Vendor Chatbot",
    year: 2026,
    category: "AI Chatbot",
    description:
      "A production AI chatbot that replaced a 30–45 minute manual certification walkthrough — zero hallucinated compliance answers.",
    longDescription:
      "Supply SA Vendor Assistant is a production AI chatbot built for a government certification agency. A deterministic rules engine computes document requirements; the AI only explains the result, grounded in real internal source material.",
    image: "/projects/supply-sa-vendor-assistant.png",
    tags: [
      "Claude API",
      "Node.js",
      "Express",
      "Render",
      "Vanilla JS",
      "WordPress",
      "GitHub",
    ],
    liveUrl: "https://supply-sa.org/",
    githubUrl: "https://github.com/ayannaautomates/supply-sa-bot",
  },
  {
    slug: "cold-email-personalizer",
    title: "Cold Email Personalizer",
    year: 2026,
    category: "Concept Build",
    description:
      "Tested against a real 270-lead list: every cold email draft grounded in the lead's own site copy, with zero invented details.",
    longDescription:
      "A lead-to-draft outbound system built in n8n. Every lead's site is scraped before the writing model sees the row, so the model connects real facts instead of guessing. An earlier version quietly fed the model its own scrape error as if it were page content; that was fixed at the root rather than papered over with better prompt wording. The pipeline deliberately stops at an Airtable review gate instead of connecting a sender.",
    image: "/projects/cold-email-personalizer.svg",
    tags: [
      "n8n",
      "Apify",
      "GPT-4.1-mini",
      "Airtable",
      "Google Sheets",
      "Web Scraping",
    ],
    liveUrl: "",
    githubUrl: "",
    isConcept: true,
  },
  {
    slug: "proposal-autopilot",
    title: "Proposal Autopilot",
    year: 2026,
    category: "Concept Build",
    description:
      "A finished discovery call becomes a branded PDF proposal, with nobody replaying the recording. 14 of 14 nodes passed end to end.",
    longDescription:
      "An n8n system that turns a discovery call into a delivered proposal. It matches the call in Fireflies by the client's email, hands the transcript to Claude for four drafted sections, then builds the branded HTML in a code node rather than a second AI call. That swap removed an entire category of failure at no added cost. PDF.co renders it and Gmail sends it.",
    image: "/projects/proposal-autopilot.svg",
    tags: [
      "n8n",
      "Claude API",
      "Airtable",
      "Fireflies",
      "PDF.co",
      "Gmail API",
    ],
    liveUrl: "",
    githubUrl: "",
    isConcept: true,
  },
  {
    slug: "document-knowledge-assistant",
    title: "Document Knowledge Assistant",
    year: 2026,
    category: "Concept Build",
    description:
      "A retrieval assistant over a company's own documents: two-stage search with a reranking pass, answering only from the source material.",
    longDescription:
      "A concept build that turns a pile of contracts, manuals, policies, and transcripts into something a person can simply ask. Files dropped in a watched folder are chunked, embedded, and stored in Supabase with pgvector. A question pulls a wide set of candidate passages, a reranker re-scores them for precision, and the model answers strictly from what came back, saying plainly when the answer is not in the material.",
    image: "/projects/document-knowledge-assistant.svg",
    tags: [
      "n8n",
      "Supabase",
      "pgvector",
      "OpenAI Embeddings",
      "Cohere Rerank",
      "RAG",
    ],
    liveUrl: "",
    githubUrl: "",
    isConcept: true,
  },
  {
    slug: "lets-ask-spirit",
    title: "Let's Ask Spirit",
    year: 2026,
    category: "Web Design",
    description:
      "A Wix site rebuilt by hand for a grief-adjacent practice, audited to WCAG 2.1 AA and shipped with a strict content security policy and no trackers of any kind.",
    longDescription:
      "Let's Ask Spirit is a seven-page website for Michael Edsel, an evidential psychic medium in rural Virginia. The homepage opens on a doorway that swings wide as you scroll, drawn frame by frame on a canvas with no framework behind it. Under that, the parts nobody photographs: every Level A and AA accessibility barrier found and closed before launch, a homepage cut from 11.2 MB to 4.8 MB, a content security policy with no unsafe-inline, and a site that sets no tracking cookies and loads no analytics at all. People arrive here after a death. The site is built to be quiet, fast, and private for them.",
    image: "/projects/lets-ask-spirit.png",
    tags: [
      "HTML",
      "CSS",
      "Vanilla JS",
      "Canvas API",
      "WCAG 2.1 AA",
      "Content Security Policy",
      "Netlify",
      "FormSubmit",
      "Schema.org",
    ],
    liveUrl: "https://www.letsaskspirit.com/",
    githubUrl: "",
  },
  {
    slug: "marigold-medium",
    title: "Marigold Medium + Healing",
    year: 2026,
    category: "Web Design",
    description:
      "A rented Wix template replaced with a hand-coded site the client owns outright, fronted by a 301-frame film that plays on scroll.",
    longDescription:
      "Marigold Medium + Healing is a 10-page website built from scratch for Jen-L Morris, a certified psychic-medium and licensed massage therapist in Littleton, Colorado. The homepage opens on a continuous film that scrubs frame by frame against the scroll, drawn on a canvas element with no framework and no third-party JavaScript. The domain, the repository, and the source code all sit in the client's name.",
    image: "/projects/marigold-medium.png",
    tags: [
      "HTML",
      "CSS",
      "Vanilla JS",
      "Canvas API",
      "Higgsfield Seedance",
      "Porkbun Static Hosting",
      "GitHub",
      "FormSubmit",
    ],
    liveUrl: "https://jenlmorris.com/",
    githubUrl: "",
  },
  {
    slug: "rental-portfolio-ops-dashboard",
    title: "Rental Portfolio Ops Dashboard",
    year: 2026,
    category: "Concept Build",
    description:
      "A concept build: an Airtable-backed operations dashboard for small rental portfolios, deployed on Bolt — reclaiming an estimated 6 hrs/week from manual tracking.",
    longDescription:
      "Rental Portfolio Ops Dashboard is a self-initiated concept build for small property managers and rental arbitrage operators. A single relational Airtable base (Properties, Units, Applicants, Leases, Payments, Maintenance Requests) replaces six disconnected spreadsheets, with formula fields computing lease timelines, late payments, and maintenance turnaround automatically. A Bolt-hosted dashboard reads live from Airtable as the presentation layer, surfacing occupancy, applicant funnel, revenue vs. target, and renewal risk in one view.",
    image: "/projects/rental-portfolio-ops-dashboard.png",
    tags: ["Airtable", "Bolt", "Relational Data Modeling", "Dashboard Design"],
    liveUrl: "https://ai-airtable-dashboar-sx6b.bolt.host/",
    githubUrl: "",
    isConcept: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
