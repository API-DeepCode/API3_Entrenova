export interface FormsQuestions{
    question: string;
    options: string[];
    outro: boolean;
    type: "default" | "multiple" | "slider" | "open";
}

export interface DimensionQuestions extends FormsQuestions{
    dimension: "Pessoas e Cultura" | "Estrutura e Operações" | "Mercado e Clientes" | "Direção e Futuro";
}

export interface User{
    cargo_responsavel: string;
    cidade: string;
    cnpj: string;
    email_contato: string;
    nome_empresa: string;
    nome_responsavel: string;
    senha: string;
    telefone_contato: string;
}