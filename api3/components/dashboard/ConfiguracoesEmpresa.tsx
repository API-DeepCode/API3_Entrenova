"use client";


import { useState } from 'react';
import { CreditCard, Building2, Users, Palette, Bell, Download, Check, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface ConfiguracoesEmpresaProps {
  onNavigate?: (screen: string) => void;
}

export function ConfiguracoesEmpresa({ onNavigate }: ConfiguracoesEmpresaProps = {}) {
  const [companyData, setCompanyData] = useState({
    name: 'TechCorp Ltda',
    cnpj: '12.345.678/0001-90',
    email: 'contato@techcorp.com.br',
    phone: '(11) 98765-4321',
  });

  const [notifications, setNotifications] = useState({
    newUser: true,
    paymentReminder: true,
    courseCompletion: false,
    monthlyReport: true,
  });

  const invoices = [
    { id: 1, date: '01/11/2024', value: 'R$ 4.950,00', status: 'Pago' },
    { id: 2, date: '01/10/2024', value: 'R$ 4.950,00', status: 'Pago' },
    { id: 3, date: '01/09/2024', value: 'R$ 4.950,00', status: 'Pago' },
    { id: 4, date: '01/08/2024', value: 'R$ 3.850,00', status: 'Pago' },
    { id: 5, date: '01/07/2024', value: 'R$ 3.850,00', status: 'Pago' },
  ];

  const handleSaveCompanyData = () => {
    toast.success('Informações da empresa atualizadas com sucesso!');
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação salvas!');
  };

  const handleUploadLogo = () => {
    toast.success('Logo atualizado com sucesso!');
  };

  const handleGoToGestores = () => {
    if (onNavigate) {
      onNavigate('gestores');
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl text-white mb-2">⚙️ Configurações da Empresa</h2>
        <p className="text-white/60">Gerencie sua conta, assinatura e preferências</p>
      </div>

      <Tabs defaultValue="assinatura" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10 mb-8">
          <TabsTrigger 
            value="conta" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <Building2 size={16} className="mr-2" />
            Conta
          </TabsTrigger>
          <TabsTrigger 
            value="assinatura"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <CreditCard size={16} className="mr-2" />
            Assinatura
          </TabsTrigger>
          <TabsTrigger 
            value="equipes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <Users size={16} className="mr-2" />
            Equipes
          </TabsTrigger>
          <TabsTrigger 
            value="branding"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <Palette size={16} className="mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger 
            value="notificacoes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff4687] data-[state=active]:to-[#4d2cc4]"
          >
            <Bell size={16} className="mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Aba Conta */}
        <TabsContent value="conta" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-6">Informações da Empresa</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-white/80">Nome da Empresa</Label>
                <Input
                  id="company-name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-white/80">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={companyData.cnpj}
                  onChange={(e) => setCompanyData({ ...companyData, cnpj: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">E-mail Corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/80">Telefone</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSaveCompanyData}
                className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Aba Assinatura & Pagamento */}
        <TabsContent value="assinatura" className="space-y-6">
          {/* Meu Plano */}
          <div className="bg-gradient-to-br from-[#4d2cc4]/20 to-[#ff4687]/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl text-white mb-2">💎 Plano Profissional</h3>
                <p className="text-white/60">Acesso completo à plataforma</p>
              </div>
              <div className="text-right">
                <p className="text-3xl text-[#a6ff00] mb-1">R$ 4.950</p>
                <p className="text-white/60 text-sm">por mês</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white">Licenças Ativas</span>
                <span className="text-2xl text-white">75/100</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
              <p className="text-white/60 text-sm mt-2">25 licenças disponíveis</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90">
              Gerenciar Assinatura
            </Button>
          </div>

          {/* Método de Pagamento */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-6">💳 Método de Pagamento</h3>
            
            <div className="bg-white/5 rounded-xl p-6 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] rounded-lg flex items-center justify-center">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white">Cartão de Crédito</p>
                  <p className="text-white/60 text-sm">•••• •••• •••• 4242</p>
                  <p className="text-white/60 text-sm">Expira em 12/2025</p>
                </div>
              </div>
              <Button 
                className="bg-white/10 border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#ff4687] hover:to-[#4d2cc4] hover:border-transparent transition-all"
              >
                Alterar
              </Button>
            </div>
          </div>

          {/* Histórico de Faturas */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-6">📄 Histórico de Faturas</h3>
            
            <div className="overflow-hidden rounded-xl">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/70">Data</th>
                    <th className="text-left p-4 text-white/70">Valor</th>
                    <th className="text-center p-4 text-white/70">Status</th>
                    <th className="text-center p-4 text-white/70">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white">{invoice.date}</td>
                      <td className="p-4 text-white">{invoice.value}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs flex items-center justify-center gap-1 w-fit mx-auto ${
                          invoice.status === 'Pago' 
                            ? 'bg-[#a6ff00]/20 text-[#a6ff00]' 
                            : 'bg-[#ffaa00]/20 text-[#ffaa00]'
                        }`}>
                          {invoice.status === 'Pago' ? <Check size={14} /> : <AlertCircle size={14} />}
                          {invoice.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-[#4d2cc4] hover:text-[#ff4687] hover:bg-white/10"
                        >
                          <Download size={16} className="mr-2" />
                          Baixar PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Aba Equipes */}
        <TabsContent value="equipes" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <Users size={64} className="text-white/30 mx-auto mb-6" />
            <h3 className="text-2xl text-white mb-3">Gerenciamento de Equipes</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Acesse o dashboard de gestores para visualizar e gerenciar todos os colaboradores da sua empresa.
            </p>
            <Button
              className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
              onClick={handleGoToGestores}
            >
              Ir para Dashboard de Gestores
            </Button>
          </div>
        </TabsContent>

        {/* Aba Branding */}
        <TabsContent value="branding" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-6">🎨 Personalização da Marca</h3>
            
            <div className="space-y-6">
              <div>
                <Label className="text-white/80 mb-3 block">Logo da Empresa</Label>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-white/10 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center">
                    <Palette size={32} className="text-white/40" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm mb-3">
                      Faça upload do logo da sua empresa. Recomendamos imagens em formato PNG ou SVG com fundo transparente.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleUploadLogo}
                        className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90"
                      >
                        Upload de Logo
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Label className="text-white/80 mb-3 block">Cores da Marca</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color" className="text-white/60 text-sm">Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        defaultValue="#ff4687"
                        className="w-16 h-10 bg-white/10 border-white/20"
                      />
                      <Input
                        value="#ff4687"
                        readOnly
                        className="flex-1 bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color" className="text-white/60 text-sm">Cor Secundária</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        defaultValue="#4d2cc4"
                        className="w-16 h-10 bg-white/10 border-white/20"
                      />
                      <Input
                        value="#4d2cc4"
                        readOnly
                        className="flex-1 bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent-color" className="text-white/60 text-sm">Cor de Destaque</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent-color"
                        type="color"
                        defaultValue="#a6ff00"
                        className="w-16 h-10 bg-white/10 border-white/20"
                      />
                      <Input
                        value="#a6ff00"
                        readOnly
                        className="flex-1 bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:opacity-90">
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Aba Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl text-white mb-6">🔔 Preferências de Notificação</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Novo Usuário Cadastrado</p>
                  <p className="text-white/60 text-sm">Receba um e-mail quando um novo colaborador for adicionado</p>
                </div>
                <Switch
                  checked={notifications.newUser}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newUser: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Lembretes de Pagamento</p>
                  <p className="text-white/60 text-sm">Receba alertas sobre vencimento de faturas</p>
                </div>
                <Switch
                  checked={notifications.paymentReminder}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, paymentReminder: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Conclusão de Cursos</p>
                  <p className="text-white/60 text-sm">Notificações quando colaboradores completarem trilhas</p>
                </div>
                <Switch
                  checked={notifications.courseCompletion}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, courseCompletion: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white mb-1">Relatório Mensal</p>
                  <p className="text-white/60 text-sm">Resumo mensal de atividades e métricas</p>
                </div>
                <Switch
                  checked={notifications.monthlyReport}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, monthlyReport: checked })}
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