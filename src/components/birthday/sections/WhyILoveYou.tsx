import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { easings, durations } from "@/lib/birthday/motion";

gsap.registerPlugin(ScrollTrigger);

export function WhyILoveYou() {
  const root = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const cards = root.current?.querySelectorAll<HTMLElement>(".reason-card");
    if (!cards) return;
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 30, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: durations.slow,
          ease: easings.cinematic,
          scrollTrigger: { trigger: card, start: "top 82%" },
        },
      );
    });
  }, root, []);

  return (
    <section
      ref={root}
      className="relative px-6 py-28"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--blush) 65%, white) 0%, color-mix(in oklab, var(--lavender) 60%, white) 100%)",
      }}
    >
      <header className="mb-14 text-center">
        <p
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: "color-mix(in oklab, var(--plum-ink) 60%, white)" }}
        >
          a few of many reasons
        </p>
        <h2
          className="mt-3"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "2.4rem",
            color: "var(--plum-ink)",
            lineHeight: 1.05,
          }}
        >
          Why I love you
        </h2>
      </header>

      <ul className="mx-auto flex max-w-[22rem] flex-col gap-5">
        {birthdayContent.reasons.map((r, i) => (
          <li
            key={r.title}
            className="reason-card glass-card relative rounded-3xl px-6 py-6"
            style={{ color: "var(--plum-ink)" }}
          >
            <div
              className="absolute top-5 right-5 text-xs tracking-[0.3em]"
              style={{ color: "var(--rose-deep)" }}
            >
              0{i + 1}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.6rem",
                lineHeight: 1.1,
              }}
            >
              {r.title}
            </h3>
            <p
              className="mt-2 text-[0.95rem] leading-relaxed"
              style={{ color: "color-mix(in oklab, var(--plum-ink) 75%, white)" }}
            >
              {r.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}