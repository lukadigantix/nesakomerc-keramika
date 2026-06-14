import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default async function RecommendedProducts() {
  const { data: source } = await getProducts({ limit: 12 });

  const items = source.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category?.name ?? "",
    price: formatPrice(p.price),
    image: p.images[0] ?? "/images/img4.png",
    stock: p.stock,
    inStock: p.inStock,
    badge: p.discountPercent ? `−${p.discountPercent}%` : undefined,
    href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
  }));

  return (
    <ProductCarousel
      items={items}
      subtitle="Izdvajamo"
      title="Preporučeni proizvodi"
      viewAllHref="/proizvodi"
      viewAllLabel="Svi proizvodi"
    />
  );
}
