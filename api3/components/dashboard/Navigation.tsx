"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, Headphones, TrendingUp, Target, Award, Users, 
  UserCog, GraduationCap, Settings, User, House, HelpCircle 
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [cargo, setCargo] = useState<string | null>(null);

  // 🔍 Ler cargo do usuário no localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("usuarioLogado");
      if (data) {
        const user = JSON.parse(data);
        setCargo(user.cargo_responsavel || null);
      }
    } catch {
      setCargo(null);
    }
  }, []);

  const menuItems = [
    { id: 'comercial', label: 'Comercial', icon: BarChart3, category: 'Interno' },
    { id: 'atendimento', label: 'Atendimento', icon: Headphones, category: 'Interno' },
    { id: 'estrategico', label: 'Estratégico', icon: TrendingUp, category: 'Interno' },

    { id: 'trilhas', label: 'Trilhas & Aulas', icon: GraduationCap, category: 'Funcionário' },
    { id: 'mandala', label: 'Mandala', icon: Target, category: 'Funcionário' },
    { id: 'conquistas', label: 'Conquistas', icon: Award, category: 'Funcionário' },
    { id: 'config-funcionario', label: 'Meu Perfil', icon: User, category: 'Funcionário' },

    { id: 'gestores', label: 'Gestores', icon: Users, category: 'Gestão' },
    { id: 'colaboradores', label: 'Colaboradores', icon: UserCog, category: 'Gestão' },
    { id: 'config-empresa', label: 'Configurações', icon: Settings, category: 'Gestão' },
  ];

  // 🔐 Permissões por cargo
  const permissoes: Record<string, string[]> = {
    Admin: ["Interno"],
    Funcionario: ["Funcionário"],
    Gestao: ["Gestão"],
  };

  // ❌ Se não carregou o cargo ainda → não renderiza
  if (cargo === null) return null;

  const allowedCategories = permissoes[cargo] || [];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">

      <div className="mb-6">
        <h1 className="text-2xl bg-linear-to-r from-[#ff4687] to-[#4d2cc4] bg-clip-text text-transparent">
          EntreNova Flix
        </h1>
        <p className="text-sm text-white/60 mt-1">Plataforma B2B E-Learning</p>
      </div>
      {/* Link para tela inicial unificada */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            pathname === '/dashboard'
              ? 'bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white shadow-lg shadow-[#ff4687]/20'
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <House size={20} />
          <span>Início</span>
        </Link>
      </div>

      <div className="space-y-6">
        {["Interno", "Funcionário", "Gestão"]
          .filter((category) => allowedCategories.includes(category))
          .map((category) => (
          <div key={category}>
            <p className="text-xs text-white/40 mb-2 px-3">{category}</p>

            <div className="space-y-1">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.includes(`/dashboard/${item.id}`);

                  return (
                    <Link
                      key={item.id}
                      href={`/dashboard/${item.id}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-linear-to-r from-[#ff4687] to-[#4d2cc4] text-white shadow-lg shadow-[#ff4687]/20'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
        {/* Área inferior: ajuda + voltar home */}
        <div className="pt-4 mt-6 space-y-2 border-t border-white/10">
          <button
            onClick={() => {
              try {
                // dispara evento para abrir painel sem reload
                window.dispatchEvent(new Event("open-dashboard-onboarding"));
              } catch {/* ignore */}
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-white/70 hover:bg-white/5 hover:text-white"
          >
            <HelpCircle size={20} />
            <span>Ajuda / Como usar</span>
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-white/70 hover:bg-white/5 hover:text-white"
          >
            <House size={20} />
            <span>Voltar ao Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}