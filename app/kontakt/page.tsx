import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { MapPin, Phone, Mail } from "lucide-react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export const metadata = {
  title: "Kontakt — Nesa Komerc Keramika",
  description: "Kontaktirajte Nesa Komerc Keramika — posete salona, telefon, email i radno vreme.",
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-52 pb-10" style={{ backgroundColor: "#e11d1b" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Kontakt</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Kontakt</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Tu smo za vas — javite nam se na bilo koji način
          </p>
        </Wrapper>
      </div>

      {/* Two boxes */}
      <div className="pt-16">
        <Wrapper>
          <div className="flex gap-8 items-stretch">

            {/* Left box — info + map */}
            <div className="w-1/2 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 flex flex-col bg-white">
              {/* Contact items — 3 columns inline */}
              <div className="px-8 py-8 grid grid-cols-3 gap-4 border-b border-zinc-100">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <Phone size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Telefon</p>
                    <p className="text-sm font-medium text-zinc-800">+381 18 123 456</p>
                    <p className="text-xs text-zinc-400">+381 64 123 4567</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center gap-3 border-x border-zinc-100 px-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <Mail size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Email</p>
                    <p className="text-sm font-medium text-zinc-800 break-all">info@nesakomerc.rs</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <MapPin size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Adresa</p>
                    <p className="text-sm font-medium text-zinc-800">Vojvode Putnika 22</p>
                    <p className="text-xs text-zinc-400">Svilajnac, Srbija</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="flex-1">
                <Map center={[21.20514591349281, 44.258725534849624]} zoom={11} theme="light">
                  <MapMarker longitude={21.20514591349281} latitude={44.258725534849624}>
                    <MarkerContent>
                      <div className="flex flex-col items-center">
                        <div className="bg-white rounded-xl shadow-lg p-1.5 border border-zinc-100">
                          <img src="/logo.png" alt="Nesa Komerc" className="h-8 w-auto" />
                        </div>
                      </div>
                    </MarkerContent>
                  </MapMarker>
                </Map>
              </div>
            </div>

            {/* Right box — form */}
            <div className="w-1/2 rounded-2xl shadow-sm border border-zinc-100 p-10 flex flex-col justify-center bg-white">
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">Ime</label>
                    <input
                      type="text"
                      placeholder="Marko Marković"
                      className="w-full px-4 py-3 rounded-xl border-0 bg-[#fafafa] text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-all duration-150 shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">Email</label>
                    <input
                      type="email"
                      placeholder="vas@email.com"
                      className="w-full px-4 py-3 rounded-xl border-0 bg-[#fafafa] text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-all duration-150 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-700">Kontakt Telefon</label>
                  <input
                    type="text"
                    placeholder="+381 6x xxx xxxx"
                    className="w-full px-4 py-3 rounded-xl border-0 bg-[#fafafa] text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-all duration-150 shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-700">Ostavite nam poruku</label>
                  <textarea
                    rows={5}
                    placeholder="Opišite vaš upit..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-[#fafafa] text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-all duration-150 resize-none shadow-sm"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-150 bg-[#e11d1b] hover:bg-[#bf1917]"
                  >
                    Pošaljite poruku
                  </button>
                </div>
              </form>
            </div>

          </div>
        </Wrapper>
      </div>

      {/* 3 contact department cards */}
      <div className="pb-16 pt-10">
        <Wrapper>
          <div className="grid grid-cols-3 gap-6">

            {/* Prodaja */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 flex flex-col gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-zinc-50 flex items-center justify-center">
                <Phone size={28} strokeWidth={1.6} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-1.5">Prodaja</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Naš tim je spreman da vam pomogne pri izboru proizvoda i ponudi best cenu.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href="mailto:prodaja@nesakomerc.rs"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Mail size={14} strokeWidth={1.8} />
                  Email
                </a>
                <a
                  href="tel:+381181234567"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Phone size={14} strokeWidth={1.8} />
                  Pozovite
                </a>
              </div>
            </div>

            {/* Reklamacije */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 flex flex-col gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-zinc-50 flex items-center justify-center">
                <Mail size={28} strokeWidth={1.6} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-1.5">Reklamacije</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Imate problem sa narudžbinom? Kontaktirajte nas i rešićemo ga u najkraćem roku.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href="mailto:reklamacije@nesakomerc.rs"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Mail size={14} strokeWidth={1.8} />
                  Email
                </a>
                <a
                  href="tel:+381181234567"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Phone size={14} strokeWidth={1.8} />
                  Pozovite
                </a>
              </div>
            </div>

            {/* Tehnicka podrska */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 flex flex-col gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-zinc-50 flex items-center justify-center">
                <MapPin size={28} strokeWidth={1.6} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950 mb-1.5">Poseta salonu</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Posetite nas u salonu i pogledajte kompletan izložbeni prostor uživo.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href="mailto:info@nesakomerc.rs"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Mail size={14} strokeWidth={1.8} />
                  Email
                </a>
                <a
                  href="tel:+381181234567"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Phone size={14} strokeWidth={1.8} />
                  Pozovite
                </a>
              </div>
            </div>

          </div>
        </Wrapper>
      </div>
    </div>
  );
}
