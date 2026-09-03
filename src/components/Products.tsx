import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/content";
import ProductModal from "./ProductModal";

export default function Products() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);

  return (
    <section id="products" className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            className="font-bold leading-[1.05] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Featured Products
          </h2>
          <span className="inline-block w-14 h-[3px] bg-[#2F6F7E] mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 px-5 sm:px-8 lg:px-12 relative">
          {products.map((p, i) => (
            <div
              key={p.title}
              className="group bg-[#EAF1F1]  overflow-hidden cursor-pointer"
              onClick={() => setActive(p)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white text-gray-900 text-[11px] font-bold px-2 py-1 ">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[17px] sm:text-lg font-bold text-gray-900 leading-tight">
                  {p.title}
                </p>
                <p className="text-[13px] sm:text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[#2F6F7E] text-xs sm:text-sm font-bold">
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
