"use client";

import Link from "next/link";
import Image from "next/image";import { useState } from "react";import { Heart, ShoppingCart, PackageCheck, Check } from "lucide-react";
import { useCart } from "@/lib/cart";

interface CardProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  sku?: string;
}

interface Props {
  product: CardProduct;
  href: string;
  badge?: string | null;
  stock?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function ProductCard({ product, href, badge, stock, className, onClick }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex flex-col rounded-2xl border hover:border-zinc-200 hover:shadow-md transition-all duration-300 isolate bg-white${className ? ` ${className}` : ""}`}
      style={{ borderColor: "#e6e6e6" }}
    >
      {/* Image */}
      <div className="relative w-full h-78 bg-white [clip-path:inset(0_0_0_0_round_1rem_1rem_0_0)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3 will-change-transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide z-10 text-white"
            style={{ backgroundColor: "#e11d1b" }}
          >
            {badge}
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
          <div className="flex items-center gap-1.5 mb-3">
            <PackageCheck size={13} className="text-emerald-500" strokeWidth={2} />
            <span className="text-xs font-medium text-emerald-600">Na lageru{stock != null ? ` · ${stock} kom` : ""}</span>
          </div>
          <p className="text-xl font-semibold text-zinc-950">{product.price}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (stock !== undefined && stock <= 0) return;
              addItem({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                sku: product.sku,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1800);
            }}
            disabled={stock !== undefined && stock <= 0}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: added ? "#16a34a" : stock !== undefined && stock <= 0 ? "#a1a1aa" : "#e11d1b" }}
            onMouseEnter={(e) => { if (!added && !(stock !== undefined && stock <= 0)) (e.currentTarget as HTMLElement).style.backgroundColor = "#bf1917"; }}
            onMouseLeave={(e) => { if (!added && !(stock !== undefined && stock <= 0)) (e.currentTarget as HTMLElement).style.backgroundColor = "#e11d1b"; }}
          >
            {added ? (
              <><Check size={15} strokeWidth={2.5} /> Dodato!</>
            ) : stock !== undefined && stock <= 0 ? (
              <><ShoppingCart size={15} strokeWidth={2} /> Nema na lageru</>
            ) : (
              <><ShoppingCart size={15} strokeWidth={2} /> Dodaj u korpu</>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
