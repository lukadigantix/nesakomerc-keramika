"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import ProductToolbar from "@/components/ui/ProductToolbar";
import ProductCard from "@/components/ui/ProductCard";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
  badge?: string;
  stock: number;
  inStock?: boolean;
}

interface Props {
  products: Product[];
  total: number;
  hasActiveFilters: boolean;
  resetHref: string;
  filterTrigger?: React.ReactNode;
  pagination?: React.ReactNode;
}

export default function ProductGridClient({
  products,
  total,
  hasActiveFilters,
  resetHref,
  filterTrigger,
  pagination,
}: Props) {
  const [view, setView] = useState<"4" | "3">("4");

  return (
    <div className="flex-1 min-w-0">
      <ProductToolbar
        onViewChange={setView}
        filterTrigger={filterTrigger}
      />

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-zinc-500">{total} rezultata</span>
          <Link
            href={resetHref}
            className="ml-auto flex items-center gap-1.5 px-3 h-8 rounded-full border border-zinc-200 text-sm text-zinc-500 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-150"
          >
            <X size={13} strokeWidth={2} />
            Resetuj filtere
          </Link>
        </div>
      )}

      <div
        className={
          view === "4"
            ? "grid grid-cols-4 max-[1329px]:grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5 max-[1329px]:gap-4"
            : "grid grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5 max-[1329px]:gap-4"
        }
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={{ id: p.id, name: p.name, category: p.category, price: p.price, originalPrice: p.originalPrice, image: p.image }}
            href={p.href}
            badge={p.badge}
            stock={p.stock}
            inStock={p.inStock}
          />
        ))}
      </div>

      {pagination}
    </div>
  );
}
