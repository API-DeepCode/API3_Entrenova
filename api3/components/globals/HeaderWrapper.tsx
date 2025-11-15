"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Só mostra o header na landing page
  const showHeader = pathname === "/";

  if (!showHeader) return null;

  return <Header />;
}