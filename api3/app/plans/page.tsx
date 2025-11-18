import { Hero } from '@/components/plans/Hero';
import { Benefits } from '@/components/plans/Benefits';
import { HowItWorks } from '@/components/plans/HowItWorks';
import { PricingSection } from '@/components/plans/PricingSection';
import { PricingComparison } from '@/components/plans/PricingComparison';

export default function PaginaDePlanos() {
  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 md:px-16 lg:px-40 text-foreground bg-linear-to-br from-[#1a0b3d] via-[#311597] to-[#1a0b3d]">
      <Hero />
      <Benefits />
      <HowItWorks />
      <PricingSection />
      <PricingComparison />
    </main>
  );
}