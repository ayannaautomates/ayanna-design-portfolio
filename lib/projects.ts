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
};

export const projects: Project[] = [
  {
    slug: "supply-sa-vendor-assistant",
    title: "Supply SA Vendor Assistant",
    year: 2026,
    category: "AI Chatbot",
    description:
      "A production AI chatbot for a government certification agency, replacing a manual document walkthrough.",
    longDescription:
      "Supply SA Vendor Assistant is a production AI chatbot built for a government certification agency, replacing a manual, specialist-led document walkthrough. It runs a deterministic JavaScript rules engine for certification logic — the AI never decides what documents a vendor needs, only explains the result — grounded in real internal source material to eliminate hallucination risk. The guided flow branches a 30–40 step process down to 7–11 screens per vendor, freeing an estimated 34 hours of specialist time a month (~$11,500–12,000/year in staff capacity), and runs live on supply-sa.org for fractions of a cent per conversation.",
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
