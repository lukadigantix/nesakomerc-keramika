"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

const colorVariants = [
  { label: "Hrom",        hex: "#c8cdd4" },
  { label: "Mat crna",    hex: "#1c1c1e" },
  { label: "Zlato",       hex: "#c9a84c" },
  { label: "Bronza",      hex: "#7c5230" },
  { label: "Mat bela",    hex: "#e8e8e8" },
];

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colorVariants[0].label);

  return (
    <div className="flex flex-col gap-5 mt-2">
      {/* Color picker */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-zinc-950">Završna obrada</span>
          <span className="text-sm text-zinc-400">{selectedColor}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {colorVariants.map(({ label, hex }) => {
            const isSelected = selectedColor === label;
            const isLight = ["#e8e8e8", "#c8cdd4"].includes(hex);
            return (
              <button
                key={label}
                onClick={() => setSelectedColor(label)}
                aria-label={label}
                title={label}
                className="relative w-8 h-8 rounded-full transition-all duration-150 focus:outline-none"
                style={{
                  backgroundColor: hex,
                  boxShadow: isSelected
                    ? `0 0 0 2px #fff, 0 0 0 3.5px ${hex}`
                    : "0 0 0 1px rgba(0,0,0,0.1)",
                }}
              >
                {isSelected && (
                  <Check
                    size={13}
                    strokeWidth={3}
                    className="absolute inset-0 m-auto"
                    style={{ color: isLight ? "#374151" : "#fff" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-3">
      {/* Stepper */}
      <div className="flex items-center border border-zinc-200 rounded-full overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-11 h-11 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors duration-150 text-lg font-light select-none"
          aria-label="Smanji količinu"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-medium text-zinc-950 tabular-nums select-none">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-11 h-11 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors duration-150 text-lg font-light select-none"
          aria-label="Povećaj količinu"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        className="flex-1 h-11 flex items-center justify-center gap-2 rounded-full text-white text-sm font-semibold transition-colors duration-150"
        style={{ backgroundColor: "#e11d1b" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#bf1917")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#e11d1b")}
      >
        <ShoppingCart size={16} strokeWidth={2} />
        Dodaj u korpu
      </button>
      </div>
    </div>
  );
}
