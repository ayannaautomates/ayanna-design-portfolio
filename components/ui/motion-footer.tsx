"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "@/components/SpotlightCard";
import SectionHeading from "@/components/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-about-wrapper {
  font-family: var(--font-jetbrains), ui-monospace, monospace;
  -webkit-font-smoothing: antialiased;
}

@keyframes about-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes about-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-about-breathe {
  animation: about-breathe 8s ease-in-out infinite alternate;
}

.animate-about-scroll-marquee {
  animation: about-scroll-marquee 40s linear infinite;
}

.about-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.about-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%,
    transparent 70%
  );
}

.about-giant-bg-text {
  font-family: var(--font-audiowide), system-ui, sans-serif;
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.about-text-glow {
  font-family: var(--font-audiowide), system-ui, sans-serif;
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}

@media (prefers-reduced-motion: reduce) {
  .animate-about-breathe,
  .animate-about-scroll-marquee {
    animation: none;
  }
}
`;

const SKILLS = [
  "Claude API / MCP",
  "Process Automation",
  "Vibe Coding",
  "Data Pipelines",
  "Conversational AI",
  "CRM Administration",
  "Next.js / Supabase",
  "Prompt Engineering",
] as const;

const glowColors = ["cyan", "violet", "cyan", "violet"] as const;

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Agent Orchestration</span>
    <span className="text-primary/60">✦</span>
    <span>Automation Pipelines</span>
    <span className="text-secondary/60">✦</span>
    <span>Vibe Coding</span>
    <span className="text-primary/60">✦</span>
    <span>AI That Ships</span>
    <span className="text-secondary/60">✦</span>
    <span>Zero-Fluff Systems</span>
    <span className="text-primary/60">✦</span>
  </div>
);

export function CinematicAbout({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        marqueeRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        headingRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={sectionRef}
        className="relative w-full min-w-0 min-h-screen flex flex-col bg-background text-foreground cinematic-about-wrapper overflow-hidden"
      >
        <div className="about-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-about-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
        <div className="about-bg-grid absolute inset-0 z-0 pointer-events-none" />

        <div
          ref={giantTextRef}
          className="about-giant-bg-text absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none uppercase"
          aria-hidden="true"
        >
          OPERATOR
        </div>

        <div
          ref={marqueeRef}
          className="relative z-10 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 mt-24 md:mt-28 -rotate-2 scale-110 shadow-2xl shrink-0"
          aria-hidden="true"
        >
          <div className="flex w-max animate-about-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-10 md:pt-12 pb-8 w-full max-w-5xl mx-auto min-w-0">
          <p className="hud-label text-primary mb-4 shrink-0">[ ABOUT ]</p>

          <div ref={headingRef}>
            <SectionHeading
              level={headingLevel}
              id="about-heading"
              className="text-4xl md:text-7xl font-black about-text-glow tracking-tighter leading-[1.1] mb-8 md:mb-10 text-center uppercase shrink-0 overflow-visible pb-1"
            >
              Operator Profile
            </SectionHeading>
          </div>

          <div ref={contentRef} className="flex flex-col items-center gap-8 w-full min-w-0">
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed max-w-2xl text-center break-words">
              <p>
                AI workflow builder specializing in agent orchestration,
                automation pipelines, and intelligent systems for
                under-resourced organizations. I build tools that feel like
                they belong in 2087 — and actually ship by Friday.
              </p>
              <p>
                Ten years in the Air Force, an MBA, and a parallel career as a
                surgical technologist taught me how to operate inside real-world
                constraints — no infinite budget, no dev team, no room for
                theoretical. Now I build chatbots, CRM automations, scraping
                pipelines, and AI-powered dashboards for nonprofits and small
                orgs that need results, not a roadmap.
              </p>
              <p>
                Currently open to AI workflow design, implementation consulting,
                and AI operations roles at startups and mission-driven
                organizations.
              </p>
            </div>

            <div className="w-full min-w-0">
              <p className="hud-label text-secondary mb-5 text-center">
                [ CAPABILITIES ]
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl mx-auto min-w-0">
                {SKILLS.map((skill, i) => (
                  <li key={skill} className="min-w-0">
                    <SpotlightCard
                      glowColor={glowColors[i % glowColors.length]}
                      className="w-full transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <div className="relative z-[1] flex items-center gap-3 px-4 py-3 min-w-0">
                        <span
                          className="text-cyan text-xs shrink-0"
                          aria-hidden="true"
                        >
                          ▹
                        </span>
                        <span className="text-ghost text-sm font-mono truncate">
                          {skill}
                        </span>
                      </div>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full pb-10 md:pb-12 px-6 flex justify-center shrink-0 mt-auto">
          <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            Status: Open to opportunities
          </div>
        </div>
      </div>
    </>
  );
}
