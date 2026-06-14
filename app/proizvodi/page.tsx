import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/layout/Wrapper";
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { Search } from "lucide-react";

export const metadata = {
  title: "Svi proizvodi — Nesa Komerc Keramika",
  description: "Pregledajte kompletan asortiman kupatilske opreme i keramike.",
};

const PER_PAGE = 24;

export default async function ProizvodiPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; stranica?: string }>;
}) {
  const { q, stranica } = await searchParams;
  const query = q?.trim() ?? "";
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));

  // ── Search mode ──────────────────────────────────────────────────────────────
  if (query.length >= 2) {
    const { data: products, meta } = await getProducts({ search: query, page: currentPage, limit: PER_PAGE });
    const total = meta?.total ?? products.length;
    const totalPages = (meta?.totalPages ?? Math.ceil(total / PER_PAGE)) || 1;

    return (
      <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
        <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
          <Wrapper>
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
              <span>/</span>
              <Link href="/proizvodi" className="hover:text-white transition-colors duration-150">Svi proizvodi</Link>
              <span>/</span>
              <span className="text-white">Pretraga</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Rezultati pretrage za &ldquo;{query}&rdquo;
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              {total} {total === 1 ? "proizvod" : "proizvoda"}
            </p>
          </Wrapper>
        </div>

        <div className="pt-12 pb-16">
          <Wrapper>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 text-zinc-400">
                  <Search size={28} strokeWidth={1.5} />
                </span>
                <p className="text-lg font-semibold text-zinc-800">Nema rezultata za &ldquo;{query}&rdquo;</p>
                <p className="text-sm text-zinc-500 max-w-sm">
                  Pokušajte sa drugačijim pojmom ili pregledajte naše kategorije.
                </p>
                <Link
                  href="/proizvodi"
                  className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-colors duration-150"
                  style={{ backgroundColor: "#e11d1b" }}
                >
                  Sve kategorije
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 max-[1329px]:grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5 max-[1329px]:gap-4">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={{
                        id: p.id,
                        name: p.name,
                        category: p.category?.name ?? "",
                        price: formatPrice(p.price),
                        image: p.images[0] ?? "/images/img4.png",
                      }}
                      href={`/proizvodi/${p.category?.slug ?? ""}/${p.slug}`}
                      badge={p.discountPercent ? `−${p.discountPercent}%` : p.salePrice ? "Akcija" : undefined}
                      stock={p.stock}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  buildHref={(p) => `/proizvodi?q=${encodeURIComponent(query)}&stranica=${p}`}
                />
              </>
            )}
          </Wrapper>
        </div>
      </div>
    );
  }

  // ── Category grid mode ───────────────────────────────────────────────────────
  const { data: allCategories } = await getCategories();
  const categories = allCategories.filter((cat) => cat.parentId === null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero banner */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Svi proizvodi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Svi proizvodi</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Izaberite kategoriju i istražite naš asortiman</p>
        </Wrapper>
      </div>

      <div className="pt-12 pb-16">
        <Wrapper>
          <div className="grid grid-cols-3 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1 gap-4">
            {categories.map((cat) => {
              const image = cat.imageUrl ?? "/images/img4.png";
              return (
                <Link
                  key={cat.slug}
                  href={`/proizvodi/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-4/3 block"
                >
                  <Image
                    src={image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-base font-bold text-white leading-tight">{cat.name}</p>
                    {cat.description && (
                      <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{cat.description}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

