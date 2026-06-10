import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default async function FeaturedProducts() {
  const { data: products } = await getProducts({ isFeatured: true, limit: 12 });

  const items = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category?.name ?? "",
    price: formatPrice(p.price),
    image: p.images[0] ?? "/images/img4.png",
    stock: p.stock,
    badge: p.discountPercent ? `−${p.discountPercent}%` : null,
    href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
  }));

  return (
    <ProductCarousel
      items={items}
      subtitle="Izdvojeno"
      title="Popularni proizvodi"
      viewAllHref="/proizvodi"
      viewAllLabel="Svi proizvodi"
    />
  );
}
