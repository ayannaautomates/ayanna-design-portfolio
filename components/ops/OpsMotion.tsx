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

      // The descent: pin the stage and let scroll drive depth
      const stage = document.querySelector<HTMLElement>(".ops-descent__stage");
      const depthEl = document.querySelector<HTMLElement>("[data-depth]");
      if (stage) {
        const panels = gsap.utils.toArray<HTMLElement>(".ops-descent__line");
        const depth = { value: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=3000",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // water gets deeper and darker
        tl.to(".ops-plate--mid", { opacity: 1, duration: 1.2 }, 0.6)
          .to(".ops-plate--deep", { opacity: 1, duration: 1.2 }, 2.2)
          .to(".ops-descent__dark", { opacity: 0.88, duration: 3.4 }, 0)
          .to(".ops-plate--surface", { scale: 1.12, duration: 3.4, ease: "none" }, 0)
          .to(depth, {
            value: 38,
            duration: 3.4,
            ease: "none",
            onUpdate: () => {
              if (depthEl) depthEl.textContent = `-${Math.round(depth.value)}`;
            },
          }, 0);

        // one line at a time, each fading up and away
        const step = 3.4 / (panels.length + 0.35);
        panels.forEach((panel, i) => {
          tl.fromTo(
            panel,
            { opacity: 0, y: 28, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: step * 0.45, ease: "sine.out" },
            i * step + 0.1,
          );
          if (i < panels.length - 1) {
            tl.to(
              panel,
              { opacity: 0, y: -24, duration: step * 0.35, ease: "sine.in" },
              i * step + step * 0.8,
            );
          }
        });
      }

      // The dive band drifts at two speeds, like the reference site's ridge
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: el.dataset.parallax === "1" ? 8 : 14 },
          {
            yPercent: el.dataset.parallax === "1" ? -8 : -14,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0 },
          },
        );
      });

      // Case studies: the metrics hold while the headline falls away
      const beat = document.querySelector<HTMLElement>(".ops-beatbox");
      if (beat) {
        const beatTl = gsap.timeline({
          scrollTrigger: {
            trigger: beat,
            start: "top top+=80",
            end: "+=1100",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        beatTl
          .fromTo(
            ".ops-beatbox__metrics .ops-card",
            { opacity: 0, y: 60, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 1, ease: "quint.out" },
            0,
          )
          .to(
            ".ops-beatbox__head",
            { scale: 0.62, opacity: 0, y: -40, duration: 1.4, ease: "none" },
            0.8,
          );
      }

      // The timeline draws its line and lights each year as it passes
      const line = document.querySelector<HTMLElement>(".ops-timeline__line");
      if (line) {
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".ops-timeline",
            start: "top bottom-=20%",
            end: "bottom bottom-=25%",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".ops-timeline__item").forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top bottom-=30%",
            end: "bottom top+=20%",
            toggleClass: { targets: item, className: "is-passed" },
          });
        });
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

    // Anchor clicks have to go through Lenis, or they fight the smooth scroll
    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const target = document.querySelector<HTMLElement>(link.hash);
      if (!target) return;
      event.preventDefault();
      const nav = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 60;
      lenis.scrollTo(target, { offset: -nav });
      history.pushState(null, "", link.hash);
    };
    document.addEventListener("click", onAnchorClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("ops-smooth");
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
