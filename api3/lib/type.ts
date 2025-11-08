export interface FormsQuestions{
    question: string;
    options: string[];
    outro: boolean;
    type: "default" | "multiple" | "slider" | "open";
}

export interface User{
    nome_empresa: string;
    cnpj: number;
    email: string;
    telefone: string;
    nome_responsavel: string;
    funcao_responsavel: string;
    cidade: string;
    estado: string;
    senha: string;
}