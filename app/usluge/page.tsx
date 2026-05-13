import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { Wrench, Truck, Ruler, Phone } from "lucide-react";

export const metadata = {
  title: "Usluge — Nesa Komerc Keramika",
  description: "Profesionalna montaža, dostava i savetovanje za uređenje kupatila.",
};

const usluge = [
  {
    icon: Wrench,
    naziv: "Montaža i ugradnja",
    opis: "Naš tim majstora obavlja kompletnu ugradnju kupatilske opreme — od baterija i sanitarija do tuš kabina i kada.",
  },
  {
    icon: Truck,
    naziv: "Dostava na adresu",
    opis: "Brza i sigurna isporuka po celoj Srbiji. Robu pakujemo pažljivo da stigne neoštećena.",
  },
  {
    icon: Ruler,
    naziv: "Savetovanje i dizajn",
    opis: "Pomažemo vam da odaberete pravo rešenje za vaš prostor — od mere do stila i budžeta.",
  },
  {
    icon: Phone,
    naziv: "Tehnička podrška",
    opis: "Dostupni smo za sva pitanja pre i posle kupovine. Javljamo se brzo i dajemo konkretne odgovore.",
  },
];

export default function UslugePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-52 pb-10" style={{ backgroundColor: "#ed2c18" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Usluge</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Usluge</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Sve što vam treba na jednom mestu — od izbora do ugradnje
          </p>
        </Wrapper>
      </div>

      {/* Image + intro */}
      <div className="py-16 border-b border-zinc-100 bg-white">
        <Wrapper>
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-6">
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src="/images/usluge.png"
                  alt="Montaža kupatila"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="col-span-5 col-start-8 flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                Zašto mi?
              </p>
              <h2 className="text-3xl font-bold text-zinc-950 leading-tight">
                Profesionalna usluga <br />
                <span className="text-zinc-400 font-light text-2xl">od A do Ž</span>
              </h2>
              <p className="text-base text-zinc-500 leading-relaxed">
                Nesa Komerc Keramika nije samo prodavnica — nudimo kompletnu uslugu uređenja kupatila.
                Naš tim je uvek spreman da vam pomogne, bilo da tek planirate renovaciju ili imate
                konkretan problem.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950 pb-px border-b border-zinc-300 hover:border-zinc-950 transition-colors duration-150 w-fit"
              >
                Kontaktirajte nas
              </Link>
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Services grid */}
      <div className="py-16">
        <Wrapper>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-10 text-center">
            Šta nudimo
          </p>
          <div className="grid grid-cols-4 gap-6">
            {usluge.map(({ icon: Icon, naziv, opis }) => (
              <div
                key={naziv}
                className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-zinc-100 group hover:border-zinc-200 transition-colors duration-150"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-50 text-zinc-400 group-hover:bg-[#ed2c18] group-hover:text-white transition-colors duration-200">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-zinc-950">{naziv}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{opis}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>

      {/* CTA */}
      <div className="py-14 border-t border-zinc-100 bg-white">
        <Wrapper>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-2">
                Trebate pomoć?
              </p>
              <h3 className="text-2xl font-bold text-zinc-950">Zakažite konsultaciju</h3>
              <p className="text-sm text-zinc-400 mt-1">Pozovite nas ili pošaljite upit — odgovaramo brzo.</p>
            </div>
            <Link
              href="/kontakt"
              className="px-6 py-3 bg-[#ed2c18] text-white text-sm font-semibold rounded-xl hover:bg-[#c9230f] transition-colors duration-150"
            >
              Kontakt
            </Link>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
