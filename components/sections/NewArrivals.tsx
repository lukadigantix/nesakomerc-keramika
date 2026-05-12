"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const products = [
  { id: 1, name: "Mešalica Grohe Eurosmart", category: "Baterije", price: "12.900 RSD", image: "/images/img5.png" },
  { id: 2, name: "Tuš sistem Hansgrohe Raindance", category: "Tuš sistemi", price: "54.700 RSD", image: "/images/img4.png" },
  { id: 3, name: "Wc šolja Villeroy & Boch Subway 3.0", category: "Sanitarije", price: "38.500 RSD", image: "/images/img5.png" },
  { id: 4, name: "Ogledalni ormarić Burgbad", category: "Ogledala", price: "29.200 RSD", image: "/images/img4.png" },
  { id: 5, name: "Akrilna kada Ravak Chrome", category: "Kade", price: "89.000 RSD", image: "/images/img5.png" },
  { id: 6, name: "Kupaonski nameštaj Pelipal", category: "Nameštaj", price: "67.300 RSD", image: "/images/img4.png" },
  { id: 7, name: "Zidna keramika Aparici", category: "Keramika", price: "4.800 RSD/m²", image: "/images/img5.png" },
  { id: 8, name: "Termostatska baterija Duravit", category: "Baterije", price: "31.500 RSD", image: "/images/img4.png" },
];

const CARD_WIDTH = 320;
const GAP = 24;

export default function NewArrivals() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const maxIndex = products.length - 4;

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setActiveIndex(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: clamped * (CARD_WIDTH + GAP),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 overflow-hidden">
      <Wrapper>
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Asortiman
            </p>
            <h2 className="text-4xl font-bold text-zinc-950 leading-tight">
              Novo u ponudi
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Prethodni"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex >= maxIndex}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Sledeći"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
            <Link
              href="/proizvodi/novo"
              className="ml-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950"
            >
              Svi novi proizvodi
            </Link>
          </div>
        </div>

        {/* Slider track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/proizvodi/${product.id}`}
              className="group shrink-0 w-[320px] flex flex-col rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-65 bg-zinc-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* New badge */}
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest bg-zinc-950 text-white px-2.5 py-1 rounded-full">
                  Novo
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {product.category}
                </span>
                <h3 className="text-base font-semibold text-zinc-950 leading-snug group-hover:text-zinc-700 transition-colors duration-150">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-zinc-950 mt-1">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
