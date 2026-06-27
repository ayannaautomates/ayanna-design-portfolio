"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ParticleField, { type ParticleFieldHandle } from "./ParticleField";
import ShaderBackground, { type ShaderBackgroundHandle } from "./ShaderBackground";
import type { MouseState } from "@/lib/hero-engine";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const particleRef = useRef<ParticleFieldHandle>(null);
  const shaderRef = useRef<ShaderBackgroundHandle>(null);
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, active: false });
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const isTouchRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    isTouchRef.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      setReducedMotion(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const GLITCH_MS = 560;
    const INTERVAL_MS = 5000;
    let clearGlitchTimer: ReturnType<typeof setTimeout> | undefined;

    const triggerGlitch = () => {
      setGlitchActive(true);
      clearGlitchTimer = setTimeout(() => setGlitchActive(false), GLITCH_MS);
    };

    const intervalId = setInterval(triggerGlitch, INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      if (clearGlitchTimer) clearTimeout(clearGlitchTimer);
    };
  }, [reducedMotion]);

  const tick = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = timestamp;

    if (!pausedRef.current) {
      const mouse = mouseRef.current;
      const config = {
        reducedMotion: reducedMotionRef.current,
        isTouch: isTouchRef.current,
        paused: false,
      };

      shaderRef.current?.render(timestamp, mouse);
      particleRef.current?.update(dt, mouse, config);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      const rect = section.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(section);

    const handleVisibility = () => {
      if (document.hidden) pausedRef.current = true;
      else if (section.getBoundingClientRect().top < window.innerHeight) {
        pausedRef.current = false;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [tick]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col overflow-hidden bg-navy"
    >
      <ShaderBackground
        ref={shaderRef}
        reducedMotion={reducedMotion}
        className="z-0 opacity-60 mix-blend-screen"
      />
      <ParticleField ref={particleRef} className="z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12 pt-28 md:pt-32 pb-28 md:pb-32 flex-1 flex flex-col justify-center pointer-events-none">
        <div className="pointer-events-auto max-w-2xl animate-fade-up min-w-0 w-full">
          <p className="hud-label text-cyan mb-4">[ SYSTEM ONLINE ]</p>

          <h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-ghost leading-tight glitch-text cursor-default max-w-full${glitchActive ? " is-glitching" : ""}`}
            data-text="AYANNA"
          >
            AYANNA
          </h1>

          <p className="mt-3 font-mono text-base md:text-lg text-violet tracking-wide">
            AI Automation Specialist
          </p>

          <p className="mt-6 text-ghost-muted text-sm leading-relaxed max-w-xl">
            Intelligent systems for organizations that don&apos;t have a dev
            team. Vibe-coded tools, zero-fluff automation, AI that actually
            ships.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/projects" className="btn-primary inline-block">
              &gt; VIEW WORK
            </Link>
            <Link href="/contact" className="btn-secondary inline-block">
              &gt; INIT CONTACT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
