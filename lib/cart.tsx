"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./auth";
import { fixImageUrl } from "./utils";

export interface CartItem {
  id: string;          // product id
  cartItemId?: string; // API cart item UUID (used for PUT/DELETE)
  name: string;
  category: string;
  price: string;
  image: string;
  sku?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, "quantity" | "cartItemId">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "nk_cart";
const BASE = process.env.NEXT_PUBLIC_API_URL;

interface ApiCartItem {
  id: string;
  productId?: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    sku?: string;
    images?: string[];
    category?: { name: string; slug: string };
  };
}

function mapApiItems(apiItems: ApiCartItem[]): CartItem[] {
  return apiItems.map((item) => ({
    id: item.product?.id ?? item.productId ?? item.id,
    cartItemId: item.id,
    name: item.product?.name ?? "Artikal",
    category: item.product?.category?.name ?? "",
    price: item.product?.price != null
      ? `${Math.round(item.product.price).toLocaleString("sr-RS")} RSD`
      : "",
    image: fixImageUrl(item.product?.images?.[0] ?? ""),
    sku: item.product?.sku,
    quantity: item.quantity,
  }));
}

function getLocalItems(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('[cart] getLocalItems raw:', stored);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed;
    // Backward compat: { items: [], loggedIn: bool } format
    if (Array.isArray(parsed?.items)) return parsed.items;
    return [];
  } catch {
    return [];
  }
}

function authHdr(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const prevToken = useRef<string | null | undefined>(undefined);
  const userModified = useRef(false);

  // Step 1: Load cart from localStorage once on client (runs before auth resolves)
  useEffect(() => {
    const loaded = getLocalItems();
    console.log('[cart] Step1 load from localStorage:', loaded);
    setItems(loaded);
    setCartLoaded(true);
  }, []);

  // Step 2: Sync with server once auth is resolved
  useEffect(() => {
    console.log('[cart] Step2 check — cartLoaded:', cartLoaded, 'authLoading:', authLoading, 'token:', token ? 'SET' : 'null');
    if (!cartLoaded || authLoading) return;

    const prev = prevToken.current;
    prevToken.current = token;
    console.log('[cart] Step2 proceeding — prev:', prev, 'token:', token ? 'SET' : 'null');

    if (token) {
      const pendingItems = prev === null ? getLocalItems() : [];
      console.log('[cart] Step2 → syncAndLoad, pendingItems:', pendingItems.length);
      userModified.current = false;
      syncAndLoad(token, pendingItems);
    } else {
      if (prev !== undefined && prev !== null) {
        console.log('[cart] Step2 → logged out, clearing');
        localStorage.removeItem(STORAGE_KEY);
        setItems([]);
      }
      // Initial guest mount: items already loaded by Step 1
    }
  }, [token, authLoading, cartLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Step 3: Persist to localStorage — guarded by cartLoaded to never overwrite with []
  useEffect(() => {
    if (!cartLoaded) return;
    console.log('[cart] Step3 persist — saving items:', items.length);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* ignore SSR */ }
  }, [items, cartLoaded]);

  async function syncAndLoad(tok: string, pending: CartItem[]) {
    // Send local items to server first (ignore individual failures)
    if (pending.length > 0) {
      await Promise.all(
        pending.map((item) =>
          fetch(`${BASE}/cart/items`, {
            method: "POST",
            headers: authHdr(tok),
            body: JSON.stringify({ productId: item.id, quantity: item.quantity }),
          }).catch(() => {})
        )
      );
      localStorage.removeItem(STORAGE_KEY);
    }
    // Fetch cart from API — only set state if user hasn't made changes in the meantime
    try {
      const r = await fetch(`${BASE}/cart`, { headers: { Authorization: `Bearer ${tok}` } });
      const data = await r.json();
      if (!userModified.current) {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // Server has items — use them as source of truth
          setItems(mapApiItems(data.data));
        } else if (pending.length > 0) {
          // We synced pending items but server still empty — fallback to pending
          setItems(pending);
        }
        // If server is empty and no pending: keep current state (localStorage items)
        // This prevents wiping the cart when a previous POST failed (e.g. out of stock)
      }
    } catch {
      if (!userModified.current && pending.length > 0) setItems(pending);
    }
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback((product: Omit<CartItem, "quantity" | "cartItemId">) => {
    userModified.current = true;
    // Always update local state immediately (optimistic)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    // Sync with API in background; use response to store cartItemId
    if (token) {
      const body = { productId: product.id, quantity: 1 };
      console.log('[cart] addItem POST body:', body, 'token present:', !!token);
      fetch(`${BASE}/cart/items`, {
        method: "POST",
        headers: authHdr(token),
        body: JSON.stringify(body),
      })
        .then(async (r) => {
          const data = await r.json();
          console.log('[cart] addItem POST response:', r.status, data);
          if (!r.ok) {
            // Revert the optimistic update — API rejected the item (e.g. out of stock)
            setItems((prev) => {
              const existing = prev.find((i) => i.id === product.id);
              if (!existing) return prev;
              if (existing.quantity <= 1) return prev.filter((i) => i.id !== product.id);
              return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i);
            });
            return;
          }
          // Patch cartItemId into the existing state entry
          const cartItemId: string | undefined = data?.data?.id ?? data?.id;
          if (cartItemId) {
            setItems((prev) =>
              prev.map((i) => i.id === product.id ? { ...i, cartItemId } : i)
            );
          }
        })
        .catch((err) => console.error('[cart] addItem POST error:', err));
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const removeItem = useCallback((productId: string) => {
    const item = items.find((i) => i.id === productId);
    if (token && item?.cartItemId) {
      fetch(`${BASE}/cart/items/${item.cartItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, [token, items]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) { removeItem(productId); return; }
    const item = items.find((i) => i.id === productId);
    if (token && item?.cartItemId) {
      fetch(`${BASE}/cart/items/${item.cartItemId}`, {
        method: "PUT",
        headers: authHdr(token),
        body: JSON.stringify({ quantity }),
      }).catch(() => {});
    }
    setItems((prev) => prev.map((i) => i.id === productId ? { ...i, quantity } : i));
  }, [token, items, removeItem]);

  const clearCart = useCallback(() => {
    if (token) {
      fetch(`${BASE}/cart`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setItems([]);
  }, [token]);

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
