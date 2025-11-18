// src/conversas.ts

type Opcao = {
    texto: string;
    proximoId: string;
    tipo?: 'primaria' | 'secundaria'; // permite hierarquia visual
};

type Cta = {
    label: string;
    action: 'agendar_demo' | 'ver_planos' | 'contato';
    destaque?: boolean;
};

type EtapaConversa = {
    pergunta: string;
    opcoes: Opcao[];
    categoria?: 'Introducao' | 'Teste' | 'Dimensoes' | 'Relatorio' | 'Empresas' | 'Trilhas' | 'Planos' | 'Conversao' | 'Encerramento';
    cta?: Cta; // ação de conversão contextual
};

export const ROTEIRO_CONVERSA: Record<string, EtapaConversa> = {
    INICIO: {
        pergunta: "👋 Bem-vindo(a)! Vamos acelerar o desenvolvimento da sua equipe. Escolha um assunto para começar:",
        categoria: 'Introducao',
        opcoes: [
            { texto: "Como funciona o teste?", proximoId: "TESTE", tipo: 'primaria' },
            { texto: "O que são as dimensões?", proximoId: "DIMENSOES" },
            { texto: "Sobre o relatório final", proximoId: "RELATORIO" },
            { texto: "Trilhas de aprendizagem", proximoId: "TRILHAS" },
        ],
        cta: { label: 'Agendar demonstração', action: 'agendar_demo' }
    },

    TESTE: {
        pergunta: "🧠 Nosso teste identifica competências e estilos comportamentais em 10–15 minutos. Ele gera insights acionáveis para decisões de desenvolvimento e cultura.",
        categoria: 'Teste',
        opcoes: [
            { texto: "Quais resultados recebo?", proximoId: "RELATORIO", tipo: 'primaria' },
            { texto: "Aplicar na minha empresa", proximoId: "EMPRESAS" },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
    },

    DIMENSOES: {
        pergunta: "📊 Avaliamos dimensões como Liderança, Colaboração, Inovação e Foco em Resultados para mapear forças e lacunas.",
        categoria: 'Dimensoes',
        opcoes: [
            { texto: "Exemplo prático", proximoId: "EXEMPLO_DIMENSAO" },
            { texto: "Quero saber sobre o relatório", proximoId: "RELATORIO" },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
    },

    EXEMPLO_DIMENSAO: {
        pergunta: "💡 Ex.: 'Liderança' observa iniciativa e decisão; 'Colaboração' mede sinergia com perfis diversos.",
        categoria: 'Dimensoes',
        opcoes: [
            { texto: "Isso aparece no relatório?", proximoId: "RELATORIO" },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
    },

    RELATORIO: {
        pergunta: "📄 Gerado automaticamente: análises comparativas, gráficos e recomendações organizadas por dimensão. Acesso direto na plataforma ou e-mail.",
        categoria: 'Relatorio',
        opcoes: [
            { texto: "Aplicar teste na equipe", proximoId: "EMPRESAS", tipo: 'primaria' },
            { texto: "Ver trilhas", proximoId: "TRILHAS" },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
        cta: { label: 'Ver exemplo de relatório', action: 'ver_planos' }
    },

    EMPRESAS: {
        pergunta: "🏢 Cadastre colaboradores, acompanhe resultados em tempo real e consolide métricas de engajamento e evolução.",
        categoria: 'Empresas',
        opcoes: [
            { texto: "Ver trilhas de desenvolvimento", proximoId: "TRILHAS" },
            { texto: "Quero uma demonstração", proximoId: "DEMO", tipo: 'primaria' },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
        cta: { label: 'Solicitar proposta', action: 'contato', destaque: true }
    },

    TRILHAS: {
        pergunta: "🎯 Trilhas = sequências personalizadas de conteúdo alinhadas às lacunas detectadas no teste.",
        categoria: 'Trilhas',
        opcoes: [
            { texto: "Ver planos", proximoId: "PLANOS" },
            { texto: "Personalizar trilha", proximoId: "PERSONALIZAR", tipo: 'primaria' },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
    },

    PLANOS: {
        pergunta: "💼 Planos: Essencial (equipes pequenas), Profissional (comparativos e dashboards), Corporativo (personalização e integrações).",
        categoria: 'Planos',
        opcoes: [
            { texto: "Diferenças entre planos", proximoId: "DIFERENCA_PLANOS" },
            { texto: "Contratar / Demonstração", proximoId: "DEMO", tipo: 'primaria' },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
        cta: { label: 'Comparar planos', action: 'ver_planos' }
    },

    DIFERENCA_PLANOS: {
        pergunta: "🔍 Essencial: base sólida. Profissional: métricas em tempo real. Corporativo: customização e integrações avançadas.",
        categoria: 'Planos',
        opcoes: [
            { texto: "Solicitar proposta", proximoId: "DEMO", tipo: 'primaria' },
            { texto: "Voltar aos planos", proximoId: "PLANOS" },
        ],
    },

    PERSONALIZAR: {
        pergunta: "⚙️ Personalize competências, ordem de aprendizagem e integre conteúdos internos.",
        categoria: 'Trilhas',
        opcoes: [
            { texto: "Solicitar demonstração", proximoId: "DEMO", tipo: 'primaria' },
            { texto: "Ver planos", proximoId: "PLANOS" },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
    },

    DEMO: {
        pergunta: "📅 Agende uma demonstração e veja casos práticos de evolução de equipes.",
        categoria: 'Conversao',
        opcoes: [
            { texto: "Agendar agora", proximoId: "ENCERRAMENTO_SUCESSO", tipo: 'primaria' },
            { texto: "Voltar", proximoId: "INICIO" },
        ],
        cta: { label: 'Agendar demonstração', action: 'agendar_demo', destaque: true }
    },

    ENCERRAMENTO_SUCESSO: {
        pergunta: "✨ Obrigado! Pronto para dar o próximo passo? Estou à disposição para continuar quando quiser.",
        categoria: 'Encerramento',
        opcoes: [],
        cta: { label: 'Retornar ao início', action: 'ver_planos' }
    },
};
