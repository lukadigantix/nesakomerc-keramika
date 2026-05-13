import Link from "next/link";
import Image from "next/image";
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
  { label: "Slavine i baterije", href: "/proizvodi/baterije", icon: FaucetIcon, image: "/images/Slavine i baterije.png" },
  { label: "Sanitarija", href: "/proizvodi/sanitarije", icon: ToiletIcon, image: "/images/Sanitarija.png" },
  { label: "Pločice i keramika", href: "/proizvodi/keramika", icon: TileIcon, image: "/images/plocice.png"  },
  { label: "Tuš kabine", href: "/proizvodi/tus-kabine-i-tus-kade", icon: ShowerIcon },
  { label: "Kade", href: "/proizvodi/samostojece-kade", icon: BathtubIcon },
  { label: "Ogledala", href: "/proizvodi/klasicna-i-led-ogledala", icon: OvalMirrorIcon },
  { label: "Kupatilski nameštaj", href: "/proizvodi/ormarici-sa-umivaonikom", icon: VanityCabinetIcon },
  { label: "Galanterija", href: "/proizvodi/galanterija", icon: AccessoriesIcon },
  { label: "Vertikale", href: "/proizvodi/vertikale", icon: TowelRadiatorIcon },
  { label: "Slivnici", href: "/proizvodi/slivnici", icon: DrainIcon },
  { label: "Oprema za kupatilo", href: "/proizvodi/ormarici-za-lavaboe", icon: SinkCabinetIcon },
  { label: "Ogledala sa ormarićem", href: "/proizvodi/ogledala-sa-ormaricem", icon: MirrorCabinetIcon },
];

export default function CategoriesSection() {
  return (
    <section className="pt-24 pb-12" style={{ backgroundColor: "#fafafa" }}>
      <Wrapper>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Kategorije
            </p>
            <h2 className="text-4xl font-bold text-zinc-950 leading-tight">
              Istražite asortiman
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
          {categories.map(({ label, href, icon: Icon, image }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border hover:border-zinc-200 hover:shadow-md bg-white transition-all duration-200 text-center aspect-[5/4] overflow-hidden"
              style={{ borderColor: "#e6e6e6" }}
            >
              {/* Icon or Image */}
              {image ? (
                <div className="relative w-24 h-24">
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <span className="relative flex items-center justify-center w-14 h-14 rounded-xl border border-zinc-100 group-hover:border-zinc-200 bg-zinc-50 group-hover:bg-zinc-100 transition-all duration-200 text-zinc-500 group-hover:text-zinc-900 shadow-sm">
                  <Icon size={26} strokeWidth={1.4} />
                </span>
              )}
              {/* Label */}
              <span className="relative text-[13px] font-medium leading-snug text-zinc-600 group-hover:text-zinc-950 transition-colors duration-200 px-3">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
