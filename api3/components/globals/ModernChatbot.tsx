// Caminho: api3/components/globals/ModernChatbot.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ROTEIRO_CONVERSA } from "./conversas";
import { Trash2, Menu, X, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tipos
type Message = {
  text: string;
  sender: "bot" | "user";
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  currentStep: string;
};

export function ModernChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState("INICIO");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializa com a primeira pergunta
  useEffect(() => {
    const first = ROTEIRO_CONVERSA["INICIO"].pergunta;
    setMessages([{ text: first, sender: "bot" }]);
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (optionText: string, nextId: string) => {
    const userMsg: Message = { text: optionText, sender: "user" };
    const nextStepData = ROTEIRO_CONVERSA[nextId];
    const botMsg: Message = {
      text: nextStepData ? nextStepData.pergunta : "Fim do fluxo.",
      sender: "bot"
    };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setCurrentStep(nextId);
  };

  const restart = () => {
    setCurrentStep("INICIO");
    setMessages([{ text: ROTEIRO_CONVERSA["INICIO"].pergunta, sender: "bot" }]);
  };

  const currentOptions = ROTEIRO_CONVERSA[currentStep]?.opcoes || [];

  const MessageBubble = ({ msg }: { msg: Message }) => {
    const isBot = msg.sender === "bot";
    return (
      <div
        className={
          isBot
            ? "self-start px-4 py-2 rounded-2xl rounded-tl-md text-sm leading-relaxed bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-left"
            : "self-end px-4 py-2 rounded-2xl rounded-tr-md text-sm leading-relaxed bg-gradient-to-r from-[#3d2a8f] to-[#6b54e5] text-white shadow-md animate-in fade-in slide-in-from-right"
        }
      >
        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br/>") }} />
      </div>
    );
  };

  return (
    <div className="flex w-full h-full items-center justify-center p-2 sm:p-6">
      <div className="flex flex-col w-full max-w-[900px] h-[80vh] sm:h-[70vh] rounded-xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-[#12121a]/80 via-[#181826]/80 to-[#12121a]/80 border border-white/10 shadow-[0_0_1px_1px_rgba(255,255,255,0.08),0_8px_32px_-4px_rgba(0,0,0,0.55)]">
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 font-medium text-sm text-white tracking-wide">
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">Assistente Entrenova</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={restart}
            className="ml-auto h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
            title="Reiniciar"
          >
            <RefreshCcw size={16} />
          </Button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {messages.map((m, i) => (
            <MessageBubble key={i + m.text.slice(0,10)} msg={m} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Footer Options */}
        <div className="sticky bottom-0 px-5 py-4 border-t border-white/10 bg-black/30 backdrop-blur-md">
          {currentOptions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {currentOptions.map((op, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="text-white/90 border-white/15 hover:bg-white/10 hover:border-white/30 text-xs sm:text-sm font-normal"
                  onClick={() => handleOptionClick(op.texto, op.proximoId)}
                >
                  {op.texto}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              variant="secondary"
              className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white hover:opacity-90"
              onClick={restart}
            >
              Reiniciar Conversa
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}