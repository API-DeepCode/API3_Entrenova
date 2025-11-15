"use client";

import { useState } from 'react';
import { User, Lock, Bell, Upload, Camera } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export function ConfiguracoesFuncionario() {
  const [profileData, setProfileData] = useState({
    name: 'João Silva',
    email: 'joao.silva@techcorp.com.br',
    role: 'Analista de Marketing',
    avatar: '',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    newCourse: true,
    newBadge: true,
    weeklyReport: false,
    comments: true,
  });

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('As senhas não coincidem!');
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres!');
      return;
    }
    toast.success('Senha alterada com sucesso!');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação salvas!');
  };

  const handleUploadAvatar = () => {
    toast.success('Foto de perfil atualizada!');
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl text-white mb-2">👤 Configurações do Perfil</h2>
        <p className="text-white/60">Gerencie suas informações pessoais e preferências</p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-white/5 border border-white/10 mb-8">
          <TabsTrigger 
            value="perfil" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <User size={16} className="mr-2" />
            Meu Perfil
          </TabsTrigger>
          <TabsTrigger 
            value="seguranca"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <Lock size={16} className="mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger 
            value="notificacoes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <Bell size={16} className="mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Aba Meu Perfil */}
        <TabsContent value="perfil" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-8">Informações Pessoais</h3>
            
            {/* Upload de Avatar */}
            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/10">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] rounded-full flex items-center justify-center text-white text-4xl">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                  )}
                </div>
                <button
                  onClick={handleUploadAvatar}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-[#4d2cc4] rounded-full flex items-center justify-center hover:bg-[#ff4687] transition-colors border-4 border-[#1a0b3d]"
                >
                  <Camera size={18} className="text-white" />
                </button>
              </div>
              
              <div className="flex-1">
                <h4 className="text-white text-lg mb-2">{profileData.name}</h4>
                <p className="text-white/60 mb-4">{profileData.role}</p>
                <Button
                  onClick={handleUploadAvatar}
                  className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
                >
                  <Upload size={16} className="mr-2" />
                  Alterar Foto
                </Button>
              </div>
            </div>

            {/* Formulário de Dados */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="name" className="text-white/80">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="bg-white/5 border-white/10 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-white/40 text-xs">O e-mail não pode ser alterado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white/80">Cargo / Função</Label>
                  <Input
                    id="role"
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Aba Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-2">🔒 Alterar Senha</h3>
            <p className="text-white/60 mb-8">Mantenha sua conta segura com uma senha forte</p>
            
            <div className="space-y-6 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-white/80">Senha Atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Digite sua senha atual"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-white/80">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Digite sua nova senha"
                />
                <p className="text-white/40 text-xs">Mínimo de 6 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white/80">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Confirme sua nova senha"
                />
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleChangePassword}
                  className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
                >
                  Alterar Senha
                </Button>
              </div>
            </div>
          </div>

          {/* Dicas de Segurança */}
          <div className="bg-gradient-to-br from-[#4d2cc4]/10 to-[#ff4687]/10 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white mb-4">💡 Dicas de Segurança</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>✓ Use uma combinação de letras maiúsculas e minúsculas</li>
              <li>✓ Inclua números e caracteres especiais</li>
              <li>✓ Evite usar informações pessoais óbvias</li>
              <li>✓ Não compartilhe sua senha com outras pessoas</li>
            </ul>
          </div>
        </TabsContent>

        {/* Aba Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-2">🔔 Preferências de E-mail</h3>
            <p className="text-white/60 mb-8">Escolha quais notificações você deseja receber</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Novos Cursos Disponíveis</p>
                  <p className="text-white/60 text-sm">Receba um e-mail quando novas trilhas forem publicadas</p>
                </div>
                <Switch
                  checked={notifications.newCourse}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newCourse: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Novas Conquistas</p>
                  <p className="text-white/60 text-sm">Notificação quando você ganhar um novo badge</p>
                </div>
                <Switch
                  checked={notifications.newBadge}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newBadge: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Relatório Semanal</p>
                  <p className="text-white/60 text-sm">Resumo semanal do seu progresso e atividades</p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white mb-1">Respostas a Comentários</p>
                  <p className="text-white/60 text-sm">Quando alguém responder seus comentários ou feedbacks</p>
                </div>
                <Switch
                  checked={notifications.comments}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSaveNotifications}
                className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
              >
                Salvar Preferências
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}