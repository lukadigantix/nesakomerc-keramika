"use client";

import { LayoutGrid, Grid3X3 } from "lucide-react";
import { useState, Suspense, Fragment } from "react";
import SortDropdown from "@/components/ui/SortDropdown";
import PerPageDropdown from "@/components/ui/PerPageDropdown";

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
    <div className="border-b border-zinc-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-4">
      <Fragment key="filter">{filterTrigger}</Fragment>

      <div className="flex items-center gap-4 sm:flex-1">
        <Suspense>
          <SortDropdown />
        </Suspense>

        <Suspense>
          <PerPageDropdown />
        </Suspense>

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
    </div>
  );
}
