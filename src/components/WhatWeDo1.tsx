import { whatWeDo } from "../data/content";
import img1 from "../assets/what-we-do.webp";
import img2 from "../assets/what-we-do1.webp";

export default function WhatWeDo() {
  return (
    <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            2
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            What We Do
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
          >
            What We Do
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <ul className="space-y-2 sm:space-y-3">
              {whatWeDo.map((item) => (
                <li
                  key={item.n}
                  className="group flex gap-4 sm:gap-5 rounded-xl px-3 py-3 sm:px-4 sm:py-4 -mx-3 sm:-mx-4 transition-colors duration-300 hover:bg-white cursor-default"
                >
                  <span className="text-2xl sm:text-3xl font-medium text-gray-300 leading-none w-8 flex-shrink-0 transition-colors duration-300 group-hover:text-[#F26522]">
                    {item.n}
                  </span>
                  <p className="text-[15px] sm:text-base leading-[1.6] font-medium text-gray-900 pt-0.5 transition-transform duration-300 group-hover:translate-x-1">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="sm:w-[42%] w-full aspect-[438/346] rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={img1}
                  alt="Bright steel bars in production"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="sm:w-[58%] w-full aspect-[900/600] rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={img2}
                  alt="Manufacturing facility floor"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}