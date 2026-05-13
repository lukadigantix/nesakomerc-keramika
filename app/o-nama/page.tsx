import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { Users, Award, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "O nama — Nesa Komerc Keramika",
  description: "Saznajte više o Nesa Komerc Keramika — porodičnoj firmi specijalizovanoj za uređenje kupatila.",
};

const stats = [
  { icon: Clock, vrednost: "15+", oznaka: "godina iskustva" },
  { icon: Users, vrednost: "3.000+", oznaka: "zadovoljnih kupaca" },
  { icon: Award, vrednost: "5.000+", oznaka: "proizvoda u salonu" },
  { icon: MapPin, vrednost: "1", oznaka: "salon u Nišu" },
];

export default function ONamaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-52 pb-10" style={{ backgroundColor: "#e11d1b" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">O nama</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">O nama</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Porodična firma sa tradicijom — vaš pouzdani partner za uređenje kupatila
          </p>
        </Wrapper>
      </div>

      {/* Intro */}
      <div className="py-16 bg-white border-b border-zinc-100">
        <Wrapper>
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-6">
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src="/images/img1.png"
                  alt="Nesa Komerc Keramika salon"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="col-span-5 col-start-8 flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Ko smo mi
              </p>
              <h2 className="text-3xl font-bold text-zinc-950 leading-tight">
                Nesa Komerc Keramika
                <br />
                <span className="text-zinc-400 font-light text-2xl">Vaš partner za uređenje kupatila</span>
              </h2>
              <p className="text-base text-zinc-500 leading-relaxed">
                Nesa Komerc Keramika je porodična firma specijalizovana za prodaju i distribuciju
                opreme za kupatilo — od keramičkih obloga do kompletnih instalacionih rešenja.
              </p>
              <p className="text-base text-zinc-500 leading-relaxed">
                U našem salonu pronaćićete pažljivo odabran asortiman od preko{" "}
                <span className="text-zinc-950 font-semibold">5.000 proizvoda</span> — baterije,
                tuš kabine i kade, sanitarije, keramiku, ogledala, vertikale za peškire, slivnike
                i kompletnu galanteriju vodećih svetskih brendova.
              </p>
              <p className="text-base text-zinc-500 leading-relaxed">
                Godinama izgrađujemo odnos poverenja sa kupcima koji se vraćaju — jer znamo da
                uređenje kupatila nije samo kupovina, već odluka u kojoj živite svaki dan.
              </p>
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Stats */}
      <div className="py-14 border-b border-zinc-100">
        <Wrapper>
          <div className="grid grid-cols-4 divide-x divide-zinc-100">
            {stats.map(({ icon: Icon, vrednost, oznaka }) => (
              <div key={oznaka} className="flex flex-col items-center gap-3 px-8 text-center group cursor-default">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-50 text-zinc-400 group-hover:bg-[#e11d1b] group-hover:text-white transition-colors duration-200">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-bold text-zinc-950">{vrednost}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{oznaka}</p>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>

      {/* Values */}
      <div className="py-16 bg-white border-b border-zinc-100">
        <Wrapper>
          <div className="grid grid-cols-12 gap-10 items-start">
            <div className="col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-4">
                Naše vrednosti
              </p>
              <h2 className="text-3xl font-bold text-zinc-950 leading-tight">
                Zašto kupci <br />
                <span className="text-zinc-400 font-light text-2xl">biraju nas</span>
              </h2>
            </div>
            <div className="col-span-7 col-start-6 grid grid-cols-2 gap-6">
              {[
                { naziv: "Kvalitet", opis: "Radimo isključivo sa proverenim brendovima koji stoje iza svojih proizvoda." },
                { naziv: "Stručnost", opis: "Naš tim dobro poznaje asortiman i pomaže vam da napravite pravi izbor." },
                { naziv: "Poverenje", opis: "Transparentne cene, jasni uslovi, bez skrivenih troškova." },
                { naziv: "Podrška", opis: "Tu smo i nakon kupovine — za pitanja, reklamacije ili savete." },
              ].map(({ naziv, opis }) => (
                <div key={naziv} className="flex flex-col gap-2 p-5 rounded-xl border border-zinc-100 bg-zinc-50">
                  <p className="text-sm font-semibold text-zinc-950">{naziv}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{opis}</p>
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>

      {/* CTA */}
      <div className="py-14 bg-white">
        <Wrapper>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-2">
                Posetite nas
              </p>
              <h3 className="text-2xl font-bold text-zinc-950">Dođite u salon</h3>
              <p className="text-sm text-zinc-400 mt-1">Ili nas kontaktirajte — odgovaramo brzo.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/kontakt"
                className="px-6 py-3 bg-[#e11d1b] text-white text-sm font-semibold rounded-xl hover:bg-[#c9230f] transition-colors duration-150"
              >
                Kontakt
              </Link>
              <Link
                href="/proizvodi"
                className="px-6 py-3 border border-zinc-200 text-zinc-950 text-sm font-semibold rounded-xl hover:border-zinc-400 transition-colors duration-150"
              >
                Pogledajte proizvode
              </Link>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
