import HeroSlider from "@/components/sections/HeroSlider";
import FeaturesBar from "@/components/sections/FeaturesBar";
import CategoriesShowcase from "@/components/sections/CategoriesShowcase";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import NewArrivals from "@/components/sections/NewArrivals";
import RecommendedProducts from "@/components/sections/RecommendedProducts";
import ShowcaseCarousel from "@/components/sections/ShowcaseCarousel";
import BrandsSection from "@/components/sections/BrandsSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <FeaturesBar />
      <CategoriesShowcase />
      <FeaturedProducts />
      <NewArrivals />
      <RecommendedProducts />
      <ShowcaseCarousel />
      <BrandsSection />
      <AboutSection />
    </main>
  );
}
