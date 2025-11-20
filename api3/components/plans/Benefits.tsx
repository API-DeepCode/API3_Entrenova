import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Zap,
  BarChart3,
  Shield,
  Users2,
  Rocket,
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Totalmente Personalizado",
    description:
      "Trilhas criadas especificamente para as necessidades da sua empresa e cultura organizacional.",
  },
  {
    icon: Zap,
    title: "Implementação Rápida",
    description:
      "Suas equipes começam a treinar em até 48 horas após a contratação do plano.",
  },
  {
    icon: BarChart3,
    title: "Métricas em Tempo Real",
    description:
      "Dashboards interativos para acompanhar progresso, engajamento e resultados.",
  },
  {
    icon: Shield,
    title: "Conteúdo Atualizado",
    description:
      "Acesso contínuo a novos conteúdos e atualizações sem custos adicionais.",
  },
  {
    icon: Users2,
    title: "Suporte Especializado",
    description:
      "Equipe dedicada para ajudar na criação e otimização das trilhas de aprendizagem.",
  },
  {
    icon: Rocket,
    title: "Resultados Comprovados",
    description:
      "Aumento médio de 40% na retenção de conhecimento dos colaboradores.",
  },
];

export function Benefits() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-20 md:py-24 overflow-hidden">
      {/* Blobs decorativos harmônicos com a landing */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-[-120px] left-[-80px] w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-primary/25 via-[#ff4687]/15 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 bottom-[-140px] right-[-60px] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#4d2cc4]/30 via-primary/20 to-transparent blur-3xl"
      />

      <div className="text-center mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary/90 mb-5">
          <span>Benefícios das trilhas</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 mb-4">
          Por que escolher nossas trilhas
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Uma plataforma completa para transformar o desenvolvimento da sua equipe,
          combinando tecnologia, conteúdo e acompanhamento estratégico.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="group relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.75)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(15,23,42,0.9)] hover:border-primary/60"
          >
            {/* Glow sutil no topo do card */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-px h-1 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-500 via-primary to-purple-400 transition-opacity duration-400 rounded-t-2xl"
            />

            <CardContent className="p-7 sm:p-8 flex flex-col items-start">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2.5 text-foreground group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
