import { Truck, Tag, CreditCard, ShieldCheck } from "lucide-react";
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
    icon: ShieldCheck,
    label: "Garantovani kvalitet",
    description: "Svi proizvodi prolaze strogu kontrolu kvaliteta",
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-[#3d3d3d]">
      <Wrapper>
        <div className="grid grid-cols-1 min-[1100px]:grid-cols-4 divide-y min-[1100px]:divide-y-0 min-[1100px]:divide-x divide-white/20 py-6 min-[1100px]:py-12">
          {features.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-4 min-[1100px]:px-6 xl:px-10 py-5 min-[1100px]:py-0 group cursor-default"
            >
              <div className="flex items-center justify-center w-11 h-11 min-[1100px]:w-14 min-[1100px]:h-14 shrink-0 rounded-xl min-[1100px]:rounded-2xl bg-[#e11d1b] text-white transition-colors duration-200 group-hover:bg-[#bf1917]">
                <Icon size={20} strokeWidth={1.5} className="min-[1100px]:hidden" />
                <Icon size={24} strokeWidth={1.5} className="hidden min-[1100px]:block" />
              </div>
              <div className="flex flex-col gap-0.5 min-[1100px]:gap-1">
                <p className="text-sm font-semibold tracking-wide text-white uppercase">
                  {label}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
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
