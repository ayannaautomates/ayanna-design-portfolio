export type MouseState = {
  x: number;
  y: number;
  active: boolean;
};

export type EngineConfig = {
  reducedMotion: boolean;
  isTouch: boolean;
  paused: boolean;
};

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const PARTICLE_COLORS = ["#7DF9FF", "#9D4EFF", "#FF6EC7"];
export const REPEL_RADIUS = 130;
export const CONNECTION_DIST = 100;
export const LINE_RECOMPUTE_MS = 150;
