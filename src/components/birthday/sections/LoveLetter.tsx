import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easings, durations } from "@/lib/birthday/motion";

gsap.registerPlugin(ScrollTrigger);

export function LoveLetter() {
  const root = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const chars = root.current?.querySelectorAll<HTMLSpanElement>(".letter-char");
    if (!chars || chars.length === 0) return;

    if (reduced) {
      gsap.to(chars, { autoAlpha: 1, filter: "blur(0px)", duration: 1 });
      return;
    }

    gsap.set(chars, { autoAlpha: 0, filter: "blur(8px)", y: 6 });

    gsap.fromTo(
      ".letter-card",
      { autoAlpha: 0, y: 40, filter: "blur(20px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: durations.slow,
        ease: easings.cinematic,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      },
    );

    gsap.to(chars, {
      autoAlpha: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.012,
      scrollTrigger: {
        trigger: ".letter-card",
        start: "top 65%",
      },
    });

    gsap.to(".letter-sparkle", {
      y: -10,
      duration: 3,
      ease: easings.soft,
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.3, from: "random" },
    });
  }, root, [reduced]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--lavender) 60%, white) 0%, color-mix(in oklab, var(--blush) 75%, white) 100%)",
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="letter-sparkle pointer-events-none absolute h-1 w-1 rounded-full"
          style={{
            top: `${10 + (i * 11) % 80}%`,
            left: `${(i * 37) % 100}%`,
            background: "color-mix(in oklab, var(--rose-gold) 80%, white)",
            boxShadow: "0 0 12px color-mix(in oklab, var(--rose-gold) 70%, transparent)",
            opacity: 0.7,
          }}
        />
      ))}

      <article
        className="letter-card glass-card relative w-full max-w-[22rem] rounded-[2rem] px-7 py-10"
        style={{ color: "var(--plum-ink)" }}
      >
        <p
          className="mb-6 text-center text-xs uppercase tracking-[0.4em]"
          style={{ color: "color-mix(in oklab, var(--plum-ink) 60%, white)" }}
        >
          a letter for you
        </p>
        <div
          className="space-y-5 text-[1.05rem] leading-relaxed"
          style={{ fontFamily: "var(--font-hand)", color: "var(--plum-ink)", fontSize: "1.25rem", lineHeight: 1.5 }}
        >
          {birthdayContent.letter.map((para, i) => (
            <p key={i}>
              {para.split(/(\s+)/).map((word, j) => {
                if (/^\s+$/.test(word)) return <span key={j}>{word}</span>;
                return (
                  <span key={j} className="inline-block whitespace-nowrap align-baseline">
                    {word.split("").map((ch, k) => (
                      <span key={k} className="letter-char inline-block">
                        {ch}
                      </span>
                    ))}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
        <div
          className="mt-8 text-right text-sm"
          style={{ fontFamily: "var(--font-hand)", color: "var(--rose-deep)", fontSize: "1.15rem" }}
        >
          — always yours
        </div>
      </article>
    </section>
  );
}