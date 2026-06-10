"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/ui/ProductCard";

export interface CarouselItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  stock: number;
  badge?: string | null;
  href: string;
}

interface Props {
  items: CarouselItem[];
  subtitle: string;
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
}

const CARD_WIDTH = 320;
const GAP = 24;

export default function ProductCarousel({
  items,
  subtitle,
  title,
  viewAllHref,
  viewAllLabel,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const dragDistance = useRef(0);

  const maxIndex = Math.max(0, items.length - 4);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setActiveIndex(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
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

  if (items.length === 0) return null;

  return (
    <section className="py-12 lg:py-24 overflow-hidden" style={{ backgroundColor: "#fafafa" }}>
      <Wrapper>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 lg:mb-14 gap-4 sm:gap-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              {subtitle}
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-zinc-950 leading-tight">
              {title}
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
              href={viewAllHref}
              className="ml-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950 whitespace-nowrap"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-hidden -mx-4 px-4 py-4 -my-4 cursor-grab"
          style={{ scrollbarWidth: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={{ id: item.id, name: item.name, category: item.category, price: item.price, image: item.image }}
              href={item.href}
              badge={item.badge}
              stock={item.stock}
              onClick={(e) => { if (dragDistance.current > 5) e.preventDefault(); }}
              className="shrink-0 w-[320px]"
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
