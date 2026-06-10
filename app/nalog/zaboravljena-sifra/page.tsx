"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail, ShieldCheck, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Step = "email" | "otp" | "password" | "done";

export default function ZaboravljenaSifraPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const r = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (!r.ok || !data.success) throw new Error(data.message ?? "Greška");
      setStep("otp");
    } catch (err) { setError(err instanceof Error ? err.message : "Greška"); }
    finally { setSubmitting(false); }
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const r = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await r.json();
      if (!r.ok || !data.success) throw new Error(data.message ?? "Pogrešan ili istekao kod");
      setStep("password");
    } catch (err) { setError(err instanceof Error ? err.message : "Greška"); }
    finally { setSubmitting(false); }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError("Lozinke se ne poklapaju"); return; }
    setError(""); setSubmitting(true);
    try {
      const r = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
      });
      const data = await r.json();
      if (!r.ok || !data.success) throw new Error(data.message ?? "Greška");
      setStep("done");
    } catch (err) { setError(err instanceof Error ? err.message : "Greška"); }
    finally { setSubmitting(false); }
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
              <span className="text-white">Zaboravljena šifra</span>
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Resetujte<br />lozinku
            </h1>
            <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
              Unesite vašu email adresu i poslaćemo vam<br />link za resetovanje lozinke.
            </p>
            <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <ShieldCheck size={16} strokeWidth={1.8} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">Vaš nalog je siguran</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Link za resetovanje važi 30 minuta i može se koristiti samo jednom.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Nesa Komerc Keramika
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
              <span className="text-zinc-700 font-medium">Zaboravljena šifra</span>
            </div>
          </div>

          <div className="w-full max-w-105">

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">{error}</p>
            )}

            {step === "email" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-1">Zaboravili ste lozinku?</h2>
                  <p className="text-sm text-zinc-400">Unesite email i poslaćemo vam OTP kod</p>
                </div>
                <form onSubmit={handleEmail} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Email adresa</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Mail size={15} strokeWidth={1.8} className="text-zinc-400" />
                      </div>
                      <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="mt-1 w-full h-12 rounded-xl text-sm font-semibold text-white cursor-pointer transition-opacity duration-150 hover:opacity-90 active:opacity-80 disabled:opacity-60" style={{ backgroundColor: "#e11d1b" }}>
                    {submitting ? "Slanje..." : "Pošaljite kod"}
                  </button>
                </form>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-1">Unesite OTP kod</h2>
                  <p className="text-sm text-zinc-400">Poslali smo 6-cifreni kod na <span className="font-medium text-zinc-700">{email}</span></p>
                </div>
                <form onSubmit={handleOtp} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="otp" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">OTP kod</label>
                    <input id="otp" type="text" inputMode="numeric" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="123456"
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 tracking-[0.3em] text-center text-lg font-semibold" />
                  </div>
                  <button type="submit" disabled={submitting} className="mt-1 w-full h-12 rounded-xl text-sm font-semibold text-white cursor-pointer transition-opacity duration-150 hover:opacity-90 active:opacity-80 disabled:opacity-60" style={{ backgroundColor: "#e11d1b" }}>
                    {submitting ? "Provera..." : "Potvrdi kod"}
                  </button>
                  <button type="button" onClick={() => { setStep("email"); setOtp(""); setError(""); }} className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors duration-150">
                    Nisam dobio kod — pokušaj ponovo
                  </button>
                </form>
              </>
            )}

            {step === "password" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-1">Nova lozinka</h2>
                  <p className="text-sm text-zinc-400">Unesite novu lozinku za vaš nalog</p>
                </div>
                <form onSubmit={handleReset} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="newPassword" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Nova lozinka</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none"><Lock size={15} strokeWidth={1.8} className="text-zinc-400" /></div>
                      <input id="newPassword" type={showNew ? "text" : "password"} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••"
                        className="w-full h-12 pl-11 pr-12 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                      <button type="button" onClick={() => setShowNew(v => !v)} className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors duration-150">
                        {showNew ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Potvrdite lozinku</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none"><Lock size={15} strokeWidth={1.8} className="text-zinc-400" /></div>
                      <input id="confirmPassword" type={showConfirm ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                        className="w-full h-12 pl-11 pr-12 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-300 outline-none transition-all duration-150 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100" />
                      <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors duration-150">
                        {showConfirm ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="mt-1 w-full h-12 rounded-xl text-sm font-semibold text-white cursor-pointer transition-opacity duration-150 hover:opacity-90 active:opacity-80 disabled:opacity-60" style={{ backgroundColor: "#e11d1b" }}>
                    {submitting ? "Čuvanje..." : "Sačuvaj novu lozinku"}
                  </button>
                </form>
              </>
            )}

            {step === "done" && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(225,29,27,0.08)" }}>
                  <ShieldCheck size={28} strokeWidth={1.5} style={{ color: "#e11d1b" }} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">Lozinka promenjena</h2>
                <p className="text-sm text-zinc-400 mb-8">Možete se sada prijaviti sa novom lozinkom.</p>
                <Link href="/nalog" className="inline-flex items-center justify-center w-full h-12 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90" style={{ backgroundColor: "#e11d1b" }}>
                  Prijavite se
                </Link>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <Link
                href="/nalog"
                className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer hover:text-zinc-600 transition-colors duration-150"
              >
                <ArrowLeft size={15} strokeWidth={1.8} />
                Nazad na prijavu
              </Link>
            </div>

          </div>
        </div>

      </Wrapper>
    </div>
  );
}
