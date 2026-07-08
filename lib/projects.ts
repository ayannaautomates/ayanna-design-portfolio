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
