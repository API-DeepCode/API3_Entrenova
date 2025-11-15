"use client";

import { Users, Clock, Award, Globe, Users2, MapPin } from 'lucide-react';

export function DashboardEstrategico() {
  const mainKpis = [
    { label: 'Usuários Ativos', value: '12.847', icon: Users, color: '#ff4687' },
    { label: 'Horas de Treinamento', value: '45.320h', icon: Clock, color: '#4d2cc4' },
  ];

  const topTrilhas = [
    { rank: 1, name: 'Liderança e Gestão de Equipes', users: 3247, completion: 87 },
    { rank: 2, name: 'Comunicação Não-Violenta', users: 2891, completion: 92 },
    { rank: 3, name: 'Autoconhecimento e Desenvolvimento', users: 2654, completion: 78 },
    { rank: 4, name: 'Inovação e Criatividade', users: 2430, completion: 84 },
    { rank: 5, name: 'Saúde Mental no Trabalho', users: 2187, completion: 95 },
  ];

  const impactIndicators = [
    { label: 'Horas de Formação', value: '45.320h', icon: Clock, color: '#a6ff00' },
    { label: 'Mulheres Atendidas', value: '7.235', icon: Users2, color: '#ff4687' },
    { label: 'Municípios Alcançados', value: '247', icon: MapPin, color: '#4d2cc4' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-white mb-8">Dashboard Estratégico - Visão Macro</h2>

      {/* Main KPIs */}
      <div className="grid grid-cols-2 gap-6">
        {mainKpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <Icon size={48} style={{ color: kpi.color }} className="mb-4" />
              <p className="text-5xl text-white mb-2">{kpi.value}</p>
              <p className="text-lg text-white/60">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Top Trilhas */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Award size={28} className="text-[#ff4687]" />
          <h3 className="text-2xl text-white">Top 5 Trilhas Mais Acessadas</h3>
        </div>
        <div className="space-y-4">
          {topTrilhas.map((trilha) => (
            <div
              key={trilha.rank}
              className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all border border-white/5"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] flex items-center justify-center">
                  <span className="text-xl text-white">{trilha.rank}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg text-white mb-1">{trilha.name}</h4>
                  <p className="text-sm text-white/60">{trilha.users.toLocaleString()} usuários ativos</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-[#a6ff00]">{trilha.completion}%</p>
                  <p className="text-xs text-white/60">Conclusão</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] rounded-full transition-all"
                  style={{ width: `${trilha.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de Impacto ESG */}
      <div>
        <h3 className="text-2xl text-white mb-4">Indicadores de Impacto (ESG)</h3>
        <div className="grid grid-cols-3 gap-6">
          {impactIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                <Icon size={40} style={{ color: indicator.color }} className="mb-4 relative z-10" />
                <p className="text-4xl text-white mb-2 relative z-10">{indicator.value}</p>
                <p className="text-sm text-white/60 relative z-10">{indicator.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
