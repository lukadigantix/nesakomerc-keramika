import Link from "next/link";
import { notFound } from "next/navigation";
import Wrapper from "@/components/layout/Wrapper";
import { getProducts, getCategories, getCategoryBySlug, getActiveBrands, getAttributes } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductToolbar from "@/components/ui/ProductToolbar";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import AttributeFilter from "@/components/ui/AttributeFilter";
import BrandFilter from "@/components/ui/BrandFilter";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";
import { Suspense } from "react";
import { connection } from "next/server";

const Connection = async () => { await connection(); return null; };
const DynamicMarker = () => <Suspense><Connection /></Suspense>;

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

const PER_PAGE = 12;

export default async function KategorijaPage({
  params,
  searchParams,
}: {
  params: Promise<{ kategorija: string }>;
  searchParams: Promise<{ stranica?: string; atributi?: string }>;
}) {
  const { kategorija } = await params;
  const { stranica, atributi } = await searchParams;
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));
  const selectedValues = atributi?.split(",").filter(Boolean) ?? [];

  let category;
  try {
    const res = await getCategoryBySlug(kategorija);
    category = res.data;
  } catch {
    notFound();
  }

  const attributesRes = await getAttributes().catch(() => ({ success: true, data: [] }));
  const attributes = attributesRes.data;
  const valueIdMap = new Map(attributes.flatMap((a) => a.values.map((v) => [v.value, v.id])));
  const attributeValueIds = selectedValues.map((n) => valueIdMap.get(n)).filter((id): id is string => !!id);

  const [productsRes, categoriesRes, brandsRes] = await Promise.all([
    getProducts({ categoryId: category.id, page: currentPage, limit: PER_PAGE, attributeValueIds: attributeValueIds.length ? attributeValueIds : undefined }),
    getCategories(),
    getActiveBrands(),
  ]);

  const products = productsRes.data;
  const categories = categoriesRes.data;
  const brands = brandsRes.data.map((b) => b.name);
  const total = productsRes.meta?.total ?? products.length;
  const totalPages = productsRes.meta?.totalPages ?? Math.ceil(total / PER_PAGE);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      <DynamicMarker />
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
          <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-8">
            <PriceRangeFilter />
            <BrandFilter brands={brands} />
            <AttributeFilter attributes={attributes} selectedValues={selectedValues} />

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

            {/* Kategorije */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Kategorije</p>
              <nav className="flex flex-col">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/proizvodi/${cat.slug}`}
                    className={`py-2 text-sm transition-colors duration-150 ${cat.slug === kategorija ? "font-semibold text-zinc-950" : "text-zinc-500 hover:text-zinc-950"}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <ProductToolbar filterTrigger={
              <MobileFilterDrawer>
                <PriceRangeFilter />
                <BrandFilter brands={brands} />
                <AttributeFilter attributes={attributes} selectedValues={selectedValues} />
              </MobileFilterDrawer>
            } />
            {/* Grid */}
            <div className="grid grid-cols-4 max-[1329px]:grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5 max-[1329px]:gap-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    category: p.category?.name ?? category.name,
                    price: formatPrice(p.price),
                    image: p.images[0] ?? "/images/img4.png",
                  }}
                  href={`/proizvodi/${kategorija}/${p.slug}`}
                  badge={p.discountPercent ? `−${p.discountPercent}%` : p.salePrice ? "Akcija" : undefined}
                  stock={p.stock}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={(p) => `/proizvodi/${kategorija}?stranica=${p}${selectedValues.length ? `&atributi=${selectedValues.join(",")}` : ""}`}
            />
          </div>
        </div>
      </Wrapper>
      </div>
    </div>
  );
}
