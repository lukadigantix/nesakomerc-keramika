import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default async function NewArrivals() {
  const { data: products } = await getProducts({ limit: 12 });

  const items = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category?.name ?? "",
    price: formatPrice(p.price),
    image: p.images[0] ?? "/images/img4.png",
    stock: p.stock,
    inStock: p.inStock,
    badge: p.salePrice ? "Akcija" : undefined,
    href: `/proizvodi/${p.category?.slug ?? ""}/${p.slug}`,
  }));

  return (
    <ProductCarousel
      items={items}
      subtitle="Asortiman"
      title="Novo u ponudi"
      viewAllHref="/proizvodi"
      viewAllLabel="Svi proizvodi"
    />
  );
}
