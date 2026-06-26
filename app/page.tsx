import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import FeaturesBar from "@/components/sections/FeaturesBar";
import CategoriesShowcase from "@/components/sections/CategoriesShowcase";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import NewArrivals from "@/components/sections/NewArrivals";
import ShowcaseCarousel from "@/components/sections/ShowcaseCarousel";
import BrandsSection from "@/components/sections/BrandsSection";
import AboutSection from "@/components/sections/AboutSection";
import { getSlider } from "@/lib/api";

export const metadata: Metadata = {
  title: "Neša Komerc Keramika — Keramika i kupatilska oprema, Svilajnac",
  description:
    "Specijalizovani salon za keramiku i kupatilsku opremu u Svilajncu. Preko 5.000 proizvoda — pločice, sanitarije, baterije, kade, tuš kabine, ogledala i kupatilski nameštaj vodećih svetskih brendova. Brza dostava širom Srbije.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Neša Komerc Keramika — Keramika i kupatilska oprema, Svilajnac",
    description:
      "Specijalizovani salon za keramiku i kupatilsku opremu. Preko 5.000 proizvoda vodećih svetskih brendova. Brza dostava širom Srbije.",
    url: "/",
    type: "website",
  },
};

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
