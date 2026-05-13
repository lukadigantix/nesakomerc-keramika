"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, PackageCheck } from "lucide-react";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  href: string;
}

export default function ProductCard({ product, href }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border hover:border-zinc-200 hover:shadow-md transition-all duration-300 isolate bg-white"
      style={{ borderColor: "#e6e6e6" }}
    >
      {/* Image */}
      <div className="relative w-full h-56 bg-zinc-50 [clip-path:inset(0_0_0_0_round_1rem_1rem_0_0)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover will-change-transform group-hover:scale-105 transition-transform duration-500"
        />
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
          <div className="flex items-center gap-1.5 mb-3">
            <PackageCheck size={13} className="text-emerald-500" strokeWidth={2} />
            <span className="text-xs font-medium text-emerald-600">Na lageru</span>
          </div>
          <p className="text-xl font-semibold text-zinc-950">{product.price}</p>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-medium transition-colors duration-150"
            style={{ backgroundColor: "#ed2c18" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "#c82314"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "#ed2c18"}
          >
            <ShoppingCart size={15} strokeWidth={2} />
            Dodaj u korpu
          </button>
        </div>
      </div>
    </Link>
  );
}
