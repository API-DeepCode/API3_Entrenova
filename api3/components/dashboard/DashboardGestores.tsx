"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, FileText, TrendingUp } from 'lucide-react';

export function DashboardGestores() {
  const teamMandalaData = [
    { competency: 'Autoconhecimento', average: 75 },
    { competency: 'Comunicação', average: 68 },
    { competency: 'Liderança', average: 72 },
    { competency: 'Criatividade', average: 82 },
    { competency: 'Saúde Emocional', average: 70 },
    { competency: 'Cultura', average: 78 },
  ];

  const trilhaAdesao = [
    { trilha: 'Liderança', adesao: 87 },
    { trilha: 'Comunicação', adesao: 92 },
    { trilha: 'Criatividade', adesao: 78 },
    { trilha: 'Saúde Mental', adesao: 85 },
    { trilha: 'Cultura', adesao: 71 },
  ];

  const competencyHeatmap = [
    { name: 'João Silva', autoconhecimento: 85, comunicacao: 72, lideranca: 68, criatividade: 90, saude: 78, cultura: 82 },
    { name: 'Ana Costa', autoconhecimento: 78, comunicacao: 88, lideranca: 75, criatividade: 70, saude: 85, cultura: 80 },
    { name: 'Lucas Reis', autoconhecimento: 70, comunicacao: 65, lideranca: 82, criatividade: 88, saude: 68, cultura: 75 },
    { name: 'Marina Souza', autoconhecimento: 92, comunicacao: 85, lideranca: 78, criatividade: 82, saude: 90, cultura: 88 },
    { name: 'Carlos Lima', autoconhecimento: 68, comunicacao: 70, lideranca: 65, criatividade: 75, saude: 72, cultura: 70 },
  ];

  const getHeatColor = (value: number) => {
    if (value >= 80) return '#a6ff00';
    if (value >= 60) return '#4d2cc4';
    return '#ff4687';
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-4xl text-white mb-2">Dashboard de Gestores</h2>
        <p className="text-white/60">Acompanhe o desenvolvimento coletivo da sua equipe</p>
      </div>

      {/* Mandala da Equipe */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users size={28} className="text-[#ff4687]" />
          <h3 className="text-2xl text-white">Mandala da Equipe (Média)</h3>
        </div>
        <div className="grid grid-cols-2 gap-8 items-center">
          {/* Radar Chart */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff4687]/20 via-[#4d2cc4]/20 to-[#a6ff00]/20 rounded-full blur-3xl" />
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={teamMandalaData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis
                  dataKey="competency"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Radar
                  name="Média da Equipe"
                  dataKey="average"
                  stroke="#ff4687"
                  fill="#ff4687"
                  fillOpacity={0.6}
                  strokeWidth={3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Competencies List */}
          <div className="space-y-3">
            {teamMandalaData.map((item, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">{item.competency}</span>
                  <span className="text-[#a6ff00]">{item.average}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] rounded-full"
                    style={{ width: `${item.average}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Adesão às Trilhas */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={28} className="text-[#4d2cc4]" />
          <h3 className="text-2xl text-white">Adesão às Trilhas</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trilhaAdesao}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="trilha" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}
            />
            <Bar dataKey="adesao" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4687" />
                <stop offset="100%" stopColor="#4d2cc4" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mapeamento de Competências (Heatmap) */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText size={28} className="text-[#a6ff00]" />
            <h3 className="text-2xl text-white">Mapeamento de Competências</h3>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white rounded-xl hover:shadow-lg hover:shadow-[#ff4687]/30 transition-all">
            Gerar Relatório de Clima e Impacto
          </button>
        </div>
        <div className="overflow-auto rounded-xl">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-3 text-white/70 text-sm sticky left-0 bg-white/5">Nome</th>
                <th className="text-center p-3 text-white/70 text-sm">Autoconhecimento</th>
                <th className="text-center p-3 text-white/70 text-sm">Comunicação</th>
                <th className="text-center p-3 text-white/70 text-sm">Liderança</th>
                <th className="text-center p-3 text-white/70 text-sm">Criatividade</th>
                <th className="text-center p-3 text-white/70 text-sm">Saúde</th>
                <th className="text-center p-3 text-white/70 text-sm">Cultura</th>
              </tr>
            </thead>
            <tbody>
              {competencyHeatmap.map((person, index) => (
                <tr key={index} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-3 text-white sticky left-0 bg-[#1a0b3d]">{person.name}</td>
                  <td className="p-3 text-center">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: `${getHeatColor(person.autoconhecimento)}40` }}
                    >
                      {person.autoconhecimento}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: `${getHeatColor(person.comunicacao)}40` }}
                    >
                      {person.comunicacao}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: `${getHeatColor(person.lideranca)}40` }}
                    >
                      {person.lideranca}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: `${getHeatColor(person.criatividade)}40` }}
                    >
                      {person.criatividade}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: `${getHeatColor(person.saude)}40` }}
                    >
                      {person.saude}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="inline-block px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: `${getHeatColor(person.cultura)}40` }}
                    >
                      {person.cultura}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-6 mt-6 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#a6ff00' }} />
            <span className="text-white/60 text-sm">Destaque (80-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4d2cc4' }} />
            <span className="text-white/60 text-sm">Consolidado (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ff4687' }} />
            <span className="text-white/60 text-sm">A Desenvolver {'(<60)'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
