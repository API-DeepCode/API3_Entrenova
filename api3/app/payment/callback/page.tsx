"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, CheckCircle2, AlertTriangle, Lock } from "lucide-react";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "";
  const redirect = searchParams.get("redirect") || "/dashboard";
  const unlockToken = searchParams.get("token") || null;

  const isPaid = useMemo(
    () => ["paid", "success", "approved"].includes(status.toLowerCase()),
    [status]
  );

  useEffect(() => {
    // Quando o provedor de pagamento redirecionar para cá com status=paid
    // marcamos localmente o desbloqueio e encaminhamos para a página de resposta.
    if (isPaid) {
      localStorage.setItem("ai_report_unlocked", "true");
      const redirectUrl = redirect.includes("?")
        ? `${redirect}&status=paid`
        : `${redirect}?status=paid`;
      const timer = setTimeout(() => {
        router.replace(redirectUrl);
      }, 1600);
      return () => clearTimeout(timer);
    }

    // Se chegou sem status pago, volta para planos para refazer o pagamento.
    const timer = setTimeout(() => {
      router.replace("/plans");
    }, 2500);
    return () => clearTimeout(timer);
  }, [isPaid, redirect, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b031f] via-[#2b1364] to-[#050013] text-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        {isPaid ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Pagamento confirmado</h1>
            <p className="text-sm text-white/75">
              Pagamento confirmado. Redirecionando para o dashboard...
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Pagamento não liberado</h1>
            <p className="text-sm text-white/70">
              Não recebemos confirmação de pagamento. Voltando para os planos...
            </p>
          </>
        )}

        {!isPaid && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/60">
            <Lock className="h-4 w-4" />
            <span>O acesso ao relatório continua bloqueado.</span>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center text-primary">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      </div>
    </main>
  );
}
