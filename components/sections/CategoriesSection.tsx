import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import { getCategories } from "@/lib/api";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  "slavine-baterije": FaucetIcon,
  "sanitarije": ToiletIcon,
  "keramika": TileIcon,
  "tus-kabine-i-tus-kade": ShowerIcon,
  "samostojece-kade": BathtubIcon,
  "klasicna-i-led-ogledala": OvalMirrorIcon,
  "ormarici-sa-umivaonikom": VanityCabinetIcon,
  "galanterija": AccessoriesIcon,
  "vertikale": TowelRadiatorIcon,
  "slivnici": DrainIcon,
  "ormarici-za-lavaboe": SinkCabinetIcon,
  "ogledala-sa-ormaricem": MirrorCabinetIcon,
};

const DEFAULT_ICON = TileIcon;

export default async function CategoriesSection() {
  const { data: categories } = await getCategories();

  return (
    <section className="pt-16 max-[1329px]:pt-8 pb-4" style={{ backgroundColor: "#fafafa" }}>
      <Wrapper>
        {/* Header */}
        <div className="flex items-end justify-between mb-6 max-[1329px]:mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Kategorije
            </p>
            <h2 className="text-4xl max-[1329px]:text-2xl font-bold text-zinc-950 leading-tight">
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
        {/* <div className="grid grid-cols-6 max-[1329px]:grid-cols-4 max-[639px]:grid-cols-3 gap-3 max-[1329px]:gap-2">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.slug] ?? DEFAULT_ICON;
            return (
              <Link
                key={cat.slug}
                href={`/proizvodi/${cat.slug}`}
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border hover:border-zinc-200 hover:shadow-md bg-white transition-all duration-200 text-center aspect-5/4 overflow-hidden"
                style={{ borderColor: "#e6e6e6" }}
              >
                <span className="relative flex items-center justify-center w-14 h-14 rounded-xl border border-zinc-100 group-hover:border-zinc-200 bg-zinc-50 group-hover:bg-zinc-100 transition-all duration-200 text-zinc-500 group-hover:text-zinc-900 shadow-sm">
                  <Icon size={26} strokeWidth={1.4} />
                </span>
                <span className="relative text-[13px] font-medium leading-snug text-zinc-600 group-hover:text-zinc-950 transition-colors duration-200 px-3">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div> */}
      </Wrapper>
    </section>
  );
}
