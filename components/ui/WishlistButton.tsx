"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { isSaved, addToWishlist, removeFromWishlist } from "@/lib/wishlist";

interface Props {
  productId: string;
  showLabel?: boolean;
  iconOnly?: boolean;
}

export default function WishlistButton({ productId, showLabel, iconOnly }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) { setSaved(false); return; }
    isSaved(productId, token).then(setSaved);
  }, [productId, token]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      router.push("/nalog");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      if (saved) {
        await removeFromWishlist(productId, token);
        setSaved(false);
      } else {
        await addToWishlist(productId, token);
        setSaved(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (iconOnly) {
    return (
      <button
        onClick={toggle}
        aria-label={saved ? "Ukloni iz sačuvanih" : "Sačuvaj proizvod"}
        disabled={loading}
        className="w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-50 shrink-0"
        style={{
          borderColor: saved ? "#e11d1b" : "#e4e4e7",
          backgroundColor: saved ? "#fff1f1" : "white",
          color: saved ? "#e11d1b" : "#a1a1aa",
        }}
      >
        <Heart size={18} strokeWidth={1.8} fill={saved ? "#e11d1b" : "none"} />
      </button>
    );
  }

  if (showLabel) {
    return (
      <button
        onClick={toggle}
        aria-label={saved ? "Ukloni iz sačuvanih" : "Sačuvaj proizvod"}
        disabled={loading}
        className="flex items-center gap-2 h-10 px-4 rounded-xl border transition-all duration-200 disabled:opacity-50 text-sm font-medium"
        style={{
          borderColor: saved ? "#e11d1b" : "#e4e4e7",
          color: saved ? "#e11d1b" : "#71717a",
          backgroundColor: saved ? "#fff1f1" : "white",
        }}
      >
        <Heart size={15} strokeWidth={1.8} fill={saved ? "#e11d1b" : "none"} />
        {saved ? "Sačuvano" : "Sačuvaj"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
      disabled={loading}
      className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 shadow-sm disabled:opacity-50"
      style={{ color: saved ? "#e11d1b" : undefined }}
    >
      <Heart
        size={15}
        strokeWidth={1.8}
        className={saved ? "" : "text-zinc-400 hover:text-rose-500 transition-colors duration-200"}
        fill={saved ? "#e11d1b" : "none"}
      />
    </button>
  );
}
