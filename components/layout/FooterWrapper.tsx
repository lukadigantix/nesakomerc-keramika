import { getCategoryTree, getFooterSettings, getWorkingHoursDisplay } from "@/lib/api";
import Footer from "./Footer";

export default async function FooterWrapper() {
  const [{ data: categories }, footerRes, { data: workingHours }] = await Promise.all([
    getCategoryTree(),
    getFooterSettings(),
    getWorkingHoursDisplay(),
  ]);

  const settings = footerRes.data ?? {
    description: "",
    facebook: "", instagram: "", twitter: "", tiktok: "",
    street: "", city: "", phone: "", email: "", pib: "", mb: "",
  };

  const footerCategories = categories.map((cat) => ({
    label: cat.name,
    href: `/proizvodi/${cat.slug}`,
  }));

  return <Footer categories={footerCategories} settings={settings} workingHours={workingHours} />;
}
