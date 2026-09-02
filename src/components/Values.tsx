import valuesBg from "../assets/values-bg.webp";

export default function Values() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <img
        src={valuesBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a3a]/90 via-[#0a1a3a]/85 to-[#0a1a3a]/95" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-gray-900 flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            3
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-white/30 text-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            What Drives Us
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 lg:gap-14">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
          >
            Values
          </h2>
          <p className="text-[15px] sm:text-lg leading-[1.7] font-medium text-white/90 max-w-[640px]">
            At Rolex India, our values shape our identity and drive our success. We believe in
            fostering trust through respect, honesty, and ethical business practices, ensuring
            long-term relationships with our customers and partners. Our growth is fueled by
            creativity, innovation, and continuous improvement, allowing us to stay ahead in a
            dynamic industry. With integrity at our core, we remain committed to delivering
            excellence in everything we do.
          </p>
        </div>
      </div>
    </section>
  );
}