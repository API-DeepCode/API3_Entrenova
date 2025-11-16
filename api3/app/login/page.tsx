"use client"

import { use, useState } from 'react';
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
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <Header/>

      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(75,0,255,0.37)] border border-white/20">
          <h1 className="text-3xl text-center mb-2 bg-linear-to-r from-[#FF7FE5] to-[#FFA3E8] bg-clip-text text-transparent">
            Bem-vindo de volta!
          </h1>
          <p className="text-center text-white/70 mb-8">
            Entre com suas credenciais
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/90 mb-2 text-sm">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF7FE5]/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF7FE5] focus:ring-2 focus:ring-[#FF7FE5]/20 transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF7FE5]/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF7FE5] focus:ring-2 focus:ring-[#FF7FE5]/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-[#FF7FE5] to-[#FFA3E8] rounded-xl text-white hover:shadow-[0_0_25px_rgba(255,127,229,0.6)] transition-all duration-300 transform hover:scale-[1.02] mt-6"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={navigation.navigateToRegister}
              className="text-[#FFA3E8] hover:text-white transition-colors text-sm"
            >
              Ainda não tem conta? <span className="underline">Cadastre-se</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}