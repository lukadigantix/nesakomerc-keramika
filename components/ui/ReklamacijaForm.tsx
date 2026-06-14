"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

interface ApiOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
}

type Status = "idle" | "loading" | "success" | "error";

const BASE = process.env.NEXT_PUBLIC_API_URL;

function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString("sr-RS", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

export default function ReklamacijaForm() {
  const { token, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ orderId: "", subject: "", description: "" });

  useEffect(() => {
    if (!token) return;
    setOrdersLoading(true);
    fetch(`${BASE}/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const eligible = data.data.filter((o: ApiOrder) => {
            const days = (Date.now() - new Date(o.createdAt).getTime()) / (1000 * 60 * 60 * 24);
            return days <= 14;
          });
          setOrders(eligible);
        }
      })
      .catch(() => {})
      .finally(() => setOrdersLoading(false));
  }, [token]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) { router.push("/nalog"); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      const r = await fetch(`${BASE}/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok || !data.success) throw new Error(data.message ?? "Greška pri podnošenju reklamacije.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Greška");
      setStatus("error");
    }
  };

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <AlertCircle size={32} className="text-zinc-300" strokeWidth={1.5} />
        <p className="text-sm font-semibold text-zinc-950">Potrebna je prijava</p>
        <p className="text-sm text-zinc-500 max-w-xs">Reklamaciju možete podneti samo ako ste prijavljeni na nalog.</p>
        <button
          onClick={() => router.push("/nalog")}
          className="h-10 px-6 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#e11d1b" }}
        >
          Prijavi se
        </button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-emerald-500" strokeWidth={1.8} />
        </div>
        <h3 className="text-base font-bold text-zinc-950">Reklamacija primljena</h3>
        <p className="text-sm text-zinc-500 max-w-xs">Odgovorićemo vam u roku od 8 radnih dana.</p>
      </div>
    );
  }

  const inputClass = "w-full h-10 px-3 rounded-xl border border-zinc-200 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors duration-150 bg-white";
  const labelClass = "text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {status === "error" && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
          <AlertCircle size={14} strokeWidth={2} className="shrink-0" />
          {errorMsg || "Greška pri podnošenju reklamacije."}
        </div>
      )}

      {/* Porudžbina */}
      <div>
        <label className={labelClass}>Porudžbina *</label>
        {ordersLoading ? (
          <div className="h-10 rounded-xl bg-zinc-100 animate-pulse" />
        ) : orders.length === 0 ? (
          <p className="text-sm text-zinc-400 py-2">
            Nemate porudžbina u roku od 14 dana od datuma kupovine.
          </p>
        ) : (
          <select required value={form.orderId} onChange={set("orderId")} className={inputClass}>
            <option value="">Izaberi porudžbinu</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                #{o.orderNumber} — {fmtDate(o.createdAt)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Predmet */}
      <div>
        <label className={labelClass}>Predmet reklamacije *</label>
        <input required value={form.subject} onChange={set("subject")} placeholder="Isporučen pogrešan proizvod" className={inputClass} />
      </div>

      {/* Opis */}
      <div>
        <label className={labelClass}>Opis problema *</label>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={set("description")}
          placeholder="Detaljno opišite problem..."
          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors duration-150 bg-white resize-none"
        />
      </div>

      <p className="text-xs text-zinc-400">
        Slanjem formulara saglasni ste sa <a href="/politika-privatnosti" className="underline hover:text-zinc-700">Politikom privatnosti</a>.
      </p>

      <button
        type="submit"
        disabled={status === "loading" || orders.length === 0}
        className="h-11 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#e11d1b" }}
      >
        {status === "loading" ? "Slanje..." : "Podnesi reklamaciju"}
      </button>
    </form>
  );
}
