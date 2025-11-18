import { FormsQuestions } from "@/lib/type";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface Props {
    questionData: FormsQuestions;
    answers: Record<string, string | string[]>;
    handleSelect: (question: string, answer: string | string[]) => void;
}

export default function TypeSlider({ questionData, answers, handleSelect }: Props) {
    const { question } = questionData;
    const initial = Number(answers[question]) || 3;
    const [value, setValue] = useState<number>(initial);

    const onChange = (vals: number[]) => {
        const v = Math.round(vals[0]);
        setValue(v);
        handleSelect(question, String(v));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium leading-tight">{question}</h2>

            <div className="w-full flex flex-col items-center gap-3">
                <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[value]}
                    onValueChange={onChange}
                    aria-label={`Escala de ${question}`}
                    className="w-4/5"
                />

                <div className="w-4/5 flex justify-between text-sm">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <span
                            key={n}
                            className={
                                n === value
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground"
                            }
                        >
                            {n}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}