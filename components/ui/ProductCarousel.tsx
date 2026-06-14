"use client";

import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/ui/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface CarouselItemData {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  stock: number;
  inStock?: boolean;
  badge?: string;
  href: string;
}

interface Props {
  items: CarouselItemData[];
  subtitle: string;
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
}

export default function ProductCarousel({
  items,
  subtitle,
  title,
  viewAllHref,
  viewAllLabel,
}: Props) {
  if (items.length === 0) return null;

  return (
    <section className="py-12 lg:py-24 overflow-x-clip" style={{ backgroundColor: "#fafafa" }}>
      <Wrapper>
        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
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
              <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950 hover:bg-transparent transition-all duration-150 disabled:opacity-30" />
              <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950 hover:bg-transparent transition-all duration-150 disabled:opacity-30" />
              <Link
                href={viewAllHref}
                className="ml-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950 whitespace-nowrap"
              >
                {viewAllLabel}
              </Link>
            </div>
          </div>

          <CarouselContent className="-ml-4 md:-ml-5">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:pl-5 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard
                  product={{ id: item.id, name: item.name, category: item.category, price: item.price, image: item.image }}
                  href={item.href}
                  badge={item.badge}
                  stock={item.stock}
                  inStock={item.inStock}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Wrapper>
    </section>
  );
}
