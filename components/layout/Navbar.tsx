"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
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
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Wrapper from "./Wrapper";
import SearchModal from "@/components/ui/SearchModal";

const productCategories = [
  { label: "Baterije", href: "baterije", icon: FaucetIcon },
  { label: "Ormarići sa umivaonikom", href: "ormarici-sa-umivaonikom", icon: VanityCabinetIcon },
  { label: "Ormarići za lavaboe", href: "ormarici-za-lavaboe", icon: SinkCabinetIcon },
  { label: "Ogledala sa ormarićem", href: "ogledala-sa-ormaricem", icon: MirrorCabinetIcon },
  { label: "Klasična i LED Ogledala", href: "klasicna-i-led-ogledala", icon: OvalMirrorIcon },
  { label: "Vertikale", href: "vertikale", icon: TowelRadiatorIcon },
  { label: "Tuš kabine i tuš kade", href: "tus-kabine-i-tus-kade", icon: ShowerIcon },
  { label: "Samostojeće kade", href: "samostojece-kade", icon: BathtubIcon },
  { label: "Sanitarije", href: "sanitarije", icon: ToiletIcon },
  { label: "Keramika", href: "keramika", icon: TileIcon },
  { label: "Slivnici", href: "slivnici", icon: DrainIcon },
  { label: "Galanterija", href: "galanterija", icon: AccessoriesIcon },
];

const navLinks = [
  { label: "Mesečna akcija", href: "/akcija" },
  { label: "Usluge", href: "/usluge" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOpen = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
      document.body.style.overflow = "";
    }, 120);
  };

  return (
    <>
      {/* Blur overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-[2px] bg-black/10 transition-opacity duration-200 pointer-events-none ${
          dropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        dropdownOpen || scrolled || !isHome ? "bg-white shadow-sm" : "bg-transparent"
      }`}>
      <div>
        <Wrapper>
          <nav className="relative flex items-center h-20">
            {/* Logo — levo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Nesa Komerc - Keramika"
                width={60}
                height={36}
                className="object-contain"
                priority
              />
            </Link>

            {/* Linkovi — centar */}
            <ul className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {/* Početna */}
              <li>
                <Link
                  href="/"
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-150 ${
                    dropdownOpen || scrolled || !isHome
                      ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                      : "text-white hover:bg-white/20 hover:text-white"
                  }`}
                >
                  Početna
                </Link>
              </li>

              <li onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                <Link
                  href="/proizvodi"
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-150 ${
                    dropdownOpen
                      ? "bg-zinc-100 text-zinc-950"
                      : scrolled || !isHome
                      ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                      : "text-white hover:bg-white/20 hover:text-white"
                  }`}
                >
                  Proizvodi
                </Link>
              </li>

              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-150 ${
                      dropdownOpen || scrolled || !isHome
                        ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                        : "text-white hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Ikonice — desno */}
            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 ${
                  dropdownOpen || scrolled || !isHome
                    ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Pretraga"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <Link
                href="/nalog"
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 ${
                  dropdownOpen || scrolled || !isHome
                    ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Nalog"
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
              <Link
                href="/korpa"
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 ${
                  dropdownOpen || scrolled || !isHome
                    ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Korpa"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
              </Link>
            </div>
          </nav>
        </Wrapper>
      </div>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-xl transition-all duration-200 ${
          dropdownOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <Wrapper>
          <div className="py-10">
            <p className="text-xl font-bold text-zinc-950 mb-7">
              Kategorije
            </p>
            <div className="grid grid-cols-4 gap-x-8 gap-y-3 pb-2">
              {productCategories.map((category) => (
                <Link
                  key={category.href}
                  href={`/proizvodi/${category.href}`}
                  className="group flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-600 transition-all duration-150"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#e11d1b"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 group-hover:bg-white/20 transition-colors duration-150 shrink-0 text-zinc-950 group-hover:text-white">
                    <category.icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium leading-tight">{category.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </header>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

