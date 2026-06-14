import HeroSlider from "@/components/sections/HeroSlider";
import FeaturesBar from "@/components/sections/FeaturesBar";
import CategoriesShowcase from "@/components/sections/CategoriesShowcase";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import NewArrivals from "@/components/sections/NewArrivals";
import ShowcaseCarousel from "@/components/sections/ShowcaseCarousel";
import BrandsSection from "@/components/sections/BrandsSection";
import AboutSection from "@/components/sections/AboutSection";
import { getSlider } from "@/lib/api";

export default async function Home() {
  const { data: slides } = await getSlider().catch(() => ({ data: [] }));

  return (
    <main>
      <HeroSlider slides={slides} />
      <FeaturesBar />
      <CategoriesShowcase />
      <FeaturedProducts />
      <NewArrivals />
      <ShowcaseCarousel />
      <BrandsSection />
      <AboutSection />
    </main>
  );
}
