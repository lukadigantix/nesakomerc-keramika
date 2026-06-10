// Client-safe shipping API — no "use cache" directives so this can be
// imported from Client Components (e.g. useEffect fetches).

export interface ApiShippingMethod {
  id: string;
  type: "pickup" | "courier" | string;
  name: string;
  description: string | null;
  price: string;
  freeAbove: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getShippingMethods(): Promise<ApiListResponse<ApiShippingMethod>> {
  const res = await fetch(`${BASE_URL}/shipping-methods`);
  if (!res.ok) throw new Error(`Failed to fetch shipping methods: ${res.status}`);
  return res.json();
}
