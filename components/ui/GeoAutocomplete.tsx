"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface GeoCity {
  name: string;
  displayName: string;
  lat: string;
  lon: string;
  postcode?: string;
}

export interface GeoAddress {
  displayName: string;
  road: string;
  houseNumber?: string;
  postcode?: string;
  city?: string;
  lat: string;
  lon: string;
}

interface CityProps {
  type: "city";
  value: string;
  onChange: (value: string) => void;
  onSelect: (city: GeoCity) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

interface AddressProps {
  type: "address";
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: GeoAddress) => void;
  cityFilter?: string;
  placeholder?: string;
  className?: string;
  error?: string;
}

type Props = CityProps | AddressProps;

export default function GeoAutocomplete(props: Props) {
  const { type, value, onChange, placeholder, className, error } = props;
  const [suggestions, setSuggestions] = useState<GeoCity[] | GeoAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [apiDown, setApiDown] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minLen = type === "city" ? 2 : 3;

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    onChange(q);
    setSuggestions([]);
    setOpen(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (q.length < minLen) return;

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        let url: string;
        if (type === "city") {
          url = `${API_BASE}/geo/cities?q=${encodeURIComponent(q)}`;
        } else {
          const city = (props as AddressProps).cityFilter ?? "";
          url = `${API_BASE}/geo/addresses?q=${encodeURIComponent(q)}${city ? `&city=${encodeURIComponent(city)}` : ""}`;
        }
        const res = await fetch(url);
        if (!res.ok) { setApiDown(true); return; }
        const json = await res.json();
        setApiDown(false);
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setSuggestions(json.data);
          setOpen(true);
        }
      } catch {
        setApiDown(true);
      } finally {
        setLoading(false);
      }
    }, 350);
  }

  function handleSelect(item: GeoCity | GeoAddress) {
    if (type === "city") {
      (props as CityProps).onSelect(item as GeoCity);
    } else {
      (props as AddressProps).onSelect(item as GeoAddress);
    }
    setOpen(false);
    setSuggestions([]);
  }

  const baseInput =
    "w-full h-11 px-4 rounded-xl border bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:bg-white focus:ring-2 transition-all";
  const errorCls = error
    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
    : "border-zinc-200 focus:border-red-400 focus:ring-red-100";

  return (
    <div ref={containerRef} className={`relative${className ? ` ${className}` : ""}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          placeholder={placeholder}
          autoComplete="off"
          className={`${baseInput} ${errorCls} pr-9`}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <MapPin size={14} strokeWidth={1.8} />
          )}
        </span>
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-zinc-200 shadow-lg overflow-hidden">
          {(suggestions as (GeoCity & GeoAddress)[]).map((item, i) => {
            const label = item.displayName;
            const sub =
              type === "city"
                ? item.postcode ?? ""
                : [item.city, item.postcode].filter(Boolean).join(", ");
            return (
              <li key={i}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
                  className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-zinc-50 transition-colors"
                >
                  <MapPin size={13} strokeWidth={1.8} className="text-zinc-400 mt-0.5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm text-zinc-800 truncate">{label}</span>
                    {sub && <span className="block text-xs text-zinc-400">{sub}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {!error && apiDown && (
        <p className="mt-1 text-xs text-zinc-400">Automatska pretraga nije dostupna — unesite ručno.</p>
      )}
    </div>
  );
}
