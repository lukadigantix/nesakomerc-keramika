import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, RefreshCw, ShieldCheck } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductTabs from "@/components/ui/ProductTabs";
import QuantitySelector from "@/components/ui/QuantitySelector";
import WishlistButton from "@/components/ui/WishlistButton";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { getProductBySlug, getProducts, getProductRecommended } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";

async function RecommendedProducts({ productId, kategorijaSlug, categoryName, excludeIds }: { productId: string; kategorijaSlug: string; categoryName: string; excludeIds: string[] }) {
  const products = (await getProductRecommended(productId, 16).catch(() => [])).filter((p) => p.inStock && !excludeIds.includes(p.id)).slice(0, 8);
  if (products.length === 0) return null;
  return (
    <ProductCarousel
      items={products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category?.name ?? categoryName,
        price: formatPrice(p.salePrice ?? p.price),
        originalPrice: p.salePrice ? formatPrice(p.price) : undefined,
        badge: (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : p.salePrice ? "Akcija" : undefined,
        image: p.images[0] ?? "/images/img4.png",
        stock: p.stock,
        inStock: p.inStock,
        href: `/proizvodi/${p.category?.slug ?? kategorijaSlug}/${p.slug}`,
      }))}
      subtitle="Izdvajamo"
      title="Preporučeni proizvodi"
      viewAllHref="/proizvodi"
      viewAllLabel="Svi proizvodi"
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorija: string; id: string }>;
}) {
  const { id } = await params;
  try {
    const { data: product } = await getProductBySlug(id);
    return {
      title: `${product.name} — Neša Komerc Keramika`,
      description: product.shortDescription ?? product.description ?? product.name,
    };
  } catch {
    return {};
  }
}

export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ kategorija: string; id: string }>;
}) {
  const { kategorija, id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <ProizvodPageContent kategorija={kategorija} id={id} />
    </Suspense>
  );
}

async function ProizvodPageContent({
  kategorija,
  id,
}: {
  kategorija: string;
  id: string;
}) {
  let product;
  try {
    const res = await getProductBySlug(id);
    product = res.data;
  } catch {
    notFound();
  }

  const category = product.category;
  if (!category) notFound();

  // Related products: same category, exclude current
  const relatedRes = await getProducts({ categoryId: category.id, limit: 20 });
  const related = relatedRes.data.filter((p) => p.id !== product.id && p.inStock).slice(0, 8);

  const gallery = product.images.length > 0
    ? product.images
    : ["/images/img4.png", "/images/img4.png", "/images/img4.png", "/images/img4.png"];

  const formattedPrice = formatPrice(product.price);
  const activeSpecialPrice = product.clearancePrice ?? product.salePrice;
  const formattedSalePrice = activeSpecialPrice ? formatPrice(activeSpecialPrice) : null;
  const activeDiscountPercent = (product.clearanceDiscountPercent ?? 0) > 0
    ? product.clearanceDiscountPercent
    : (product.saleDiscountPercent ?? 0) > 0
    ? product.saleDiscountPercent
    : null;

  // Build specs from API data + fallbacks
  const specs: [string, string][] = [
    ...(product.material ? [["Materijal", product.material] as [string, string]] : []),
    ...(product.finish ? [["Završna obrada", product.finish] as [string, string]] : []),
    ...(product.width ? [["Širina", `${product.width} mm`] as [string, string]] : []),
    ...(product.height ? [["Visina", `${product.height} mm`] as [string, string]] : []),
    ...(product.thickness ? [["Debljina", `${product.thickness} mm`] as [string, string]] : []),
    ...product.specifications.map((s) => [s.key, s.value] as [string, string]),
  ];

  return (
    <div className="pt-30 sm:pt-28 min-h-screen">
      <Wrapper>
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-zinc-950 transition-colors duration-150">Početna</Link>
          <span>/</span>
          <Link href="/proizvodi" className="hover:text-zinc-950 transition-colors duration-150">Svi proizvodi</Link>
          <span>/</span>
          <Link href={`/proizvodi/${kategorija}`} className="hover:text-zinc-950 transition-colors duration-150">{category.name}</Link>
          <span>/</span>
          <span className="text-zinc-950 truncate max-w-50">{product.name}</span>
        </div>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Gallery — left */}
          <div className="lg:col-span-7">
            <ProductGallery images={gallery} productName={product.name} />
          </div>

          {/* Info — right */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-2">
            {/* Category + name */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                {category.name}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              {formattedSalePrice ? (
                <>
                  <span className="text-2xl sm:text-3xl font-bold" style={{ color: "#e11d1b" }}>{formattedSalePrice}</span>
                  <span className="text-base sm:text-lg text-zinc-400 line-through">{formattedPrice}</span>
                  {(activeDiscountPercent ?? 0) > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: "#e11d1b" }}>
                      −{activeDiscountPercent}%
                    </span>
                  )}
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-zinc-950">{formattedPrice}</span>
              )}
              <span className="text-sm text-zinc-400">sa PDV-om</span>
            </div>

            {/* Divider */}
            <hr className="border-zinc-100" />

            {/* Specs */}
            <div className="flex flex-col divide-y divide-zinc-100">
              <div className="flex justify-between items-center py-1.5 sm:py-1">
                <span className="text-sm text-zinc-400">Šifra artikla</span>
                <span className="text-sm font-semibold text-zinc-950">{product.sku}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 sm:py-1">
                <span className="text-sm text-zinc-400">Dostupnost</span>
                {product.stock > 0 ? (
                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Na stanju · {product.stock} kom
                  </span>
                ) : product.inStock ? (
                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Na lageru
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-zinc-300 shrink-0" />
                    Po narudžbini
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center py-1.5 sm:py-1">
                <span className="text-sm text-zinc-400">Kategorija</span>
                <Link href={`/proizvodi/${kategorija}`} className="text-sm font-semibold text-zinc-950 hover:underline">
                  {category.name}
                </Link>
              </div>
              {product.brand && (
                <div className="flex justify-between items-center py-1.5 sm:py-1">
                  <span className="text-sm text-zinc-400">Brend</span>
                  <span className="text-sm font-semibold text-zinc-950">{product.brand.name}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-1.5 sm:py-1">
                <span className="text-sm text-zinc-400">Isporuka</span>
                <span className="text-sm font-semibold text-zinc-950">2 — 5 radnih dana</span>
              </div>
            </div>

            {/* CTA buttons */}
            <QuantitySelector
              product={{
                id: product.id,
                name: product.name,
                category: category.name,
                price: formattedSalePrice ?? formattedPrice,
                image: gallery[0],
                sku: product.sku,
              }}
              variantProducts={product.variants
                .map((v) => {
                  if (!v.imageUrl) return null;
                  const match = v.productId
                    ? related.find((p) => p.id === v.productId)
                    : related.find((p) => p.name === v.name);
                  return {
                    id: v.name,
                    name: v.name,
                    image: v.imageUrl,
                    href: match ? `/proizvodi/${match.category?.slug ?? kategorija}/${match.slug}` : "",
                  };
                })
                .filter(Boolean) as { id: string; name: string; image: string; href: string }[]
              }
              stock={product.stock}
              inStock={product.inStock}
              productId={product.id}
            />


          </div>
        </div>

        {/* Tabs + Trust badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductTabs
              description={product.description ?? ""}
              productName={product.name}
              categoryLabel={category.name}
              specs={specs}
            />
          </div>

          {/* Trust badges — right of tabs on desktop, below tabs on mobile */}
          <div className="mt-10 lg:mt-16 lg:col-span-5">
            {/* Spacer matching tab bar height so border-t aligns with tab bar's bottom line */}
            <div className="hidden lg:block h-12" />
            <div className="flex flex-col" style={{ borderTop: "1px solid #e4e4e7" }}>
            {[
              {
                icon: <Truck size={40} strokeWidth={1.4} />,
                title: "Besplatna dostava",
                text: "Za sve narudžbine iznad 6.000 RSD na teritoriji Srbije",
              },
              {
                icon: <RefreshCw size={40} strokeWidth={1.4} />,
                title: "Povrat u roku od 14 dana",
                text: "Jednostavan postupak vraćanja robe bez komplikacija",
              },
              {
                icon: <ShieldCheck size={40} strokeWidth={1.4} />,
                title: "Sigurna online kupovina",
                text: "SSL enkripcija i zaštita vaših podataka pri svakoj kupovini",
              },
            ].map(({ icon, title, text }, i, arr) => (
              <div
                key={title}
                className="flex items-start gap-6 py-8"
                style={i < arr.length - 1 ? { borderBottom: "1px solid #ebebeb" } : undefined}
              >
                <span className="shrink-0 mt-1" style={{ color: "#e11d1b" }}>{icon}</span>
                <div>
                  <p className="text-base font-semibold text-zinc-950 mb-1.5">{title}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

      </Wrapper>

      {/* Related products carousel */}
      {related.length > 0 && (
        <ProductCarousel
          items={related.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category?.name ?? category.name,
            price: formatPrice(p.clearancePrice ?? p.salePrice ?? p.price),
            originalPrice: (p.clearancePrice || p.salePrice) ? formatPrice(p.price) : undefined,
            badge: (p.clearanceDiscountPercent ?? 0) > 0 ? `−${p.clearanceDiscountPercent}%` : (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : (p.clearancePrice || p.salePrice) ? "Akcija" : undefined,
            image: p.images[0] ?? "/images/img4.png",
            stock: p.stock,
            inStock: p.inStock,
            href: `/proizvodi/${p.category?.slug ?? kategorija}/${p.slug}`,
          }))}
          subtitle={category.name}
          title="Slični proizvodi"
          viewAllHref={`/proizvodi/${kategorija}`}
          viewAllLabel="Svi iz kategorije"
        />
      )}

      {/* Recommended products carousel */}
      <Suspense>
        <RecommendedProducts productId={product.id} kategorijaSlug={kategorija} categoryName={category.name} excludeIds={[product.id, ...related.map((p) => p.id)]} />
      </Suspense>
    </div>
  );
}
