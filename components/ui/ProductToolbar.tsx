"use client";

import { LayoutGrid, Grid3X3 } from "lucide-react";
import { useState } from "react";

interface Props {
  onViewChange?: (view: "4" | "3") => void;
  filterTrigger?: React.ReactNode;
}

export default function ProductToolbar({ onViewChange, filterTrigger }: Props) {
  const [view, setView] = useState<"4" | "3">("4");

  const handleView = (v: "4" | "3") => {
    setView(v);
    onViewChange?.(v);
  };

  return (
    <div className="border-b border-zinc-200 pb-4 mb-6 flex items-center gap-4">
      {filterTrigger}
      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm text-zinc-500">Sortiraj</span>
        <select className="h-8 px-2 pr-7 rounded-lg border border-zinc-200 text-sm text-zinc-700 bg-white focus:outline-none focus:border-zinc-400 appearance-none cursor-pointer"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
        >
          <option>Preporučujemo</option>
          <option>Cena: rastuće</option>
          <option>Cena: opadajuće</option>
          <option>Najnovije</option>
        </select>
      </div>

      {/* Per page */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-sm text-zinc-500">Prikaži</span>
        <select className="h-8 px-2 pr-7 rounded-lg border border-zinc-200 text-sm text-zinc-700 bg-white focus:outline-none focus:border-zinc-400 appearance-none cursor-pointer"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
        >
          <option>12</option>
          <option>24</option>
          <option>48</option>
        </select>
        <span className="text-sm text-zinc-500">po strani</span>
      </div>

      {/* View toggle */}
      <div className="ml-auto hidden sm:flex items-center gap-1">
        <button
          onClick={() => handleView("4")}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150 ${view === "4" ? "text-zinc-950 bg-zinc-100" : "text-zinc-400 hover:text-zinc-700"}`}
          aria-label="4 kolone"
        >
          <LayoutGrid size={16} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => handleView("3")}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150 ${view === "3" ? "text-zinc-950 bg-zinc-100" : "text-zinc-400 hover:text-zinc-700"}`}
          aria-label="3 kolone"
        >
          <Grid3X3 size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
