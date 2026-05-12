import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";

const categories = [
  { label: "Baterije", href: "/proizvodi/baterije" },
  { label: "Ormarići sa umivaonikom", href: "/proizvodi/ormarici-sa-umivaonikom" },
  { label: "Ormarići za lavaboe", href: "/proizvodi/ormarici-za-lavaboe" },
  { label: "Ogledala sa ormarićem", href: "/proizvodi/ogledala-sa-ormaricem" },
  { label: "Klasična i LED Ogledala", href: "/proizvodi/klasicna-i-led-ogledala" },
  { label: "Vertikale", href: "/proizvodi/vertikale" },
  { label: "Tuš kabine i tuš kade", href: "/proizvodi/tus-kabine-i-tus-kade" },
  { label: "Samostojeće kade", href: "/proizvodi/samostojece-kade" },
  { label: "Sanitarije", href: "/proizvodi/sanitarije" },
  { label: "Keramika", href: "/proizvodi/keramika" },
  { label: "Slivnici", href: "/proizvodi/slivnici" },
  { label: "Galanterija", href: "/proizvodi/galanterija" },
];

const company = [
  { label: "O nama", href: "/o-nama" },
  { label: "Naši brendovi", href: "/brendovi" },
  { label: "Usluge", href: "/usluge" },
  { label: "Mesečna akcija", href: "/akcija" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

const legal = [
  { label: "Politika privatnosti", href: "/politika-privatnosti" },
  { label: "Uslovi korišćenja", href: "/uslovi-koristenja" },
  { label: "Reklamacije", href: "/reklamacije" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white mt-auto">
      {/* Top bar — newsletter */}
      <div className="border-b border-zinc-800">
        <Wrapper>
          <div className="flex items-center justify-between py-8 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-1">
                Newsletter
              </p>
              <p className="text-base font-medium text-white">
                Budite prvi koji saznaju za akcije i novitete
              </p>
            </div>
            <form className="flex items-center gap-3 shrink-0">
              <input
                type="email"
                placeholder="Vaša e-mail adresa"
                className="h-11 px-4 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 w-72 transition-colors duration-150"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors duration-150 shrink-0"
              >
                Prijavi se
              </button>
            </form>
          </div>
        </Wrapper>
      </div>

      {/* Main grid */}
      <Wrapper>
        <div className="grid grid-cols-12 gap-8 py-16">
          {/* Brand col */}
          <div className="col-span-3 flex flex-col gap-6">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Nesa Komerc Keramika"
                width={180}
                height={54}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Vaš specijalizovani salon za keramiku i opremu za kupatilo. Pronađite savršeno rešenje
              iz asortimana preko 5.000 proizvoda.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="tel:+381601234567"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors duration-150 shrink-0">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                  </svg>
                </span>
                +381 60 123 45 67
              </a>
              <a
                href="mailto:info@nesakomerc.rs"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors duration-150 shrink-0">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                info@nesakomerc.rs
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <span className="leading-relaxed">35210 Svilajnac, Srbija</span>
              </div>
            </div>

            {/* Working hours */}
            <div className="border-t border-zinc-800 pt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">
                Radno vreme
              </p>
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Pon — Pet</span>
                  <span className="text-white font-medium">08:00 — 17:00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Subota</span>
                  <span className="text-white font-medium">09:00 — 14:00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Nedelja</span>
                  <span className="text-zinc-600 font-medium">Zatvoreno</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories — 2 cols */}
          <div className="col-span-4 col-start-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600 mb-6">
              Kategorije
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 leading-snug"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company + Legal */}
          <div className="col-span-2 col-start-9">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600 mb-6">
              Kompanija
            </p>
            <div className="flex flex-col gap-3">
              {company.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="col-span-2 col-start-11">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600 mb-6">
              Pratite nas
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors duration-150 shrink-0">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
                  </svg>
                </span>
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors duration-150 shrink-0">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/>
                  </svg>
                </span>
                Facebook
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-150 group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors duration-150 shrink-0">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z"/>
                  </svg>
                </span>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <Wrapper>
          <div className="flex items-center justify-between py-6 gap-4">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Nesa Komerc Keramika. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-6">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
}
