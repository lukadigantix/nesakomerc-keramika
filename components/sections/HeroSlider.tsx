"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { ApiSlide } from "@/lib/api";

const INTERVAL = 6000;

export default function HeroSlider({ slides }: { slides: ApiSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setPrev(current);
      setCurrent(index);
      setAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 1000);
    },
    [animating, current],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) return null;

  const activeSlide = slides[current];

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Slike */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;

        return (
          <div
            key={slide.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${slide.imageUrl}')`,
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
            }}
          />
        );
      })}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Sadržaj */}
      <div className="absolute bottom-36 left-0 right-0 z-20 flex flex-col items-center gap-8 text-center text-white px-6 sm:px-0">
        {activeSlide.title && (
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter">
            {activeSlide.title}
          </h1>
        )}
        {activeSlide.subtitle && (
          <p className="text-sm sm:text-base text-white/80 max-w-xl">
            {activeSlide.subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {activeSlide.buttonText && activeSlide.buttonUrl && (
            <Link
              href={activeSlide.buttonUrl}
              className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#e11d1b] border border-[#e11d1b] text-xs sm:text-sm font-semibold tracking-widest text-white hover:opacity-90 transition-all duration-200"
            >
              {activeSlide.buttonText}
            </Link>
          )}
          <Link
            href="/kontakt"
            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-white text-xs sm:text-sm font-semibold tracking-widest text-white hover:bg-[#e11d1b] hover:border-[#e11d1b] transition-colors duration-200"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </div>

      {/* Dots indikatori */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slajd ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === current
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
