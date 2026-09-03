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
    if (intervalRef.current) clearInterval(intervalRef.current);
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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="home" className="relative min-h-[88vh] sm:min-h-screen flex flex-col overflow-hidden bg-gray-900">
      <style>{`
        @keyframes heroKenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1.2%, -1%); }
        }
        .hero-slide-img {
          animation: heroKenBurns 20s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide-img {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background carousel */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide-img absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: "1000ms" }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <Navbar />

      <div className="flex-1" />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-end">
          <h1
            className="font-black uppercase text-white leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 8.5vw, 6.5rem)" }}
          >
            We provide quality
            <br />
            Steel Products
          </h1>

          <div className="bg-[#F26522] rounded-lg p-6 sm:p-7 flex-shrink-0 w-full">
            <p className="text-white text-[14px] sm:text-[15px] font-medium leading-snug mb-5">
              Trusted in steel since 1990
            </p>
            <RollButton text="Contact Us" variant="dark" onClick={() => (window.location.hash = "#contact")} />
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex items-center gap-2.5" role="tablist" aria-label="Hero background slides">
          {SLIDES.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Show slide ${index + 1} of ${SLIDES.length}`}
                onClick={() => handleIndicatorClick(index)}
                className="py-1"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-300 ${
                    isActive ? "w-8 bg-[#F26522]" : "w-4 bg-white/40 hover:bg-white/70"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
