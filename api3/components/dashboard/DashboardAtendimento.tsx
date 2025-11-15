"use client";

import { MessageSquare, CheckCircle, Heart, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeedbackComments } from './FeedbackComments';

export function DashboardAtendimento() {
  const kpis = [
    { label: 'Tickets Abertos', value: '47', icon: MessageSquare, color: '#ff4687' },
    { label: 'Tickets Concluídos', value: '312', icon: CheckCircle, color: '#a6ff00' },
    { label: 'NPS', value: '84', icon: Heart, color: '#4d2cc4' },
    { label: 'Tempo Médio de Resposta', value: '2.3h', icon: Clock, color: '#ff4687' },
  ];

  const ticketsByCategory = [
    { category: 'Personalização', volume: 125 },
    { category: 'Dúvidas', volume: 187 },
    { category: 'Bugs', volume: 47 },
  ];

  const onboardingStatus = [
    { company: 'TechCorp', status: 'Concluído', progress: 100 },
    { company: 'Innovate SA', status: 'Em Andamento', progress: 75 },
    { company: 'FutureEdge', status: 'Em Andamento', progress: 60 },
    { company: 'SmartBiz', status: 'Aguardando Documentos', progress: 45 },
    { company: 'GrowthHub', status: 'Em Andamento', progress: 85 },
    { company: 'NextGen Tech', status: 'Concluído', progress: 100 },
  ];

  const attendancePerformance = [
    { name: 'João Silva', resolved: 87, avgTime: '1.8h' },
    { name: 'Ana Costa', resolved: 94, avgTime: '2.1h' },
    { name: 'Lucas Reis', resolved: 76, avgTime: '2.5h' },
    { name: 'Marina Souza', resolved: 102, avgTime: '1.6h' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-[#a6ff00]';
      case 'Em Andamento': return 'bg-[#4d2cc4]';
      case 'Aguardando Documentos': return 'bg-[#ffaa00]';
      default: return 'bg-white/20';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-white mb-8">Dashboard Atendimento e Operações</h2>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 bg-white/5 border border-white/10 mb-8">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
            🎫 Tickets & Performance
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
            💬 Feedback Colaboradores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-4">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <Icon size={24} style={{ color: kpi.color }} className="mb-3" />
                  <p className="text-3xl text-white mb-1">{kpi.value}</p>
                  <p className="text-sm text-white/60">{kpi.label}</p>
                </div>
              );
            })}
          </div>

          {/* Tickets por Categoria */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl text-white mb-6">Tickets por Categoria</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketsByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="volume" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff4687" />
                    <stop offset="100%" stopColor="#4d2cc4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status de Onboarding e Performance */}
          <div className="grid grid-cols-2 gap-6">
            {/* Status de Onboarding */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl text-white mb-6">Status de Onboarding</h3>
              <div className="space-y-4">
                {onboardingStatus.map((item, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white">{item.company}</span>
                      <span className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance por Atendente */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl text-white mb-6">Performance por Atendente</h3>
              <div className="overflow-hidden rounded-xl">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left p-3 text-white/70 text-sm">Atendente</th>
                      <th className="text-center p-3 text-white/70 text-sm">Tickets Resolvidos</th>
                      <th className="text-center p-3 text-white/70 text-sm">Tempo Médio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendancePerformance.map((attendant, index) => (
                      <tr key={index} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-3 text-white">{attendant.name}</td>
                        <td className="p-3 text-center">
                          <span className="px-3 py-1 rounded-full bg-[#a6ff00]/20 text-[#a6ff00]">
                            {attendant.resolved}
                          </span>
                        </td>
                        <td className="p-3 text-center text-white/70">{attendant.avgTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackComments viewMode="attendance" />
        </TabsContent>
      </Tabs>
    </div>
  );
}