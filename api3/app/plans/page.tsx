// Caminho: /api3/app/plans/page.tsx (ou equivalente)

import { Hero } from "@/components/plans/Hero";
import { Benefits } from "@/components/plans/Benefits";
import { HowItWorks } from "@/components/plans/HowItWorks";
import { PricingSection } from "@/components/plans/PricingSection";
import { PricingComparison } from "@/components/plans/PricingComparison";

export default function PaginaDePlanos() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0b031f] via-[#2b1364] to-[#050013] text-foreground overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#ec4899]/25 via-[#a855f7]/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#4f46e5]/30 via-[#22d3ee]/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-10 lg:px-0 pt-24 pb-24">
        <Hero />
        <Benefits />
        <HowItWorks />
        <PricingSection />
        <PricingComparison />
      </div>
    </main>
  );
}
