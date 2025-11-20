"use client";
import { useEffect, useState } from "react";
import { House, Target, Rocket, Activity, Megaphone, Flag, Lightbulb, Sparkles, Clock, GraduationCap, Users, BarChart3 } from "lucide-react";

interface UserInfo {
  nome?: string;
  cargo_responsavel?: string; // Admin | Funcionario | Gestao
}

// Util: lê usuário do localStorage de forma segura
function useUsuarioLogado(): UserInfo | null {
  const [user, setUser] = useState<UserInfo | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("usuarioLogado");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);
  return user;
}

export function DashboardOverview() {
  const user = useUsuarioLogado();
  const cargo = user?.cargo_responsavel; // Admin | Funcionario | Gestao
  const nome = user?.nome || "Usuário";

  return (
    <div className="space-y-10 animate-in fade-in">
      {/* Header com Objetivo Global */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 shadow-lg shadow-black/40">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#ff4687]/25 via-[#4d2cc4]/15 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -right-16 w-96 h-96 rounded-full bg-gradient-to-tr from-[#4d2cc4]/30 via-[#22d3ee]/10 to-transparent blur-3xl" />
        </div>
        <div className="relative flex items-start gap-5">
          <div className="p-3 rounded-xl bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white shadow-lg">
            <Rocket size={26} />
          </div>
          <div className="space-y-2 max-w-xl">
            <h1 className="text-2xl font-semibold bg-linear-to-r from-[#ff4687] to-[#4d2cc4] bg-clip-text text-transparent">
              Olá, {nome}
            </h1>
            <p className="text-sm text-white/60 leading-relaxed">
              Objetivo Global do Trimestre: <span className="text-white/80 font-medium">Aumentar retenção de clientes para 97% e acelerar conclusão das trilhas críticas acima de 70%.</span>
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-white/50">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Retenção</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Aprendizagem</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Engajamento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse Metrics - sempre visível, alguns dados sensíveis marcados */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Engajamento Hoje', value: '74%', icon: Activity, tag: 'Geral' },
          { label: 'Conclusão Trilhas', value: '58%', icon: GraduationCap, tag: 'Aprendizagem' },
          { label: 'Satisfação (CSAT)', value: '92', icon: Users, tag: 'Clientes' },
          { label: 'MRR (Visão Gestão)', value: cargo === 'Gestao' || cargo === 'Admin' ? 'R$ 120k' : 'Restrito', icon: BarChart3, tag: 'Financeiro' }
        ].map(c => {
          const Icon = c.icon;
          const restricted = c.value === 'Restrito';
          return (
            <div key={c.label} className={`relative rounded-2xl border border-white/10 bg-white/5 p-5 transition ${restricted ? 'opacity-70 backdrop-blur-sm' : 'hover:border-[#ff4687]/40'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white">
                  <Icon size={18} />
                </div>
                <h3 className="text-white/90 text-sm font-medium">{c.label}</h3>
              </div>
              <p className="text-white/80 text-xl font-semibold">{c.value}</p>
              <span className="absolute top-3 right-4 text-[10px] uppercase tracking-wide text-white/30">{c.tag}</span>
              {restricted && (
                <p className="mt-2 text-[10px] text-white/40">Disponível apenas para Gestão</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Feed de Atividades Unificado */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white">
                <Megaphone size={18} />
              </div>
              <h2 className="text-white/90 font-medium">Comunicados & Atualizações</h2>
            </div>
            <ul className="space-y-3 text-xs text-white/65">
              <li className="flex gap-2">
                <Flag size={14} className="text-[#ff4687] mt-[2px]" />
                Nova meta de retenção definida para Q1.
              </li>
              <li className="flex gap-2">
                <Lightbulb size={14} className="text-[#4d2cc4] mt-[2px]" />
                Módulo "Negociação Avançada" liberado na trilha Comercial.
              </li>
              <li className="flex gap-2">
                <Clock size={14} className="text-[#22d3ee] mt-[2px]" />
                SLA médio de atendimento caiu para 58min esta semana.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white">
                <Target size={18} />
              </div>
              <h2 className="text-white/90 font-medium">Foco & Sugestões</h2>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              A Inteligência sugere reforçar conteúdos de <span className="text-white/80">Negociação</span> e <span className="text-white/80">Gestão de Prioridades</span> para elevar taxa de conversão e reduzir tempo de resposta.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-white/50">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Rever Módulo</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Enviar Feedback</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Marcar Revisão</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white">
                <Sparkles size={18} />
              </div>
              <h2 className="text-white/90 font-medium">Spotlight Aprendizagem</h2>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              Destaque da semana: <span className="text-white/80">"Negociação Avançada"</span>. 34 colaboradores iniciaram o módulo; taxa de conclusão média está em 41%.
            </p>
            <div className="flex gap-2 text-[10px] flex-wrap">
              {['Iniciar Agora', 'Ver Feedbacks', 'Recomendar a Equipe'].map(a => (
                <span key={a} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60 hover:border-[#ff4687]/40 cursor-pointer transition">{a}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Quick Actions sempre disponíveis */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-white/90 text-sm font-medium mb-4">Ações Rápidas</h2>
            <div className="grid gap-3 text-[11px]">
              <a href="/dashboard/trilhas" className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Ver Trilhas</a>
              <a href="/dashboard/mandala" className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Mandala</a>
              <a href="/dashboard/atendimento" className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Atendimento</a>
              <a href="/dashboard/comercial" className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Comercial</a>
              <a href="/dashboard/gestores" className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/70 hover:text-white hover:border-[#ff4687]/50 transition">Gestores</a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-white/90 text-sm font-medium mb-4">Próximos Degraus</h2>
            <ul className="space-y-2 text-xs text-white/60">
              <li>• Finalize módulo de negociação (restante 22 min).</li>
              <li>• Revise feedbacks da equipe suporte.</li>
              <li>• Planeje ação para aumentar engajamento (+5%).</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-white/90 text-sm font-medium mb-4">Colaboração</h2>
            <p className="text-xs text-white/60 leading-relaxed mb-3">Ideias em discussão:
              <br />• Implementar micro-certificações.
              <br />• Automatizar alertas de risco de churn.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-white/50">
              <span className="px-2 py-1 rounded bg-black/30 border border-white/10">Adicionar Ideia</span>
              <span className="px-2 py-1 rounded bg-black/30 border border-white/10">Votar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
