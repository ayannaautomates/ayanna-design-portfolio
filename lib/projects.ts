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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
