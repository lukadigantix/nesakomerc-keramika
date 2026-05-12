"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/products";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  "Baterije za kupatilo",
  "Tuš kabine",
  "LED ogledala",
  "Sanitarije",
  "Keramičke pločice",
  "Peškir vertikale",
];

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      const t = setTimeout(() => {
        setMounted(false);
        setQuery("");
      }, 250);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[90] flex flex-col items-center pt-32 px-4 transition-opacity duration-250 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl transition-all duration-250 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
          <Search size={20} strokeWidth={1.5} className="absolute left-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pretražite proizvode..."
            className="w-full h-16 pl-14 pr-14 text-base text-zinc-950 placeholder:text-zinc-400 focus:outline-none bg-transparent"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors duration-150"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="absolute right-5 text-xs text-zinc-300 font-medium tracking-widest">ESC</span>
          )}
        </div>

        {/* Results / suggestions */}
        <div className="mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {query.trim().length > 1 ? (
            filtered.length > 0 ? (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 px-5 pt-4 pb-2">
                  Rezultati
                </p>
                <ul>
                  {filtered.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/proizvodi/${p.categorySlug}/${p.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50 transition-colors duration-100 group"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-950">{p.name}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-zinc-950">{p.price}</span>
                          <ArrowRight size={14} className="text-zinc-300 group-hover:text-zinc-950 transition-colors duration-150" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/proizvodi?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-4 text-sm font-medium text-zinc-500 hover:text-zinc-950 border-t border-zinc-100 transition-colors duration-150"
                >
                  Svi rezultati za „{query}"
                  <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-zinc-400">Nema rezultata za „{query}"</p>
              </div>
            )
          ) : (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 px-5 pt-4 pb-2">
                Popularne pretrage
              </p>
              <ul className="pb-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => setQuery(s)}
                      className="flex items-center gap-3 w-full px-5 py-3 hover:bg-zinc-50 transition-colors duration-100 text-left group"
                    >
                      <Search size={14} strokeWidth={1.5} className="text-zinc-300 shrink-0" />
                      <span className="text-sm text-zinc-600 group-hover:text-zinc-950 transition-colors duration-100">
                        {s}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-zinc-100 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Kategorije
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/proizvodi/${cat.slug}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-full border border-zinc-200 text-xs text-zinc-600 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-150"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
