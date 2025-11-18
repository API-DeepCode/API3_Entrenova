// Caminho: /api3/app/dashboard/layout.tsx
"use client"; // Ainda necessário por causa do Toaster e do Navigation

// 1. Remover o useState
import { Navigation } from '@/components/dashboard/Navigation';
import { Toaster } from '@/components/ui/sonner';
import { WelcomePanel } from '@/components/dashboard/WelcomePanel';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b3d] via-[#311597] to-[#1a0b3d]">
      <Navigation />
      <main className="ml-64 p-8">
        <WelcomePanel />
        {children}
      </main>
      <Toaster />
    </div>
  );
}