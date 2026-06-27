"use client";

import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import {
  type MouseState,
  type EngineConfig,
  PARTICLE_COLORS,
  REPEL_RADIUS,
  CONNECTION_DIST,
  LINE_RECOMPUTE_MS,
  smoothstep,
} from "@/lib/hero-engine";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  depth: number;
  color: string;
};

export type ParticleFieldHandle = {
  update: (dt: number, mouse: MouseState, config: EngineConfig) => void;
  resize: () => void;
};

type ParticleFieldProps = {
  className?: string;
  fullHeight?: boolean;
};

function getParticleCount(width: number): number {
  if (width < 640) return 45;
  if (width < 1024) return 90;
  return 120;
}

const ParticleField = forwardRef<ParticleFieldHandle, ParticleFieldProps>(
  function ParticleField({ className = "", fullHeight = false }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const connectionsRef = useRef<[number, number][]>([]);
    const lastLineUpdateRef = useRef(0);
    const sizeRef = useRef({ w: 0, h: 0 });

    const recomputeConnections = useCallback(() => {
      const particles = particlesRef.current;
      const pairs: [number, number][] = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < CONNECTION_DIST * CONNECTION_DIST) {
            pairs.push([i, j]);
          }
        }
      }
      connectionsRef.current = pairs;
    }, []);

    const initParticles = useCallback((w: number, h: number) => {
      const count = getParticleCount(w);
      const fieldH = fullHeight ? h * 0.75 : h * 0.6;
      particlesRef.current = Array.from({ length: count }, () => {
        const depth = Math.random();
        const yBias = Math.pow(Math.random(), 1.8);
        return {
          x: Math.random() * w,
          y: yBias * fieldH,
          vx: 0,
          vy: 0,
          baseVx: (Math.random() - 0.5) * 12,
          baseVy: (Math.random() - 0.5) * 8,
          depth,
          color:
            PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        };
      });
      connectionsRef.current = [];
      lastLineUpdateRef.current = 0;
      recomputeConnections();
    }, [recomputeConnections, fullHeight]);

    const resize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
      initParticles(rect.width, rect.height);
    }, [initParticles]);

    const update = useCallback(
      (dt: number, mouse: MouseState, config: EngineConfig) => {
        const canvas = canvasRef.current;
        if (!canvas || config.paused) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { w, h } = sizeRef.current;
        const fieldH = fullHeight ? h * 0.75 : h * 0.6;
        const particles = particlesRef.current;
        const reduced = config.reducedMotion;

        ctx.clearRect(0, 0, w, h);

        const now = performance.now();
        if (
          !reduced &&
          now - lastLineUpdateRef.current > LINE_RECOMPUTE_MS
        ) {
          recomputeConnections();
          lastLineUpdateRef.current = now;
        }

        const trackCursor =
          !reduced && !config.isTouch && mouse.active;

        for (const p of particles) {
          if (!reduced) {
            p.vx = p.baseVx + (Math.random() - 0.5) * 2;
            p.vy = p.baseVy + (Math.random() - 0.5) * 1.5;

            if (trackCursor) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < REPEL_RADIUS && dist > 0.1) {
                const falloff = 1 - smoothstep(0, REPEL_RADIUS, dist);
                const force = falloff * 180;
                p.vx += (dx / dist) * force * dt;
                p.vy += (dy / dist) * force * dt;
              }
            }

            p.vx *= 0.92;
            p.vy *= 0.92;
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = fieldH;
            if (p.y > fieldH) p.y = 0;
          }

          const radius = (0.5 + p.depth * 1.5) * (1 - p.depth * 0.3);
          const alpha = 0.3 + p.depth * 0.6;

          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (!reduced) {
          for (const [i, j] of connectionsRef.current) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1;
      },
      [recomputeConnections, fullHeight],
    );

    useImperativeHandle(ref, () => ({ update, resize }), [update, resize]);

    useEffect(() => {
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, [resize]);

    return (
      <canvas
        ref={canvasRef}
        className={`absolute inset-x-0 top-0 w-full pointer-events-none ${fullHeight ? "inset-0 h-full" : "h-[60%]"} ${className}`}
        aria-hidden="true"
      />
    );
  },
);

export default ParticleField;
