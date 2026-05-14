"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/ui/ProductCard";

const products = [
  { id: 1, name: "Mešalica za umivaonik Roca L90", category: "Baterije", price: "8.490 RSD", stock: 5, badge: "Popularno", image: "/images/img4.png" },
  { id: 2, name: "Tuš kabina Ravak Blix", category: "Tuš kabine", price: "62.900 RSD", stock: 2, badge: "Akcija", image: "/images/img5.png" },
  { id: 3, name: "Wc šolja Geberit Selnova", category: "Sanitarije", price: "24.200 RSD", stock: 8, badge: null, image: "/images/img4.png" },
  { id: 4, name: "LED Ogledalo Miior 80×60", category: "Ogledala", price: "18.700 RSD", stock: 3, badge: "Preporuka", image: "/images/img5.png" },
  { id: 5, name: "Samostojeća kada Kaldewei", category: "Kade", price: "134.000 RSD", stock: 1, badge: "Akcija", image: "/images/img4.png" },
  { id: 6, name: "Peškir radijator Zehnder", category: "Vertikale", price: "41.500 RSD", stock: 6, badge: null, image: "/images/img5.png" },
  { id: 7, name: "Podna keramika Porcelanosa", category: "Keramika", price: "3.200 RSD/m²", stock: 14, badge: "Popularno", image: "/images/img4.png" },
  { id: 8, name: "Slivnik Viega Advantix", category: "Slivnici", price: "9.800 RSD", stock: 7, badge: null, image: "/images/img5.png" },
];

const CARD_WIDTH = 320;
const GAP = 24;

export default function FeaturedProducts() {
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
              Izdvojeno
            </p>
            <h2 className="text-4xl font-bold text-zinc-950 leading-tight">
              Popularni proizvodi
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
              href="/proizvodi"
              className="ml-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950"
            >
              Svi proizvodi
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
            <ProductCard
              key={product.id}
              product={product}
              href={`/proizvodi/${product.id}`}
              badge={product.badge}
              stock={product.stock}
              onClick={(e) => { if (dragDistance.current > 5) e.preventDefault(); }}
              className="shrink-0 w-[320px]"
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
