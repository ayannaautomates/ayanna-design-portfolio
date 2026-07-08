export const siteConfig = {
  name: "Ayanna",
  title: "Ayanna — AI Automation Specialist",
  description:
    "AI workflow builder specializing in agent orchestration, automation pipelines, and intelligent systems for under-resourced organizations.",
  tagline: "AI Builder · Automation Specialist · System Operator",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.soulwirestudio.com",
  ogImage: "/projects/supply-sa-vendor-assistant.png",
  locale: "en_US",
  links: {
    github: "https://github.com/ayannaautomates",
    linkedin: "https://www.linkedin.com/in/aemcclintic/",
    website: "https://www.soulwirestudio.com/",
    booking: "https://cal.com/soulwirestudio/30min",
  },
} as const;
