import { getCategories } from "@/lib/api";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const { data: categories } = await getCategories();

  const navCategories = categories.map((cat) => ({
    label: cat.name,
    slug: cat.slug,
  }));

  return <Navbar categories={navCategories} />;
}
