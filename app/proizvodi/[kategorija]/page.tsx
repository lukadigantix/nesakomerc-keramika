import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Wrapper from "@/components/layout/Wrapper";
import { categories, products, getCategoryBySlug } from "@/lib/products";

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

export default async function KategorijaPage({
  params,
}: {
  params: Promise<{ kategorija: string }>;
}) {
  const { kategorija } = await params;
  const category = getCategoryBySlug(kategorija);

  if (!category) notFound();

  const displayProducts = products.filter((p) => p.categorySlug === kategorija);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <Wrapper>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <Link href="/" className="hover:text-zinc-950 transition-colors duration-150">Početna</Link>
          <span>/</span>
          <Link href="/proizvodi" className="hover:text-zinc-950 transition-colors duration-150">Svi proizvodi</Link>
          <span>/</span>
          <span className="text-zinc-950">{category.label}</span>
        </div>

        <div className="flex gap-12">
          {/* Filters sidebar */}
          <aside className="w-56 shrink-0 flex flex-col gap-8">

            {/* Cena */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Cena</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Od" className="w-full h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-950 focus:outline-none focus:border-zinc-400 bg-white" />
                  <span className="text-zinc-300 text-sm">—</span>
                  <input type="number" placeholder="Do" className="w-full h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-950 focus:outline-none focus:border-zinc-400 bg-white" />
                </div>
                <button className="h-9 w-full rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-150">
                  Primeni
                </button>
              </div>
            </div>

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
            {/* Heading */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">
                  Kategorija
                </p>
                <h1 className="text-3xl font-bold text-zinc-950">{category.label}</h1>
                <p className="text-sm text-zinc-400 mt-1">{displayProducts.length} proizvoda</p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-5">
              {displayProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/proizvodi/${kategorija}/${product.id}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full h-52 bg-zinc-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-950 leading-snug group-hover:text-zinc-600 transition-colors duration-150">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-950 mt-1">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
