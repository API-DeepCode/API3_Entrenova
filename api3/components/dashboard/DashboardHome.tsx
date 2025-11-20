"use client";
import { useEffect, useState } from "react";
import { WelcomePanel } from "@/components/dashboard/WelcomePanel";
import { Rocket, Calendar, Flag, Target, Users, BarChart3, FileText, Sparkles, Newspaper, ChevronRight, Activity, CheckCircle2, Eye, EyeOff, Bookmark, X } from "lucide-react";
import Link from "next/link";

interface UserInfo { nome?: string; cargo_responsavel?: string; }
interface TimelineStep {
  id: number;
  titulo: string;
  duracao: string;
  status: "concluído" | "atual" | "próximo" | "aguardando";
  descricao: string;
  entregaveis: string[];
  sugestoes: string[];
}
interface WeekPlan {
  semana: number;
  titulo: string;
  foco: string;
  objetivos: string[];
  entregaveis: string[];
  metricas: string[];
  recursos: string[];
}
interface NewsItem {
  id: string;
  titulo: string;
  tipo: string;
  icon: any;
  dataISO: string;
  resumo: string;
  acao: string;
}
function useUsuarioLogado(): UserInfo | null {
  const [user, setUser] = useState<UserInfo | null>(null);
  useEffect(() => {
    try { const raw = localStorage.getItem("usuarioLogado"); if (raw) setUser(JSON.parse(raw)); } catch { setUser(null); }
  }, []);
  return user;
}

// Planejamento adaptável
function PlanningTimeline({ cargo }: { cargo?: string }) {
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1); // etapa atual (1..5)
  const [viewDetalhada, setViewDetalhada] = useState<boolean>(false);
  useEffect(() => {
    try {
      const storedEtapa = localStorage.getItem("trilhaEtapaAtual");
      if (storedEtapa) setCurrentIndex(parseInt(storedEtapa, 10));
      const storedView = localStorage.getItem("trilhaViewDetalhada");
      if (storedView) setViewDetalhada(storedView === "true");
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("trilhaEtapaAtual", String(currentIndex)); } catch { /* ignore */ }
  }, [currentIndex]);
  useEffect(() => {
    try { localStorage.setItem("trilhaViewDetalhada", String(viewDetalhada)); } catch { /* ignore */ }
  }, [viewDetalhada]);
  // Normaliza cargo removendo acentos e lower-case
  const cargoNorm = cargo?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (!cargoNorm) return null;
  if (cargoNorm === "funcionario") {
    // Resumo por fases (mantém as 5 macro etapas)
    const steps: TimelineStep[] = [
      { id: 1, titulo: "Onboarding", duracao: "Semana 1", status: currentIndex > 1 ? "concluído" : currentIndex === 1 ? "atual" : "próximo", descricao: "Ambientação, acesso às ferramentas e primeiros recursos.", entregaveis: ["Checklist de acesso", "Perfil completo", "Primeiro login"], sugestoes: ["Explorar FAQ interno", "Assistir vídeo de boas-vindas"] },
      { id: 2, titulo: "Fundamentos", duracao: "Semanas 2-3", status: currentIndex > 2 ? "concluído" : currentIndex === 2 ? "atual" : currentIndex < 2 ? "próximo" : "aguardando", descricao: "Blocos essenciais para base técnica e de negócio.", entregaveis: ["Módulo 1 concluído", "Quiz de fundamentos", "Checklist de conceitos"], sugestoes: ["Rever anotações do módulo", "Participar de micro-aula ao vivo"] },
      { id: 3, titulo: "Aplicação Prática", duracao: "Semanas 4-5", status: currentIndex > 3 ? "concluído" : currentIndex === 3 ? "atual" : currentIndex < 3 ? "próximo" : "aguardando", descricao: "Exercícios guiados e casos de uso internos.", entregaveis: ["Case 1 enviado", "Feedback mentor recebido"], sugestoes: ["Simular fluxo real", "Registrar dúvidas frequentes"] },
      { id: 4, titulo: "Projeto Guiado", duracao: "Semanas 6-7", status: currentIndex > 4 ? "concluído" : currentIndex === 4 ? "atual" : currentIndex < 4 ? "próximo" : "aguardando", descricao: "Construção de mini-projeto validado por mentor.", entregaveis: ["Repositório inicial", "MVP funcional"], sugestoes: ["Solicitar revisão estruturada", "Testar cenários edge"] },
      { id: 5, titulo: "Avaliação & Feedback", duracao: "Semana 8", status: currentIndex > 5 ? "concluído" : currentIndex === 5 ? "atual" : currentIndex < 5 ? "próximo" : "aguardando", descricao: "Avaliação formal e plano de expansão.", entregaveis: ["Avaliação final", "Plano de desenvolvimento"], sugestoes: ["Registrar lições aprendidas", "Definir metas para próximo ciclo"] }
    ];
    const totalSteps = steps.length;
    const activeIndex = steps.findIndex(s => s.status === "atual");
    const progressPercent = ((activeIndex + 1) / totalSteps) * 100;

    // Visão detalhada semana a semana (8 semanas)
    const weekPlan: WeekPlan[] = [
      {
        semana: 1,
        titulo: "Ambientação & Ferramentas",
        foco: "Acesso e primeiros contatos",
        objetivos: ["Realizar tour pela plataforma", "Completar perfil", "Entender trilhas disponíveis"],
        entregaveis: ["Perfil 100%", "Lista de dúvidas iniciais"],
        metricas: ["Tempo primeira sessão", "% perfil completo"],
        recursos: ["Vídeo Boas-Vindas", "FAQ Interno", "Canal suporte"]
      },
      {
        semana: 2,
        titulo: "Fundamentos Parte 1",
        foco: "Construção base conceitual",
        objetivos: ["Concluir Módulo Fundamentos A", "Passar no Quiz A"],
        entregaveis: ["Quiz A >= 80%", "Notas de estudo"],
        metricas: ["Score Quiz A", "Tempo médio módulo"],
        recursos: ["Slides Módulo A", "Checklist conceitos"]
      },
      {
        semana: 3,
        titulo: "Fundamentos Parte 2",
        foco: "Consolidação e reforço",
        objetivos: ["Concluir Módulo Fundamentos B", "Revisar pontos fracos"],
        entregaveis: ["Quiz B >= 80%", "Mapa de lacunas"],
        metricas: ["Score Quiz B", "% revisão feita"],
        recursos: ["Mentoria rápida", "Quiz Diagnóstico"]
      },
      {
        semana: 4,
        titulo: "Aplicação Prática 1",
        foco: "Exercícios guiados",
        objetivos: ["Resolver Case Simples", "Enviar para feedback"],
        entregaveis: ["Case 1 enviado", "Feedback registrado"],
        metricas: ["Tempo resolução", "Qtd ajustes"],
        recursos: ["Template Case", "Guia Boas Práticas"]
      },
      {
        semana: 5,
        titulo: "Aplicação Prática 2",
        foco: "Complexidade moderada",
        objetivos: ["Resolver Case Intermediário", "Comparar com Case 1"],
        entregaveis: ["Case 2 enviado", "Checklist melhorias"],
        metricas: ["Erros repetidos", "Qualidade feedback"],
        recursos: ["Exemplos internos", "Canal dúvidas"]
      },
      {
        semana: 6,
        titulo: "Projeto Guiado – Estrutura",
        foco: "Planejamento e setup",
        objetivos: ["Definir escopo MVP", "Criar repositório"],
        entregaveis: ["README inicial", "Backlog básico"],
        metricas: ["Itens backlog definidos", "Status repositório"],
        recursos: ["Template README", "Guia backlog"]
      },
      {
        semana: 7,
        titulo: "Projeto Guiado – Implementação",
        foco: "Construção MVP",
        objetivos: ["Codificar funcionalidades core", "Testar principais fluxos"],
        entregaveis: ["MVP funcional", "Lista de testes"],
        metricas: ["Cobertura testes", "Funcionalidades concluídas"],
        recursos: ["Checklist testes", "Mentoria semanal"]
      },
      {
        semana: 8,
        titulo: "Avaliação & Evolução",
        foco: "Encerramento e plano futuro",
        objetivos: ["Apresentar MVP", "Receber avaliação formal"],
        entregaveis: ["Avaliação final", "Plano próximo ciclo"],
        metricas: ["Score avaliação", "Qtd metas futuras"],
        recursos: ["Formulário avaliação", "Template plano desenvolvimento"]
      }
    ];

    return (
      <section className="space-y-8" aria-label="Calendário de desenvolvimento" role="region">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Calendar size={18} /> Calendário da Trilha (8 Semanas)</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewDetalhada(v => !v)}
              className="text-xs flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition"
              aria-pressed={viewDetalhada}
            >{viewDetalhada ? 'Visão Resumida' : 'Visão Detalhada'} <ChevronRight size={14} /></button>
            <Link href="/dashboard/trilhas" className="text-xs flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#ff4687]/50 transition">Trilhas <ChevronRight size={14} /></Link>
          </div>
        </header>

        {/* Barra de progresso macro */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-white/50"><span>Progresso Macro</span><span className="text-white/60">{Math.round(((currentIndex) / totalSteps) * 100)}%</span></div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(((currentIndex) / totalSteps) * 100)} role="progressbar">
            <div style={{ width: `${((currentIndex) / totalSteps) * 100}%` }} className="h-full bg-gradient-to-r from-[#ff4687] via-[#a855f7] to-[#4d2cc4] transition-all" />
          </div>
        </div>

        {!viewDetalhada && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
            {steps.map(step => (
              <button
                key={step.id}
                type="button"
                onClick={() => setSelectedStep(step)}
                className={`group text-left rounded-xl border border-white/10 p-4 text-xs bg-white/5 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4687] transition ${step.status === 'atual' ? 'ring-2 ring-[#ff4687]' : 'hover:border-[#ff4687]/40'}`}
                aria-label={`Etapa ${step.titulo}, status ${step.status}`}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#ff4687]/10 to-[#4d2cc4]/10 transition" />
                <p className="text-white/80 font-medium mb-1 flex items-center gap-1">{step.titulo} {step.status === 'concluído' && <CheckCircle2 size={12} className="text-[#a6ff00]" />}</p>
                <p className="text-white/50 mb-1">{step.duracao}</p>
                <p className="text-[10px] text-white/40 leading-relaxed mb-2 line-clamp-3">{step.descricao}</p>
                <span className="inline-block px-2 py-1 rounded-full text-[10px] tracking-wide uppercase bg-white/10 text-white/50">{step.status}</span>
              </button>
            ))}
          </div>
        )}

        {viewDetalhada && (
          <div className="space-y-4" role="list">
            {weekPlan.map(sem => (
              <details
                key={sem.semana}
                className="group rounded-xl border border-white/10 bg-white/5 open:bg-white/10 transition"
              >
                <summary className="cursor-pointer select-none list-none p-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">Semana {sem.semana} • {sem.titulo}</span>
                    <span className="text-[10px] text-white/40">Foco: {sem.foco}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full ${currentIndex >= Math.min(5, Math.ceil(sem.semana/ (8/5))) ? 'bg-gradient-to-r from-[#ff4687] to-[#4d2cc4]' : 'bg-white/20'} transition-all`} style={{ width: '100%' }} />
                  </div>
                </summary>
                <div className="px-4 pb-4 space-y-3 text-[11px] text-white/60">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="uppercase tracking-wide text-white/40 mb-1">Objetivos</p>
                      <ul className="list-disc pl-4 space-y-1">{sem.objetivos.map(o => <li key={o}>{o}</li>)}</ul>
                    </div>
                    <div>
                      <p className="uppercase tracking-wide text-white/40 mb-1">Entregáveis</p>
                      <ul className="list-disc pl-4 space-y-1">{sem.entregaveis.map(e => <li key={e}>{e}</li>)}</ul>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="uppercase tracking-wide text-white/40 mb-1">Métricas</p>
                      <ul className="list-disc pl-4 space-y-1">{sem.metricas.map(m => <li key={m}>{m}</li>)}</ul>
                    </div>
                    <div>
                      <p className="uppercase tracking-wide text-white/40 mb-1">Recursos</p>
                      <ul className="list-disc pl-4 space-y-1">{sem.recursos.map(r => <li key={r}>{r}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}

        {selectedStep && !viewDetalhada && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4 animate-in fade-in" aria-live="polite">
            <h3 className="text-white/90 text-sm font-semibold flex items-center gap-2"><Activity size={16} /> Detalhes • {selectedStep.titulo}</h3>
            <p className="text-[12px] text-white/60 leading-relaxed">{selectedStep.descricao}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-white/40 mb-2">Entregáveis</p>
                <ul className="space-y-1 text-[11px] text-white/60 list-disc pl-4">{selectedStep.entregaveis.map(e => <li key={e}>{e}</li>)}</ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-white/40 mb-2">Sugestões</p>
                <ul className="space-y-1 text-[11px] text-white/60 list-disc pl-4">{selectedStep.sugestoes.map(s => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <Link href="/dashboard/trilhas" className="px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-white/60 hover:text-white hover:border-[#ff4687]/40 transition">Ir para Trilhas</Link>
              <button
                onClick={() => {
                  const next = selectedStep.id + 1;
                  if (next <= totalSteps) {
                    setSelectedStep(steps.find(s => s.id === next) || null);
                    setCurrentIndex(next);
                  }
                }}
                disabled={selectedStep.id === totalSteps}
                className="px-3 py-1 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white disabled:opacity-40 text-[11px]"
              >Avançar Etapa</button>
              <button
                onClick={() => setSelectedStep(null)}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-[#ff4687]/40 transition"
              >Fechar</button>
            </div>
          </div>
        )}
      </section>
    );
  }
  if (cargoNorm === "gestao" || cargoNorm === "gestao" || cargoNorm === "gestao") { // redundante mas seguro
    const ciclos = [
      { ciclo: "Q1 Competências", inicio: "01/01", fim: "31/03", foco: "Mapeamento de gaps chave" },
      { ciclo: "Q2 Feedback 360", inicio: "01/04", fim: "30/06", foco: "Feedback multi-fonte estruturado" },
      { ciclo: "Q3 Desenvolvimento", inicio: "01/07", fim: "30/09", foco: "Execução de plano individual" },
      { ciclo: "Q4 Avaliação Final", inicio: "01/10", fim: "31/12", foco: "Consolidação e próximos degraus" }
    ];
    return (
      <section className="space-y-5">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Target size={18} /> Ciclos de Feedback & Competências</h2>
          <Link href="/dashboard/colaboradores" className="text-xs flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Gerenciar <ChevronRight size={14} /></Link>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ciclos.map(c => (
            <div key={c.ciclo} className="group rounded-xl border border-white/10 p-4 text-xs bg-white/5 hover:border-[#ff4687]/40 transition relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#ff4687]/10 to-[#4d2cc4]/10 transition" />
              <p className="text-white/80 font-medium mb-1 flex items-center gap-1">{c.ciclo}</p>
              <p className="text-white/50 text-[11px] mb-1">{c.inicio} → {c.fim}</p>
              <p className="text-[10px] text-white/40 leading-relaxed line-clamp-3">{c.foco}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  // Interno / Admin (metas estratégicas & comercial)
  const metas = [
    { periodo: "Jan-Mar", meta: "Aumentar retenção para 97%", indicador: "Retenção Atual: 94%" },
    { periodo: "Abr-Jun", meta: "Escalar funil +30% leads qualificados", indicador: "Status: Em preparação" },
    { periodo: "Jul-Set", meta: "Reduzir churn em 2pp", indicador: "Churn Atual: 8%" },
    { periodo: "Out-Dez", meta: "Lançar 2 novas trilhas estratégicas", indicador: "1 em design" }
  ];
  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Flag size={18} /> Roadmap de Metas Anuais</h2>
        <div className="flex gap-2">
          <Link href="/dashboard/estrategico" className="text-xs flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Estratégico <ChevronRight size={14} /></Link>
          <Link href="/dashboard/comercial" className="text-xs flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Comercial <ChevronRight size={14} /></Link>
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metas.map(m => (
          <div key={m.periodo} className="group rounded-xl border border-white/10 p-4 text-xs bg-white/5 hover:border-[#ff4687]/40 transition relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#ff4687]/10 to-[#4d2cc4]/10 transition" />
            <p className="text-white/80 font-medium mb-1 flex items-center gap-1">{m.periodo}</p>
            <p className="text-white/50 leading-relaxed text-[11px] mb-1">{m.meta}</p>
            <p className="text-[10px] text-white/40">{m.indicador}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DiagnosticCard({ cargo }: { cargo?: string }) {
  const shouldShow = cargo === "Gestao" || cargo === "Admin";
  const [status, setStatus] = useState<string>("carregando...");
  useEffect(() => {
    try {
      const completed = parseInt(localStorage.getItem("diagnosticoFormsCompleted") || "0", 10);
      const total = 3; // placeholder
      if (completed >= total) setStatus("Diagnóstico inicial completo.");
      else setStatus(`Falta ${total - completed} formulário(s) para completar a fase inicial.`);
    } catch {
      setStatus("Não foi possível ler o status agora.");
    }
  }, []);
  if (!shouldShow) return null;
  return (
    <section className="space-y-4">
      <header className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2"><FileText size={18} /> Seu Diagnóstico está Aqui</h2>
      </header>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md group hover:border-[#ff4687]/50 transition relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#4d2cc4]/20 via-[#ff4687]/10 to-transparent transition" />
        <p className="text-sm text-white/80 mb-2">{status}</p>
        <p className="text-[11px] text-white/50 mb-4">Acesse o relatório simples gerado na Sprint 1 para visualizar insights iniciais.</p>
        <Link href="/AiAnswer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white shadow-md shadow-black/30 hover:shadow-[#ff4687]/30 hover:opacity-95 transition">
          Ver Relatório <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function NewsFeed() {
  const [filtro, setFiltro] = useState<string>("Todos");
  const [lidos, setLidos] = useState<Record<string, boolean>>({});
  const categorias = ["Todos", "Trilhas", "Plataforma", "Gestão"];
  useEffect(() => {
    try { const raw = localStorage.getItem("newsLidos"); if (raw) setLidos(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("newsLidos", JSON.stringify(lidos)); } catch { /* ignore */ }
  }, [lidos]);
  const news: NewsItem[] = [
    { id: "n1", titulo: "Nova Trilha de Liderança Lançada", tipo: "Trilhas", icon: Rocket, dataISO: new Date().toISOString(), resumo: "Foco em competências de influência e feedback estruturado.", acao: "/dashboard/trilhas" },
    { id: "n2", titulo: "Funcionalidade de Configurações Expandida", tipo: "Plataforma", icon: Sparkles, dataISO: new Date(Date.now() - 86400000).toISOString(), resumo: "Novos parâmetros de personalização de metas e alertas.", acao: "/dashboard/config-empresa" },
    { id: "n3", titulo: "Módulo de Feedback 360 Atualizado", tipo: "Gestão", icon: Users, dataISO: new Date(Date.now() - 2*86400000).toISOString(), resumo: "Interface simplificada e relatórios comparativos avançados.", acao: "/dashboard/gestores" },
    { id: "n4", titulo: "Novo Relatório de Engajamento Mensal", tipo: "Plataforma", icon: BarChart3, dataISO: new Date(Date.now() - 3*86400000).toISOString(), resumo: "Visualize picos de uso e áreas com baixa interação.", acao: "/AiAnswer" }
  ];
  const filtradas = news.filter(n => filtro === "Todos" || n.tipo === filtro);
  function diasDesde(dataISO: string) {
    const diff = Date.now() - new Date(dataISO).getTime();
    const dias = Math.floor(diff / 86400000);
    if (dias === 0) return "Hoje";
    if (dias === 1) return "Ontem";
    return `${dias}d atrás`;
  }
  return (
    <section className="space-y-6" aria-label="Feed de notícias" role="region">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Newspaper size={18} /> Notícias & Novidades</h2>
        <div className="flex gap-2 items-center">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`text-[11px] px-3 py-1 rounded-lg border transition ${filtro === cat ? 'bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white border-transparent' : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:border-[#ff4687]/40'}`}
              aria-pressed={filtro === cat}
            >{cat}</button>
          ))}
        </div>
      </header>
      {filtradas.length === 0 && <p className="text-[12px] text-white/40">Nenhuma notícia para a categoria selecionada.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {filtradas.map(n => {
          const Icon = n.icon;
          const estaLido = !!lidos[n.id];
          return (
            <article key={n.id} role="listitem" className={`group rounded-xl border border-white/10 p-4 text-xs bg-white/5 transition relative overflow-hidden ${estaLido ? 'opacity-70' : 'hover:border-[#ff4687]/40'}`} aria-label={`Notícia: ${n.titulo}`}>              
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#ff4687]/10 to-[#4d2cc4]/10 transition" />
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white"><Icon size={16} /></div>
                <p className="text-white/80 font-medium leading-snug line-clamp-2">{n.titulo}</p>
              </div>
              <div className="flex items-center justify-between mt-1 mb-2"><span className="text-[10px] uppercase tracking-wide text-white/40">{n.tipo}</span><span className="text-[10px] text-white/30">{diasDesde(n.dataISO)}</span></div>
              <p className="text-[10px] text-white/50 leading-relaxed line-clamp-3 mb-3">{n.resumo}</p>
              <div className="flex items-center gap-2">
                <Link href={n.acao} onClick={() => setLidos(prev => ({ ...prev, [n.id]: true }))} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-[#ff4687]/50 transition">Abrir <ChevronRight size={12} /></Link>
                <button onClick={() => setLidos(prev => ({ ...prev, [n.id]: !prev[n.id] }))} aria-label={estaLido ? 'Marcar como não lido' : 'Marcar como lido'} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-[#ff4687]/50 transition">{estaLido ? <EyeOff size={12} /> : <Eye size={12} />} {estaLido ? 'Ocultar' : 'Ler'}</button>
                <button aria-label="Favoritar notícia" className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-[#ff4687]/50 transition"><Bookmark size={12} /> Fav</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function DashboardHome() {
  const user = useUsuarioLogado();
  const cargo = user?.cargo_responsavel;
  const cargoNorm = cargo?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const nome = user?.nome || "Usuário";

  return (
    <div className="space-y-12 animate-in fade-in" role="main" aria-label="Visão inicial do Dashboard">
      <WelcomePanel />
      <div className="space-y-3">
        <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-semibold bg-linear-to-r from-[#ff4687] to-[#4d2cc4] bg-clip-text text-transparent tracking-tight" aria-live="polite">
          Início • Olá, {nome}
          {cargo && (
            <span className="text-xs md:text-sm px-2 py-1 rounded-full bg-white/10 border border-white/15 text-white/60">
              Cargo: {cargo}
            </span>
          )}
        </h1>
        <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">Acompanhe seu planejamento, evolução de metas e as novidades recentes da plataforma. Os blocos se adaptam ao perfil: <span className="text-white/70">Funcionário</span>, <span className="text-white/70">Gestão</span> ou <span className="text-white/70">Interno/Admin</span>.</p>
        <p className="text-[11px] text-white/40">Dados exibidos são ilustrativos. Integrações reais podem ser conectadas via serviços internos.</p>
      </div>
      <PlanningTimeline cargo={cargoNorm} />
      <DiagnosticCard cargo={cargo} />
      <NewsFeed />
    </div>
  );
}
