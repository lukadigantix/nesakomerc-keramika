"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Tag, Truck, User, Phone } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const perks = [
  { icon: Truck, text: "Praćenje narudžbina u realnom vremenu" },
  { icon: Tag, text: "Ekskluzivne ponude za članove" },
  { icon: ShieldCheck, text: "Sigurna kupovina i plaćanje" },
];

export default function RegistracijaPage() {
  const { register, user } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace("/nalog/dashboard");
  }, [user, router]);

  if (user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Lozinke se ne poklapaju"); return; }
    setError("");
    setSubmitting(true);
    try {
      await register({ firstName: ime, lastName: prezime, email, phone, password, confirmPassword: confirm, termsAccepted: true });
      router.push("/nalog/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri registraciji");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#fafafa" }}>

      {/* Full-bleed red background — left half */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-1/2 xl:w-[55%]"
        style={{ backgroundColor: "#e11d1b" }}
      />
      <div
        className="hidden lg:block absolute -top-32 right-1/2 xl:right-[45%] translate-x-32 w-120 h-120 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      />
      <div
        className="hidden lg:block absolute bottom-0 left-0 w-90 h-90 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
      />

      {/* Content — constrained inside Wrapper, same as Navbar */}
      <Wrapper className="relative flex min-h-screen">

        {/* ── Left col — branding ── */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between py-14 pr-16 mt-20">

          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Nesa Komerc"
                width={60}
                height={48}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <div
              className="flex items-center gap-2 text-xs mt-6"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
              <span>/</span>
              <Link href="/nalog" className="hover:text-white transition-colors duration-150">Nalog</Link>
              <span>/</span>
              <span className="text-white">Registracija</span>
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Kreirajte<br />nalog
            </h1>
            <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
              Registrujte se i uživajte u svim pogodnostima<br />Neša Komerc Keramika naloga.
            </p>
            <div className="flex flex-col gap-4">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <Icon size={16} strokeWidth={1.8} className="text-white" />
                  </div>
                  <span className="text-sm text-white/80">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Neša Komerc Keramika
          </p>
        </div>

        {/* ── Right col — form ── */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 sm:py-20 lg:py-0 lg:pl-20">

          {/* Mobile logo + breadcrumbs */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/">
              <Image src="/logo.png" alt="Nesa Komerc" width={120} height={40} className="object-contain mx-auto" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs mt-3 text-zinc-400">
              <Link href="/" className="hover:text-zinc-700 transition-colors duration-150">Početna</Link>
              <span>/</span>
              <Link href="/nalog" className="hover:text-zinc-700 transition-colors duration-150">Nalog</Link>
              <span>/</span>
              <span className="text-zinc-700 font-medium">Registracija</span>
            </div>
          </div>

          <div className="w-full max-w-105">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-1">Kreirajte nalog</h2>
              <p className="text-sm text-zinc-400">Popunite podatke za kreiranje novog naloga</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Ime + Prezime */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ime" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Ime
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <User size={15} strokeWidth={1.8} className="text-zinc-400" />
                    </div>
                    <input
                      id="ime"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={ime}
                      onChange={(e) => setIme(e.target.value)}
                      placeholder="Marko"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prezime" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Prezime
                  </label>
                  <div className="relative">
                    <input
                      id="prezime"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={prezime}
                      onChange={(e) => setPrezime(e.target.value)}
                      placeholder="Petrović"
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Email adresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail size={15} strokeWidth={1.8} className="text-zinc-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@email.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Telefon
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Phone size={15} strokeWidth={1.8} className="text-zinc-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+381 60 123 4567"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              {/* Lozinka */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Lozinka
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock size={15} strokeWidth={1.8} className="text-zinc-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-zinc-400 hover:text-zinc-600 transition-colors duration-150"
                    aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                  >
                    {showPassword ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>

              {/* Potvrda lozinke */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Potvrdite lozinku
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock size={15} strokeWidth={1.8} className="text-zinc-400" />
                  </div>
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-zinc-400 hover:text-zinc-600 transition-colors duration-150"
                    aria-label={showConfirm ? "Sakrij lozinku" : "Prikaži lozinku"}
                  >
                    {showConfirm ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full h-12 rounded-xl text-sm font-semibold text-white cursor-pointer transition-opacity duration-150 hover:opacity-90 active:opacity-80 disabled:opacity-60"
                style={{ backgroundColor: "#e11d1b" }}
              >
                {submitting ? "Kreiranje naloga..." : "Kreirajte nalog"}
              </button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Već imate nalog?{" "}
                <Link
                  href="/nalog"
                  className="font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-70"
                  style={{ color: "#e11d1b" }}
                >
                  Prijavite se
                </Link>
              </p>
            </div>
          </div>
        </div>

      </Wrapper>
    </div>
  );
}
