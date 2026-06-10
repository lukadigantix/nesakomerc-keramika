"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { ArrowLeft, CheckCircle2, ShoppingBag, MapPin, User, Phone, Mail, FileText, Tag, X, CheckCircle, Truck, Package } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import { useCart } from "@/lib/cart";
import { getShippingMethods, ApiShippingMethod } from "@/lib/shipping";
import GeoAutocomplete, { GeoCity, GeoAddress } from "@/components/ui/GeoAutocomplete";

function parsePrice(price: string): number {
  return parseInt(price.replace(/\D/g, ""), 10) || 0;
}
function formatPrice(amount: number): string {
  return amount.toLocaleString("sr-RS") + " RSD";
}

const COUPONS: Record<string, { label: string; type: "percent" | "fixed"; value: number }> = {
  NESA10:     { label: "10% popusta",      type: "percent", value: 10 },
  DOBRODOSLI: { label: "1.000 RSD popusta", type: "fixed",   value: 1000 },
  KERAMIKA15: { label: "15% popusta",      type: "percent", value: 15 },
};

export default function NaruciPage() {
  const { user, token } = useAuth();
  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    ime: "", email: "", telefon: "",
    adresa: "", grad: "", ptt: "", napomena: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [shippingMethods, setShippingMethods] = useState<ApiShippingMethod[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(null);

  useEffect(() => {
    getShippingMethods()
      .then(({ data }) => {
        const active = data.filter((m) => m.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
        setShippingMethods(active);
        if (active.length > 0) setSelectedShippingId(active[0].id);
      })
      .catch(() => {});
  }, []);

  // Pre-fill personal data when user is logged in
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      ime: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      telefon: user.phone ?? "",
    }));
  }, [user]);

  // Pre-fill default address when user is logged in
  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const def = data.data.find((a: { isDefault: boolean }) => a.isDefault) ?? data.data[0];
          setForm((f) => ({
            ...f,
            adresa: def.address ?? "",
            grad:   def.city    ?? "",
            ptt:    def.zipCode ?? "",
          }));
        }
      })
      .catch(() => {});
  }, [token]);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<null | { code: string; label: string; type: "percent" | "fixed"; value: number }>(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round(subtotal * appliedCoupon.value / 100)
      : Math.min(appliedCoupon.value, subtotal)
    : 0;
  const selectedMethod = shippingMethods.find((m) => m.id === selectedShippingId) ?? null;
  const shippingPrice = selectedMethod
    ? selectedMethod.type === "pickup" ? 0 : Math.round(parseFloat(selectedMethod.price))
    : 0;
  const freeAbove = shippingMethods.find((m) => m.type === "courier")?.freeAbove;
  const freeThreshold = freeAbove ? Math.round(parseFloat(freeAbove)) : null;
  const hasFreeCourier = selectedMethod?.type === "courier" && freeThreshold !== null && subtotal >= freeThreshold;
  const effectiveShipping = hasFreeCourier ? 0 : shippingPrice;
  const total = subtotal - discount + effectiveShipping;

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    const match = COUPONS[code];
    if (!match) { setCouponError("Kupon nije pronađen ili je istekao."); return; }
    setAppliedCoupon({ code, ...match });
    setCouponError("");
    setCouponInput("");
  }

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
    };
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.ime.trim())     e.ime     = "Obavezno polje";
    if (!form.email.trim())   e.email   = "Obavezno polje";
    if (!form.telefon.trim()) e.telefon = "Obavezno polje";
    if (!form.adresa.trim())  e.adresa  = "Obavezno polje";
    if (!form.grad.trim())    e.grad    = "Obavezno polje";
    if (!form.ptt.trim())     e.ptt     = "Obavezno polje";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    setSubmitError("");

    try {
      const baseBody = {
        shippingAddress: form.adresa,
        shippingCity:    form.grad,
        shippingZipCode: form.ptt,
        shippingCountry: "Srbija",
        notes:           form.napomena || undefined,
        couponCode:      appliedCoupon?.code || undefined,
        shippingMethodId: selectedShippingId || undefined,
        paymentMethod:   "cash_on_delivery",
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      };

      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const body = token ? baseBody : {
        ...baseBody,
        guestName:  form.ime,
        guestEmail: form.email,
        guestPhone: form.telefon,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? "Greška pri kreiranju porudžbine.");

      clearCart();
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Greška. Pokušajte ponovo.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "#fafafa" }}>
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-10 flex flex-col items-center text-center max-w-md w-full">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
          >
            <CheckCircle2 size={30} strokeWidth={1.8} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Porudžbina primljena!</h1>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Hvala na porudžbini. Kontaktiraćemo vas uskoro na <strong className="text-zinc-600">{form.email}</strong> radi potvrde.
          </p>
          <Link
            href="/proizvodi"
            className="flex items-center gap-2 px-6 h-11 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
          >
            Nastavi kupovinu
          </Link>
        </div>
      </div>
    );
  }

  // ── Empty cart ────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "#fafafa" }}>
        <ShoppingBag size={36} strokeWidth={1.4} className="text-zinc-300 mb-4" />
        <p className="text-zinc-400 text-sm mb-4">Korpa je prazna</p>
        <Link href="/proizvodi" className="text-sm font-semibold" style={{ color: "#e11d1b" }}>
          Pogledajte proizvode
        </Link>
      </div>
    );
  }

  // ── Checkout ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>

      {/* Hero */}
      <div
        className="pt-28 pb-8"
        style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
      >
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <Link href="/korpa" className="hover:text-white transition-colors duration-150">Korpa</Link>
            <span>/</span>
            <span className="text-white">Naručivanje</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Naručivanje</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Unesite podatke za dostavu i potvrdite porudžbinu
          </p>
        </Wrapper>
      </div>

      {/* Content */}
      <div className="py-12">
        <Wrapper>
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start">

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="flex-1 min-w-0 flex flex-col gap-5">

              {/* Personal info */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <User size={16} strokeWidth={1.8} className="text-zinc-400" />
                  <h2 className="text-sm font-bold text-zinc-900">Lični podaci</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Ime i prezime" error={errors.ime}>
                    <input type="text" value={form.ime} onChange={set("ime")} placeholder="Marko Marković"
                      className={inputCls(errors.ime)} />
                  </Field>
                  <Field label="Email adresa" error={errors.email}>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="vas@email.com"
                      className={inputCls(errors.email)} />
                  </Field>
                  <Field label="Kontakt telefon" error={errors.telefon} className="sm:col-span-2">
                    <input type="tel" value={form.telefon} onChange={set("telefon")} placeholder="+381 6x xxx xxxx"
                      className={inputCls(errors.telefon)} />
                  </Field>
                </div>
              </div>

              {/* Delivery address */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <MapPin size={16} strokeWidth={1.8} className="text-zinc-400" />
                  <h2 className="text-sm font-bold text-zinc-900">Adresa za dostavu</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Grad" error={errors.grad}>
                    <GeoAutocomplete
                      type="city"
                      value={form.grad}
                      onChange={(v) => { setForm((f) => ({ ...f, grad: v })); setErrors((er) => ({ ...er, grad: undefined })); }}
                      onSelect={(city: GeoCity) => setForm((f) => ({ ...f, grad: city.name, ptt: city.postcode ?? f.ptt }))}
                      placeholder="Beograd"
                      error={errors.grad}
                    />
                  </Field>
                  <Field label="Poštanski broj" error={errors.ptt}>
                    <input type="text" value={form.ptt} onChange={set("ptt")} placeholder="11000"
                      className={inputCls(errors.ptt)} />
                  </Field>
                  <Field label="Ulica i broj" error={errors.adresa} className="sm:col-span-2">
                    <GeoAutocomplete
                      type="address"
                      value={form.adresa}
                      onChange={(v) => { setForm((f) => ({ ...f, adresa: v })); setErrors((er) => ({ ...er, adresa: undefined })); }}
                      onSelect={(addr: GeoAddress) => {
                        const street = [addr.road, addr.houseNumber].filter(Boolean).join(" ");
                        setForm((f) => ({ ...f, adresa: street || addr.displayName, ptt: addr.postcode ?? f.ptt }));
                      }}
                      cityFilter={form.grad}
                      placeholder="Vojvode Putnika 22"
                      error={errors.adresa}
                    />
                  </Field>
                </div>
              </div>

              {/* Shipping method */}
              {shippingMethods.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Truck size={16} strokeWidth={1.8} className="text-zinc-400" />
                    <h2 className="text-sm font-bold text-zinc-900">Način dostave</h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    {shippingMethods.map((m) => {
                      const price = m.type === "pickup" ? 0 : Math.round(parseFloat(m.price));
                      const isFree = m.type === "courier" && freeThreshold !== null && subtotal >= freeThreshold;
                      const isSelected = selectedShippingId === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedShippingId(m.id)}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all duration-150 text-left"
                          style={{
                            borderColor: isSelected ? "#e11d1b" : "#e4e4e7",
                            backgroundColor: isSelected ? "rgba(225,29,27,0.03)" : "transparent",
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150"
                            style={{ borderColor: isSelected ? "#e11d1b" : "#d4d4d8" }}
                          >
                            {isSelected && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#e11d1b" }} />}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-zinc-900">{m.name}</p>
                            {m.description && <p className="text-xs text-zinc-400 mt-0.5">{m.description}</p>}
                          </div>
                          <span className="text-sm font-semibold shrink-0" style={{ color: isFree || price === 0 ? "#16a34a" : "#18181b" }}>
                            {isFree || price === 0 ? "Besplatno" : formatPrice(price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Note */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FileText size={16} strokeWidth={1.8} className="text-zinc-400" />
                  <h2 className="text-sm font-bold text-zinc-900">Napomena <span className="text-zinc-400 font-normal">(opciono)</span></h2>
                </div>
                <textarea
                  value={form.napomena}
                  onChange={set("napomena")}
                  rows={3}
                  placeholder="Posebne napomene za dostavu ili porudžbinu..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                />
              </div>

              {/* Mobile submit */}
              {submitError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="lg:hidden flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
              >
                {submitting ? "Slanje..." : "Potvrdi porudžbinu"}
              </button>

            </form>

            {/* ── Order summary ── */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 lg:sticky lg:top-28">

              {/* Items */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100">
                  <h2 className="text-sm font-bold text-zinc-900">
                    Pregled porudžbine
                    <span className="ml-2 text-xs font-normal text-zinc-400">({items.length} {items.length === 1 ? "stavka" : "stavke"})</span>
                  </h2>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-50 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-zinc-700 truncate">{item.name}</p>
                        <p className="text-xs text-zinc-400">×{item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold text-zinc-900 shrink-0">
                        {formatPrice(parsePrice(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="px-5 py-4 border-t border-zinc-100 flex flex-col gap-1.5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={13} strokeWidth={2} className="text-emerald-500 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-700">{appliedCoupon.code}</span>
                        <span className="text-xs text-emerald-600">— {appliedCoupon.label}</span>
                      </div>
                      <button type="button" onClick={() => { setAppliedCoupon(null); setCouponError(""); }} className="text-emerald-400 hover:text-emerald-600 transition-colors cursor-pointer">
                        <X size={13} strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag size={12} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                            placeholder="Kod kupona"
                            className="w-full h-9 pl-7 pr-3 rounded-xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all uppercase"
                          />
                        </div>
                        <button type="button" onClick={applyCoupon}
                          className="px-3 h-9 rounded-xl text-xs font-semibold text-white shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
                          style={{ backgroundColor: "#e11d1b" }}
                        >
                          Primeni
                        </button>
                      </div>
                      {couponError && <p className="text-xs text-red-500">{couponError}</p>}
                    </>
                  )}
                </div>

                {/* Totals */}
                <div className="px-5 pb-5 flex flex-col gap-2 border-t border-zinc-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Međuzbir</span>
                    <span className="text-zinc-600">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600">Popust</span>
                      <span className="font-semibold text-emerald-600">− {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Dostava</span>
                    <span className={effectiveShipping === 0 ? "font-semibold text-emerald-600" : "text-zinc-600"}>
                      {effectiveShipping === 0 ? "Besplatno" : formatPrice(effectiveShipping)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                    <span className="text-sm font-bold text-zinc-900">Ukupno</span>
                    <span className="text-xl font-bold text-zinc-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {submitError && (
                <p className="hidden lg:block text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{submitError}</p>
              )}
              {/* Desktop submit */}
              <button
                type="submit"
                form="checkout-form"
                onClick={handleSubmit as React.MouseEventHandler}
                disabled={submitting}
                className="hidden lg:flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
                style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
              >
                {submitting ? "Slanje..." : "Potvrdi porudžbinu"}
              </button>

              <Link
                href="/korpa"
                className="hidden lg:flex items-center justify-center gap-1.5 w-full h-10 rounded-xl text-sm font-medium text-zinc-500 bg-white border border-zinc-100 shadow-sm hover:bg-zinc-50 transition-colors"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Vrati se u korpu
              </Link>

            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputCls(error?: string) {
  return `w-full h-11 px-4 rounded-xl border ${error ? "border-red-300 bg-red-50" : "border-zinc-200 bg-zinc-50"} text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all`;
}

function Field({ label, error, children, className }: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
