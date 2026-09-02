import { useState } from "react";
import { galleryImages } from "../data/content";
import ImageLightbox from "./ImageLightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            5
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Gallery
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
          >
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 px-5 sm:px-8 lg:px-12">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={src}
                alt={`Rolex India facility ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
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
