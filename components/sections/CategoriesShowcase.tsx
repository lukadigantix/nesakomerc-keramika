"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const GAP = 16;

const categories = [
  { title: "Baterije",  subtitle: "Slavine i baterije",   image: "/images/baterije2.png", href: "/proizvodi/slavine-baterije" },
  { title: "Šolje",     subtitle: "WC šolje i daske",      image: "/images/solje2.png",    href: "/proizvodi/sanitarije" },
  { title: "Lavaboi",   subtitle: "Umivaonici i lavaboi",  image: "/images/lavaboi2.png",  href: "/proizvodi/lavaboi" },
  { title: "Kade",      subtitle: "Samostojeće kade",      image: "/images/kade2.png",     href: "/proizvodi/samostojece-kade" },
  { title: "Keramika",  subtitle: "Podne i zidne pločice", image: "/images/baterije2.png", href: "/proizvodi/keramika" },
  { title: "Ogledala",  subtitle: "LED i klasična ogledala",image: "/images/solje2.png",   href: "/proizvodi/klasicna-i-led-ogledala" },
  { title: "Vertikale", subtitle: "Toplotni radijatori",   image: "/images/lavaboi2.png",  href: "/proizvodi/vertikale" },
  { title: "Galanterija",subtitle: "Kupatilski dodaci",    image: "/images/kade2.png",     href: "/proizvodi/galanterija" },
];

export default function CategoriesShowcase() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cardRatio = containerWidth < 640 ? 0.78 : containerWidth < 1024 ? 0.42 : 0.28;
  const cardWidth = Math.floor(containerWidth * cardRatio);
  const step = cardWidth + GAP;
  const totalTrackWidth = categories.length * cardWidth + (categories.length - 1) * GAP;

  const peekOffset = containerWidth < 640 ? 16 : 0;
  const idealTranslate = containerWidth / 2 - cardWidth / 2 - current * step;
  const minTranslate = containerWidth - totalTrackWidth;
  const translateX = containerWidth > 0
    ? Math.min(peekOffset, Math.max(minTranslate, idealTranslate))
    : 0;

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(categories.length - 1, i + 1));

  return (
    <section className="py-16 border-t border-zinc-100" style={{ backgroundColor: "#fafafa" }}>
      {/* Header */}
      <Wrapper className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
            Kategorije
          </p>
          <h2 className="text-3xl max-[1329px]:text-2xl font-bold text-zinc-950 leading-tight">
            Istražite asortiman
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/proizvodi"
            className="hidden sm:block text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950"
          >
            Svi proizvodi
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Prethodno"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={current === categories.length - 1}
              aria-label="Sledeće"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Wrapper>

      {/* Track */}
      <div ref={containerRef} className="overflow-hidden sm:mx-6 lg:mx-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}px)`, gap: GAP }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              onClick={() => setCurrent(i)}
              className="relative shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-opacity duration-500 group"
              style={{ width: cardWidth || "28%", height: 400, opacity: i === current ? 1 : 0.55 }}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-5 lg:p-7">
                <p className="text-xl lg:text-2xl font-bold text-white leading-tight">
                  {cat.title}
                </p>
                <p className="text-sm text-white/60 font-normal mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Kategorija ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === current ? "w-8 bg-zinc-950" : "w-4 bg-zinc-200 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
