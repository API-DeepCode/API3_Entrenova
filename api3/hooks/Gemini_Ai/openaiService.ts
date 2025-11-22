type PerguntaResposta = {
    pergunta: string;
    resposta: string | number | null;
};

export async function gerarRelatorioOpenAI(perguntasERespostas: PerguntaResposta[]) {
    console.log("--- Iniciando gerarRelatorioOpenAI ---");
    // Aceita várias variantes de nome de variável de ambiente para maior tolerância
    const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_AI_KEY || process.env.OPENAI_KEY || process.env.OPEN_AI;

    if (!apiKey) {
        console.error("!!! ERRO CRÍTICO: Variável de ambiente OPENAI_API_KEY (ou equivalente) não está definida!");
        throw new Error("Variável de ambiente OPENAI_API_KEY (ou equivalente) não está definida!");
    }

    if (!Array.isArray(perguntasERespostas) || perguntasERespostas.length === 0) {
      console.error("!!! ERRO INTERNO: 'perguntasERespostas' está vazia ou não é uma array válida em gerarRelatorioOpenAI!");
      throw new Error("Dados de entrada inválidos para gerar o relatório.");
    }

    const textoBase = perguntasERespostas
        .map(
            (item, i) =>
                `Pergunta ${i + 1}: ${item.pergunta}\nResposta: ${item.resposta ?? 'Não informado'}\n`
        )
        .join("\n");

    // Mapeamento das perguntas da Parte 3 (Mini-Diagnóstico) — usado para calcular score
    const part3QuestionMap: Record<string, { dimension: string; options?: string[]; type?: 'default' | 'slider' | 'open' }> = {
        // Pessoas e Cultura
        "Como a comunicação acontece no dia a dia?": { dimension: 'Pessoas e Cultura', options: ["Todos têm clareza e acesso fácil às informações", "Funciona na maior parte do tempo, mas com algumas falhas", "Normalmente só em reuniões formais ou quando há problemas", "É confusa, cada líder comunica de um jeito"], type: 'default' },
        "Como você descreveria o estilo de liderança predominante?": { dimension: 'Pessoas e Cultura', options: ["Engajam e dão autonomia", "São bons, mas variam conforme o líder", "Centralizam muito as decisões", "Raramente exercem liderança ativa"], type: 'default' },
        "Quando surgem problemas, como os times costumam agir?": { dimension: 'Pessoas e Cultura', options: ["Trazem ideias e resolvem juntos", "Resolvem, mas de forma reativa", "Dependem sempre do gestor para decidir", "Evitam mudanças e preferem manter como está"], type: 'default' },
        "Como está organizada a rotina de trabalho?": { dimension: 'Pessoas e Cultura', options: ["Papéis e prioridades são claros", "Há certa clareza, mas faltam recursos ou prazos realistas", "Muitas vezes é confusa, com foco em “apagar incêndios”", "Não há organização definida, cada um faz do seu jeito"], type: 'default' },
        "Até que ponto os valores da empresa estão presentes no dia a dia?": { dimension: 'Pessoas e Cultura', options: ["Claros e vividos na prática", "Conhecidos, mas pouco aplicados", "Quase não são lembrados, só em discursos", "Não há clareza sobre os valores"], type: 'default' },
        "De 0 a 5, quão claras estão as funções e responsabilidades de cada pessoa da equipe?": { dimension: 'Pessoas e Cultura', type: 'slider' },
        "De 0 a 5, como você avalia a comunicação entre líderes e equipes?": { dimension: 'Pessoas e Cultura', type: 'slider' },
        "De 0 a 5, como você avalia a colaboração entre diferentes equipes ou áreas? (explique em 1 frase, se quiser)": { dimension: 'Pessoas e Cultura', type: 'slider' },

        // Estrutura e Operações
        "Como é a troca de informações entre áreas?": { dimension: 'Estrutura e Operações', options: ["Integrada e frequente", "Funciona em parte, com alguns ruídos", "Depende de reuniões formais", "As áreas trabalham isoladas"], type: 'default' },
        "Como os gestores lidam com delegação?": { dimension: 'Estrutura e Operações', options: ["Delegam com clareza e confiança", "Delegam, mas acompanham em excesso", "Raramente delegam", "Não delegam, concentram tudo"], type: 'default' },
        "Quando processos falham, o que acontece?": { dimension: 'Estrutura e Operações', options: ["As equipes propõem melhorias rapidamente", "Há ajustes, mas com demora", "Só a gestão revisa processos", "Nada muda, seguimos com os problemas"], type: 'default' },
        "Quanta autonomia operacional os colaboradores têm?": { dimension: 'Estrutura e Operações', options: ["Alta, com responsabilidade", "Alguma, mas dependem de aprovações", "Pouca, com muito controle", "Nenhuma, tudo vem da gestão"], type: 'default' },
        "De 0 a 5, os treinamentos oferecidos pela empresa atendem às reais necessidades do trabalho?": { dimension: 'Estrutura e Operações', type: 'slider' },
        "De 0 a 5, como você avalia a qualidade e a agilidade das decisões internas?": { dimension: 'Estrutura e Operações', type: 'slider' },
        "De 0 a 5, os processos atuais contribuem para eficiência e produtividade? (explique em 1 frase)": { dimension: 'Estrutura e Operações', type: 'slider' },

        // Mercado e Clientes
        "Como a empresa ouve seus clientes?": { dimension: 'Mercado e Clientes', options: ["Temos pesquisa estruturada e contínua", "Fazemos de forma ocasional", "Reagimos só em reclamações", "Não há escuta formal"], type: 'default' },
        "Como vendas e atendimento trabalham juntos?": { dimension: 'Mercado e Clientes', options: ["Colaboram e compartilham informações", "Trocam parcialmente, com falhas", "Atuam isolados, sem integração", "Há conflitos ou competição entre áreas"], type: 'default' },
        "De 0 a 5, como você avalia a capacidade da empresa de se adaptar a mudanças externas?": { dimension: 'Mercado e Clientes', type: 'slider' },
        "De 0 a 5, a empresa costuma ouvir e aplicar feedback de clientes?": { dimension: 'Mercado e Clientes', type: 'slider' },
        "De 0 a 5, como você avalia a capacidade da empresa de inovar em produtos ou serviços?": { dimension: 'Mercado e Clientes', type: 'slider' },

        // Direção e Futuro
        "Como a visão de futuro é comunicada?": { dimension: 'Direção e Futuro', options: ["Todos conhecem e entendem", "É conhecida, mas só pela gestão", "Quase não é falada", "Não é comunicada"], type: 'default' },
        "Como os líderes conectam pessoas à estratégia?": { dimension: 'Direção e Futuro', options: ["Inspiram e alinham metas claramente", "Tentam alinhar, mas varia muito", "Há pouca conexão", "Não há esforço de alinhamento"], type: 'default' },
        "De 0 a 5, os colaboradores conhecem e entendem a visão de futuro da empresa?": { dimension: 'Direção e Futuro', type: 'slider' },
        "De 0 a 5, como você avalia a preparação e desenvolvimento de novos líderes?": { dimension: 'Direção e Futuro', type: 'slider' },
        "De 0 a 5, a empresa tem metas estratégicas claras e compartilhadas com todos?": { dimension: 'Direção e Futuro', type: 'slider' }
    };

    // Detecta respostas da Parte 3 com peso < 3 (exclui respostas open text)
    const weaknesses: { dimension: string; pergunta: string; resposta: string | number | null; score: number; motivo: string }[] = [];

    const normalize = (s: any) => {
        if (s === null || s === undefined) return "";
        const str = String(s);
        // substitui aspas curvas, normaliza acentos e remove pontuação excessiva
        return str
            .replace(/[“”„‟]/g, '"')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[\u2018\u2019']/g, "'")
            .replace(/[^\p{L}\p{N}\s]/gu, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    };

    const compact = (s: string) => s.replace(/[^a-z0-9]/g, '');

    const findOptionIndexTolerant = (options: string[], answer: string) => {
        const nAns = normalize(answer);
        if (!nAns) return -1;
        for (let i = 0; i < options.length; i++) {
            const opt = options[i] ?? '';
            const nOpt = normalize(opt);
            if (nAns === nOpt) return i;
            if (nOpt.includes(nAns) && nAns.length > 2) return i;
            if (nAns.includes(nOpt) && nOpt.length > 2) return i;
            if (compact(nOpt) === compact(nAns) && compact(nOpt).length > 0) return i;
            // Checar sobreposição mínima de palavras (reduz false positives)
            const optWords = nOpt.split(' ').filter(Boolean);
            const ansWords = nAns.split(' ').filter(Boolean);
            const common = optWords.filter(w => ansWords.includes(w));
            if (common.length >= Math.max(1, Math.floor(optWords.length / 2))) return i;
        }
        return -1;
    };

    perguntasERespostas.forEach(item => {
        const meta = part3QuestionMap[item.pergunta];
        if (!meta) return; // processa somente perguntas da Parte 3

        if (meta.type === 'slider') {
            const val = typeof item.resposta === 'number' ? item.resposta : (typeof item.resposta === 'string' && item.resposta !== '' ? Number(item.resposta) : NaN);
            if (!Number.isNaN(val)) {
                const score = Number(val);
                if (score < 3) weaknesses.push({ dimension: meta.dimension, pergunta: item.pergunta, resposta: item.resposta, score, motivo: `Valor numérico menor que 3 (${score})` });
            }
        } else if (meta.type === 'default' && Array.isArray(meta.options)) {
            // trata resposta que pode vir como string ou array (multiple)
            let answerStr = '';
            if (Array.isArray(item.resposta)) answerStr = item.resposta.join(', ');
            else if (item.resposta !== null && item.resposta !== undefined) answerStr = String(item.resposta);

            const idx = findOptionIndexTolerant(meta.options, answerStr);
            if (idx !== -1) {
                const score = 4 - idx; // regra: 1ª opção = 4, 2ª = 3, etc.
                if (score < 3) weaknesses.push({ dimension: meta.dimension, pergunta: item.pergunta, resposta: item.resposta, score, motivo: `Opção selecionada resulta em score ${score} (<3)` });
            }
        }
    });

    if (weaknesses.length > 0) {
        console.log('Weaknesses detectadas (pré-prompt):');
        weaknesses.forEach((w, i) => console.log(`W${i + 1}: [${w.dimension}] ${w.pergunta} => resposta: ${w.resposta} (score=${w.score}) motivo: ${w.motivo}`));
    }

    const weaknessesText = weaknesses.length > 0
        ? ['--- DETECTED_WEAKNESSES ---', ...weaknesses.map((w, i) => `W${i+1} - Dimensão: ${w.dimension}\nPergunta: ${w.pergunta}\nResposta: ${w.resposta}\nScore: ${w.score}\nMotivo: ${w.motivo}`), '--- END DETECTED_WEAKNESSES ---'].join('\n\n')
        : '';

    const systemPrompt = `
Você é uma IA especializada em diagnóstico empresarial e análise organizacional.
Seu papel é gerar um *relatório analítico e detalhado* sobre a situação atual de uma empresa,
com base nas respostas fornecidas a um questionário *focado nas dimensões organizacionais*.
O relatório será lido por gestores e consultores empresariais que buscam entender o nível de maturidade da empresa *nessas áreas específicas*.

A análise deve se basear *exclusivamente* nas respostas sobre as quatro dimensões fornecidas abaixo.
Analise atentamente cada resposta e elabore um relatório coerente, objetivo e técnico, mostrando
*o que a empresa já possui bem estruturado* e *o que ainda precisa melhorar* *dentro dessas dimensões*.

### Diretrizes para o relatório:

1. *Objetivo:*
   Elaborar um relatório claro e profissional que descreva a situação da empresa com base nas respostas, destacando:
   - Pontos fortes e boas práticas identificadas;
   - Fragilidades, lacunas ou áreas que precisam de evolução;
   - Interpretações e observações gerais sobre a maturidade e perfil organizacional.

2. *Estrutura sugerida:*
   Divida a análise em *dimensões*, sempre que possível (por exemplo):
   - Pessoas & Cultura
   - Estrutura & Operações
   - Mercado & Clientes
   - Direção & Futuro
   (se alguma dimensão não for abordada nas respostas, omita-a naturalmente)

3. *Conteúdo de cada dimensão:*
   - *Resumo da Situação:* visão geral do que foi percebido nas respostas.
   - *Pontos Fortes:* comportamentos, recursos ou práticas já consolidadas.
   - *Pontos de Melhoria:* carências, riscos ou oportunidades de aprimoramento.
   - *Síntese Final:* comentário breve sobre o nível de maturidade dessa dimensão.

4. *Tom e estilo:*
   - Linguagem consultiva, profissional e empática;
   - Evite jargões excessivos ou termos muito técnicos;
   - Use frases curtas e objetivas;
   - Mantenha tom analítico, mas acessível para gestores e empresários.

5. *Saída esperada:*
   Retorne *um texto contínuo bem formatado*, com títulos claros e divisões visuais entre as dimensões.
   Use títulos em MAIÚSCULAS para cada seção (ex: "PESSOAS & CULTURA"), e separe as seções com linhas de “---”.
   A primeira parte do texto deve funcionar como um *RESUMO EXECUTIVO GERAL*, seguido das análises por dimensão.

6. *Detecção*
    Nas respostas das perguntas da parte "Dimensões, detecte desvios padrões que surgem nas respostas e destaque-os no relatório.
    No relatório, na seção de Pontos de Melhorias.

7. *Importante:*
   Não gere recomendações de plano de ação, trilhas de desenvolvimento ou KPIs neste momento.
   Foque apenas no diagnóstico e interpretação das respostas fornecidas.

Gere agora o relatório com base nas informações e respostas recebidas.
`;

    const userPromptContent = `
--- Perguntas e Respostas Recebidas ---
${textoBase}
--- Fim das Perguntas e Respostas ---

Por favor, gere o relatório conforme as diretrizes fornecidas.
`;

    const finalUserPrompt = weaknessesText
        ? `${userPromptContent}\n${weaknessesText}\n\nIMPORTANTE: Acima há um bloco chamado 'DETECTED_WEAKNESSES' com pontos que apresentaram score menor que 3. Ao gerar o relatório, inclua cada item desse bloco na seção 'Pontos de Melhoria' da dimensão correspondente, explicando por que a resposta indica fragilidade (use a linha "Motivo" como base). Mantenha o formato solicitado no system prompt.`
        : userPromptContent;

    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const requestBody = {
        model: "gpt-3.5-turbo", 
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: finalUserPrompt }
        ],
        temperature: 0.7,
    };

    console.log(`Enviando pedido para OpenAI API (${requestBody.model})...`);

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
        });

        console.log("Resposta da OpenAI - Status:", response.status);

        if (!response.ok) {
            let errorData = { message: `Erro HTTP ${response.status}` };
            try {
                const text = await response.text();
                errorData = JSON.parse(text).error || errorData;
                console.error("Detalhes do erro da OpenAI:", text);
            } catch (e) {
                console.error("Não foi possível analisar a resposta de erro da OpenAI.");
            }
            if (response.status === 401) {
                 throw new Error("Chave da API OpenAI inválida ou não autorizada.");
            }
             if (response.status === 429) {
                 throw new Error("Limite de taxa da API OpenAI excedido. Tente novamente mais tarde.");
             }
            throw new Error(`Falha ao chamar a API OpenAI: ${errorData.message}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            console.log("Relatório recebido da OpenAI.");
            return data.choices[0].message.content.trim();
        } else {
            console.error("Resposta inesperada da API OpenAI (sem conteúdo):", data);
            throw new Error("Não foi possível extrair o conteúdo da resposta da IA.");
        }

    } catch (error: any) {
        console.error("Erro detal na chamada à API OpenAI:", error.message);
        throw new Error(`Erro ao comunicar com a API OpenAI: ${error.message}`);
    }                   
}   