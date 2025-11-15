"use client";

import { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  category: 'sugestao' | 'duvida' | 'problema' | 'elogio';
  timestamp: string;
  status: 'novo' | 'em_analise' | 'resolvido';
  likes: number;
}

interface FeedbackCommentsProps {
  viewMode?: 'employee' | 'attendance';
}

export function FeedbackComments({ viewMode = 'employee' }: FeedbackCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Comment['category']>('sugestao');

  useEffect(() => {
    // Carregar comentários do localStorage
    const storedComments = localStorage.getItem('entrenova_comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      // Mock data inicial
      const mockComments: Comment[] = [
        {
          id: '1',
          author: 'Maria Silva',
          role: 'Analista de Marketing',
          content: 'Seria ótimo ter mais trilhas focadas em marketing digital e estratégias de conteúdo.',
          category: 'sugestao',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'novo',
          likes: 12,
        },
        {
          id: '2',
          author: 'Pedro Santos',
          role: 'Desenvolvedor',
          content: 'O player de vídeo às vezes trava no meu navegador. Já tentei limpar o cache mas o problema persiste.',
          category: 'problema',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'em_analise',
          likes: 5,
        },
        {
          id: '3',
          author: 'Ana Oliveira',
          role: 'Gerente de Vendas',
          content: 'A plataforma está incrível! A mandala de desenvolvimento me ajudou muito a identificar pontos de melhoria.',
          category: 'elogio',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          status: 'resolvido',
          likes: 23,
        },
      ];
      setComments(mockComments);
      localStorage.setItem('entrenova_comments', JSON.stringify(mockComments));
    }
  }, []);

  const saveComments = (updatedComments: Comment[]) => {
    setComments(updatedComments);
    localStorage.setItem('entrenova_comments', JSON.stringify(updatedComments));
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast.error('Por favor, escreva seu comentário antes de enviar.');
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Usuário Atual', // Em produção, viria do contexto de autenticação
      role: 'Colaborador',
      content: newComment,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
      status: 'novo',
      likes: 0,
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment('');
    toast.success('Comentário enviado com sucesso!');
  };

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
    saveComments(updatedComments);
  };

  const handleStatusChange = (commentId: string, newStatus: Comment['status']) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, status: newStatus }
        : comment
    );
    saveComments(updatedComments);
    toast.success('Status atualizado!');
  };

  const getCategoryColor = (category: Comment['category']) => {
    switch (category) {
      case 'sugestao': return { bg: 'bg-[#4d2cc4]/20', text: 'text-[#4d2cc4]', border: 'border-[#4d2cc4]/30' };
      case 'duvida': return { bg: 'bg-[#ff4687]/20', text: 'text-[#ff4687]', border: 'border-[#ff4687]/30' };
      case 'problema': return { bg: 'bg-[#ffaa00]/20', text: 'text-[#ffaa00]', border: 'border-[#ffaa00]/30' };
      case 'elogio': return { bg: 'bg-[#a6ff00]/20', text: 'text-[#a6ff00]', border: 'border-[#a6ff00]/30' };
    }
  };

  const getCategoryLabel = (category: Comment['category']) => {
    switch (category) {
      case 'sugestao': return '💡 Sugestão';
      case 'duvida': return '❓ Dúvida';
      case 'problema': return '⚠️ Problema';
      case 'elogio': return '⭐ Elogio';
    }
  };

  const getStatusColor = (status: Comment['status']) => {
    switch (status) {
      case 'novo': return 'bg-[#ff4687]';
      case 'em_analise': return 'bg-[#4d2cc4]';
      case 'resolvido': return 'bg-[#a6ff00]';
    }
  };

  const getStatusLabel = (status: Comment['status']) => {
    switch (status) {
      case 'novo': return 'Novo';
      case 'em_analise': return 'Em Análise';
      case 'resolvido': return 'Resolvido';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `há ${days} dia${days > 1 ? 's' : ''}`;
    if (hours > 0) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
    return 'há poucos minutos';
  };

  return (
    <div className="space-y-6">
      {viewMode === 'employee' && (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl text-white mb-2">💬 Comentários e Sugestões</h3>
            <p className="text-white/60">Compartilhe suas ideias, dúvidas e feedbacks conosco</p>
          </div>

          {/* Formulário de novo comentário */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h4 className="text-white mb-4">Novo Comentário</h4>
            
            {/* Categorias */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {(['sugestao', 'duvida', 'problema', 'elogio'] as const).map((category) => {
                const colors = getCategoryColor(category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-xl border transition-all ${
                      selectedCategory === category
                        ? `${colors.bg} ${colors.border} border-2`
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <p className={selectedCategory === category ? colors.text : 'text-white/60'}>
                      {getCategoryLabel(category)}
                    </p>
                  </button>
                );
              })}
            </div>

            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário aqui..."
              className="mb-4 bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
            />
            
            <Button
              onClick={handleSubmitComment}
              className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
            >
              <Send size={16} className="mr-2" />
              Enviar Comentário
            </Button>
          </div>
        </>
      )}

      {viewMode === 'attendance' && (
        <div className="mb-6">
          <h3 className="text-2xl text-white mb-2">💬 Feedback dos Colaboradores</h3>
          <p className="text-white/60">Comentários e sugestões enviados pelos funcionários</p>
        </div>
      )}

      {/* Lista de comentários */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <MessageSquare size={48} className="text-white/30 mx-auto mb-4" />
            <p className="text-white/60">Nenhum comentário ainda</p>
          </div>
        ) : (
          comments.map((comment) => {
            const categoryColors = getCategoryColor(comment.category);
            return (
              <div
                key={comment.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white">{comment.author}</span>
                      <span className="text-white/50 text-sm">• {comment.role}</span>
                      <span className={`px-3 py-1 rounded-full text-xs ${categoryColors.bg} ${categoryColors.text} border ${categoryColors.border}`}>
                        {getCategoryLabel(comment.category)}
                      </span>
                    </div>
                    <p className="text-white/80 mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4 text-white/50 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatTimestamp(comment.timestamp)}
                      </span>
                      <button
                        onClick={() => handleLike(comment.id)}
                        className="flex items-center gap-1 hover:text-[#ff4687] transition-colors"
                      >
                        <ThumbsUp size={14} />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(comment.status)}`}>
                      {getStatusLabel(comment.status)}
                    </span>
                    
                    {viewMode === 'attendance' && (
                      <select
                        value={comment.status}
                        onChange={(e) => handleStatusChange(comment.id, e.target.value as Comment['status'])}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-xs text-white cursor-pointer hover:bg-white/20 transition-colors"
                      >
                        <option value="novo">Novo</option>
                        <option value="em_analise">Em Análise</option>
                        <option value="resolvido">Resolvido</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
