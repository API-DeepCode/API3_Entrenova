"use client";

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
        
        // Atualiza os dados completos
        const completeData = getCompleteFormData();
        localStorage.setItem('form_complete', JSON.stringify({
            ...completeData,
            ...data
        }));
        
        console.log(`Parte ${part} salva com sucesso`);
        return true;
    } catch (error) {
        console.error('Erro ao salvar dados do formulário:', error);
        return false;
    }
};

export const getFormData = (part: number): Partial<FormData> | null => {
    try {
        const data = localStorage.getItem(`form_part${part}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Erro ao recuperar dados da parte ${part}:`, error);
        return null;
    }
};

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