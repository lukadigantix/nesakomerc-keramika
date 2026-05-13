export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  image: string;
  description?: string;
}

export interface Category {
  label: string;
  slug: string;
}

export const categories: Category[] = [
  { label: "Baterije", slug: "baterije" },
  { label: "Ormarići sa umivaonikom", slug: "ormarici-sa-umivaonikom" },
  { label: "Ormarići za lavaboe", slug: "ormarici-za-lavaboe" },
  { label: "Ogledala sa ormarićem", slug: "ogledala-sa-ormaricem" },
  { label: "Klasična i LED Ogledala", slug: "klasicna-i-led-ogledala" },
  { label: "Vertikale", slug: "vertikale" },
  { label: "Tuš kabine i tuš kade", slug: "tus-kabine-i-tus-kade" },
  { label: "Samostojeće kade", slug: "samostojece-kade" },
  { label: "Sanitarije", slug: "sanitarije" },
  { label: "Keramika", slug: "keramika" },
  { label: "Slivnici", slug: "slivnici" },
  { label: "Galanterija", slug: "galanterija" },
];

export const products: Product[] = [
  { id: 1, name: "Mešalica za umivaonik Roca L90", category: "Baterije", categorySlug: "baterije", price: "8.490 RSD", image: "/images/img4.png", description: "Elegantna jednoruka mešalica sa keramičkim diskom, hromiranim završetkom i vodoštedecom perlatorom. Idealna za moderne kupaonice." },
  { id: 2, name: "Tuš kabina Ravak Blix", category: "Tuš kabine i tuš kade", categorySlug: "tus-kabine-i-tus-kade", price: "62.900 RSD", image: "/images/img5.png", description: "Kvadratna tuš kabina sa kliznim vratima od kaljenog stakla debljine 6 mm. Aluminijumski profili u sjajnom hromu, laka montaža." },
  { id: 3, name: "Wc šolja Geberit Selnova", category: "Sanitarije", categorySlug: "sanitarije", price: "24.200 RSD", image: "/images/img4.png", description: "Konzolna WC šolja sa rimless tehnologijom za lakše čišćenje. Keramika visoke gustine, kompatibilna sa Geberit Duofix sistemom." },
  { id: 4, name: "LED Ogledalo Miior 80×60", category: "Klasična i LED Ogledala", categorySlug: "klasicna-i-led-ogledala", price: "18.700 RSD", image: "/images/img5.png", description: "Ogledalo sa integrisanom LED rasvetom hladnog tona, anti-kondenzacionim grejačem i touch prekidačem. Dimenzije 80×60 cm." },
  { id: 5, name: "Samostojeća kada Kaldewei", category: "Samostojeće kade", categorySlug: "samostojece-kade", price: "134.000 RSD", image: "/images/img4.png", description: "Luksuzna samostojeća kada od čeličnog emajla debljine 3,5 mm. Ovalni dizajn, otporna na ogrebotine i hemikalije, doživotna garancija." },
  { id: 6, name: "Peškir radijator Zehnder", category: "Vertikale", categorySlug: "vertikale", price: "41.500 RSD", image: "/images/img5.png", description: "Elektro peškir radijator sa integrisanim grejačem. Bijeli prah lak, dimenzije 60×120 cm, snaga 400W, IP44 zaštita." },
  { id: 7, name: "Podna keramika Porcelanosa", category: "Keramika", categorySlug: "keramika", price: "3.200 RSD/m²", image: "/images/img4.png", description: "Porcelanska pločica visoke čvrstoće, protivklizna R10 klasa, format 60×60 cm. Pogodna za kupatila, kuhinje i terase." },
  { id: 8, name: "Slivnik Viega Advantix", category: "Slivnici", categorySlug: "slivnici", price: "9.800 RSD", image: "/images/img5.png", description: "Kvadratni tuš slivnik sa nerđajućom rešetkom, vodozaptivajem i integrisanim sifonom. Protok 0,5 l/s, fleksibilni priključak." },
  { id: 9, name: "Mešalica Grohe Eurosmart", category: "Baterije", categorySlug: "baterije", price: "12.900 RSD", image: "/images/img5.png", description: "Visoka sudopera mešalica sa okretnom cevi od 360°, keramičkim diskom i Grohe StarLight hrom završetkom otpornim na ogrebotine." },
  { id: 10, name: "Tuš sistem Hansgrohe Raindance", category: "Tuš kabine i tuš kade", categorySlug: "tus-kabine-i-tus-kade", price: "54.700 RSD", image: "/images/img4.png", description: "Termostatski tuš set sa kišnom tuš glavom prečnika 30 cm i ručnim tušem. Select dugme za lako prebacivanje funkcija, EcoSmart tehnologija." },
  { id: 11, name: "Wc šolja Villeroy & Boch Subway 3.0", category: "Sanitarije", categorySlug: "sanitarije", price: "38.500 RSD", image: "/images/img5.png", description: "Konzolna rimless WC šolja sa CeramicPlus premazom za higijenu bez napora. Dual Flush 3/6 l, meki zaklopac sa slow-close mehanizmom." },
  { id: 12, name: "Ogledalni ormarić Burgbad", category: "Ogledala sa ormarićem", categorySlug: "ogledala-sa-ormaricem", price: "29.200 RSD", image: "/images/img4.png", description: "Tripartitni ogledalni ormarić sa integrisanom LED rasvetom i bočnim ogledlima. Unutrašnjost MDF bijela, 3 podesivih polica, š 90 cm." },
  { id: 13, name: "Akrilna kada Ravak Chrome", category: "Samostojeće kade", categorySlug: "samostojece-kade", price: "89.000 RSD", image: "/images/img5.png", description: "Pravougaona akrilna kada ojačana staklenim vlaknima, 170×75 cm. Uključuje metalnu nosivu konstrukciju i sifon sa prelijvom." },
  { id: 14, name: "Kupaonski nameštaj Pelipal", category: "Ormarići sa umivaonikom", categorySlug: "ormarici-sa-umivaonikom", price: "67.300 RSD", image: "/images/img4.png", description: "Komplet kupaonskog nameštaja: donji ormarić 80 cm sa mekim zatvaranjem, ugradbeni umivaonik i ogledalo. Bijeli saten lak." },
  { id: 15, name: "Zidna keramika Aparici", category: "Keramika", categorySlug: "keramika", price: "4.800 RSD/m²", image: "/images/img5.png", description: "Dekorativna zidna pločica sa 3D teksturom, format 30×90 cm. Rektifikovana ivica za fugovanje od 1 mm, mat površina." },
  { id: 16, name: "Termostatska baterija Duravit", category: "Baterije", categorySlug: "baterije", price: "31.500 RSD", image: "/images/img4.png", description: "Zidna termostatska tuš baterija sa dva izlaza i anti-oparenje zaštitom na 38°C. Mesing telo, hrom završetak, uključuje ručice." },
  { id: 17, name: "Ormarić za lavabo Geberit", category: "Ormarići za lavaboe", categorySlug: "ormarici-za-lavaboe", price: "22.400 RSD", image: "/images/img5.png", description: "Viseći ormarić ispod lavaba sa jednim pretincem i mekim zatvaranjem vrata. Vodootporan MDF, š 60 cm, bijeli mat lak." },
  { id: 18, name: "Slivnik linearni ACO", category: "Slivnici", categorySlug: "slivnici", price: "14.600 RSD", image: "/images/img4.png", description: "Linearni tuš kanal dužine 80 cm sa nerđajućom rešetkom i podesiivim sifonom. Prirubnica za vodozaptivanje, protok 0,8 l/s." },
  { id: 19, name: "Galanterija Grohe Essentials", category: "Galanterija", categorySlug: "galanterija", price: "6.900 RSD", image: "/images/img5.png", description: "Set kupaonske galanterije: držač peškira, šipka za tuširanje i sapunar. Hrom završetak, čelična osnova, jednostavna montaža." },
  { id: 20, name: "LED Ogledalo Laufen Frame 25", category: "Klasična i LED Ogledala", categorySlug: "klasicna-i-led-ogledala", price: "26.800 RSD", image: "/images/img4.png", description: "Ogledalo sa slim LED okvirom, toplim tonom svetlosti 3000K i IP44 zaštitom. Uključuje zidni nosač i napojni kabl, 100×70 cm." },
  { id: 21, name: "Vertikala Zehnder Charleston", category: "Vertikale", categorySlug: "vertikale", price: "58.200 RSD", image: "/images/img5.png", description: "Čelični cevni radijator sa više stubaca, bijeli RAL 9016. Priključak 50 mm aksijalni, visina 180 cm. Visok toplotni kapacitet." },
  { id: 22, name: "Ormarić sa umivaonikom Roca", category: "Ormarići sa umivaonikom", categorySlug: "ormarici-sa-umivaonikom", price: "44.900 RSD", image: "/images/img4.png", description: "Kompletna jedinica: viseći ormarić 70 cm sa integrisanim keramičkim umivaonikom i dva meka mehanizma za zatvaranje. Bijeli sjajni lak." },
  { id: 23, name: "Sanitarni set Ideal Standard", category: "Sanitarije", categorySlug: "sanitarije", price: "31.700 RSD", image: "/images/img5.png", description: "Komplet: konzolna rimless WC šolja, niskoprofilni bide i meki slow-close zaklopac. Bijela keramika, vitak profil, EU standard." },
  { id: 24, name: "Galanterija Hansgrohe Logis", category: "Galanterija", categorySlug: "galanterija", price: "9.200 RSD", image: "/images/img4.png", description: "Premium set od 5 komada: polica, dvostrani stalak za peškire, šipka, kutija za sapun i roll holder. Mesing, hrom, 5 god. garancija." },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

// Mesečna akcija — subset of products on sale
export const saleProducts: Product[] = [
  { id: 1, name: "Mešalica za umivaonik Roca L90", category: "Baterije", categorySlug: "baterije", price: "5.990 RSD", image: "/images/img4.png" },
  { id: 2, name: "Tuš kabina Ravak Blix", category: "Tuš kabine i tuš kade", categorySlug: "tus-kabine-i-tus-kade", price: "49.900 RSD", image: "/images/img5.png" },
  { id: 3, name: "Wc šolja Geberit Selnova", category: "Sanitarije", categorySlug: "sanitarije", price: "17.900 RSD", image: "/images/img4.png" },
  { id: 4, name: "LED Ogledalo Miior 80×60", category: "Klasična i LED Ogledala", categorySlug: "klasicna-i-led-ogledala", price: "13.900 RSD", image: "/images/img5.png" },
  { id: 9, name: "Mešalica Grohe Eurosmart", category: "Baterije", categorySlug: "baterije", price: "8.990 RSD", image: "/images/img5.png" },
  { id: 10, name: "Tuš sistem Hansgrohe Raindance", category: "Tuš kabine i tuš kade", categorySlug: "tus-kabine-i-tus-kade", price: "39.900 RSD", image: "/images/img4.png" },
  { id: 15, name: "Zidna keramika Aparici", category: "Keramika", categorySlug: "keramika", price: "2.990 RSD/m²", image: "/images/img5.png" },
  { id: 19, name: "Galanterija Grohe Essentials", category: "Galanterija", categorySlug: "galanterija", price: "4.490 RSD", image: "/images/img5.png" },
  { id: 21, name: "Vertikala Zehnder Charleston", category: "Vertikale", categorySlug: "vertikale", price: "42.900 RSD", image: "/images/img5.png" },
  { id: 23, name: "Sanitarni set Ideal Standard", category: "Sanitarije", categorySlug: "sanitarije", price: "23.900 RSD", image: "/images/img5.png" },
  { id: 17, name: "Ormarić za lavabo Geberit", category: "Ormarići za lavaboe", categorySlug: "ormarici-za-lavaboe", price: "15.900 RSD", image: "/images/img5.png" },
  { id: 14, name: "Kupaonski nameštaj Pelipal", category: "Ormarići sa umivaonikom", categorySlug: "ormarici-sa-umivaonikom", price: "49.900 RSD", image: "/images/img4.png" },
];
