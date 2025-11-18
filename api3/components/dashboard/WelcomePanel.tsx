"use client";
import { useEffect, useState } from "react";
import { BarChart3, Headphones, TrendingUp, GraduationCap, Target, Award, Users, UserCog, Settings, Info } from "lucide-react";

interface SectionInfo {
  icon: any;
  label: string;
  description: string;
  category: string;
  id: string;
  details: string;
}

const sections: SectionInfo[] = [
  {
    id: "comercial",
    label: "Comercial",
    icon: BarChart3,
    category: "Interno",
    description: "Indicadores de vendas, funil e performance comercial.",
    details: "Use para acompanhar metas semanais, comparar taxa de conversão por etapa do funil e priorizar leads quentes. Dica: filtre por período para ver evolução."
  },
  {
    id: "atendimento",
    label: "Atendimento",
    icon: Headphones,
    category: "Interno",
    description: "Qualidade e métricas de atendimento ao cliente.",
    details: "Acompanhe tempo médio de resposta, satisfação (NPS) e tickets abertos vs resolvidos. Foco em reduzir pendências críticas."
  },
  {
    id: "estrategico",
    label: "Estratégico",
    icon: TrendingUp,
    category: "Interno",
    description: "Visão macro: crescimento, metas e KPIs principais.",
    details: "Painel executivo com métricas agregadas: crescimento mensal, churn, MRR e metas estratégicas para alinhamento em reuniões."
  },
  {
    id: "trilhas",
    label: "Trilhas & Aulas",
    icon: GraduationCap,
    category: "Funcionário",
    description: "Conteúdos educacionais e progresso em trilhas de aprendizagem.",
    details: "Selecione trilhas recomendadas conforme o cargo e acompanhe progresso percentual. Complete módulos para liberar novos conteúdos."
  },
  {
    id: "mandala",
    label: "Mandala",
    icon: Target,
    category: "Funcionário",
    description: "Mapa visual de desenvolvimento e competências.",
    details: "Visual radial das competências: identifique gaps e foque em áreas com menor pontuação para acelerar evolução."
  },
  {
    id: "conquistas",
    label: "Conquistas",
    icon: Award,
    category: "Funcionário",
    description: "Gamificação: badges e marcos atingidos.",
    details: "Badges refletem marcos de aprendizagem e performance. Use para motivação e reconhecimento interno."
  },
  {
    id: "gestores",
    label: "Gestores",
    icon: Users,
    category: "Gestão",
    description: "Visão consolidada de líderes e suas equipes.",
    details: "Compare indicadores entre gestores: produtividade, engajamento da equipe e evolução em treinamentos. Base para feedback estruturado."
  },
  {
    id: "colaboradores",
    label: "Colaboradores",
    icon: UserCog,
    category: "Gestão",
    description: "Gerenciamento de membros, status e dados gerais.",
    details: "Lista e status dos colaboradores: atividade recente, progresso educacional e sinalizações de atenção."
  },
  {
    id: "config-empresa",
    label: "Configurações",
    icon: Settings,
    category: "Gestão",
    description: "Ajustes gerais da empresa e parâmetros da plataforma.",
    details: "Personalize parâmetros de metas, estrutura de cargos e preferências globais da plataforma (ex: notificações)."
  }
];

const STORAGE_KEY = "dashboardOnboardingDismissed";
const OPEN_EVENT = "open-dashboard-onboarding";

export function WelcomePanel() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<SectionInfo | null>(null);

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";
    setOpen(!dismissed);
    setLoaded(true);
    const handler = () => {
      setOpen(true);
      // opcional: marcar como não dismiss para próxima vez
      localStorage.setItem(STORAGE_KEY, "false");
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  if (!loaded || !open) return null;

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-2">
      <div className="relative border border-white/10 rounded-2xl bg-black/30 backdrop-blur-md p-6 shadow-lg shadow-black/40">
        <button
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "true");
            setOpen(false);
          }}
          aria-label="Fechar introdução"
          className="absolute top-3 right-3 text-white/50 hover:text-white transition"
        >×</button>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white shadow-lg">
            <Info size={24} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold bg-linear-to-r from-[#ff4687] to-[#4d2cc4] bg-clip-text text-transparent">Bem-vindo ao Dashboard</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Aqui você encontra uma visão estruturada por áreas. Use o menu lateral para navegar pelas seções. Você pode reabrir esta explicação a qualquer momento pelo botão "Ajuda / Como usar" no final da barra lateral.
            </p>
          </div>
        </div>
        <div className="grid mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon;
            const active = selected?.id === s.id;
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => setSelected(active ? null : s)}
                className={`text-left group border border-white/10 rounded-xl p-4 hover:border-[#ff4687]/40 transition bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4687] ${active ? 'border-[#ff4687]/60' : ''}`}
                aria-expanded={active}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white">
                    <Icon size={18} />
                  </div>
                  <span className="font-medium text-white/90">{s.label}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{s.description}</p>
                <span className="inline-block mt-2 text-[10px] tracking-wide uppercase text-white/40">{s.category}</span>
                {active && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-[11px] text-white/70 leading-relaxed mb-2">{s.details}</p>
                    <div className="flex gap-2 flex-wrap text-[10px] text-white/40">
                      <span className="px-2 py-1 rounded bg-white/10">Dica: clique para fechar</span>
                      <span className="px-2 py-1 rounded bg-white/10">Categoria: {s.category}</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
