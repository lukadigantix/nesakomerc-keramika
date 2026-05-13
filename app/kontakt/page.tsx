import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Kontakt — Nesa Komerc Keramika",
  description: "Kontaktirajte Nesa Komerc Keramika — posete salona, telefon, email i radno vreme.",
};

const info = [
  {
    icon: MapPin,
    naziv: "Adresa",
    vrednosti: ["Vojvode Putnika 22", "35210 Svilajnac, Srbija"],
  },
  {
    icon: Phone,
    naziv: "Telefon",
    vrednosti: ["+381 18 123 456", "+381 64 123 4567"],
  },
  {
    icon: Mail,
    naziv: "Email",
    vrednosti: ["info@nesakomerc.rs"],
  },
  {
    icon: Clock,
    naziv: "Radno vreme",
    vrednosti: ["Pon – Pet: 08:00 – 17:00", "Sub: 08:00 – 14:00", "Ned: zatvoreno"],
  },
];

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

      {/* Info + Form */}
      <div className="py-16 bg-white border-b border-zinc-100">
        <Wrapper>
          <div className="grid grid-cols-12 gap-10 items-start">
            {/* Left — contact info */}
            <div className="col-span-4 flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-4">
                  Informacije
                </p>
                <h2 className="text-2xl font-bold text-zinc-950 leading-tight">
                  Pronađite nas ili <br />
                  <span className="text-zinc-400 font-light">pošaljite upit</span>
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {info.map(({ icon: Icon, naziv, vrednosti }) => (
                  <div key={naziv} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-50 text-zinc-400 shrink-0">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{naziv}</p>
                      {vrednosti.map((v) => (
                        <p key={v} className="text-sm text-zinc-700">{v}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="col-span-7 col-start-6">
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Ime i prezime
                    </label>
                    <input
                      type="text"
                      placeholder="Marko Marković"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-950 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors duration-150"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="+381 6x xxx xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-950 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors duration-150"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="vas@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-950 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors duration-150"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Poruka
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Opišite vaš upit..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-950 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 transition-colors duration-150 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start px-6 py-3 bg-[#e11d1b] text-white text-sm font-semibold rounded-xl hover:bg-[#c9230f] transition-colors duration-150"
                >
                  Pošaljite upit
                </button>
              </form>
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Map */}
      <div className="h-[500px] w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11620.123!2d21.1837!3d44.2351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757a7e7d2f3b3c7%3A0x1a2b3c4d5e6f7a8b!2sSvilajnac!5e0!3m2!1ssr!2srs!4v1715600000000!5m2!1ssr!2srs"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokacija salona — Svilajnac"
        />
      </div>
    </div>
  );
}
