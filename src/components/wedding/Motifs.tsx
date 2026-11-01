import { useId } from "react";

/** Decorative Marathi wedding motifs: toran garland, lotus divider and paithani border. */

const leafPath = "M0 0 C 6 6, 6 18, 0 26 C -6 18, -6 6, 0 0 Z";

/** A hanging toran of marigolds and mango leaves, tiled across the width. */
export const Toran = ({ className = "" }: { className?: string }) => {
  const id = `toran-${useId().replace(/:/g, "")}`;
  return (
  <svg aria-hidden className={`block w-full h-12 ${className}`}>
    <defs>
      <pattern id={id} width="40" height="48" patternUnits="userSpaceOnUse">
        {/* string */}
        <path d="M0 6 Q 20 14 40 6" fill="none" stroke="hsl(var(--zari))" strokeWidth="1" />
        {/* mango leaves */}
        <g transform="translate(10 9)">
          <path d={leafPath} fill="hsl(var(--paithani))" />
          <path d="M0 2 L0 24" stroke="hsl(var(--zari) / 0.5)" strokeWidth="0.6" />
        </g>
        <g transform="translate(30 9)">
          <path d={leafPath} fill="hsl(150 40% 30%)" />
          <path d="M0 2 L0 24" stroke="hsl(var(--zari) / 0.5)" strokeWidth="0.6" />
        </g>
        {/* marigold */}
        <circle cx="20" cy="14" r="5.5" fill="hsl(32 95% 52%)" />
        <circle cx="20" cy="14" r="3.4" fill="hsl(var(--haldi))" />
        <circle cx="20" cy="14" r="1.2" fill="hsl(var(--maroon))" />
        <circle cx="20" cy="22.5" r="2.6" fill="hsl(32 95% 52%)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
  );
};

/** Ornamental divider: gold lines around a small lotus. */
export const LotusDivider = ({ className = "", light = false }: { className?: string; light?: boolean }) => {
  const line = light ? "hsl(var(--zari) / 0.7)" : "hsl(var(--haldi))";
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 md:w-16" style={{ background: `linear-gradient(90deg, transparent, ${line})` }} />
      <svg viewBox="0 0 40 24" className="h-5 w-8">
        <path d="M20 2 C 25 8, 25 16, 20 22 C 15 16, 15 8, 20 2 Z" fill="hsl(var(--haldi))" />
        <path d="M20 22 C 12 20, 7 14, 6 8 C 13 10, 18 15, 20 22 Z" fill={light ? "hsl(var(--zari))" : "hsl(var(--rose-foreground))"} />
        <path d="M20 22 C 28 20, 33 14, 34 8 C 27 10, 22 15, 20 22 Z" fill={light ? "hsl(var(--zari))" : "hsl(var(--rose-foreground))"} />
        <path d="M4 22 H36" stroke={line} strokeWidth="1" />
      </svg>
      <span className="h-px w-12 md:w-16" style={{ background: `linear-gradient(270deg, transparent, ${line})` }} />
    </div>
  );
};

export const PaithaniBorder = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`paithani-border ${className}`} />
);
