import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ContactForm from "@/components/ContactForm";
import { getFormSubmitAction } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Init contact — open a secure channel.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactForm
        headingLevel={1}
        formsubmitAction={getFormSubmitAction()}
      />
    </SiteShell>
  );
}
