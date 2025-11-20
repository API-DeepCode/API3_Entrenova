// Caminho: api3/app/AiAnswer/page.tsx
 "use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { getCompleteFormData } from '@/app/lib/formStorage';
import { Lock, ArrowRight, Sparkles, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function AiAnswerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [relatorio, setRelatorio] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFullAccess, setHasFullAccess] = useState<boolean>(false);

  const unlockContent = () => {
    setHasFullAccess(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("ai_report_unlocked", "true");
    }
  };

  useEffect(() => {
    const paid =
      searchParams.get("paid") === "true" ||
      searchParams.get("status") === "paid" ||
      searchParams.get("access") === "full";
    const storedUnlock = typeof window !== "undefined" && localStorage.getItem("ai_report_unlocked") === "true";
    const unlocked = paid || storedUnlock;
    setHasFullAccess(unlocked);
    if (paid && typeof window !== "undefined") {
      localStorage.setItem("ai_report_unlocked", "true");
    }
  }, [searchParams]);

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

  const formattedBlocks = useMemo(() => {
    if (!relatorio) return [];
    return relatorio
      .trim()
      .split(/\n\s*\n/)
      .map((block) => {
        const lines = block
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        const allBullets = lines.length > 0 && lines.every((l) => l.startsWith("-"));
        const content = allBullets
          ? lines.map((l) => l.replace(/^-\s*/, "").replace(/^#+\s*/, "").trim())
          : lines.map((l) => l.replace(/^#+\s*/, "").trim());
        return { bullets: allBullets, content };
      });
  }, [relatorio]);

  const headlineBlock = formattedBlocks.find((b) => !b.bullets);
  const headline = headlineBlock?.content?.[0] ?? "Resumo gerado pela IA";
  const subheadline =
    headlineBlock?.content?.slice(1).join(" ") ||
    "Visao executiva baseada nas respostas enviadas.";
  const remainingNarrative = formattedBlocks.filter(
    (b) => !b.bullets && b !== headlineBlock
  );
  const bulletBlocks = formattedBlocks.filter((b) => b.bullets);

  const showBlurredContent = !hasFullAccess && !!relatorio;

  const highlightRegex = useMemo(
    () =>
      /(Pessoas e Cultura|Estrutura e Operac(?:o|ç)oes|Estrutura e Operac(?:o|ç)(?:ões|oes)|Mercado e Clientes|Direc(?:a|ã)o e Futuro|Direc(?:a|ã)o e Futuro|Pontos? Fortes?|Pontos? Fracos?|Ponto Forte|Ponto Fraco)/gi,
    []
  );

  const renderWithHighlights = (text: string) => {
    if (!text) return null;
    const tokens = text.split(highlightRegex);
    return (
      <>
        {tokens.map((tok, idx) => {
          const key = tok.toLowerCase();
          if (key.match(/pessoas e cultura/)) {
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-200 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                Pessoas e Cultura
              </span>
            );
          }
          if (key.match(/estrutura e oper/)) {
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-200 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                Estrutura e Operações
              </span>
            );
          }
          if (key.match(/mercado e clientes/)) {
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-900/30 text-cyan-200 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
                Mercado e Clientes
              </span>
            );
          }
          if (key.match(/direc/)) {
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-200 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-purple-400" aria-hidden />
                Direção e Futuro
              </span>
            );
          }
          if (key.match(/pontos?\s+fort/)) {
            return (
              <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-100 font-semibold">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />
                Ponto Forte
              </span>
            );
          }
          if (key.match(/pontos?\s+frac/)) {
            return (
              <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-100 font-semibold">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-300" aria-hidden />
                Ponto Fraco
              </span>
            );
          }
          return <span key={idx}>{tok}</span>;
        })}
      </>
    );
  };

  const handleDownloadPdf = () => {
    if (!relatorio) return;
    const win = window.open("", "_blank", "width=900,height=1200");
    if (!win) return;
    const html = `
      <html>
        <head>
          <title>Diagnóstico AI</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #0b0b19; }
            h1 { margin-bottom: 18px; }
            p { margin: 8px 0; line-height: 1.5; }
            ul { margin: 8px 0 16px 18px; }
          </style>
        </head>
        <body>
          <h1>Diagnóstico AI</h1>
          ${relatorio
            .split(/\\n\\s*\\n/)
            .map((block) => {
              const lines = block
                .split("\\n")
                .map((l) => l.trim())
                .filter(Boolean);
              const allBullets = lines.length > 0 && lines.every((l) => l.startsWith("-"));
              const sanitize = (txt: string) => txt.replace(/^[-#]+\s*/, "");
              if (allBullets) {
                return `<ul>${lines
                  .map((l) => `<li>${sanitize(l)}</li>`)
                  .join("")}</ul>`;
              }
              return lines.map((p) => `<p>${sanitize(p)}</p>`).join("");
            })
            .join("")}
          <script>window.print();</script>
        </body>
      </html>
    `;
    win.document.write(html);
    win.document.close();
  };

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
        <div className="p-10 rounded-2xl bg-gradient-to-br from-[#0d0b1f] via-[#1a0f46] to-[#0b102a] border border-white/10 shadow-[0_28px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-28 -right-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" aria-hidden />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 relative z-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5" /> Insight AI
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-white">
                Diagnóstico estratégico da sua empresa
              </h2>
              <p className="text-sm text-white/70 mt-1">
                Resumo inteligente baseado nas respostas do formulário.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
              <Loader className="h-5 w-5 animate-spin text-primary" aria-hidden />
              <div className="text-sm leading-tight">
                {loading ? (
                  <span>Gerando análise personalizada...</span>
                ) : error ? (
                  <span className="text-red-300">Erro ao gerar relatório</span>
                ) : (
                  <span>Relatório preliminar pronto</span>
                )}
              </div>
            </div>
          </div>

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
            <div className="space-y-10 relative z-10">

              {/* Dimensão desbloqueada */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-transparent border border-emerald-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-500/20 p-2 border border-emerald-400/40">
                      <Sparkles className="w-6 h-6 text-emerald-200" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-emerald-50">
                        Dimensão 1 — {relatorio?.split('\n')[0] || "Liderança e Estratégia"}
                      </h3>
                      <p className="text-sm text-emerald-100/80">
                        Recorte destacado para você visualizar o tom do relatório completo.
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/10 text-emerald-100 border border-white/15">
                    Prévia liberada
                  </Badge>
                </div>

                <div className={`relative rounded-xl border border-white/10 bg-black/25 p-5 sm:p-6 ${showBlurredContent ? "max-h-80 overflow-hidden" : ""}`} style={{ fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
                  <div className="space-y-6 text-gray-100 leading-relaxed">
                    {formattedBlocks.length === 0 && (
                      <p className="text-gray-300">O diagnostico da primeira dimensao foi gerado com sucesso.</p>
                    )}

                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.34em] text-emerald-200/80">Resumo executivo</div>
                      <div className="text-2xl sm:text-3xl font-semibold text-white leading-snug">{headline}</div>
                      <p className="text-white/85 text-base">{subheadline}</p>
                    </div>

                    {bulletBlocks.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                          <Sparkles className="h-4 w-4 text-emerald-200" />
                          Insights chave
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          {bulletBlocks.map((block, idx) => (
                            <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                              <ul className="space-y-2 text-white/90 list-disc list-inside">
                                {block.content.map((item, i) => (
                                  <li key={i}>{renderWithHighlights(item)}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {remainingNarrative.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                          <Sparkles className="h-4 w-4 text-emerald-200" />
                          Detalhamento
                        </div>
                        <div className="space-y-3 text-white/90">
                          {remainingNarrative.map((block, idx) => (
                            <div key={idx} className="space-y-2">
                              {block.content.map((p, i) => (
                                <p key={i}>{renderWithHighlights(p)}</p>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {showBlurredContent && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[#0b0b19]/50 to-[#0b0b19] backdrop-blur-md" />
                  )}

                  {showBlurredContent && (
                    <div className="absolute inset-x-4 bottom-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-lg px-4 py-3 shadow-lg">
                      <div className="flex items-center gap-3 text-sm text-white">
                        <Lock className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-semibold">Desbloqueie o relatório completo</p>
                          <p className="text-white/70">Acesso às 4 dimensões + recomendações estratégicas.</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-pink-500 text-white hover:scale-[1.02] shadow-md"
                        onClick={unlockContent}
                      >
                        Liberar resposta agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* CTA para planos e PDF */}
        <div className="relative mt-8 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b031f] via-[#120c30] to-[#0a0a18] shadow-[0_22px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(650px_480px_at_15%_25%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(520px_420px_at_85%_10%,rgba(255,255,255,0.08),transparent_35%)] pointer-events-none" aria-hidden />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_auto] lg:items-center">
            <div className="space-y-3 text-white max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
                <Sparkles className="h-3.5 w-3.5" /> Proximo passo
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold leading-tight">
                Desbloqueie o relatorio completo e receba um PDF para compartilhar
              </h3>
              <p className="text-sm text-white/75">
                Acesse as 4 dimensoes, recomendacoes estrategicas e um PDF pronto para levar a lideranca. Visualizacao ilimitada apos a liberacao.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                size="lg"
                className="flex-1 sm:flex-none bg-gradient-to-r from-[#4d2cc4] via-primary to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02]"
                onClick={unlockContent}
              >
                Liberar resposta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 sm:flex-none border-white/30 text-white hover:bg-white/10"
                onClick={handleDownloadPdf}
                disabled={!relatorio}
              >
                Baixar previa em PDF
              </Button>
            </div>
          </div>
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
