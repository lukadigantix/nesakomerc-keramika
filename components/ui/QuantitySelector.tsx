"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";

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
  stock?: number;
}

export default function QuantitySelector({ product, variants = [], stock }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(variants[0] ?? null);
  const [added, setAdded] = useState(false);

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
      {/* Variants (only shown when product has variants) */}
      {variants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-950">Varijanta</span>
            {selectedVariant && <span className="text-sm text-zinc-400">{selectedVariant}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const isSelected = selectedVariant === v;
              return (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3 h-8 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-red-400 bg-red-50 text-red-700"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {isSelected && <Check size={11} strokeWidth={3} className="inline mr-1.5 -mt-0.5" />}
                  {v}
                </button>
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
          disabled={stock !== undefined && stock <= 0}
          className="flex-1 h-11 flex items-center justify-center gap-2 rounded-full text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: added ? "#16a34a" : stock !== undefined && stock <= 0 ? "#a1a1aa" : "#e11d1b" }}
        >
          {added ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              Dodato!
            </>
          ) : stock !== undefined && stock <= 0 ? (
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
      </div>
    </div>
  );
}
