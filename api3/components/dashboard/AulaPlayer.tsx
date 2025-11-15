"use client";

import { useState } from 'react';
import { PlayCircle, FileText, Download, MessageSquare, CheckCircle2, ChevronLeft, ChevronRight, Clock, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AulaPlayerProps {
  aulaId: string;
  onBack: () => void;
}

export function AulaPlayer({ aulaId, onBack }: AulaPlayerProps) {
  const [activeTab, setActiveTab] = useState('descricao');

  // Mock data - em produção viria de uma API
  const aulaData = {
    id: aulaId,
    title: 'Inteligência Emocional no Trabalho',
    modulo: 'Módulo 2: Liderança e Empatia',
    duration: '20 min',
    videoUrl: 'https://example.com/video.mp4',
    description:
      'Nesta aula, você aprenderá os conceitos fundamentais da inteligência emocional e como aplicá-los no ambiente de trabalho. Discutiremos as cinco dimensões da IE: autoconsciência, autorregulação, motivação, empatia e habilidades sociais.',
    recursos: [
      { name: 'Apostila - Inteligência Emocional.pdf', size: '2.5 MB', type: 'PDF' },
      { name: 'Planilha de Autoavaliação.xlsx', size: '1.2 MB', type: 'Excel' },
      { name: 'Infográfico - 5 Dimensões da IE.png', size: '850 KB', type: 'Imagem' },
    ],
    comentarios: [
      {
        id: '1',
        autor: 'Maria Silva',
        avatar: '👩‍💼',
        data: 'Há 2 dias',
        texto: 'Excelente aula! Os exemplos práticos me ajudaram muito a entender como aplicar no dia a dia.',
      },
      {
        id: '2',
        autor: 'João Santos',
        avatar: '👨‍💼',
        data: 'Há 3 dias',
        texto: 'Alguém poderia me explicar melhor a diferença entre autorregulação e autoconsciência?',
      },
      {
        id: '3',
        autor: 'Ana Costa',
        avatar: '👩‍💼',
        data: 'Há 5 dias',
        texto: 'Material complementar muito rico! Já estou praticando os exercícios da planilha.',
      },
    ],
  };

  const trilhaData = {
    title: 'Trilha de Liderança Colaborativa',
    progress: 65,
    currentModule: 'Módulo 2: Liderança e Empatia',
    aulas: [
      { id: '2-1', title: 'O que é Liderança Empática', duration: '18 min', completed: true, locked: false, current: false },
      { id: '2-2', title: 'Inteligência Emocional no Trabalho', duration: '20 min', completed: false, locked: false, current: true },
      { id: '2-3', title: 'Gestão de Conflitos', duration: '15 min', completed: false, locked: false, current: false },
      { id: '2-4', title: 'Leitura: Estudos de Caso', duration: '10 min', completed: false, locked: false, current: false },
      { id: '2-5', title: 'Quiz: Avaliação do Módulo', duration: '5 min', completed: false, locked: true, current: false },
    ],
  };

  const handlePreviousAula = () => {
    console.log('Previous aula');
  };

  const handleNextAula = () => {
    console.log('Next aula');
  };

  const handleCompleteAula = () => {
    console.log('Complete aula');
  };

  return (
    <div className="min-h-screen flex gap-6">
      {/* Main Content Column */}
      <div className="flex-1 space-y-6">
        {/* Video Player */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-[#1a0b3d] to-[#311597] flex items-center justify-center relative">
            <div className="text-center">
              <PlayCircle size={80} className="text-[#ff4687] mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform" />
              <p className="text-white/60">Player de Vídeo</p>
            </div>
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-[#ff4687] transition-colors">
                  <PlayCircle size={24} />
                </button>
                <div className="flex-1">
                  <Progress value={35} className="h-2" />
                </div>
                <span className="text-white text-sm">7:00 / 20:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aula Title & Info */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#ff4687] mb-2">{aulaData.modulo}</p>
              <h1 className="text-3xl text-white mb-2">{aulaData.title}</h1>
              <div className="flex items-center gap-4 text-white/60">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {aulaData.duration}
                </span>
              </div>
            </div>
            <Button
              onClick={handleCompleteAula}
              className="bg-gradient-to-r from-[#a6ff00] to-[#4d2cc4] hover:shadow-lg border-0"
            >
              <CheckCircle2 className="mr-2" size={20} />
              Marcar como Concluída
            </Button>
          </div>
        </div>

        {/* Tabs: Description, Resources, Discussion */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-white/5">
              <TabsTrigger value="descricao" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
                Descrição
              </TabsTrigger>
              <TabsTrigger value="recursos" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
                Recursos
              </TabsTrigger>
              <TabsTrigger value="discussao" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]">
                Discussão
              </TabsTrigger>
            </TabsList>

            <TabsContent value="descricao" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl text-white">Sobre esta aula</h3>
                <p className="text-white/70 leading-relaxed">{aulaData.description}</p>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white mb-2">O que você vai aprender:</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#a6ff00] mt-1" />
                      <span>Os cinco pilares da inteligência emocional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#a6ff00] mt-1" />
                      <span>Como aplicar IE em situações de conflito</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#a6ff00] mt-1" />
                      <span>Técnicas para desenvolver autoconsciência</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#a6ff00] mt-1" />
                      <span>Estratégias de autorregulação emocional</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recursos" className="mt-6">
              <div className="space-y-3">
                <h3 className="text-xl text-white mb-4">Materiais para Download</h3>
                {aulaData.recursos.map((recurso, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] flex items-center justify-center">
                        <FileText size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-white">{recurso.name}</h4>
                        <p className="text-sm text-white/60">
                          {recurso.type} • {recurso.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discussao" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">Discussão</h3>
                  <Button className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] border-0">
                    <MessageSquare size={16} className="mr-2" />
                    Novo Comentário
                  </Button>
                </div>
                <div className="space-y-4">
                  {aulaData.comentarios.map((comentario) => (
                    <div
                      key={comentario.id}
                      className="p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] flex items-center justify-center text-xl">
                          {comentario.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white">{comentario.autor}</span>
                            <span className="text-xs text-white/60">• {comentario.data}</span>
                          </div>
                          <p className="text-white/70">{comentario.texto}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar: Navigation */}
      <div className="w-96 space-y-6">
        {/* Progress */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white">Progresso da Trilha</h3>
            <span className="text-[#ff4687]">{trilhaData.progress}%</span>
          </div>
          <Progress value={trilhaData.progress} className="h-3" />
        </div>

        {/* Aulas List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-white mb-4">{trilhaData.currentModule}</h3>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {trilhaData.aulas.map((aula, index) => (
                <button
                  key={aula.id}
                  disabled={aula.locked}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    aula.current
                      ? 'bg-gradient-to-r from-[#ff4687]/20 to-[#4d2cc4]/20 border-2 border-[#ff4687]'
                      : aula.locked
                      ? 'bg-white/5 opacity-50 cursor-not-allowed'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        aula.completed
                          ? 'bg-gradient-to-br from-[#a6ff00] to-[#4d2cc4]'
                          : aula.current
                          ? 'bg-gradient-to-br from-[#ff4687] to-[#4d2cc4]'
                          : aula.locked
                          ? 'bg-white/10'
                          : 'bg-white/10'
                      }`}
                    >
                      {aula.completed ? (
                        <CheckCircle2 size={16} className="text-white" />
                      ) : aula.locked ? (
                        <Lock size={12} className="text-white/50" />
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm mb-1 truncate">{aula.title}</h4>
                      <p className="text-xs text-white/60">{aula.duration}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
          <Button
            onClick={handlePreviousAula}
            variant="outline"
            className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <ChevronLeft size={20} className="mr-2" />
            Aula Anterior
          </Button>
          <Button
            onClick={handleNextAula}
            className="w-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] hover:shadow-lg border-0"
          >
            Próxima Aula
            <ChevronRight size={20} className="ml-2" />
          </Button>
        </div>

        {/* Back to Trilha */}
        <button
          onClick={onBack}
          className="w-full text-center text-white/70 hover:text-white transition-colors text-sm"
        >
          ← Voltar para visão da trilha
        </button>
      </div>
    </div>
  );
}
