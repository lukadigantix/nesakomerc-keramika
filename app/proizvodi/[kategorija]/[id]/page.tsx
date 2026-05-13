import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Wrapper from "@/components/layout/Wrapper";
import ProductGallery from "@/components/ui/ProductGallery";
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
    .slice(0, 4);

  // Gallery — same image repeated for placeholder
  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <div className="pt-14 pb-24 min-h-screen">
      <Wrapper>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-10">
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
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-950">{product.price}</span>
              <span className="text-sm text-zinc-400">sa PDV-om</span>
            </div>

            {/* Divider */}
            <hr className="border-zinc-100" />

            {/* Specs placeholder */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-400">Šifra artikla</span>
                <span className="text-zinc-950 font-medium">NK-{String(product.id).padStart(5, "0")}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-400">Dostupnost</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  Na stanju
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-400">Kategorija</span>
                <Link href={`/proizvodi/${kategorija}`} className="text-zinc-950 font-medium hover:underline">
                  {category.label}
                </Link>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-zinc-50">
                <span className="text-zinc-400">Isporuka</span>
                <span className="text-zinc-950 font-medium">2 — 5 radnih dana</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button className="h-13 rounded-full bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors duration-150">
                Dodaj u korpu
              </button>
              <button className="h-13 rounded-full border border-zinc-200 text-zinc-700 text-sm font-medium hover:border-zinc-950 hover:text-zinc-950 transition-all duration-150">
                Upit za cenu
              </button>
            </div>

            {/* Delivery note */}
            <p className="text-xs text-zinc-400 text-center">
              Besplatna isporuka za porudžbine iznad 10.000 RSD
            </p>

            {/* Tehničke karakteristike */}
            <div className="border-t border-zinc-100 pt-6">
              <h2 className="text-sm font-semibold text-zinc-950 mb-4">Tehničke karakteristike</h2>
              <div className="flex flex-col">
                {[
                  ["Materijal", "Nerđajući čelik / keramika"],
                  ["Završna obrada", "Mat / Sjajni hrom"],
                  ["Garancija", "2 godine"],
                  ["Zemlja porekla", "EU"],
                  ["Težina", "Na upit"],
                  ["Dimenzije", "Na upit"],
                ].map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-2.5 border-b border-zinc-100">
                    <span className="text-zinc-400">{key}</span>
                    <span className="text-zinc-950 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-20">
          <h2 className="text-xl font-bold text-zinc-950 mb-5">Opis proizvoda</h2>
          <div className="max-w-2xl flex flex-col gap-4 text-sm text-zinc-500 leading-relaxed">
            <p>
              {product.name} je premium proizvod iz kategorije {category.label.toLowerCase()}, dizajniran
              za modernu kupatilsku estetiku i dugotrajnu upotrebu. Izrađen od visokokvalitetnih
              materijala koji garantuju otpornost na vlagu, koroziju i svakodnevno habanje.
            </p>
            <p>
              Zahvaljujući pažljivo isplaniranim dimenzijama i intuitivnoj ugradnji, ovaj proizvod
              se lako integriše u svaki kupatilski prostor — bez obzira na stil i veličinu.
            </p>
            <p>
              Svaki komad prolazi kroz rigoroznu kontrolu kvaliteta pre isporuke, uz garanciju
              proizvođača i punu tehničku podršku tima Nesa Komerc Keramika.
            </p>
          </div>
        </div>

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
            <div className="grid grid-cols-4 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/proizvodi/${p.categorySlug}/${p.id}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full h-52 bg-zinc-50 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4">
                    <h3 className="text-sm font-semibold text-zinc-950 leading-snug group-hover:text-zinc-600 transition-colors duration-150">
                      {p.name}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-950">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
