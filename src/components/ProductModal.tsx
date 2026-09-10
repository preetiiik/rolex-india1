import { useEffect } from "react";
import { X } from "lucide-react";

interface ProductModalProps {
  product: { title: string; description: string; image: string } | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <div className="relative bg-white   w-full max-w-lg overflow-hidden max-h-[calc(100svh-2rem)] sm:max-h-[90vh] flex flex-col animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9  bg-white/90 text-gray-900 flex items-center justify-center shadow-sm"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="aspect-[4/3] bg-gray-100 flex-shrink-0">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">{product.title}</h3>
          <p className="text-[15px] text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}