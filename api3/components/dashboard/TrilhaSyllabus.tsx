"use client";

import { useState } from 'react';
import { PlayCircle, FileText, Award, CheckCircle2, Clock, ArrowLeft, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Aula {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed: boolean;
  locked: boolean;
}

interface Modulo {
  id: string;
  title: string;
  aulas: Aula[];
}

interface TrilhaSyllabusProps {
  onBack: () => void;
  onStartAula: (aulaId: string) => void;
}

export function TrilhaSyllabus({ onBack, onStartAula }: TrilhaSyllabusProps) {
  const trilhaData = {
    title: 'Trilha de Liderança Colaborativa',
    description: 'Desenvolva habilidades essenciais para liderar equipes de alta performance com empatia, comunicação efetiva e visão estratégica.',
    progress: 65,
    totalHours: '12h',
    totalAulas: 18,
    completedAulas: 12,
    lastAulaId: '2-2',
  };

  const modulos: Modulo[] = [
    {
      id: '1',
      title: 'Módulo 1: Fundamentos da Comunicação',
      aulas: [
        { id: '1-1', title: 'Escuta Ativa', duration: '10 min', type: 'video', completed: true, locked: false },
        { id: '1-2', title: 'Comunicação Não-Violenta', duration: '15 min', type: 'video', completed: true, locked: false },
        { id: '1-3', title: 'Feedback Construtivo', duration: '12 min', type: 'video', completed: true, locked: false },
        { id: '1-4', title: 'Leitura: Princípios da CNV', duration: '8 min', type: 'reading', completed: true, locked: false },
        { id: '1-5', title: 'Quiz: Teste seus conhecimentos', duration: '5 min', type: 'quiz', completed: true, locked: false },
      ],
    },
    {
      id: '2',
      title: 'Módulo 2: Liderança e Empatia',
      aulas: [
        { id: '2-1', title: 'O que é Liderança Empática', duration: '18 min', type: 'video', completed: true, locked: false },
        { id: '2-2', title: 'Inteligência Emocional no Trabalho', duration: '20 min', type: 'video', completed: false, locked: false },
        { id: '2-3', title: 'Gestão de Conflitos', duration: '15 min', type: 'video', completed: false, locked: false },
        { id: '2-4', title: 'Leitura: Estudos de Caso', duration: '10 min', type: 'reading', completed: false, locked: false },
        { id: '2-5', title: 'Quiz: Avaliação do Módulo', duration: '5 min', type: 'quiz', completed: false, locked: true },
      ],
    },
    {
      id: '3',
      title: 'Módulo 3: Gestão de Equipes',
      aulas: [
        { id: '3-1', title: 'Delegação Eficaz', duration: '16 min', type: 'video', completed: false, locked: false },
        { id: '3-2', title: 'Motivação e Engajamento', duration: '22 min', type: 'video', completed: false, locked: true },
        { id: '3-3', title: 'Performance e Desenvolvimento', duration: '18 min', type: 'video', completed: false, locked: true },
        { id: '3-4', title: 'Leitura: Metodologias Ágeis', duration: '12 min', type: 'reading', completed: false, locked: true },
        { id: '3-5', title: 'Quiz: Gestão na Prática', duration: '8 min', type: 'quiz', completed: false, locked: true },
      ],
    },
    {
      id: '4',
      title: 'Módulo 4: Visão Estratégica',
      aulas: [
        { id: '4-1', title: 'Pensamento Estratégico', duration: '25 min', type: 'video', completed: false, locked: true },
        { id: '4-2', title: 'Tomada de Decisão', duration: '20 min', type: 'video', completed: false, locked: true },
        { id: '4-3', title: 'Avaliação Final', duration: '15 min', type: 'quiz', completed: false, locked: true },
      ],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'reading':
        return FileText;
      case 'quiz':
        return Award;
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
      default:
        return 'Conteúdo';
    }
  };

  return (
    <div className="min-h-screen space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        Voltar para Trilhas
      </button>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff4687] via-[#4d2cc4] to-[#311597] p-12">
        <div className="relative z-10">
          <div className="mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              Liderança • {trilhaData.totalHours}
            </span>
          </div>
          <h1 className="text-5xl text-white mb-4">{trilhaData.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{trilhaData.description}</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
      </div>

      {/* Progress Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-white mb-2">Seu Progresso</h3>
            <p className="text-white/60">
              {trilhaData.completedAulas} de {trilhaData.totalAulas} aulas concluídas
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl text-[#ff4687] mb-1">{trilhaData.progress}%</p>
            <p className="text-white/60">Completo</p>
          </div>
        </div>
        <Progress value={trilhaData.progress} className="h-4 mb-6" />
        <Button
          onClick={() => onStartAula(trilhaData.lastAulaId)}
          className="w-full py-6 bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] hover:shadow-lg hover:shadow-[#ff4687]/30 transition-all border-0 text-lg"
        >
          <PlayCircle className="mr-2" size={24} />
          Continuar de onde parou
        </Button>
      </div>

      {/* Modules List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl text-white mb-6">Conteúdo da Trilha</h3>
        <Accordion type="multiple" defaultValue={['1', '2']} className="space-y-4">
          {modulos.map((modulo) => {
            const completedCount = modulo.aulas.filter((a) => a.completed).length;
            const totalCount = modulo.aulas.length;
            const moduloProgress = (completedCount / totalCount) * 100;

            return (
              <AccordionItem
                key={modulo.id}
                value={modulo.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-white/5 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] flex items-center justify-center">
                        <span className="text-white">{modulo.id}</span>
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg text-white">{modulo.title}</h4>
                        <p className="text-sm text-white/60">
                          {completedCount} de {totalCount} aulas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Progress value={moduloProgress} className="h-2" />
                      </div>
                      <span className="text-[#a6ff00] w-12 text-right">
                        {Math.round(moduloProgress)}%
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-2 mt-4">
                    {modulo.aulas.map((aula, index) => {
                      const TypeIcon = getTypeIcon(aula.type);
                      return (
                        <button
                          key={aula.id}
                          onClick={() => !aula.locked && onStartAula(aula.id)}
                          disabled={aula.locked}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                            aula.locked
                              ? 'bg-white/5 opacity-50 cursor-not-allowed'
                              : 'bg-white/5 hover:bg-white/10 cursor-pointer border border-transparent hover:border-[#ff4687]/30'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              aula.completed
                                ? 'bg-gradient-to-br from-[#a6ff00] to-[#4d2cc4]'
                                : aula.locked
                                ? 'bg-white/10'
                                : 'bg-white/10'
                            }`}
                          >
                            {aula.completed ? (
                              <CheckCircle2 size={20} className="text-white" />
                            ) : aula.locked ? (
                              <Lock size={16} className="text-white/50" />
                            ) : (
                              <span className="text-white text-sm">{index + 1}</span>
                            )}
                          </div>

                          <div className="flex-1 text-left">
                            <h5 className="text-white mb-1">{aula.title}</h5>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-white/60 flex items-center gap-1">
                                <TypeIcon size={12} />
                                {getTypeLabel(aula.type)}
                              </span>
                              <span className="text-xs text-white/60 flex items-center gap-1">
                                <Clock size={12} />
                                {aula.duration}
                              </span>
                            </div>
                          </div>

                          {aula.completed && (
                            <div className="px-3 py-1 bg-[#a6ff00]/20 text-[#a6ff00] rounded-full text-xs">
                              Concluída
                            </div>
                          )}

                          {aula.locked && (
                            <div className="px-3 py-1 bg-white/10 text-white/50 rounded-full text-xs">
                              Bloqueada
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
