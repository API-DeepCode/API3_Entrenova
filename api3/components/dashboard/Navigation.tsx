// Caminho: /api3/components/dashboard/Navigation.tsx
"use client";

// 1. Importar o Link e o usePathname (para saber a URL)
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { 
  BarChart3, Headphones, TrendingUp, Target, Award, Users, 
  UserCog, GraduationCap, Settings, User 
} from 'lucide-react';

// 2. Remover as props antigas (activeScreen, setActiveScreen)
export function Navigation() {
  
  // 3. Obter a URL atual
  const pathname = usePathname(); 

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

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl bg-linear-to-r from-[#ff4687] to-[#4d2cc4] bg-clip-text text-transparent">
          EntreNova Flix
        </h1>
        <p className="text-sm text-white/60 mt-1">Plataforma B2B E-Learning</p>
      </div>

      {/* Menu Items */}
      <div className="space-y-6">
        {['Interno', 'Funcionário', 'Gestão'].map((category) => (
          <div key={category}>
            <p className="text-xs text-white/40 mb-2 px-3">{category}</p>
            <div className="space-y-1">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => {
                  const Icon = item.icon;
                  
                  // 4. Lógica de "ativo" agora usa a URL
                  const isActive = pathname.includes(`/dashboard/${item.id}`); 

                  return (
                    // 5. Trocar <button> por <Link>
                    <Link
                      key={item.id}
                      href={`/dashboard/${item.id}`} // O link aponta para a nova rota
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
      </div>
    </nav>
  );
}