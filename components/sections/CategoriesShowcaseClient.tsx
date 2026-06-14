"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const GAP = 16;

export interface CategorySlide {
  title: string;
  subtitle: string | null;
  image: string;
  href: string;
}

export default function CategoriesShowcaseClient({ categories }: { categories: CategorySlide[] }) {
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

  const cardRatio = containerWidth < 640 ? 0.85 : containerWidth < 1024 ? 0.64 : 0.22;
  const cardWidth = Math.floor(containerWidth * cardRatio);
  const step = cardWidth + GAP;
  const totalTrackWidth = categories.length * cardWidth + (categories.length - 1) * GAP;

  const leftOffset = containerWidth < 640 ? 16 : containerWidth < 1024 ? 24 : 32;
  const idealTranslate = leftOffset - current * step;
  const maxTranslate = leftOffset;
  const minTranslate = containerWidth - totalTrackWidth - leftOffset;
  const translateX = containerWidth > 0
    ? Math.min(maxTranslate, Math.max(minTranslate, idealTranslate))
    : 0;

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(categories.length - 1, i + 1));

  if (categories.length === 0) return null;

  return (
    <section className="py-16 border-t border-zinc-100" style={{ backgroundColor: "#fafafa" }}>
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

      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}px)`, gap: GAP }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setCurrent(i)}
              className="relative shrink-0 overflow-hidden rounded-2xl cursor-pointer group"
              style={{ width: cardWidth || "64%", height: 460, opacity: i === current ? 1 : 0.55, transition: "opacity 0.4s" }}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-4">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">{cat.title}</p>
                {cat.subtitle && (
                  <p className="text-sm text-white/70 mt-1">{cat.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>


    </section>
  );
}
