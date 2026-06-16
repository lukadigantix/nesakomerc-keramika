import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default async function FeaturedProducts() {
  const { data: products } = await getProducts({ isFeatured: true, limit: 24 });

  const items = products.filter((p) => p.inStock).slice(0, 12).map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category?.name ?? "",
    price: formatPrice(p.salePrice ?? p.price),
    originalPrice: p.salePrice ? formatPrice(p.price) : undefined,
    image: p.images[0] ?? "/images/img4.png",
    stock: p.stock,
    inStock: p.inStock,
    badge: (p.saleDiscountPercent ?? 0) > 0 ? `−${p.saleDiscountPercent}%` : p.salePrice ? "Akcija" : undefined,
    href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
  }));

  return (
    <ProductCarousel
      items={items}
      subtitle="Izdvojeno"
      title="Preporučeni proizvodi"
      viewAllHref="/proizvodi"
      viewAllLabel="Svi proizvodi"
    />
  );
}
