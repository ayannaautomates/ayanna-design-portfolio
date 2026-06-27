"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getAnalyticsConsent } from "./ConsentBanner";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!domain) return;

    const sync = () => setEnabled(getAnalyticsConsent() === "accepted");
    sync();

    window.addEventListener("analytics-consent", sync);
    return () => window.removeEventListener("analytics-consent", sync);
  }, []);

  if (!domain || !enabled) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
