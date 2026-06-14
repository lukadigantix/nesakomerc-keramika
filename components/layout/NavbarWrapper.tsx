import { getCategoryTree } from "@/lib/api";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const { data: categories } = await getCategoryTree();

  const navCategories = categories.map((cat) => ({
    label: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    children: (cat.children ?? []).map((child) => ({
      label: child.name,
      slug: child.slug,
      icon: child.icon,
    })),
  }));

  return <Navbar categories={navCategories} />;
}
