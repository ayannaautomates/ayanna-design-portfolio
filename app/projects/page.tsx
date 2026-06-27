import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Projects from "@/components/Projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Deployed systems and selected work.",
  alternates: { canonical: `${siteConfig.url}/projects` },
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <Projects headingLevel={1} />
    </SiteShell>
  );
}
