import { FormsQuestions } from "@/lib/type";
import TypeDefault from "@/components/forms/QuestionTypes/TypeDefault";
import TypeMultiple from "@/components/forms/QuestionTypes/TypeMultiple";
import TypeSlider from "@/components/forms/QuestionTypes/TypeSlider";
import TypeOpen from "@/components/forms/QuestionTypes/TypeOpen";

interface Props {
    questions: FormsQuestions[];
    answers: Record<string, string | string[]>;
    handleSelect: (question: string, answer: string | string[]) => void;
}

export default function QuestionDisplay({ questions, answers, handleSelect }: Props) {
    if (!questions || !Array.isArray(questions)) {
        return (
            <div>
                Carregando...
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            {questions.map((q) => {
                const commonProps = {
                    questionData: q,
                    answers,
                    handleSelect,
                };

                switch (q.type) {
                    case "multiple":
                        return <TypeMultiple key={q.question} {...commonProps} />;
                    case "slider":
                        return <TypeSlider key={q.question} {...commonProps} />;
                    case "open":
                        return <TypeOpen key={q.question} {...commonProps} />;
                    default:
                        return <TypeDefault key={q.question} {...commonProps} />;
                }
            })}
        </div>
    );
}