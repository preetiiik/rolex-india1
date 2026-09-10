import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null) onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft" && index !== null) onNavigate((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onNavigate]);

  if (!open || index === null) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/85 animate-fade-in" onClick={onClose} />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10  bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-300"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            className="absolute left-3 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12  bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => onNavigate((index + 1) % images.length)}
            className="absolute right-3 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12  bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-300"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <img
        key={index}
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        className="relative z-[5] max-w-full max-h-[calc(100svh-2rem)] sm:max-h-[calc(100vh-4rem)] object-contain animate-scale-in"
      />
    </div>
  );
}