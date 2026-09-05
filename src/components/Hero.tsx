import { useEffect, useRef, useState } from "react";
import heroBg from "../assets/hero-bg.webp";
import heroBg1 from "../assets/hero-bg-1.jpg";
import heroBg2 from "../assets/hero-bg-2.png";
import heroBg3 from "../assets/hero-bg-3.png";
import heroBg4 from "../assets/hero-bg-4.jpg";
import RollButton from "./RollButton";
import Navbar from "./Navbar";

const SLIDES = [
  { src: heroBg, alt: "Rolex India steel manufacturing facility" },
  { src: heroBg1, alt: "Rolex India steel production line" },
  { src: heroBg2, alt: "Rolex India steel warehouse and inventory" },
  { src: heroBg3, alt: "Rolex India steel quality inspection" },
  { src: heroBg4, alt: "Rolex India steel finished products" },
];

const SLIDE_DURATION = 3000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-gray-900"
    >
      <style>{`
        @keyframes heroKenBurns {
          0% {
            transform: scale(1);
          }

          100% {
            transform: scale(1.08);
          }
        }

        .hero-slide-img {
          animation: heroKenBurns 20s ease-in-out infinite alternate;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide-img {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background carousel */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide-img absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
              index === activeIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              transitionDuration: "1000ms",
            }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />

      {/* Extra bottom readability */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-32 sm:px-8 sm:pb-14 md:pb-16 lg:px-12 lg:pb-20">

          {/* Eyebrow */}
          <p className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[13px]">
            <span className="h-[2px] w-8 shrink-0 bg-[#4FA8B8]" />
            <span>Rolex India</span>
          </p>

          {/* Heading */}
          <h1
            className="
              max-w-[850px]
              font-bold
              leading-[1.05]
              tracking-[-0.025em]
              text-white
              text-[2.2rem]
              sm:text-[3.2rem]
              md:text-[3.8rem]
              lg:text-[4.5rem]
              xl:text-[5rem]
            "
          >
            We provide quality
            <br className="hidden sm:block" />
            <span className="text-[#4FA8B8]">
              {" "}Steel Products
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/75 sm:text-[15px] md:text-base">
            Trusted in steel since 1990
          </p>

          {/* CTA */}
          <div className="mt-6 sm:mt-7">
            <RollButton
              text="Contact Us"
              variant="teal"
              onClick={() =>
                (window.location.hash = "#contact")
              }
            />
          </div>

          {/* Slide indicators */}
          <div
            className="mt-8 flex items-center gap-2.5 sm:mt-10"
            role="tablist"
            aria-label="Hero background slides"
          >
            {SLIDES.map((_, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-current={
                    isActive ? "true" : undefined
                  }
                  aria-label={`Show slide ${
                    index + 1
                  } of ${SLIDES.length}`}
                  onClick={() =>
                    handleIndicatorClick(index)
                  }
                  className="group py-2"
                >
                  <span
                    className={`
                      block h-[3px]
                      transition-all duration-300
                      ${
                        isActive
                          ? "w-9 bg-[#4FA8B8]"
                          : "w-4 bg-white/40 group-hover:bg-[#4FA8B8]/70"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
