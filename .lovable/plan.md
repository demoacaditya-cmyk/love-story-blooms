# Luxury Romantic Birthday Experience

Mobile-first (390–430px) cinematic single-page site built inside the existing TanStack Start + Tailwind v4 project. No architecture changes, no backend. All photos are premium glass placeholders you can swap later by editing one content file.

## Visual System (additive, no breaking changes)

- Extend `src/styles.css` with romance tokens (oklch): `--blush`, `--rose`, `--rose-deep`, `--lavender`, `--ivory`, `--plum-ink`, `--rose-gold`, plus gradients (`--gradient-dawn`, `--gradient-glass`, `--gradient-night`) and shadows (`--shadow-bloom`, `--shadow-petal`, `--shadow-glass`). Registered in `@theme inline` so utilities like `bg-blush`, `text-plum-ink`, `shadow-bloom` exist.
- Fonts loaded via `<link>` in `src/routes/__root.tsx` head (never `@import` URL): Cormorant Garamond (display serif), Inter (UI), Dancing Script (handwritten). Exposed as `--font-display`, `--font-sans`, `--font-hand`.
- Global tone: rounded-3xl, glass blur, soft glow halos, generous negative space, no harsh shadows, no saturated colors. The experience is centered in a ~430px column on larger viewports so it always reads as a phone canvas.

## File Layout (new files only where needed)

```text
src/
  routes/index.tsx                 // replaces placeholder; mounts <BirthdayExperience/>
  components/birthday/
    BirthdayExperience.tsx         // section orchestrator + smooth scroll bridge
    PhonePhoto.tsx                 // premium glass image placeholder
    HeartParticles.tsx             // global background canvas
    SectionTransition.tsx          // shared color/blur bridge between sections
    sections/
      Hero.tsx
      LoveLetter.tsx
      MemoryGallery.tsx
      MemoryDates.tsx
      WhyILoveYou.tsx
      CakeExperience.tsx
      HeartbeatFinale.tsx
    three/
      CakeScene.tsx
      Candle.tsx
      HeartScene.tsx
  hooks/
    useGsapContext.ts
    useInView.ts
    useReducedMotion.ts
  lib/birthday/
    content.ts                     // name, letter, dates, reasons, photo slots
    motion.ts                      // shared easings, durations, reveal helpers
    palette.ts                     // typed token references
```

Existing files preserved; only `src/routes/index.tsx` and `src/styles.css` are edited, plus `__root.tsx` for the font `<link>` tags.

## Sections

1. **Hero** — Full mobile viewport. Background `PhonePhoto` at low opacity behind dawn gradient and 24px blur veil. Serif "Happy Birthday My Love ❤️", her name in oversized italic display, glass "Tap to Begin" pill that lenis-scrolls to the letter. Entrance: layered blur+opacity reveal, no scale pop. Subtle parallax on background as the user begins scrolling.
2. **Love Letter** — Glass parchment card on a softer gradient. Handwritten font, GSAP per-character typewriter with blur-in (not pop-in), drifting sparkle dots. Reduced-motion fallback is a slow fade.
3. **Memory Gallery** — Pinned `ScrollTrigger` with scrubbed timeline; 10–12 Polaroid placeholders, one visible at a time. Each slot uses a distinct cinematic enter (fade+blur, slow zoom, gentle 3D tilt, parallax drift, soft scale, slide reveal, floating rise) cycled across the set. Caption cross-fades with each frame. Exit hands off to the next section via a shared blush-to-lavender wash.
4. **Memory Dates** — Vertical timeline; rose-gold rule draws as you scroll (`drawSVG`-style via stroke-dashoffset), glass cards stagger in with blur and lift. Alternating alignment for rhythm.
5. **Why I Love You** — Stack of glass cards (mobile = single column). Each card individually scroll-revealed with layered opacity + blur + 8px lift, never bouncy. Soft hover/tap glow.
6. **Birthday Cake** — Pinned section, R3F scene with `dpr=[1, 1.75]`, ambient + single warm key light, light bloom. Stylized cake (cylinders, torus drips). Five `Candle` meshes; flames are sprite shaders that flicker naturally via `useFrame` noise. Tap a candle → flame eases to 0 over ~700ms, smoke puff particles rise and dissipate, ember sparks fade. Glass HUD chip shows "X / 5 Candles Blown" with smooth count. After the fifth: ~1s held breath, then a restrained confetti burst (canvas-confetti with rose/blush palette), extra heart particles, cake glow pulse, then a slow auto-scroll to the finale.
7. **Heartbeat Finale (climax)** — Scene fades to a deep romantic night via `SectionTransition`. R3F heart mesh (extruded heart shape) with emissive material + bloom emerges slowly from darkness. Heartbeat driven by a real cardiac rhythm curve (lub-dub, two-beat) in `useFrame`, with a synchronized bloom glow pulse. Each pulse releases a few tiny floating hearts and sparkles. Messages "Happy Birthday, My Love ❤️" then "I'll Love You Forever." cross-fade in slowly. After the second message, the R3F camera gently dollies back (~1.2s, power2.inOut) while the heart keeps beating and particles keep drifting. The scene lingers in a calm, quiet state — no abrupt end.

## Global Systems

- **HeartParticles**: single fixed `<canvas>` behind everything (z-0, `pointer-events:none`), DPR-capped, ~36 hearts with varied size/opacity/speed and sine sway, recycled at bottom. RAF pauses on `visibilitychange`. Density drops in the finale palette for atmosphere, not removal.
- **Smooth scroll**: Lenis wired into GSAP ticker and `ScrollTrigger.update` for buttery pin/scrub.
- **Section continuity**: `SectionTransition` provides shared blur/gradient bridges so sections read as one continuous story rather than slices.
- **Motion language**: All animations use shared easings from `motion.ts` (`expo.out`, `power3.inOut`, custom cubic), durations 0.8–1.6s, layered opacity + blur + small translate; no bounce, no overshoot.
- **Reduced motion**: `prefers-reduced-motion` disables pin/scrub, typewriter becomes fade, particles drop to 0, R3F scenes hold a single beautiful frame.

## Dependencies to Add

`gsap`, `@gsap/react`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, `lenis`, `canvas-confetti`, `framer-motion`.

## Performance

- R3F scenes mount only while in view (IntersectionObserver) and use `frameloop="demand"` outside active animation windows.
- Single warm light, no shadows, light bloom only.
- Particle counts capped; `will-change` only on actively animating layers.
- Placeholders are pure CSS — zero network weight until real photos are wired.

## Customization Surface

`src/lib/birthday/content.ts` exposes one typed object: her name, hero title, letter paragraphs, date entries, reasons, photo slot ids. Swapping photos later = set a `src` on the corresponding slot id.

## Out of Scope

No AI imagery, no backend, no auth, no analytics, no desktop redesign (mobile canvas centered on larger viewports), no audio.
