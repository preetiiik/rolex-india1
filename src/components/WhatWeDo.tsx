import { useState } from "react";
import { Boxes, Cog, Layers, Package, Wrench } from "lucide-react";
import { whatWeDo } from "../data/content";

const icons: Record<number, typeof Layers> = {
  1: Layers,
  2: Cog,
  3: Boxes,
  4: Wrench,
  5: Package,
};

export default function WhatWeDo() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            2
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            What We Do
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
          >
            What We Do
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <ul className="space-y-2 sm:space-y-3">
              {whatWeDo.map((item) => (
                <li key={item.n}>
                  <div
                    onMouseEnter={() => {
                      if (!window.matchMedia("(hover: hover)").matches) return;
                      setHovered(item.n);
                    }}
                    onMouseLeave={() => {
                      if (!window.matchMedia("(hover: hover)").matches) return;
                      setHovered(null);
                    }}
                    onClick={() => {
                      if (window.matchMedia("(hover: hover)").matches) return;
                      setHovered((prev) => (prev === item.n ? null : item.n));
                    }}
                    className="group flex gap-4 sm:gap-5 rounded-xl px-3 py-3 sm:px-4 sm:py-4 -mx-3 sm:-mx-4 transition-colors duration-300 hover:bg-white cursor-pointer lg:cursor-default"
                  >
                    <span className="text-2xl sm:text-3xl font-medium text-gray-300 leading-none w-8 flex-shrink-0 transition-colors duration-300 group-hover:text-[#F26522]">
                      {item.n}
                    </span>
                    <p className="text-[15px] sm:text-base leading-[1.6] font-medium text-gray-900 pt-0.5 transition-transform duration-300 group-hover:translate-x-1">
                      {item.text}
                    </p>
                  </div>

                  {/* Mobile/tablet only: image drops in directly under the tapped item */}
                  <div
                    className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                      hovered === item.n ? "max-h-[320px] opacity-100 mt-2 mb-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full aspect-[4/3] object-cover rounded-xl"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block relative w-full aspect-[900/600] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden">
              {/* Default panel, shown when nothing is hovered */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-8 sm:gap-10 bg-gray-900 px-6 transition-opacity duration-500 ${
                  hovered === null ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {whatWeDo.map((item) => {
                    const Icon = icons[item.n];
                    return (
                      <div
                        key={item.n}
                        className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center"
                      >
                        <Icon size={20} className="text-[#F26522]" />
                      </div>
                    );
                  })}
                </div>
                <div className="text-center">
                  <p className="text-white text-2xl sm:text-3xl font-medium mb-2">
                    5 Core Capabilities
                  </p>
                  <p className="text-white/50 text-[13px] sm:text-sm">
                    Hover a line item to see it in action
                  </p>
                </div>
              </div>

              {/* One image per What We Do item, crossfaded in on hover */}
              {whatWeDo.map((item) => (
                <img
                  key={item.n}
                  src={item.image}
                  alt={item.text}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    hovered === item.n ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}