"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
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
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

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

interface NavCategory { label: string; slug: string; }

const navLinks = [
  { label: "Mesečna akcija", href: "/akcija" },
  { label: "Usluge", href: "/usluge" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const { count } = useCart();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileCatsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else if (!dropdownOpen) {
      document.body.style.overflow = "";
    }
  }, [mobileOpen, dropdownOpen]);

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

  const iconClass = (extra = "") =>
    `flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150 ${
      dropdownOpen || scrolled || !isHome || mobileOpen
        ? "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
        : "text-white hover:bg-white/20"
    } ${extra}`;

  return (
    <>
      {/* Desktop dropdown blur overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-[2px] bg-black/10 transition-opacity duration-200 pointer-events-none ${
          dropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        dropdownOpen || scrolled || !isHome || mobileOpen ? "bg-white shadow-sm" : "bg-transparent"
      }`}>
        <div>
          <Wrapper>
            <nav className="relative flex items-center h-20">

              {/* Logo */}
              <Link href="/" className="shrink-0">
                <Image
                  src="/nesa-komerc-logo.svg"
                  alt="Nesa Komerc - Keramika"
                  width={108}
                  height={65}
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Desktop nav links — centar */}
              <ul className="hidden min-[1330px]:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                <li>
                  <Link
                    href="/"
                    className={`text-[15px] font-medium px-4 py-2 rounded-full transition-all duration-150 ${
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
                    className={`text-[15px] font-medium px-4 py-2 rounded-full transition-all duration-150 ${
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
                      className={`text-[15px] font-medium px-4 py-2 rounded-full transition-all duration-150 ${
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

              {/* Desno — ikonice + hamburger */}
              <div className="ml-auto flex items-center gap-1">
                <button onClick={() => setSearchOpen(true)} className={iconClass()} aria-label="Pretraga">
                  <Search size={22} strokeWidth={1.5} />
                </button>
                <Link href={mounted && user ? "/nalog/dashboard" : "/nalog"} className={iconClass("hidden sm:flex")} aria-label="Nalog">
                  {mounted && user ? (
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ backgroundColor: "#e11d1b" }}>
                      {`${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()}
                    </span>
                  ) : (
                    <User size={22} strokeWidth={1.5} />
                  )}
                </Link>
                <Link href="/korpa" className={iconClass("relative")} aria-label="Korpa">
                  <ShoppingBag size={22} strokeWidth={1.5} />
                  {mounted && count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full text-[10px] font-bold text-white leading-none" style={{ backgroundColor: "#e11d1b" }}>
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </Link>

                {/* Hamburger — samo mobile */}
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className={`${iconClass()} min-[1330px]:hidden`}
                  aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
                >
                  {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                </button>
              </div>

            </nav>
          </Wrapper>
        </div>

        {/* Desktop dropdown panel */}
        <div
          className={`hidden min-[1330px]:block absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-xl transition-all duration-200 ${
            dropdownOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <Wrapper>
            <div className="py-10">
              <p className="text-xl font-bold text-zinc-950 mb-7">Kategorije</p>
              <div className="grid grid-cols-4 gap-x-8 gap-y-3 pb-2">
                {categories.map((category) => {
                    const Icon = ICON_MAP[category.slug] ?? DEFAULT_ICON;
                    return (
                  <Link
                    key={category.slug}
                    href={`/proizvodi/${category.slug}`}
                    className="group flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-600 transition-all duration-150"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#e11d1b"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 group-hover:bg-white/20 transition-colors duration-150 shrink-0 text-zinc-950 group-hover:text-white">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className="text-sm font-medium leading-tight">{category.label}</span>
                  </Link>
                    );
                  })}
              </div>
            </div>
          </Wrapper>
        </div>

      </header>

      {/* ── Mobile menu drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 min-[1330px]:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 md:w-120 max-w-[85vw] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out min-[1330px]:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-end px-5 h-20 border-b border-zinc-100 shrink-0">
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 transition-colors duration-150"
            aria-label="Zatvori meni"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <Link
            href="/"
            className="flex items-center h-12 px-4 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors duration-150"
          >
            Početna
          </Link>

          {/* Proizvodi — accordion */}
          <div>
            <button
              onClick={() => setMobileCatsOpen((v) => !v)}
              className="w-full flex items-center justify-between h-12 px-4 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors duration-150 cursor-pointer"
            >
              Proizvodi
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`text-zinc-400 transition-transform duration-200 ${mobileCatsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileCatsOpen && (
              <div className="ml-2 mb-1 border-l-2 border-zinc-100 pl-3 flex flex-col gap-0.5">
                <Link
                  href="/proizvodi"
                  className="flex items-center h-10 px-3 rounded-lg text-sm font-semibold text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-150"
                >
                  Svi proizvodi
                </Link>
                {categories.map((cat) => {
                    const Icon = ICON_MAP[cat.slug] ?? DEFAULT_ICON;
                    return (
                  <Link
                    key={cat.slug}
                    href={`/proizvodi/${cat.slug}`}
                    className="flex items-center gap-3 h-10 px-3 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-150"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-100 text-zinc-600 shrink-0">
                      <Icon size={14} strokeWidth={1.5} />
                    </span>
                    {cat.label}
                  </Link>
                    );
                  })}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center h-12 px-4 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="shrink-0 border-t border-zinc-100 px-5 py-5 flex flex-col gap-3">
          <Link
            href="/nalog"
            className="flex items-center gap-3 h-12 px-4 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors duration-150"
          >
            <User size={18} strokeWidth={1.5} className="text-zinc-400" />
            Moj nalog
          </Link>
          <Link
            href="/korpa"
            className="flex items-center gap-3 h-12 px-4 rounded-xl text-[15px] font-medium text-white transition-opacity duration-150 hover:opacity-90"
            style={{ backgroundColor: "#e11d1b" }}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            Korpa
            {mounted && count > 0 && (
              <span className="ml-auto min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full bg-white text-[11px] font-bold" style={{ color: "#e11d1b" }}>
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} categories={categories} />
    </>
  );
}

