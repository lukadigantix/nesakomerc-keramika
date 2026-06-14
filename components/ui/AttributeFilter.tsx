"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { ApiAttribute } from "@/lib/api";

interface Props {
  attributes: ApiAttribute[];
  selectedValues: string[];
  countsPerAttr?: Record<string, Record<string, number>>;
}

function AttributeGroup({
  attribute,
  selectedValues,
  onToggle,
  counts,
}: {
  attribute: ApiAttribute;
  selectedValues: string[];
  onToggle: (encoded: string) => void;
  counts?: Record<string, number>;
}) {
  const [expanded, setExpanded] = useState(true);
  const LIMIT = 6;
  const [showAll, setShowAll] = useState(false);

  const visibleValues = showAll ? attribute.values : attribute.values.slice(0, LIMIT);
  const hasMore = attribute.values.length > LIMIT;

  return (
    <div className={expanded ? "pb-6" : "pb-0"}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center justify-between w-full pt-6 text-left"
        style={{ borderTop: "1px solid #d3d3d3" }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {attribute.name}
        </p>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className="text-zinc-400 transition-transform duration-200 shrink-0"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {expanded && (
        <div className="flex flex-col gap-2 mt-3">
          {visibleValues.map((val) => {
            const encoded = `${attribute.name}|${val.value}`;
            const isSelected = selectedValues.includes(encoded);
            return (
              <button
                key={val.id}
                onClick={() => onToggle(encoded)}
                className="flex items-center gap-2.5 group text-left w-full"
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
                      <path
                        d="M1.5 4.5l2 2L7.5 2"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`flex-1 text-sm transition-colors duration-150 ${
                    isSelected
                      ? "text-zinc-950 font-medium"
                      : "text-zinc-500 group-hover:text-zinc-950"
                  }`}
                >
                  {val.value}
                </span>
                {counts?.[val.value] != null && (
                  <span className="text-xs text-zinc-400 tabular-nums">({counts[val.value]})</span>
                )}
              </button>
            );
          })}

          {hasMore && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-150 text-left mt-1"
            >
              {showAll
                ? "Prikaži manje"
                : `+ još ${attribute.values.length - LIMIT}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function AttributeFilter({ attributes, selectedValues, countsPerAttr }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    const params = new URLSearchParams(searchParams.toString());
    if (next.length) {
      params.set("atributi", next.join(","));
    } else {
      params.delete("atributi");
    }
    params.delete("stranica");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  if (!attributes.length) return null;

  return (
    <div className="flex flex-col">
      {attributes.map((attr) => (
        <AttributeGroup
          key={attr.id}
          attribute={attr}
          selectedValues={selectedValues}
          onToggle={toggle}
          counts={countsPerAttr?.[attr.id]}
        />
      ))}
    </div>
  );
}

