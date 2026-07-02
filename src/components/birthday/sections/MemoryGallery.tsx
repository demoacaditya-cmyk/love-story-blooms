import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhonePhoto } from "../PhonePhoto";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { easings, durations } from "@/lib/birthday/motion";

gsap.registerPlugin(ScrollTrigger);

export function MemoryGallery() {
  const root = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const cards = root.current?.querySelectorAll<HTMLElement>(".memory-card");
    if (!cards) return;
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 40, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: durations.slow,
          ease: easings.cinematic,
          scrollTrigger: { trigger: card, start: "top 85%" },
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
          "linear-gradient(180deg, color-mix(in oklab, var(--blush) 70%, white) 0%, color-mix(in oklab, var(--lavender) 60%, white) 100%)",
      }}
    >
      <header className="mb-14 text-center">
        <p
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: "color-mix(in oklab, var(--plum-ink) 60%, white)" }}
        >
          our memories
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
          Moments with you
        </h2>
      </header>

      <ul className="mx-auto flex max-w-[22rem] flex-col gap-8">
        {birthdayContent.gallery.map((slot, i) => (
          <li
            key={slot.id}
            className="memory-card glass-card relative rounded-3xl p-4"
            style={{
              color: "var(--plum-ink)",
              willChange: "transform, opacity, filter",
            }}
          >
            <div
              className="absolute top-5 right-5 text-[10px] tracking-[0.3em]"
              style={{ color: "var(--rose-deep)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <PhonePhoto
              src={slot.src}
              aspect="3 / 4"
              className="w-full overflow-hidden rounded-2xl"
            />
            {slot.caption && (
              <p
                className="mt-4 px-2 pb-1 text-[0.95rem] leading-snug"
                style={{
                  fontFamily: "var(--font-hand)",
                  color: "color-mix(in oklab, var(--plum-ink) 80%, white)",
                }}
              >
                {slot.caption}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}