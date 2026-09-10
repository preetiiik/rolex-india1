import { useState } from "react";
import { products } from "../data/content";
import ProductModal from "./ProductModal";
import Reveal from "./Reveal";
import { useReveal } from "../hooks/UseReveal";

interface ProductCardProps {
  p: (typeof products)[number];
  index: number;
  isRevealed: boolean;
  onCardClick: (p: (typeof products)[number]) => void;
}

function ProductCard({ p, index, isRevealed, onCardClick }: ProductCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onClick={() => onCardClick(p)}
      className={`reveal ${visible ? "is-visible" : ""} group relative aspect-[3/4] overflow-hidden cursor-pointer bg-gray-900`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <img
        src={p.image}
        alt={p.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 sm:group-hover:scale-105 ${
          isRevealed ? "scale-105" : ""
        }`}
      />

      {/* Default label, hidden once revealed/hovered */}
      <div
        className={`absolute bottom-4 left-4 bg-[#14181C]/90 px-4 py-2.5 transition-opacity duration-300 sm:group-hover:opacity-0 ${
          isRevealed ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-wide leading-tight">
          {p.title}
        </p>
      </div>

      {/* Mobile-only "+" tap affordance, hidden once revealed */}
      <div
        className={`sm:hidden absolute bottom-4 right-4 flex items-center justify-center h-8 w-8 rounded-full bg-white/15 backdrop-blur-sm transition-opacity duration-300 ${
          isRevealed ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </div>

      {/* Overlay with full info — shown on hover (desktop) or reveal-tap (mobile) */}
      <div
        className={`absolute inset-0 bg-[#14181C]/0 sm:group-hover:bg-[#14181C]/90 transition-colors duration-300 ${
          isRevealed ? "bg-[#14181C]/90" : ""
        }`}
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-5 sm:p-6 opacity-0 translate-y-3 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ${
          isRevealed ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <p className="text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.1em] mb-3">
          {p.title}
        </p>
        <p className="text-white/75 text-[12px] sm:text-[13px] leading-relaxed line-clamp-6">
          {p.description}
        </p>
        {/* Mobile-only hint so the two-tap pattern is discoverable */}
        {isRevealed && (
          <p className="sm:hidden text-[#4FA8B8] text-[11px] font-bold uppercase tracking-wide mt-4">
            Tap again for details
          </p>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);
  // Tracks which card's overlay is "revealed" on touch devices (mimics :hover)
  const [revealed, setRevealed] = useState<string | null>(null);

  const handleCardClick = (p: (typeof products)[number]) => {
    const isTouch = !window.matchMedia("(hover: hover)").matches;

    if (isTouch) {
      // First tap: reveal the overlay, like hover would on desktop.
      if (revealed !== p.title) {
        setRevealed(p.title);
        return;
      }
      // Second tap on the already-revealed card: open the full modal.
    }

    setActive(p);
  };

  return (
    <section id="products" className="bg-[#14181C] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto relative">
        <Reveal className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            className="font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Featured Products
          </h2>
          <span className="inline-block w-14 h-[3px] bg-[#4FA8B8] mt-5" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-5 sm:px-8 lg:px-12 relative">
          {products.map((p, index) => (
            <ProductCard
              key={p.title}
              p={p}
              index={index}
              isRevealed={revealed === p.title}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}