"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserPlus, Trash2, Mail, Phone, Briefcase, Search, IdCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface Colaborador {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinedAt: string;
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 9),
    digits.slice(9, 11),
  ].filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length <= 3) return parts.join(".");
  return `${parts[0]}.${parts[1]}.${parts[2]}${parts[3] ? `-${parts[3]}` : ""}`;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function GerenciarColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      role: 'Desenvolvedor',
      department: 'TI',
      status: 'active',
      joinedAt: '15/01/2024',
    },
    {
      id: '2',
      name: 'Ana Costa',
      email: 'ana.costa@empresa.com',
      phone: '(11) 98765-4322',
      cpf: '987.654.321-00',
      role: 'Designer',
      department: 'Design',
      status: 'active',
      joinedAt: '20/02/2024',
    },
    {
      id: '3',
      name: 'Lucas Reis',
      email: 'lucas.reis@empresa.com',
      phone: '(11) 98765-4323',
      cpf: '321.654.987-00',
      role: 'Analista',
      department: 'Marketing',
      status: 'active',
      joinedAt: '10/03/2024',
    },
    {
      id: '4',
      name: 'Marina Souza',
      email: 'marina.souza@empresa.com',
      phone: '(11) 98765-4324',
      cpf: '159.357.456-00',
      role: 'Gerente',
      department: 'Vendas',
      status: 'active',
      joinedAt: '05/04/2024',
    },
    {
      id: '5',
      name: 'Carlos Lima',
      email: 'carlos.lima@empresa.com',
      phone: '(11) 98765-4325',
      cpf: '852.741.963-00',
      role: 'Coordenador',
      department: 'RH',
      status: 'inactive',
      joinedAt: '12/05/2024',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [colaboradorToDelete, setColaboradorToDelete] = useState<string | null>(null);
  const [newColaborador, setNewColaborador] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    role: '',
    department: '',
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('onboarding') === '1') {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  const handleAddColaborador = () => {
    if (!newColaborador.name || !newColaborador.email || !newColaborador.role || !newColaborador.cpf) {
      return;
    }

    const colaborador: Colaborador = {
      id: Date.now().toString(),
      ...newColaborador,
      status: 'active',
      joinedAt: new Date().toLocaleDateString('pt-BR'),
    };

    setColaboradores([...colaboradores, colaborador]);
    setNewColaborador({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      role: '',
      department: '',
    });
    setIsDialogOpen(false);
  };

  const handleDeleteColaborador = (id: string) => {
    setColaboradores(colaboradores.filter((c) => c.id !== id));
    setColaboradorToDelete(null);
  };

  const filteredColaboradores = colaboradores.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: colaboradores.length,
    active: colaboradores.filter((c) => c.status === 'active').length,
    inactive: colaboradores.filter((c) => c.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl text-white mb-2">Gestao de Equipe</h2>
          <p className="text-white/60">Adicione rapidamente colaboradores para liberar as trilhas adquiridas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:shadow-lg hover:shadow-[#ff4687]/30 transition-all border-0">
              <UserPlus className="mr-2" size={20} />
              Adicionar Colaborador
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a0b3d] border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Novo Colaborador</DialogTitle>
              <DialogDescription className="text-white/60">
                Preencha os dados do novo colaborador para adicionar à plataforma.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: João Silva"
                  value={newColaborador.name}
                  onChange={(e) => setNewColaborador({ ...newColaborador, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao.silva@empresa.com"
                  value={newColaborador.email}
                  onChange={(e) => setNewColaborador({ ...newColaborador, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-white">
                  CPF *
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={newColaborador.cpf}
                  onChange={(e) => setNewColaborador({ ...newColaborador, cpf: formatCpf(e.target.value) })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  inputMode="numeric"
                  maxLength={14}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="(11) 98765-4321"
                  value={newColaborador.phone}
                  onChange={(e) => setNewColaborador({ ...newColaborador, phone: formatPhone(e.target.value) })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  inputMode="numeric"
                  maxLength={16}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Cargo *
                </Label>
                <Input
                  id="role"
                  placeholder="Ex: Desenvolvedor"
                  value={newColaborador.role}
                  onChange={(e) => setNewColaborador({ ...newColaborador, role: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-white">
                  Departamento
                </Label>
                <Select
                  value={newColaborador.department}
                  onValueChange={(value) => setNewColaborador({ ...newColaborador, department: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a0b3d] border-white/10 text-white">
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddColaborador}
                className="bg-gradient-to-r from-[#ff4687] to-[#4d2cc4] text-white hover:shadow-lg border-0"
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-white/60 text-sm mb-1">Total de Colaboradores</p>
          <p className="text-3xl text-white">{stats.total}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-white/60 text-sm mb-1">Ativos</p>
          <p className="text-3xl text-[#a6ff00]">{stats.active}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-white/60 text-sm mb-1">Inativos</p>
          <p className="text-3xl text-[#ff4687]">{stats.inactive}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <Input
            placeholder="Buscar por nome, email, departamento ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Colaboradores Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/70">Nome</th>
                <th className="text-left p-4 text-white/70">E-mail</th>
                <th className="text-left p-4 text-white/70">CPF</th>
                <th className="text-left p-4 text-white/70">Telefone</th>
                <th className="text-left p-4 text-white/70">Cargo</th>
                <th className="text-left p-4 text-white/70">Departamento</th>
                <th className="text-left p-4 text-white/70">Status</th>
                <th className="text-left p-4 text-white/70">Entrada</th>
                <th className="text-center p-4 text-white/70">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredColaboradores.map((colaborador) => (
                <tr key={colaborador.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff4687] to-[#4d2cc4] flex items-center justify-center">
                        <span className="text-white">
                          {colaborador.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                      </div>
                      <span className="text-white">{colaborador.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <Mail size={16} />
                      <span>{colaborador.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <IdCard size={16} />
                      <span>{colaborador.cpf}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <Phone size={16} />
                      <span>{colaborador.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <Briefcase size={16} />
                      <span>{colaborador.role}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-[#4d2cc4]/20 text-[#4d2cc4] rounded-full text-sm">
                      {colaborador.department}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        colaborador.status === 'active'
                          ? 'bg-[#a6ff00]/20 text-[#a6ff00]'
                          : 'bg-[#ff4687]/20 text-[#ff4687]'
                      }`}
                    >
                      {colaborador.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 text-white/70">{colaborador.joinedAt}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setColaboradorToDelete(colaborador.id)}
                        className="p-2 rounded-lg bg-[#ff4687]/10 text-[#ff4687] hover:bg-[#ff4687]/20 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredColaboradores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">Nenhum colaborador encontrado</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!colaboradorToDelete} onOpenChange={() => setColaboradorToDelete(null)}>
        <AlertDialogContent className="bg-[#1a0b3d] border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmar Remoção</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Tem certeza que deseja remover este colaborador? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => colaboradorToDelete && handleDeleteColaborador(colaboradorToDelete)}
              className="bg-gradient-to-r from-[#ff4687] to-[#ff4687] hover:shadow-lg border-0"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
