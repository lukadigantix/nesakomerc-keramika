"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CategoryItem {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  selectedCategoryIds: string[];
  counts?: Record<string, number>;
}

export default function CategoryFilter({ categories, selectedCategoryIds, counts }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = (categoryId: string) => {
    const next = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];
    const params = new URLSearchParams(searchParams.toString());
    if (next.length) {
      params.set("kategorija_id", next.join(","));
    } else {
      params.delete("kategorija_id");
    }
    params.delete("stranica");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  if (!categories.length) return null;

  return (
    <div className="pb-6" style={{ borderBottom: "1px solid #d3d3d3" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">Kategorija</p>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategoryIds.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
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
                    <path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span
                className={`flex-1 text-sm transition-colors duration-150 ${
                  isSelected ? "text-zinc-950 font-medium" : "text-zinc-500 group-hover:text-zinc-950"
                }`}
              >
                {cat.name}
              </span>
              {counts?.[cat.id] != null && (
                <span className="text-xs text-zinc-400 tabular-nums">({counts[cat.id]})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
