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
  image: string;
  href: string;
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
      {/* Image-based variant swatches */}
      {variantProducts && variantProducts.length > 0 && (
        <div>
          <p className="text-sm font-medium text-zinc-950 mb-3">Varijante</p>
          <div className="flex flex-wrap gap-3">
            {/* Current product — always shown first, highlighted */}
            <div className="flex flex-col items-center gap-1.5 cursor-default">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-950">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <span className="text-[10px] text-center leading-tight text-zinc-950 font-medium w-16 line-clamp-2">
                {product.name}
              </span>
            </div>
            {variantProducts.map((v, i) => {
              const inner = (
                <>
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-200 hover:border-zinc-400 transition-colors duration-150">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
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
