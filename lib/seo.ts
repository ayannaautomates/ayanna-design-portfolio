import { siteConfig } from "./site";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "AI Automation Specialist",
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.website,
    ],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
  };
}

export function getProjectJsonLd(project: {
  title: string;
  description: string;
  slug: string;
  year: number;
  liveUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    datePublished: `${project.year}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };
}
