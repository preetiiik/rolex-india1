import { useEffect, useState } from "react";
import { whatWeDo } from "../data/content";

export default function WhatWeDo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  /*
   * Automatic slideshow
   *
   * The slideshow runs normally.
   * It pauses when:
   * 1. A What We Do item is hovered
   * 2. The gallery popup is open
   */
  useEffect(() => {
    if (hovered !== null || isGalleryOpen) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % whatWeDo.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [hovered, isGalleryOpen]);

  /*
   * Keyboard controls
   *
   * These keyboard controls ONLY exist while
   * the gallery popup is open.
   */
  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();

        setActiveIndex((prev) => (prev + 1) % whatWeDo.length);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setActiveIndex(
          (prev) => (prev - 1 + whatWeDo.length) % whatWeDo.length
        );
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen]);

  /*
   * Open gallery
   */
  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  /*
   * Close gallery
   */
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  /*
   * Previous image
   */
  const previousImage = () => {
    setActiveIndex(
      (prev) => (prev - 1 + whatWeDo.length) % whatWeDo.length
    );
  };

  /*
   * Next image
   */
  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % whatWeDo.length);
  };

  return (
    <>
      {/* =========================================================
          WHAT WE DO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522] mb-4">
            What We Do
          </p>
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            What We Do
          </h2>
        </div>

        {/* Full-bleed feature image with numbered overlay row */}
        <div className="relative w-full h-[56vh] sm:h-[64vh] bg-gray-900 mb-4 sm:mb-6">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-10">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              {whatWeDo.map((item, index) => (
                <button
                  key={item.n}
                  type="button"
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
                  className={`text-left border-t-2 pt-3 transition-colors duration-300 ${
                    activeIndex === index ? "border-[#F26522]" : "border-white/25 hover:border-white/60"
                  }`}
                >
                  <span
                    className={`block text-[22px] sm:text-3xl font-black transition-colors duration-300 ${
                      activeIndex === index ? "text-[#F26522]" : "text-white/50"
                    }`}
                  >
                    {String(item.n).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-28">
          <p className="text-[16px] sm:text-xl font-semibold text-gray-900 leading-snug mb-10 sm:mb-14 max-w-[820px]">
            {whatWeDo[activeIndex].text}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whatWeDo.map((item) => (
              <div key={item.n} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img src={item.image} alt={item.text} className="w-full aspect-[4/3] object-cover" />
                <div className="p-5 sm:p-6">
                  <span className="text-[#F26522] font-black text-sm">{String(item.n).padStart(2, "0")}</span>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] font-medium text-gray-700 mt-2">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={openGallery}
              className="group flex flex-col items-start justify-center gap-3 bg-[#F26522] rounded-lg p-6 text-left hover:bg-[#d95416] transition-colors duration-300"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
              <span className="text-white font-black uppercase text-lg leading-tight">
                5 Core Capabilities
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY POPUP
      ========================================================= */}
      {isGalleryOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-3
            sm:p-6
          "
          onMouseDown={(event) => {
            /*
             * Clicking only the dark background closes the popup.
             */
            if (event.target === event.currentTarget) {
              closeGallery();
            }
          }}
        >
          {/* =====================================================
              POPUP CONTAINER
          ===================================================== */}
          <div className="
            relative
            w-full
            max-w-6xl
            max-h-[94vh]
            bg-white
            rounded-2xl
            sm:rounded-3xl
            overflow-hidden
            shadow-2xl
          ">

            {/* =================================================
                POPUP HEADER
            ================================================= */}
            <div className="
              flex
              items-start
              justify-between
              gap-4
              px-5
              sm:px-7
              py-4
              border-b
              border-gray-200
            ">

              <div className="min-w-0 pr-2">

                <p className="
                  text-[10px]
                  sm:text-xs
                  text-gray-400
                  font-medium
                  uppercase
                  tracking-wider
                ">
                  5 Core Capabilities
                </p>

                <h3 className="
                  text-base
                  sm:text-xl
                  font-semibold
                  text-gray-900
                  mt-1
                  leading-tight
                ">
                  {whatWeDo[activeIndex].text}
                </h3>

              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={closeGallery}
                aria-label="Close gallery"
                className="
                  flex-shrink-0
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-full
                  bg-gray-100
                  text-gray-700
                  flex
                  items-center
                  justify-center
                  text-lg
                  sm:text-xl
                  transition-colors
                  hover:bg-gray-200
                "
              >
                ×
              </button>

            </div>

            {/* =================================================
                MAIN IMAGE
            ================================================= */}
            <div className="relative bg-gray-950">

              <div className="
                w-full
                h-[48vh]
                sm:h-[60vh]
                flex
                items-center
                justify-center
              ">
                <img
                  src={whatWeDo[activeIndex].image}
                  alt={whatWeDo[activeIndex].text}
                  className="
                    max-w-full
                    max-h-full
                    w-full
                    h-full
                    object-contain
                  "
                />
              </div>

              {/* =================================================
                  SMALL PREVIOUS ARROW
              ================================================= */}
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="
                  absolute
                  left-3
                  sm:left-5
                  top-1/2
                  -translate-y-1/2
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-full
                  bg-white/90
                  text-gray-900
                  flex
                  items-center
                  justify-center
                  text-base
                  shadow-md
                  transition-all
                  hover:bg-white
                  hover:scale-105
                "
              >
                ←
              </button>

              {/* =================================================
                  SMALL NEXT ARROW
              ================================================= */}
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="
                  absolute
                  right-3
                  sm:right-5
                  top-1/2
                  -translate-y-1/2
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-full
                  bg-white/90
                  text-gray-900
                  flex
                  items-center
                  justify-center
                  text-base
                  shadow-md
                  transition-all
                  hover:bg-white
                  hover:scale-105
                "
              >
                →
              </button>

            </div>

            {/* =================================================
                POPUP FOOTER
            ================================================= */}
            <div className="
              px-5
              sm:px-7
              py-4
              sm:py-5
            ">

              {/* Counter + keyboard instruction */}
              <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-4
              ">

                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>

                  {" / "}

                  {String(whatWeDo.length).padStart(2, "0")}
                </p>

                <p className="
                  hidden
                  sm:block
                  text-xs
                  text-gray-400
                ">
                  ← → Navigate · Esc Close
                </p>

              </div>

              {/* =================================================
                  THUMBNAILS
              ================================================= */}
              <div className="
                flex
                gap-2
                sm:gap-3
                overflow-x-auto
                pb-1
              ">
                {whatWeDo.map((item, index) => (
                  <button
                    key={item.n}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View capability ${index + 1}`}
                    className={`relative flex-shrink-0 w-16 h-12 sm:w-28 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeIndex === index
                        ? "border-[#F26522] ring-2 ring-[#F26522]/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >

                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />

                    <span
                      className={`absolute bottom-1 left-1 text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        activeIndex === index
                          ? "bg-[#F26522] text-white"
                          : "bg-black/60 text-white"
                      }`}
                    >
                      {item.n}
                    </span>

                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}