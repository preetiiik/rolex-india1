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
      <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">

          {/* Section label */}
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
              2
            </span>

            <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              What We Do
            </span>
          </div>

          <div className="px-5 sm:px-8 lg:px-12">

            {/* Main heading */}
            <h2
              className="font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
            >
              What We Do
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

              {/* =================================================
                  LEFT SIDE
              ================================================= */}
              <div>

                <ul className="space-y-2 sm:space-y-3">
                  {whatWeDo.map((item, index) => (
                    <li key={item.n}>

                      {/* Capability item */}
                      <div
                        onMouseEnter={() => {
                          if (
                            !window.matchMedia("(hover: hover)").matches
                          ) {
                            return;
                          }

                          /*
                           * Immediately show the corresponding image
                           * and pause the slideshow.
                           */
                          setActiveIndex(index);
                          setHovered(item.n);
                        }}
                        onMouseLeave={() => {
                          if (
                            !window.matchMedia("(hover: hover)").matches
                          ) {
                            return;
                          }

                          /*
                           * Resume automatic slideshow.
                           */
                          setHovered(null);
                        }}
                        onClick={() => {
                          /*
                           * On touch devices, clicking the item
                           * selects its image.
                           */
                          if (
                            window.matchMedia("(hover: hover)").matches
                          ) {
                            return;
                          }

                          setActiveIndex(index);

                          setHovered((prev) =>
                            prev === item.n ? null : item.n
                          );
                        }}
                        className={`group flex gap-4 sm:gap-5 rounded-xl px-3 py-3 sm:px-4 sm:py-4 -mx-3 sm:-mx-4 transition-colors duration-300 hover:bg-white cursor-pointer lg:cursor-default ${
                          hovered === item.n ? "bg-white" : ""
                        }`}
                      >

                        {/* Number */}
                        <span
                          className={`text-2xl sm:text-3xl font-medium leading-none w-8 flex-shrink-0 transition-colors duration-300 ${
                            hovered === item.n
                              ? "text-[#F26522]"
                              : "text-gray-300 group-hover:text-[#F26522]"
                          }`}
                        >
                          {item.n}
                        </span>

                        {/* Text */}
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

                      {/* =================================================
                          MOBILE / TABLET IMAGE
                      ================================================= */}
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

                {/* =================================================
                    MOBILE / TABLET BUTTON
                ================================================= */}
                <button
                  type="button"
                  onClick={openGallery}
                  className="
                    lg:hidden
                    group
                    mt-6
                    w-fit
                    inline-flex
                    items-center
                    gap-2.5
                    rounded-full
                    bg-[#F26522]
                    text-white
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-[#d95416]
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  <span>5 Core Capabilities</span>

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      w-6
                      h-6
                      rounded-full
                      bg-white/20
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  >
                    ↗
                  </span>
                </button>

              </div>

              {/* =================================================
                  RIGHT SIDE - DESKTOP
              ================================================= */}
              <div className="hidden lg:flex flex-col w-full gap-4">

                {/* Image slideshow */}
                <div className="relative w-full aspect-[900/600] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900">

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

                  {/* Slideshow indicators */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                    {whatWeDo.map((item, index) => (
                      <span
                        key={item.n}
                        className={`rounded-full transition-all duration-500 ${
                          activeIndex === index
                            ? "w-8 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* =================================================
                    DESKTOP BUTTON
                ================================================= */}
                <button
                  type="button"
                  onClick={openGallery}
                  className="
                    group
                    self-start
                    w-fit
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#F26522]
                    text-white
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-[#d95416]
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  <span>5 Core Capabilities</span>

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      w-6
                      h-6
                      rounded-full
                      bg-white/20
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  >
                    ↗
                  </span>
                </button>

              </div>
            </div>
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