"use client";

import { useState } from 'react';
import { BookOpen, Clock, PlayCircle, CheckCircle2, Lock, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrilhaSyllabus } from './TrilhaSyllabus';
import { AulaPlayer } from './AulaPlayer';

interface Aula {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'practical';
  completed: boolean;
  locked: boolean;
  content: string;
}

interface Trilha {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  totalHours: string;
  progress: number;
  aulas: Aula[];
  color: string;
}

export function TrilhasEAulas() {
  const [selectedTrilha, setSelectedTrilha] = useState<string | null>(null);
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);
  const [isAulaDialogOpen, setIsAulaDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'syllabus' | 'player'>('list');
  const [currentAulaId, setCurrentAulaId] = useState<string>('');

  const trilhas: Trilha[] = [
    {
      id: '1',
      name: 'Liderança e Gestão de Equipes',
      description: 'Desenvolva habilidades essenciais para liderar equipes de alta performance',
      category: 'Liderança',
      level: 'Intermediário',
      totalHours: '12h',
      progress: 65,
      color: '#ff4687',
      aulas: [
        {
          id: '1-1',
          title: 'Fundamentos da Liderança Moderna',
          description: 'Entenda os princípios básicos da liderança no século XXI',
          duration: '45min',
          type: 'video',
          completed: true,
          locked: false,
          content: 'Nesta aula você aprenderá sobre os fundamentos da liderança moderna, incluindo inteligência emocional, comunicação efetiva e tomada de decisões estratégicas.',
        },
        {
          id: '1-2',
          title: 'Comunicação Efetiva com a Equipe',
          description: 'Técnicas de comunicação assertiva e feedback construtivo',
          duration: '1h',
          type: 'video',
          completed: true,
          locked: false,
          content: 'Aprenda técnicas de comunicação não-violenta, feedback 360° e como conduzir reuniões produtivas com sua equipe.',
        },
        {
          id: '1-3',
          title: 'Delegação e Empoderamento',
          description: 'Como delegar tarefas e empoderar seu time',
          duration: '50min',
          type: 'video',
          completed: false,
          locked: false,
          content: 'Descubra estratégias para delegar com eficiência, desenvolver autonomia na equipe e criar um ambiente de confiança.',
        },
        {
          id: '1-4',
          title: 'Quiz: Estilos de Liderança',
          description: 'Teste seus conhecimentos sobre diferentes estilos de liderança',
          duration: '15min',
          type: 'quiz',
          completed: false,
          locked: false,
          content: 'Avalie seu aprendizado respondendo questões sobre liderança situacional, democrática, transformacional e outros estilos.',
        },
        {
          id: '1-5',
          title: 'Gestão de Conflitos',
          description: 'Estratégias para resolver conflitos de forma construtiva',
          duration: '1h 10min',
          type: 'video',
          completed: false,
          locked: true,
          content: 'Aprenda a identificar, mediar e resolver conflitos mantendo o clima organizacional positivo.',
        },
      ],
    },
    {
      id: '2',
      name: 'Comunicação Não-Violenta',
      description: 'Aprenda a se comunicar com empatia e assertividade',
      category: 'Comunicação',
      level: 'Iniciante',
      totalHours: '8h',
      progress: 92,
      color: '#4d2cc4',
      aulas: [
        {
          id: '2-1',
          title: 'Introdução à CNV',
          description: 'Os quatro pilares da Comunicação Não-Violenta',
          duration: '40min',
          type: 'video',
          completed: true,
          locked: false,
          content: 'Marshall Rosenberg e os fundamentos da CNV: observação, sentimentos, necessidades e pedidos.',
        },
        {
          id: '2-2',
          title: 'Observação sem Julgamento',
          description: 'Como observar situações sem julgar',
          duration: '35min',
          type: 'reading',
          completed: true,
          locked: false,
          content: 'Pratique a observação neutra de situações, separando fatos de interpretações e julgamentos.',
        },
        {
          id: '2-3',
          title: 'Identificando Sentimentos',
          description: 'Vocabulário emocional e autoconhecimento',
          duration: '45min',
          type: 'video',
          completed: true,
          locked: false,
          content: 'Expanda seu vocabulário emocional e aprenda a identificar e expressar sentimentos com precisão.',
        },
        {
          id: '2-4',
          title: 'Praticando CNV no Trabalho',
          description: 'Exercício prático de comunicação',
          duration: '30min',
          type: 'practical',
          completed: false,
          locked: false,
          content: 'Simule situações reais de trabalho aplicando os princípios da CNV em conversas desafiadoras.',
        },
      ],
    },
    {
      id: '3',
      name: 'Autoconhecimento e Desenvolvimento',
      description: 'Jornada de descoberta pessoal e crescimento contínuo',
      category: 'Desenvolvimento Pessoal',
      level: 'Iniciante',
      totalHours: '10h',
      progress: 40,
      color: '#a6ff00',
      aulas: [
        {
          id: '3-1',
          title: 'Mapeamento de Valores Pessoais',
          description: 'Identifique seus valores e princípios fundamentais',
          duration: '50min',
          type: 'video',
          completed: true,
          locked: false,
          content: 'Descubra seus valores essenciais e como eles guiam suas decisões e comportamentos.',
        },
        {
          id: '3-2',
          title: 'Forças e Oportunidades',
          description: 'Análise SWOT pessoal',
          duration: '1h',
          type: 'practical',
          completed: false,
          locked: false,
          content: 'Faça uma análise profunda de suas forças, fraquezas, oportunidades e ameaças.',
        },
        {
          id: '3-3',
          title: 'Mindfulness e Presença',
          description: 'Técnicas de atenção plena',
          duration: '45min',
          type: 'video',
          completed: false,
          locked: false,
          content: 'Aprenda práticas de mindfulness para desenvolver presença e consciência no dia a dia.',
        },
        {
          id: '3-4',
          title: 'Plano de Desenvolvimento Individual',
          description: 'Crie seu PDI personalizado',
          duration: '1h 15min',
          type: 'practical',
          completed: false,
          locked: true,
          content: 'Estruture seu plano de desenvolvimento com metas claras e ações concretas.',
        },
      ],
    },
    {
      id: '4',
      name: 'Inovação e Criatividade',
      description: 'Desenvolva pensamento criativo e inovador',
      category: 'Inovação',
      level: 'Intermediário',
      totalHours: '15h',
      progress: 25,
      color: '#ff4687',
      aulas: [
        {
          id: '4-1',
          title: 'Design Thinking: Introdução',
          description: 'Metodologia centrada no ser humano',
          duration: '1h',
          type: 'video',
          completed: true,
          locked: false,
          content: 'Entenda as fases do Design Thinking: empatia, definição, ideação, prototipagem e teste.',
        },
        {
          id: '4-2',
          title: 'Técnicas de Brainstorming',
          description: 'Métodos para gerar ideias inovadoras',
          duration: '45min',
          type: 'video',
          completed: false,
          locked: false,
          content: 'Aprenda técnicas como SCAMPER, Brainwriting, e Mapa Mental para gerar ideias criativas.',
        },
        {
          id: '4-3',
          title: 'Prototipagem Rápida',
          description: 'Transforme ideias em protótipos',
          duration: '1h 20min',
          type: 'practical',
          completed: false,
          locked: false,
          content: 'Pratique a criação de protótipos de baixa fidelidade para validar ideias rapidamente.',
        },
        {
          id: '4-4',
          title: 'Cultura de Inovação',
          description: 'Como criar ambiente propício à inovação',
          duration: '55min',
          type: 'reading',
          completed: false,
          locked: true,
          content: 'Descubra como promover uma cultura organizacional que estimule a inovação e criatividade.',
        },
      ],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'reading':
        return BookOpen;
      case 'quiz':
        return Award;
      case 'practical':
        return TrendingUp;
      default:
        return PlayCircle;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Vídeo';
      case 'reading':
        return 'Leitura';
      case 'quiz':
        return 'Quiz';
      case 'practical':
        return 'Prática';
      default:
        return 'Conteúdo';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-[#a6ff00]/20 text-[#a6ff00]';
      case 'Intermediário':
        return 'bg-[#4d2cc4]/20 text-[#4d2cc4]';
      case 'Avançado':
        return 'bg-[#ff4687]/20 text-[#ff4687]';
      default:
        return 'bg-white/20 text-white';
    }
  };

  const openAula = (aula: Aula) => {
    if (!aula.locked) {
      setSelectedAula(aula);
      setIsAulaDialogOpen(true);
    }
  };

  const selectedTrilhaData = trilhas.find((t) => t.id === selectedTrilha);

  const handleViewSyllabus = (trilhaId: string) => {
    setSelectedTrilha(trilhaId);
    setViewMode('syllabus');
  };

  const handleStartAula = (aulaId: string) => {
    setCurrentAulaId(aulaId);
    setViewMode('player');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  const handleBackToSyllabus = () => {
    setViewMode('syllabus');
  };

  if (viewMode === 'syllabus') {
    return <TrilhaSyllabus onBack={handleBackToList} onStartAula={handleStartAula} />;
  }

  if (viewMode === 'player') {
    return <AulaPlayer aulaId={currentAulaId} onBack={handleBackToSyllabus} />;
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl text-white mb-2">Trilhas e Aulas</h2>
        <p className="text-white/60">Explore o conteúdo educacional organizado por trilhas de aprendizado</p>
      </div>

      <Tabs value={selectedTrilha || trilhas[0].id} onValueChange={setSelectedTrilha} className="space-y-6">
        {/* Trilhas Navigation */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <TabsList className="w-full grid grid-cols-4 bg-white/5 p-1 h-auto">
            {trilhas.map((trilha) => (
              <TabsTrigger
                key={trilha.id}
                value={trilha.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4] data-[state=active]:text-white py-3 rounded-xl"
              >
                <div className="text-center">
                  <p>{trilha.name}</p>
                  <p className="text-xs opacity-70 mt-1">{trilha.totalHours}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Trilha Content */}
        {trilhas.map((trilha) => (
          <TabsContent key={trilha.id} value={trilha.id} className="space-y-6">
            {/* Trilha Header */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl text-white mb-2">{trilha.name}</h3>
                  <p className="text-white/60 mb-4">{trilha.description}</p>
                  <div className="flex gap-3">
                    <Badge className={getLevelColor(trilha.level)}>{trilha.level}</Badge>
                    <Badge className="bg-white/10 text-white">{trilha.category}</Badge>
                    <Badge className="bg-white/10 text-white">
                      <Clock size={14} className="mr-1" />
                      {trilha.totalHours}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl" style={{ color: trilha.color }}>
                    {trilha.progress}%
                  </p>
                  <p className="text-sm text-white/60">Concluído</p>
                </div>
              </div>
              <Progress value={trilha.progress} className="h-3" />
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => handleViewSyllabus(trilha.id)}
                  className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] hover:shadow-lg border-0"
                >
                  <PlayCircle className="mr-2" size={20} />
                  Ver Conteúdo Completo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStartAula(trilha.aulas[0].id)}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <ArrowRight className="mr-2" size={20} />
                  Iniciar Trilha
                </Button>
              </div>
            </div>

            {/* Aulas List */}
            <div className="space-y-3">
              {trilha.aulas.map((aula, index) => {
                const TypeIcon = getTypeIcon(aula.type);
                return (
                  <div
                    key={aula.id}
                    onClick={() => openAula(aula)}
                    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all ${
                      aula.locked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-white/10 cursor-pointer hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Aula Number */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: aula.completed
                            ? `linear-gradient(135deg, ${trilha.color}, #4d2cc4)`
                            : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {aula.completed ? (
                          <CheckCircle2 size={24} className="text-white" />
                        ) : aula.locked ? (
                          <Lock size={20} className="text-white/50" />
                        ) : (
                          <span className="text-white">{index + 1}</span>
                        )}
                      </div>

                      {/* Aula Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg text-white">{aula.title}</h4>
                          <Badge className="bg-white/10 text-white text-xs">
                            <TypeIcon size={12} className="mr-1" />
                            {getTypeLabel(aula.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/60">{aula.description}</p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock size={16} />
                        <span>{aula.duration}</span>
                      </div>

                      {/* Status */}
                      {aula.completed && (
                        <Badge className="bg-[#a6ff00]/20 text-[#a6ff00]">Concluída</Badge>
                      )}
                      {aula.locked && <Badge className="bg-white/10 text-white/50">Bloqueada</Badge>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-white/60 text-sm mb-1">Total de Aulas</p>
                <p className="text-2xl text-white">{trilha.aulas.length}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-white/60 text-sm mb-1">Concluídas</p>
                <p className="text-2xl text-[#a6ff00]">
                  {trilha.aulas.filter((a) => a.completed).length}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-white/60 text-sm mb-1">Em Andamento</p>
                <p className="text-2xl text-[#4d2cc4]">
                  {trilha.aulas.filter((a) => !a.completed && !a.locked).length}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-white/60 text-sm mb-1">Bloqueadas</p>
                <p className="text-2xl text-[#ff4687]">
                  {trilha.aulas.filter((a) => a.locked).length}
                </p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Aula Detail Dialog */}
      <Dialog open={isAulaDialogOpen} onOpenChange={setIsAulaDialogOpen}>
        <DialogContent className="bg-[#1a0b3d] border border-white/10 text-white max-w-3xl">
          {selectedAula && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-white flex items-center gap-3">
                  {selectedAula.completed && <CheckCircle2 size={28} className="text-[#a6ff00]" />}
                  {selectedAula.title}
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  {selectedAula.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-3">
                  <Badge className="bg-white/10 text-white">
                    {getTypeLabel(selectedAula.type)}
                  </Badge>
                  <Badge className="bg-white/10 text-white">
                    <Clock size={14} className="mr-1" />
                    {selectedAula.duration}
                  </Badge>
                  {selectedAula.completed && (
                    <Badge className="bg-[#a6ff00]/20 text-[#a6ff00]">Concluída</Badge>
                  )}
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white mb-3">Sobre esta aula</h4>
                  <p className="text-white/70 leading-relaxed">{selectedAula.description}</p>
                </div>

                {selectedAula.type === 'video' && (
                  <div className="bg-white/5 rounded-xl aspect-video flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <PlayCircle size={64} className="text-[#ff4687] mx-auto mb-3" />
                      <p className="text-white/60">Player de vídeo</p>
                    </div>
                  </div>
                )}

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white mb-3">Conteúdo</h4>
                  <p className="text-white/70 leading-relaxed">{selectedAula.content}</p>
                </div>

                {!selectedAula.completed && (
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:shadow-lg hover:shadow-[#ff4687]/30 transition-all">
                    Marcar como Concluída
                  </button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
