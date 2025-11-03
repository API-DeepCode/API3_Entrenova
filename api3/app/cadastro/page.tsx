"use client";
import React, { useState } from 'react';
import { addResponse } from '@/app/lib/firestoreService'; 
import styles from '../../components/globals/CadastroForm.module.css';
import { useNavigation } from '@/hooks/useNavigation'; 

interface CadastroData {
  nomeEmpresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  nomeResponsavel: string;
  cargoResponsavel: string;
  cidadeEstado: string;
}

const CadastroForm: React.FC = () => {
  const { navigateToPlans } = useNavigation(); //

  const [formData, setFormData] = useState<CadastroData>({
    nomeEmpresa: '',
    cnpj: '',
    email: '',
    telefone: '',
    nomeResponsavel: '',
    cargoResponsavel: '',
    cidadeEstado: '',
  });

  const [erro, setErro] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (erro) setErro('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const camposObrigatorios = [
      formData.nomeEmpresa,
      formData.cnpj,
      formData.email,
      formData.telefone,
      formData.nomeResponsavel,
      formData.cargoResponsavel,
      formData.cidadeEstado
    ];

    const camposVazios = camposObrigatorios.some(campo => !campo.trim());

    if (camposVazios) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setErro('');

    try {
      const dadosParaFirestore = {
        nome_empresa: formData.nomeEmpresa,
        cnpj: formData.cnpj,
        email_contato: formData.email,
        telefone_contato: formData.telefone,
        nome_responsavel: formData.nomeResponsavel,
        cargo_responsavel: formData.cargoResponsavel,
        cidade: formData.cidadeEstado
      };

      await addResponse('Id_Usuario', dadosParaFirestore);

      alert('Cadastro realizado com sucesso!');

      setFormData({
        nomeEmpresa: '',
        cnpj: '',
        email: '',
        telefone: '',
        nomeResponsavel: '',
        cargoResponsavel: '',
        cidadeEstado: ''
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
            name="nomeEmpresa"
            placeholder="Nome da Empresa"
            value={formData.nomeEmpresa}
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
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="text"
            name="nomeResponsavel"
            placeholder="Nome do Responsável"
            value={formData.nomeResponsavel}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="text"
            name="cargoResponsavel"
            placeholder="Cargo/Função do Responsável"
            value={formData.cargoResponsavel}
            onChange={handleChange}
            className={styles['form-input']}
          />
          <input
            type="text"
            name="cidadeEstado"
            placeholder="Cidade/Estado da Empresa"
            value={formData.cidadeEstado}
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