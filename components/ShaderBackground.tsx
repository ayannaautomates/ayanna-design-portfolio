"use client";

import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ShaderRenderer } from "@/lib/shader-background";
import type { MouseState } from "@/lib/hero-engine";

export type ShaderBackgroundHandle = {
  render: (now: number, mouse: MouseState) => void;
  resize: () => void;
};

type ShaderBackgroundProps = {
  className?: string;
  reducedMotion?: boolean;
};

const ShaderBackground = forwardRef<
  ShaderBackgroundHandle,
  ShaderBackgroundProps
>(function ShaderBackground({ className = "", reducedMotion = false }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ShaderRenderer | null>(null);
  const movesRef = useRef([0, 0]);
  const frozenTimeRef = useRef(0);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas || !rendererRef.current) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    rendererRef.current.updateScale(dpr);
  };

  useImperativeHandle(ref, () => ({
    render(now: number, mouse: MouseState) {
      const renderer = rendererRef.current;
      if (!renderer) return;

      if (mouse.active) {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const dpr = canvas.width / rect.width;
          renderer.updateMouse([
            mouse.x * dpr,
            canvas.height - mouse.y * dpr,
          ]);
          renderer.updatePointerCount(1);
          renderer.updatePointerCoords([
            mouse.x * dpr,
            canvas.height - mouse.y * dpr,
          ]);
        }
      } else {
        renderer.updatePointerCount(0);
      }

      renderer.updateMove(movesRef.current);
      movesRef.current = [movesRef.current[0] * 0.9, movesRef.current[1] * 0.9];

      const t = reducedMotion ? frozenTimeRef.current : now;
      if (!reducedMotion) frozenTimeRef.current = now;
      renderer.render(t);
    },
    resize,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      rendererRef.current = new ShaderRenderer(canvas, dpr);
      rendererRef.current.setup();
      rendererRef.current.init();
      resize();
      frozenTimeRef.current = performance.now();
      rendererRef.current.render(frozenTimeRef.current);
    } catch (err) {
      console.warn("ShaderBackground: WebGL unavailable", err);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      rendererRef.current?.reset();
      rendererRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
});

export default ShaderBackground;
