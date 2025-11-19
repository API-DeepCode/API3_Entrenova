"use client";

import { useState } from "react";
import { Building, FileText, Mail, Phone, UserCircle } from "lucide-react";

import { Header } from "@/components/globals/Header";
import { useNavigation } from "@/hooks/useNavigation";
import { cadastrarUsuario } from "../lib/firebaseService";
import { User } from "@/lib/type";

import { InputField } from "@/components/register/InputField";
import { PasswordField } from "@/components/register/PasswordField";
import { SelectField } from "@/components/register/SelectField";

export default function RegisterPage() {
  const navigate = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState<User>({
    nome_empresa: "",
    cnpj: "",
    email_contato: "",
    telefone_contato: "",
    nome_responsavel: "",
    cargo_responsavel: "Gestao",
    cidade: "",
    senha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const userId = await cadastrarUsuario(formData);
      alert(`Usuário cadastrado com sucesso! ID: ${userId}`);
      navigate.navigateToLogin();
    } catch (err) {
      alert("Erro ao cadastrar usuário!");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b031f] via-[#2b1364] to-[#050013] text-foreground overflow-hidden">
      {/* Glows de fundo – mesmo estilo das páginas de planos/dashboard/formulário */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#ec4899]/25 via-[#a855f7]/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#4f46e5]/30 via-[#22d3ee]/10 to-transparent blur-3xl" />
      </div>

      <Header user={null} onLogout={() => {}} />

      <main className="flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl p-8 md:p-10 border border-white/15 bg-black/35 backdrop-blur-xl shadow-[0_0_1px_1px_rgba(255,255,255,0.08),0_18px_55px_rgba(0,0,0,0.8)]">
            <div className="space-y-3 text-center mb-6">
              <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-[#3d2a8f] to-[#6b54e5] bg-clip-text text-transparent">
                Crie sua conta
              </h1>
              <p className="text-sm text-white/70">
                Preencha os dados para começar
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <InputField
                icon={<Building />}
                name="nome_empresa"
                value={formData.nome_empresa}
                placeholder="Nome da empresa"
                onChange={handleChange}
              />

              <InputField
                icon={<FileText />}
                name="cnpj"
                value={formData.cnpj}
                placeholder="CNPJ"
                onChange={handleChange}
              />

              <InputField
                icon={<Mail />}
                name="email_contato"
                type="email"
                value={formData.email_contato}
                placeholder="E-mail corporativo"
                onChange={handleChange}
              />

              <InputField
                icon={<Phone />}
                name="telefone_contato"
                type="tel"
                value={formData.telefone_contato}
                placeholder="Telefone"
                onChange={handleChange}
              />

              <InputField
                icon={<UserCircle />}
                name="nome_responsavel"
                value={formData.nome_responsavel}
                placeholder="Nome do responsável"
                onChange={handleChange}
              />

              <SelectField
                icon={<UserCircle />}
                name="cargo_responsavel"
                value={formData.cargo_responsavel}
                options={["Gestor", "Funcionario"]}
                placeholder="Selecione o cargo"
                onChange={(valor, nome) =>
                  setFormData(prev => ({ ...prev, [nome]: valor }))
                }
              />

              <InputField
                icon={<UserCircle />}
                name="cidade"
                value={formData.cidade}
                placeholder="Cidade"
                onChange={handleChange}
              />

              <PasswordField
                label="Senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <PasswordField
                label="Confirmar senha"
                name="confirmarSenha"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                showPassword={showConfirm}
                setShowPassword={setShowConfirm}
              />

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="group w-full relative overflow-hidden rounded-xl py-3 font-medium tracking-wide text-white bg-gradient-to-r from-[#3d2a8f] to-[#6b54e5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6b54e5]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition shadow-sm hover:shadow-[#6b54e5]/30 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="relative z-10">Registrar</span>
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition"
                  />
                </button>

                <button
                  type="button"
                  onClick={navigate.navigateToLogin}
                  className="w-full py-3 rounded-xl font-medium text-sm text-[#6b54e5] border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Já tenho conta
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
