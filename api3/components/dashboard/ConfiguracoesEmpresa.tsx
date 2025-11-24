"use client";


import { useEffect, useRef, useState } from 'react';
import { CreditCard, Building2, Users, Palette, Bell, Download, Check, AlertCircle, Image } from 'lucide-react';
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
    name: 'Empresa',
    cnpj: '00.000.000/0000-00',
    email: 'contato@suaempresa.com',
    phone: '(11) 90000-0000',
  });
  const [brandingLogo, setBrandingLogo] = useState<string>('');
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const planoOptions = [
    { id: 'ouro', label: 'Ouro', price: 690 },
    { id: 'diamante', label: 'Diamante', price: 1290 },
    { id: 'premium', label: 'Premium', price: 2190 },
  ];
  const [selectedPlan, setSelectedPlan] = useState<string>('diamante');
  const [paymentMethod, setPaymentMethod] = useState<string>('cartao');
  const [billingEmail, setBillingEmail] = useState<string>('financeiro@suaempresa.com');

  const [notifications, setNotifications] = useState({
    newUser: true,
    paymentReminder: true,
    courseCompletion: false,
    monthlyReport: true,
  });

  const invoices = [
    { id: 1, date: '01/11/2024', status: 'Pago' },
    { id: 2, date: '01/10/2024', status: 'Pago' },
    { id: 3, date: '01/09/2024', status: 'Pago' },
    { id: 4, date: '01/08/2024', status: 'Pago' },
    { id: 5, date: '01/07/2024', status: 'Pago' },
  ];

  function formatCnpj(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    const parts = [
      digits.slice(0, 2),
      digits.slice(2, 5),
      digits.slice(5, 8),
      digits.slice(8, 12),
      digits.slice(12, 14),
    ].filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length <= 2) return parts.join('.');
    if (parts.length === 3) return `${parts[0]}.${parts[1]}.${parts[2]}`;
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}/${parts[3]}`;
    return `${parts[0]}.${parts[1]}.${parts[2]}/${parts[3]}-${parts[4]}`;
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('usuarioLogado');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCompanyData((prev) => ({
          ...prev,
          name: parsed.nome_empresa || parsed.name || prev.name,
          cnpj: parsed.cnpj ? formatCnpj(parsed.cnpj) : prev.cnpj,
          email: parsed.email_contato || parsed.email || prev.email,
          phone: parsed.telefone_contato ? formatPhone(parsed.telefone_contato) : prev.phone,
        }));
        setBillingEmail(parsed.email_contato || parsed.email || billingEmail);
      }
      const savedLogo = localStorage.getItem('empresaLogo');
      if (savedLogo) setBrandingLogo(savedLogo);
      const savedPlan = localStorage.getItem('empresaPlano');
      if (savedPlan) setSelectedPlan(savedPlan);
      const savedMethod = localStorage.getItem('empresaMetodoPagamento');
      if (savedMethod) setPaymentMethod(savedMethod);
      const savedBillingEmail = localStorage.getItem('empresaEmailCobranca');
      if (savedBillingEmail) setBillingEmail(savedBillingEmail);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveCompanyData = () => {
    toast.success('Informações da empresa atualizadas com sucesso!');
  };
  const handleDownloadInvoice = (invoiceId: number) => {
    const price = planoOptions.find((p) => p.id === selectedPlan)?.price || 0;
    const invoice = invoices.find((i) => i.id === invoiceId);
    const lines = [
      "Recibo de Pagamento",
      "--------------------",
      `Empresa: ${companyData.name}`,
      `CNPJ: ${companyData.cnpj}`,
      `Plano: ${planoOptions.find((p) => p.id === selectedPlan)?.label} - R$ ${price.toLocaleString('pt-BR')}`,
      `Fatura: ${invoice?.id ?? '-'}`,
      `Data: ${invoice?.date ?? '-'}`,
      `Status: ${invoice?.status ?? '-'}`,
      `Método: ${paymentMethod === 'cartão' ? 'Cartão de Crédito' : 'Boleto/PIX'}`,
      `E-mail cobrança: ${billingEmail}`,
    ];

    const escapePdfText = (text: string) =>
      text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

    const textStream = [
      "BT",
      "/F1 12 Tf",
      "50 760 Td",
      lines.map((l, idx) => `${idx === 0 ? "" : "0 -16 Td"}(${escapePdfText(l)}) Tj`).join("\n"),
      "ET",
    ].join("\n");

    const objects: string[] = [
      "",
      `1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj`,
      `2 0 obj
<< /Type /Pages /Count 1 /Kids [3 0 R] >>
endobj`,
      `3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj`,
      `4 0 obj
<< /Length ${textStream.length} >>
stream
${textStream}
endstream
endobj`,
      `5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj`,
    ];

    let pdf = "%PDF-1.4\n";
    const xref: string[] = ["0000000000 65535 f \n"];
    for (let i = 1; i < objects.length; i++) {
      const offset = pdf.length;
      xref.push(offset.toString().padStart(10, "0") + " 00000 n \n");
      pdf += objects[i] + "\n";
    }
    const xrefStart = pdf.length;
    pdf += `xref
0 ${objects.length}
${xref.join("")}trailer
<< /Size ${objects.length} /Root 1 0 R >>
startxref
${xrefStart}
%%EOF`;

    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fatura-${invoiceId}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação salvas!');
  };

  const handleUploadLogo = () => {
    logoInputRef.current?.click();
  };

  const onLogoSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBrandingLogo(result);
      try {
        localStorage.setItem('empresaLogo', result);
      } catch {
        // ignore
      }
      toast.success('Logo atualizado com sucesso!');
    };
    reader.readAsDataURL(file);
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    localStorage.setItem('empresaPlano', planId);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    localStorage.setItem('empresaMetodoPagamento', method);
    toast.success('Método de pagamento atualizado!');
  };

  const handleBillingEmailChange = (value: string) => {
    setBillingEmail(value);
    localStorage.setItem('empresaEmailCobranca', value);
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
                  onChange={(e) => setCompanyData({ ...companyData, cnpj: formatCnpj(e.target.value) })}
                  className="bg-white/10 border-white/20 text-white"
                  inputMode="numeric"
                  maxLength={18}
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
                  onChange={(e) => setCompanyData({ ...companyData, phone: formatPhone(e.target.value) })}
                  className="bg-white/10 border-white/20 text-white"
                  inputMode="tel"
                  maxLength={16}
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
                <h3 className="text-2xl text-white mb-2">
                  💎 Plano {planoOptions.find((p) => p.id === selectedPlan)?.label || 'Ouro'}
                </h3>
                <p className="text-white/60">Acesso às trilhas conforme o plano atual</p>
              </div>
              <div className="text-right">
                <p className="text-3xl text-[#a6ff00] mb-1">
                  R$ {planoOptions.find((p) => p.id === selectedPlan)?.price.toLocaleString('pt-BR')}
                </p>
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

            <div className="grid grid-cols-3 gap-3 mb-4">
              {planoOptions.map((plan) => (
                <Button
                  key={plan.id}
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className={`w-full ${selectedPlan === plan.id ? "bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white" : "text-white border-white/20"}`}
                  onClick={() => handlePlanChange(plan.id)}
                >
                  {plan.label} • R$ {plan.price.toLocaleString('pt-BR')}/mês
                </Button>
              ))}
            </div>

            <div className="space-y-3 bg-white/5 rounded-xl p-4">
              <Label className="text-white/80">E-mail para cobrança</Label>
              <Input
                value={billingEmail}
                onChange={(e) => handleBillingEmailChange(e.target.value)}
                type="email"
                className="bg-white/10 border-white/20 text-white"
                placeholder="financeiro@suaempresa.com"
              />
            </div>
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
                  <p className="text-white">{paymentMethod === 'cartao' ? 'Cartão de Crédito' : 'Boleto/PIX'}</p>
                  <p className="text-white/60 text-sm">
                    {paymentMethod === 'cartao' ? '•••• •••• •••• 4242' : 'Será enviado ao e-mail de cobrança'}
                  </p>
                  <p className="text-white/60 text-sm">
                    {paymentMethod === 'cartao' ? 'Expira em 12/2025' : billingEmail}
                  </p>
                </div>
              </div>
              <Button 
                className="bg-white/10 border border-white/20 text-white hover:bg-gradient-to-r hover:from-[#ff4687] hover:to-[#4d2cc4] hover:border-transparent transition-all"
                onClick={() => handlePaymentMethodChange(paymentMethod === 'cartao' ? 'boleto' : 'cartao')}
              >
                Alterar para {paymentMethod === 'cartao' ? 'Boleto/PIX' : 'Cartão'}
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
                  {invoices.map((invoice) => {
                    const price = planoOptions.find((p) => p.id === selectedPlan)?.price || 0;
                    const value = `R$ ${price.toLocaleString('pt-BR')},00`;
                    return (
                    <tr key={invoice.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white">{invoice.date}</td>
                      <td className="p-4 text-white">{value}</td>
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
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download size={16} className="mr-2" />
                          Baixar PDF
                        </Button>
                      </td>
                    </tr>
                    );
                  })}
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
                  <div className="w-32 h-32 bg-white/10 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
                    {brandingLogo ? (
                      <img src={brandingLogo} alt="Logo da empresa" className="w-full h-full object-contain" />
                    ) : (
                      <Palette size={32} className="text-white/40" />
                    )}
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
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onLogoSelected}
                    />
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
