"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await subscribeNewsletter(email);
      setState(res.alreadySubscribed ? "already" : "success");
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      // Hide internal DB errors from the user
      setErrorMsg(msg.includes("doesn't exist") || msg.includes("Table") ? "Prijava trenutno nije dostupna. Pokušajte kasnije." : "Proverite email adresu i pokušajte ponovo.");
      setState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:shrink-0">
      <div className="flex items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder="Vaša e-mail adresa"
          required
          disabled={state === "loading" || state === "success"}
          className="h-11 px-4 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 w-full sm:w-72 transition-colors duration-150 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading" || state === "success"}
          style={{ backgroundColor: "#e11d1b" }}
          className="h-11 px-6 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-all duration-300 shrink-0 disabled:opacity-60"
        >
          {state === "loading" ? "..." : "Prijavi se"}
        </button>
      </div>
      {state === "success" && (
        <p className="text-sm text-green-400 pl-1">Uspešno ste se prijavili na newsletter!</p>
      )}
      {state === "already" && (
        <p className="text-sm text-white/50 pl-1">Ova adresa je već prijavljena.</p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-400 pl-1">{errorMsg}</p>
      )}
    </form>
  );
}
