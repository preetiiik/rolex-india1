import { useState } from "react";
import { Eye } from "lucide-react";
import { galleryImages } from "../data/content";
import ImageLightbox from "./ImageLightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-[#EAF1F1] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            className="font-bold leading-[1.05] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Gallery
          </h2>
          <span className="inline-block w-14 h-[3px] bg-[#2F6F7E] mt-5" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 sm:gap-4 px-5 sm:px-8 lg:px-12 relative">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative  overflow-hidden group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`Rolex India facility ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#14282E]/0 group-hover:bg-[#14282E]/50 transition-colors duration-300 flex items-center justify-center">
                <span className="flex items-center justify-center w-11 h-11  bg-[#2F6F7E] text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Eye size={18} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={galleryImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
