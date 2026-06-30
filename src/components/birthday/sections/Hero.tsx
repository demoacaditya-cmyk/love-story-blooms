import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PhonePhoto } from "../PhonePhoto";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { easings, durations } from "@/lib/birthday/motion";

interface HeroProps {
  onBegin: () => void;
}

export function Hero({ onBegin }: HeroProps) {
  const root = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: easings.cinematic } });
    tl.fromTo(
      ".hero-photo",
      { autoAlpha: 0, scale: 1.08, filter: "blur(20px)" },
      { autoAlpha: 0.55, scale: 1, filter: "blur(6px)", duration: durations.cinematic },
    )
      .fromTo(
        ".hero-greeting",
        { autoAlpha: 0, y: 30, filter: "blur(18px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: durations.slow },
        "-=1.2",
      )
      .fromTo(
        ".hero-name",
        { autoAlpha: 0, y: 36, filter: "blur(22px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: durations.slow },
        "-=0.9",
      )
      .fromTo(
        ".hero-sub",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: durations.base },
        "-=0.7",
      )
      .fromTo(
        ".hero-cta",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: durations.base },
        "-=0.5",
      );

    gsap.to(".hero-cta", {
      y: "+=6",
      duration: 2.6,
      ease: easings.soft,
      yoyo: true,
      repeat: -1,
    });
  }, root, []);

  // gentle parallax on scroll
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      const photo = el.querySelector<HTMLElement>(".hero-photo");
      if (photo) photo.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.02)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--gradient-dawn)" }}
    >
      <div className="hero-photo absolute inset-0 will-change-transform">
        <PhonePhoto
          aspect="9 / 16"
          rounded="rounded-none"
          className="h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--blush) 70%, transparent) 0%, color-mix(in oklab, white 40%, transparent) 60%, color-mix(in oklab, var(--lavender) 70%, transparent) 100%)",
            backdropFilter: "blur(8px)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p
          className="hero-greeting text-balance text-sm uppercase tracking-[0.4em]"
          style={{ color: "color-mix(in oklab, var(--plum-ink) 70%, white)" }}
        >
          {birthdayContent.heroGreeting}
        </p>
        <h1
          className="hero-name mt-6 text-balance"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(3.4rem, 16vw, 5rem)",
            lineHeight: 1,
            color: "var(--plum-ink)",
            letterSpacing: "-0.01em",
          }}
        >
          {birthdayContent.name}
        </h1>
        <p
          className="hero-sub mt-6 max-w-[18rem] text-balance text-base"
          style={{
            fontFamily: "var(--font-display)",
            color: "color-mix(in oklab, var(--plum-ink) 75%, white)",
          }}
        >
          {birthdayContent.heroSubtitle}
        </p>

        <button
          type="button"
          onClick={onBegin}
          className="hero-cta glass-card mt-12 rounded-full px-7 py-3 text-sm tracking-[0.3em] uppercase transition-transform active:scale-[0.98]"
          style={{
            color: "var(--plum-ink)",
            boxShadow:
              "0 10px 30px -10px color-mix(in oklab, var(--rose-deep) 40%, transparent), inset 0 1px 0 color-mix(in oklab, white 80%, transparent)",
          }}
        >
          {birthdayContent.beginLabel}
        </button>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase"
        style={{ color: "color-mix(in oklab, var(--plum-ink) 55%, white)" }}
      >
        scroll
      </div>
    </section>
  );
}