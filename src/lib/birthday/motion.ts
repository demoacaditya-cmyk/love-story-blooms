import { gsap } from "gsap";

export const easings = {
  smooth: "power3.out",
  smoothInOut: "power3.inOut",
  cinematic: "expo.out",
  soft: "sine.inOut",
} as const;

export const durations = {
  fast: 0.5,
  base: 1.0,
  slow: 1.4,
  cinematic: 1.8,
} as const;

export function revealFromBelow(target: gsap.TweenTarget, delay = 0) {
  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: 24, filter: "blur(14px)" },
    {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: durations.slow,
      ease: easings.cinematic,
      delay,
    },
  );
}

export function softFloat(target: gsap.TweenTarget, distance = 8) {
  return gsap.to(target, {
    y: `+=${distance}`,
    duration: 4,
    ease: easings.soft,
    yoyo: true,
    repeat: -1,
  });
}
*** Add File: src/hooks/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
*** Add File: src/hooks/useInView.ts
import { useEffect, useState, type RefObject } from "react";

export function useInView(ref: RefObject<Element | null>, rootMargin = "0px"): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
*** Add File: src/hooks/useGsapContext.ts
import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

export function useGsapContext(
  setup: (self: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>,
  deps: ReadonlyArray<unknown> = [],
) {
  const ctxRef = useRef<gsap.Context | null>(null);
  useEffect(() => {
    if (!scope.current) return;
    ctxRef.current = gsap.context(setup, scope.current);
    return () => ctxRef.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}