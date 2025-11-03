"use client"

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/forms/ProgressBar";
import styles from "@/components/styles/Forms.module.css"
import NavButton from "@/components/globals/NavButton"
import { FormsQuestions } from "@/lib/type";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { saveFormData } from '@/app/lib/formStorage';

export default function SecondPart(){
    const router = useRouter();
    const questions: FormsQuestions[] = [
        {
            question: "Quando você pensa no desenvolvimento da sua equipe, quais aspectos considera mais desafiadores hoje?",
            options: ["Comunicação & Relacionamento (clareza, feedback, alinhamento)", "Liderança & Colaboração (engajamento, delegação, gestão de conflitos)", "Criatividade & Resolução de Problemas (inovação, adaptação)", "Autogestão & Produtividade (tempo, autonomia, foco, bem-estar)", "Cultura & Valores (cultura organizacional viva, propósito, ESG)"],
            outro: true,
            type: "multiple"
        },
        {
            question: "Se tivesse que resumir, quais seriam os maiores resultados que você gostaria de alcançar com um programa de desenvolvimento humano?",
            options: ["Fortalecer Pessoas & Cultura (engajamento, bem-estar, liderança próxima)", "Melhorar Estrutura & Operações (autonomia, eficiência, produtividade)", "Aprimorar Mercado & Clientes (posicionamento, atendimento, diferenciação)", "Consolidar Direção & Futuro (visão estratégica clara, inovação, ESG)"],
            outro: true,
            type: "multiple"
        }
    ];

    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const handleSelect = (question: string, answer: string | string[]) => {
        setAnswers((prev) => ({ ...prev, [question]: answer}));
    }
    const totalQuestions = questions.length;
    const answered = Object.keys(answers).length;

        //Função para salvar as respostas no localStorage e navegar
        const handleNext = async () => {
            try {
                const data = {
                    desafios_equipe: answers["Quando você pensa no desenvolvimento da sua equipe, quais aspectos considera mais desafiadores hoje?"],
                    resultados_esperados: answers["Se tivesse que resumir, quais seriam os maiores resultados que você gostaria de alcançar com um programa de desenvolvimento humano?"]
                };

                saveFormData(2, data);
                console.log("Respostas da parte 2 salvas no localStorage");
                router.push('/forms/ThirdPart');
            } catch (error) {
                console.error("Erro ao salvar respostas da parte 2:", error);
            }
        };

    return(
        <section className={styles.display}>
            <div className={styles.title}>
                <div className={styles.information}>
                    <h1>Desafios e Objetivos</h1>
                    <h2>Etapa 2 de 4</h2>
                </div>

                <ProgressBar current={answered} total={totalQuestions} />
            </div>

            <div className={styles.questions_table}>
                <QuestionDisplay
                    questions={questions}
                    answers={answers}
                    handleSelect={handleSelect}
                />

                <div className={styles.navigation_area}>
                    <NavButton destination={1} buttonStyle={0} content={
                        <>
                            <ArrowLeft/>

                            <p>Voltar</p>
                        </>
                    }/>

                    <NavButton destination={3} buttonStyle={answered == totalQuestions ? 0 : 1} content={
                        <>
                            <p>Próximo</p>

                            <ArrowRight/>
                        </>
                    }
                    onClick={handleNext}
                    />
                </div>
            </div>
        </section>
    );
}