import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { getActiveBrands } from "@/lib/api";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Naši brendovi — Vodeći svetski proizvođači keramike",
  description:
    "Neša Komerc Keramika zastupa 30+ vodećih svetskih brendova kupatilske opreme i keramike. Upoznajte se sa proizvođačima čije proizvode prodajemo.",
  alternates: { canonical: "/nasi-brendovi" },
  openGraph: {
    type: "website",
    title: "Naši brendovi — 30+ vodećih brendova | Neša Komerc Keramika",
    description:
      "Zastupamo 30+ vodećih svetskih brendova kupatilske opreme i keramike. Kvalitet koji stoji iza svakog proizvoda.",
    url: "/nasi-brendovi",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Naši brendovi — Neša Komerc Keramika" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naši brendovi | Neša Komerc Keramika",
    description: "Zastupamo 30+ vodećih svetskih brendova kupatilske opreme i keramike.",
    images: ["/og-image.jpg"],
  },
};

export default async function NasiBrendoviPage() {
  const { data: brands } = await getActiveBrands();

  const withLogo = brands.filter((b) => b.logoUrl);
  const withoutLogo = brands.filter((b) => !b.logoUrl);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Naši brendovi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Naši brendovi</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Sarađujemo sa {brands.length}+ vrhunskih svetskih i domaćih proizvođača
          </p>
        </Wrapper>
      </div>

      <div className="py-14 lg:py-20">
        <Wrapper>

          {/* Intro */}
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Naši partneri</p>
            <h2 className="text-base sm:text-2xl font-bold text-zinc-950 mb-4 leading-tight">
              Kvalitet koji stoji iza svakog proizvoda
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
              U našem salonu zastupamo isključivo proverene brendove koji zadovoljavaju najviše standarde kvaliteta, dizajna i trajnosti. Svaki partner je pažljivo odabran kako bismo vam ponudili najbolje rešenje za uređenje vašeg kupatila.
            </p>
          </div>

          {/* Brand cards grid */}
          {withLogo.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {withLogo.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/proizvodi?brendovi=${brand.id}`}
                  className="group relative bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-zinc-200 hover:shadow-md transition-all duration-300"
                  style={{ minHeight: 160 }}
                >
                  <div className="relative w-full h-14 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-300">
                    <Image
                      src={brand.logoUrl!}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                    />
                  </div>
                  {brand.description && (
                    <p className="text-xs text-zinc-400 text-center leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {brand.description}
                    </p>
                  )}
                  {!brand.description && (
                    <p className="text-xs font-medium text-zinc-400 group-hover:text-zinc-700 transition-colors duration-300 text-center">
                      {brand.name}
                    </p>
                  )}
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-zinc-300 hover:text-zinc-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Brands without logo */}
          {withoutLogo.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {withoutLogo.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/proizvodi?brendovi=${brand.id}`}
                  className="group bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-zinc-200 hover:shadow-md transition-all duration-300"
                  style={{ minHeight: 120 }}
                >
                  <p className="text-sm font-semibold tracking-wide uppercase text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300 text-center">
                    {brand.name}
                  </p>
                  {brand.description && (
                    <p className="text-xs text-zinc-400 text-center leading-snug line-clamp-2">
                      {brand.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}

          {brands.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
              <p className="text-lg font-semibold text-zinc-700">Uskoro brendovi</p>
              <p className="text-sm text-zinc-400">Stranica je u pripremi.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">Pronađite savršen proizvod</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Pregledajte kompletan asortiman</h3>
            <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
              Svi brendovi dostupni u jednom mestu filtrirajte po kategoriji, ceni ili brendu.
            </p>
            <Link
              href="/proizvodi"
              className="inline-block px-8 py-3 rounded-full bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors duration-200"
            >
              Svi proizvodi
            </Link>
          </div>

        </Wrapper>
      </div>
    </div>
  );
}
