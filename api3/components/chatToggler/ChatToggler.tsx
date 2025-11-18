// Caminho: api3/components/chatToggler/ChatToggler.tsx
"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ModernChatbot } from "@/components/globals/ModernChatbot"; 

export function ChatToggler() {
  return (
    <Dialog>
      {/* 1. O Botão Flutuante (Trigger) */}
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,70,135,0.5)] transition-all duration-300 z-50 border-2 border-white/20"
        >
          <MessageCircle size={32} className="text-white" />
        </Button>
      </DialogTrigger>

      {/* 2. O Modal (Conteúdo) */}
      <DialogContent className="max-w-[1000px] w-[95vw] p-0 bg-transparent border-none shadow-none sm:max-w-[1000px] focus:outline-none">
        <DialogTitle className="sr-only">Assistente Virtual</DialogTitle>
        
        {/* 3. O componente ModernChatbot */}
        <ModernChatbot />
        
      </DialogContent>
    </Dialog>
  );
}