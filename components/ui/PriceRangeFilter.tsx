"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MIN = 0;
const MAX = 200000;

function formatPrice(v: number) {
  return v.toLocaleString("sr-RS") + " RSD";
}

export default function PriceRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialMin = Math.max(MIN, Math.min(Number(searchParams.get("cena_min") ?? MIN), MAX));
  const initialMax = Math.max(MIN, Math.min(Number(searchParams.get("cena_max") ?? MAX), MAX));

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const minPct = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((max - MIN) / (MAX - MIN)) * 100;

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), max - 1000);
    setMin(val);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), min + 1000);
    setMax(val);
  };

  const commit = (nextMin: number, nextMax: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextMin === MIN) {
      params.delete("cena_min");
    } else {
      params.set("cena_min", String(nextMin));
    }
    if (nextMax === MAX) {
      params.delete("cena_max");
    } else {
      params.set("cena_max", String(nextMax));
    }
    params.delete("stranica");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="pb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-5 pt-6" style={{ borderTop: "1px solid #d3d3d3" }}>Cena</p>

      {/* Slider */}
      <div className="relative h-8 flex items-center mb-3">
        {/* Track background */}
        <div className="absolute left-0 right-0 h-[3px] rounded-full bg-zinc-200" />
        {/* Active range */}
        <div
          className="absolute h-[3px] rounded-full"
          style={{
            backgroundColor: "#e11d1b",
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
          }}
        />

        {/* Min input */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1000}
          value={min}
          onChange={handleMin}
          onMouseUp={() => commit(min, max)}
          onTouchEnd={() => commit(min, max)}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: min > MAX - 10000 ? 5 : 3 }}
        />

        {/* Max input */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1000}
          value={max}
          onChange={handleMax}
          onMouseUp={() => commit(min, max)}
          onTouchEnd={() => commit(min, max)}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mt-1">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>

      <style>{`
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: none;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e11d1b;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          cursor: grab;
        }
        input[type='range']::-moz-range-thumb {
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e11d1b;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          cursor: grab;
        }
      `}</style>
    </div>
  );
}
