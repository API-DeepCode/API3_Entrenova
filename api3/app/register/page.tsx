"use client";
import React, { useState } from 'react';
import { addResponse } from '@/app/lib/firestoreService'; 
import styles from '../../components/globals/CadastroForm.module.css';
import { useNavigation } from '@/hooks/useNavigation'; 
import { User } from '@/lib/type';

const CadastroForm: React.FC = () => {
  const { navigateToPlans } = useNavigation(); //

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
      const dadosParaFirestore = {
        nome_empresa: formData.nome_empresa,
        cnpj: formData.cnpj,
        email_contato: formData.email_contato,
        telefone_contato: formData.telefone_contato,
        nome_responsavel: formData.nome_responsavel,
        cargo_responsavel: formData.cargo_responsavel,
        cidade: formData.cidade,
        senha: formData.senha,
      };

      await addResponse('Id_Usuario', dadosParaFirestore);

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
      
      navigateToPlans();

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
            placeholder="Cidade/Estado da Empresa"
            value={formData.cidade}
            onChange={handleChange}
            className={styles['form-input']}
          />

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

export default CadastroForm; //