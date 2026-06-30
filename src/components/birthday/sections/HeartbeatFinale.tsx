import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartScene } from "../three/HeartScene";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useInView } from "@/hooks/useInView";
import { easings, durations } from "@/lib/birthday/motion";

gsap.registerPlugin(ScrollTrigger);

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
}

export function HeartbeatFinale() {
  const root = useRef<HTMLElement | null>(null);
  const inView = useInView(root);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [zoomOut, setZoomOut] = useState(false);
  const seedRef = useRef(0);

  useGsapContext(() => {
    gsap.fromTo(
      ".finale-veil",
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: durations.cinematic,
        ease: easings.smoothInOut,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      },
    );
    gsap.fromTo(
      ".finale-canvas",
      { autoAlpha: 0, scale: 0.85, filter: "blur(20px)" },
      {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2.6,
        ease: easings.cinematic,
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      },
    );
    gsap.fromTo(
      ".finale-msg-1",
      { autoAlpha: 0, y: 20, filter: "blur(14px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.2,
        ease: easings.cinematic,
        delay: 1.4,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      },
    );
    gsap.fromTo(
      ".finale-msg-2",
      { autoAlpha: 0, y: 16, filter: "blur(12px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.4,
        ease: easings.cinematic,
        delay: 3.6,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
        onComplete: () => {
          // begin slow camera dolly back after second message is in
          gsap.delayedCall(0.8, () => setZoomOut(true));
        },
      },
    );
  }, root, []);

  const handlePulse = () => {
    seedRef.current += 1;
    const id = seedRef.current;
    const fresh: Sparkle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: id * 10 + i,
      left: 40 + Math.random() * 20,
      top: 40 + Math.random() * 20,
      size: 3 + Math.random() * 5,
    }));
    setSparkles((prev) => [...prev.slice(-20), ...fresh]);
    window.setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !fresh.find((f) => f.id === s.id)));
    }, 1800);
  };

  // Pause Canvas when offscreen by conditional mount
  useEffect(() => {
    // no-op, kept for clarity
  }, [inView]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[120svh] flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "var(--gradient-night)" }}
    >
      <div
        className="finale-veil pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--rose-deep) 30%, transparent), transparent 70%)",
        }}
      />

      <div className="relative h-[60svh] w-full max-w-[24rem]">
        <div className="finale-canvas absolute inset-0">
          {inView && <HeartScene onPulse={handlePulse} zoomOut={zoomOut} />}
        </div>

        {/* pulse sparkles */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: "color-mix(in oklab, white 80%, var(--rose))",
              boxShadow: "0 0 12px color-mix(in oklab, var(--rose) 80%, white)",
              animation: "finale-sparkle 1.8s ease-out forwards",
            }}
          />
        ))}
      </div>

      <div className="relative mt-10 text-center">
        <p
          className="finale-msg-1"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.9rem",
            lineHeight: 1.15,
            color: "color-mix(in oklab, white 90%, var(--rose))",
            opacity: 0,
          }}
        >
          {birthdayContent.finale.primary}
        </p>
        <p
          className="finale-msg-2 mt-3"
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: "1.4rem",
            color: "color-mix(in oklab, white 75%, var(--rose))",
            opacity: 0,
          }}
        >
          {birthdayContent.finale.secondary}
        </p>
      </div>

      <style>{`
        @keyframes finale-sparkle {
          0% { opacity: 0; transform: translateY(0) scale(0.4); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
        }
      `}</style>
    </section>
  );
}