import { useEffect, useState } from "react";
// import { Boxes, Cog, Layers, Package, Wrench } from "lucide-react";
import { whatWeDo } from "../data/content";

// const icons: Record<number, typeof Layers> = {
//   1: Layers,
//   2: Cog,
//   3: Boxes,
//   4: Wrench,
//   5: Package,
// };

export default function WhatWeDo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Automatically change the image every 2.5 seconds.
   * The rotation pauses whenever a What We Do item is hovered.
   */
  useEffect(() => {
    // Don't run the automatic slideshow while hovering
    if (hovered !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % whatWeDo.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            2
          </span>

          <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
           Our Expertise
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

            {/* LEFT SIDE */}
            <ul className="space-y-2 sm:space-y-3">
              {whatWeDo.map((item, index) => (
                <li key={item.n}>
                  <div
                    onMouseEnter={() => {
                      if (!window.matchMedia("(hover: hover)").matches) return;

                      // Immediately show the corresponding image
                      setActiveIndex(index);
                      setHovered(item.n);
                    }}
                    onMouseLeave={() => {
                      if (!window.matchMedia("(hover: hover)").matches) return;

                      // Resume automatic rotation
                      setHovered(null);
                    }}
                    onClick={() => {
                      if (window.matchMedia("(hover: hover)").matches) return;

                      // Mobile/tablet behavior
                      setActiveIndex(index);
                      setHovered((prev) =>
                        prev === item.n ? null : item.n
                      );
                    }}
                    className={`group flex gap-4 sm:gap-5 rounded-xl px-3 py-3 sm:px-4 sm:py-4 -mx-3 sm:-mx-4 transition-colors duration-300 hover:bg-white cursor-pointer lg:cursor-default ${
                      hovered === item.n ? "bg-white" : ""
                    }`}
                  >
                    <span
                      className={`text-2xl sm:text-3xl font-medium leading-none w-8 flex-shrink-0 transition-colors duration-300 ${
                        hovered === item.n
                          ? "text-[#F26522]"
                          : "text-gray-300 group-hover:text-[#F26522]"
                      }`}
                    >
                      {item.n}
                    </span>

                    <p
                      className={`text-[15px] sm:text-base leading-[1.6] font-medium text-gray-900 pt-0.5 transition-transform duration-300 ${
                        hovered === item.n
                          ? "translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>

                  {/* Mobile / Tablet image */}
                  <div
                    className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                      hovered === item.n
                        ? "max-h-[320px] opacity-100 mt-2 mb-1"
                        : "max-h-0 opacity-0"
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

            {/* RIGHT SIDE - DESKTOP SLIDESHOW */}
            <div className="hidden lg:block relative w-full aspect-[900/600] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900">

              {whatWeDo.map((item, index) => (
                <img
                  key={item.n}
                  src={item.image}
                  alt={item.text}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeIndex === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              ))}

              {/* Small progress indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {whatWeDo.map((item, index) => (
                  <span
                    key={item.n}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}