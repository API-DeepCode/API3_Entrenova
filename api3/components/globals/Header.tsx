"use client";

import { useEffect, useState } from "react";
import { UserCircle, LogOut, ArrowLeft } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import { usePathname } from "next/navigation";
import { User } from "@/lib/type";

export function Header() {
  const navigate = useNavigation();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Carrega o usuário logado do localStorage (client side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("usuarioLogado");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUser(null);
    navigate.navigateToLogin();
  };

  // Navegação do botão
  const handleNavigation = () => {
    if (pathname === "/") {
      if (!user) navigate.navigateToLogin();
    } else if (pathname === "/login" || pathname === "/register") {
      navigate.navigateToLandingPage();
    }
  };

  // Texto do botão principal
  const getButtonText = () => {
    if (pathname === "/") return user ? "" : "Login";
    if (pathname === "/login" || pathname === "/register") return "Voltar";
    return "";
  };

  const buttonText = getButtonText();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-end p-3 pr-10">
      <div className="flex items-center gap-4">
        
        {/* Nome da empresa (somente logado) */}
        {user && (
          <span className="hidden sm:block text-[#E0B0FF]">
            {user.nome_empresa}
          </span>
        )}

        {/* Se estiver logado → Avatar */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-12 h-12 rounded-full bg-linear-to-br from-[#FF7FE5] to-[#E0B0FF] p-0.5 hover:shadow-[0_0_20px_rgba(255,127,229,0.5)] transition-all duration-300"
            >
              <div className="w-full h-full rounded-full bg-[#5B21B6] flex items-center justify-center">
                <UserCircle className="w-7 h-7 text-[#FF7FE5]" />
              </div>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-[#5B21B6]/95 backdrop-blur-md rounded-xl border border-[#FF7FE5]/30 shadow-lg overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <p className="text-[#FF7FE5]">{user.nome_responsavel}</p>
                  <p className="text-sm text-[#E0B0FF]/70">{user.cargo_responsavel}</p>
                  <p className="text-xs text-[#E0B0FF]/50 mt-1">{user.email_contato}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-[#FF7FE5] hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Botão principal (Login / Voltar) */
          buttonText && (
            <button
              onClick={handleNavigation}
              className="px-6 py-2.5 bg-white/10 border border-[#E0B0FF]/40 rounded-lg text-[#E0B0FF] hover:bg-white/20 hover:border-[#FF7FE5]/60 transition-all duration-300 flex items-center gap-2"
            >
              {(pathname === "/login" || pathname === "/register") && (
                <ArrowLeft className="w-4 h-4" />
              )}
              {buttonText}
            </button>
          )
        )}
      </div>
    </header>
  );
}