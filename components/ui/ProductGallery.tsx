"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <>
      {/* Gallery */}
      <div className="flex flex-col gap-4">
        {/* Main image */}
        <div
          className="relative w-full aspect-[6/5] rounded-2xl overflow-hidden bg-zinc-50 cursor-zoom-in group"
          onClick={() => openLightbox(activeIndex)}
        >
          <Image
            src={images[activeIndex]}
            alt={productName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          {/* Hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
            </svg>
            Uvećaj
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square rounded-xl overflow-hidden bg-zinc-50 cursor-pointer border-2 transition-all duration-150 ${
                i === activeIndex
                  ? "border-zinc-950"
                  : "border-transparent hover:border-zinc-300"
              }`}
            >
              <Image src={img} alt={`${productName} ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150"
            aria-label="Zatvori"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIndex + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150"
            aria-label="Prethodna"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-3xl max-h-[80vh] aspect-square mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${productName} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150"
            aria-label="Sledeća"
          >
            <ChevronRight size={22} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`relative w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-150 ${
                  i === lightboxIndex ? "border-white" : "border-white/20 hover:border-white/50"
                }`}
              >
                <Image src={img} alt={`${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
