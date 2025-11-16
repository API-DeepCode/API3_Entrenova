import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderWrapper from "@/components/globals/HeaderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepCode",
  description: "Diagnóstico Inteligente de Treinamentos e Mercado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} dark`}>
        {/* Header agora é montado por um wrapper client-side */}
        <HeaderWrapper />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}