import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { getProducts, getCategories, getActiveBrands, getAttributes } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductToolbar from "@/components/ui/ProductToolbar";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import AttributeFilter from "@/components/ui/AttributeFilter";
import BrandFilter from "@/components/ui/BrandFilter";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";

export const metadata = {
  title: "Svi proizvodi — Nesa Komerc Keramika",
  description: "Pregledajte kompletan asortiman kupatilske opreme i keramike.",
};

const PER_PAGE = 12;

export default async function ProizvodiPage({
  searchParams,
}: {
  searchParams: Promise<{ stranica?: string; atributi?: string }>;
}) {
  const { stranica, atributi } = await searchParams;
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));
  const selectedValues = atributi?.split(",").filter(Boolean) ?? [];

  const attributesRes = await getAttributes().catch(() => ({ success: true, data: [] }));
  const attributes = attributesRes.data;
  const valueIdMap = new Map(attributes.flatMap((a) => a.values.map((v) => [v.value, v.id])));
  const attributeValueIds = selectedValues.map((n) => valueIdMap.get(n)).filter((id): id is string => !!id);

  const [productsRes, categoriesRes, brandsRes] = await Promise.all([
    getProducts({ page: currentPage, limit: PER_PAGE, attributeValueIds: attributeValueIds.length ? attributeValueIds : undefined }),
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
      {/* Hero banner */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Svi proizvodi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Svi proizvodi</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{total} proizvoda u asortimanu</p>
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
      <Wrapper>
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden min-[1330px]:block w-56 shrink-0">
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
                <span className="text-xs font-normal text-zinc-400">{total}</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/proizvodi/${cat.slug}`}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-150"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-6">
              <BrandFilter brands={brands} />
              <AttributeFilter attributes={attributes} selectedValues={selectedValues} />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <ProductToolbar filterTrigger={
              <MobileFilterDrawer>
                <PriceRangeFilter />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Kategorije</p>
                  <nav className="flex flex-col">
                    <Link href="/proizvodi" className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100">
                      Svi proizvodi
                    </Link>
                    {categories.map((cat) => (
                      <Link key={cat.slug} href={`/proizvodi/${cat.slug}`} className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-150">
                        {cat.name}
                      </Link>
                    ))}
                  </nav>
                </div>
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
              buildHref={(p) => `/proizvodi?stranica=${p}${selectedValues.length ? `&atributi=${selectedValues.join(",")}` : ""}`}
            />
          </div>
        </div>
      </Wrapper>
      </div>
    </div>
  );
}
