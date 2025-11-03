// Caminho: api3/app/AiAnswer/page.tsx

"use client";

import { useState, useEffect, Suspense } from 'react';
import { getCompleteFormData } from '@/app/lib/formStorage';
import {
  CircleAlert,
  Lock,
  CircleCheck,
  ArrowRight,
  RefreshCcw,
  Sparkles,
  AlertTriangle,
  Loader,
  Unlock
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";

function AiAnswerContent() {
  const router = useRouter();

  const [relatorio, setRelatorio] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const formData = getCompleteFormData();
      if (!formData || Object.keys(formData).length === 0) {
        setError("Nenhum dado do formulário encontrado. Por favor, preencha o formulário primeiro.");
      setLoading(false);
      return;
    }

    const fetchRelatorio = async () => {
      setLoading(true);
      setError(null);
      setRelatorio(null);
      try {
        const response = await fetch('/api/gerar-diagnostico', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData }),
        });

        if (!response.ok) {
          let errorData = { error: `Erro HTTP ${response.status}` };
          try {
            errorData = await response.json();
          } catch {}
          throw new Error(errorData.error || `Erro ao buscar diagnóstico.`);
        }

        const data = await response.json();
        if (!data.relatorio) throw new Error("A resposta da API não contém o campo 'relatorio'.");
        setRelatorio(data.relatorio);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar o diagnóstico.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorio();
    }, []);

  const priorityAreas = [
    { name: "Engajamento de Equipe", priority: "Alta Prioridade" },
    { name: "Gestão de Setores", priority: "Alta Prioridade" },
  ];

  const planBenefits = [
    "Análise completa das 4 Dimensões",
    "Insights aprofundados e personalizados",
    "Recomendações acionáveis e estratégicas",
    "Roadmap de desenvolvimento detalhado",
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1a0a3d] via-[#100529] to-[#0a031a] text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl space-y-16">

        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Diagnóstico Concluído!
          </h1>
          <p className="text-lg text-gray-400">
            {loading ? "Gerando seu relatório..." : error ? "Ocorreu um erro" : "Seu relatório preliminar está pronto."}
          </p>
        </div>

        {/* Relatório da IA */}
        <div className="p-8 rounded-xl bg-gray-800/60 border border-gray-700/70 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-l-4 border-primary pl-4">
            Análise das Dimensões pela IA
          </h2>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader className="w-8 h-8 animate-spin text-primary" />
              <p className="text-gray-400 ml-4">Gerando análise...</p>
            </div>
          )}

          {/* Erro */}
          {error && !loading && (
            <div className="bg-red-900/50 border border-red-700 p-4 rounded-md">
              <p className="text-red-300 font-medium">Erro ao gerar diagnóstico:</p>
              <p className="text-red-400 text-sm mt-1">{error}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Tentar Novamente
              </Button>
            </div>
          )}

          {/* Saída formatada da IA */}
          {!loading && !error && (
            <div className="space-y-8">

              {/* Dimensão desbloqueada */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-green-800/20 via-green-700/10 to-transparent border border-green-500/40 shadow-md transition-all duration-300 hover:shadow-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-green-300">
                    Dimensão 1 — {relatorio?.split('\n')[0] || "Liderança e Estratégia"}
                  </h3>
                </div>
                <div className="text-gray-200 text-base leading-relaxed space-y-2">
                  <p className="whitespace-pre-wrap text-gray-300">
                    {relatorio || "O diagnóstico da primeira dimensão foi gerado com sucesso."}
                  </p>
                </div>
              </div>

              {/* Outras dimensões bloqueadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Dimensão 2 — Engajamento da Equipe", color: "purple" },
                  { title: "Dimensão 3 — Processos Internos", color: "blue" },
                  { title: "Dimensão 4 — Inovação e Cultura", color: "pink" },
                ].map((dim, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative p-6 rounded-xl border shadow-md backdrop-blur-sm overflow-hidden group",
                      `border-${dim.color}-500/30 bg-${dim.color}-900/10`
                    )}
                  >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center opacity-100 transition-opacity group-hover:opacity-80">
                      <Lock className="w-10 h-10 text-gray-300 mb-2" />
                      <p className="text-gray-400 text-sm">Conteúdo bloqueado</p>
                      <Button
                        size="sm"
                        onClick={() => router.push("/plans")}
                        className="mt-3 bg-gradient-to-r from-primary to-pink-500 text-white text-sm font-medium hover:scale-105 transition-transform"
                      >
                        Desbloquear Dimensão
                        <Unlock className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-300">{dim.title}</h4>
                    </div>
                    <p className="text-gray-500 text-sm italic">
                      Esta dimensão será liberada no relatório completo.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Áreas Prioritárias */}
        <div className="relative p-8 rounded-xl bg-gradient-to-r from-red-900/30 via-red-800/20 to-transparent border border-destructive/40 shadow-lg overflow-hidden">
          <AlertTriangle className="absolute -top-5 -left-5 w-20 h-20 text-red-500/25 opacity-80 transform rotate-[-20deg]" />
          <AlertTriangle className="absolute -bottom-5 -right-5 w-24 h-24 text-red-500/25 opacity-50 transform rotate-[15deg]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <CircleAlert className="w-7 h-7 text-red-400 animate-bounce" />
              <h2 className="text-2xl font-semibold text-red-300">
                Exemplo: Áreas Prioritárias
              </h2>
            </div>
            <ul className="space-y-4">
              {priorityAreas.map((area, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-red-900/50 border border-red-600/50 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-medium text-gray-100 mb-1 sm:mb-0">
                    {area.name}
                  </h3>
                  <Badge variant="destructive" className="bg-red-500 text-white text-xs px-3 py-1 shadow-sm">
                    {area.priority}
                  </Badge>
                </li>
              ))}
            </ul>
            <p className="text-sm text-red-300/80 mt-5 italic">
              A análise completa no relatório da IA pode refinar estas prioridades.
            </p>
          </div>
        </div>

        {/* CTA de Planos */}
        <div className="relative p-10 rounded-2xl bg-gradient-to-tr from-primary/30 via-purple-900/40 to-indigo-900/50 border border-primary/50 shadow-2xl shadow-primary/20 overflow-hidden backdrop-blur-md">
          <Sparkles className="absolute -top-5 -left-5 w-24 h-24 text-primary/30 opacity-50 transform rotate-12" />
          <Sparkles className="absolute -bottom-8 -right-8 w-32 h-32 text-pink-400/30 opacity-40 transform -rotate-12" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
              <Lock className="w-10 h-10 text-primary flex-shrink-0" />
              <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-left text-gray-100">
                Desbloqueie Insights Completos e Trilhas Personalizadas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {planBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300">
                  <CircleCheck className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-5 pt-6 border-t border-primary/20">
              <Button
                size="lg"
                onClick={() => router.push("/plans")}
                className="group text-base font-medium bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white shadow-lg transition-all duration-300 hover:shadow-primary/40 transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Ver Planos e Adquirir
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push(`/forms/firstPart`)}
                className="text-base font-medium bg-transparent border-gray-500 text-gray-300 hover:border-gray-200 hover:bg-gray-800/50 hover:text-gray-100 shadow-sm transform hover:scale-[1.03] active:scale-[0.98]"
                disabled={loading}
              >
                <RefreshCcw className="mr-2 h-5 w-5" />
                Refazer Diagnóstico
              </Button>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center text-base text-gray-400 border-t border-gray-700/50 pt-8 mt-16">
          <p>
            Lembre-se: este é um resumo baseado nas dimensões avaliadas. O relatório completo oferece análises detalhadas e um plano de ação estratégico para sua empresa.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AiAnswerPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <Loader className="w-10 h-10 animate-spin text-primary" />
        Carregando...
      </div>
    }>
      <AiAnswerContent />
    </Suspense>
  );
}
