import type { Metadata } from "next";
import { Audiowide, JetBrains_Mono } from "next/font/google";
import GridOverlay from "@/components/GridOverlay";
import ScrollToTop from "@/components/ScrollToTop";
import SkipLink from "@/components/SkipLink";
import ConsentBanner from "@/components/ConsentBanner";
import Analytics from "@/components/Analytics";
import PwaRegister from "@/components/PwaRegister";
import { siteConfig } from "@/lib/site";
import { assetUrl } from "@/lib/assets";
import { getPersonJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import "./globals.css";

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI automation",
    "workflow builder",
    "agent orchestration",
    "Next.js",
    "chatbot developer",
    "portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 750,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: assetUrl("/favicon.ico"), sizes: "48x48" },
      { url: assetUrl("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { url: assetUrl("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: assetUrl("/apple-icon.png"), sizes: "180x180", type: "image/png" }],
    shortcut: assetUrl("/favicon.ico"),
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [getPersonJsonLd(), getWebsiteJsonLd()];

  return (
    <html
      lang="en"
      className={`${audiowide.variable} ${jetbrains.variable} h-full scroll-smooth`}
    >
      <head>
        <link rel="icon" href={assetUrl("/favicon.ico")} sizes="48x48" />
        <link
          rel="icon"
          href={assetUrl("/favicon-32x32.png")}
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href={assetUrl("/favicon-16x16.png")}
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href={assetUrl("/apple-icon.png")} sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-navy text-ghost overflow-x-clip">
        <SkipLink />
        <GridOverlay />
        {children}
        <ScrollToTop />
        <ConsentBanner />
        <Analytics />
        <PwaRegister />
      </body>
    </html>
  );
}
