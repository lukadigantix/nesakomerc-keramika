import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import LayoutShell from "@/components/layout/LayoutShell";
import PageLoader from "@/components/ui/PageLoader";
import BackToTop from "@/components/ui/BackToTop";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nesakomerckeramika.rs";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Neša Komerc Keramika — Keramika i kupatilska oprema, Svilajnac",
    template: "%s | Neša Komerc Keramika",
  },
  description:
    "Specijalizovani salon za keramiku i kupatilsku opremu u Svilajncu. Preko 5.000 proizvoda — pločice, sanitarije, baterije, kade, tuš kabine, ogledala i kupatilski nameštaj vodećih svetskih brendova. Brza dostava širom Srbije.",
  keywords: [
    "keramika",
    "kupatilska oprema",
    "pločice",
    "sanitarije",
    "baterije",
    "kade",
    "tuš kabine",
    "ogledala",
    "kupatilski nameštaj",
    "Svilajnac",
    "Srbija",
    "salon keramike",
  ],
  authors: [{ name: "Neša Komerc Keramika", url: siteUrl }],
  creator: "Neša Komerc Keramika",
  publisher: "Neša Komerc Keramika",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
    siteName: "Neša Komerc Keramika",
    title: "Neša Komerc Keramika — Keramika i kupatilska oprema, Svilajnac",
    description:
      "Specijalizovani salon za keramiku i kupatilsku opremu u Svilajncu. Preko 5.000 proizvoda — pločice, sanitarije, baterije, kade, tuš kabine i kupatilski nameštaj.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neša Komerc Keramika — salon keramike u Svilajncu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neša Komerc Keramika — Keramika i kupatilska oprema",
    description:
      "Specijalizovani salon za keramiku i kupatilsku opremu u Svilajncu. Preko 5.000 proizvoda vodećih svetskih brendova.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Neša Komerc Keramika",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/nesa-komerc-logo.svg`,
        width: 270,
        height: 81,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+381-35-8814-077",
        contactType: "customer service",
        availableLanguage: "Serbian",
        areaServed: "RS",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Stevana Sinđelića 309",
        addressLocality: "Svilajnac",
        addressRegion: "Šumadijski okrug",
        postalCode: "35210",
        addressCountry: "RS",
      },
    },
    {
      "@type": "HomeGoodsStore",
      "@id": `${siteUrl}/#local-business`,
      name: "Neša Komerc Keramika",
      image: `${siteUrl}/og-image.jpg`,
      url: siteUrl,
      telephone: "+381358814077",
      email: "office@nesa-komerc.com",
      priceRange: "$$",
      description:
        "Specijalizovani salon za keramiku i kupatilsku opremu. Preko 5.000 proizvoda vodećih svetskih brendova.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Stevana Sinđelića 309",
        addressLocality: "Svilajnac",
        addressRegion: "Šumadijski okrug",
        postalCode: "35210",
        addressCountry: "RS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.258725534849624,
        longitude: 21.20514591349281,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      hasMap: "https://maps.app.goo.gl/xdVjfMj4qEQSSJoL6",
      currenciesAccepted: "RSD",
      paymentAccepted: "Cash, Credit Card",
      servesCuisine: undefined,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Neša Komerc Keramika",
      description:
        "Specijalizovani salon za keramiku i kupatilsku opremu u Svilajncu.",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/proizvodi?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={cn("h-full", "antialiased", poppins.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageLoader />
        <BackToTop />
        <AuthProvider>
          <CartProvider>
            <Suspense>
              <LayoutShell
                navbar={<Suspense><NavbarWrapper /></Suspense>}
                footer={<Suspense><FooterWrapper /></Suspense>}
              >
                <Suspense>{children}</Suspense>
              </LayoutShell>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
