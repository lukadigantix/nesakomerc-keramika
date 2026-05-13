"use client";

import { useState } from "react";

const colors = [
  { label: "Bela", value: "bela", hex: "#ffffff", border: true },
  { label: "Crna", value: "crna", hex: "#18181b" },
  { label: "Siva", value: "siva", hex: "#a1a1aa" },
  { label: "Bež", value: "bez", hex: "#e8d5b7" },
  { label: "Antracit", value: "antracit", hex: "#3f3f46" },
  { label: "Hrom", value: "hrom", hex: "#cbd5e1" },
  { label: "Zlatna", value: "zlatna", hex: "#d4a843" },
  { label: "Braon", value: "braon", hex: "#92400e" },
];

export default function ColorFilter() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) =>
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );

  return (
    <div className="pb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Boja</p>
      <div className="flex flex-wrap gap-2">
        {colors.map(({ label, value, hex, border }) => {
          const isSelected = selected.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggle(value)}
              title={label}
              className="relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150"
              style={{
                backgroundColor: hex,
                boxShadow: isSelected
                  ? `0 0 0 2px white, 0 0 0 4px #e11d1b`
                  : border
                  ? "0 0 0 1px #e4e4e7"
                  : "none",
                outline: "none",
              }}
              aria-label={label}
            >
              {isSelected && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="pointer-events-none"
                >
                  <path
                    d="M2 5l2.5 2.5L8 3"
                    stroke={hex === "#ffffff" ? "#18181b" : "white"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
