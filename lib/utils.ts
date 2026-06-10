import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a decimal price string from the API into Serbian locale display.
 * e.g. "13645.00" → "13.645 RSD"
 */
export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return String(price);
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " RSD";
}

const IMAGE_BASE = "http://localhost:3001";
const IMAGE_ORIGIN_RE = /^https?:\/\/[^/]+(?=\/uploads\/)/;

export function fixImageUrl(url: string): string {
  return url.replace(IMAGE_ORIGIN_RE, IMAGE_BASE);
}
