const brands = [
  { name: "GROHE", weight: "font-black", size: "text-2xl", tracking: "tracking-widest" },
  { name: "Hansgrohe", weight: "font-light", size: "text-3xl", tracking: "tracking-tight" },
  { name: "Villeroy & Boch", weight: "font-semibold", size: "text-xl", tracking: "tracking-wide" },
  { name: "ROCA", weight: "font-black", size: "text-3xl", tracking: "tracking-widest" },
  { name: "Duravit", weight: "font-extralight", size: "text-2xl", tracking: "tracking-normal" },
  { name: "Geberit", weight: "font-medium", size: "text-2xl", tracking: "tracking-wide" },
  { name: "RAVAK", weight: "font-bold", size: "text-2xl", tracking: "tracking-widest" },
  { name: "Argenta", weight: "font-light", size: "text-3xl", tracking: "tracking-tight" },
  { name: "LAUFEN", weight: "font-black", size: "text-xl", tracking: "tracking-[0.3em]" },
  { name: "Ideal Standard", weight: "font-thin", size: "text-2xl", tracking: "tracking-widest" },
  { name: "PORCELANOSA", weight: "font-semibold", size: "text-lg", tracking: "tracking-[0.25em]" },
  { name: "Copen", weight: "font-bold", size: "text-2xl", tracking: "tracking-wide" },
];

export default function BrandsSection() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-20 border-t border-zinc-100 overflow-hidden">
      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-marquee w-max">
          {doubled.map((brand, i) => (
            <div
              key={i}
              className="flex items-center shrink-0 px-12"
            >
              <span
                className={`${brand.weight} ${brand.size} ${brand.tracking} text-zinc-200 hover:text-zinc-950 transition-colors duration-300 cursor-default whitespace-nowrap`}
              >
                {brand.name}
              </span>
              {/* Separator dot */}
              <span className="ml-12 w-1 h-1 rounded-full bg-zinc-200 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
