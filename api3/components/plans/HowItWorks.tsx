import { ClipboardList, Users, TrendingUp, Award } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Análise de Necessidades",
    description:
      "Nossa equipe analisa as competências necessárias e os objetivos de desenvolvimento da sua empresa para criar trilhas sob medida.",
  },
  {
    icon: Users,
    title: "Implementação da Trilha",
    description:
      "Seus colaboradores recebem acesso imediato às trilhas personalizadas com conteúdos relevantes, vídeos, exercícios práticos e avaliações.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhamento em Tempo Real",
    description:
      "Monitore o progresso de cada colaborador através de dashboards interativos com métricas de engajamento e performance.",
  },
  {
    icon: Award,
    title: "Certificação e Evolução",
    description:
      "Ao concluir as trilhas, colaboradores recebem certificados e você tem acesso a relatórios completos para planejar próximos passos.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      {/* Blobs decorativos (ajustados para bg-gradient-to-*) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-[-140px] right-[-100px] w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#4d2cc4]/25 via-primary/15 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 bottom-[-140px] left-[-80px] w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-primary/20 via-[#ff4687]/15 to-transparent blur-3xl"
      />

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary/90 mb-4">
          <span>Jornada de implantação</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 mb-4">
          Como Funciona a Adesão
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Nosso processo é simples e eficiente. Do diagnóstico à certificação,
          acompanhamos toda a jornada de desenvolvimento da sua equipe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative group bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_18px_50px_rgba(15,23,42,0.85)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_65px_rgba(15,23,42,0.95)]"
          >
            {/* Linha conectando os passos (somente desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
            )}

            {/* Ícone com brilho e número do passo */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-24 h-24 rounded-full bg-primary/12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/50">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-pink-500 text-white shadow-md">
                {index + 1}
              </span>
            </div>

            {/* Conteúdo */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
