import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/layout/Wrapper";
import { getCategories, getProducts, getActiveBrands, getAttributes } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";
import ProductGridClient from "@/components/ui/ProductGridClient";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import AttributeFilter from "@/components/ui/AttributeFilter";
import BrandFilter from "@/components/ui/BrandFilter";
import CategoryFilter from "@/components/ui/CategoryFilter";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";
import { Search } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Svi proizvodi — Neša Komerc Keramika",
  description: "Pregledajte kompletan asortiman kupatilske opreme i keramike.",
};

const PER_PAGE = 24;

export default async function ProizvodiPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    stranica?: string;
    kategorija_id?: string;
    brendovi?: string;
    atributi?: string;
    cena_min?: string;
    cena_max?: string;
    sort?: string;
    per_page?: string;
  }>;
}) {
  const { q, stranica, kategorija_id, brendovi, atributi, cena_min, cena_max, sort, per_page } = await searchParams;
  const perPage = per_page === "24" ? 24 : 12;
  const query = q?.trim() ?? "";
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));

  // ── Search mode ──────────────────────────────────────────────────────────────
  if (query.length >= 2) {
    const selectedCategoryIds = kategorija_id?.split(",").filter(Boolean) ?? [];
    const selectedBrandIds = brendovi?.split(",").filter(Boolean) ?? [];
    const minPrice = cena_min ? Number(cena_min) : undefined;
    const maxPrice = cena_max ? Number(cena_max) : undefined;

    // Fetch all search results + supporting data in parallel
    const [allSearchRes, brandsRes, attributesRes] = await Promise.all([
      getProducts({ search: query, limit: 999 }),
      getActiveBrands(),
      getAttributes().catch(() => ({ success: true as const, data: [] })),
    ]);

    const allSearchProducts = allSearchRes.data.filter((p) => p.inStock);
    const attributes = attributesRes.data;

    // Build unique categories from search results
    const catMap = new Map<string, { id: string; name: string }>();
    for (const p of allSearchProducts) {
      if (p.category) catMap.set(p.category.id, { id: p.category.id, name: p.category.name });
    }
    const searchCategories = [...catMap.values()].sort((a, b) => a.name.localeCompare(b.name, "sr"));

    // Build brands present in search results
    const searchBrandIds = new Set(allSearchProducts.map((p) => p.brandId));
    const filteredBrands = brandsRes.data.filter((b) => searchBrandIds.has(b.id));
    const brandObjects = filteredBrands.map((b) => ({ id: b.id, name: b.name }));

    // Parse attribute selections: "AttrName|value,..."
    const selectedPairs = (atributi?.split(",").filter(Boolean) ?? [])
      .map((s) => {
        const idx = s.indexOf("|");
        if (idx === -1) return null;
        return { attrName: s.slice(0, idx), value: s.slice(idx + 1) };
      })
      .filter((x): x is { attrName: string; value: string } => x !== null);

    const selectedByAttrName = new Map<string, string[]>();
    for (const { attrName, value } of selectedPairs) {
      if (!selectedByAttrName.has(attrName)) selectedByAttrName.set(attrName, []);
      selectedByAttrName.get(attrName)!.push(value);
    }

    // Build attribute options from actual product specs
    const specByKey = new Map<string, Set<string>>();
    for (const p of allSearchProducts) {
      for (const s of p.specifications) {
        if (!specByKey.has(s.key)) specByKey.set(s.key, new Set());
        specByKey.get(s.key)!.add(s.value);
      }
    }
    const searchAttributes = attributes
      .filter((a) => (specByKey.get(a.name)?.size ?? 0) > 0)
      .map((a) => ({
        ...a,
        values: [...(specByKey.get(a.name) ?? [])]
          .sort((a, b) => a.localeCompare(b, "sr"))
          .map((v) => ({ id: `${a.id}::${v}`, value: v, sortOrder: 0, attributeId: a.id })),
      }));

    // Apply filters client-side
    const matchesAttrFilter = (p: (typeof allSearchProducts)[0]) =>
      [...selectedByAttrName.entries()].every(([attrName, vals]) =>
        vals.some((v) => p.specifications.some((s) => s.key === attrName && s.value === v))
      );

    let filtered = allSearchProducts;
    if (selectedCategoryIds.length) filtered = filtered.filter((p) => p.category && selectedCategoryIds.includes(p.category.id));
    if (selectedPairs.length) filtered = filtered.filter(matchesAttrFilter);
    if (selectedBrandIds.length) filtered = filtered.filter((p) => selectedBrandIds.includes(p.brandId));
    if (minPrice !== undefined) filtered = filtered.filter((p) => parseFloat(p.price) >= minPrice);
    if (maxPrice !== undefined) filtered = filtered.filter((p) => parseFloat(p.price) <= maxPrice);

    const searchEffectivePrice = (p: typeof filtered[0]) => parseFloat(p.salePrice ?? p.price);
    if (sort === "cena_asc") filtered = [...filtered].sort((a, b) => searchEffectivePrice(a) - searchEffectivePrice(b));
    else if (sort === "cena_desc") filtered = [...filtered].sort((a, b) => searchEffectivePrice(b) - searchEffectivePrice(a));
    else if (sort === "naziv_asc") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "sr"));
    else if (sort === "naziv_desc") filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name, "sr"));

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const products = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Faceted attribute counts (leave-one-out)
    const attrValueCounts: Record<string, Record<string, number>> = {};
    for (const attr of searchAttributes) {
      const otherPairs = selectedPairs.filter((p) => p.attrName !== attr.name);
      const otherByAttrName = new Map<string, string[]>();
      for (const { attrName, value } of otherPairs) {
        if (!otherByAttrName.has(attrName)) otherByAttrName.set(attrName, []);
        otherByAttrName.get(attrName)!.push(value);
      }
      let facetBase = allSearchProducts;
      if (selectedCategoryIds.length) facetBase = facetBase.filter((p) => p.category && selectedCategoryIds.includes(p.category.id));
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

    const selectedAttrEncoded = selectedPairs.map(({ attrName, value }) => `${attrName}|${value}`);
    const selectedEncodedSet = new Set(selectedAttrEncoded);

    const facetedAttributes = searchAttributes
      .map((a) => ({
        ...a,
        values: a.values.filter(
          (v) => selectedEncodedSet.has(`${a.name}|${v.value}`) || (attrValueCounts[a.id]?.[v.value] ?? 0) > 0
        ),
      }))
      .filter((a) => a.values.length > 0);

    // Faceted brand counts
    const brandCounts: Record<string, number> = {};
    {
      let brandBase = allSearchProducts;
      if (selectedCategoryIds.length) brandBase = brandBase.filter((p) => p.category && selectedCategoryIds.includes(p.category.id));
      if (selectedPairs.length) brandBase = brandBase.filter(matchesAttrFilter);
      if (minPrice !== undefined) brandBase = brandBase.filter((p) => parseFloat(p.price) >= minPrice);
      if (maxPrice !== undefined) brandBase = brandBase.filter((p) => parseFloat(p.price) <= maxPrice);
      for (const p of brandBase) {
        const b = filteredBrands.find((br) => br.id === p.brandId);
        if (b) brandCounts[b.name] = (brandCounts[b.name] ?? 0) + 1;
      }
    }

    // Faceted category counts
    const categoryCounts: Record<string, number> = {};
    {
      let catBase = allSearchProducts;
      if (selectedPairs.length) catBase = catBase.filter(matchesAttrFilter);
      if (selectedBrandIds.length) catBase = catBase.filter((p) => selectedBrandIds.includes(p.brandId));
      if (minPrice !== undefined) catBase = catBase.filter((p) => parseFloat(p.price) >= minPrice);
      if (maxPrice !== undefined) catBase = catBase.filter((p) => parseFloat(p.price) <= maxPrice);
      for (const p of catBase) {
        if (p.category) categoryCounts[p.category.id] = (categoryCounts[p.category.id] ?? 0) + 1;
      }
    }

    const hasActiveFilters =
      selectedCategoryIds.length > 0 ||
      selectedAttrEncoded.length > 0 ||
      selectedBrandIds.length > 0 ||
      !!cena_min ||
      !!cena_max;

    const buildPaginationHref = (p: number) => {
      const params = new URLSearchParams();
      params.set("q", query);
      params.set("stranica", String(p));
      if (selectedCategoryIds.length) params.set("kategorija_id", selectedCategoryIds.join(","));
      if (selectedAttrEncoded.length) params.set("atributi", selectedAttrEncoded.join(","));
      if (selectedBrandIds.length) params.set("brendovi", selectedBrandIds.join(","));
      if (cena_min) params.set("cena_min", cena_min);
      if (cena_max) params.set("cena_max", cena_max);
      if (sort && sort !== "popularnost") params.set("sort", sort);
      if (per_page) params.set("per_page", per_page);
      return `/proizvodi?${params.toString()}`;
    };

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

        <div className="pt-10 pb-16">
          <Wrapper>
            {allSearchProducts.length === 0 ? (
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
              <div className="flex gap-12">
                {/* Filters sidebar */}
                <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-0 pt-[49px]">
                  <Suspense>
                    <CategoryFilter
                      categories={searchCategories}
                      selectedCategoryIds={selectedCategoryIds}
                      counts={categoryCounts}
                    />
                  </Suspense>
                  <Suspense><PriceRangeFilter /></Suspense>
                  <Suspense>
                    <BrandFilter
                      brands={brandObjects}
                      selectedBrandIds={selectedBrandIds}
                      counts={brandCounts}
                    />
                  </Suspense>
                  <Suspense>
                    <AttributeFilter
                      attributes={facetedAttributes}
                      selectedValues={selectedAttrEncoded}
                      countsPerAttr={attrValueCounts}
                    />
                  </Suspense>
                </aside>

                <ProductGridClient
                  products={products.map((p) => ({
                    id: p.id,
                    name: p.name,
                    category: p.category?.name ?? "",
                    price: formatPrice(p.salePrice ?? p.price),
                    originalPrice: p.salePrice ? formatPrice(p.price) : undefined,
                    image: p.images[0] ?? "/images/img4.png",
                    href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
                    badge: (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : p.salePrice ? "Akcija" : undefined,
                    stock: p.stock,
                    inStock: p.inStock,
                  }))}
                  total={total}
                  hasActiveFilters={hasActiveFilters}
                  resetHref={`/proizvodi?q=${encodeURIComponent(query)}`}
                  filterTrigger={
                    <MobileFilterDrawer>
                      <Suspense key="cat">
                        <CategoryFilter
                          categories={searchCategories}
                          selectedCategoryIds={selectedCategoryIds}
                          counts={categoryCounts}
                        />
                      </Suspense>
                      <Suspense key="price"><PriceRangeFilter /></Suspense>
                      <Suspense key="brand">
                        <BrandFilter
                          brands={brandObjects}
                          selectedBrandIds={selectedBrandIds}
                          counts={brandCounts}
                        />
                      </Suspense>
                      <Suspense key="attr">
                        <AttributeFilter
                          attributes={facetedAttributes}
                          selectedValues={selectedAttrEncoded}
                          countsPerAttr={attrValueCounts}
                        />
                      </Suspense>
                    </MobileFilterDrawer>
                  }
                  pagination={
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      buildHref={buildPaginationHref}
                    />
                  }
                />
              </div>
            )}
          </Wrapper>
        </div>
      </div>
    );
  }

  // ── Category grid mode ───────────────────────────────────────────────────────
  // ── Novo mode ────────────────────────────────────────────────────────────────
  if (sort === "novo") {
    const selectedBrandIds = brendovi?.split(",").filter(Boolean) ?? [];
    const minPrice = cena_min ? Number(cena_min) : undefined;
    const maxPrice = cena_max ? Number(cena_max) : undefined;

    const selectedPairs = (atributi?.split(",").filter(Boolean) ?? [])
      .map((s) => { const idx = s.indexOf("|"); return idx === -1 ? null : { attrName: s.slice(0, idx), value: s.slice(idx + 1) }; })
      .filter((x): x is { attrName: string; value: string } => x !== null);

    const selectedByAttrName = new Map<string, string[]>();
    for (const { attrName, value } of selectedPairs) {
      if (!selectedByAttrName.has(attrName)) selectedByAttrName.set(attrName, []);
      selectedByAttrName.get(attrName)!.push(value);
    }

    const [allNovoRes, brandsRes, attributesRes] = await Promise.all([
      getProducts({ sortBy: "newest", limit: 999 }),
      getActiveBrands(),
      getAttributes().catch(() => ({ success: true as const, data: [] })),
    ]);

    const allNovoProducts = allNovoRes.data.filter((p) => p.inStock);
    const attributes = attributesRes.data;

    const novoBrandIds = new Set(allNovoProducts.map((p) => p.brandId));
    const filteredBrands = brandsRes.data.filter((b) => novoBrandIds.has(b.id));
    const brandObjects = filteredBrands.map((b) => ({ id: b.id, name: b.name }));

    const specByKey = new Map<string, Set<string>>();
    for (const p of allNovoProducts) {
      for (const s of p.specifications) {
        if (!specByKey.has(s.key)) specByKey.set(s.key, new Set());
        specByKey.get(s.key)!.add(s.value);
      }
    }
    const novoAttributes = attributes
      .filter((a) => (specByKey.get(a.name)?.size ?? 0) > 0)
      .map((a) => ({
        ...a,
        values: [...(specByKey.get(a.name) ?? [])]
          .sort((a, b) => a.localeCompare(b, "sr"))
          .map((v) => ({ id: `${a.id}::${v}`, value: v, sortOrder: 0, attributeId: a.id })),
      }));

    const matchesAttrFilter = (p: (typeof allNovoProducts)[0]) =>
      [...selectedByAttrName.entries()].every(([attrName, vals]) =>
        vals.some((v) => p.specifications.some((s) => s.key === attrName && s.value === v))
      );

    let filtered = allNovoProducts;
    if (selectedPairs.length) filtered = filtered.filter(matchesAttrFilter);
    if (selectedBrandIds.length) filtered = filtered.filter((p) => selectedBrandIds.includes(p.brandId));
    if (minPrice !== undefined) filtered = filtered.filter((p) => parseFloat(p.price) >= minPrice);
    if (maxPrice !== undefined) filtered = filtered.filter((p) => parseFloat(p.price) <= maxPrice);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const products = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Faceted attribute counts
    const attrValueCounts: Record<string, Record<string, number>> = {};
    for (const attr of novoAttributes) {
      const otherPairs = selectedPairs.filter((p) => p.attrName !== attr.name);
      const otherByAttrName = new Map<string, string[]>();
      for (const { attrName, value } of otherPairs) {
        if (!otherByAttrName.has(attrName)) otherByAttrName.set(attrName, []);
        otherByAttrName.get(attrName)!.push(value);
      }
      let facetBase = allNovoProducts;
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
            if (!seen.has(uid)) { seen.add(uid); groupCounts[spec.value] = (groupCounts[spec.value] ?? 0) + 1; }
          }
        }
      }
      attrValueCounts[attr.id] = groupCounts;
    }

    const selectedAttrEncoded = selectedPairs.map(({ attrName, value }) => `${attrName}|${value}`);
    const selectedEncodedSet = new Set(selectedAttrEncoded);
    const facetedAttributes = novoAttributes
      .map((a) => ({ ...a, values: a.values.filter((v) => selectedEncodedSet.has(`${a.name}|${v.value}`) || (attrValueCounts[a.id]?.[v.value] ?? 0) > 0) }))
      .filter((a) => a.values.length > 0);

    const brandCounts: Record<string, number> = {};
    {
      let brandBase = allNovoProducts;
      if (selectedPairs.length) brandBase = brandBase.filter(matchesAttrFilter);
      if (minPrice !== undefined) brandBase = brandBase.filter((p) => parseFloat(p.price) >= minPrice);
      if (maxPrice !== undefined) brandBase = brandBase.filter((p) => parseFloat(p.price) <= maxPrice);
      for (const p of brandBase) {
        const b = filteredBrands.find((br) => br.id === p.brandId);
        if (b) brandCounts[b.name] = (brandCounts[b.name] ?? 0) + 1;
      }
    }

    const hasActiveFilters = selectedAttrEncoded.length > 0 || selectedBrandIds.length > 0 || !!cena_min || !!cena_max;

    const buildNovoHref = (p: number) => {
      const params = new URLSearchParams();
      params.set("sort", "novo");
      params.set("stranica", String(p));
      if (selectedAttrEncoded.length) params.set("atributi", selectedAttrEncoded.join(","));
      if (selectedBrandIds.length) params.set("brendovi", selectedBrandIds.join(","));
      if (cena_min) params.set("cena_min", cena_min);
      if (cena_max) params.set("cena_max", cena_max);
      if (per_page) params.set("per_page", per_page);
      return `/proizvodi?${params.toString()}`;
    };

    return (
      <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
        <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
          <Wrapper>
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
              <span>/</span>
              <Link href="/proizvodi" className="hover:text-white transition-colors duration-150">Svi proizvodi</Link>
              <span>/</span>
              <span className="text-white">Novo u ponudi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Novo u ponudi</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{total} proizvoda</p>
          </Wrapper>
        </div>
        <div className="pt-10 pb-16">
          <Wrapper>
            <div className="flex gap-12">
              <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-0 pt-[49px]">
                <Suspense><PriceRangeFilter /></Suspense>
                <Suspense><BrandFilter brands={brandObjects} selectedBrandIds={selectedBrandIds} counts={brandCounts} /></Suspense>
                <Suspense><AttributeFilter attributes={facetedAttributes} selectedValues={selectedAttrEncoded} countsPerAttr={attrValueCounts} /></Suspense>
              </aside>
              <ProductGridClient
                products={products.map((p) => ({
                  id: p.id,
                  name: p.name,
                  category: p.category?.name ?? "",
                  price: formatPrice(p.salePrice ?? p.price),
                  originalPrice: p.salePrice ? formatPrice(p.price) : undefined,
                  image: p.images[0] ?? "/images/img4.png",
                  href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
                  badge: (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : p.salePrice ? "Akcija" : undefined,
                  stock: p.stock,
                  inStock: p.inStock,
                }))}
                total={total}
                hasActiveFilters={hasActiveFilters}
                resetHref="/proizvodi?sort=novo"
                filterTrigger={
                  <MobileFilterDrawer>
                    <Suspense key="price"><PriceRangeFilter /></Suspense>
                    <Suspense key="brand"><BrandFilter brands={brandObjects} selectedBrandIds={selectedBrandIds} counts={brandCounts} /></Suspense>
                    <Suspense key="attr"><AttributeFilter attributes={facetedAttributes} selectedValues={selectedAttrEncoded} countsPerAttr={attrValueCounts} /></Suspense>
                  </MobileFilterDrawer>
                }
                pagination={
                  <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={buildNovoHref} />
                }
              />
            </div>
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

