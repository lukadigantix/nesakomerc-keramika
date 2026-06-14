import { getCategories } from "@/lib/api";
import CategoriesShowcaseClient from "./CategoriesShowcaseClient";

// Fallback slike po slugu ako kategorija nema imageUrl
const IMAGE_MAP: Record<string, string> = {
  "slavine-baterije": "/images/baterije2.png",
  "sanitarije": "/images/solje2.png",
  "lavaboi": "/images/lavaboi2.png",
  "samostojece-kade": "/images/kade2.png",
  "keramika": "/images/baterije2.png",
  "klasicna-i-led-ogledala": "/images/solje2.png",
  "vertikale": "/images/lavaboi2.png",
  "galanterija": "/images/kade2.png",
};

export default async function CategoriesShowcase() {
  const { data: categories } = await getCategories();

  // Samo root kategorije (bez parenta), sa slikom
  const slides = categories
    .filter((c) => c.isActive && !c.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      title: c.name,
      subtitle: c.description,
      image: c.imageUrl ?? IMAGE_MAP[c.slug] ?? "/images/img4.png",
      href: `/proizvodi/${c.slug}`,
    }));

  return <CategoriesShowcaseClient categories={slides} />;
}

