import type { CSSProperties } from "react";

export function BrandLogo({
  name,
  descriptor,
  primary = "#0a2037",
  accent = "#13a7a0",
  compact = false,
}: {
  name: string;
  descriptor: string;
  primary?: string;
  accent?: string;
  compact?: boolean;
}) {
  return (
    <span className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} style={{ "--brand-primary": primary, "--brand-accent": accent } as CSSProperties}>
      <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8.5 8.5v47M29.5 8.5v47M8.5 32h21" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.5" />
        <path d="M30 8.5h6.5C51.8 8.5 61 17.7 61 32S51.8 55.5 36.5 55.5H30" fill="none" stroke="var(--brand-accent)" strokeLinecap="round" strokeWidth="6" />
        <path d="M39.5 10c4.7.7 8.8 2.7 12 5.8" fill="none" stroke="#d8ae43" strokeLinecap="round" strokeWidth="5.8" />
      </svg>
      <span className="brand-words">
        <strong>{name}</strong>
        <small>{descriptor === "YATIRIM DANIŞMANLIK" || descriptor === "OSSEBANK" ? "DANIŞMANLIK" : descriptor}</small>
      </span>
    </span>
  );
}
