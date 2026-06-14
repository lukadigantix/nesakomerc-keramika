"use client";

import { useState } from "react";
import { sendContactMessage } from "@/lib/contact";

type State = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setState("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      await sendContactMessage(form);
      setState("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Greška pri slanju poruke");
      setState("error");
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border-0 bg-[#fafafa] text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-all duration-150 shadow-sm disabled:opacity-50";
  const disabled = state === "loading" || state === "success";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Ime</label>
          <input type="text" required placeholder="Marko" value={form.firstName} onChange={set("firstName")} disabled={disabled} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Prezime</label>
          <input type="text" required placeholder="Marković" value={form.lastName} onChange={set("lastName")} disabled={disabled} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input type="email" required placeholder="vas@email.com" value={form.email} onChange={set("email")} disabled={disabled} className={inputCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Kontakt telefon</label>
          <input type="text" placeholder="+381 6x xxx xxxx" value={form.phone} onChange={set("phone")} disabled={disabled} className={inputCls} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700">Poruka</label>
        <textarea required rows={5} placeholder="Opišite vaš upit..." value={form.message} onChange={set("message")} disabled={disabled} className={`${inputCls} resize-none`} />
      </div>

      {state === "success" && (
        <p className="text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">Poruka je uspešno poslata! Javićemo vam se uskoro.</p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{errorMsg}</p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={disabled}
          className="px-8 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-150 bg-[#e11d1b] hover:bg-[#bf1917] disabled:opacity-60"
        >
          {state === "loading" ? "Slanje..." : state === "success" ? "Poslato ✓" : "Pošaljite poruku"}
        </button>
      </div>
    </form>
  );
}
