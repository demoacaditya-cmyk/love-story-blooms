import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HeartParticles } from "./HeartParticles";
import { Hero } from "./sections/Hero";
import { LoveLetter } from "./sections/LoveLetter";
import { MemoryGallery } from "./sections/MemoryGallery";
import { MemoryDates } from "./sections/MemoryDates";
import { WhyILoveYou } from "./sections/WhyILoveYou";
import { CakeExperience } from "./sections/CakeExperience";
import { HeartbeatFinale } from "./sections/HeartbeatFinale";

gsap.registerPlugin(ScrollTrigger);

export function BirthdayExperience() {
  const letterRef = useRef<HTMLDivElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (el: HTMLElement | null) => {
    if (!el) return;
    lenisRef.current?.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 3) });
  };

  return (
    <main className="relative">
      <HeartParticles density={32} />
      <div className="relative" style={{ zIndex: 2 }}>
        <Hero onBegin={() => scrollTo(letterRef.current)} />
        <div ref={letterRef}>
          <LoveLetter />
        </div>
        <MemoryGallery />
        <MemoryDates />
        <WhyILoveYou />
        <CakeExperience onComplete={() => scrollTo(finaleRef.current)} />
        <div ref={finaleRef}>
          <HeartbeatFinale />
        </div>
      </div>
    </main>
  );
}