"use client";

import { TrendingUp, Users, DollarSign, Target, Briefcase } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function DashboardComercial() {
  const kpis = [
    { label: 'Leads Gerados', value: '2.847', change: '+12%', icon: Users, color: '#ff4687' },
    { label: 'Taxa de Fechamento', value: '34%', change: '+5%', icon: TrendingUp, color: '#4d2cc4' },
    { label: 'Ticket Médio', value: 'R$ 8.500', change: '+8%', icon: DollarSign, color: '#a6ff00' },
    { label: 'CAC', value: 'R$ 1.240', change: '-3%', icon: Target, color: '#ff4687' },
    { label: 'LTV', value: 'R$ 45.800', change: '+15%', icon: Briefcase, color: '#4d2cc4' },
  ];

  const salesData = [
    { month: 'Jan', leads: 420, fechamentos: 145 },
    { month: 'Fev', leads: 380, fechamentos: 132 },
    { month: 'Mar', leads: 510, fechamentos: 178 },
    { month: 'Abr', leads: 475, fechamentos: 165 },
    { month: 'Mai', leads: 620, fechamentos: 215 },
    { month: 'Jun', leads: 442, fechamentos: 155 },
  ];

  const channelData = [
    { name: 'LinkedIn', value: 45, color: '#4d2cc4' },
    { name: 'WhatsApp', value: 30, color: '#ff4687' },
    { name: 'E-mail', value: 25, color: '#a6ff00' },
  ];

  const leadsTable = [
    { name: 'Maria Santos', company: 'TechCorp', level: 'quente', responsible: 'João Silva' },
    { name: 'Carlos Oliveira', company: 'Innovate SA', level: 'morno', responsible: 'Ana Costa' },
    { name: 'Beatriz Lima', company: 'FutureEdge', level: 'quente', responsible: 'João Silva' },
    { name: 'Pedro Souza', company: 'SmartBiz', level: 'frio', responsible: 'Lucas Reis' },
    { name: 'Julia Martins', company: 'GrowthHub', level: 'quente', responsible: 'Ana Costa' },
  ];

  const pipelineData = [
    { stage: 'Prospecção', value: 100 },
    { stage: 'Qualificação', value: 65 },
    { stage: 'Proposta', value: 42 },
    { stage: 'Negociação', value: 28 },
    { stage: 'Fechamento', value: 18 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'quente': return 'bg-[#ff4687]';
      case 'morno': return 'bg-[#ffaa00]';
      case 'frio': return 'bg-[#4d2cc4]';
      default: return 'bg-white/20';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-white mb-8">Dashboard Comercial</h2>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={24} style={{ color: kpi.color }} />
                <span className={`text-sm ${kpi.change.startsWith('+') ? 'text-[#a6ff00]' : 'text-[#ff4687]'}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl text-white mb-1">{kpi.value}</p>
              <p className="text-sm text-white/60">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Vendas e Performance */}
      <div className="grid grid-cols-2 gap-6">
        {/* Vendas e Conversões */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl text-white mb-6">Vendas e Conversões</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#4d2cc4" strokeWidth={3} name="Leads" />
              <Line type="monotone" dataKey="fechamentos" stroke="#ff4687" strokeWidth={3} name="Fechamentos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance por Canal */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl text-white mb-6">Performance por Canal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Banco de Leads e Pipeline */}
      <div className="grid grid-cols-2 gap-6">
        {/* Banco de Dados de Leads */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl text-white mb-6">Banco de Dados de Leads</h3>
          <div className="overflow-hidden rounded-xl">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-3 text-white/70 text-sm">Nome</th>
                  <th className="text-left p-3 text-white/70 text-sm">Empresa</th>
                  <th className="text-left p-3 text-white/70 text-sm">Nível</th>
                  <th className="text-left p-3 text-white/70 text-sm">Responsável</th>
                </tr>
              </thead>
              <tbody>
                {leadsTable.map((lead, index) => (
                  <tr key={index} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-3 text-white">{lead.name}</td>
                    <td className="p-3 text-white/70">{lead.company}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-white text-xs ${getLevelColor(lead.level)}`}>
                        {lead.level}
                      </span>
                    </td>
                    <td className="p-3 text-white/70">{lead.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline de Contratos */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl text-white mb-6">Pipeline de Contratos</h3>
          <div className="space-y-4">
            {pipelineData.map((stage, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-white">{stage.stage}</span>
                  <span className="text-[#ff4687]">{stage.value}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] rounded-full transition-all"
                    style={{ width: `${stage.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
