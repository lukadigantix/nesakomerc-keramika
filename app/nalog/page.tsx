"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Tag, Truck } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

const perks = [
  { icon: Truck, text: "Praćenje narudžbina u realnom vremenu" },
  { icon: Tag, text: "Ekskluzivne ponude za članove" },
  { icon: ShieldCheck, text: "Sigurna kupovina i plaćanje" },
];

export default function NalogPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/nalog/dashboard");
  }, [loading, user, router]);

  if (loading || user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/nalog/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri prijavi");
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
      {/* Decorative circles inside red half */}
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

          {/* Logo + breadcrumb */}
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
              <span className="text-white">Nalog</span>
            </div>
          </div>

          {/* Main copy */}
          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Dobrodošli<br />nazad
            </h1>
            <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
              Prijavite se i pristupite svim pogodnostima<br />Neša Komerc Keramika naloga.
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
            © 2026 Neša Komerc Keramika
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
              <span className="text-zinc-700 font-medium">Nalog</span>
            </div>
          </div>

          <div className="w-full max-w-105">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-1">Prijavite se</h2>
              <p className="text-sm text-zinc-400">Unesite vaše podatke za pristup nalogu</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-widest text-zinc-400"
                >
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

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-widest text-zinc-400"
                  >
                    Lozinka
                  </label>
                  <Link
                    href="/nalog/zaboravljena-sifra"
                    className="text-xs font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-70"
                    style={{ color: "#e11d1b" }}
                  >
                    Zaboravili ste lozinku?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock size={15} strokeWidth={1.8} className="text-zinc-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors duration-150"
                    aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                  >
                    {showPassword ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
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
                className="mt-1 w-full h-12 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90 active:opacity-80 disabled:opacity-60"
                style={{ backgroundColor: "#e11d1b" }}
              >
                {submitting ? "Prijavljivanje..." : "Prijavite se"}
              </button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Nemate nalog?{" "}
                <Link
                  href="/nalog/registracija"
                  className="font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-70"
                  style={{ color: "#e11d1b" }}
                >
                  Registrujte se
                </Link>
              </p>
            </div>
          </div>
        </div>

      </Wrapper>
    </div>
  );
}
