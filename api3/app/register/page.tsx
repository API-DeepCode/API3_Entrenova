"use client";
import React, { useState } from 'react';
import { cadastrarUsuario } from '@/app/lib/firebaseService'; 
import styles from '../../components/globals/CadastroForm.module.css';
import { useNavigation } from '@/hooks/useNavigation'; 
import { User } from '@/lib/type';
import { Eye, EyeOff } from "lucide-react";

export default function CadastroForm(){
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const { navigateToLandingPage } = useNavigation();

  const [formData, setFormData] = useState<User>({
    cargo_responsavel: "",
    cidade: "",
    cnpj: "",
    email_contato: "",
    nome_empresa: "",
    nome_responsavel: "",
    senha: "",
    telefone_contato: ""
  });

  const [erro, setErro] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (erro) setErro('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const camposObrigatorios = [
      formData.nome_empresa,
      formData.cnpj,
      formData.email_contato,
      formData.telefone_contato,
      formData.nome_responsavel,
      formData.cargo_responsavel,
      formData.cidade,
      formData.senha,
    ];

    const camposVazios = camposObrigatorios.some(campo => !campo.trim());

    if (camposVazios) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setErro('');

    try {
      await cadastrarUsuario(formData);

      alert('Cadastro realizado com sucesso!');

      setFormData({
        nome_responsavel: '',
        cnpj: '',
        email_contato: '',
        telefone_contato: '',
        nome_empresa: '',
        cargo_responsavel: '',
        cidade: '',
        senha: ""
      });
      
      // Isso aqui deve ser corrigido, pois ele está voltando para a landingPage
      // Deveria retornar para a tela do dashBoard que no momento ainda está sendo desenvolvida
      navigateToLandingPage();

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErro('Erro ao realizar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div className={styles['cadastro-page-wrapper']}>

      <div className={styles['cadastro-form-container']}>
        <div className={styles['cadastro-header']}>
          <span className={styles['header-line']}></span>
          <h1 className={styles['cadastro-title']}>Cadastro de Empresa</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles['cadastro-form']}>
          <input
            type="text"
            name="nome_empresa"
            placeholder="Nome da Empresa"
            value={formData.nome_empresa}
            onChange={handleChange}
            className={styles['form-input']}
          />

          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="email"
            name="email_contato"
            placeholder="E-mail"
            value={formData.email_contato}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="tel"
            name="telefone_contato"
            placeholder="Telefone"
            value={formData.telefone_contato}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="text"
            name="nome_responsavel"
            placeholder="Nome do Responsável"
            value={formData.nome_responsavel}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="text"
            name="cargo_responsavel"
            placeholder="Cargo/Função do Responsável"
            value={formData.cargo_responsavel}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade da Empresa"
            value={formData.cidade}
            onChange={handleChange}
            className={styles['form-input']}
          />

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              value={formData.senha}
              name='senha'
              onChange={handleChange}
              placeholder="Digite sua senha"
              className={styles['form-input']}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Campo Confirmar Senha */}
          <div className="relative">
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
              className={styles['form-input']}
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && <p className={styles['error-text']}>{erro}</p>}

          <button type="submit" className={styles['button-primary']}>
            Cadastrar
          </button>

          <p className={styles['login-link']}>
            Já tem um cadastro? <a href="#" className={styles['link-secondary']}>Voltar</a>
          </p>
        </form>
      </div>
    </div>
  );
};