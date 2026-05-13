import { Truck, Tag, CreditCard } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

const features = [
  {
    icon: Truck,
    label: "Povoljna isporuka",
    description: "Brza i sigurna dostava na vašu adresu",
  },
  {
    icon: Tag,
    label: "Outlet ponuda",
    description: "Proizvodi po sniženim cenama iz naše outlet selekcije",
  },
  {
    icon: CreditCard,
    label: "Načini plaćanja",
    description: "Gotovina, kartica ili na rate bez kamate",
  },
];

export default function FeaturesBar() {
  return (
    <section className="border-b border-zinc-100">
      <Wrapper>
        <div className="grid grid-cols-3 divide-x divide-zinc-100 py-12">
          {features.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex items-center gap-5 px-10 group cursor-default"
            >
              <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-zinc-50 text-zinc-400 transition-colors duration-200 group-hover:bg-[#e11d1b] group-hover:text-white">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold tracking-wide text-zinc-950 uppercase">
                  {label}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
