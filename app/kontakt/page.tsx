import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { MapPin, Phone, Mail } from "lucide-react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";
import ContactForm from "@/components/ui/ContactForm";

export const metadata = {
  title: "Kontakt — Neša Komerc Keramika",
  description: "Kontaktirajte Neša Komerc Keramika — posete salona, telefon, email i radno vreme.",
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Kontakt</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Kontakt</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Tu smo za vas javite nam se na bilo koji način
          </p>
        </Wrapper>
      </div>

      {/* Two boxes */}
      <div className="pt-12 lg:pt-16">
        <Wrapper>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

            {/* Left box — info + map */}
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 bg-white lg:flex lg:flex-col">

              {/* Mobile: horizontal list */}
              <div className="divide-y divide-zinc-100 lg:hidden">
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <Phone size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-0.5">Telefon</p>
                    <p className="text-sm font-medium text-zinc-800">+381 35 8814 077</p>
                    <p className="text-xs text-zinc-400">+381 35 8814 099</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <Mail size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-zinc-800">office@nesa-komerc.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                    <MapPin size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-0.5">Adresa</p>
                    <p className="text-sm font-medium text-zinc-800">Stevana Sinđelića 309</p>
                    <p className="text-xs text-zinc-400">Svilajnac, Srbija</p>
                  </div>
                </div>
              </div>

              {/* Desktop: 3-column grid */}
              <div className="hidden lg:block px-6 py-6 border-b border-zinc-100">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                      <Phone size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Telefon</p>
                      <p className="text-sm font-medium text-zinc-800">+381 35 8814 077</p>
                      <p className="text-xs text-zinc-400">+381 35 8814 099</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 border-x border-zinc-100 px-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                      <Mail size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Email</p>
                      <p className="text-sm font-medium text-zinc-800 break-all">office@nesa-komerc.com</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} strokeWidth={1.8} style={{ color: "#e11d1b" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">Adresa</p>
                      <p className="text-sm font-medium text-zinc-800">Stevana Sinđelića 309</p>
                      <p className="text-xs text-zinc-400">Svilajnac, Srbija</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: map */}
              <div className="hidden lg:flex flex-1">
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
            <div className="w-full lg:w-1/2 rounded-2xl shadow-sm border border-zinc-100 p-6 sm:p-10 flex flex-col justify-center bg-white">
              <h2 className="text-xl font-bold text-zinc-950 mb-6">Pošaljite nam poruku</h2>
              <ContactForm />
            </div>

          </div>
        </Wrapper>
      </div>

      {/* 3 contact department cards */}
      <div className="pb-16 pt-10">
        <Wrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

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
                  href="mailto:office@nesa-komerc.com"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Mail size={14} strokeWidth={1.8} />
                  Email
                </a>
                <a
                  href="tel:+381358814077"
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
              <div className="mt-auto">
                <Link
                  href="/reklamacije"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Mail size={14} strokeWidth={1.8} />
                  Podnesi reklamaciju
                </Link>
              </div>
            </div>

            {/* Poseta salonu */}
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
              <div className="mt-auto">
                <a
                  href="https://maps.app.goo.gl/xdVjfMj4qEQSSJoL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors duration-150"
                >
                  <MapPin size={14} strokeWidth={1.8} />
                  Putanja do salona
                </a>
              </div>
            </div>

          </div>
        </Wrapper>
      </div>

      {/* Map — mobile only, full width */}
      <div className="h-80 lg:hidden">
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
  );
}
