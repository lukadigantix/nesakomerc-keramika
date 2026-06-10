"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Trash2, ShoppingBag, ArrowRight, Tag, X, CheckCircle2,
  Truck, Package, MapPin, ChevronRight,
} from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import { useCart } from "@/lib/cart";
import { getShippingMethods, ApiShippingMethod } from "@/lib/shipping";

function parsePrice(price: string): number {
  return parseInt(price.replace(/\D/g, ""), 10) || 0;
}

function formatPrice(amount: number): string {
  return amount.toLocaleString("sr-RS") + " RSD";
}

function parsePriceStr(price: string): number {
  return Math.round(parseFloat(price) * 100) / 100 * 1 || 0;
}

const COUPONS: Record<string, { label: string; type: "percent" | "fixed"; value: number }> = {
  NESA10:     { label: "10% popusta",      type: "percent", value: 10 },
  DOBRODOSLI: { label: "1.000 RSD popusta", type: "fixed",   value: 1000 },
  KERAMIKA15: { label: "15% popusta",      type: "percent", value: 15 },
};

const FREE_SHIPPING_THRESHOLD = 6000;

function ShippingIcon({ type }: { type: string }) {
  if (type === "pickup") return <MapPin size={15} strokeWidth={1.8} />;
  return <Truck size={15} strokeWidth={1.8} />;
}

export default function KorpaPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<null | { code: string; label: string; type: "percent" | "fixed"; value: number }>(null);
  const [couponError, setCouponError] = useState("");

  const [shippingMethods, setShippingMethods] = useState<ApiShippingMethod[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(null);

  useEffect(() => {
    getShippingMethods()
      .then(({ data }) => {
        const active = data.filter((m) => m.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
        setShippingMethods(active);
        if (active.length > 0) setSelectedShippingId(active[0].id);
      })
      .catch(() => {/* keep empty, graceful fallback */});
  }, []);

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    const match = COUPONS[code];
    if (!match) {
      setCouponError("Kupon nije pronađen ili je istekao.");
      return;
    }
    setAppliedCoupon({ code, ...match });
    setCouponError("");
    setCouponInput("");
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponError("");
  }

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round(subtotal * appliedCoupon.value / 100)
      : Math.min(appliedCoupon.value, subtotal)
    : 0;

  const selectedMethod = shippingMethods.find((m) => m.id === selectedShippingId) ?? null;
  const shippingPrice = selectedMethod
    ? (selectedMethod.type === "pickup" ? 0 : parsePriceStr(selectedMethod.price))
    : 0;

  // Free shipping: any courier method becomes free above threshold
  const courierMethod = shippingMethods.find((m) => m.type === "courier");
  const freeThreshold = courierMethod?.freeAbove
    ? Math.round(parseFloat(courierMethod.freeAbove))
    : FREE_SHIPPING_THRESHOLD;
  const freeShippingProgress = Math.min((subtotal / freeThreshold) * 100, 100);
  const remaining = Math.max(freeThreshold - subtotal, 0);
  const hasFreeCourier =
    selectedMethod?.type === "courier" && subtotal >= freeThreshold;
  const effectiveShipping = hasFreeCourier ? 0 : shippingPrice;

  const total = subtotal - discount + effectiveShipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
        <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
          <Wrapper>
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
              <span>/</span>
              <span className="text-white">Korpa</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Korpa</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Vaši odabrani proizvodi</p>
          </Wrapper>
        </div>
        <div className="py-32">
          <Wrapper>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(225,29,27,0.07)" }}>
                <ShoppingBag size={34} strokeWidth={1.4} style={{ color: "#e11d1b" }} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-3">Korpa je prazna</h2>
              <p className="text-sm text-zinc-400 mb-8 max-w-xs">
                Još niste dodali nijedan proizvod. Pogledajte naš asortiman i pronađite šta vam treba.
              </p>
              <Link
                href="/proizvodi"
                className="flex items-center gap-2 px-6 h-12 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: "#e11d1b" }}
              >
                Pregledajte proizvode
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </Wrapper>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div className="pt-28 pb-8" style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}>
        <Wrapper>
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors duration-150">Početna</Link>
            <span>/</span>
            <span className="text-white">Korpa</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Korpa</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {items.length} {items.length === 1 ? "proizvod" : "proizvoda"} u korpi
          </p>
        </Wrapper>
      </div>

      {/* Content */}
      <div className="py-16">
        <Wrapper>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">

            {/* ── Items list ── */}
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-5 bg-white rounded-2xl border border-zinc-100 p-4 sm:p-5 shadow-sm">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-50 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">{item.category}</span>
                        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug mt-0.5 truncate">{item.name}</h3>
                        {item.sku && <span className="text-xs text-zinc-400 mt-0.5">Šifra: {item.sku}</span>}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                        aria-label="Ukloni iz korpe"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm sm:text-base font-semibold text-zinc-900">{item.price}</p>
                      <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors duration-150 cursor-pointer text-lg font-light"
                          aria-label="Smanji količinu"
                        >−</button>
                        <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-sm font-semibold text-zinc-900 border-x border-zinc-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors duration-150 cursor-pointer text-lg font-light"
                          aria-label="Povećaj količinu"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-400 cursor-pointer hover:text-red-500 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <Trash2 size={12} strokeWidth={1.8} />
                  Isprazni korpu
                </button>
              </div>
            </div>

            {/* ── Summary panel ── */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 lg:sticky lg:top-28">

              {/* Free shipping progress */}
              {remaining > 0 ? (
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-500">Do besplatne dostave</span>
                    <span className="text-xs font-bold text-zinc-800">{formatPrice(remaining)}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%`, background: "linear-gradient(to right, #e11d1b, #f97316)" }}
                    />
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    Dodaj još <span className="font-semibold text-zinc-700">{formatPrice(remaining)}</span> za besplatnu dostavu
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3 flex items-center gap-2.5">
                  <CheckCircle2 size={16} strokeWidth={2} className="text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-700">Kvalifikovani ste za besplatnu dostavu!</span>
                </div>
              )}

              {/* Main card */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-zinc-100">
                  <h2 className="text-base font-bold text-zinc-900">Pregled porudžbine</h2>
                </div>

                {/* Item lines */}
                <div className="px-6 py-4 flex flex-col gap-2.5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-zinc-500 truncate mr-4">
                        {item.name} <span className="text-zinc-400">×{item.quantity}</span>
                      </span>
                      <span className="font-medium text-zinc-900 shrink-0">
                        {formatPrice(parsePrice(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping method selector */}
                {shippingMethods.length > 0 && (
                  <div className="px-6 pb-4 border-t border-zinc-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Način dostave</p>
                    <div className="flex flex-col gap-2">
                      {shippingMethods.map((method) => {
                        const price = method.type === "pickup" ? 0 : parsePriceStr(method.price);
                        const isFreeForOrder = method.type === "courier" && subtotal >= freeThreshold;
                        const isSelected = selectedShippingId === method.id;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setSelectedShippingId(method.id)}
                            className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border text-sm transition-all duration-150 cursor-pointer text-left ${
                              isSelected
                                ? "border-red-300 bg-red-50"
                                : "border-zinc-200 hover:border-zinc-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={isSelected ? "text-red-500" : "text-zinc-400"}>
                                <ShippingIcon type={method.type} />
                              </span>
                              <div className="min-w-0">
                                <p className={`font-semibold leading-tight ${isSelected ? "text-zinc-950" : "text-zinc-700"}`}>
                                  {method.name}
                                </p>
                                {method.description && (
                                  <p className="text-xs text-zinc-400 truncate">{method.description}</p>
                                )}
                              </div>
                            </div>
                            <span className={`shrink-0 font-semibold ${isFreeForOrder ? "text-emerald-600" : isSelected ? "text-zinc-950" : "text-zinc-600"}`}>
                              {method.type === "pickup"
                                ? "Besplatno"
                                : isFreeForOrder
                                  ? "Besplatno"
                                  : formatPrice(price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Coupon */}
                <div className="px-6 pb-4 border-t border-zinc-100 pt-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} strokeWidth={2} className="text-emerald-500 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-700">{appliedCoupon.code}</span>
                        <span className="text-xs text-emerald-600">— {appliedCoupon.label}</span>
                      </div>
                      <button onClick={removeCoupon} className="text-emerald-400 hover:text-emerald-600 transition-colors cursor-pointer">
                        <X size={14} strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag size={13} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                            placeholder="Kod kupona"
                            className="w-full h-9 pl-8 pr-3 rounded-xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all uppercase"
                          />
                        </div>
                        <button
                          onClick={applyCoupon}
                          className="px-3 h-9 rounded-xl text-xs font-semibold text-white shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
                          style={{ backgroundColor: "#e11d1b" }}
                        >
                          Primeni
                        </button>
                      </div>
                      {couponError && <p className="text-xs text-red-500">{couponError}</p>}
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="px-6 pb-4 border-t border-zinc-100 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Međuzbir</span>
                    <span className="text-sm text-zinc-600">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-emerald-600">Popust ({appliedCoupon!.code})</span>
                      <span className="text-sm font-semibold text-emerald-600">− {formatPrice(discount)}</span>
                    </div>
                  )}
                  {selectedMethod && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-400">Dostava</span>
                      <span className={`text-sm font-medium ${effectiveShipping === 0 ? "text-emerald-600" : "text-zinc-600"}`}>
                        {effectiveShipping === 0 ? "Besplatno" : formatPrice(effectiveShipping)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-100 mt-1">
                    <span className="text-sm font-semibold text-zinc-500">Ukupno</span>
                    <span className="text-xl font-bold text-zinc-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 flex flex-col gap-3">
                  <Link
                    href="/naruci"
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                    style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
                  >
                    Poruči
                    <ChevronRight size={15} strokeWidth={2.2} />
                  </Link>
                  <Link
                    href="/proizvodi"
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-medium text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors duration-150"
                  >
                    <Package size={14} strokeWidth={1.8} />
                    Nastavi kupovinu
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </Wrapper>
      </div>
    </div>
  );
}
