import { FormsQuestions } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Props {
    questionData: FormsQuestions;
    answers: Record<string, string | string[]>;
    handleSelect: (question: string, answer: string | string[]) => void;
}

export default function TypeDefault({ questionData, answers, handleSelect }: Props) {
    const { question, options = [] } = questionData;
    const selected = answers[question] as string | undefined;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium leading-tight">{question}</h2>

            <div className="flex flex-col gap-2">
                {options.map((option) => {
                    const isActive = selected === option;
                    return (
                        <Button
                            key={option}
                            type="button"
                            aria-pressed={isActive}
                            variant="outline"
                            className={
                                "group relative justify-start h-12 rounded-lg text-left transition-all border px-3 pr-4 flex gap-3 items-center " +
                                (isActive
                                    ? "border-[#6b54e5] bg-[#2a2150] text-white shadow-[0_0_0_1px_rgba(107,84,229,0.55)] hover:bg-[#342563]"
                                    : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 focus-visible:bg-white/10")
                            }
                            onClick={() => handleSelect(question, option)}
                        >
                            <span
                              className={
                                "inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs transition-colors " +
                                (isActive
                                  ? "border-[#6b54e5] bg-[#6b54e5] text-white"
                                  : "border-white/25 text-white/40 group-hover:border-white/40")
                              }
                              aria-hidden="true"
                            >
                              {isActive && <Check className="h-4 w-4" />}
                            </span>
                            <span className="flex-1 leading-snug">
                              {option}
                            </span>
                            {isActive && (
                              <span className="absolute inset-0 rounded-lg ring-2 ring-[#6b54e5]/40 pointer-events-none" />
                            )}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}