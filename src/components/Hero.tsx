import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
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

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    startAutoplay();
  };

  return (
    <section id="home" className="relative min-h-[78vh] sm:min-h-screen flex flex-col overflow-hidden bg-gray-900">
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

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-30">
        <Navbar />
      </div>

      <div className="flex-1" />

      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
        <p className="text-[13px] sm:text-sm text-white/90 tracking-wide mb-5 sm:mb-8">
          Rolex India
        </p>
        <h1
          className="font-medium text-white leading-[1.08] tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.75rem, 7vw, 4.2rem)" }}
        >
          We provide quality
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Steel Products
        </h1>

        <div className="mt-8 sm:mt-12 flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-5">
          <RollButton text="Contact Us" variant="orange" onClick={() => (window.location.hash = "#contact")} />

          <div className="flex items-center gap-2.5 bg-white rounded-[4px] pl-3 pr-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300 self-start sm:self-auto">
            <ShieldCheck size={20} className="text-[#F26522] flex-shrink-0" />
            <span className="text-[13px] sm:text-sm font-medium text-gray-900">
              Trusted in steel since 1990
            </span>
          </div>
        </div>

        {/* Slide indicator */}
        <div
          className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4"
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
                aria-current={isActive ? "true" : undefined}
                aria-label={`Show slide ${index + 1} of ${SLIDES.length}`}
                onClick={() => handleIndicatorClick(index)}
                className="py-1.5 group"
              >
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 sm:w-8 bg-white"
                      : "w-3 sm:w-4 bg-white/40 group-hover:bg-white/70"
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