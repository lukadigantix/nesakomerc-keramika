"use client";

import { useEffect, useState } from "react";
import { type ApiProduct } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCarousel, { type CarouselItemData } from "@/components/ui/ProductCarousel";
import Wrapper from "@/components/layout/Wrapper";

function Skeleton() {
  return (
    <section className="py-12 lg:py-24" style={{ backgroundColor: "#fafafa" }}>
      <Wrapper>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 lg:mb-14 gap-4 sm:gap-0">
          <div>
            <div className="h-3 w-20 bg-zinc-200 rounded animate-pulse mb-3" />
            <div className="h-8 w-64 bg-zinc-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse" />
            <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse" />
            <div className="h-4 w-20 bg-zinc-200 rounded animate-pulse ml-2" />
          </div>
        </div>
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shrink-0 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="rounded-2xl border border-zinc-100 bg-white overflow-hidden">
                <div className="aspect-square bg-zinc-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-24 bg-zinc-100 rounded animate-pulse" />
                  <div className="h-4 w-full bg-zinc-100 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-zinc-100 rounded animate-pulse" />
                  <div className="h-5 w-28 bg-zinc-100 rounded animate-pulse mt-2" />
                  <div className="h-10 w-full bg-zinc-100 rounded animate-pulse mt-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}

export default function FeaturedProducts() {
  const [items, setItems] = useState<CarouselItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/featured-products", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: ApiProduct[]) => {
        const mapped = data
          .filter((p) => p.inStock)
          .slice(0, 12)
          .map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category?.name ?? "",
            price: formatPrice(p.salePrice ?? p.price),
            originalPrice: p.salePrice ? formatPrice(p.price) : undefined,
            image: p.images[0] ?? "/images/img4.png",
            stock: p.stock,
            inStock: p.inStock,
            badge:
              (p.saleDiscountPercent ?? 0) > 0
                ? `−${p.saleDiscountPercent}%`
                : p.salePrice
                ? "Akcija"
                : undefined,
            href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
          }));
        setItems(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (items.length === 0) return null;

  return (
    <ProductCarousel
      items={items}
      subtitle="Izdvojeno"
      title="Preporučeni proizvodi"
      viewAllHref="/proizvodi"
      viewAllLabel="Svi proizvodi"
      autoplay
    />
  );
}
