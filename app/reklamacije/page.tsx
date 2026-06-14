import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { AlertCircle, Clock, CheckCircle2, RefreshCw, Phone, Mail } from "lucide-react";
import ReklamacijaForm from "@/components/ui/ReklamacijaForm";

export const metadata = {
  title: "Reklamacije — Nesa Komerc Keramika",
  description: "Podnošenje reklamacije za kupljene proizvode — Nesa Komerc Keramika.",
};

export default function ReklamacijePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Reklamacije</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Reklamacije</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Vaše pravo na reklamaciju garantovano je zakonom.</p>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left — info */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Prava potrošača */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-8">
                <h2 className="text-base font-bold text-zinc-950 mb-5">Vaša prava</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" strokeWidth={1.8} />
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">Zakonska garancija — 2 godine</p>
                      <p className="text-xs text-zinc-500 mt-0.5">U skladu sa Zakonom o zaštiti potrošača, imate pravo na reklamaciju u roku od 2 godine od datuma kupovine.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw size={18} className="text-blue-500 mt-0.5 shrink-0" strokeWidth={1.8} />
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">Odustajanje od ugovora — 14 dana</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Za kupovinu na daljinu možete odustati u roku od 14 dana od prijema robe bez navođenja razloga.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-amber-500 mt-0.5 shrink-0" strokeWidth={1.8} />
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">Rok odgovora — 8 dana</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Na vašu reklamaciju odgovaramo u roku od 8 dana od prijema. Rešenje reklamacije u roku od 15 dana.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-zinc-400 mt-0.5 shrink-0" strokeWidth={1.8} />
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">Šta nije predmet reklamacije</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Oštećenja nastala nepravilnom upotrebom, mehaničkim udarcima ili nestručnom montažom.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Procedura */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-8">
                <h2 className="text-base font-bold text-zinc-950 mb-5">Procedura reklamacije</h2>
                <ol className="flex flex-col gap-4">
                  {[
                    { br: "01", title: "Podnošenje", text: "Popunite formular desno ili nas kontaktirajte telefonom/e-mailom. Priložite račun i fotografije oštećenja." },
                    { br: "02", title: "Pregled", text: "Naš tim pregleda reklamaciju i obaveštava vas o ishodu u roku od 8 dana." },
                    { br: "03", title: "Rešavanje", text: "Zavisno od slučaja: popravka, zamena, umanjenje cene ili povraćaj novca." },
                    { br: "04", title: "Preuzimanje", text: "Dogovaramo preuzimanje neispravne robe i dostavu zamenske/popravljene." },
                  ].map((s) => (
                    <li key={s.br} className="flex items-start gap-4">
                      <span className="text-xs font-bold text-white w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#e11d1b" }}>{s.br}</span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-800">{s.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Kontakt */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-8">
                <h2 className="text-base font-bold text-zinc-950 mb-5">Direktan kontakt</h2>
                <div className="flex flex-col gap-3">
                  <a href="tel:+381638815111" className="flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-950 transition-colors duration-150">
                    <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                      <Phone size={14} strokeWidth={1.8} />
                    </span>
                    +381 63 881 51 11
                  </a>
                  <a href="mailto:office@nesakomerckeramika.rs" className="flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-950 transition-colors duration-150">
                    <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                      <Mail size={14} strokeWidth={1.8} />
                    </span>
                    office@nesakomerckeramika.rs
                  </a>
                </div>
                <p className="text-xs text-zinc-400 mt-4">Radno vreme: pon–pet 08:00–17:00, sub 08:00–14:00</p>
              </div>

            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-zinc-100 p-8 lg:p-10">
                <h2 className="text-base font-bold text-zinc-950 mb-6">Podnesi reklamaciju</h2>
                <ReklamacijaForm />
              </div>
            </div>

          </div>
        </div>
      </Wrapper>
    </div>
  );
}
