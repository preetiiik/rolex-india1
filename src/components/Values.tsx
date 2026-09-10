import valuesBg from "../assets/values-bg.webp";
import Reveal from "./Reveal";

export default function Values() {
  return (
    <section
      className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${valuesBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#14282E]/90 via-[#14282E]/85 to-[#14282E]/95" />

      <Reveal className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <h2
          className="font-bold leading-[1.05] tracking-tight text-white px-5"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Values
        </h2>
        <span className="block w-14 h-[3px] bg-[#4FA8B8] mt-5 mb-8 sm:mb-10" />

        <p className="text-[16px] sm:text-xl leading-[1.7] font-medium text-white/85 max-w-[760px] px-5">
          At Rolex India, our values shape our identity and drive our success. We believe in
          fostering trust through respect, honesty, and ethical business practices, ensuring
          long-term relationships with our customers and partners. Our growth is fueled by
          creativity, innovation, and continuous improvement, allowing us to stay ahead in a
          dynamic industry. With integrity at our core, we remain committed to delivering
          excellence in everything we do.
        </p>
      </Reveal>
    </section>
  );
}