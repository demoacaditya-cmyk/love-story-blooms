import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { easings, durations } from "@/lib/birthday/motion";

gsap.registerPlugin(ScrollTrigger);

export function MemoryDates() {
  const root = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const line = root.current?.querySelector<SVGRectElement | SVGLineElement | HTMLElement>(".timeline-line");
    const cards = root.current?.querySelectorAll<HTMLElement>(".date-card");
    if (!cards) return;

    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: easings.smoothInOut,
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );
    }

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 40, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: durations.slow,
          ease: easings.cinematic,
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
          delay: i * 0.05,
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
          "linear-gradient(180deg, color-mix(in oklab, var(--lavender) 55%, white) 0%, color-mix(in oklab, var(--blush) 65%, white) 100%)",
      }}
    >
      <header className="mb-16 text-center">
        <p
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: "color-mix(in oklab, var(--plum-ink) 60%, white)" }}
        >
          our timeline
        </p>
        <h2
          className="mt-3 text-balance"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "2.4rem",
            color: "var(--plum-ink)",
            lineHeight: 1.05,
          }}
        >
          Our special dates
        </h2>
      </header>

      <div className="relative mx-auto max-w-[22rem]">
        <div
          className="timeline-line absolute top-0 bottom-0 left-1/2 w-px origin-top"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--rose-gold) 80%, transparent), transparent)",
          }}
        />
        <ol className="space-y-10">
          {birthdayContent.dates.map((d, i) => (
            <li
              key={d.title}
              className={`date-card relative flex ${i % 2 === 0 ? "justify-start pr-8" : "justify-end pl-8"}`}
            >
              <div
                className="absolute top-6 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                style={{
                  background: "var(--rose-gold)",
                  boxShadow: "0 0 18px color-mix(in oklab, var(--rose-gold) 70%, transparent)",
                }}
              />
              <div
                className="glass-card w-full max-w-[14rem] rounded-2xl px-4 py-4"
                style={{ color: "var(--plum-ink)" }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--rose-deep)" }}
                >
                  {d.date}
                </p>
                <h3
                  className="mt-1.5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontStyle: "italic",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  className="mt-1.5 text-[0.85rem] leading-snug"
                  style={{ color: "color-mix(in oklab, var(--plum-ink) 78%, white)" }}
                >
                  {d.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}