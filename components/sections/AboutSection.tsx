import Wrapper from "@/components/layout/Wrapper";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-20 border-t border-zinc-100">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left — heading */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-4">
              O nama
            </p>
            <h2 className="text-3xl font-bold text-zinc-950 leading-tight">
              Neša Komerc Keramika
              <br />
              <span className="text-zinc-400 font-light text-2xl">Vaš partner za uređenje kupatila</span>
            </h2>
          </div>

          {/* Right — body */}
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-5">
            <p className="text-base text-justify text-zinc-500 leading-relaxed">
              Neša Komerc Keramika je porodična firma specijalizovana za prodaju i distribuciju
              opreme za kupatilo od keramičkih obloga do kompletnih instalacionih rešenja.
            </p>
            <p className="text-base text-justify text-zinc-500 leading-relaxed">
              U našem salonu pronaćićete pažljivo odabran asortiman od preko{" "}
              <span className="text-zinc-950 font-semibold">5.000 proizvoda</span> baterije i
              slavine, tuš kabine i kade, sanitarije, keramiku, ogledala i ormarićе, vertikale za
              peškire, slivnike i kompletnu galanteriju vodećih svetskih brendova.
            </p>
            <p className="text-base text-justify text-zinc-500 leading-relaxed">
              Godinama izgrađujemo odnos poverenja sa kupcima koji se vraćaju jer znamo da uređenje
              kupatila nije samo kupovina, već odluka u kojoj živite svaki dan.
            </p>

            <Link
              href="/o-nama"
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-zinc-950 pb-px border-b border-zinc-300 hover:border-zinc-950 transition-colors duration-150 w-fit"
            >
              Saznajte više
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
