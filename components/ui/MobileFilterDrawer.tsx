"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function MobileFilterDrawer({ children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="min-[1330px]:hidden flex items-center gap-2 h-8 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-700 bg-white hover:border-zinc-400 transition-colors duration-150"
      >
        <SlidersHorizontal size={14} strokeWidth={1.8} />
        Filteri
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 min-[1330px]:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out min-[1330px]:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <span className="text-sm font-semibold text-zinc-950">Filteri</span>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors duration-150"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </>
  );
}
