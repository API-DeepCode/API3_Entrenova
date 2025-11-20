// Caminho: /api3/app/dashboard/layout.tsx
"use client";

import { Navigation } from "@/components/dashboard/Navigation";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b031f] via-[#2b1364] to-[#050013] text-foreground overflow-hidden">
      {/* Glows de fundo iguais ao resto do app */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#ec4899]/25 via-[#a855f7]/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#4f46e5]/30 via-[#22d3ee]/10 to-transparent blur-3xl" />
      </div>

      <Navigation />

      <main className="pt-6 pb-10 px-4 sm:px-6 md:px-8 md:ml-64">
        <div className="mx-auto max-w-6xl space-y-6">
          {children}
        </div>
      </main>

      <Toaster />
    </div>
  );
}
