import { useEffect, useState } from "react";
import { whatWeDo } from "../data/content";

export default function WhatWeDo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Automatic slideshow
   *
   * The slideshow runs normally.
   * It pauses when a What We Do item is hovered.
   */
  useEffect(() => {
    if (hovered !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % whatWeDo.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Full-bleed feature image with floating info card */}
      <div className="relative w-full h-[56vh] sm:h-[64vh] bg-gray-900">
        {whatWeDo.map((item, index) => (
          <img
            key={item.n}
            src={item.image}
            alt={item.text}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-end sm:items-center justify-center sm:justify-end pb-6 sm:pb-0">
          <div className="bg-white shadow-2xl p-6 sm:p-8 w-[90%] sm:w-full max-w-[420px]">
            <p className="text-[16px] sm:text-lg font-semibold text-gray-900 leading-snug">
              {whatWeDo[activeIndex].text}
            </p>
            <span className="block w-10 h-[3px] bg-[#2F6F7E] mt-4 mb-4" />
            <div className="flex items-center gap-2.5">
              {whatWeDo.map((item, index) => (
                <button
                  key={item.n}
                  type="button"
                  aria-label={`Show capability ${item.n}`}
                  onMouseEnter={() => {
                    if (!window.matchMedia("(hover: hover)").matches) return;
                    setActiveIndex(index);
                    setHovered(item.n);
                  }}
                  onMouseLeave={() => {
                    if (!window.matchMedia("(hover: hover)").matches) return;
                    setHovered(null);
                  }}
                  onClick={() => setActiveIndex(index)}
                  className="py-1"
                >
                  <span
                    className={`block h-[3px] transition-all duration-300 ${
                      activeIndex === index ? "w-7 bg-[#2F6F7E]" : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
        <div className="text-center mb-10 sm:mb-14">
          <h2
            className="font-bold leading-[1.05] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            What We Do
          </h2>
          <span className="inline-block w-14 h-[3px] bg-[#2F6F7E] mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whatWeDo.map((item) => (
            <div key={item.n} className="bg-[#EAF1F1] overflow-hidden">
              <img src={item.image} alt={item.text} className="w-full aspect-[4/3] object-cover" />
              <div className="p-5 sm:p-6">
                <p className="text-[14px] sm:text-[15px] leading-[1.6] font-medium text-gray-700">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
