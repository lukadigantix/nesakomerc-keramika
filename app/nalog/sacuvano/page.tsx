"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { getSavedProducts, removeFromWishlist, type SavedProduct } from "@/lib/wishlist";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import Wrapper from "@/components/layout/Wrapper";

export default function SacuvanoPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<SavedProduct[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/nalog");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    getSavedProducts(token).then((data) => {
      setItems(data);
      setFetching(false);
    });
  }, [token]);

  const handleRemove = async (productId: string) => {
    if (!token) return;
    await removeFromWishlist(productId, token);
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100">
        <Wrapper>
          <div className="py-10">
            <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
              <Link href="/" className="hover:text-zinc-700 transition-colors">Početna</Link>
              <span>/</span>
              <Link href="/nalog/dashboard" className="hover:text-zinc-700 transition-colors">Nalog</Link>
              <span>/</span>
              <span className="text-zinc-700">Sačuvani proizvodi</span>
            </nav>
            <div className="flex items-center gap-3">
              <Heart size={24} strokeWidth={1.5} className="text-zinc-950" />
              <h1 className="text-2xl font-bold text-zinc-950">Sačuvani proizvodi</h1>
            </div>
            {!fetching && (
              <p className="mt-1 text-sm text-zinc-400">{items.length} {items.length === 1 ? "proizvod" : "proizvoda"}</p>
            )}
          </div>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="py-10">
          {fetching ? (
            <div className="grid grid-cols-4 max-[1329px]:grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-zinc-100 animate-pulse h-80" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                <Heart size={28} className="text-zinc-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-zinc-950 mb-2">Nemate sačuvanih proizvoda</h2>
              <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                Kliknite na srce na bilo kom proizvodu da ga sačuvate ovde.
              </p>
              <Link
                href="/proizvodi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#e11d1b" }}
              >
                Pregledaj proizvode
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-4 max-[1329px]:grid-cols-3 max-[639px]:grid-cols-2 max-[479px]:grid-cols-1 gap-5">
              {items.map((item) => {
                const p = item.product;
                return (
                  <div key={item.id} className="relative group/wrap">
                    <ProductCard
                      product={{
                        id: p.id,
                        name: p.name,
                        category: p.category?.name ?? "",
                        price: formatPrice(p.salePrice && p.salePrice > 0 ? p.salePrice : p.price),
                        image: p.images[0] ?? "/images/img4.png",
                      }}
                      href={`/proizvodi/${p.category?.slug ?? ""}/${p.slug}`}
                      badge={p.discountPercent ? `−${p.discountPercent}%` : undefined}
                      stock={p.stock}
                      inStock={p.inStock}
                    />
                    <button
                      onClick={() => handleRemove(p.id)}
                      aria-label="Ukloni iz sačuvanih"
                      className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-zinc-400 hover:text-rose-500 hover:bg-white shadow-sm transition-all duration-200 opacity-0 group-hover/wrap:opacity-100"
                    >
                      <Trash2 size={14} strokeWidth={1.8} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
}
