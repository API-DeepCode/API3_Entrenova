import { useState } from "react";
import { UserCircle, LogOut, ArrowLeft } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import { User } from "@/lib/type";
import { usePathname } from "next/navigation";

type HeaderProps = {
  user: User | null;
  onLogout: () => void;
};

export function Header({ user, onLogout }: HeaderProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigation();
    const pathname = usePathname();

  const handleNavigation = () => {
    if (pathname === "/") {
      if (!user) {
        navigate.navigateToLogin()
      }
    } else if (pathname === "/login" || pathname === "/register") {
      navigate.navigateToLandingPage()
    }
  };

  // Define o texto do botão principal
  const getButtonText = () => {
    if (pathname === "/landingPage") {
      return user ? "" : "Login";
    }
    if (pathname === "/login" || pathname === "/register") {
      return "Voltar";
    }
    return "";
  };

  const buttonText = getButtonText();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[#5B21B6]/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Nome da empresa (se logado) */}
          {user && (
            <span className="hidden sm:block text-[#E0B0FF]">
              {user.nome_empresa}
            </span>
          )}

          {/* Se o usuário estiver logado → mostrar foto de perfil */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-12 h-12 rounded-full bg-linear-to-br from-[#FF7FE5] to-[#E0B0FF] p-0.5 hover:shadow-[0_0_20px_rgba(255,127,229,0.5)] transition-all duration-300 group"
              >
                <div className="w-full h-full rounded-full bg-[#5B21B6] flex items-center justify-center">
                    <UserCircle className="w-7 h-7 text-[#FF7FE5]" />
                </div>
              </button>

              {/* Dropdown de perfil */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-[#5B21B6]/95 backdrop-blur-md rounded-xl border border-[#FF7FE5]/30 shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <p className="text-[#FF7FE5]">{user.nome_responsavel}</p>
                    <p className="text-sm text-[#E0B0FF]/70">{user.cargo_responsavel}</p>
                    <p className="text-xs text-[#E0B0FF]/50 mt-1">{user.email_contato}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-[#FF7FE5] hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Botão principal (Login / Voltar)
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
      </div>
    </header>
  );
}