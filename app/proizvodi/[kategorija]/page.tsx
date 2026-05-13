import Link from "next/link";
import { notFound } from "next/navigation";
import Wrapper from "@/components/layout/Wrapper";
import { categories, products, getCategoryBySlug } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductToolbar from "@/components/ui/ProductToolbar";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import ColorFilter from "@/components/ui/ColorFilter";
import BrandFilter from "@/components/ui/BrandFilter";

export async function generateStaticParams() {
  return categories.map((cat) => ({ kategorija: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorija: string }>;
}) {
  const { kategorija } = await params;
  const category = getCategoryBySlug(kategorija);
  if (!category) return {};
  return {
    title: `${category.label} — Nesa Komerc Keramika`,
    description: `Pregledajte naš asortiman u kategoriji ${category.label}.`,
  };
}

const PER_PAGE = 12;

export default async function KategorijaPage({
  params,
  searchParams,
}: {
  params: Promise<{ kategorija: string }>;
  searchParams: Promise<{ stranica?: string }>;
}) {
  const { kategorija } = await params;
  const { stranica } = await searchParams;
  const category = getCategoryBySlug(kategorija);

  if (!category) notFound();

  const allProducts = products.filter((p) => p.categorySlug === kategorija);
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));
  const totalPages = Math.ceil(allProducts.length / PER_PAGE);
  const displayProducts = allProducts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero banner */}
      <div className="pt-52 pb-10" style={{ backgroundColor: "#e11d1b" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <Link href="/proizvodi" className="hover:text-white transition-colors duration-150">Svi proizvodi</Link>
            <span>/</span>
            <span className="text-white">{category.label}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{category.label}</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{allProducts.length} proizvoda u kategoriji</p>
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
      <Wrapper>
        <div className="flex gap-12">
          {/* Filters sidebar */}
          <aside className="w-56 shrink-0 flex flex-col gap-8">

            <PriceRangeFilter />

            <BrandFilter />

            <ColorFilter />

            {/* Brend */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Brend</p>
              <div className="flex flex-col gap-2">
                {["GROHE", "Hansgrohe", "ROCA", "Geberit", "Duravit", "Ravak", "Laufen"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className="w-4 h-4 rounded border border-zinc-300 group-hover:border-zinc-950 transition-colors duration-150 shrink-0 flex items-center justify-center" />
                    <span className="text-sm text-zinc-500 group-hover:text-zinc-950 transition-colors duration-150">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dostupnost */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Dostupnost</p>
              <div className="flex flex-col gap-2">
                {["Na stanju", "Po narudžbini"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className="w-4 h-4 rounded border border-zinc-300 group-hover:border-zinc-950 transition-colors duration-150 shrink-0" />
                    <span className="text-sm text-zinc-500 group-hover:text-zinc-950 transition-colors duration-150">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sortiranje */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Sortiranje</p>
              <div className="flex flex-col gap-2">
                {["Preporučeno", "Cena: rastuće", "Cena: opadajuće", "Najnovije"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className="w-4 h-4 rounded-full border border-zinc-300 group-hover:border-zinc-950 transition-colors duration-150 shrink-0" />
                    <span className="text-sm text-zinc-500 group-hover:text-zinc-950 transition-colors duration-150">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <ProductToolbar />
            {/* Grid */}
            <div className="grid grid-cols-4 gap-5">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/proizvodi/${kategorija}/${product.id}`}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={(p) => `/proizvodi/${kategorija}?stranica=${p}`}
            />
          </div>
        </div>
      </Wrapper>
      </div>
    </div>
  );
}
