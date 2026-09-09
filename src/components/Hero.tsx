import heroBg from "../assets/hero-bg.webp";
import heroBg1 from "../assets/hero-bg-1.webp";
import heroBg2 from "../assets/hero-bg-2.png";
import heroBg3 from "../assets/hero-bg-3.webp";
import heroBg4 from "../assets/hero-bg-4.jpg";
import RollButton from "./RollButton";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-dvh bg-[#0d1b1f] overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 20%, rgba(79,168,184,0.25), transparent), radial-gradient(50% 40% at 85% 80%, rgba(47,111,126,0.3), transparent)",
        }}
      />

      <Navbar />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:pb-20 min-h-dvh flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] lg:grid-rows-[auto_auto] gap-10 lg:gap-x-10 lg:gap-y-6 w-full">
          {/* Text content: eyebrow, heading, subtitle */}
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white mb-5">
              <span className="w-8 h-[2px] bg-[#4FA8B8]" />
              Rolex India
            </p>
            <h1
              className="font-bold text-white leading-[1.05] tracking-tight max-w-[520px]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              We provide quality Steel Products
            </h1>
            <p className="text-white/60 text-[15px] sm:text-base leading-relaxed mt-6 max-w-[440px]">
              Trusted in steel since 1990.
            </p>
          </div>

          {/* Photo collage: right column on desktop, spans both rows to stay vertically centered */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex justify-center lg:justify-end items-center gap-3 sm:gap-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <img
                src={heroBg}
                alt="Rolex India steel manufacturing facility"
                className="w-36 sm:w-48 lg:w-56 aspect-[4/5] object-cover"
              />
              <img
                src={heroBg1}
                alt="Rolex India steel production line"
                className="w-36 sm:w-48 lg:w-56 aspect-[4/3] object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 mt-10 sm:mt-14">
              <img
                src={heroBg2}
                alt="Rolex India steel warehouse and inventory"
                className="w-36 sm:w-48 lg:w-56 aspect-[4/5] object-cover"
              />
              <img
                src={heroBg3}
                alt="Rolex India steel quality inspection"
                className="w-36 sm:w-48 lg:w-56 aspect-[4/3] object-cover"
              />
            </div>
            <div className="hidden sm:flex items-center">
              <img
                src={heroBg4}
                alt="Rolex India steel finished products"
                className="w-44 sm:w-56 lg:w-64 aspect-[3/5] object-cover"
              />
            </div>
          </div>

          {/* CTA row: after photos on mobile, back in the left column on desktop */}
          <div className="lg:col-start-1 lg:row-start-2 flex items-center gap-6 sm:gap-8">
            <RollButton text="Contact Us" variant="teal" onClick={() => (window.location.hash = "#contact")} />
            <a
              href="#products"
              className="text-white text-[14px] font-semibold flex items-center gap-2 hover:text-[#4FA8B8] transition-colors duration-300"
            >
              View Products
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}