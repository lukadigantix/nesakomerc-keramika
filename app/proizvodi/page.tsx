import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductToolbar from "@/components/ui/ProductToolbar";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import ColorFilter from "@/components/ui/ColorFilter";
import BrandFilter from "@/components/ui/BrandFilter";

export const metadata = {
  title: "Svi proizvodi — Nesa Komerc Keramika",
  description: "Pregledajte kompletan asortiman kupatilske opreme i keramike.",
};

const PER_PAGE = 12;

export default async function ProizvodiPage({
  searchParams,
}: {
  searchParams: Promise<{ stranica?: string }>;
}) {
  const { stranica } = await searchParams;
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));
  const totalPages = Math.ceil(products.length / PER_PAGE);
  const paginated = products.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero banner */}
      <div className="pt-52 pb-10" style={{ backgroundColor: "#e11d1b" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Svi proizvodi</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Svi proizvodi</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{products.length} proizvoda u asortimanu</p>
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
      <Wrapper>
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-56 shrink-0">
            <PriceRangeFilter />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">
              Kategorije
            </p>
            <nav className="flex flex-col">
              <Link
                href="/proizvodi"
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100"
              >
                Svi proizvodi
                <span className="text-xs font-normal text-zinc-400">{products.length}</span>
              </Link>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/proizvodi/${cat.slug}`}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-150"
                  >
                    {cat.label}
                    <span className="text-xs text-zinc-300">{count}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 flex flex-col gap-6">
              <BrandFilter />
              <ColorFilter />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <ProductToolbar />
            {/* Grid */}
            <div className="grid grid-cols-4 gap-5">
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/proizvodi/${product.categorySlug}/${product.id}`}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={(p) => `/proizvodi?stranica=${p}`}
            />
          </div>
        </div>
      </Wrapper>
      </div>
    </div>
  );
}
