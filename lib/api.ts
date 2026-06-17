import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// ─── Response envelopes ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta?: ApiMeta;
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  icon: string | null;
  isActive: boolean;
  sortOrder: number;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  parent?: ApiCategory | null;
  children?: ApiCategory[];
}

export interface ApiProductBrand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  website: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProductVariant {
  name: string;
  type?: string;
  imageUrl?: string | null;
  productId?: string | null;
}

export interface ApiProductSpec {
  key: string;
  value: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: string;
  salePrice: string | null;
  saleDiscountPercent: number | null;
  discountPercent: number | null;
  clearancePrice: string | null;
  clearanceDiscountPercent: number | null;
  saleEndsAt: string | null;
  sku: string;
  stock: number;
  inStock: boolean;
  variants: ApiProductVariant[];
  specifications: ApiProductSpec[];
  brandId: string;
  width: number | null;
  height: number | null;
  thickness: number | null;
  material: string | null;
  finish: string | null;
  usage: string | null;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category?: ApiCategory;
  brand?: ApiProductBrand;
}

// ─── Query params for GET /products ──────────────────────────────────────────

// ─── Attributes ───────────────────────────────────────────────────────────────

export interface ApiAttributeValue {
  id: string;
  value: string;
  sortOrder?: number;
  attributeId?: string;
}

export interface ApiAttribute {
  id: string;
  name: string;
  slug?: string;
  sortOrder?: number;
  values: ApiAttributeValue[];
}

export interface ProductsQuery {
  categoryId?: string;
  attributeValueIds?: string[];
  brandIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  finish?: string;
  usage?: string;
  isFeatured?: boolean;
  search?: string;
  sortBy?: "newest" | "oldest" | "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}

// ─── Image URL normalizer ────────────────────────────────────────────────────
// The backend stores image URLs with whatever APP_URL was set at upload time.
// Normalize them to always point to the backend at port 3001.
import { fixImageUrl } from "./utils";

export { fixImageUrl };

function fixProduct(p: ApiProduct): ApiProduct {
  return { ...p, images: p.images.map(fixImageUrl) };
}

function fixProducts<T extends ApiListResponse<ApiProduct>>(res: T): T {
  return { ...res, data: res.data.map(fixProduct) };
}

// ─── Low-level fetch helper ───────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(
  query: ProductsQuery = {}
): Promise<ApiListResponse<ApiProduct>> {
  const params = new URLSearchParams();
  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.attributeValueIds?.length) {
    query.attributeValueIds.forEach((id) => params.append("attributeValueIds", id));
  }
  if (query.brandIds?.length) {
    query.brandIds.forEach((id) => params.append("brandIds", id));
  }
  if (query.minPrice !== undefined) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice !== undefined) params.set("maxPrice", String(query.maxPrice));
  if (query.material) params.set("material", query.material);
  if (query.finish) params.set("finish", query.finish);
  if (query.usage) params.set("usage", query.usage);
  if (query.isFeatured !== undefined) params.set("isFeatured", String(query.isFeatured));
  if (query.search) params.set("search", query.search);
  if (query.sortBy) params.set("sortBy", query.sortBy);
  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 20));

  return apiFetch<ApiListResponse<ApiProduct>>(`/products?${params.toString()}`, { cache: "no-store" }).then(fixProducts);
}

export async function getProductById(id: string): Promise<ApiResponse<ApiProduct>> {
  "use cache";
  cacheLife("hours");

  return apiFetch<ApiResponse<ApiProduct>>(`/products/${id}`).then(r => ({ ...r, data: fixProduct(r.data) }));
}

export async function getProductBySlug(slug: string): Promise<ApiResponse<ApiProduct>> {
  "use cache";
  cacheLife("hours");

  return apiFetch<ApiResponse<ApiProduct>>(`/products/slug/${slug}`).then(r => ({ ...r, data: fixProduct(r.data) }));
}

export async function getProductRecommended(productId: string, limit = 8): Promise<ApiProduct[]> {
  const res = await apiFetch<ApiListResponse<ApiProduct>>(`/products/${productId}/recommended?limit=${limit}`, { cache: "no-store" });
  return res.data.map(fixProduct);
}

export interface OnSaleQuery {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  attributeValueIds?: string[];
  search?: string;
  sortBy?: "discount" | "ending_soon" | "price_asc" | "price_desc" | "newest";
  page?: number;
  limit?: number;
}

export async function getOnSaleProducts(query: OnSaleQuery = {}): Promise<ApiListResponse<ApiProduct>> {
  const params = new URLSearchParams();
  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.brandId) params.set("brandId", query.brandId);
  if (query.minPrice !== undefined) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice !== undefined) params.set("maxPrice", String(query.maxPrice));
  if (query.attributeValueIds?.length) params.set("attributeValueIds", query.attributeValueIds.join(","));
  if (query.search) params.set("search", query.search);
  if (query.sortBy) params.set("sortBy", query.sortBy);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  const qs = params.toString();
  return apiFetch<ApiListResponse<ApiProduct>>(`/products/on-sale${qs ? `?${qs}` : ""}`, { cache: "no-store" }).then(fixProducts);
}

export interface ApiOnSaleFilters {
  brands: { id: string; name: string }[];
  priceRange: { min: number; max: number };
  attributes: ApiAttribute[];
}

export async function getOnSaleFilters(): Promise<ApiOnSaleFilters> {
  return apiFetch<ApiOnSaleFilters>("/filters?onSale=true", { cache: "no-store" });
}

export interface ClearanceQuery {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  attributeValueIds?: string[];
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "newest";
  page?: number;
  limit?: number;
}

export async function getClearanceProducts(query: ClearanceQuery = {}): Promise<ApiListResponse<ApiProduct>> {
  const params = new URLSearchParams();
  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.brandId) params.set("brandId", query.brandId);
  if (query.minPrice !== undefined) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice !== undefined) params.set("maxPrice", String(query.maxPrice));
  if (query.attributeValueIds?.length) params.set("attributeValueIds", query.attributeValueIds.join(","));
  if (query.search) params.set("search", query.search);
  if (query.sortBy) params.set("sortBy", query.sortBy);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  const qs = params.toString();
  return apiFetch<ApiListResponse<ApiProduct>>(`/products/clearance${qs ? `?${qs}` : ""}`, { cache: "no-store" }).then(fixProducts);
}

export async function getClearanceFilters(): Promise<ApiOnSaleFilters> {
  return apiFetch<ApiOnSaleFilters>("/filters?onClearance=true", { cache: "no-store" });
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<ApiListResponse<ApiCategory>> {
  return apiFetch<ApiListResponse<ApiCategory>>("/categories", { cache: "no-store" });
}

export async function getCategoryTree(): Promise<ApiListResponse<ApiCategory>> {
  "use cache";
  cacheLife("days");

  return apiFetch<ApiListResponse<ApiCategory>>("/categories/tree");
}

export async function getCategoryBySlug(slug: string): Promise<ApiResponse<ApiCategory>> {
  "use cache";
  cacheLife("days");

  return apiFetch<ApiResponse<ApiCategory>>(`/categories/slug/${slug}`);
}

// ─── Brands ───────────────────────────────────────────────────────────────────

function fixBrand(b: ApiProductBrand): ApiProductBrand {
  return { ...b, logoUrl: b.logoUrl ? fixImageUrl(b.logoUrl) : null };
}

export async function getActiveBrands(): Promise<ApiListResponse<ApiProductBrand>> {
  "use cache";
  cacheLife("hours");

  const res = await apiFetch<ApiListResponse<ApiProductBrand>>("/brands/active");
  return { ...res, data: res.data.map(fixBrand) };
}

// ─── Footer settings ──────────────────────────────────────────────────────────

export interface ApiFooterSettings {
  description: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  street: string;
  city: string;
  phone: string;
  email: string;
  pib: string;
  mb: string;
}

export interface ApiSlide {
  id: string;
  imageUrl: string;
  title: string | null;
  subtitle: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export async function getFooterSettings(): Promise<ApiResponse<ApiFooterSettings>> {
  "use cache";
  cacheLife("hours");

  return apiFetch<ApiResponse<ApiFooterSettings>>("/footer");
}

export async function getSlider(): Promise<ApiListResponse<ApiSlide>> {
  return apiFetch<ApiListResponse<ApiSlide>>("/slider", { cache: "no-store" });
}

export interface WorkingHoursDisplay {
  days: string;
  hours: string;
  isOpen: boolean;
  note: string | null;
}

export async function getWorkingHoursDisplay(): Promise<ApiListResponse<WorkingHoursDisplay>> {
  "use cache";
  cacheLife("hours");

  return apiFetch<ApiListResponse<WorkingHoursDisplay>>("/working-hours/display");
}

// ─── Attributes ───────────────────────────────────────────────────────────────

export async function getAttributes(): Promise<ApiListResponse<ApiAttribute>> {
  "use cache";
  cacheLife("hours");

  return apiFetch<ApiListResponse<ApiAttribute>>("/attributes");
}
