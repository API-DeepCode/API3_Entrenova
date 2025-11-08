"use client";

import { useState } from "react";
import {
  Mail,
  Building,
  FileText,
  Phone,
  UserCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Header } from "@/components/globals/Header";
import { useNavigation } from "@/hooks/useNavigation";
import { cadastrarUsuario } from "../lib/firebaseService";
import { User } from "@/lib/type";

export default function RegisterPage() {
  const navigate = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Inicialize *todos* os campos com string vazia para evitar input uncontrolled -> controlled
  const [formData, setFormData] = useState<User>({
    nome_empresa: "",
    cnpj: "",
    email_contato: "",
    telefone_contato: "",
    nome_responsavel: "",
    cargo_responsavel: "",
    cidade: "",
    senha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Criamos um payload plano (cópia) — garantimos que não haja funções ali
      const payload: User = { ...formData };

      console.log("Payload para cadastro:", payload, "tipo:", typeof payload);

      // chama a função que grava no Firestore
      const userId = await cadastrarUsuario(payload);

      alert(`Usuário cadastrado com sucesso! ID: ${userId}`);
      navigate.navigateToLogin();
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      // Se for erro do Firestore, log completo ajuda a entender:
      alert("Erro ao cadastrar. Verifique o console para mais detalhes.");
    }
  };

  return (
    <>
      <Header user={null} onLogout={() => {}} />

      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(75,0,255,0.37)] border border-white/20">
            <h1 className="text-3xl text-center mb-2 bg-linear-to-r from-[#FF7FE5] to-[#FFA3E8] bg-clip-text text-transparent">
              Crie sua conta
            </h1>
            <p className="text-center text-white/70 mb-8">
              Preencha seus dados para se registrar
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Nome da empresa */}
              <InputField
                icon={<Building />}
                name="nome_empresa"
                value={formData.nome_empresa}
                onChange={handleChange}
                placeholder="Nome da empresa"
              />

              {/* CNPJ */}
              <InputField
                icon={<FileText />}
                name="cnpj"
                value={(formData as any).cnpj ?? ""}
                onChange={handleChange}
                placeholder="CNPJ"
              />

              {/* E-mail */}
              <InputField
                icon={<Mail />}
                name="email_contato"
                type="email"
                value={formData.email_contato}
                onChange={handleChange}
                placeholder="E-mail corporativo"
              />

              {/* Telefone */}
              <InputField
                icon={<Phone />}
                name="telefone_contato"
                type="tel"
                value={formData.telefone_contato}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />

              {/* Nome do responsável */}
              <InputField
                icon={<UserCircle />}
                name="nome_responsavel"
                value={formData.nome_responsavel}
                onChange={handleChange}
                placeholder="Nome do responsável"
              />

              {/* Cargo / Função */}
              <InputField
                icon={<UserCircle />}
                name="cargo_responsavel"
                value={formData.cargo_responsavel}
                onChange={handleChange}
                placeholder="Cargo / Função"
              />

              {/* Cidade */}
              <InputField
                icon={<UserCircle />}
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />

              {/* Senha */}
              <PasswordField
                label="Senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              {/* Confirmar senha (estado separado) */}
              <PasswordField
                label="Confirmar senha"
                name="confirmarSenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                showPassword={showConfirm}
                setShowPassword={setShowConfirm}
                isConfirm
              />

              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-[#FF7FE5] to-[#FFA3E8] rounded-xl text-white font-medium hover:shadow-[0_0_25px_rgba(255,127,229,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
              >
                Registrar
              </button>

              <button
                type="button"
                onClick={() => navigate.navigateToLogin()}
                className="w-full py-3 bg-white/5 border border-white/30 rounded-xl text-[#FFA3E8] hover:bg-white/10 transition-all duration-300"
              >
                Já tenho conta
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================
// COMPONENTES REUTILIZÁVEIS
// ============================

type InputFieldProps = {
  icon: React.ReactNode;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

function InputField({
  icon,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF7FE5]/50">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-white/5 border border-white/30 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF7FE5] focus:ring-2 focus:ring-[#FF7FE5]/20"
      />
    </div>
  );
}

type PasswordFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isConfirm?: boolean;
};

function PasswordField({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
  isConfirm = false,
}: PasswordFieldProps) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF7FE5]/50" />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={label}
        required
        className="w-full bg-white/5 border border-white/30 rounded-xl px-10 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#FF7FE5] focus:ring-2 focus:ring-[#FF7FE5]/20"
        // evita o ícone de mostra/oculta nativo do navegador (adicional)
        autoComplete={isConfirm ? "new-password" : "new-password"}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF7FE5]/70 hover:text-[#FF7FE5]"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}