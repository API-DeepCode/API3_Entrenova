"use client";

// Função para recuperar os dados de uma parte específica do formulário
export const getFormData = (part: number): Partial<FormData> | null => {
    try {
        const data = localStorage.getItem(`form_part${part}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Erro ao recuperar dados da parte ${part}:`, error);
        return null;
    }
};

// Função para recuperar todos os dados do formulário
export const getCompleteFormData = (): FormData => {
    try {
        // Tenta recuperar dados completos primeiro
        const complete = localStorage.getItem('form_complete');
        if (complete) {
            return JSON.parse(complete);
        }

        // Se não existir, combina todas as partes
        const part1 = getFormData(1) || {};
        const part2 = getFormData(2) || {};
        const part3 = getFormData(3) || {};
        const part4 = getFormData(4) || {};

        const completeData = {
            ...part1,
            ...part2,
            ...part3,
            ...part4
        };

        // Salva dados completos para uso futuro
        localStorage.setItem('form_complete', JSON.stringify(completeData));
        return completeData;
    } catch (error) {
        console.error('Erro ao recuperar dados completos:', error);
        return {} as FormData;
    }
};

// Analisa as respostas do formulário e retorna pontos fortes e fracos.
export function analyzeForm(
    questionsByDimension: Record<string, { question: string; options: string[] }[]>,
    answers: Record<string, string | string[]>
): {
    strengths: { question: string; answer: string; score: number }[];
    weaknesses: { question: string; answer: string; score: number }[];
} {
    const strengths: { question: string; answer: string; score: number }[] = [];
    const weaknesses: { question: string; answer: string; score: number }[] = [];

    Object.values(questionsByDimension).forEach((questions) => {
        questions.forEach((q) => {
            const userAnswer = answers[q.question];
            if (!userAnswer || !Array.isArray(q.options) || q.options.length < 2) return;

            if (typeof userAnswer === "string" && q.options.length >= 2) {
                const idx = q.options.findIndex(opt => opt === userAnswer);
                if (idx !== -1) {
                    const score = 4 - idx;
                    if (score >= 3) {
                        strengths.push({ question: q.question, answer: userAnswer, score });
                    } else {
                        weaknesses.push({ question: q.question, answer: userAnswer, score });
                    }
                }
            }
        });
    });
    return { strengths, weaknesses };
}

interface FormData {
    // Parte 1
    num_colaboradores?: string;
    porte?: string;
    localizacao?: string;
    setor?: string;

    // Parte 2
    desafios_equipe?: string[];
    resultados_esperados?: string[];

    // Parte 3
    comunicacao?: string;
    estilo_lideranca?: string;
    resolucao_problemas?: string;
    rotina_trabalho?: string;
    valores_presentes?: string;
    clareza_funcoes?: number;
    avaliacao_comunicacao?: number;
    reacao_erros?: string;
    colaboracao_equipes?: number;
    motivacao?: string;
    resolucao_conflitos?: string;
    troca_info?: string;
    delegacao?: string;
    falha_processos?: string;
    autonomia?: string;
    qualidade?: string;
    ferramentas?: string;
    treinamentos?: number;
    priorizacao?: string;
    decisoes_internas?: number;
    decisao_simples?: string;
    processos_eficiencia?: number;
    responsabilidade_entregas?: string;

    // Parte 4
    invest?: string;
    tipo_trein?: string;
    treina_contra?: string;
    importante_desenvolvimento?: number;
    importante_softskills?: number;
    importante_cah?: number;
    importante_impacto?: number;
    projeto_inov?: boolean;
    abertura?: number;
}

export const saveFormData = (part: number, data: Partial<FormData>) => {
    try {
        // Salva os dados da parte específica
        localStorage.setItem(`form_part${part}`, JSON.stringify(data));

        // Recalcula os dados completos a partir das partes atuais
        const recomposed = getCompleteFormData();

        // Mescla os dados recém-salvos (data) sobre os dados recompostos
        const merged = { ...recomposed, ...data };

        // Persiste o conjunto completo atualizado
        localStorage.setItem('form_complete', JSON.stringify(merged));

        console.log(`Parte ${part} salva com sucesso`, merged);
        return merged;
    } catch (error) {
        console.error('Erro ao recuperar dados completos:', error);
        return {} as FormData;
    }
};

export const clearFormData = () => {
    try {
        localStorage.removeItem('form_part1');
        localStorage.removeItem('form_part2');
        localStorage.removeItem('form_part3');
        localStorage.removeItem('form_part4');
        localStorage.removeItem('form_complete');
        console.log('Dados do formulário limpos com sucesso');
        return true;
    } catch (error) {
        console.error('Erro ao limpar dados do formulário:', error);
        return false;
    }
};