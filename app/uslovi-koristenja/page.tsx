import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";

export const metadata = {
  title: "Uslovi korišćenja — Nesa Komerc Keramika",
  description: "Uslovi korišćenja veb stranice Nesa Komerc Keramika.",
};

export default function UsloviKoristenjaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Uslovi korišćenja</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Uslovi korišćenja</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Poslednja izmena: jun 2026.</p>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="py-12 lg:py-16">
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 lg:p-12 flex flex-col gap-10 text-sm text-zinc-600 leading-relaxed">

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">1. Opšte odredbe</h2>
              <p>Korišćenjem veb stranice <strong className="text-zinc-800">nesakomerckeramika.com</strong> prihvatate ove Uslove korišćenja u celosti. Ukoliko se ne slažete sa bilo kojim delom ovih uslova, molimo vas da prestanete sa korišćenjem stranice.</p>
              <p className="mt-2">Operator stranice je <strong className="text-zinc-800">Nesa Komerc Keramika d.o.o.</strong>, Miloše Savića BB, Svilajnac, Srbija.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">2. Korisnički nalog</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li>Registracija naloga dozvoljena je isključivo punoletnim licima (18+).</li>
                <li>Odgovorni ste za tačnost podataka koje unosite prilikom registracije.</li>
                <li>Dužni ste da čuvate poverljivost lozinke i sprečite neovlašćeni pristup vašem nalogu.</li>
                <li>U slučaju sumnje na neovlašćeni pristup, odmah nas obavestite na <a href="mailto:office@nesakomerckeramika.rs" className="text-zinc-950 underline">office@nesakomerckeramika.rs</a>.</li>
                <li>Zadržavamo pravo da deaktiviramo nalog koji krši ove uslove.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">3. Narudžbine i kupovina</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li>Sve cene su prikazane u dinarima (RSD) sa uračunatim PDV-om.</li>
                <li>Potvrdom narudžbine zaključujete kupoprodajni ugovor sa Nesa Komerc Keramika d.o.o.</li>
                <li>Zadržavamo pravo da odbijemo ili otkažemo narudžbinu u slučaju greške u ceni, nedostupnosti proizvoda ili sumnje na prevaru.</li>
                <li>Ukoliko se narudžbina otkaže, sve uplaćene iznose vraćamo u roku od 7 radnih dana.</li>
                <li>Slike proizvoda su ilustrativnog karaktera — boje i dimenzije mogu blago da variraju zavisno od monitora.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">4. Dostava</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li>Isporuka se vrši na teritoriji Republike Srbije.</li>
                <li>Rok isporuke iznosi 2–5 radnih dana od potvrde narudžbine, ukoliko je roba na stanju.</li>
                <li>Za narudžbine po porudžbini (nije na lageru), rok isporuke se dogovara posebno.</li>
                <li>Troškovi dostave prikazani su tokom procesa naručivanja pre finalizacije narudžbine.</li>
                <li>Rizik oštećenja prelazi na kupca u trenutku preuzimanja pošiljke. Proverite robu pri preuzimanju.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">5. Reklamacije i povraćaj</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li>Imate pravo na reklamaciju u roku od <strong className="text-zinc-800">2 godine</strong> od datuma kupovine u skladu sa Zakonom o zaštiti potrošača.</li>
                <li>Reklamaciju možete podneti lično u salonu, e-mailom ili putem korisničkog naloga.</li>
                <li>Odustajanje od ugovora (za kupovinu na daljinu) moguće je u roku od <strong className="text-zinc-800">14 dana</strong> od prijema robe bez navođenja razloga.</li>
                <li>Roba koja se vraća mora biti neupotrebljena, u originalnoj ambalaži i bez vidljivih oštećenja.</li>
                <li>Troškove povraćaja robe snosi kupac, osim u slučaju isporuke pogrešnog ili neispravnog proizvoda.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">6. Plaćanje</h2>
              <ul className="flex flex-col gap-2 list-none">
                <li>Prihvatamo plaćanje pouzećem, platnom karticom i uplatom na račun.</li>
                <li>Sve online transakcije zaštićene su SSL enkripcijom.</li>
                <li>Podaci platnih kartica ne čuvaju se na našim serverima — obrađuje ih akreditovani provajder plaćanja.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">7. Intelektualna svojina</h2>
              <p>Sav sadržaj na ovoj stranici — tekstovi, fotografije, logotipi, grafike i dizajn — vlasništvo su Nesa Komerc Keramika d.o.o. ili su korišćeni uz dozvolu. Zabranjeno je kopiranje, distribucija ili korišćenje bez pisane saglasnosti.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">8. Ograničenje odgovornosti</h2>
              <p>Nesa Komerc Keramika d.o.o. ne odgovara za:</p>
              <ul className="flex flex-col gap-2 list-none mt-2">
                <li>Privremenu nedostupnost stranice usled tehničkih problema ili održavanja.</li>
                <li>Štetu nastalu korišćenjem ili nemogućnošću korišćenja sadržaja stranice.</li>
                <li>Sadržaj eksternih veb stranica na koje naša stranica eventualno upućuje.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">9. Merodavno pravo</h2>
              <p>Na ove Uslove korišćenja primenjuje se pravo Republike Srbije. Za sve sporeve nadležan je sud u Jagodini, uz prethodnu obaveznu pokušaj mirnog rešavanja spora.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">10. Izmene uslova</h2>
              <p>Zadržavamo pravo izmene ovih Uslova korišćenja u bilo kom trenutku. Izmene stupaju na snagu objavom na stranici. Nastavak korišćenja stranice nakon objave izmena smatra se prihvatanjem novih uslova.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-950 mb-3">11. Kontakt</h2>
              <p className="mb-1"><strong className="text-zinc-800">Nesa Komerc Keramika d.o.o.</strong></p>
              <p>Miloše Savića BB, Svilajnac, Srbija</p>
              <p>E-mail: <a href="mailto:office@nesakomerckeramika.rs" className="text-zinc-950 underline">office@nesakomerckeramika.rs</a></p>
              <p>Telefon: <a href="tel:+381638815111" className="text-zinc-950 underline">+381 63 881 51 11</a></p>
            </section>

            <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-6">
              Ovi uslovi su u skladu sa Zakonom o zaštiti potrošača (Sl. glasnik RS, br. 88/2021) i Zakonom o elektronskoj trgovini Republike Srbije.
            </p>

          </div>
        </div>
      </Wrapper>
    </div>
  );
}
