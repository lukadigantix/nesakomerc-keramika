import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, RefreshCw, ShieldCheck } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductTabs from "@/components/ui/ProductTabs";
import QuantitySelector from "@/components/ui/QuantitySelector";
import ProductCard from "@/components/ui/ProductCard";
import { categories, products, getCategoryBySlug, getProductById, getProductsByCategory } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((p) => ({
    kategorija: p.categorySlug,
    id: String(p.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorija: string; id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) return {};
  return {
    title: `${product.name} — Nesa Komerc Keramika`,
    description: `${product.name} — ${product.price}`,
  };
}

export default async function ProizvodPage({
  params,
}: {
  params: Promise<{ kategorija: string; id: string }>;
}) {
  const { kategorija, id } = await params;
  const product = getProductById(Number(id));
  const category = getCategoryBySlug(kategorija);

  if (!product || !category) notFound();

  const related = getProductsByCategory(kategorija)
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  // Gallery — same image repeated for placeholder
  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <Wrapper>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <Link href="/" className="hover:text-zinc-950 transition-colors duration-150">Početna</Link>
          <span>/</span>
          <Link href="/proizvodi" className="hover:text-zinc-950 transition-colors duration-150">Svi proizvodi</Link>
          <span>/</span>
          <Link href={`/proizvodi/${kategorija}`} className="hover:text-zinc-950 transition-colors duration-150">{category.label}</Link>
          <span>/</span>
          <span className="text-zinc-950 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main product layout */}
        <div className="grid grid-cols-12 gap-12">

          {/* Gallery — left */}
          <div className="col-span-7">
            <ProductGallery images={gallery} productName={product.name} />
          </div>

          {/* Info — right */}
          <div className="col-span-5 flex flex-col gap-6 pt-2">
            {/* Category + name */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                {category.label}
              </p>
              <h1 className="text-3xl font-bold text-zinc-950 leading-tight">
                {product.name}
              </h1>
              {product.description && (
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-950">{product.price}</span>
              <span className="text-sm text-zinc-400">sa PDV-om</span>
            </div>

            {/* Divider */}
            <hr className="border-zinc-100" />

            {/* Specs */}
            <div className="flex flex-col divide-y divide-zinc-100">
              <div className="flex justify-between items-center py-3.5">
                <span className="text-sm text-zinc-400">Šifra artikla</span>
                <span className="text-sm font-semibold text-zinc-950">NK-{String(product.id).padStart(5, "0")}</span>
              </div>
              <div className="flex justify-between items-center py-3.5">
                <span className="text-sm text-zinc-400">Dostupnost</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Na stanju
                </span>
              </div>
              <div className="flex justify-between items-center py-3.5">
                <span className="text-sm text-zinc-400">Kategorija</span>
                <Link href={`/proizvodi/${kategorija}`} className="text-sm font-semibold text-zinc-950 hover:underline">
                  {category.label}
                </Link>
              </div>
              <div className="flex justify-between items-center py-3.5">
                <span className="text-sm text-zinc-400">Isporuka</span>
                <span className="text-sm font-semibold text-zinc-950">2 — 5 radnih dana</span>
              </div>
            </div>

            {/* CTA buttons */}
            <QuantitySelector />

            {/* Trust badges */}
            <div className="flex flex-col gap-3 pt-1">
              {[
                { icon: <Truck size={16} strokeWidth={1.8} />, text: "Besplatna dostava za narudžbine iznad 6.000 RSD" },
                { icon: <RefreshCw size={16} strokeWidth={1.8} />, text: "Povrat u roku od 14 dana" },
                { icon: <ShieldCheck size={16} strokeWidth={1.8} />, text: "Sigurna online kupovina" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-zinc-500">
                  <span style={{ color: "#e11d1b" }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Tehničke karakteristike — moved to tabs below */}
          </div>
        </div>

        {/* Tabs: Opis + Tehničke karakteristike */}
        <ProductTabs
          description={product.description ?? ""}
          productName={product.name}
          categoryLabel={category.label}
          specs={[
            ["Materijal", "Nerđajući čelik / keramika"],
            ["Završna obrada", "Mat / Sjajni hrom"],
            ["Garancija", "2 godine"],
            ["Zemlja porekla", "EU"],
            ["Težina", "Na upit"],
            ["Dimenzije", "Na upit"],
          ]}
        />

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">
                  {category.label}
                </p>
                <h2 className="text-2xl font-bold text-zinc-950">Slični proizvodi</h2>
              </div>
              <Link
                href={`/proizvodi/${kategorija}`}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950"
              >
                Svi iz kategorije
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  href={`/proizvodi/${p.categorySlug}/${p.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
