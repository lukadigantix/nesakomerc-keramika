import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nesakomerckeramika.rs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/proizvodi`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/akcija`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/rasprodaja`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/nasi-brendovi`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/o-nama`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/politika-privatnosti`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/uslovi-koristenja`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/reklamacije`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  try {
    const [categoriesRes, productsRes] = await Promise.all([
      getCategories(),
      getProducts({ limit: 9999 }),
    ]);

    const categoryUrls: MetadataRoute.Sitemap = categoriesRes.data
      .filter((cat) => cat.isActive)
      .map((cat) => ({
        url: `${siteUrl}/proizvodi/${cat.slug}`,
        lastModified: new Date(cat.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    const productUrls: MetadataRoute.Sitemap = productsRes.data
      .filter((p) => p.isActive && p.category)
      .map((p) => ({
        url: `${siteUrl}/proizvodi/${p.category!.slug}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    return [...staticPages, ...categoryUrls, ...productUrls];
  } catch {
    return staticPages;
  }
}
