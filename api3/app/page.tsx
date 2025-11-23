// Caminho: /api3/app/page.tsx

"use client";

import {
  Bot,
  ArrowDown,
  UserRound,
  Goal,
  PencilRuler,
  ChartNoAxesCombined,
  CircleCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChatToggler } from "@/components/chatToggler/ChatToggler";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/globals/Header";
import { useEffect, useState } from "react";
import TestimonialsCarousel from "@/components/globals/TestimonialsCarousel";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [hasProgress, setHasProgress] = useState(false);

  useEffect(() => {
    try {
      const p1 = localStorage.getItem("form_part1");
      const p2 = localStorage.getItem("form_part2");
      const p3 = localStorage.getItem("form_part3");
      const p4 = localStorage.getItem("form_part4");
      const complete = localStorage.getItem("form_complete");
      setHasProgress(Boolean(p1 || p2 || p3 || p4 || complete));
    } catch {
      setHasProgress(false);
    }
  }, []);

  const handleLogout = () => {
    // 🔒 Aqui você colocará depois: signOut(auth)
    console.log("Usuário saiu");
    setUser(null);
  };

  const steps = [
    {
      Icon: UserRound,
      title: "Parte 1: Perfil",
      description: "Parâmetros básicos da sua empresa: setor, porte e localização.",
    },
    {
      Icon: Goal,
      title: "Parte 2: Objetivos",
      description:
        "Principais desafios e metas estratégicas para alcançar seus resultados.",
    },
    {
      Icon: PencilRuler,
      title: "Parte 3: Dimensões",
      description:
        "Análise de quatro dimensões: pessoas, estrutura, mercado e futuro.",
    },
    {
      Icon: ChartNoAxesCombined,
      title: "Parte 4: Inovação",
      description:
        "Avaliação de investimento, inovação e urgência de transformação.",
    },
  ];

  const discoveries = [
    "Principais gargalos operacionais",
    "Oportunidades de melhoria imediata",
    "Pontos fortes da sua organização",
    "Áreas críticas que precisam de atenção",
    "Comparativo com empresas do seu setor",
    "Recomendações personalizadas de ação",
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0b031f] via-[#2b1364] to-[#050013] text-foreground overflow-hidden">
      {/* Brilhos de fundo mais suaves */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#ec4899]/25 via-[#a855f7]/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#4f46e5]/30 via-[#22d3ee]/10 to-transparent blur-3xl" />
      </div>

      <Header user={user} onLogout={handleLogout} />

      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-10 lg:px-0 pt-24 pb-24 space-y-24">
        {/* Seção de Boas-vindas */}
        <section className="relative">
          {/* Linha luminosa lateral */}
          <div
            className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-pink-500 via-primary to-purple-400 blur-[2px] opacity-80 rounded-full"
            aria-hidden="true"
          />

          <div className="pl-4 sm:pl-6">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60 mb-3 animate-fade-in">
              Plataforma de diagnóstico empresarial
            </p>

            <h1 className="text-4xl sm:text-5xl font-semibold mb-3 text-gray-200 tracking-tight animate-fade-in">
              Bem-vindo ao
            </h1>

            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(236,72,153,0.4)] hover:drop-shadow-[0_0_22px_rgba(192,132,252,0.7)] transition-all duration-500">
                EntrenovaFlix
              </h2>
              <Bot
                size={54}
                className="text-primary shrink-0 drop-shadow-[0_0_14px_rgba(236,72,153,0.45)] animate-pulse-slow"
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
              Um parceiro digital para entender onde sua empresa está hoje
              e quais os próximos passos para acelerar resultados com inovação.
            </p>
          </div>

          <style jsx>{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in {
              animation: fade-in 0.9s ease-out forwards;
            }

            @keyframes pulse-slow {
              0%,
              100% {
                opacity: 1;
                transform: scale(1);
              }
              50% {
                opacity: 0.9;
                transform: scale(1.07);
              }
            }

            .animate-pulse-slow {
              animation: pulse-slow 3s ease-in-out infinite;
            }
          `}</style>
        </section>

        {/* Hero Section */}
        <section className="relative text-center flex flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 sm:px-10 py-12 shadow-[0_18px_60px_rgba(15,23,42,0.55)]">
          {/* Brilho suave atrás do conteúdo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/5 via-transparent to-white/0"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight bg-gradient-to-r from-pink-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Identifique os desafios da sua empresa com precisão
          </h2>

          <p className="text-base sm:text-lg text-white/75 mb-10 max-w-2xl leading-relaxed">
            Um diagnóstico completo em 4 etapas que analisa diferentes
            dimensões da sua organização para transformar dados em ações
            práticas e priorizadas.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-5 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/forms")}
              aria-label="Preencher o formulário de diagnóstico"
              className="group text-base font-medium shadow-lg shadow-primary/40 transition-all duration-300 hover:shadow-primary/60 hover:-translate-y-[1px] hover:scale-[1.02] active:scale-[0.98]"
            >
              Preencher o Formulário
              <ArrowRight
                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base font-medium transition-all duration-300 border-primary/40 text-primary hover:border-primary hover:bg-primary/10 hover:text-primary shadow-sm hover:shadow-primary/30"
            >
              <Link href="/TelaPagamento" aria-label="Ver planos disponíveis">
                Ver Planos
              </Link>
            </Button>

            {hasProgress && (
              <Button
                size="lg"
                variant="ghost"
                onClick={() => router.push("/forms")}
                className="text-sm font-medium px-4 py-2 bg-white/8 border border-white/15 text-white/90 hover:bg-white/12 rounded-full"
                aria-label="Continuar de onde parou"
              >
                Continuar de onde parou
              </Button>
            )}
          </div>

          {/* Tempo estimado */}
          <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-white/75">
            <span>Tempo estimado de preenchimento:</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#ff4687] to-[#4d2cc4]">
              ~10 minutos
            </span>
          </div>

          {/* Social proof */}
          <div className="mt-10 w-full">
            <p className="text-[11px] sm:text-xs text-white/60 mb-3">
              Confiado por líderes e equipes em diferentes segmentos
            </p>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Seção de Informações */}
        <section className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 mb-10 text-center text-primary">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium text-primary/90">
              <span>Entenda o passo a passo</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-100">
                Saiba Mais sobre o Formulário
              </h3>
              <ArrowDown className="mt-1 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70">
              O diagnóstico é dividido em partes curtas e objetivas para
              você conseguir responder com clareza, sem burocracia.
            </p>
          </div>

          {/* Etapas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full mb-20">
            {steps.map((part, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.7)] hover:border-primary/70 flex flex-col group rounded-2xl backdrop-blur-xl"
              >
                <CardHeader className="pb-3 flex flex-col items-center">
                  <div className="relative w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/40 blur-xl rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                    <part.Icon
                      className="w-7 h-7 text-primary relative z-10"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-100 group-hover:text-primary transition-colors text-center">
                    {part.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/70 text-sm leading-relaxed text-center px-4 pb-6">
                  {part.description}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Descobertas */}
          <Card className="bg-white/5 border-white/10 w-full mb-20 px-6 sm:px-10 py-10 rounded-3xl shadow-[0_18px_55px_rgba(15,23,42,0.8)] hover:shadow-primary/25 transition-all backdrop-blur-xl">
            <CardTitle className="text-center text-2xl sm:text-3xl font-semibold mb-8 bg-gradient-to-r from-pink-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
              O que Você vai Descobrir
            </CardTitle>
            <CardContent className="px-0">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-white/75 text-sm sm:text-base leading-relaxed">
                {discoveries.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 hover:text-white transition-colors"
                  >
                    <CircleCheck
                      className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* CTA Final */}
          <section className="text-center mb-10 flex flex-col items-center w-full">
            <div className="relative w-full max-w-xl rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-[#020617]/80 to-[#020617] px-6 sm:px-10 py-10 shadow-[0_18px_60px_rgba(15,23,42,0.8)] overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/40 via-primary/40 to-transparent blur-3xl"
              />

              <h4 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                Pronto para Transformar sua Empresa?
              </h4>
              <p className="text-sm sm:text-base text-white/75 mb-8 leading-relaxed">
                Em poucos minutos você terá clareza sobre os principais
                pontos fortes, riscos e oportunidades da sua organização –
                com base em dados, não só em percepção.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/forms")}
                aria-label="Iniciar o diagnóstico agora"
                className="group text-base font-medium shadow-lg shadow-primary/40 transition-all duration-300 hover:shadow-primary/60 hover:-translate-y-[1px] hover:scale-[1.02] active:scale-[0.98]"
              >
                Iniciar o diagnóstico
                <ArrowRight
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </section>

          <ChatToggler />
        </section>
      </div>
    </main>
  );
}
