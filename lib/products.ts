export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  image: string;
}

export interface Category {
  label: string;
  slug: string;
}

export const categories: Category[] = [
  { label: "Baterije", slug: "baterije" },
  { label: "Ormarići sa umivaonikom", slug: "ormarici-sa-umivaonikom" },
  { label: "Ormarići za lavaboe", slug: "ormarici-za-lavaboe" },
  { label: "Ogledala sa ormarićem", slug: "ogledala-sa-ormaricem" },
  { label: "Klasična i LED Ogledala", slug: "klasicna-i-led-ogledala" },
  { label: "Vertikale", slug: "vertikale" },
  { label: "Tuš kabine i tuš kade", slug: "tus-kabine-i-tus-kade" },
  { label: "Samostojeće kade", slug: "samostojece-kade" },
  { label: "Sanitarije", slug: "sanitarije" },
  { label: "Keramika", slug: "keramika" },
  { label: "Slivnici", slug: "slivnici" },
  { label: "Galanterija", slug: "galanterija" },
];

export const products: Product[] = [
  { id: 1, name: "Mešalica za umivaonik Roca L90", category: "Baterije", categorySlug: "baterije", price: "8.490 RSD", image: "/images/img4.png" },
  { id: 2, name: "Tuš kabina Ravak Blix", category: "Tuš kabine i tuš kade", categorySlug: "tus-kabine-i-tus-kade", price: "62.900 RSD", image: "/images/img5.png" },
  { id: 3, name: "Wc šolja Geberit Selnova", category: "Sanitarije", categorySlug: "sanitarije", price: "24.200 RSD", image: "/images/img4.png" },
  { id: 4, name: "LED Ogledalo Miior 80×60", category: "Klasična i LED Ogledala", categorySlug: "klasicna-i-led-ogledala", price: "18.700 RSD", image: "/images/img5.png" },
  { id: 5, name: "Samostojeća kada Kaldewei", category: "Samostojeće kade", categorySlug: "samostojece-kade", price: "134.000 RSD", image: "/images/img4.png" },
  { id: 6, name: "Peškir radijator Zehnder", category: "Vertikale", categorySlug: "vertikale", price: "41.500 RSD", image: "/images/img5.png" },
  { id: 7, name: "Podna keramika Porcelanosa", category: "Keramika", categorySlug: "keramika", price: "3.200 RSD/m²", image: "/images/img4.png" },
  { id: 8, name: "Slivnik Viega Advantix", category: "Slivnici", categorySlug: "slivnici", price: "9.800 RSD", image: "/images/img5.png" },
  { id: 9, name: "Mešalica Grohe Eurosmart", category: "Baterije", categorySlug: "baterije", price: "12.900 RSD", image: "/images/img5.png" },
  { id: 10, name: "Tuš sistem Hansgrohe Raindance", category: "Tuš kabine i tuš kade", categorySlug: "tus-kabine-i-tus-kade", price: "54.700 RSD", image: "/images/img4.png" },
  { id: 11, name: "Wc šolja Villeroy & Boch Subway 3.0", category: "Sanitarije", categorySlug: "sanitarije", price: "38.500 RSD", image: "/images/img5.png" },
  { id: 12, name: "Ogledalni ormarić Burgbad", category: "Ogledala sa ormarićem", categorySlug: "ogledala-sa-ormaricem", price: "29.200 RSD", image: "/images/img4.png" },
  { id: 13, name: "Akrilna kada Ravak Chrome", category: "Samostojeće kade", categorySlug: "samostojece-kade", price: "89.000 RSD", image: "/images/img5.png" },
  { id: 14, name: "Kupaonski nameštaj Pelipal", category: "Ormarići sa umivaonikom", categorySlug: "ormarici-sa-umivaonikom", price: "67.300 RSD", image: "/images/img4.png" },
  { id: 15, name: "Zidna keramika Aparici", category: "Keramika", categorySlug: "keramika", price: "4.800 RSD/m²", image: "/images/img5.png" },
  { id: 16, name: "Termostatska baterija Duravit", category: "Baterije", categorySlug: "baterije", price: "31.500 RSD", image: "/images/img4.png" },
  { id: 17, name: "Ormarić za lavabo Geberit", category: "Ormarići za lavaboe", categorySlug: "ormarici-za-lavaboe", price: "22.400 RSD", image: "/images/img5.png" },
  { id: 18, name: "Slivnik linearni ACO", category: "Slivnici", categorySlug: "slivnici", price: "14.600 RSD", image: "/images/img4.png" },
  { id: 19, name: "Galanterija Grohe Essentials", category: "Galanterija", categorySlug: "galanterija", price: "6.900 RSD", image: "/images/img5.png" },
  { id: 20, name: "LED Ogledalo Laufen Frame 25", category: "Klasična i LED Ogledala", categorySlug: "klasicna-i-led-ogledala", price: "26.800 RSD", image: "/images/img4.png" },
  { id: 21, name: "Vertikala Zehnder Charleston", category: "Vertikale", categorySlug: "vertikale", price: "58.200 RSD", image: "/images/img5.png" },
  { id: 22, name: "Ormarić sa umivaonikom Roca", category: "Ormarići sa umivaonikom", categorySlug: "ormarici-sa-umivaonikom", price: "44.900 RSD", image: "/images/img4.png" },
  { id: 23, name: "Sanitarni set Ideal Standard", category: "Sanitarije", categorySlug: "sanitarije", price: "31.700 RSD", image: "/images/img5.png" },
  { id: 24, name: "Galanterija Hansgrohe Logis", category: "Galanterija", categorySlug: "galanterija", price: "9.200 RSD", image: "/images/img4.png" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
