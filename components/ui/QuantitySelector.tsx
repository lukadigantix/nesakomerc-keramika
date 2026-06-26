"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import WishlistButton from "@/components/ui/WishlistButton";

export interface VariantProduct {
  id: string;
  name: string;
  image?: string;
  type?: string;
  colorHex?: string;
  href: string;
}

const SERBIAN_COLORS: Record<string, string> = {
  bela: "#ffffff", bijela: "#ffffff",
  crna: "#111111",
  siva: "#808080", siva_tamna: "#4b5563", siva_svetla: "#d1d5db",
  crvena: "#dc2626",
  plava: "#2563eb", tamno_plava: "#1e3a8a", svetlo_plava: "#60a5fa",
  zelena: "#16a34a",
  žuta: "#eab308", zuta: "#eab308",
  narandžasta: "#f97316", narandzasta: "#f97316",
  ljubičasta: "#9333ea", ljubicasta: "#9333ea",
  roza: "#ec4899", roze: "#ec4899",
  braon: "#92400e", smeđa: "#92400e", smedja: "#92400e",
  bež: "#e8d5b7", bez: "#e8d5b7",
  zlatna: "#f59e0b",
  srebrna: "#9ca3af",
  bela_sjaj: "#f8f8f8", bela_mat: "#f0f0f0",
  antracit: "#374151",
  hrast: "#8b5e3c", "hrast_svetli": "#c49a6c",
};

function resolveColor(name: string): string | null {
  const key = name.toLowerCase().replace(/\s+/g, "_");
  if (SERBIAN_COLORS[key]) return SERBIAN_COLORS[key];
  if (/^#[0-9a-f]{3,8}$/i.test(name) || /^rgb/i.test(name)) return name;
  return null;
}

interface Props {
  product: {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    sku?: string;
  };
  variants?: string[];
  variantProducts?: VariantProduct[];
  stock?: number;
  inStock?: boolean;
  productId?: string;
}

export default function QuantitySelector({ product, variantProducts, stock, inStock, productId }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // inStock takes priority; fallback to stock > 0 if inStock not provided
  const canOrder = inStock !== undefined ? inStock : (stock === undefined || stock > 0);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        sku: product.sku,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-5 mt-2">
      {/* Variant swatches — image / color / text */}
      {variantProducts && variantProducts.length > 0 && (
        <div>
          <p className="text-sm font-medium text-zinc-950 mb-3">Varijante</p>
          <div className="flex flex-wrap gap-3">
            {variantProducts.map((v, i) => {
              const resolvedColor = v.colorHex ?? (v.type === "color" ? resolveColor(v.name) : null);
              const isWhite = resolvedColor === "#ffffff" || resolvedColor === "#fff";

              let swatch: React.ReactNode;
              if (v.image) {
                swatch = (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-200 hover:border-zinc-400 transition-colors duration-150">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                );
              } else if (resolvedColor) {
                swatch = (
                  <div
                    className={`w-10 h-10 rounded-full border-2 hover:border-zinc-500 transition-colors duration-150 shrink-0 ${isWhite ? "border-zinc-300" : "border-zinc-200"}`}
                    style={{ backgroundColor: resolvedColor }}
                    title={v.name}
                  />
                );
              } else {
                swatch = (
                  <div className="h-10 px-3 rounded-lg border-2 border-zinc-200 hover:border-zinc-400 bg-white flex items-center justify-center transition-colors duration-150 min-w-[40px]">
                    <span className="text-xs font-medium text-zinc-700 whitespace-nowrap">{v.name}</span>
                  </div>
                );
              }

              const inner = (
                <>
                  {swatch}
                  <span className="text-[10px] text-center leading-tight text-zinc-400 w-16 line-clamp-2">
                    {v.name}
                  </span>
                </>
              );

              return v.href ? (
                <Link key={i} href={v.href} className="flex flex-col items-center gap-1.5">
                  {inner}
                </Link>
              ) : (
                <div key={i} className="flex flex-col items-center gap-1.5 cursor-not-allowed opacity-50">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      )}



      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-3">
        {/* Stepper */}
        <div className="flex items-center border border-zinc-200 rounded-full overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors duration-150 text-lg font-light select-none cursor-pointer"
            aria-label="Smanji količinu"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium text-zinc-950 tabular-nums select-none">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-11 h-11 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors duration-150 text-lg font-light select-none cursor-pointer"
            aria-label="Povećaj količinu"
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={!canOrder}
          className="flex-1 h-11 flex items-center justify-center gap-2 rounded-full text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: added ? "#16a34a" : !canOrder ? "#a1a1aa" : "#e11d1b" }}
        >
          {added ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              Dodato!
            </>
          ) : !canOrder ? (
            <>
              <ShoppingCart size={16} strokeWidth={2} />
              Nema na lageru
            </>
          ) : (
            <>
              <ShoppingCart size={16} strokeWidth={2} />
              Dodaj u korpu
            </>
          )}
        </button>

        {/* Wishlist */}
        {productId && (
          <WishlistButton productId={productId} iconOnly />
        )}
      </div>
    </div>
  );
}
