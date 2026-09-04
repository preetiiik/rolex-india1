import { useEffect, useRef, useState } from "react";
import { Layers, Cog, Factory } from "lucide-react";
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

// Titles are taken verbatim from the diversification list in About.tsx;
// descriptions are taken verbatim from the whatWeDo entries in data/content.ts.
const HERO_CARDS = [
  {
    icon: Layers,
    title: "Bright Bars",
    text: "We manufacture Bright Bars in various shapes and sizes.",
  },
  {
    icon: Cog,
    title: "Precision Machined Components such as Idler Shafts, Mixer Shafts, and Fan Shafts",
    text: "Our machining facility specializes in producing idler shafts, fan shafts, and mixer shafts.",
  },
  {
    icon: Factory,
    title: "Furnace Tap Hole Drilling Equipment",
    text: "We manufacture Furnace Tap Hole Drill equipment and currently supply to JSW Steel plants and AMNS in Hazira.",
  },
];

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
    <section id="home" className="relative min-h-dvh flex flex-col overflow-hidden bg-gray-900">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />

      <Navbar />

      {/* Remaining hero height is split 70/30: top is pure imagery, bottom holds the text content. */}
      <div className="flex-1 flex flex-col">
        <div className="flex-[7]" />
        <div className="flex-[3] relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-4 sm:pb-6">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-white mb-4">
            <span className="w-8 h-[2px] bg-[#4FA8B8]" />
            Rolex India
          </p>
          <h1
            className="font-bold text-white leading-[1.15] tracking-tight max-w-[720px]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            We provide quality Steel Products
          </h1>
          <p className="text-white/70 text-[14px] sm:text-[15px] mt-4 mb-7">
            Trusted in steel since 1990
          </p>

          <div className="mt-2 flex items-center gap-2.5" role="tablist" aria-label="Hero background slides">
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
                    className={`block h-[3px]  transition-all duration-300 ${
                      isActive ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#14282E]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {HERO_CARDS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col h-full border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white font-semibold text-[16px] leading-snug max-w-[180px]">{title}</h3>
                <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#4FA8B8]/15 text-[#4FA8B8]">
                  <Icon size={18} />
                </span>
              </div>
              <p className="text-white/60 text-[13px] leading-[1.6] mb-5">{text}</p>
              <RollButton
                text="Discover More"
                variant="outline"
                size="sm"
                className="mt-auto self-start"
                onClick={() => (window.location.hash = "#products")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
