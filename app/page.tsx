import HeroSlider from "@/components/sections/HeroSlider";
import FeaturesBar from "@/components/sections/FeaturesBar";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import NewArrivals from "@/components/sections/NewArrivals";
import ShowcaseCarousel from "@/components/sections/ShowcaseCarousel";
import BrandsSection from "@/components/sections/BrandsSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <FeaturesBar />
      <CategoriesSection />
      <FeaturedProducts />
      <NewArrivals />
      <ShowcaseCarousel />
      <BrandsSection />
      <AboutSection />
    </main>
  );
}
