"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "analytics-consent";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const save = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("analytics-consent", { detail: value }));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-heading"
      aria-describedby="consent-description"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-cyan/20 bg-navy-light/95 backdrop-blur-md px-6 py-4 md:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p id="consent-heading" className="hud-label text-cyan mb-2">
            [ PRIVACY ]
          </p>
          <p id="consent-description" className="text-ghost-muted text-xs font-mono leading-relaxed max-w-2xl">
            We use privacy-friendly analytics to understand traffic. No ad
            tracking. You can accept or decline — your choice is saved locally.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => save("declined")}
            className="btn-secondary px-5 py-2.5"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="btn-primary px-5 py-2.5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function getAnalyticsConsent(): "accepted" | "declined" | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}
