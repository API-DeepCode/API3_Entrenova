

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

6. *Importante:*
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

    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const requestBody = {
        model: "gpt-3.5-turbo", 
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPromptContent }
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