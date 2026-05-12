import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/layout/Wrapper";
import { categories, products } from "@/lib/products";

export const metadata = {
  title: "Svi proizvodi — Nesa Komerc Keramika",
  description: "Pregledajte kompletan asortiman kupatilske opreme i keramike.",
};

export default function ProizvodiPage() {
  return (
    <div className="pt-24 pb-24 min-h-screen">
      <Wrapper>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <Link href="/" className="hover:text-zinc-950 transition-colors duration-150">Početna</Link>
          <span>/</span>
          <span className="text-zinc-950">Svi proizvodi</span>
        </div>

        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-56 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">
              Kategorije
            </p>
            <nav className="flex flex-col">
              <Link
                href="/proizvodi"
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100"
              >
                Svi proizvodi
                <span className="text-xs font-normal text-zinc-400">{products.length}</span>
              </Link>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/proizvodi/${cat.slug}`}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-all duration-150"
                  >
                    {cat.label}
                    <span className="text-xs text-zinc-300">{count}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Heading */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-zinc-950">Svi proizvodi</h1>
                <p className="text-sm text-zinc-400 mt-1">{products.length} proizvoda</p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-5">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/proizvodi/${product.categorySlug}/${product.id}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full h-52 bg-zinc-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-950 leading-snug group-hover:text-zinc-600 transition-colors duration-150">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-950 mt-1">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
