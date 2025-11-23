"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, CreditCard, ShieldCheck, Sparkles, Users } from "lucide-react";
import "./TelaPagamento.css";

type PlanoKey = "ouro" | "diamante" | "premium";

interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface PlanoInfo {
  nome: string;
  preco: number;
  beneficios: string[];
  destaque: string;
}

const planos: Record<PlanoKey, PlanoInfo> = {
  ouro: {
    nome: "Ouro",
    preco: 690,
    destaque: "Para equipes que querem iniciar com trilhas guiadas e onboarding rapido.",
    beneficios: [
      "3 trilhas prioritarias habilitadas em 48h",
      "Onboarding assistido para 15 colaboradores",
      "Relatorios essenciais de progresso",
      "Suporte via e-mail",
    ],
  },
  diamante: {
    nome: "Diamante",
    preco: 1290,
    destaque: "Para quem precisa acelerar rollout e acompanhar indicadores.",
    beneficios: [
      "8 trilhas personalizadas liberadas em 72h",
      "Onboarding de equipe com importacao em massa",
      "Relatorios avancados e painel executivo",
      "Suporte prioritario e horario estendido",
    ],
  },
  premium: {
    nome: "Premium",
    preco: 2190,
    destaque: "Para rollout em grande escala e integracao com sistemas internos.",
    beneficios: [
      "Trilhas ilimitadas + jornada gamificada",
      "Onboarding de equipe com gestor dedicado",
      "SLAs de suporte e canal direto",
      "Integracoes e SSO incluidos",
    ],
  },
};

const initialData: CardData = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

const TelaPagamento: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<CardData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<PlanoKey>("ouro");

  useEffect(() => {
    const fromUrl = (searchParams.get("plano") || searchParams.get("plan")) as PlanoKey | null;
    if (fromUrl && planos[fromUrl]) {
      setPlanoSelecionado(fromUrl);
    }
  }, [searchParams]);

  const plano = useMemo(() => planos[planoSelecionado], [planoSelecionado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const groups = cleaned.match(/.{1,4}/g) || [];
      setData((prev) => ({ ...prev, [name]: groups.join(" ") }));
    } else if (name === "expiryDate") {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      let formattedValue = cleanedValue;

      if (cleanedValue.length > 2) {
        formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
      }
      setData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      setData((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    console.log("Finalizando pagamento com os dados:", data, "Plano:", plano.nome);
    setData(initialData);

    const redirectTarget = "/dashboard/colaboradores?onboarding=1";
    const callbackParams = new URLSearchParams({
      status: "paid",
      redirect: redirectTarget,
    });
    router.push(`/payment/callback?${callbackParams.toString()}`);
  };

  return (
    <div className="payment-screen">
      <div className="checkout-shell">
        <header className="checkout-header">
          <div>
            <p className="eyebrow">Checkout das Trilhas</p>
            <h1>Fechamento da compra</h1>
            <p className="subtitle">
              Revise o plano escolhido, conclua o pagamento e ja direcione sua equipe para o onboarding.
            </p>
          </div>
          <div className="secure">
            <ShieldCheck size={16} />
            <span>Pagamento seguro</span>
          </div>
        </header>

        <div className="checkout-grid">
          <section className="payment-panel">
            <div className="panel-header">
              <div className="chip">
                <CreditCard size={16} />
                <span>Dados do cartao</span>
              </div>
              <span className="badge">Etapa 1/2</span>
            </div>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label htmlFor="card-number">Numero do cartao</label>
                <input
                  type="text"
                  id="card-number"
                  name="cardNumber"
                  value={data.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  inputMode="numeric"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="card-holder">Nome do titular</label>
                <input
                  type="text"
                  id="card-holder"
                  name="cardHolder"
                  value={data.cardHolder}
                  onChange={handleChange}
                  placeholder="Nome completo (como no cartao)"
                  required
                />
              </div>

              <div className="row">
                <div className="form-group">
                  <label htmlFor="expiry-date">Validade (MM/AA)</label>
                  <input
                    type="text"
                    id="expiry-date"
                    name="expiryDate"
                    value={data.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={data.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={4}
                  inputMode="numeric"
                  required
                />
              </div>
              </div>

              <div className="onboarding-hint">
                <Sparkles size={16} />
                <div>
                  <p className="hint-title">Proxima etapa: Gestao de Equipe</p>
                  <p className="hint-text">
                    Assim que confirmar o pagamento, voce sera direcionado para cadastrar colaboradores e liberar as trilhas.
                  </p>
                </div>
              </div>

              <button type="submit" className="pay-button" disabled={isProcessing}>
                {isProcessing ? "Processando..." : "Confirmar e ir para Gestao de Equipe"}
              </button>
            </form>
          </section>

          <aside className="summary-panel">
            <div className="panel-header">
              <div className="chip">
                <BadgeCheck size={16} />
                <span>Resumo do pedido</span>
              </div>
              <span className="badge">Plano {plano.nome}</span>
            </div>

            <div className="plan-selector">
              {(Object.keys(planos) as PlanoKey[]).map((key) => {
                const item = planos[key];
                const active = planoSelecionado === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`plan-pill ${active ? "active" : ""}`}
                    onClick={() => setPlanoSelecionado(key)}
                    aria-pressed={active}
                  >
                    <div>
                      <p className="pill-title">{item.nome}</p>
                      <p className="pill-subtitle">{item.destaque}</p>
                    </div>
                    <span className="pill-price">{formatBRL(item.preco)}/mes</span>
                  </button>
                );
              })}
            </div>

            <div className="benefits">
              <p className="benefits-title">Beneficios inclusos</p>
              <ul>
                {plano.beneficios.map((benefit) => (
                  <li key={benefit}>
                    <Users size={14} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="totals">
              <div className="line">
                <span>Subtotal</span>
                <strong>{formatBRL(plano.preco)}</strong>
              </div>
              <div className="line">
                <span>Taxas</span>
                <strong>R$ 0</strong>
              </div>
              <div className="divider" />
              <div className="line total">
                <span>Total</span>
                <strong>{formatBRL(plano.preco)}</strong>
              </div>
              <p className="footnote">Cobrado mensalmente. Ajuste de plano pode ser feito no dashboard.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TelaPagamento;
