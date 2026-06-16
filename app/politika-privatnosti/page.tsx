import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";

export const metadata = {
  title: "Politika privatnosti — Neša Komerc Keramika",
  description: "Politika privatnosti Neša Komerc Keramika — kako prikupljamo, čuvamo i koristimo vaše lične podatke.",
};

export default function PolitikaPrivatnostiPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Politika privatnosti</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Politika privatnosti</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Poslednja izmena: jun 2026.</p>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="py-12 lg:py-16">
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 lg:p-12 flex flex-col gap-10 text-sm text-zinc-600 leading-relaxed">

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">1. Uvod</h2>
              <p>Neša Komerc Keramika d.o.o. posvećena je zaštiti vaše privatnosti. Ova Politika privatnosti objašnjava koje lične podatke prikupljamo, kako ih koristimo, s kime ih delimo i koja su vaša prava.</p>
              <p className="mt-2">Korišćenjem naše veb stranice i naručivanjem naših proizvoda, prihvatate uslove ove Politike privatnosti.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">2. Koje podatke prikupljamo</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li><strong className="text-zinc-800">Podaci naloga:</strong> Ime, prezime, e-mail adresa i lozinka (šifrovana) prilikom registracije.</li>
                <li><strong className="text-zinc-800">Podaci narudžbine:</strong> Adresa isporuke, broj telefona. Podaci platnih kartica se ne čuvaju kod nas.</li>
                <li><strong className="text-zinc-800">Komunikacija:</strong> Poruke koje nam šaljete putem kontakt forme ili e-mailom.</li>
                <li><strong className="text-zinc-800">Newsletter:</strong> E-mail adresa ukoliko ste se prijavili na naša obaveštenja.</li>
                <li><strong className="text-zinc-800">Tehnički podaci:</strong> IP adresa i tip pretraživača — prikupljaju se anonimno za analitičke svrhe.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">3. Svrha obrade podataka</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li><strong className="text-zinc-800">Izvršenje ugovora</strong> — obrada i isporuka narudžbine, komunikacija o statusu porudžbine.</li>
                <li><strong className="text-zinc-800">Korisnički nalog</strong> — upravljanje nalogom, istorija narudžbina, sačuvani proizvodi.</li>
                <li><strong className="text-zinc-800">Podrška korisnicima</strong> — odgovaranje na upite i reklamacije.</li>
                <li><strong className="text-zinc-800">Newsletter</strong> — slanje obaveštenja samo uz vašu izričitu saglasnost.</li>
                <li><strong className="text-zinc-800">Zakonske obaveze</strong> — čuvanje finansijske dokumentacije u skladu sa zakonom.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">4. Pravni osnov obrade</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li><strong className="text-zinc-800">Izvršenje ugovora</strong> — obrada neophodna za ispunjenje narudžbine.</li>
                <li><strong className="text-zinc-800">Zakonska obaveza</strong> — čuvanje računovodstvene dokumentacije.</li>
                <li><strong className="text-zinc-800">Legitimni interes</strong> — sprečavanje prevara i bezbednost sistema.</li>
                <li><strong className="text-zinc-800">Pristanak</strong> — za slanje marketinških poruka; možete ga povući u svakom trenutku.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">5. Sa kime delimo podatke</h2>
              <p className="mb-2">Ne prodajemo vaše lične podatke trećim licima. Podatke možemo podeliti isključivo sa:</p>
              <ul className="flex flex-col gap-2 list-none">
                <li><strong className="text-zinc-800">Kurirskim službama</strong> — ime, adresa i telefon isključivo radi isporuke.</li>
                <li><strong className="text-zinc-800">Provajderom plaćanja</strong> — samo radi obrade transakcije.</li>
                <li><strong className="text-zinc-800">IT servisima</strong> — hosting partneri obavezani ugovorom o poverljivosti.</li>
                <li><strong className="text-zinc-800">Nadležnim organima</strong> — isključivo na osnovu zakonskog zahteva.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">6. Rok čuvanja podataka</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li><strong className="text-zinc-800">Podaci narudžbine:</strong> 10 godina (računovodstvena obaveza).</li>
                <li><strong className="text-zinc-800">Korisnički nalog:</strong> dok ne zatražite brisanje.</li>
                <li><strong className="text-zinc-800">Newsletter:</strong> dok se ne odjavite.</li>
                <li><strong className="text-zinc-800">Kontakt poruke:</strong> 2 godine od poslednje komunikacije.</li>
                <li><strong className="text-zinc-800">Tehnički logovi:</strong> maksimalno 12 meseci.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">7. Vaša prava</h2>
              <p className="mb-2">U skladu sa Zakonom o zaštiti podataka o ličnosti (ZZPL), imate pravo da:</p>
              <ul className="flex flex-col gap-2 list-none">
                <li><strong className="text-zinc-800">Pristupite</strong> — zatražite kopiju podataka koje čuvamo o vama.</li>
                <li><strong className="text-zinc-800">Ispravite</strong> — ažurirate netačne ili nepotpune podatke.</li>
                <li><strong className="text-zinc-800">Izbrišete</strong> — zatražite brisanje podataka („pravo na zaborav").</li>
                <li><strong className="text-zinc-800">Ograničite obradu</strong> — privremeno obustavite obradu vaših podataka.</li>
                <li><strong className="text-zinc-800">Prenesete podatke</strong> — primite vaše podatke u čitljivom formatu.</li>
                <li><strong className="text-zinc-800">Prigovorite</strong> — usprotivite se obradi zasnovanoj na legitimnom interesu.</li>
                <li><strong className="text-zinc-800">Povučete pristanak</strong> — odjava od newslettera u svakom trenutku.</li>
              </ul>
              <p className="mt-3">Za ostvarivanje prava pišite nam na: <a href="mailto:office@nesakomerckeramika.rs" className="text-zinc-950 underline">office@nesakomerckeramika.rs</a></p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">8. Kolačići (Cookies)</h2>
              <p>Naš sajt koristi kolačiće kako bi osigurao pravilno funkcionisanje (sesija, korpa). Ne koristimo kolačiće za praćenje između sajtova niti remarketing bez vaše saglasnosti. Možete podesiti pretraživač da odbija kolačiće, mada neke funkcije sajta možda neće raditi ispravno.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">9. Bezbednost podataka</h2>
              <p>Primenjujemo tehničke i organizacione mere zaštite: HTTPS enkripcija, kontrola pristupa podacima, redovne sigurnosne provere. Lozinke se čuvaju u hashovanom obliku. Ukoliko dođe do povrede bezbednosti, obavestićemo vas i Povereniku u zakonskom roku.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">10. Izmene politike</h2>
              <p>Ova politika može biti ažurirana. O značajnim izmenama obavestićemo vas putem e-maila ili obaveštenja na sajtu.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">11. Kontakt</h2>
              <p className="mb-1"><strong className="text-zinc-800">Neša Komerc Keramika d.o.o.</strong></p>
              <p>Miloše Savića BB, Svilajnac, Srbija</p>
              <p>E-mail: <a href="mailto:office@nesakomerckeramika.rs" className="text-zinc-950 underline">office@nesakomerckeramika.rs</a></p>
              <p>Telefon: <a href="tel:+381638815111" className="text-zinc-950 underline">+381 63 881 51 11</a></p>
            </section>

            <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-6">
              Ova politika privatnosti je u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije (Sl. glasnik RS, br. 87/2018).
            </p>

          </div>
        </div>
      </Wrapper>
    </div>
  );
}
