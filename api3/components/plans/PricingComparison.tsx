import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Feature {
  name: string;
  ouro: boolean | string;
  diamante: boolean | string;
  premium: boolean | string;
}

const features: Feature[] = [
  {
    name: "Trilhas habilitadas",
    ouro: "3 prioritárias em 48h",
    diamante: "8 personalizadas em 72h",
    premium: "Ilimitadas + gamificada"
  },
  {
    name: "Onboarding de equipe",
    ouro: "Assistido para 15 colaboradores",
    diamante: "Importação em massa",
    premium: "Gestor dedicado + playbook"
  },
  {
    name: "Relatórios",
    ouro: "Essenciais",
    diamante: "Avançados + executivo",
    premium: "Completos + SLAs"
  },
  {
    name: "Suporte",
    ouro: "E-mail",
    diamante: "Prioritário",
    premium: "Canal dedicado + SLAs"
  },
  {
    name: "Integrações e SSO",
    ouro: false,
    diamante: "Conectores principais",
    premium: "SSO + integrações ilimitadas"
  },
  {
    name: "Equipe atendida",
    ouro: "Até 15 pessoas",
    diamante: "Até 80 pessoas",
    premium: "Ilimitado"
  },
  {
    name: "Lançamento de novas trilhas",
    ouro: "1 por mês",
    diamante: "3 por mês",
    premium: "Sob demanda"
  },
  {
    name: "Sessões de alinhamento com gestor",
    ouro: "Trimestral",
    diamante: "Mensal",
    premium: "Quinzenal"
  },
  {
    name: "Garantia de adoção",
    ouro: "Kickoff guiado",
    diamante: "Plano de engajamento + nudges",
    premium: "Squad de Customer Success dedicado"
  }
];

const plans = [
  { name: "Ouro", price: "R$ 690/mês", cta: "Comprar trilha", variant: "outline" as const },
  { name: "Diamante", price: "R$ 1.290/mês", cta: "Comprar trilha", variant: "default" as const, popular: true },
  { name: "Premium", price: "R$ 2.190/mês", cta: "Comprar trilha", variant: "outline" as const }
];

const planSlugMapping: Record<string, string> = {
  ouro: "ouro",
  diamante: "diamante",
  premium: "premium",
};

export function PricingComparison() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          Compare os Planos
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Veja em detalhes o que cada plano oferece para escolher a melhor opção para sua empresa
        </p>
      </div>

      <div className="overflow-x-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-4 min-w-64 text-gray-200">Recursos</th>
              {plans.map((plan) => (
                <th key={plan.name} className="p-4 min-w-52 text-white">
                  <div className="flex flex-col items-center gap-2">
                    {plan.popular && (
                      <span className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Mais Popular
                      </span>
                    )}
                    <div className="font-semibold text-lg">{plan.name}</div>
                    <div className="text-gray-300">{plan.price}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                <td className="p-4 text-gray-300">{feature.name}</td>

                {[feature.ouro, feature.diamante, feature.premium].map((value, i) => (
                  <td key={i} className="p-4 text-center">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="w-5 h-5 text-pink-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td className="p-4"></td>
              {plans.map((plan) => {
                const isBuyable = plan.cta !== "Fale Conosco";
                const href = isBuyable
                  ? `/TelaPagamento?plano=${planSlugMapping[plan.name.toLowerCase()] || plan.name.toLowerCase()}`
                  : "/plans#contato";

                return (
                  <td key={plan.name} className="p-4">
                    <Button
                      asChild={isBuyable}
                      className={
                        "w-full transition-all " +
                        (plan.popular
                          ? "bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] hover:from-[#ff4687]/90 hover:to-[#4d2cc4]/90 text-white"
                          : "")
                      }
                      variant={plan.variant}
                    >
                      {isBuyable ? <Link href={href}>{plan.cta}</Link> : plan.cta}
                    </Button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
