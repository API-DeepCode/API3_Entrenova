"use client"

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/forms/ProgressBar";
import styles from "@/components/styles/Forms.module.css";
import NavButton from "@/components/globals/NavButton";
import { DimensionQuestions, FormsQuestions } from "@/lib/type";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { saveFormData } from "@/app/lib/formStorage";

// Single unified form component that shows one question at a time
export default function UnifiedForm(){
  const router = useRouter();

  // --- Part 1 (Perfil da Empresa)
  const part1: FormsQuestions[] = [
    { question: "Setor principal da sua empresa", options: ["Indústria", "Serviços", "Comércio/Varejo", "Tecnologia/Startups", "Educação/Cultura"], outro: true, type: "default" },
    { question: "Número de coladoradores", options: ["Até 10", "Entre 11 e 30", "Entre 30 e 100", "Acima de 100", "Acima de 500"], outro: false, type: "default" },
    { question: "Porte da empresa", options: ["Startup", "PME (Pequena/Média Empresa)", "Grande Empresa"], outro: false, type: "default" },
    { question: "Localização", options: ["Região Sudeste", "Região Sul", "Região Nordeste", "Região Norte", "Região Centro-Oeste"], outro: false, type: "default" }
  ];

  // --- Part 2 (Desafios e Objetivos)
  const part2: FormsQuestions[] = [
    { question: "Quando você pensa no desenvolvimento da sua equipe, quais aspectos considera mais desafiadores hoje?", options: ["Comunicação & Relacionamento (clareza, feedback, alinhamento)", "Liderança & Colaboração (engajamento, delegação, gestão de conflitos)", "Criatividade & Resolução de Problemas (inovação, adaptação)", "Autogestão & Produtividade (tempo, autonomia, foco, bem-estar)", "Cultura & Valores (cultura organizacional viva, propósito, ESG)"], outro: true, type: "multiple" },
    { question: "Se tivesse que resumir, quais seriam os maiores resultados que você gostaria de alcançar com um programa de desenvolvimento humano?", options: ["Fortalecer Pessoas & Cultura (engajamento, bem-estar, liderança próxima)", "Melhorar Estrutura & Operações (autonomia, eficiência, produtividade)", "Aprimorar Mercado & Clientes (posicionamento, atendimento, diferenciação)", "Consolidar Direção & Futuro (visão estratégica clara, inovação, ESG)"], outro: true, type: "multiple" }
  ];

  // --- Part 3 (Mini-Diagnóstico das Dimensões) — each question has a `dimension` field
  const peopleCulture: DimensionQuestions[] = [
    { question: "Como a comunicação acontece no dia a dia?", options: ["Todos têm clareza e acesso fácil às informações", "Funciona na maior parte do tempo, mas com algumas falhas", "Normalmente só em reuniões formais ou quando há problemas", "É confusa, cada líder comunica de um jeito"], outro: false, type: "default", dimension: "Pessoas e Cultura" },
    { question: "Como você descreveria o estilo de liderança predominante?", options: ["Engajam e dão autonomia", "São bons, mas variam conforme o líder", "Centralizam muito as decisões", "Raramente exercem liderança ativa"], outro: false, type: "default", dimension: "Pessoas e Cultura" },
    { question: "Quando surgem problemas, como os times costumam agir?", options: ["Trazem ideias e resolvem juntos", "Resolvem, mas de forma reativa", "Dependem sempre do gestor para decidir", "Evitam mudanças e preferem manter como está"], outro: false, type: "default", dimension: "Pessoas e Cultura" },
    { question: "Como está organizada a rotina de trabalho?", options: ["Papéis e prioridades são claros", "Há certa clareza, mas faltam recursos ou prazos realistas", "Muitas vezes é confusa, com foco em “apagar incêndios”", "Não há organização definida, cada um faz do seu jeito"], outro: false, type: "default", dimension: "Pessoas e Cultura" },
    { question: "Até que ponto os valores da empresa estão presentes no dia a dia?", options: ["Claros e vividos na prática", "Conhecidos, mas pouco aplicados", "Quase não são lembrados, só em discursos", "Não há clareza sobre os valores"], outro: false, type: "default", dimension: "Pessoas e Cultura" },
    { question: "De 0 a 5, quão claras estão as funções e responsabilidades de cada pessoa da equipe?", options: [""], outro: false, type: "slider", dimension: "Pessoas e Cultura" },
    { question: "De 0 a 5, como você avalia a comunicação entre líderes e equipes?", options: [""], outro: false, type: "slider", dimension: "Pessoas e Cultura" },
    { question: "Quando alguém comete um erro, qual costuma ser a reação predominante na empresa? (descreva em 2–3 linhas)", options: [""], outro: false, type: "open", dimension: "Pessoas e Cultura" },
    { question: "De 0 a 5, como você avalia a colaboração entre diferentes equipes ou áreas? (explique em 1 frase, se quiser)", options: [""], outro: false, type: "slider", dimension: "Pessoas e Cultura" },
    { question: "O que mais motiva os colaboradores hoje", options: ["Reconhecimento", "Estabilidade", "Aprendizado"], outro: false, type: "default", dimension: "Pessoas e Cultura" },
    { question: "Em situações de conflito entre equipes, como eles costumam ser resolvidos? (descreva em 2–3 linhas)", options: [""], outro: false, type: "open", dimension: "Pessoas e Cultura" }
  ];

  const structureOperations: DimensionQuestions[] = [
    { question: "Como é a troca de informações entre áreas?", options: ["Integrada e frequente", "Funciona em parte, com alguns ruídos", "Depende de reuniões formais", "As áreas trabalham isoladas"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "Como os gestores lidam com delegação?", options: ["Delegam com clareza e confiança", "Delegam, mas acompanham em excesso", "Raramente delegam", "Não delegam, concentram tudo"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "Quando processos falham, o que acontece?", options: ["As equipes propõem melhorias rapidamente", "Há ajustes, mas com demora", "Só a gestão revisa processos", "Nada muda, seguimos com os problemas"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "Quanta autonomia operacional os colaboradores têm?", options: ["Alta, com responsabilidade", "Alguma, mas dependem de aprovações", "Pouca, com muito controle", "Nenhuma, tudo vem da gestão"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "Qual é a relação da empresa com padrões de qualidade?", options: ["Qualidade é prioridade e está no DNA", "Importante, mas não sempre seguida", "Depende da cobrança externa", "Não há padrão definido"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "Quais ferramentas apoiam as operações do dia a dia?", options: ["Sistemas integrados (ERP, CRM, dashboards)", "Algumas ferramentas digitais, mas sem integração", "Recursos básicos (planilhas, controles manuais)", "Não há ferramentas"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "De 0 a 5, os treinamentos oferecidos pela empresa atendem às reais necessidades do trabalho?", options: [""], outro: false, type: "slider", dimension: "Estrutura e Operações" },
    { question: "Quando surgem várias demandas, como as pessoas sabem o que deve ser priorizado? (descreva em 2–3 linhas)", options: [""], outro: false, type: "open", dimension: "Estrutura e Operações" },
    { question: "De 0 a 5, como você avalia a qualidade e a agilidade das decisões internas?", options: [""], outro: false, type: "slider", dimension: "Estrutura e Operações" },
    { question: "Quando alguém precisa tomar uma decisão simples, qual é o caminho mais comum?", options: ["decide sozinho", "pede ao gestor", "espera orientação formal"], outro: false, type: "default", dimension: "Estrutura e Operações" },
    { question: "De 0 a 5, os processos atuais contribuem para eficiência e produtividade? (explique em 1 frase)", options: [""], outro: false, type: "slider", dimension: "Estrutura e Operações" },
    { question: "Existe clareza sobre quem é responsável por cada entrega ou há sobreposição de funções?", options: [""], outro: false, type: "open", dimension: "Estrutura e Operações" }
  ];

  const marketClients: DimensionQuestions[] = [
    { question: "Como a empresa ouve seus clientes?", options: ["Temos pesquisa estruturada e contínua", "Fazemos de forma ocasional", "Reagimos só em reclamações", "Não há escuta formal"], outro: false, type: "default", dimension: "Mercado e Clientes" },
    { question: "Como vendas e atendimento trabalham juntos?", options: ["Colaboram e compartilham informações", "Trocam parcialmente, com falhas", "Atuam isolados, sem integração", "Há conflitos ou competição entre áreas"], outro: false, type: "default", dimension: "Mercado e Clientes" },
    { question: "Quando o mercado muda, como a empresa reage?", options: ["Antecipamos tendências e inovamos rápido", "Ajustamos, mas com atraso", "Só reagimos a crises", "Não temos adaptação estruturada"], outro: false, type: "default", dimension: "Mercado e Clientes" },
    { question: "Como é o acompanhamento de metas comerciais?", options: ["Claro, transparente e frequente", "Existe, mas pouco revisado", "Informal, depende do gestor", "Não temos acompanhamento"], outro: false, type: "default", dimension: "Mercado e Clientes" },
    { question: "O diferencial competitivo está claro?", options: ["Sim, é comunicado e reconhecido", "Existe, mas pouco divulgado", "É incerto, varia por área", "Não está claro"], outro: false, type: "default", dimension: "Mercado e Clientes" },
    { question: "Quais ferramentas apoiam mercado & clientes?", options: ["CRM, BI e pesquisas estruturadas", "Algumas planilhas e relatórios", "Feedbacks informais, dados dispersos", "Não há recursos específicos"], outro: false, type: "default", dimension: "Mercado e Clientes" },
    { question: "De 0 a 5, como você avalia a capacidade da empresa de se adaptar a mudanças externas?", options: [""], outro: false, type: "slider", dimension: "Mercado e Clientes" },
    { question: "Quando um cliente traz uma demanda inesperada, qual costuma ser a reação da equipe? (descreva em 2–3 linhas)", options: [""], outro: false, type: "open", dimension: "Mercado e Clientes" },
    { question: "De 0 a 5, a empresa costuma ouvir e aplicar feedback de clientes?", options: [""], outro: false, type: "slider", dimension: "Mercado e Clientes" },
    { question: "Qual foi a última vez que uma rotina ou processo mudou por causa de feedback externo? (descreva em 2–3 linhas)", options: [""], outro: false, type: "open", dimension: "Mercado e Clientes" },
    { question: "De 0 a 5, como você avalia a capacidade da empresa de inovar em produtos ou serviços?", options: [""], outro: false, type: "slider", dimension: "Mercado e Clientes" },
    { question: "Em uma frase, como a empresa busca se diferenciar da concorrência?", options: [""], outro: false, type: "open", dimension: "Mercado e Clientes" }
  ];

  const directionFuture: DimensionQuestions[] = [
    { question: "Como a visão de futuro é comunicada?", options: ["Todos conhecem e entendem", "É conhecida, mas só pela gestão", "Quase não é falada", "Não é comunicada"], outro: false, type: "default", dimension: "Direção e Futuro" },
    { question: "Como os líderes conectam pessoas à estratégia?", options: ["Inspiram e alinham metas claramente", "Tentam alinhar, mas varia muito", "Há pouca conexão", "Não há esforço de alinhamento"], outro: false, type: "default", dimension: "Direção e Futuro" },
    { question: "Qual é o papel da inovação no planejamento?", options: ["Prioridade central, com projetos claros", "Importante, mas sem orçamento", "Acontece de forma isolada", "Não é prioridade"], outro: false, type: "default", dimension: "Direção e Futuro" },
    { question: "Como as atividades diárias se conectam com a estratégia?", options: ["Sempre, com clareza", "Às vezes, depende do gestor", "Raramente, não chega claro", "Nunca, cada área segue isolada"], outro: false, type: "default", dimension: "Direção e Futuro" },
    { question: "Como a empresa lida com propósito e impacto social?", options: ["Está no centro das decisões", "É importante, mas secundário", "Fala-se, mas não se aplica", "Não há preocupação"], outro: false, type: "default", dimension: "Direção e Futuro" },
    { question: "Quais ferramentas apoiam a estratégia?", options: ["Dashboards, OKRs, planejamentos formais", "Algumas planilhas ou relatórios", "Discussões informais, sem registro contínuo", "Não temos instrumentos claros"], outro: false, type: "default", dimension: "Direção e Futuro" },
    { question: "De 0 a 5, os colaboradores conhecem e entendem a visão de futuro da empresa?", options: [""], outro: false, type: "slider", dimension: "Direção e Futuro" },
    { question: "Se tivesse que resumir a visão de futuro da empresa em uma frase, qual seria?", options: [""], outro: false, type: "open", dimension: "Direção e Futuro" },
    { question: "De 0 a 5, como você avalia a preparação e desenvolvimento de novos líderes?", options: [""], outro: false, type: "slider", dimension: "Direção e Futuro" },
    { question: "Quem hoje você enxerga como potenciais líderes dentro da empresa?", options: [""], outro: false, type: "open", dimension: "Direção e Futuro" },
    { question: "De 0 a 5, a empresa tem metas estratégicas claras e compartilhadas com todos?", options: [""], outro: false, type: "slider", dimension: "Direção e Futuro" },
    { question: "Na sua opinião, qual é a maior oportunidade e qual o maior risco da empresa nos próximos 3 anos?", options: [""], outro: false, type: "open", dimension: "Direção e Futuro" }
  ];

  // --- Part 4 (Investimento, Inovação & Urgência)
  const part4: FormsQuestions[] = [
    { question: "Qual a faixa de investimento disponível para treinamentos atualmente?", options: ["Até R$ 10 mil", "Entre R$ 10 mil e R$ 50 mil", "Acima de R$ 50 mil"], outro: false, type: "default" },
    { question: "Quem geralmente decide sobre a contratação de treinamentos?", options: ["CEO / Diretor", "RH / Treinamento e Desenvolvimento", "Marketing / Comunicação"], outro: true, type: "default" },
    { question: "Vocês preferem treinamentos", options: ["Presenciais", "Online", "Híbridos"], outro: false, type: "default" },
    { question: "De 1 a 5, o quanto você considera importante investir em desenvolvimento profissional dos colaboradores", options: [""], outro: false, type: "slider" },
    { question: "De 1 a 5, o quanto você considera importante desenvolver soft skills (comunicação, liderança, criatividade, autogestão)", options: [""], outro: false, type: "slider" },
    { question: "De 1 a 5, o quanto você considera importante incentivar cultura, arte e hobbies", options: [""], outro: false, type: "slider" },
    { question: "De 1 a 5, o quanto você considera importante reconhecer impacto do desenvolvimento humano na performance da empresa", options: [""], outro: false, type: "slider" },
    { question: "Vocês já implementaram projetos inovadores em treinamentos anteriores?", options: ["Sim", "Não"], outro: false, type: "default" },
    { question: "Em quanto tempo vocês desejam iniciar o treinamento?", options: ["Imediatamente", "Em até 3 meses", "Em 6 meses ou mais"], outro: false, type: "default" }
  ];

  // build unified questions array with metadata about part and (optional) dimension
  const unified = useMemo(() => {
    const arr: (FormsQuestions & { part: number, dimension?: string })[] = [];
    part1.forEach(q => arr.push({ ...q, part: 1 }));
    part2.forEach(q => arr.push({ ...q, part: 2 }));
    peopleCulture.forEach(q => arr.push({ ...q, part: 3 }));
    structureOperations.forEach(q => arr.push({ ...q, part: 3 }));
    marketClients.forEach(q => arr.push({ ...q, part: 3 }));
    directionFuture.forEach(q => arr.push({ ...q, part: 3 }));
    part4.forEach(q => arr.push({ ...q, part: 4 }));
    return arr;
  }, []);

  const totalQuestions = unified.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = unified[current];

  const answeredCount = Object.values(answers).filter(a => a !== undefined && a !== null && a !== '' && (!Array.isArray(a) || a.length > 0)).length;

  // Generate dynamic title
  const getTitle = () => {
    if (!currentQuestion) return "";
    if (currentQuestion.part === 1) return "Perfil da Empresa";
    if (currentQuestion.part === 2) return "Desafios e Objetivos";
    if (currentQuestion.part === 3) return `Mini-Diagnóstico das Dimensões: ${currentQuestion.dimension ?? ""}`;
    if (currentQuestion.part === 4) return "Investimento, Inovação & Urgência";
    return "";
  };

  // Handle selection from QuestionDisplay
  const handleSelect = (question: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  // Helper: find all questions of a given part and return answers for saving
  const collectPartAnswers = (part: number) => {
    const partQs = unified.filter(q => q.part === part);
    const result: Record<string, any> = {};
    partQs.forEach(q => {
      result[q.question] = answers[q.question] ?? null;
    });
    return result;
  };

  // Custom mappers for compatibility with your saveFormData usage
  const mapAndSavePart = async (part: number) => {
    if (part === 1){
      const a = collectPartAnswers(1);
      const data = {
        num_colaboradores: a["Número de coladoradores"],
        porte: a["Porte da empresa"],
        localizacao: a["Localização"],
        setor: a["Setor principal da sua empresa"]
      } as any;
      saveFormData(1, data);
      console.log('Part 1 saved', data);
    } else if (part === 2){
      const a = collectPartAnswers(2);
      const data = {
        desafios_equipe: a[unified.find(q => q.part===2)!.question],
        resultados_esperados: a[unified.filter(q=>q.part===2)[1].question]
      } as any;
      // But safer: use the original questions' keys explicitly
      const data2 = {
        desafios_equipe: a["Quando você pensa no desenvolvimento da sua equipe, quais aspectos considera mais desafiadores hoje?"],
        resultados_esperados: a["Se tivesse que resumir, quais seriam os maiores resultados que você gostaria de alcançar com um programa de desenvolvimento humano?"]
      };
      saveFormData(2, data2);
      console.log('Part 2 saved', data2);
    } else if (part === 3){
      // For part 3 we save raw answers grouped by dimension (keeps original structure)
      const dims: Record<string, Record<string, any>> = {};
      unified.filter(q => q.part === 3).forEach(q => {
        const dim = q.dimension ?? "Geral";
        dims[dim] = dims[dim] ?? {};
        dims[dim][q.question] = answers[q.question] ?? null;
      });
      saveFormData(3, dims as any);
      console.log('Part 3 saved', dims);
    } else if (part === 4){
      // Map to the same keys used in the original FourthPart
      const a = collectPartAnswers(4);

      const idxOf = (q: string, opts?: string[]) => {
        const val = a[q];
        if (!val || !opts) return null;
        if (typeof val === "string") return Math.max(0, opts.indexOf(val));
        return null;
      };
      const toNumber = (q: string) => {
        const val = a[q];
        if (val === undefined || val === null || val === "") return null;
        const n = Number(val);
        return Number.isFinite(n) ? n : null;
      };
      const toBoolean = (q: string) => {
        const val = a[q];
        if (typeof val === "string") return val.toLowerCase() === "sim";
        return !!val;
      };
      const toString = (q: string) => {
        const val = a[q];
        if (!val) return "";
        return Array.isArray(val) ? val.join(", ") : String(val);
      };

      const data = {
        abertura: idxOf("Em quanto tempo vocês desejam iniciar o treinamento?", ["Imediatamente", "Em até 3 meses", "Em 6 meses ou mais"]),
        importante_cah: toNumber("De 1 a 5, o quanto você considera importante incentivar cultura, arte e hobbies"),
        importante_desenvolvimento: toNumber("De 1 a 5, o quanto você considera importante investir em desenvolvimento profissional dos colaboradores"),
        importante_impacto: toNumber("De 1 a 5, o quanto você considera importante reconhecer impacto do desenvolvimento humano na performance da empresa"),
        importante_softskills: toNumber("De 1 a 5, o quanto você considera importante desenvolver soft skills (comunicação, liderança, criatividade, autogestão)"),
        invest: idxOf("Qual a faixa de investimento disponível para treinamentos atualmente?", ["Até R$ 10 mil", "Entre R$ 10 mil e R$ 50 mil", "Acima de R$ 50 mil"]),
        projeto_inov: toBoolean("Vocês já implementaram projetos inovadores em treinamentos anteriores?"),
        tipo_trein: toString("Quem geralmente decide sobre a contratação de treinamentos?"),
        treina_contra: toString("Vocês preferem treinamentos")
      };

      saveFormData(4, data as any);
      console.log('Part 4 saved', data);
    }
  };

  // Navigation handlers
  const goNext = async () => {
    // require an answer before moving on
    const q = currentQuestion;
    if (!q) return;
    const ans = answers[q.question];
    const needsAnswer = q.type === 'open' || q.type === 'slider' || q.type === 'default' || q.type === 'multiple';
    if (needsAnswer && (ans === undefined || ans === null || ans === '' || (Array.isArray(ans) && ans.length === 0))) return;

    // if this is the last question of a part, save that part
    const isLastOfPart = (i: number) => {
      const part = unified[i].part;
      for (let j = i+1; j < unified.length; j++){
        if (unified[j].part === part) return false;
      }
      return true;
    };

    if (isLastOfPart(current)){
      await mapAndSavePart(unified[current].part);
    }

    if (current < unified.length - 1) setCurrent(c => c+1);
    else {
      // finished all questions — if part 4 was already saved on its last question, navigate to AiAnswer
      router.push('/AiAnswer');
    }
  };

  const goBack = () => {
    if (current === 0) return;
    setCurrent(c => c-1);
  };

  // Determine subtitle "Etapa X de 4" based on part of the current question
  const getSubtitle = () => {
    if (!currentQuestion) return "";
    const part = currentQuestion.part;
    return `Etapa ${part} de 4`;
  };

  return (
    <section className={styles.display}>
      <div className={styles.title}>
        <div className={styles.information}>
          <h1>{getTitle()}</h1>
          <h2>{getSubtitle()}</h2>
        </div>

        <ProgressBar current={answeredCount} total={totalQuestions} />
      </div>

      <div className={styles.questions_table}>
        {/* Render QuestionDisplay for the single current question (passed as an array of one) */}
        {currentQuestion && (
          <QuestionDisplay
            questions={[currentQuestion]}
            answers={answers}
            handleSelect={handleSelect}
          />
        )}

        <div className={styles.navigation_area}>
          <button className={styles.pink_button} onClick={goBack} disabled={current===0}>
            <ArrowLeft />
            <p>Voltar</p>
          </button>

          <button
            className={answeredCount >= totalQuestions ? styles.pink_button : styles.pink_button}
            onClick={goNext}
          >
            <p>{current < unified.length - 1 ? 'Próximo' : 'Finalizar'}</p>
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}