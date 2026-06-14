import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import LayoutShell from "@/components/layout/LayoutShell";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nesa Komerc - Keramika",
  description: "Prodaja keramike, WC šolja, kada, tuševa i kupatilskog programa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={cn("h-full", "antialiased", poppins.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
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
