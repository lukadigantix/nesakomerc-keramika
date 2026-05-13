"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, PackageCheck, ShoppingCart } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const products = [
  { id: 1, name: "Mešalica Grohe Eurosmart", category: "Baterije", price: "12.900 RSD", stock: 4, badge: "Novo", image: "/images/img5.png" },
  { id: 2, name: "Tuš sistem Hansgrohe Raindance", category: "Tuš sistemi", price: "54.700 RSD", stock: 2, badge: "Akcija", image: "/images/img4.png" },
  { id: 3, name: "Wc šolja Villeroy & Boch Subway 3.0", category: "Sanitarije", price: "38.500 RSD", stock: 9, badge: "Novo", image: "/images/img5.png" },
  { id: 4, name: "Ogledalni ormarić Burgbad", category: "Ogledala", price: "29.200 RSD", stock: 3, badge: "Popularno", image: "/images/img4.png" },
  { id: 5, name: "Akrilna kada Ravak Chrome", category: "Kade", price: "89.000 RSD", stock: 1, badge: "Akcija", image: "/images/img5.png" },
  { id: 6, name: "Kupaonski nameštaj Pelipal", category: "Nameštaj", price: "67.300 RSD", stock: 5, badge: "Novo", image: "/images/img4.png" },
  { id: 7, name: "Zidna keramika Aparici", category: "Keramika", price: "4.800 RSD/m²", stock: 20, badge: "Preporuka", image: "/images/img5.png" },
  { id: 8, name: "Termostatska baterija Duravit", category: "Baterije", price: "31.500 RSD", stock: 6, badge: "Akcija", image: "/images/img4.png" },
];

const badgeColors: Record<string, string> = {
  "Novo": "#ed2c18",
  "Akcija": "#ed2c18",
  "Popularno": "#ed2c18",
  "Preporuka": "#ed2c18",
};

const CARD_WIDTH = 320;
const GAP = 24;

export default function NewArrivals() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const dragDistance = useRef(0);

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

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragDistance.current = 0;
    scrollStartLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = dragStartX.current - e.pageX;
    dragDistance.current = Math.abs(delta);
    trackRef.current.scrollLeft = scrollStartLeft.current + delta;
  };

  const onMouseUp = () => {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "";
    trackRef.current.style.userSelect = "";
  };

  const onScroll = () => {
    if (!trackRef.current) return;
    setScrolled(trackRef.current.scrollLeft > 10);
  };

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: "#fafafa" }}>
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
          className="flex gap-6 overflow-x-hidden -mx-4 px-4 py-4 -my-4 cursor-grab"
          style={{ scrollbarWidth: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onScroll={onScroll}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/proizvodi/${product.id}`}
              onClick={(e) => { if (dragDistance.current > 5) e.preventDefault(); }}
              className="group shrink-0 w-[320px] flex flex-col rounded-2xl border hover:border-zinc-200 hover:shadow-md transition-all duration-300 isolate bg-white" style={{ borderColor: "#e6e6e6" }}
            >
              {/* Image */}
              <div className="relative w-full h-65 bg-zinc-50 [clip-path:inset(0_0_0_0_round_1rem_1rem_0_0)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover will-change-transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: badgeColors[product.badge] ?? "#ed2c18" }}
                  >
                    {product.badge}
                  </span>
                )}
                {/* Favorite button */}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  aria-label="Dodaj u listu omiljenih"
                  className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-zinc-400 hover:text-rose-500 hover:bg-white active:text-rose-600 hover:[&_svg]:fill-rose-500 active:[&_svg]:fill-rose-600 transition-all duration-200 shadow-sm"
                >
                  <Heart size={15} strokeWidth={1.8} />
                </button>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 gap-1.5 p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {product.category}
                </span>
                <h3 className="text-base font-semibold text-zinc-950 leading-snug group-hover:text-zinc-700 transition-colors duration-150">
                  {product.name}
                </h3>
                <div className="mt-auto pt-4">
                  {/* Stock status fixed above price */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <PackageCheck size={13} className="text-emerald-500" strokeWidth={2} />
                    <span className="text-xs font-medium text-emerald-600">Na lageru · {product.stock} kom</span>
                  </div>
                  <p className="text-xl font-semibold text-zinc-950">
                    {product.price}
                  </p>
                  {/* Add to cart */}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-medium transition-colors duration-150" style={{ backgroundColor: "#ed2c18" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "#c82314"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "#ed2c18"}
                  >
                    <ShoppingCart size={15} strokeWidth={2} />
                    Dodaj u korpu
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
