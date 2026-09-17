"use client";

import { useEffect } from "react";

// Markup is server-rendered in OpsPage. This only layers behavior on top:
// active nav channel, hero recede on scroll, and the click takeover.
export default function OpsInteractions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.querySelector<HTMLElement>(".ops-hero");
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const cleanups: Array<() => void> = [];

    // Active channel in the nav
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          for (const link of navLinks) {
            const on = link.dataset.nav === id;
            link.classList.toggle("is-active", on);
            if (on) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    cleanups.push(() => observer.disconnect());

    // Hero scrub: beat 0 is the portal, beat 1 is the channel stack.
    if (hero && !reduced) {
      let frame = 0;
      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const span = hero.offsetHeight - window.innerHeight;
          const beat = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
          hero.style.setProperty("--beat", beat.toFixed(3));
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(frame);
      });
    }

    // Toolkit: keep one domain open at a time
    const domains = Array.from(document.querySelectorAll<HTMLDetailsElement>(".ops-domain"));
    const onToggle = (event: Event) => {
      const opened = event.target as HTMLDetailsElement;
      if (!opened.open) return;
      domains.forEach((d) => {
        if (d !== opened) d.open = false;
      });
    };
    domains.forEach((d) => d.addEventListener("toggle", onToggle));
    cleanups.push(() => domains.forEach((d) => d.removeEventListener("toggle", onToggle)));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
