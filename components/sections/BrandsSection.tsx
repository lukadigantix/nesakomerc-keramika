import Image from "next/image";
import { getActiveBrands } from "@/lib/api";

export default async function BrandsSection() {
  const { data: brands } = await getActiveBrands();

  if (brands.length === 0) return null;

  // Repeat until we have at least 12 items in each half
  const minCount = 12;
  const times = Math.ceil(minCount / brands.length);
  const half = Array.from({ length: times }, () => brands).flat();
  // Two identical halves = seamless -50% translateX loop
  const items = [...half, ...half];

  // Duration scales with count so speed feels consistent
  const duration = Math.max(20, half.length * 3);

  return (
    <section className="py-16 border-t border-zinc-100 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />

        <div
          className="flex w-max animate-marquee"
          style={{ animationDuration: `${duration}s` }}
        >
          {items.map((brand, i) => (
            <div key={`${brand.id}-${i}`} className="flex items-center shrink-0 px-10">
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
                <span className="text-sm font-semibold tracking-widest uppercase text-zinc-300 hover:text-zinc-600 transition-colors duration-300 cursor-default whitespace-nowrap">
                  {brand.name}
                </span>
              )}
              <span className="ml-10 w-1 h-1 rounded-full bg-zinc-200 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

