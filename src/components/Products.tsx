import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/content";
import ProductModal from "./ProductModal";

export default function Products() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);

  return (
    <section id="products" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            4
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Featured client work
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          {products.map((p) => (
            <div key={p.title} className="group">
              <div
                className="relative aspect-[329/246] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => setActive(p)}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="h-9 w-9 group-hover:w-[148px] bg-white rounded-full flex items-center overflow-hidden transition-all duration-300 ease-in-out px-0 group-hover:px-3">
                    <span className="text-[13px] font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap mr-2">
                      View product
                    </span>
                    <span className="flex-shrink-0 flex items-center justify-center w-full h-full group-hover:w-auto group-hover:h-auto">
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 -rotate-45 group-hover:rotate-0 mx-auto"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[13px] sm:text-sm text-gray-600 mt-4 leading-relaxed">
                {p.description}
              </p>
              <p className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}