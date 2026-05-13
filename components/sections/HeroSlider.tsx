"use client";

import { useEffect, useState, useCallback } from "react";

const slides = [
  { src: "/images/img1.png", alt: "Nesa Komerc - Keramika" },
  { src: "/images/img2.png", alt: "Nesa Komerc - Keramika" },
  { src: "/images/img3.png", alt: "Nesa Komerc - Keramika" },
  { src: "/images/img4.png", alt: "Nesa Komerc - Keramika" },
  { src: "/images/img5.png", alt: "Nesa Komerc - Keramika" },
];

const INTERVAL = 6000;

export default function HeroSlider() {
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
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slike */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;

        return (
          <div
            key={slide.src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${slide.src}')`,
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
            }}
          />
        );
      })}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Sadržaj */}
      <div className="absolute bottom-36 left-0 right-0 z-20 flex flex-col items-center gap-8 text-center text-white">
        <h1 className="text-4xl font-semibold tracking-tighter">
          Svaki detalj je pažljivo odabran
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/proizvodi"
            className="px-8 py-3 rounded-full border border-white text-sm font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-zinc-950 transition-colors duration-200"
          >
            Pogledaj proizvode
          </a>
          <a
            href="/kontakt"
            className="px-8 py-3 rounded-full border border-white text-sm font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-zinc-950 transition-colors duration-200"
          >
            Kontaktirajte nas
          </a>
        </div>
      </div>

      {/* Dots indikatori */}
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
    </section>
  );
}
