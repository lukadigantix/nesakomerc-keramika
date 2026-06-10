import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { getOnSaleProducts, getCategories, getActiveBrands } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductToolbar from "@/components/ui/ProductToolbar";
import PriceRangeFilter from "@/components/ui/PriceRangeFilter";
import ColorFilter from "@/components/ui/ColorFilter";
import BrandFilter from "@/components/ui/BrandFilter";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";

export const metadata = {
  title: "Mesečna akcija — Nesa Komerc Keramika",
  description: "Pogledajte proizvode na akciji ovog meseca.",
};

const PER_PAGE = 12;

export default async function AkcijaPage({
  searchParams,
}: {
  searchParams: Promise<{ stranica?: string }>;
}) {
  const { stranica } = await searchParams;
  const currentPage = Math.max(1, parseInt(stranica ?? "1", 10));

  const [saleRes, categoriesRes, brandsRes] = await Promise.all([
    getOnSaleProducts(),
    getCategories(),
    getActiveBrands(),
  ]);

  const allSaleProducts = saleRes.data;
  const categories = categoriesRes.data;
  const brands = brandsRes.data.map((b) => b.name);
  const total = saleRes.meta?.total ?? allSaleProducts.length;
  const totalPages = saleRes.meta?.totalPages ?? Math.ceil(total / PER_PAGE);

  // Client-side pagination fallback if API doesn't paginate
  const paginated =
    saleRes.meta?.page != null
      ? allSaleProducts
      : allSaleProducts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero banner */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Mesečna akcija</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Mesečna akcija</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{total} proizvoda na akciji</p>
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
        <Wrapper>
          <div className="flex gap-12">
            {/* Sidebar */}
            <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-8">
              <PriceRangeFilter />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Kategorije</p>
                <nav className="flex flex-col">
                  <Link
                    href="/akcija"
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100"
                  >
                    Sve akcije
                    <span className="text-xs font-normal text-zinc-400">{total}</span>
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/akcija?kategorija=${cat.slug}`}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-150"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <BrandFilter brands={brands} />
              <ColorFilter />
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              <ProductToolbar filterTrigger={
                <MobileFilterDrawer>
                  <PriceRangeFilter />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Kategorije</p>
                    <nav className="flex flex-col">
                      <Link href="/akcija" className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100">
                        Sve akcije
                        <span className="text-xs font-normal text-zinc-400">{total}</span>
                      </Link>
                      {categories.map((cat) => (
                        <Link key={cat.slug} href={`/akcija?kategorija=${cat.slug}`} className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-150">
                          {cat.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <BrandFilter brands={brands} />
                  <ColorFilter />
                </MobileFilterDrawer>
              } />
              {/* Grid */}
              <div className="grid grid-cols-4 max-[1329px]:grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5 max-[1329px]:gap-4">
                {paginated.map((p) => (
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
                    badge={p.discountPercent ? `−${p.discountPercent}%` : "Akcija"}
                    stock={p.stock}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                buildHref={(p) => `/akcija?stranica=${p}`}
              />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
