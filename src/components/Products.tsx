import { useState } from "react";
import { products } from "../data/content";
import ProductModal from "./ProductModal";

export default function Products() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);

  return (
    <section id="products" className="bg-[#14181C] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            className="font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Featured Products
          </h2>
          <span className="inline-block w-14 h-[3px] bg-[#4FA8B8] mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-5 sm:px-8 lg:px-12 relative">
          {products.map((p) => (
            <div
              key={p.title}
              onClick={() => setActive(p)}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-gray-900"
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Default label, hidden on hover */}
              <div className="absolute bottom-4 left-4 bg-[#14181C]/90 px-4 py-2.5 transition-opacity duration-300 group-hover:opacity-0">
                <p className="text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-wide leading-tight">
                  {p.title}
                </p>
              </div>

              {/* Hover overlay with full info */}
              <div className="absolute inset-0 bg-[#14181C]/0 group-hover:bg-[#14181C]/90 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 sm:p-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.1em] mb-3">
                  {p.title}
                </p>
                <p className="text-white/75 text-[12px] sm:text-[13px] leading-relaxed line-clamp-6">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
