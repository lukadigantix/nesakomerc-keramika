"use client";

import { usePathname } from "next/navigation";

interface LayoutShellProps {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function LayoutShell({ navbar, footer, children }: LayoutShellProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/nalog");

  return (
    <>
      {!isAuthPage && navbar}
      {children}
      {!isAuthPage && footer}
    </>
  );
}
