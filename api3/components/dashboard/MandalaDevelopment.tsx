"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeedbackComments } from './FeedbackComments';

export function MandalaDevelopment() {
  const mandalaData = [
    { competency: 'Autoconhecimento', current: 85, target: 100 },
    { competency: 'Comunicação', current: 72, target: 100 },
    { competency: 'Liderança', current: 68, target: 100 },
    { competency: 'Criatividade', current: 90, target: 100 },
    { competency: 'Saúde Emocional', current: 78, target: 100 },
    { competency: 'Cultura', current: 82, target: 100 },
  ];

  const getLevelLabel = (score: number) => {
    if (score >= 80) return { label: 'Inspirador', color: '#a6ff00' };
    if (score >= 60) return { label: 'Consolidado', color: '#4d2cc4' };
    return { label: 'Iniciante', color: '#ff4687' };
  };

  const averageScore = Math.round(
    mandalaData.reduce((acc, item) => acc + item.current, 0) / mandalaData.length
  );

  const level = getLevelLabel(averageScore);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl text-white mb-2">Mandala de Desenvolvimento Humano</h2>
        <p className="text-white/60">Sua jornada de crescimento pessoal e profissional</p>
      </div>

      <Tabs defaultValue="mandala" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/5 border border-white/10 mb-8">
          <TabsTrigger value="mandala" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
            📊 Mandala
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
            💬 Comentários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mandala" className="space-y-6">
          {/* Main Mandala */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="grid grid-cols-3 gap-8 items-center">
              {/* Left Side Stats */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#ff4687]/20 to-[#4d2cc4]/20 rounded-2xl p-6 border border-white/10">
                  <Sparkles size={32} className="text-[#ff4687] mb-3" />
                  <p className="text-sm text-white/60 mb-1">Nível Atual</p>
                  <p className="text-3xl" style={{ color: level.color }}>
                    {level.label}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#4d2cc4]/20 to-[#a6ff00]/20 rounded-2xl p-6 border border-white/10">
                  <Target size={32} className="text-[#4d2cc4] mb-3" />
                  <p className="text-sm text-white/60 mb-1">Score Médio</p>
                  <p className="text-3xl text-white">{averageScore}%</p>
                </div>
                <div className="bg-gradient-to-br from-[#a6ff00]/20 to-[#ff4687]/20 rounded-2xl p-6 border border-white/10">
                  <TrendingUp size={32} className="text-[#a6ff00] mb-3" />
                  <p className="text-sm text-white/60 mb-1">Crescimento Mês</p>
                  <p className="text-3xl text-[#a6ff00]">+12%</p>
                </div>
              </div>

              {/* Center Radar Chart */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff4687]/20 via-[#4d2cc4]/20 to-[#a6ff00]/20 rounded-full blur-3xl" />
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={mandalaData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis
                      dataKey="competency"
                      tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                    <Radar
                      name="Seu Progresso"
                      dataKey="current"
                      stroke="#ff4687"
                      fill="#ff4687"
                      fillOpacity={0.5}
                      strokeWidth={3}
                    />
                    <Radar
                      name="Meta"
                      dataKey="target"
                      stroke="#4d2cc4"
                      fill="#4d2cc4"
                      fillOpacity={0.1}
                      strokeWidth={1}
                      strokeDasharray="5 5"
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

              {/* Right Side Competencies */}
              <div className="space-y-3">
                {mandalaData.map((item, index) => {
                  const itemLevel = getLevelLabel(item.current);
                  return (
                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm">{item.competency}</span>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${itemLevel.color}20`, color: itemLevel.color }}>
                          {itemLevel.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${item.current}%`,
                              background: `linear-gradient(to right, #ff4687, #4d2cc4)`,
                            }}
                          />
                        </div>
                        <span className="text-white text-sm w-12 text-right">{item.current}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#ff4687]/10 to-transparent border border-[#ff4687]/30 rounded-2xl p-6">
              <p className="text-[#ff4687] mb-2">🎯 Ponto Forte</p>
              <p className="text-white">Criatividade está em destaque!</p>
            </div>
            <div className="bg-gradient-to-br from-[#4d2cc4]/10 to-transparent border border-[#4d2cc4]/30 rounded-2xl p-6">
              <p className="text-[#4d2cc4] mb-2">📈 Em Desenvolvimento</p>
              <p className="text-white">Liderança tem grande potencial</p>
            </div>
            <div className="bg-gradient-to-br from-[#a6ff00]/10 to-transparent border border-[#a6ff00]/30 rounded-2xl p-6">
              <p className="text-[#a6ff00] mb-2">✨ Próximo Passo</p>
              <p className="text-white">Complete a trilha de Comunicação</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackComments viewMode="employee" />
        </TabsContent>
      </Tabs>
    </div>
  );
}