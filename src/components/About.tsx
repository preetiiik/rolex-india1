import aboutImg from "../assets/about-us.webp";
import barsBundleImg from "../assets/what-we-do.webp";

const diversification = [
  "Furnace Tap Hole Drilling Equipment",
  "Precision Machined Components such as Idler Shafts, Mixer Shafts, and Fan Shafts",
  "Sheet Metal Products, including Electrical Modular Boxes and Idler Bearing Housings",
];

export default function About() {
  return (
    <section id="about" className="bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-28">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522] mb-4">
          Introducing Rolex India
        </p>
        <h2
          className="font-black uppercase leading-[0.95] tracking-tight text-gray-900 mb-10 sm:mb-14"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
        >
          About Us
        </h2>
      </div>

      {/* Full-width banner */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[58vh] mb-12 sm:mb-16">
        <img
          src={aboutImg}
          alt="Rolex India manufacturing facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content row */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[32%_1fr] gap-10 lg:gap-14">
          <div>
            <img
              src={barsBundleImg}
              alt="Bundle of finished steel bars"
              className="w-full aspect-[4/5] object-cover rounded-lg lg:sticky lg:top-24"
            />
          </div>

          <div className="text-gray-900">
            <p className="text-[17px] sm:text-xl leading-[1.6] font-semibold mb-8 max-w-[720px]">
              Rolex India has been a trusted name in the steel industry since its inception in
              1990. What began as a trading company specializing in high-quality steel bars has
              evolved into a dynamic manufacturing powerhouse, catering to engineering industries
              worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.1fr] gap-8 sm:gap-10 mb-8 pt-8 border-t-2 border-gray-900">
              <p className="text-[15px] leading-[1.7] text-gray-600">
                Over the years, we have expanded our capabilities beyond trading, venturing into
                the production of Bright Bars ranging from 4mm to 55mm. Our unwavering commitment
                to quality and innovation has enabled us to diversify our product offerings,
                including:
              </p>

              <ul className="space-y-3">
                {diversification.map((d) => (
                  <li key={d} className="flex gap-3 text-[14px] sm:text-[15px] leading-[1.5] font-medium text-gray-800 bg-gray-50 rounded-md px-4 py-3">
                    <span className="text-[#F26522] font-black flex-shrink-0">→</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[15px] leading-[1.7] text-gray-600 mb-5 max-w-[720px]">
              Operating from our 17,000 sq. ft. state-of-the-art manufacturing facility in
              Hubballi, Karnataka, we continuously strive to enhance our processes, ensuring
              efficiency, competitiveness, and precision in every product we deliver.
            </p>

            <p className="text-[15px] leading-[1.7] text-gray-600 mb-5 max-w-[720px]">
              At Rolex India, we believe in fostering long-term partnerships by upholding our
              core values: Trust, Competitiveness, Improvisation, and Efficiency. These
              principles drive us to not only meet but exceed our customers' expectations.
            </p>

            <p className="text-[15px] leading-[1.7] text-gray-600 mb-6 max-w-[720px]">
              As we look to the future, we remain committed to continuous growth, technological
              advancement, and customer success. Whether you're seeking premium steel products
              or precision-engineered components, Rolex India is your trusted partner for
              excellence.
            </p>

            <p className="text-[18px] sm:text-xl leading-[1.6] font-black uppercase text-[#F26522]">
              Let's build the future together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
