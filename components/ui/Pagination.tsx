import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export default function Pagination({ currentPage, totalPages, buildHref }: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const btnBase =
    "flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-150 border";

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className={`${btnBase} border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950`}
          aria-label="Prethodna strana"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
        </Link>
      ) : (
        <span className={`${btnBase} border-zinc-100 text-zinc-300 cursor-not-allowed`}>
          <ChevronLeft size={16} strokeWidth={1.5} />
        </span>
      )}

      {/* Pages */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-sm text-zinc-400">
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            className={`${btnBase} border-transparent text-white`}
            style={{ backgroundColor: "#e11d1b" }}
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`${btnBase} border-zinc-200 text-zinc-600 hover:border-zinc-950 hover:text-zinc-950`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className={`${btnBase} border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:text-zinc-950`}
          aria-label="Sledeća strana"
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </Link>
      ) : (
        <span className={`${btnBase} border-zinc-100 text-zinc-300 cursor-not-allowed`}>
          <ChevronRight size={16} strokeWidth={1.5} />
        </span>
      )}
    </div>
  );
}
