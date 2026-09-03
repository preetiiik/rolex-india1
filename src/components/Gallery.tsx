import { useState } from "react";
import { galleryImages } from "../data/content";
import ImageLightbox from "./ImageLightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 lg:mb-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522] mb-4">
            A Look Inside
          </p>
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.25rem)" }}
          >
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 sm:gap-4 px-5 sm:px-8 lg:px-12 relative">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`Rolex India facility ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
