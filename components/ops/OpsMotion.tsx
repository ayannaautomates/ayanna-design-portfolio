"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Scroll feel, ported from the reference teardown: heavy smooth scroll on one
// GSAP ticker, headings that come into focus word by word as you scroll, and
// a single reveal for every block.
export default function OpsMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      lerp: 0.08,
      syncTouch: true,
      syncTouchLerp: 0.05,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("ops-smooth");

    const ctx = gsap.context(() => {
      // Headings resolve word by word, driven by scroll position
      const headings = gsap.utils.toArray<HTMLElement>(".ops-h2, .ops-subhead, .ops-anim-text");
      for (const heading of headings) {
        if (heading.dataset.split === "done") continue;
        const words = (heading.textContent ?? "").split(/\s+/).filter(Boolean);
        heading.textContent = "";
        for (const word of words) {
          const span = document.createElement("span");
          span.className = "ops-word";
          span.textContent = word;
          heading.append(span, document.createTextNode(" "));
        }
        heading.dataset.split = "done";

        gsap.fromTo(
          heading.querySelectorAll(".ops-word"),
          { opacity: 0, filter: "blur(8px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "sine",
            scrollTrigger: {
              trigger: heading,
              start: "top bottom-=15%",
              end: "bottom center+=5%",
              scrub: true,
            },
          },
        );
      }

      // Every block rises into place
      gsap.utils.toArray<HTMLElement>(".op").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "quint.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=15%",
            end: "top bottom",
            scrub: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("ops-smooth");
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
