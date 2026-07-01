import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhonePhoto } from "../PhonePhoto";
import { birthdayContent } from "@/lib/birthday/content";
import { useGsapContext } from "@/hooks/useGsapContext";
import { easings } from "@/lib/birthday/motion";




gsap.registerPlugin(ScrollTrigger);

type FromVars = gsap.TweenVars;

const enters: FromVars[] = [
  { autoAlpha: 0, filter: "blur(28px)", scale: 1.04 },
  { autoAlpha: 0, scale: 0.86 },
  { autoAlpha: 0, rotateZ: -8, y: 40 },
  { autoAlpha: 0, x: 80 },
  { autoAlpha: 0, y: 60, scale: 0.95 },
  { autoAlpha: 0, rotateY: 25, scale: 0.9 },
  { autoAlpha: 0, scale: 1.18, filter: "blur(22px)" },
  { autoAlpha: 0, x: -80, rotateZ: 6 },
  { autoAlpha: 0, y: -50 },
  { autoAlpha: 0, scale: 0.8, rotateZ: 10 },
  { autoAlpha: 0, filter: "blur(18px)", y: 30 },
];

export function MemoryGallery() {
  const root = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const slides = root.current?.querySelectorAll<HTMLElement>(".memory-slide");
    const stage = root.current?.querySelector<HTMLElement>(".memory-stage");
    if (!slides || !stage) return;

    gsap.set(slides, { autoAlpha: 0 });
    gsap.set(slides[0], { autoAlpha: 1, scale: 1, filter: "blur(0px)" });

    const trigger = ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: () => `+=${slides.length * 90}%`,
      pin: stage,
      pinSpacing: true,
      scrub: 0.8,
    });

    slides.forEach((slide, i) => {
      if (i === 0) return;
      const from = enters[i % enters.length];
      gsap.fromTo(
        slide,
        from,
        {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotateZ: 0,
          rotateY: 0,
          filter: "blur(0px)",
          ease: easings.smoothInOut,
          scrollTrigger: {
            trigger: root.current,
            start: () => `top+=${(i - 0.5) * window.innerHeight * 0.9} top`,
            end: () => `top+=${(i + 0.5) * window.innerHeight * 0.9} top`,
            scrub: 0.8,
          },
        },
      );
      gsap.to(slides[i - 1], {
        autoAlpha: 0,
        filter: "blur(14px)",
        scale: 0.96,
        ease: easings.soft,
        scrollTrigger: {
          trigger: root.current,
          start: () => `top+=${(i - 0.5) * window.innerHeight * 0.9} top`,
          end: () => `top+=${(i + 0.3) * window.innerHeight * 0.9} top`,
          scrub: 0.8,
        },
      });
    });

    return () => trigger.kill();
  }, root, []);

  return (
    <section
      ref={root}
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--blush) 70%, white) 0%, color-mix(in oklab, var(--lavender) 60%, white) 100%)",
      }}
    >
      <div className="memory-stage relative flex h-[100svh] w-full items-center justify-center overflow-hidden px-6">
        <p
          className="absolute top-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em]"
          style={{ color: "color-mix(in oklab, var(--plum-ink) 60%, white)" }}
        >
          our memories
        </p>
        <div className="relative h-[68vh] w-full max-w-[20rem]">
          {birthdayContent.gallery.map((slot, i) => (
            <div
              key={slot.id}
              className="memory-slide absolute inset-0 flex flex-col items-center"
              style={{ willChange: "transform, opacity, filter" }}
            >
              <PhonePhoto
                src={slot.src}
                caption={slot.caption}
                aspect="3 / 4"
                className="h-full w-full"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}