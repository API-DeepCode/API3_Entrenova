"use client";


import { Award, Trophy, Star, Music, Heart, Users, PlayCircle, CheckCircle2 } from 'lucide-react';

export function DashboardConquistas() {
  const missions = {
    inProgress: [
      { name: 'Comunicação Assertiva', progress: 75, lessons: '6/8 aulas' },
      { name: 'Mindfulness Avançado', progress: 40, lessons: '4/10 aulas' },
      { name: 'Design Thinking', progress: 90, lessons: '9/10 aulas' },
    ],
    completed: [
      { name: 'Liderança Essencial', completedAt: '15 Out 2024' },
      { name: 'Gestão do Tempo', completedAt: '28 Set 2024' },
      { name: 'Inteligência Emocional', completedAt: '10 Set 2024' },
    ],
  };

  const badges = [
    { name: 'Primeiro Passo', icon: Star, color: '#a6ff00', earned: true },
    { name: 'Aprendiz Dedicado', icon: Award, color: '#4d2cc4', earned: true },
    { name: 'Comunicador Expert', icon: Trophy, color: '#ff4687', earned: true },
    { name: 'Líder Inspirador', icon: Star, color: '#ffaa00', earned: true },
    { name: 'Mestre da Criatividade', icon: Award, color: '#a6ff00', earned: true },
    { name: 'Guardião do Bem-Estar', icon: Heart, color: '#ff4687', earned: true },
    { name: 'Explorador Cultural', icon: Trophy, color: '#4d2cc4', earned: false },
    { name: 'Maratonista', icon: Star, color: '#ffaa00', earned: false },
  ];

  const hobbies = [
    { name: 'Desafio Cultural', desc: 'Visite 3 museus virtuais', icon: Music, color: '#ff4687' },
    { name: 'Playlist Zen', desc: 'Ouça músicas relaxantes', icon: Music, color: '#4d2cc4' },
    { name: 'Meditação Diária', desc: '7 dias de meditação', icon: Heart, color: '#a6ff00' },
  ];

  const ranking = [
    { rank: 1, name: 'Marina Costa', points: 2847, avatar: '👩‍💼' },
    { rank: 2, name: 'Carlos Oliveira', points: 2654, avatar: '👨‍💼' },
    { rank: 3, name: 'Você', points: 2430, avatar: '🌟', highlight: true },
    { rank: 4, name: 'Ana Silva', points: 2287, avatar: '👩‍💼' },
    { rank: 5, name: 'Pedro Santos', points: 2154, avatar: '👨‍💼' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl text-white mb-2">Conquistas e Engajamento</h2>
        <p className="text-white/60">Acompanhe seu progresso e celebre suas vitórias</p>
      </div>

      {/* Minhas Missões */}
      <div className="grid grid-cols-2 gap-6">
        {/* Em Andamento */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <PlayCircle size={24} className="text-[#ff4687]" />
            <h3 className="text-xl text-white">Em Andamento</h3>
          </div>
          <div className="space-y-4">
            {missions.inProgress.map((mission, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white">{mission.name}</span>
                  <span className="text-sm text-white/60">{mission.lessons}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] rounded-full"
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                  <span className="text-[#a6ff00] text-sm">{mission.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concluídos */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 size={24} className="text-[#a6ff00]" />
            <h3 className="text-xl text-white">Concluídos</h3>
          </div>
          <div className="space-y-3">
            {missions.completed.map((mission, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a6ff00] to-[#4d2cc4] flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white">{mission.name}</p>
                  <p className="text-xs text-white/60">{mission.completedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selos e Troféus */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={24} className="text-[#ffaa00]" />
          <h3 className="text-xl text-white">Selos e Troféus</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl p-6 text-center transition-all ${
                  badge.earned
                    ? 'bg-white/10 border-2 hover:bg-white/15 cursor-pointer'
                    : 'bg-white/5 border border-white/5 opacity-40'
                }`}
                style={badge.earned ? { borderColor: badge.color } : {}}
              >
                <Icon
                  size={48}
                  className="mx-auto mb-3"
                  style={{ color: badge.earned ? badge.color : 'rgba(255,255,255,0.3)' }}
                />
                <p className="text-white text-sm">{badge.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hobbies e Ranking */}
      <div className="grid grid-cols-2 gap-6">
        {/* Hobbies e Bem-Estar */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Heart size={24} className="text-[#ff4687]" />
            <h3 className="text-xl text-white">Hobbies e Bem-Estar</h3>
          </div>
          <div className="space-y-3">
            {hobbies.map((hobby, index) => {
              const Icon = hobby.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${hobby.color}20` }}
                  >
                    <Icon size={24} style={{ color: hobby.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{hobby.name}</p>
                    <p className="text-xs text-white/60">{hobby.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranking da Equipe */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users size={24} className="text-[#4d2cc4]" />
            <h3 className="text-xl text-white">Ranking da Equipe</h3>
          </div>
          <div className="space-y-3">
            {ranking.map((person) => (
              <div
                key={person.rank}
                className={`rounded-xl p-4 flex items-center gap-4 ${
                  person.highlight
                    ? 'bg-gradient-to-r from-[#ff4687]/20 to-[#4d2cc4]/20 border-2 border-[#ff4687]'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    person.rank <= 3
                      ? 'bg-gradient-to-br from-[#ffaa00] to-[#ff4687]'
                      : 'bg-white/10'
                  }`}
                >
                  <span className="text-white">{person.rank}</span>
                </div>
                <span className="text-2xl">{person.avatar}</span>
                <div className="flex-1">
                  <p className="text-white">{person.name}</p>
                  <p className="text-xs text-white/60">{person.points} pontos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
