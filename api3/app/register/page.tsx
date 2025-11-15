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
    <>
      <Header user={null} onLogout={() => {}} />

      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-[0_8px_32px_rgba(75,0,255,0.37)]">

            <h1 className="text-3xl text-center mb-2 bg-linear-to-r from-[#FF7FE5] to-[#FFA3E8] bg-clip-text text-transparent">
              Crie sua conta
            </h1>

            <form onSubmit={handleRegister} className="space-y-5">

              <InputField icon={<Building />} name="nome_empresa" value={formData.nome_empresa} placeholder="Nome da empresa" onChange={handleChange} />

              <InputField icon={<FileText />} name="cnpj" value={formData.cnpj} placeholder="CNPJ" onChange={handleChange} />

              <InputField icon={<Mail />} name="email_contato" type="email" value={formData.email_contato} placeholder="E-mail corporativo" onChange={handleChange} />

              <InputField icon={<Phone />} name="telefone_contato" type="tel" value={formData.telefone_contato} placeholder="Telefone" onChange={handleChange} />

              <InputField icon={<UserCircle />} name="nome_responsavel" value={formData.nome_responsavel} placeholder="Nome do responsável" onChange={handleChange} />

              {/* SELECT estilizado */}
              <SelectField icon={<UserCircle />} name="cargo_responsavel" value={formData.cargo_responsavel} onChange={handleChange}>
                <option value="" disabled>Selecione o cargo</option>
                <option value="Gestor">Gestor</option>
                <option value="Funcionario">Funcionário</option>
              </SelectField>

              <InputField icon={<UserCircle />} name="cidade" value={formData.cidade} placeholder="Cidade" onChange={handleChange} />

              <PasswordField label="Senha" name="senha" value={formData.senha} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} />

              <PasswordField label="Confirmar senha" name="confirmarSenha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} showPassword={showConfirm} setShowPassword={setShowConfirm} />

              <button type="submit" className="w-full py-3 bg-linear-to-r from-[#FF7FE5] to-[#FFA3E8] rounded-xl text-white font-medium hover:scale-[1.02] transition-all">
                Registrar
              </button>

              <button type="button" onClick={navigate.navigateToLogin} className="w-full py-3 bg-white/5 border border-white/30 rounded-xl text-[#FFA3E8]">
                Já tenho conta
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}