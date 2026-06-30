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