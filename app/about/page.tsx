import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import About from "@/components/About";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Operator profile, capabilities, and background.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <About headingLevel={1} />
    </SiteShell>
  );
}
