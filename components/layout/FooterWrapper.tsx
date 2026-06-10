import { getCategories, getFooterSettings, getWorkingHoursDisplay } from "@/lib/api";
import Footer from "./Footer";

export default async function FooterWrapper() {
  const [{ data: categories }, { data: settings }, { data: workingHours }] = await Promise.all([
    getCategories(),
    getFooterSettings(),
    getWorkingHoursDisplay(),
  ]);

  const footerCategories = categories.map((cat) => ({
    label: cat.name,
    href: `/proizvodi/${cat.slug}`,
  }));

  return <Footer categories={footerCategories} settings={settings} workingHours={workingHours} />;
}
