"use client"

import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { Header } from '@/components/globals/Header';
import { loginUsuario } from '../lib/firebaseService';

type props = {
  onLogin: (email: string, password: string) => void;
};

export default function Login({ onLogin }: props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      const response = await loginUsuario(email, password);

      if (response.success) {
        localStorage.setItem("usuarioLogado", JSON.stringify(response.user));

        navigation.navigateToLandingPage();
      } else {
        alert(response.error);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background gradient consistent with site */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-br from-[#1a0b3d] via-[#311597] to-[#1a0b3d]" />
      <Header />

      <div className="w-full max-w-md mt-10">
        <div className="rounded-3xl p-8 md:p-10 border border-white/15 bg-black/30 backdrop-blur-xl shadow-[0_0_1px_1px_rgba(255,255,255,0.08),0_12px_40px_-8px_rgba(0,0,0,0.55)] space-y-7">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-[#3d2a8f] to-[#6b54e5] bg-clip-text text-transparent">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-white/70">
              Acesse para continuar sua jornada
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-wide uppercase text-white/60">
                E-mail
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${email ? 'text-[#6b54e5]' : 'text-white/40'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl px-10 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#6b54e5] focus:ring-2 focus:ring-[#6b54e5]/30 transition border ${email ? 'bg-[#22174a]/70 border-[#6b54e5]/50 shadow-[0_0_0_1px_rgba(107,84,229,0.4)]' : 'bg-white/5 border-white/15'}`}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-wide uppercase text-white/60">
                Senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${password ? 'text-[#6b54e5]' : 'text-white/40'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl px-10 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#6b54e5] focus:ring-2 focus:ring-[#6b54e5]/30 transition border ${password ? 'bg-[#22174a]/70 border-[#6b54e5]/50 shadow-[0_0_0_1px_rgba(107,84,229,0.4)]' : 'bg-white/5 border-white/15'}`}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group w-full relative overflow-hidden rounded-xl py-3 font-medium tracking-wide text-white bg-gradient-to-r from-[#3d2a8f] to-[#6b54e5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6b54e5]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition shadow-sm hover:shadow-[#6b54e5]/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="relative z-10">Entrar</span>
              <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={navigation.navigateToRegister}
              type="button"
              className="text-sm font-medium text-[#6b54e5] hover:text-white transition-colors"
            >
              Ainda não tem conta? <span className="underline decoration-[#6b54e5] underline-offset-4">Cadastre-se</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}