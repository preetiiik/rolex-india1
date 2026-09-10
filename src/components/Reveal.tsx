import type { ReactNode } from "react";
import { useReveal } from "../hooks/UseReveal";

interface RevealProps {
  children: ReactNode;
  /** "up": fade + slide up (default). "fade": opacity only — use on ancestors
   *  of position:sticky/fixed elements, since transforms would break those. */
  variant?: "up" | "fade";
  delay?: number;
  className?: string;
}

export default function Reveal({ children, variant = "up", delay = 0, className = "" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const base = variant === "fade" ? "reveal-fade" : "reveal";

  return (
    <div
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}