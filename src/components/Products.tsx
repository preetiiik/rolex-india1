import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/content";
import ProductModal from "./ProductModal";

export default function Products() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);

  return (
    <section id="products" className="bg-[#EDEDED] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            4
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Our Products
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2
            className="font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: "clamp(1.75rem, 7vw, 4.2rem)" }}
          >
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 px-5 sm:px-8 lg:px-12">
          {products.map((p) => (
            <div
              key={p.title}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            >
              <div
                className="relative aspect-[329/246] overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => setActive(p)}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="h-9 w-auto bg-white/25 backdrop-blur-md border border-white/40 text-black rounded-full flex items-center px-3 shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:bg-white/35">
                    <span className="text-[13px] font-medium whitespace-nowrap mr-2">
                      View product
                    </span>
                    <span className="flex-shrink-0 flex items-center justify-center">
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[16px] sm:text-[18px] font-semibold text-gray-900">
                  {p.title}
                </p>
                <p className="text-[13px] sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
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