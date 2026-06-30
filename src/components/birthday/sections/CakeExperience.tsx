import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { useGsapContext } from "@/hooks/useGsapContext";
import { easings, durations } from "@/lib/birthday/motion";

gsap.registerPlugin(ScrollTrigger);

interface CakeExperienceProps {
  onComplete: () => void;
}

const CANDLE_COUNT = 5;
const CANDLE_X = [-72, -36, 0, 36, 72];

export function CakeExperience({ onComplete }: CakeExperienceProps) {
  const root = useRef<HTMLElement | null>(null);
  const [blown, setBlown] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(false));
  const blownCount = blown.filter(Boolean).length;
  const allBlown = blownCount === CANDLE_COUNT;
  const completedRef = useRef(false);

  useGsapContext(() => {
    gsap.fromTo(
      ".cake-stage",
      { autoAlpha: 0, scale: 0.92, filter: "blur(22px)" },
      {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: durations.cinematic,
        ease: easings.cinematic,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      },
    );
    gsap.fromTo(
      ".cake-headline",
      { autoAlpha: 0, y: 24, filter: "blur(14px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: durations.slow,
        ease: easings.cinematic,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      },
    );
    gsap.to(".cake-stage", {
      y: -8,
      duration: 5,
      ease: easings.soft,
      yoyo: true,
      repeat: -1,
    });

    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=60%",
      pin: ".cake-pin",
      pinSpacing: true,
    });
  }, root, []);

  useEffect(() => {
    if (!allBlown || completedRef.current) return;
    completedRef.current = true;

    const t = window.setTimeout(() => {
      const opts: confetti.Options = {
        particleCount: 90,
        spread: 75,
        startVelocity: 38,
        origin: { x: 0.5, y: 0.55 },
        colors: ["#f6b8d1", "#f8a8c4", "#ffd7e2", "#d9b3ff", "#e7c19a"],
        scalar: 0.9,
        ticks: 220,
      };
      confetti(opts);
      window.setTimeout(() => confetti({ ...opts, particleCount: 60, spread: 110, startVelocity: 28 }), 250);

      gsap.to(".cake-glow", { autoAlpha: 1, scale: 1.15, duration: 1.4, ease: easings.cinematic });

      window.setTimeout(() => {
        onComplete();
      }, 1700);
    }, 900);
    return () => window.clearTimeout(t);
  }, [allBlown, onComplete]);

  const blow = (i: number) => {
    if (blown[i]) return;
    setBlown((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  return (
    <section
      ref={root}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--lavender) 60%, white) 0%, color-mix(in oklab, var(--blush) 75%, white) 60%, color-mix(in oklab, var(--rose) 55%, white) 100%)",
      }}
    >
      <div className="cake-pin relative flex min-h-[100svh] flex-col items-center justify-center px-6">
        <div className="cake-headline text-center">
          <p
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: "color-mix(in oklab, var(--plum-ink) 60%, white)" }}
          >
            make a wish
          </p>
          <h2
            className="mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "2.2rem",
              color: "var(--plum-ink)",
              lineHeight: 1.05,
            }}
          >
            Blow the candles
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "color-mix(in oklab, var(--plum-ink) 65%, white)" }}
          >
            Tap each one, gently.
          </p>
        </div>

        <div className="cake-stage relative mt-12 h-[18rem] w-full max-w-[22rem]">
          <div
            className="cake-glow pointer-events-none absolute inset-0"
            style={{
              opacity: 0,
              background:
                "radial-gradient(50% 40% at 50% 55%, color-mix(in oklab, var(--rose) 50%, white), transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Candles */}
          <svg
            viewBox="-110 -160 220 280"
            className="absolute inset-x-0 top-0 mx-auto h-full"
            style={{ overflow: "visible" }}
          >
            {/* Plate shadow */}
            <ellipse cx="0" cy="92" rx="105" ry="10" fill="color-mix(in oklab, var(--rose-deep) 25%, transparent)" />

            {/* Bottom tier */}
            <rect x="-95" y="20" width="190" height="65" rx="8"
              fill="url(#tierBottom)" stroke="color-mix(in oklab, var(--rose-gold) 60%, transparent)" strokeWidth="0.6" />
            {/* Drip */}
            <path d="M-95 35 q12 -8 24 0 q12 -8 24 0 q12 -8 24 0 q12 -8 24 0 q12 -8 24 0 q12 -8 24 0 q12 -8 24 0 q12 -8 24 0 L95 35 L95 22 L-95 22 Z"
              fill="url(#cream)" />

            {/* Top tier */}
            <rect x="-62" y="-35" width="124" height="55" rx="8"
              fill="url(#tierTop)" stroke="color-mix(in oklab, var(--rose-gold) 60%, transparent)" strokeWidth="0.6" />
            <path d="M-62 -22 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 L62 -22 L62 -36 L-62 -36 Z"
              fill="url(#cream)" />

            {/* Tiny pearls */}
            {Array.from({ length: 9 }).map((_, i) => (
              <circle key={i} cx={-56 + i * 14} cy={22} r={2} fill="color-mix(in oklab, var(--rose-gold) 80%, white)" />
            ))}

            <defs>
              <linearGradient id="tierBottom" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="color-mix(in oklab, var(--blush) 80%, white)" />
                <stop offset="1" stopColor="color-mix(in oklab, var(--rose) 65%, white)" />
              </linearGradient>
              <linearGradient id="tierTop" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="color-mix(in oklab, var(--ivory) 90%, white)" />
                <stop offset="1" stopColor="color-mix(in oklab, var(--blush) 70%, white)" />
              </linearGradient>
              <linearGradient id="cream" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="color-mix(in oklab, white 90%, var(--rose))" />
                <stop offset="1" stopColor="color-mix(in oklab, white 70%, var(--rose))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Candle hit areas + flames in HTML for easier interaction/animation */}
          <div className="absolute inset-x-0 top-0 mx-auto h-full" style={{ pointerEvents: "none" }}>
            {CANDLE_X.map((x, i) => (
              <CandleNode key={i} x={x} blown={blown[i]} onTap={() => blow(i)} />
            ))}
          </div>
        </div>

        <div
          className="glass-soft mt-10 rounded-full px-5 py-2 text-sm tracking-[0.3em] uppercase"
          style={{ color: "var(--plum-ink)" }}
        >
          {blownCount} / {CANDLE_COUNT} candles blown
        </div>
      </div>
    </section>
  );
}

function CandleNode({ x, blown, onTap }: { x: number; blown: boolean; onTap: () => void }) {
  const flameRef = useRef<HTMLDivElement | null>(null);
  const smokeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const flame = flameRef.current;
    if (!flame) return;
    const tw = gsap.to(flame, {
      scaleY: 1.1,
      scaleX: 0.92,
      duration: 0.6,
      ease: easings.soft,
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 100%",
    });
    return () => {
      tw.kill();
    };
  }, []);

  useEffect(() => {
    if (!blown) return;
    const flame = flameRef.current;
    const smoke = smokeRef.current;
    if (flame) {
      gsap.to(flame, {
        scaleY: 0,
        scaleX: 0,
        autoAlpha: 0,
        duration: 0.7,
        ease: easings.smooth,
        transformOrigin: "50% 100%",
      });
    }
    if (smoke) {
      gsap.fromTo(
        smoke,
        { autoAlpha: 0, y: 0, scale: 0.6, filter: "blur(2px)" },
        { autoAlpha: 0.6, y: -34, scale: 1.4, filter: "blur(6px)", duration: 1.4, ease: "power1.out" },
      );
      gsap.to(smoke, { autoAlpha: 0, duration: 0.9, delay: 1.2, ease: "power1.out" });
    }
  }, [blown]);

  // x is in svg coordinate space (-110..110 → 0..220). The svg viewBox spans full width.
  // Convert candle x to percentage of stage width.
  const leftPercent = ((x + 110) / 220) * 100;

  return (
    <button
      type="button"
      onClick={onTap}
      className="absolute"
      aria-label="Blow this candle"
      style={{
        left: `${leftPercent}%`,
        bottom: "55.4%",
        transform: "translate(-50%, 0)",
        pointerEvents: "auto",
        background: "transparent",
        border: 0,
        padding: "16px 16px 0 16px",
        cursor: "pointer",
      }}
    >
      <div className="relative h-16 w-3 mx-auto">
        {/* flame */}
        <div
          ref={flameRef}
          className="absolute -top-5 left-1/2 -translate-x-1/2"
          style={{
            width: 10,
            height: 16,
            borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%",
            background: "radial-gradient(circle at 50% 70%, #fff7a8 0%, #ffd070 45%, #ff8e57 80%, transparent 100%)",
            boxShadow: "0 0 18px #ffb86b, 0 0 36px #ff8e57",
            filter: "blur(0.3px)",
          }}
        />
        {/* smoke */}
        <div
          ref={smokeRef}
          className="absolute -top-5 left-1/2 -translate-x-1/2"
          style={{
            opacity: 0,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "radial-gradient(circle, color-mix(in oklab, white 80%, var(--plum-ink)) 0%, transparent 70%)",
          }}
        />
        {/* candle */}
        <div
          className="absolute inset-x-0 top-0 mx-auto"
          style={{
            width: 6,
            height: 56,
            borderRadius: 3,
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--rose) 70%, white), color-mix(in oklab, var(--rose-deep) 55%, white))",
            boxShadow: "inset -1px 0 0 color-mix(in oklab, var(--rose-deep) 60%, transparent)",
          }}
        />
      </div>
    </button>
  );
}