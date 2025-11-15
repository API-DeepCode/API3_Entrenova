"use client";

import { useEffect, useState } from "react";
import { UserCircle, LogOut, ArrowLeft } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import { usePathname } from "next/navigation";
import { User } from "@/lib/type";
import styles from "../styles/Header.module.css";

export function Header() {
  const navigate = useNavigation();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUser(null);
    navigate.navigateToLogin();
  };

  const handleNavigation = () => {
    if (pathname === "/") {
      if (!user) navigate.navigateToLogin();
    } else if (pathname === "/login" || pathname === "/register") {
      navigate.navigateToLandingPage();
    }
  };

  const getButtonText = () => {
    if (pathname === "/") return user ? "" : "Login";
    if (pathname === "/login" || pathname === "/register") return "Voltar";
    return "";
  };

  const buttonText = getButtonText();

  return (
    <header className={styles.header}>
      <div className={styles.right}>
        {user && (
          <span className={styles.companyName}>
            {user.nome_empresa}
          </span>
        )}

        {user ? (
          <div className={styles.avatarWrapper}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={styles.avatarButton}
            >
              <div className={styles.avatarInner}>
                <UserCircle className={styles.avatarIcon} />
              </div>
            </button>

            {showDropdown && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.nameText}>{user.nome_responsavel}</p>
                  <p className={styles.roleText}>{user.cargo_responsavel}</p>
                  <p className={styles.emailText}>{user.email_contato}</p>

                  <button
                    className={styles.navButton}
                    onClick={() => navigate.navigateToDashboard()}
                  >
                    DashBoard
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          buttonText && (
            <button onClick={handleNavigation} className={styles.loginButton}>
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