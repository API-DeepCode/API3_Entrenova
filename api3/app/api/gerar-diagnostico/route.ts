// Caminho: api3/app/api/gerar-diagnostico/route.ts
import { NextResponse } from 'next/server';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { gerarRelatorioOpenAI } from '@/hooks/Gemini_Ai/openaiService';
import { sendReportEmail } from '@/hooks/AI_Email/MandarEmail';

console.log("--- Carregando módulo /api/gerar-diagnostico route (modo OpenAI - Completo) ---");

const questionsMap: Record<string, string> = {
  // Parte 1 (respostas_part1) - Adicione as chaves usadas no Firestore
  "setor": "Setor principal da sua empresa",
  "num_colaboradores": "Número de coladoradores", // Atenção ao typo se existir no Firestore
  "porte": "Porte da empresa",
  "localizacao": "Localização",
  // Parte 2 (respostas_part2) - Adicione as chaves usadas no Firestore
  "desafios_equipe": "Quando você pensa no desenvolvimento da sua equipe, quais aspectos considera mais desafiadores hoje?",
  "resultados_esperados": "Se tivesse que resumir, quais seriam os maiores resultados que você gostaria de alcançar com um programa de desenvolvimento humano?",
  // Parte 3 (respostas_part3/.../dimensoes) - Mantenha/Complete
  "comunicacao_diaria": "Como a comunicação acontece no dia a dia?",
  "estilo_lideranca": "Como você descreveria o estilo de liderança predominante?",
  "agir_problemas": "Quando surgem problemas, como os times costumam agir?",
  "rotina_trabalho": "Como está organizada a rotina de trabalho?",
  "valores_empresa": "Até que ponto os valores da empresa estão presentes no dia a dia?",
  "funcoes_responsabilidades": "De 0 a 5, quão claras estão as funções e responsabilidades de cada pessoa da equipe?",
  "comunicacao_lideres": "De 0 a 5, como você avalia a comunicação entre líderes e equipes?",
  "reacao_erro": "Quando alguém comete um erro, qual costuma ser a reação predominante na empresa?",
  "colaboracao_equipes": "De 0 a 5, como você avalia a colaboração entre diferentes equipes ou áreas?",
  "motivacao_colaboradores": "O que mais motiva os colaboradores hoje?",
  "resolucao_conflitos": "Em situações de conflito entre equipes, como eles costumam ser resolvidos?",
  "troca_informacoes": "Como é a troca de informações entre áreas?",
  "delegacao": "Como os gestores lidam com delegação?",
  "quando_processos_falham": "Quando processos falham, o que acontece?",
  "autonomia_operacional": "Quanta autonomia operacional os colaboradores têm?",
  "padrao_qualidade": "Qual é a relação da empresa com padrões de qualidade?",
  "ferramentas_operacionais": "Quais ferramentas apoiam as operações do dia a dia?",
  "treinamentos_adequados": "De 0 a 5, os treinamentos oferecidos pela empresa atendem às reais necessidades do trabalho?",
  "priorizacao_demandas": "Quando surgem várias demandas, como as pessoas sabem o que deve ser priorizado?",
  "qualidade_decisoes": "De 0 a 5, como você avalia a qualidade e a agilidade das decisões internas?",
  "caminho_decisao_simples": "Quando alguém precisa tomar uma decisão simples, qual é o caminho mais comum?",
  "processos_produtividade": "De 0 a 5, os processos atuais contribuem para eficiência e produtividade?",
  "clareza_responsabilidades": "Existe clareza sobre quem é responsável por cada entrega ou há sobreposição de funções?",
  "como_ouve_clientes": "Como a empresa ouve seus clientes?",
  "vendas_atendimento": "Como vendas e atendimento trabalham juntos?",
  "reacao_mudancas_mercado": "Quando o mercado muda, como a empresa reage?",
  "acompanhamento_metas": "Como é o acompanhamento de metas comerciais?",
  "diferencial_competitivo": "O diferencial competitivo está claro?",
  "ferramentas_mercado": "Quais ferramentas apoiam mercado & clientes?",
  "capacidade_adaptacao": "De 0 a 5, como você avalia a capacidade da empresa de se adaptar a mudanças externas?",
  "reacao_demanda_cliente": "Quando um cliente traz uma demanda inesperada, qual costuma ser a reação da equipe?",
  "ouvir_aplicar_feedback": "De 0 a 5, a empresa costuma ouvir e aplicar feedback de clientes?",
  "ultima_mudanca_por_feedback": "Qual foi a última vez que uma rotina ou processo mudou por causa de feedback externo?",
  "capacidade_inovacao": "De 0 a 5, como você avalia a capacidade da empresa de inovar em produtos ou serviços?",
  "diferenciacao_concorrencia": "Em uma frase, como a empresa busca se diferenciar da concorrência?",
  "comunicacao_visao": "Como a visão de futuro é comunicada?",
  "ligacao_lideres_estrategia": "Como os líderes conectam pessoas à estratégia?",
  "papel_inovacao": "Qual é o papel da inovação no planejamento?",
  "ligacao_atividade_estrategia": "Como as atividades diárias se conectam com a estratégia?",
  "proposito_impacto": "Como a empresa lida com propósito e impacto social?",
  "ferramentas_estrategia": "Quais ferramentas apoiam a estratégia?",
  "conhecimento_visao": "De 0 a 5, os colaboradores conhecem e entendem a visão de futuro da empresa?",
  "resumo_visao": "Se tivesse que resumir a visão de futuro da empresa em uma frase, qual seria?",
  "preparacao_novos_lideres": "De 0 a 5, como você avalia a preparação e desenvolvimento de novos líderes?",
  "potenciais_lideres": "Quem hoje você enxerga como potenciais líderes dentro da empresa?",
  "metas_estrategicas": "De 0 a 5, a empresa tem metas estratégicas claras e compartilhadas com todos?",
  "oportunidade_risco": "Na sua opinião, qual é a maior oportunidade e qual o maior risco da empresa nos próximos 3 anos?",
  // Parte 4 (resposta_part_4) - Adicione as chaves usadas no Firestore
  "invest": "Qual a faixa de investimento disponível para treinamentos atualmente?",
  "tipo_trein": "Quem geralmente decide sobre a contratação de treinamentos?", // Ajustei o nome da chave (era treina_contra?)
  "treina_contra": "Vocês preferem treinamentos", // Ajustei o nome da chave (era tipo_trein?)
  "importante_desenvolvimento": "De 1 a 5, o quanto você considera importante investir em desenvolvimento profissional dos colaboradores",
  "importante_softskills": "De 1 a 5, o quanto você considera importante desenvolver soft skills (comunicação, liderança, criatividade, autogestão)",
  "importante_cah": "De 1 a 5, o quanto você considera importante incentivar cultura, arte e hobbies",
  "importante_impacto": "De 1 a 5, o quanto você considera importante reconhecer impacto do desenvolvimento humano na performance da empresa",
  "projeto_inov": "Vocês já implementaram projetos inovadores em treinamentos anteriores?",
  "abertura": "Em quanto tempo vocês desejam iniciar o treinamento?",
};

function addRespostas(data: any | undefined, collectionPrefix: string, targetArray: any[]) {
    if (!data) {
        console.warn(`Dados não encontrados para ${collectionPrefix}`);
        return;
    }
    console.log(`Processando dados de ${collectionPrefix}:`, Object.keys(data));
    Object.keys(data).forEach(key => {
        const perguntaCompleta = questionsMap[key] || `(${collectionPrefix}) ${key.replace(/_/g, ' ')}`;
        const resposta = data[key] ?? null; 

        const respostaFormatada = Array.isArray(resposta) ? resposta.join(', ') : resposta;

        if (respostaFormatada !== null && respostaFormatada !== '') { 
            targetArray.push({
                pergunta: perguntaCompleta,
                resposta: respostaFormatada
            });
        }
    });
}

// Função principal da API Route
export async function POST(req: Request) {
    console.log("--- API Route: Recebido pedido POST /api/gerar-diagnostico (modo OpenAI - Completo) ---");
    try {
    const hasOpenAIKey = !!(process.env.OPENAI_API_KEY || process.env.OPEN_AI_KEY || process.env.OPENAI_KEY || process.env.OPEN_AI);
    console.log("Verificando OPENAI API key presente:", hasOpenAIKey);
    if (!hasOpenAIKey) { throw new Error("Chave API OpenAI ausente."); }

        const body = await req.json();
        const { submissionId, formData } = body;

        const respostasFormatadas: { pergunta: string; resposta: string | number | null }[] = [];

        if (formData && Object.keys(formData).length > 0) {
            console.log('Recebido formData via request, gerando relatório a partir dos dados do cliente.');
            addRespostas(formData, 'FormData', respostasFormatadas);
        } else {
            console.log('Nenhum formData recebido; tentando buscar pelo submissionId no Firestore.');
            console.log('Submission ID recebido:', submissionId);
            if (!submissionId) { return NextResponse.json({ error: 'ID da submissão não fornecido' }, { status: 400 }); }

            const submissionIdStr = String(submissionId);

            console.log("Buscando dados das coleções no Firestore para submissionId:", submissionIdStr);

            const part1Ref = doc(db, 'respostas_part1', submissionIdStr);
            const part1Snap = await getDoc(part1Ref);
            addRespostas(part1Snap?.data(), 'Parte 1', respostasFormatadas);

            const part2Ref = doc(db, 'respostas_part2', submissionIdStr);
            const part2Snap = await getDoc(part2Ref);
            addRespostas(part2Snap?.data(), 'Parte 2', respostasFormatadas);

            const part4Ref = doc(db, 'resposta_part_4', submissionIdStr);
            const part4Snap = await getDoc(part4Ref);
            addRespostas(part4Snap?.data(), 'Parte 4', respostasFormatadas);

            console.log(`Buscando dimensões (Parte 3) para ID: ${submissionIdStr}`);
            const dimensoesColRef = collection(db, 'respostas_part3', submissionIdStr, 'dimensoes');
            const dimensoesSnap = await getDocs(dimensoesColRef);

            if (!dimensoesSnap.empty) {
                console.log(`Firestore: Encontrados ${dimensoesSnap.size} documentos de dimensão.`);
                dimensoesSnap.forEach((docSnap) => {
                    const data = docSnap.data();
                    const dimensionName = data.dimension || "Dimensão Desconhecida";
                    console.log(`  - Processando Dimensão: ${dimensionName}`);
                  
                    const dimensionData = { ...data };
                    delete (dimensionData as any).dimension; 
                    addRespostas(dimensionData, dimensionName, respostasFormatadas);
                });
            } else {
                console.warn(`Firestore: Nenhuma dimensão encontrada para o ID ${submissionIdStr} na subcoleção 'dimensoes'.`);
            }
        }
        

        console.log(`\nTotal de ${respostasFormatadas.length} perguntas/respostas formatadas de todas as partes.`);

        if (respostasFormatadas.length === 0) {
            console.error("!!! ERRO: Nenhuma pergunta/resposta válida foi formatada.");
            return NextResponse.json({ error: 'Nenhuma resposta válida encontrada para processamento.' }, { status: 404 });
        }

        console.log("Chamando gerarRelatorioOpenAI com dados completos...");
        const relatorio = await gerarRelatorioOpenAI(respostasFormatadas);

        console.log("Relatório COMPLETO gerado com sucesso pela OpenAI.");

        // Tenta enviar o relatório por e-mail (não bloqueia a resposta)
        try {
            const recipient = process.env.EMAIL_TO || process.env.TEST_EMAIL || null;
            if (recipient) {
                // fire-and-forget
                sendReportEmail(relatorio, recipient).catch(err => console.error('Erro ao enviar e-mail:', err));
                console.log('Envio de e-mail disparado para:', recipient);
            } else {
                console.log('Nenhum destinatário de e-mail configurado (EMAIL_TO/Test). E-mail não será enviado.');
            }
        } catch (err) {
            console.error('Erro no processo de envio de e-mail (não crítico):', err);
        }

        return NextResponse.json({ relatorio });

    } catch (error: any) {
        console.error(`!!! ERRO na API Route /api/gerar-diagnostico (Completo): ${error.message}`);
        return NextResponse.json(
            { error: 'Erro interno ao gerar diagnóstico completo', details: error.message },
            { status: 500 }
        );
    }
}