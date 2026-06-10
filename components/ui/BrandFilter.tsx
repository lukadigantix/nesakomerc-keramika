"use client";

import { useState } from "react";

interface BrandFilterProps {
  brands: string[];
}

export default function BrandFilter({ brands }: BrandFilterProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (brand: string) =>
    setSelected((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  return (
    <div className="pb-6" style={{ borderBottom: "1px solid #d3d3d3" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3 pt-6" style={{ borderTop: "1px solid #d3d3d3" }}>Brend</p>
      <div className="flex flex-col gap-2">
        {brands.map((brand) => {
          const isSelected = selected.includes(brand);
          return (
            <button
              key={brand}
              onClick={() => toggle(brand)}
              className="flex items-center gap-2.5 group text-left"
            >
              <span
                className="w-4 h-4 rounded shrink-0 flex items-center justify-center border transition-colors duration-150"
                style={{
                  borderColor: isSelected ? "#e11d1b" : "#d4d4d8",
                  backgroundColor: isSelected ? "#e11d1b" : "transparent",
                }}
              >
                {isSelected && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors duration-150 ${isSelected ? "text-zinc-950 font-medium" : "text-zinc-500 group-hover:text-zinc-950"}`}>
                {brand}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
