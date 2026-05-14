"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const GAP = 16;

const cards = [
  {
    title: "Mesečna akcija",
    subtitle: "Popusti do 40% na odabrane proizvode",
    cta: { label: "Pogledaj akciju", href: "/akcija" },
    image: "/images/c1.png",
  },
  {
    title: "Grohe kolekcija",
    subtitle: "Premium armature za moderno kupatilo",
    cta: { label: "Istraži", href: "/proizvodi/baterije" },
    image: "/images/c2.png",
  },
  {
    title: "Villeroy & Boch",
    subtitle: "Luksuzna sanitarija za vaš dom",
    cta: { label: "Istraži", href: "/proizvodi/sanitarije" },
    image: "/images/c3.png",
  },
  {
    title: "Novo u ponudi",
    subtitle: "Najnovije kolekcije tuševa i kada",
    cta: { label: "Pogledaj novo", href: "/proizvodi" },
    image: "/images/c4.png",
  },
];

export default function ShowcaseCarousel() {
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

  // Kartica je 64% širine kontejnera — zaokruži na celi piksel da nema subpixel overflow
  const cardWidth = Math.floor(containerWidth * 0.64);
  const step = cardWidth + GAP;
  const totalTrackWidth = cards.length * cardWidth + (cards.length - 1) * GAP;

  // Centriraj aktivan, klampuj uz ivice na početku/kraju
  const idealTranslate = containerWidth / 2 - cardWidth / 2 - current * step;
  const minTranslate = containerWidth - totalTrackWidth;
  const translateX = containerWidth > 0 ? Math.min(0, Math.max(minTranslate, idealTranslate)) : 0;

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(cards.length - 1, i + 1));

  return (
    <section className="py-16 border-t border-zinc-100">
      {/* Header */}
      <Wrapper className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-2">
            Istraži
          </p>
          <h2 className="text-3xl font-bold text-zinc-950">Šta nudimo</h2>
        </div>
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
            disabled={current === cards.length - 1}
            aria-label="Sledeće"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Wrapper>

      {/* Track — full width, overflow clip */}
      <div ref={containerRef} className="overflow-hidden mx-4 sm:mx-6 lg:mx-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}px)`, gap: GAP }}
          >
            {cards.map((card, i) => (
              <div
                key={card.title}
                onClick={() => setCurrent(i)}
                className="relative shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-opacity duration-500"
                style={{ width: cardWidth || "64%", height: 520, opacity: i === current ? 1 : 0.55 }}
              >
                <Image src={card.image} alt={card.title} fill className="object-cover" priority={i === 0} />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8 flex flex-col gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-tight">{card.title}</h3>
                    <p className="text-sm text-white/70 mt-1">{card.subtitle}</p>
                  </div>
                  <Link
                    href={card.cta.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex self-start px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-colors duration-150"
                    style={{ backgroundColor: "#e11d1b" }}
                  >
                    {card.cta.label}
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Kartica ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === current ? "w-8 bg-zinc-950" : "w-4 bg-zinc-200 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
