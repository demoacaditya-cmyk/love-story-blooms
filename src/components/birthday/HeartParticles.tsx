import { useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  opacity: number;
  hue: number;
}

interface HeartParticlesProps {
  density?: number;
  tint?: "rose" | "night";
}

/**
 * Global background canvas of slowly falling hearts.
 * Fixed, pointer-events:none, behind all content.
 */
export function HeartParticles({ density = 36, tint = "rose" }: HeartParticlesProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let hearts: Heart[] = [];
    let raf = 0;
    let running = true;

    const palette = tint === "night"
      ? ["#ffd9e6", "#ffc0d3", "#f6b8d1"]
      : ["#f8a8c4", "#f7c1d3", "#e7b6d6", "#f6c9b6"];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduced ? 0 : density;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = (): Heart => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 4 + Math.random() * 10,
      speed: 0.15 + Math.random() * 0.5,
      drift: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.15 + Math.random() * 0.45,
      hue: Math.floor(Math.random() * palette.length),
    });

    const initHearts = () => {
      hearts = Array.from({ length: count }, seed);
    };

    const drawHeart = (x: number, y: number, s: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s / 16, s / 16);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(0, -2, -8, -2, -8, 4);
      ctx.bezierCurveTo(-8, 9, 0, 13, 0, 16);
      ctx.bezierCurveTo(0, 13, 8, 9, 8, 4);
      ctx.bezierCurveTo(8, -2, 0, -2, 0, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const h of hearts) {
        h.y += h.speed;
        h.phase += 0.01;
        const x = h.x + Math.sin(h.phase) * h.drift * 6;
        drawHeart(x, h.y, h.size, palette[h.hue], h.opacity);
        if (h.y - h.size > height) {
          h.y = -h.size;
          h.x = Math.random() * width;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };

    resize();
    initHearts();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, tint]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}