import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

export const metadata = {
  title: "Stranica nije pronađena — Neša Komerc Keramika",
};

const links = [
  { label: "Svi proizvodi", href: "/proizvodi" },
  { label: "Mesečna akcija", href: "/akcija" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col bg-zinc-950">

      {/* Big background 404 */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[38vw] font-black leading-none tracking-tighter"
        style={{ color: "rgba(255,255,255,0.03)" }}
      >
        404
      </span>

      {/* Red diagonal accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-130 h-130 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #e11d1b 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 w-100 h-100 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
      />

      <div className="relative flex-1 flex items-center py-32">
        <Wrapper>
          <div className="max-w-2xl">

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6">
              Izgubili<br />
              <span style={{ color: "#e11d1b" }}>ste se.</span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-md">
              Stranica koju tražite ne postoji ili je premeštena.
              Krenite od početka — ima dosta toga za pogledati.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 h-13 px-8 rounded-full text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                style={{ background: "linear-gradient(135deg, #e11d1b, #f97316)", height: "3.25rem" }}
              >
                <Home size={16} strokeWidth={2.2} />
                Početna strana
              </Link>
              <Link
                href="/proizvodi"
                className="inline-flex items-center gap-2.5 h-13 px-8 rounded-full text-sm font-bold border transition-all duration-200 hover:border-white/40 hover:text-white active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", height: "3.25rem" }}
              >
                Svi proizvodi
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
            </div>

            {/* Quick links */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-600 mr-1">Ili idi na:</span>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-zinc-500 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400 transition-colors duration-150"
                >
                  {l.label}
                </Link>
              ))}
            </div>

          </div>
        </Wrapper>
      </div>
    </div>
  );
}
