import Link from "next/link";
import { Tag } from "lucide-react";
import { Suspense } from "react";
import Wrapper from "@/components/layout/Wrapper";
import { getOnSaleProducts, getOnSaleFilters } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import BrandFilter from "@/components/ui/BrandFilter";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import AttributeFilter from "@/components/ui/AttributeFilter";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";
import ProductGridClient from "@/components/ui/ProductGridClient";

export const metadata = {
  title: "Mesečna akcija — Popusti na keramiku i kupatilsku opremu",
  description:
    "Iskoristite mesečne akcije na keramiku, sanitarije, baterije, kade i tuš kabine. Pogledajte aktuelne popuste i uštedite na opremanju kupatila.",
  alternates: { canonical: "/akcija" },
  openGraph: {
    type: "website",
    title: "Mesečna akcija — Popusti do 50% | Neša Komerc Keramika",
    description:
      "Aktuelne akcije na keramiku i kupatilsku opremu. Iskoristite popuste i opremite kupatilo po najboljoj ceni.",
    url: "/akcija",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mesečna akcija — Neša Komerc Keramika" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mesečna akcija | Neša Komerc Keramika",
    description: "Aktuelne akcije na keramiku i kupatilsku opremu — iskoristite popuste.",
    images: ["/og-image.jpg"],
  },
};

const PER_PAGE = 24;

export default async function AkcijaPage({
  searchParams,
}: {
  searchParams: Promise<{
    stranica?: string;
    brendovi?: string;
    cena_min?: string;
    cena_max?: string;
    atributi?: string;
    sort?: string;
    per_page?: string;
  }>;
}) {
  const { stranica, brendovi, cena_min, cena_max, atributi, sort, per_page } = await searchParams;
  const perPage = per_page === "24" ? 24 : 12;

  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));
  const selectedBrandIds = brendovi?.split(",").filter(Boolean) ?? [];
  const minPrice = cena_min ? Number(cena_min) : undefined;
  const maxPrice = cena_max ? Number(cena_max) : undefined;

  // Parse attribute filters — "AttrName|value,..." same encoding as category page
  const selectedAttrEncoded = atributi?.split(",").filter(Boolean) ?? [];
  const selectedPairs = selectedAttrEncoded
    .map((s) => { const idx = s.indexOf("|"); return idx === -1 ? null : { attrName: s.slice(0, idx), value: s.slice(idx + 1) }; })
    .filter((x): x is { attrName: string; value: string } => x !== null);

  // attributeValueIds: we pass the raw encoded values; API expects UUIDs,
  // but our filter UI stores "AttrName|value" strings — we send the values as-is
  // and let the server handle it, OR we just use client-side filter approach.
  // Since the new API supports attributeValueIds as UUIDs, we'll do server-side
  // for brand/price, and keep attribute filtering server-side only if UUIDs available.

  const needsNameSort = sort === "naziv_asc" || sort === "naziv_desc";
  const apiSortBy = sort === "cena_asc" ? "price_asc" : sort === "cena_desc" ? "price_desc" : "discount";

  const [saleRes, filtersRes] = await Promise.all([
    getOnSaleProducts({
      brandId: selectedBrandIds[0],
      minPrice,
      maxPrice,
      sortBy: apiSortBy,
      page: needsNameSort ? 1 : currentPage,
      limit: needsNameSort ? 999 : perPage,
    }),
    getOnSaleFilters().catch(() => ({ brands: [], priceRange: { min: 0, max: 200000 }, attributes: [] })),
  ]);

  let products = saleRes.data.filter((p) => p.inStock);

  // Client-side attribute filtering (same pattern as category page)
  if (selectedPairs.length > 0) {
    const selectedByAttrName = new Map<string, string[]>();
    for (const { attrName, value } of selectedPairs) {
      if (!selectedByAttrName.has(attrName)) selectedByAttrName.set(attrName, []);
      selectedByAttrName.get(attrName)!.push(value);
    }
    products = products.filter((p) =>
      [...selectedByAttrName.entries()].every(([attrName, vals]) =>
        vals.some((v) => p.specifications.some((s) => s.key === attrName && s.value === v))
      )
    );
  }

  // Client-side multi-brand filter (API only supports single brandId)
  if (selectedBrandIds.length > 1) {
    products = products.filter((p) => selectedBrandIds.includes(p.brandId));
  }

  if (sort === "naziv_asc") products = [...products].sort((a, b) => a.name.localeCompare(b.name, "sr"));
  else if (sort === "naziv_desc") products = [...products].sort((a, b) => b.name.localeCompare(a.name, "sr"));

  const total = needsNameSort ? products.length : (saleRes.meta?.total ?? products.length);
  const totalPages = needsNameSort ? Math.ceil(products.length / perPage) || 1 : (saleRes.meta?.totalPages ?? Math.ceil(total / perPage)) || 1;
  if (needsNameSort) products = products.slice((currentPage - 1) * perPage, currentPage * perPage);

  const brandObjects = filtersRes.brands;
  const facetedAttributes = filtersRes.attributes.filter((a) => a.values.length > 0);

  const hasActiveFilters = selectedBrandIds.length > 0 || !!cena_min || !!cena_max || selectedAttrEncoded.length > 0;

  const buildFilterHref = (p: number) => {
    const params = new URLSearchParams();
    params.set("stranica", String(p));
    if (selectedBrandIds.length) params.set("brendovi", selectedBrandIds.join(","));
    if (cena_min) params.set("cena_min", cena_min);
    if (cena_max) params.set("cena_max", cena_max);
    if (selectedAttrEncoded.length) params.set("atributi", selectedAttrEncoded.join(","));
    if (sort && sort !== "popularnost") params.set("sort", sort);
    if (per_page) params.set("per_page", per_page);
    return `/akcija?${params.toString()}`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-28 pb-10" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Mesečna akcija</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Mesečna akcija</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {total > 0 ? `${total} proizvoda na akciji` : "Pratite nas za nove akcije"}
          </p>
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
        <Wrapper>
          {products.length === 0 && !hasActiveFilters ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                <Tag size={28} className="text-zinc-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-zinc-950 mb-2">Trenutno nema aktivnih akcija</h2>
              <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                Pratite nas i budite prvi koji saznaju za naše popuste i specijalne ponude.
              </p>
              <Link
                href="/proizvodi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#e11d1b" }}
              >
                Pogledaj sve proizvode
              </Link>
            </div>
          ) : (
            <div className="flex gap-12">
              {/* Sidebar */}
              <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-0 pt-[49px]">
                <Suspense key="price"><PriceRangeFilter /></Suspense>
                {brandObjects.length > 0 && (
                  <Suspense key="brand">
                    <BrandFilter brands={brandObjects} selectedBrandIds={selectedBrandIds} />
                  </Suspense>
                )}
                {facetedAttributes.length > 0 && (
                  <Suspense key="attr">
                    <AttributeFilter attributes={facetedAttributes} selectedValues={selectedAttrEncoded} />
                  </Suspense>
                )}
              </aside>

              {/* Main */}
              <ProductGridClient
                products={products.map((p) => ({
                  id: p.id,
                  name: p.name,
                  category: p.category?.name ?? "",
                  price: formatPrice(p.salePrice ?? p.price),
                  originalPrice: p.salePrice ? formatPrice(p.price) : undefined,
                  image: p.images[0] ?? "/images/img4.png",
                  href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
                  badge: (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : "Akcija",
                  stock: p.stock,
                  inStock: p.inStock,
                }))}
                total={total}
                hasActiveFilters={hasActiveFilters}
                resetHref="/akcija"
                filterTrigger={
                  <MobileFilterDrawer>
                    <Suspense key="price"><PriceRangeFilter /></Suspense>
                    {brandObjects.length > 0 && (
                      <Suspense key="brand">
                        <BrandFilter brands={brandObjects} selectedBrandIds={selectedBrandIds} />
                      </Suspense>
                    )}
                    {facetedAttributes.length > 0 && (
                      <Suspense key="attr">
                        <AttributeFilter attributes={facetedAttributes} selectedValues={selectedAttrEncoded} />
                      </Suspense>
                    )}
                  </MobileFilterDrawer>
                }
                pagination={
                  totalPages > 1 ? (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      buildHref={buildFilterHref}
                    />
                  ) : undefined
                }
              />
            </div>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

