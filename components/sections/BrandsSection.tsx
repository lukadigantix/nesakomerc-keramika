import Image from "next/image";
import { getActiveBrands } from "@/lib/api";

// Fallback display styles for text-only brands (no logo)
const TEXT_STYLES = [
  "font-black text-2xl tracking-widest",
  "font-light text-3xl tracking-tight",
  "font-semibold text-xl tracking-wide",
  "font-black text-3xl tracking-widest",
  "font-extralight text-2xl tracking-normal",
  "font-medium text-2xl tracking-wide",
  "font-bold text-2xl tracking-widest",
  "font-light text-3xl tracking-tight",
];

export default async function BrandsSection() {
  const { data: brands } = await getActiveBrands();

  // Need enough items for a seamless marquee — duplicate until we have ≥ 16
  const base = brands.length > 0 ? brands : [];
  if (base.length === 0) return null;

  const times = Math.ceil(16 / base.length);
  const doubled = Array.from({ length: times * 2 }, (_, i) => base[i % base.length]);

  return (
    <section className="py-20 border-t border-zinc-100 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />

        <div className="flex animate-marquee w-max">
          {doubled.map((brand, i) => (
            <div key={`${brand.id}-${i}`} className="flex items-center shrink-0 px-12">
              {brand.logoUrl ? (
                <div className="relative h-8 w-28 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
              ) : (
                <span
                  className={`${TEXT_STYLES[i % TEXT_STYLES.length]} text-zinc-200 hover:text-zinc-950 transition-colors duration-300 cursor-default whitespace-nowrap`}
                >
                  {brand.name}
                </span>
              )}
              <span className="ml-12 w-1 h-1 rounded-full bg-zinc-200 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

