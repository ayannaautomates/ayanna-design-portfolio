"use client";

import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";

type GlowColor = "cyan" | "violet" | "blue" | "purple" | "green" | "red" | "orange";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
};

const glowColorMap: Record<GlowColor, string> = {
  cyan: "#7DF9FF",
  violet: "#9D4EFF",
  blue: "#4DA6FF",
  purple: "#B06EFF",
  green: "#39FF14",
  red: "#FF4444",
  orange: "#FF9F43",
};

export default function SpotlightCard({
  children,
  className = "",
  glowColor = "cyan",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const color = glowColorMap[glowColor];

  const updateSpotlight = useCallback((clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${clientX - rect.left}px`);
    el.style.setProperty("--my", `${clientY - rect.top}px`);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      updateSpotlight(e.clientX, e.clientY);
    },
    [updateSpotlight],
  );

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  const style = {
    "--glow-color": color,
    "--mx": "50%",
    "--my": "50%",
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}
