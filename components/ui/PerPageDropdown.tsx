"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function PerPageDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("per_page") ?? "12";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    if (value === "12") {
      params.delete("per_page");
    } else {
      params.set("per_page", value);
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
        <span className="text-zinc-400">Prikaz:</span>
        <span className="font-medium">{current}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`text-zinc-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-20 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 py-1 overflow-hidden">
          {(["12", "24"] as const).map((val) => (
            <button
              key={val}
              onClick={() => handleSelect(val)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                current === val
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
