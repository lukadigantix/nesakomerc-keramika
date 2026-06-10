"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  User,
  MapPin,
  LogOut,
  CheckCircle2,
  Truck,
  XCircle,
  Clock,
  ChevronRight,
  ShoppingBag,
  Eye,
  Plus,
  Trash2,
  Home,
  Star,
  AlertCircle,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import GeoAutocomplete, { GeoCity, GeoAddress } from "@/components/ui/GeoAutocomplete";

const mockUser = {
  name: "Marko Marković",
  email: "marko@email.com",
  phone: "+381 64 123 4567",
  memberSince: "Januar 2024",
  initials: "MM",
};

type OrderStatus = "isporuceno" | "u_toku" | "otkazano" | "ceka";

interface ApiOrderItem {
  quantity: number;
  price?: number;
  product?: { name?: string };
}

interface ApiOrder {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  subtotalAmount: number;
  discountAmount: number;
  shippingCost: number;
  paymentMethod: string;
  couponCode?: string;
  createdAt: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingZipCode?: string;
  notes?: string;
  items: ApiOrderItem[];
}

function mapStatus(s: string): OrderStatus {
  if (s === "delivered") return "isporuceno";
  if (s === "shipped" || s === "processing") return "u_toku";
  if (s === "cancelled") return "otkazano";
  return "ceka";
}

function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString("sr-RS", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

function fmtPrice(n: number) {
  return `${Math.round(n).toLocaleString("sr-RS")} RSD`;
}

function fmtOrderId(orderNumber: string) {
  return `#${orderNumber}`;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bg: string; Icon: React.ElementType }
> = {
  isporuceno: { label: "Isporučeno", color: "text-emerald-600", bg: "bg-emerald-50", Icon: CheckCircle2 },
  u_toku:     { label: "U toku",     color: "text-blue-600",    bg: "bg-blue-50",    Icon: Truck },
  otkazano:   { label: "Otkazano",   color: "text-zinc-400",    bg: "bg-zinc-100",   Icon: XCircle },
  ceka:       { label: "Čeka",       color: "text-amber-600",   bg: "bg-amber-50",   Icon: Clock },
};

type Tab = "pregled" | "narudzбine" | "profil" | "adrese" | "reklamacije";

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "pregled",      label: "Pregled",      icon: LayoutDashboard },
  { id: "narudzбine",  label: "Narudžbine",   icon: Package },
  { id: "profil",       label: "Profil",        icon: User },
  { id: "adrese",       label: "Adrese",        icon: MapPin },
  { id: "reklamacije",  label: "Reklamacije",   icon: AlertCircle },
];

// ─── Sub-sections ────────────────────────────────────────────────────────────

function OrderBadge({ status }: { status: OrderStatus }) {
  const { label, color, bg, Icon } = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${color} ${bg}`}>
      <Icon size={11} strokeWidth={2.2} />
      {label}
    </span>
  );
}

function OrderRow({ order }: { order: ApiOrder }) {
  const status = mapStatus(order.status);
  const [expanded, setExpanded] = useState(false);
  const itemsSummary = order.items
    .map((i) => `${i.product?.name ?? "Artikal"} ×${i.quantity}`)
    .join(", ") || "—";
  return (
    <div className="flex flex-col border-b border-zinc-100 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
            <ShoppingBag size={16} strokeWidth={1.6} className="text-zinc-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-zinc-900">{fmtOrderId(order.orderNumber)}</span>
              <OrderBadge status={status} />
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 truncate max-w-xs sm:max-w-sm">{itemsSummary}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{fmtDate(order.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-6 pl-14 sm:pl-0">
          <span className="text-sm font-bold text-zinc-900">{fmtPrice(order.totalAmount)}</span>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-medium text-zinc-400 hover:text-zinc-700 transition-colors flex items-center gap-1"
          >
            <Eye size={13} strokeWidth={1.8} />
            {expanded ? "Zatvori" : "Detalji"}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="pb-4 pl-14 flex flex-col gap-2">
          {order.shippingAddress && (
            <p className="text-xs text-zinc-500">
              <span className="font-semibold text-zinc-700">Adresa:</span> {order.shippingAddress}, {order.shippingCity} {order.shippingZipCode}
            </p>
          )}
          <div className="flex flex-col gap-1">
            {order.items.map((item, idx) => (
              <p key={idx} className="text-xs text-zinc-500">
                {item.product?.name ?? "Artikal"} ×{item.quantity}
              </p>
            ))}
          </div>
          {order.subtotalAmount != null && (
            <div className="flex flex-col gap-0.5 mt-1">
              <p className="text-xs text-zinc-400">Međuzbir: {fmtPrice(order.subtotalAmount)}</p>
              {order.discountAmount > 0 && <p className="text-xs text-emerald-600">Popust: − {fmtPrice(order.discountAmount)}</p>}
              <p className="text-xs text-zinc-400">Dostava: {order.shippingCost === 0 ? "Besplatno" : fmtPrice(order.shippingCost)}</p>
              <p className="text-xs font-semibold text-zinc-700">Ukupno: {fmtPrice(order.totalAmount)}</p>
            </div>
          )}
          {order.notes && <p className="text-xs text-zinc-400 italic">„{order.notes}“</p>}
        </div>
      )}
    </div>
  );
}

function PregledSection({ orders, onViewAll }: { orders: ApiOrder[]; onViewAll: () => void }) {
  const active = orders.filter((o) => mapStatus(o.status) === "u_toku" || mapStatus(o.status) === "ceka").length;
  const totalSpent = orders
    .filter((o) => mapStatus(o.status) !== "otkazano")
    .reduce((sum, o) => sum + (o.totalAmount ?? 0), 0);
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col gap-3">
          <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center">
            <Package size={16} strokeWidth={1.6} className="text-zinc-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900">{orders.length}</p>
            <p className="text-xs text-zinc-400 mt-0.5">Ukupno narudžbina</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(225,29,27,0.07)" }}>
            <Truck size={16} strokeWidth={1.6} style={{ color: "#e11d1b" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900">{active}</p>
            <p className="text-xs text-zinc-400 mt-0.5">Aktivnih narudžbina</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col gap-3 col-span-2 lg:col-span-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={16} strokeWidth={1.6} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900">{fmtPrice(totalSpent)}</p>
            <p className="text-xs text-zinc-400 mt-0.5">Ukupno potrošeno</p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900">Poslednje narudžbine</h3>
          <button
            onClick={onViewAll}
            className="text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#e11d1b" }}
          >
            Sve narudžbine
          </button>
        </div>
        <div className="px-6">
          {orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-400">Nemate narudžbina.</p>
          ) : (
            orders.slice(0, 3).map((order) => <OrderRow key={order.id} order={order} />)
          )}
        </div>
      </div>
    </div>
  );
}

function NarudzbineSection({ orders }: { orders: ApiOrder[] }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <h3 className="text-sm font-bold text-zinc-900">Sve narudžbine</h3>
        <p className="text-xs text-zinc-400 mt-0.5">{orders.length} narudžbina ukupno</p>
      </div>
      <div className="px-6">
        {orders.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-400">Nemate narudžbina.</p>
        ) : (
          orders.map((order) => <OrderRow key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}

function ProfilSection({ user, fullName }: { user: import("@/lib/auth").AuthUser; fullName: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-zinc-900 mb-5">Lični podaci</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Ime i prezime</label>
            <input
              type="text"
              defaultValue={fullName}
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Email adresa</label>
            <input
              type="email"
              defaultValue={user.email}
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Telefon</label>
            <input
              type="tel"
              defaultValue={user.phone}
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            className="px-6 h-10 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#e11d1b" }}
          >
            Sačuvaj izmene
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-zinc-900 mb-5">Promena lozinke</h3>
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Trenutna lozinka</label>
            <input
              type="password"
              placeholder="••••••••"
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Nova lozinka</label>
            <input
              type="password"
              placeholder="••••••••"
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Potvrdi novu lozinku</label>
            <input
              type="password"
              placeholder="••••••••"
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            className="px-6 h-10 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#e11d1b" }}
          >
            Promeni lozinku
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Reklamacije ─────────────────────────────────────────────────────────────

interface ApiComplaint {
  id: string;
  orderId: string;
  subject: string;
  description: string;
  status?: string;
  createdAt: string;
}

const COMPLAINT_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Na čekanju",  color: "text-amber-600",  bg: "bg-amber-50" },
  in_review: { label: "U obradi",    color: "text-blue-600",   bg: "bg-blue-50" },
  resolved:  { label: "Rešeno",      color: "text-emerald-600", bg: "bg-emerald-50" },
  rejected:  { label: "Odbijeno",    color: "text-zinc-400",   bg: "bg-zinc-100" },
};

function complaintStatusCfg(s?: string) {
  return COMPLAINT_STATUS[s ?? ""] ?? { label: s ?? "Na čekanju", color: "text-amber-600", bg: "bg-amber-50" };
}

const EMPTY_COMPLAINT = { orderId: "", subject: "", description: "" };

function ReklamacijeSection({ orders }: { orders: ApiOrder[] }) {
  const { token } = useAuth();
  const base = process.env.NEXT_PUBLIC_API_URL;
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const [complaints, setComplaints] = useState<ApiComplaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_COMPLAINT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Only orders within 14 days are eligible
  const eligibleOrders = orders.filter((o) => {
    const diff = (Date.now() - new Date(o.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 14;
  });

  async function load() {
    try {
      const r = await fetch(`${base}/complaints/my`, { headers });
      const data = await r.json();
      if (data.success && Array.isArray(data.data)) setComplaints(data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (token) load(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.orderId || !form.subject.trim() || !form.description.trim()) {
      setError("Sva polja su obavezna."); return;
    }
    setError("");
    setSaving(true);
    try {
      const r = await fetch(`${base}/complaints`, { method: "POST", headers, body: JSON.stringify(form) });
      const data = await r.json();
      if (!r.ok || !data.success) throw new Error(data.message ?? "Greška pri podnošenju reklamacije.");
      setShowForm(false);
      setForm(EMPTY_COMPLAINT);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="py-12 text-center text-sm text-zinc-400">Učitavanje reklamacija...</div>;

  return (
    <div className="flex flex-col gap-4">
      {/* Info banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100">
        <AlertCircle size={15} strokeWidth={2} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Reklamacija je moguća samo u roku od <strong>14 dana</strong> od kreiranja porudžbine. Jedna reklamacija po porudžbini.
        </p>
      </div>

      {/* Complaints list */}
      {complaints.length === 0 && !showForm && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 text-center">
          <MessageSquare size={32} strokeWidth={1.4} className="text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">Nemate podnetih reklamacija.</p>
        </div>
      )}

      {complaints.map((c) => {
        const cfg = complaintStatusCfg(c.status);
        const order = orders.find((o) => o.id === c.orderId);
        const isOpen = expandedId === c.id;
        return (
          <div key={c.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setExpandedId(isOpen ? null : c.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                <AlertCircle size={16} strokeWidth={1.6} className="text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-zinc-900 truncate">{c.subject}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {order ? fmtOrderId(order.id) : "Porudžbina"} · {fmtDate(c.createdAt)}
                </p>
              </div>
              <ChevronDown
                size={15}
                strokeWidth={2}
                className={`text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 border-t border-zinc-100 pt-3">
                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{c.description}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* New complaint form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-zinc-900">Nova reklamacija</h4>
          {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Porudžbina</label>
            {eligibleOrders.length === 0 ? (
              <p className="text-sm text-zinc-400">Nemate porudžbina u roku od 14 dana.</p>
            ) : (
              <select
                required
                value={form.orderId}
                onChange={(e) => setForm((f) => ({ ...f, orderId: e.target.value }))}
                className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
              >
                <option value="">Izaberi porudžbinu</option>
                {eligibleOrders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {fmtOrderId(o.id)} — {fmtDate(o.createdAt)} — {fmtPrice(o.totalPrice)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Predmet reklamacije</label>
            <input
              type="text"
              required
              placeholder="Isporučen pogrešni proizvod"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Opis</label>
            <textarea
              required
              rows={4}
              placeholder="Detaljno opišite problem..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm(EMPTY_COMPLAINT); setError(""); }}
              className="px-5 h-10 rounded-xl text-sm font-semibold text-zinc-500 border border-zinc-200 hover:bg-zinc-50 transition-colors"
            >
              Otkaži
            </button>
            <button
              type="submit"
              disabled={saving || eligibleOrders.length === 0}
              className="px-5 h-10 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
              style={{ backgroundColor: "#e11d1b" }}
            >
              {saving ? "Slanje..." : "Podnesi reklamaciju"}
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl border-2 border-dashed border-zinc-200 text-sm font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-500 transition-colors"
        >
          <Plus size={16} strokeWidth={2} />
          Podnesi novu reklamaciju
        </button>
      )}
    </div>
  );
}

// ─── Adrese ───────────────────────────────────────────────────────────────────

interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const EMPTY_FORM = { fullName: "", phone: "", address: "", city: "", zipCode: "", country: "Srbija", isDefault: false };

function AdreseSection() {
  const { token, user } = useAuth();
  const base = process.env.NEXT_PUBLIC_API_URL;
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const r = await fetch(`${base}/addresses`, { headers });
      const data = await r.json();
      if (data.success) setAddresses(data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (token) load(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const r = await fetch(`${base}/addresses`, { method: "POST", headers, body: JSON.stringify(form) });
      const data = await r.json();
      if (!r.ok || !data.success) throw new Error(data.message ?? "Greška");
      setShowForm(false);
      setForm(EMPTY_FORM);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`${base}/addresses/${id}`, { method: "DELETE", headers });
    await load();
  }

  async function handleSetDefault(id: string) {
    await fetch(`${base}/addresses/${id}/set-default`, { method: "PATCH", headers });
    await load();
  }

  if (loading) return <div className="py-12 text-center text-sm text-zinc-400">Učitavanje adresa...</div>;

  return (
    <div className="flex flex-col gap-4">
      {addresses.length === 0 && !showForm && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 text-center">
          <MapPin size={32} strokeWidth={1.4} className="text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">Nemate sačuvanih adresa.</p>
        </div>
      )}

      {addresses.map((addr) => (
        <div key={addr.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 mt-0.5">
              <Home size={16} strokeWidth={1.6} className="text-zinc-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-semibold text-zinc-900">{addr.fullName}</span>
                {addr.isDefault && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">Podrazumevana</span>
                )}
              </div>
              <p className="text-sm text-zinc-600">{addr.address}</p>
              <p className="text-xs text-zinc-400">{addr.zipCode} {addr.city}, {addr.country}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{addr.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!addr.isDefault && (
              <button
                onClick={() => handleSetDefault(addr.id)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                title="Postavi kao podrazumevanu"
              >
                <Star size={15} strokeWidth={1.8} />
              </button>
            )}
            <button
              onClick={() => handleDelete(addr.id)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Obriši adresu"
            >
              <Trash2 size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-zinc-900">Nova adresa</h4>
          {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([
              { key: "fullName", label: "Ime i prezime", type: "text", placeholder: "Marko Marković" },
              { key: "phone",    label: "Telefon",       type: "tel",  placeholder: "+381601234567" },
            ] as { key: string; label: string; type: string; placeholder: string }[]).map(({ key, label, type, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>
            ))}

            {/* City autocomplete */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Grad</label>
              <GeoAutocomplete
                type="city"
                value={form.city}
                onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                onSelect={(city: GeoCity) => setForm((f) => ({ ...f, city: city.name, zipCode: city.postcode ?? f.zipCode }))}
                placeholder="Novi Sad"
              />
            </div>

            {/* Zip code */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Poštanski broj</label>
              <input
                type="text"
                required
                placeholder="21000"
                value={form.zipCode}
                onChange={(e) => setForm((f) => ({ ...f, zipCode: e.target.value }))}
                className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
              />
            </div>

            {/* Address autocomplete - full width */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Adresa</label>
              <GeoAutocomplete
                type="address"
                value={form.address}
                onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                onSelect={(addr: GeoAddress) => {
                  const street = [addr.road, addr.houseNumber].filter(Boolean).join(" ");
                  setForm((f) => ({ ...f, address: street || addr.displayName, zipCode: addr.postcode ?? f.zipCode }));
                }}
                cityFilter={form.city}
                placeholder="Bulevar Oslobođenja 100"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Država</label>
              <input
                type="text"
                required
                placeholder="Srbija"
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                className="h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
              className="rounded accent-red-600"
            />
            Postavi kao podrazumevanu adresu
          </label>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setError(""); }} className="px-5 h-10 rounded-xl text-sm font-semibold text-zinc-500 border border-zinc-200 hover:bg-zinc-50 transition-colors">
              Otkaži
            </button>
            <button type="submit" disabled={saving} className="px-5 h-10 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity" style={{ backgroundColor: "#e11d1b" }}>
              {saving ? "Čuvanje..." : "Sačuvaj adresu"}
            </button>
          </div>
        </form>
      )}

      {!showForm && addresses.length < 3 && (
        <button
          onClick={() => { setForm({ ...EMPTY_FORM, fullName: user ? `${user.firstName} ${user.lastName}` : "", phone: user?.phone ?? "" }); setShowForm(true); }}
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl border-2 border-dashed border-zinc-200 text-sm font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-500 transition-colors"
        >
          <Plus size={16} strokeWidth={2} />
          Dodaj novu adresu {addresses.length > 0 && `(${addresses.length}/3)`}
        </button>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, logout, loading, token } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("pregled");
  const [orders, setOrders] = useState<ApiOrder[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/nalog");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (data.success && Array.isArray(data.data)) setOrders(data.data); })
      .catch(() => {});
  }, [token]);

  if (loading || !user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
  const memberSince = new Date().getFullYear().toString();

  const activeNav = navItems.find((n) => n.id === activeTab)!;

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
            <span className="text-white">Moj nalog</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold text-white shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {initials}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{fullName}</h1>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                Član od {memberSince}
              </p>
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Content */}
      <div className="py-10">
        <Wrapper>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">

            {/* Sidebar — desktop */}
            <div className="hidden lg:flex w-56 xl:w-64 shrink-0 flex-col gap-2 sticky top-28">
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-3 px-4 h-11 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-zinc-500 hover:bg-white hover:text-zinc-800 hover:shadow-sm"
                    }`}
                    style={isActive ? { background: "linear-gradient(to right, #e11d1b, #f97316)" } : {}}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    {label}
                  </button>
                );
              })}

              <div className="mt-2 pt-4 border-t border-zinc-200">
                <button
                  onClick={() => { logout(); router.push("/nalog"); }}
                  className="flex items-center gap-3 px-4 h-11 rounded-xl text-sm font-medium text-zinc-400 hover:bg-white hover:text-zinc-600 hover:shadow-sm transition-all duration-150 w-full text-left"
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  Odjavi se
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">

              {/* Mobile tabs */}
              <div className="lg:hidden flex gap-1 mb-6 overflow-x-auto pb-1 -mx-4 px-4">
                {navItems.map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                        isActive ? "text-white" : "bg-white text-zinc-500 border border-zinc-100"
                      }`}
                      style={isActive ? { background: "linear-gradient(to right, #e11d1b, #f97316)" } : {}}
                    >
                      <Icon size={13} strokeWidth={2} />
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Section heading */}
              <div className="mb-5 flex items-center gap-2">
                <activeNav.icon size={18} strokeWidth={1.8} className="text-zinc-400" />
                <h2 className="text-lg font-bold text-zinc-900">{activeNav.label}</h2>
              </div>

              {/* Active section */}
              {activeTab === "pregled"       && <PregledSection orders={orders} onViewAll={() => setActiveTab("narudzбine")} />}
              {activeTab === "narudzбine"    && <NarudzbineSection orders={orders} />}
              {activeTab === "profil"        && <ProfilSection user={user} fullName={fullName} />}
              {activeTab === "adrese"        && <AdreseSection />}
              {activeTab === "reklamacije"   && <ReklamacijeSection orders={orders} />}

              {/* Mobile logout */}
              <div className="lg:hidden mt-8 pt-6 border-t border-zinc-200">
                <button
                  onClick={() => { logout(); router.push("/nalog"); }}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <LogOut size={15} strokeWidth={1.8} />
                  Odjavi se
                </button>
              </div>

            </div>
          </div>
        </Wrapper>
      </div>

    </div>
  );
}
