import { FormsQuestions } from "@/lib/type";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    questionData: FormsQuestions;
    answers: Record<string, string | string[]>;
    handleSelect: (question: string, answer: string | string[]) => void;
}

export default function TypeOpen({ questionData, answers, handleSelect }: Props) {
    const { question } = questionData;
    const value = (answers[question] as string) || "";

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-medium leading-tight">{question}</h2>
            <Textarea
                placeholder="Digite sua resposta..."
                value={value}
                onChange={(e) => handleSelect(question, e.target.value)}
                aria-label={`Resposta para: ${question}`}
                className="min-h-24"
            />
        </div>
    );
}