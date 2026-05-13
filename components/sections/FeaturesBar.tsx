import { Truck, Tag, CreditCard, Mail } from "lucide-react";
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
  {
    icon: Mail,
    label: "Newsletter prijava",
    description: "Budite prvi koji saznaju za nove akcije i novitete",
  },
];

export default function FeaturesBar() {
  return (
    <section className="border-b border-zinc-100">
      <Wrapper>
        <div className="grid grid-cols-4 divide-x divide-zinc-100 py-12">
          {features.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 px-10 text-center group cursor-default"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-50 text-zinc-400 transition-colors duration-200 group-hover:bg-[#ed2c18] group-hover:text-white">
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
