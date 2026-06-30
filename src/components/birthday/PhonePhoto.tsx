import { type CSSProperties } from "react";

interface PhonePhotoProps {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: string;
  className?: string;
  rounded?: string;
  style?: CSSProperties;
}

/**
 * Premium glass image placeholder. Renders a real <img> when src is provided,
 * otherwise an elegant rose-gold framed glass surface with a centered photo glyph.
 */
export function PhonePhoto({
  src,
  alt = "",
  caption,
  aspect = "4 / 5",
  className = "",
  rounded = "rounded-3xl",
  style,
}: PhonePhotoProps) {
  return (
    <figure
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        aspectRatio: aspect,
        background:
          "linear-gradient(140deg, color-mix(in oklab, var(--blush) 85%, white), color-mix(in oklab, var(--lavender) 70%, white))",
        border: "1px solid color-mix(in oklab, var(--rose-gold) 55%, transparent)",
        boxShadow: "var(--shadow-bloom)",
        ...style,
      }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute inset-3 rounded-[inherit]"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, white 65%, transparent), transparent 60%)",
            }}
          />
          <svg
            viewBox="0 0 24 24"
            className="relative h-10 w-10 opacity-60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            style={{ color: "var(--rose-deep)" }}
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <circle cx="12" cy="12" r="3" />
            <path d="M8 5l1.5-2h5L16 5" />
          </svg>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow:
            "inset 0 1px 0 color-mix(in oklab, white 70%, transparent), inset 0 -40px 60px -30px color-mix(in oklab, var(--rose-deep) 30%, transparent)",
        }}
      />
      {caption && (
        <figcaption
          className="absolute inset-x-0 bottom-0 px-4 py-3 text-center text-xs tracking-wide"
          style={{
            color: "color-mix(in oklab, var(--plum-ink) 80%, white)",
            background:
              "linear-gradient(to top, color-mix(in oklab, white 80%, transparent), transparent)",
            fontFamily: "var(--font-hand)",
            fontSize: "1.05rem",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}