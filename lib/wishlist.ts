const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SavedProduct {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number;
    discountPercent?: number;
    saleDiscountPercent?: number;
    clearancePrice?: number;
    clearanceDiscountPercent?: number;
    stock: number;
    inStock: boolean;
    images: string[];
    category?: { name: string; slug: string };
  };
}

export async function getSavedProducts(token: string): Promise<SavedProduct[]> {
  const r = await fetch(`${BASE_URL}/saved-products`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!r.ok) return [];
  const data = await r.json();
  return data?.data ?? [];
}

export async function isSaved(productId: string, token: string): Promise<boolean> {
  const r = await fetch(`${BASE_URL}/saved-products/${productId}/is-saved`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!r.ok) return false;
  const data = await r.json();
  return data?.data?.saved === true;
}

export async function addToWishlist(productId: string, token: string): Promise<void> {
  await fetch(`${BASE_URL}/saved-products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
}

export async function removeFromWishlist(productId: string, token: string): Promise<void> {
  await fetch(`${BASE_URL}/saved-products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
