import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/content";
import ProductModal from "./ProductModal";

export default function Products() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);

  return (
    <section id="products" className="bg-gray-50 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 lg:mb-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522] mb-4">
            Our Products
          </p>
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 px-5 sm:px-8 lg:px-12 relative">
          {products.map((p, i) => (
            <div
              key={p.title}
              className="group bg-white rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setActive(p)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-gray-900 text-white text-[11px] font-black px-2 py-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5 sm:p-6 border-l-2 border-transparent group-hover:border-[#F26522] transition-colors duration-300">
                <p className="text-[17px] sm:text-lg font-black uppercase text-gray-900 leading-tight">
                  {p.title}
                </p>
                <p className="text-[13px] sm:text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[#F26522] text-xs sm:text-sm font-bold uppercase tracking-wide">
                  View Product
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
