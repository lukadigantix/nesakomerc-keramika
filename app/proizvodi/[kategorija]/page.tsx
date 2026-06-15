import Link from "next/link";
import { notFound } from "next/navigation";
import Wrapper from "@/components/layout/Wrapper";
import { getProducts, getCategories, getCategoryBySlug, getActiveBrands, getAttributes } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductGridClient from "@/components/ui/ProductGridClient";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import AttributeFilter from "@/components/ui/AttributeFilter";
import BrandFilter from "@/components/ui/BrandFilter";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorija: string }>;
}) {
  const { kategorija } = await params;
  try {
    const { data: category } = await getCategoryBySlug(kategorija);
    return {
      title: `${category.name} — Nesa Komerc Keramika`,
      description: `Pregledajte naš asortiman u kategoriji ${category.name}.`,
    };
  } catch {
    return {};
  }
}



export default async function KategorijaPage({
  params,
  searchParams,
}: {
  params: Promise<{ kategorija: string }>;
  searchParams: Promise<{ stranica?: string; atributi?: string; cena_min?: string; cena_max?: string; brendovi?: string }>;
}) {
  const { kategorija } = await params;
  const { stranica, atributi, cena_min, cena_max, brendovi } = await searchParams;
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));
  const selectedBrandIds = brendovi?.split(",").filter(Boolean) ?? [];
  const minPrice = cena_min ? Number(cena_min) : undefined;
  const maxPrice = cena_max ? Number(cena_max) : undefined;

  let category;
  try {
    const res = await getCategoryBySlug(kategorija);
    category = res.data;
  } catch {
    notFound();
  }

  const attributesRes = await getAttributes().catch(() => ({ success: true, data: [] }));
  const attributes = attributesRes.data;

  const [categoriesRes, brandsRes, allCatProductsRes] = await Promise.all([
    getCategories(),
    getActiveBrands(),
    getProducts({ categoryId: category.id, limit: 999 }),
  ]);

  // --- Client-side filtering ---
  const allCatProducts = allCatProductsRes.data;
  const categories = categoriesRes.data;
  const subcategories = categories.filter((cat) => cat.parentId === category.id);

  // Brendovi: samo oni koji se pojavljuju u proizvodima ove kategorije
  const categoryBrandIds = new Set(allCatProducts.map((p) => p.brandId));
  const filteredBrands = brandsRes.data.filter((b) => categoryBrandIds.has(b.id));
  const brandObjects = filteredBrands.map((b) => ({ id: b.id, name: b.name }));

  // Parse selections from URL: format is "AttrName|value,AttrName|value"
  // This unambiguously encodes both the attribute group and the value.
  const selectedPairs = (atributi?.split(",").filter(Boolean) ?? [])
    .map((s) => {
      const idx = s.indexOf("|");
      if (idx === -1) return null;
      return { attrName: s.slice(0, idx), value: s.slice(idx + 1) };
    })
    .filter((x): x is { attrName: string; value: string } => x !== null);

  // Group selections by attrName (OR within group, AND across groups)
  const selectedByAttrName = new Map<string, string[]>();
  for (const { attrName, value } of selectedPairs) {
    if (!selectedByAttrName.has(attrName)) selectedByAttrName.set(attrName, []);
    selectedByAttrName.get(attrName)!.push(value);
  }

  // Build categoryAttributes from ACTUAL product spec values (not the incomplete API values list).
  // API attributes provide the grouping metadata (id, name, sortOrder).
  // Spec values found in products are the actual filterable options.
  const specByKey = new Map<string, Set<string>>();
  for (const p of allCatProducts) {
    for (const s of p.specifications) {
      if (!specByKey.has(s.key)) specByKey.set(s.key, new Set());
      specByKey.get(s.key)!.add(s.value);
    }
  }
  const categoryAttributes = attributes
    .filter((a) => (specByKey.get(a.name)?.size ?? 0) > 0)
    .map((a) => ({
      ...a,
      values: [...(specByKey.get(a.name) ?? [])]
        .sort((a, b) => a.localeCompare(b, "sr"))
        .map((v) => ({ id: `${a.id}::${v}`, value: v, sortOrder: 0, attributeId: a.id })),
    }));

  // Match products: spec.key must equal attrName AND spec.value must equal value
  const matchesAttrFilter = (p: typeof allCatProducts[0]) =>
    [...selectedByAttrName.entries()].every(([attrName, vals]) =>
      vals.some((v) => p.specifications.some((s) => s.key === attrName && s.value === v))
    );

  let filtered = allCatProducts;
  if (selectedPairs.length) filtered = filtered.filter(matchesAttrFilter);
  if (selectedBrandIds.length) filtered = filtered.filter((p) => selectedBrandIds.includes(p.brandId));
  if (minPrice !== undefined) filtered = filtered.filter((p) => parseFloat(p.price) >= minPrice);
  if (maxPrice !== undefined) filtered = filtered.filter((p) => parseFloat(p.price) <= maxPrice);

  const total = filtered.length;
  const totalPages = Math.ceil(total / 12) || 1;
  const products = filtered.slice((currentPage - 1) * 12, currentPage * 12);

  // Faceted counts per attribute (leave-one-out: show what would match if THIS attr's filter is lifted)
  const attrValueCounts: Record<string, Record<string, number>> = {};
  for (const attr of categoryAttributes) {
    // Base: products matching all filters EXCEPT this attribute's selections
    const otherPairs = selectedPairs.filter((p) => p.attrName !== attr.name);
    const otherByAttrName = new Map<string, string[]>();
    for (const { attrName, value } of otherPairs) {
      if (!otherByAttrName.has(attrName)) otherByAttrName.set(attrName, []);
      otherByAttrName.get(attrName)!.push(value);
    }
    let facetBase = allCatProducts;
    if (otherByAttrName.size) {
      facetBase = facetBase.filter((p) =>
        [...otherByAttrName.entries()].every(([attrName, vals]) =>
          vals.some((v) => p.specifications.some((s) => s.key === attrName && s.value === v))
        )
      );
    }
    if (selectedBrandIds.length) facetBase = facetBase.filter((p) => selectedBrandIds.includes(p.brandId));
    if (minPrice !== undefined) facetBase = facetBase.filter((p) => parseFloat(p.price) >= minPrice);
    if (maxPrice !== undefined) facetBase = facetBase.filter((p) => parseFloat(p.price) <= maxPrice);

    const groupCounts: Record<string, number> = {};
    const seen = new Set<string>();
    for (const p of facetBase) {
      for (const spec of p.specifications) {
        if (spec.key === attr.name) {
          const uid = `${p.id}::${spec.value}`;
          if (!seen.has(uid)) {
            seen.add(uid);
            groupCounts[spec.value] = (groupCounts[spec.value] ?? 0) + 1;
          }
        }
      }
    }
    attrValueCounts[attr.id] = groupCounts;
  }

  // Selected values encoded as "AttrName|value" for passing to AttributeFilter
  const selectedAttrEncoded = selectedPairs.map(({ attrName, value }) => `${attrName}|${value}`);
  const selectedEncodedSet = new Set(selectedAttrEncoded);

  // Hide attribute values with 0 results (unless currently selected)
  const facetedAttributes = categoryAttributes
    .map((a) => ({
      ...a,
      values: a.values.filter(
        (v) => selectedEncodedSet.has(`${a.name}|${v.value}`) || (attrValueCounts[a.id]?.[v.value] ?? 0) > 0
      ),
    }))
    .filter((a) => a.values.length > 0);

  // Faceted brand counts (based on products filtered by attr + price, not brand)
  const brandCounts: Record<string, number> = {};
  {
    let brandBase = allCatProducts;
    if (selectedPairs.length) brandBase = brandBase.filter(matchesAttrFilter);
    if (minPrice !== undefined) brandBase = brandBase.filter((p) => parseFloat(p.price) >= minPrice);
    if (maxPrice !== undefined) brandBase = brandBase.filter((p) => parseFloat(p.price) <= maxPrice);
    for (const p of brandBase) {
      const b = filteredBrands.find((br) => br.id === p.brandId);
      if (b) brandCounts[b.name] = (brandCounts[b.name] ?? 0) + 1;
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero banner */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <Link href="/proizvodi" className="hover:text-white transition-colors duration-150">Svi proizvodi</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{total} proizvoda u kategoriji</p>
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
      <Wrapper>
        <div className="flex gap-12">
          {/* Filters sidebar */}
          <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-0 pt-[49px]">
            {/* Podkategorije */}
            {subcategories.length > 0 && (
              <div className="pb-3" style={{ borderBottom: "1px solid #d3d3d3" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">Podkategorije</p>
                <nav className="flex flex-col">
                  {subcategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/proizvodi/${cat.slug}`}
                      className="flex items-center justify-between py-1.5 text-sm text-zinc-500 hover:text-zinc-950 transition-colors duration-150 group"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-zinc-400 group-hover:text-zinc-500 transition-colors duration-150 tabular-nums ml-2 shrink-0"></span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            <Suspense><PriceRangeFilter /></Suspense>
            <Suspense><BrandFilter brands={brandObjects} selectedBrandIds={selectedBrandIds} counts={brandCounts} /></Suspense>
            <Suspense><AttributeFilter attributes={facetedAttributes} selectedValues={selectedAttrEncoded} countsPerAttr={attrValueCounts} /></Suspense>
          </aside>

          {/* Main */}
          <ProductGridClient
            products={products.map((p) => ({
              id: p.id,
              name: p.name,
              category: p.category?.name ?? category.name,
              price: formatPrice(p.clearancePrice ?? p.salePrice ?? p.price),
              originalPrice: (p.clearancePrice || p.salePrice) ? formatPrice(p.price) : undefined,
              image: p.images[0] ?? "/images/img4.png",
              href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
              badge: (p.clearanceDiscountPercent ?? 0) > 0 ? `−${p.clearanceDiscountPercent}%` : (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : (p.clearancePrice || p.salePrice) ? "Akcija" : undefined,
              stock: p.stock,
              inStock: p.inStock,
            }))}
            total={total}
            hasActiveFilters={selectedAttrEncoded.length > 0 || selectedBrandIds.length > 0 || !!cena_min || !!cena_max}
            resetHref={`/proizvodi/${kategorija}`}
            filterTrigger={
              <MobileFilterDrawer>
                <Suspense key="price"><PriceRangeFilter /></Suspense>
                <Suspense key="brand"><BrandFilter brands={brandObjects} selectedBrandIds={selectedBrandIds} counts={brandCounts} /></Suspense>
                <Suspense key="attr"><AttributeFilter attributes={facetedAttributes} selectedValues={selectedAttrEncoded} countsPerAttr={attrValueCounts} /></Suspense>
              </MobileFilterDrawer>
            }
            pagination={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                buildHref={(p) => {
                  const params = new URLSearchParams();
                  params.set("stranica", String(p));
                  if (selectedAttrEncoded.length) params.set("atributi", selectedAttrEncoded.join(","));
                  if (selectedBrandIds.length) params.set("brendovi", selectedBrandIds.join(","));
                  if (cena_min) params.set("cena_min", cena_min);
                  if (cena_max) params.set("cena_max", cena_max);
                  return `/proizvodi/${kategorija}?${params.toString()}`;
                }}
              />
            }
          />
        </div>
      </Wrapper>
      </div>
    </div>
  );
}
