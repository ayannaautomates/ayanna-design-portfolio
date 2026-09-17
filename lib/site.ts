export const siteConfig = {
  name: "Ayanna McClintic",
  title: "Ayanna McClintic | Operations Leader",
  description:
    "Operations leader and USAF veteran. I bring structure to complex programs and build processes people actually follow.",
  tagline: "Operations Leader · AI-Enabled Ops · USAF Veteran",
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
