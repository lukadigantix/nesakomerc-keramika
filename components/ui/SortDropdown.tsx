"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "popularnost", label: "Popularnosti" },
  { value: "cena_asc", label: "Najnižoj ceni" },
  { value: "cena_desc", label: "Najvišoj ceni" },
  { value: "naziv_asc", label: "Nazivu A-Z" },
  { value: "naziv_desc", label: "Nazivu Z-A" },
];

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "popularnost";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Popularnosti";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "popularnost") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    params.delete("stranica");
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm transition-colors text-zinc-700 hover:text-zinc-950"
      >
        <span className="text-zinc-400">Sortiranje prema:</span>
        <span className="font-medium">{currentLabel}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`text-zinc-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 py-1 overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                currentSort === opt.value
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
