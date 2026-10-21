"use client";

import { useState, useSyncExternalStore } from "react";

const CONSENT_KEY = "analytics-consent";

// Reads the stored choice on the client only; the server snapshot keeps the
// banner hidden so the first client render matches the server HTML.
const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};
const getStoredConsent = () => localStorage.getItem(CONSENT_KEY);
const getServerConsent = () => "server";

export default function ConsentBanner() {
  const stored = useSyncExternalStore(subscribe, getStoredConsent, getServerConsent);
  const [dismissed, setDismissed] = useState(false);
  const visible = !stored && !dismissed;

  const save = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    setDismissed(true);
    window.dispatchEvent(new CustomEvent("analytics-consent", { detail: value }));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-heading"
      aria-describedby="consent-description"
      className="consent-banner fixed bottom-0 left-0 right-0 z-[60] border-t border-cyan/20 bg-navy-light/95 backdrop-blur-md px-6 py-4 md:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p id="consent-heading" className="hud-label text-cyan mb-2">
            [ PRIVACY ]
          </p>
          <p id="consent-description" className="text-ghost-muted text-xs font-mono leading-relaxed max-w-2xl">
            We use privacy-friendly analytics to understand traffic. No ad
            tracking. You can accept or decline. Your choice is saved locally.
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
