"use client"

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import ProgressBar from "@/components/forms/ProgressBar";
import styles from "@/components/styles/Forms.module.css"
// Remova NavButton daqui, pois faremos a navegação programaticamente
// import NavButton from "@/components/globals/NavButton"
import { FormsQuestions } from "@/lib/type";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { saveFormData } from "@/app/lib/formStorage";

export default function FourthPart(){
    const router = useRouter(); // Adicione o hook useRouter
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para feedback visual

    // ... (definição das 'questions' permanece a mesma) ...
    const questions: FormsQuestions[] = [
        // ... (suas perguntas aqui) ...
         {
            question: "Qual a faixa de investimento disponível para treinamentos atualmente?",
            options: ["Até R$ 10 mil", "Entre R$ 10 mil e R$ 50 mil", "Acima de R$ 50 mil"],
            outro: false,
            type: "default"
        },
        {
            question: "Quem geralmente decide sobre a contratação de treinamentos?",
            options: ["CEO / Diretor", "RH / Treinamento e Desenvolvimento", "Marketing / Comunicação"],
            outro: true,
            type: "default"
        },
        {
            question: "Vocês preferem treinamentos",
            options: ["Presenciais", "Online", "Híbridos"],
            outro: false,
            type: "default"
        },
        {
            question: "De 1 a 5, o quanto você considera importante investir em desenvolvimento profissional dos colaboradores",
            options: [""],
            outro: false,
            type: "slider"
        },
        {
            question: "De 1 a 5, o quanto você considera importante desenvolver soft skills (comunicação, liderança, criatividade, autogestão)",
            options: [""],
            outro: false,
            type: "slider"
        },
        {
            question: "De 1 a 5, o quanto você considera importante incentivar cultura, arte e hobbies",
            options: [""],
            outro: false,
            type: "slider"
        },
        {
            question: "De 1 a 5, o quanto você considera importante reconhecer impacto do desenvolvimento humano na performance da empresa",
            options: [""],
            outro: false,
            type: "slider"
        },
        {
            question: "Vocês já implementaram projetos inovadores em treinamentos anteriores?",
            options: ["Sim", "Não"],
            outro: false,
            type: "default"
        },
        {
            question: "Em quanto tempo vocês desejam iniciar o treinamento?",
            options: ["Imediatamente", "Em até 3 meses", "Em 6 meses ou mais"],
            outro: false,
            type: "default"
        },
    ];


    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const handleSelect = (question: string, answer: string | string[]) => {
        setAnswers((prev) => ({ ...prev, [question]: answer}));
    }
    const totalQuestions = questions.length;
    // Corrigido: Calcula respostas preenchidas corretamente
    const answered = Object.values(answers).filter(a => a !== undefined && a !== null && a !== '' && (!Array.isArray(a) || a.length > 0)).length;
    const allAnswered = answered === totalQuestions;


    const handleNext = async () => {
        if (!allAnswered || isSubmitting) return; // Não faz nada se não respondeu tudo ou já está enviando

        setIsSubmitting(true); // Indica que o envio começou
        let submissionId: number | string | null = null; // Variável para guardar o ID

        try {
            // Mapeia os dados da Parte 4 para o formato esperado e salva em localStorage
             const idxOf = (q: string, opts?: string[]) => {
                const a = answers[q];
                if (!a || !opts) return null;
                if (typeof a === "string") return Math.max(0, opts.indexOf(a));
                return null;
            };
            const toNumber = (q: string) => {
                const a = answers[q];
                if (a === undefined || a === null || a === "") return null;
                if (typeof a === "number") return a;
                const n = Number(a);
                return Number.isFinite(n) ? n : null;
            };
            const toBoolean = (q: string) => {
                const a = answers[q];
                if (typeof a === "string") return a.toLowerCase() === "sim";
                return !!a;
            };
            const toString = (q: string) => {
                const a = answers[q];
                if (!a) return "";
                return Array.isArray(a) ? a.join(", ") : String(a);
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

            // Salva localmente (localStorage) para que a página de AiAnswer possa consumir
            saveFormData(4, data as any);

            console.log("Respostas da parte 4 salvas localmente com sucesso.");

            // Navega para a página de diagnóstico. AiAnswer irá utilizar os dados em localStorage
            router.push(`/AiAnswer`);

        } catch (error) {
            console.error("Erro ao enviar respostas da parte 4:", error);
            // Adicione feedback de erro para o usuário aqui, se desejar
             setIsSubmitting(false); // Libera o botão em caso de erro
        }
         // Não precisa mais do finally para setIsSubmitting, pois a navegação acontece em caso de sucesso
    };

    return(
        <section className={styles.display}>
            <div className={styles.title}>
                <div className={styles.information}>
                    <h1>Investimento, Inovação & Urgência</h1> {/* Corrigido: Investimento */}
                    <h2>Etapa 4 de 4</h2>
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
                     {/* Botão Voltar (pode usar NavButton ou Link simples) */}
                     <button
                        className={styles.pink_button} // Use a classe CSS existente
                        onClick={() => router.push('/forms/ThirdPart')} // Navegação simples para voltar
                     >
                         <ArrowLeft/>
                         <p>Voltar</p>
                     </button>

                    {/* Botão Próximo/Finalizar */}
                     <button
                        className={allAnswered ? styles.pink_button : styles.pink_button_unavailable} // Estilo dinâmico
                        onClick={handleNext}
                        disabled={!allAnswered || isSubmitting} // Desabilita se não respondeu tudo ou está enviando
                     >
                        {isSubmitting ? (
                             <>
                                 <span className="animate-spin mr-2">⏳</span> {/* Feedback visual */}
                                 <p>Enviando...</p>
                             </>
                        ) : (
                             <>
                                 <p>Ver Diagnóstico</p>
                                 <ArrowRight/>
                             </>
                        )}
                     </button>
                </div>
            </div>
        </section>
    );
}