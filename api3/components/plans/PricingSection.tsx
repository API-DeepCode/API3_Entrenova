"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BillingCycle = "monthly" | "annual";

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice?: number; // ausência indica plano personalizado
  features: string[];
  highlighted?: boolean;
}

const ANNUAL_DISCOUNT = 0.2; // 20%

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description:
      "Ideal para pequenas equipes iniciando sua jornada de aprendizado corporativo.",
    monthlyPrice: 499,
    features: [
      "Até 3 trilhas personalizadas",
      "Suporte para 20 colaboradores",
      "Relatórios básicos de progresso",
      "Acesso por 6 meses",
      "Suporte por e-mail",
    ],
  },
  {
    name: "Profissional",
    description:
      "Perfeito para empresas em crescimento que buscam desenvolvimento contínuo.",
    monthlyPrice: 1299,
    features: [
      "Até 10 trilhas personalizadas",
      "Suporte para 100 colaboradores",
      "Relatórios avançados e analytics",
      "Acesso por 12 meses",
      "Suporte prioritário",
      "Consultoria mensal de 2 horas",
      "Certificados de conclusão",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description:
      "Solução completa para grandes organizações com necessidades específicas.",
    features: [
      "Trilhas ilimitadas",
      "Usuários ilimitados",
      "Dashboard executivo personalizado",
      "Acesso vitalício",
      "Suporte dedicado 24/7",
      "Consultoria semanal",
      "Integração com sistemas corporativos",
      "Gamificação e engajamento",
    ],
  },
];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { root: null, threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="relative w-full py-28 px-6 text-white overflow-hidden"
    >
      {/* Gradiente sutil que “puxa” o olhar para os planos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-0 right-0 h-40 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(255,70,135,0.10)_30%,rgba(77,44,196,0.12)_70%,rgba(0,0,0,0)_100%)]"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        } bg-[radial-gradient(900px_500px_at_50%_0%,rgba(255,70,135,0.12),rgba(77,44,196,0.10),transparent_70%)]`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-[82%] -z-10 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-[#ff4687]/55 via-white/15 to-[#4d2cc4]/55`}
      />

      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2
          className={`text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Planos de Trilhas Personalizadas
        </h2>
        <p
          className={`text-gray-300 max-w-2xl mx-auto transition-opacity delay-150 duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Escolha o plano ideal para potencializar o desenvolvimento da sua
          equipe com trilhas sob medida e resultados reais.
        </p>
      </div>

      {/* Toggle de cobrança */}
      <div
        className={`max-w-7xl mx-auto mb-12 flex items-center justify-center gap-3 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="inline-flex items-center p-1 rounded-full border border-white/20 bg-white/5 backdrop-blur">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-4 ${
              billing === "monthly"
                ? "bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white"
                : "text-gray-200"
            }`}
          >
            Mensal
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setBilling("annual")}
            className={`rounded-full px-4 ${
              billing === "annual"
                ? "bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white"
                : "text-gray-200"
            }`}
          >
            Anual
            <span className="ml-2 text-white/90 text-xs">-20%</span>
          </Button>
        </div>
        {billing === "annual" && (
          <span className="text-sm text-pink-300/90">
            Economize {Math.round(ANNUAL_DISCOUNT * 100)}% cobrando anualmente
          </span>
        )}
      </div>

      {/* Cards de planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {pricingTiers.map((tier, i) => {
          const personalized = typeof tier.monthlyPrice !== "number";
          const monthly = tier.monthlyPrice ?? 0;
          const effectiveMonthly =
            billing === "monthly"
              ? monthly
              : Math.round(monthly * (1 - ANNUAL_DISCOUNT));

          return (
            <Card
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border backdrop-blur-xl bg-white/5 transition-all duration-500 ${
                tier.highlighted
                  ? "border-pink-400/70 bg-gradient-to-b from-pink-500/18 to-purple-500/18 shadow-[0_22px_70px_rgba(15,23,42,0.95)] scale-[1.03]"
                  : "border-white/15 hover:border-pink-400/60 hover:shadow-[0_20px_60px_rgba(15,23,42,0.9)]"
              } ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: visible ? `${150 + i * 80}ms` : "0ms",
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                  Mais Popular
                </div>
              )}

              {/* Linha de brilho no topo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-pink-500/70 via-white/40 to-purple-500/70 rounded-t-2xl"
              />

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  {tier.description}
                </CardDescription>
                <div className="mt-5">
                  {personalized ? (
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      Personalizado
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl sm:text-4xl font-bold text-white">
                        {formatBRL(effectiveMonthly)}
                      </span>
                      <span className="text-gray-300 ml-1 text-lg">/mês</span>
                      {billing === "annual" && (
                        <div className="mt-1 text-xs text-gray-300">
                          Cobrado anualmente
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col text-left px-8 pb-8">
                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-200"
                    >
                      <Check className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild={!personalized}
                  className={`w-full text-base font-medium transition-all hover:scale-[1.02] ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] hover:from-[#ff4687]/90 hover:to-[#4d2cc4]/90 text-white shadow-md shadow-pink-500/40"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                  }`}
                >
                  {personalized ? (
                    <span>Fale Conosco</span>
                  ) : (
                    <Link href="/dashboard/comercial">Começar Agora</Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
