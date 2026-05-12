import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import {
  FaucetIcon,
  VanityCabinetIcon,
  SinkCabinetIcon,
  MirrorCabinetIcon,
  OvalMirrorIcon,
  TowelRadiatorIcon,
  ShowerIcon,
  BathtubIcon,
  ToiletIcon,
  TileIcon,
  DrainIcon,
  AccessoriesIcon,
} from "@/components/icons/CategoryIcons";

const categories = [
  { label: "Baterije", href: "/proizvodi/baterije", icon: FaucetIcon },
  { label: "Ormarići sa umivaonikom", href: "/proizvodi/ormarici-sa-umivaonikom", icon: VanityCabinetIcon },
  { label: "Ormarići za lavaboe", href: "/proizvodi/ormarici-za-lavaboe", icon: SinkCabinetIcon },
  { label: "Ogledala sa ormarićem", href: "/proizvodi/ogledala-sa-ormaricem", icon: MirrorCabinetIcon },
  { label: "Klasična i LED Ogledala", href: "/proizvodi/klasicna-i-led-ogledala", icon: OvalMirrorIcon },
  { label: "Vertikale", href: "/proizvodi/vertikale", icon: TowelRadiatorIcon },
  { label: "Tuš kabine i tuš kade", href: "/proizvodi/tus-kabine-i-tus-kade", icon: ShowerIcon },
  { label: "Samostojeće kade", href: "/proizvodi/samostojece-kade", icon: BathtubIcon },
  { label: "Sanitarije", href: "/proizvodi/sanitarije", icon: ToiletIcon },
  { label: "Keramika", href: "/proizvodi/keramika", icon: TileIcon },
  { label: "Slivnici", href: "/proizvodi/slivnici", icon: DrainIcon },
  { label: "Galanterija", href: "/proizvodi/galanterija", icon: AccessoriesIcon },
];

export default function CategoriesSection() {
  return (
    <section className="py-24">
      <Wrapper>
        {/* Heading */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Asortiman
            </p>
            <h2 className="text-4xl font-bold text-zinc-950 leading-tight">
              Istražite kategorije
            </h2>
          </div>
          <Link
            href="/proizvodi"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors duration-150 pb-px border-b border-zinc-300 hover:border-zinc-950"
          >
            Svi proizvodi
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-6 gap-3">
          {categories.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-5 py-8 px-4 rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-950 hover:border-zinc-950 transition-all duration-200 text-center"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white group-hover:bg-white/10 transition-colors duration-200 text-zinc-500 group-hover:text-white">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium leading-snug text-zinc-700 group-hover:text-white transition-colors duration-200">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
