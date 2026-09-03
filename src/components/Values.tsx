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

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522] mb-6 sm:mb-8">
          What Drives Us
        </p>

        <h2
          className="font-black uppercase leading-[0.95] tracking-tight text-white mb-8 sm:mb-10 px-5"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
        >
          Values
        </h2>

        <p className="text-[16px] sm:text-xl leading-[1.7] font-medium text-white/85 max-w-[760px] px-5">
          At Rolex India, our values shape our identity and drive our success. We believe in
          fostering trust through respect, honesty, and ethical business practices, ensuring
          long-term relationships with our customers and partners. Our growth is fueled by
          creativity, innovation, and continuous improvement, allowing us to stay ahead in a
          dynamic industry. With integrity at our core, we remain committed to delivering
          excellence in everything we do.
        </p>
      </div>
    </section>
  );
}