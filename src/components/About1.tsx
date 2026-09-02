import aboutImg from "../assets/about-us.webp";

const diversification = [
  "Furnace Tap Hole Drilling Equipment",
  "Precision Machined Components such as Idler Shafts, Mixer Shafts, and Fan Shafts",
  "Sheet Metal Products, including Electrical Modular Boxes and Idler Bearing Housings",
];

export default function About() {
  return (
    <section id="about" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            1
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Introducing Rolex India
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-20"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
          >
            About Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[36%_1fr] gap-8 lg:gap-14 items-start">
            <img
              src={aboutImg}
              alt="Rolex India manufacturing facility"
              className="w-full aspect-[438/346] object-cover rounded-xl sm:rounded-2xl"
            />

            <div className="text-gray-900">
              <p className="text-[15px] sm:text-base leading-[1.7] font-medium mb-5">
                Rolex India has been a trusted name in the steel industry since its inception in
                1990. What began as a trading company specializing in high-quality steel bars has
                evolved into a dynamic manufacturing powerhouse, catering to engineering industries
                worldwide.
              </p>
              <p className="text-[15px] sm:text-base leading-[1.7] font-medium mb-3">
                Over the years, we have expanded our capabilities beyond trading, venturing into
                the production of Bright Bars ranging from 4mm to 55mm. Our unwavering commitment
                to quality and innovation has enabled us to diversify our product offerings,
                including:
              </p>

              <ul className="mb-5 space-y-2">
                {diversification.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] sm:text-base leading-[1.6] font-medium">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#F26522] flex-shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[15px] sm:text-base leading-[1.7] font-medium mb-5">
                Operating from our 17,000 sq. ft. state-of-the-art manufacturing facility in
                Hubballi, Karnataka, we continuously strive to enhance our processes, ensuring
                efficiency, competitiveness, and precision in every product we deliver.
              </p>

              <p className="text-[15px] sm:text-base leading-[1.7] font-medium mb-5">
                At Rolex India, we believe in fostering long-term partnerships by upholding our
                core values: Trust, Competitiveness, Improvisation, and Efficiency. These
                principles drive us to not only meet but exceed our customers' expectations.
              </p>

              <p className="text-[15px] sm:text-base leading-[1.7] font-medium mb-5">
                As we look to the future, we remain committed to continuous growth, technological
                advancement, and customer success. Whether you're seeking premium steel products
                or precision-engineered components, Rolex India is your trusted partner for
                excellence.
              </p>

              <p className="text-[15px] sm:text-base leading-[1.7] font-semibold">
                Let's build the future together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
