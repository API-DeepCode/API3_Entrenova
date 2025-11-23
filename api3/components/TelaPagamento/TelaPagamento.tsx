"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Importa o arquivo de estilos localmente
import './TelaPagamento.css'; 


// Define o tipo para os dados do formulário
interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const initialData: CardData = {
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: '',
};

const TelaPagamento: React.FC = () => {
  const [data, setData] = useState<CardData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'expiryDate') {
        const cleanedValue = value.replace(/[^0-9]/g, '');
        let formattedValue = cleanedValue;

        if (cleanedValue.length > 2) {
            formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
        }
        setData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
        setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    console.log('Finalizando pagamento com os dados:', data);
    setData(initialData);

    // Mostra a tela de confirmacao e redireciona para o dashboard
    const searchParams = new URLSearchParams({
      status: 'paid',
      redirect: '/dashboard',
    });
    router.push(`/payment/callback?${searchParams.toString()}`);
  };

  return (
    <div className="payment-screen">
      <div className="payment-container">
        <h2>
          <span role="img" aria-label="card">💳</span> Finalizar Pagamento
        </h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="card-number">Número do Cartão</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              value={data.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="card-holder">Nome do Titular</label>
            <input
              type="text"
              id="card-holder"
              name="cardHolder"
              value={data.cardHolder}
              onChange={handleChange}
              placeholder="Nome Completo (como no cartão)"
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
                required
              />
            </div>
          </div>

          <button type="submit" className="pay-button" disabled={isProcessing}>
            {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TelaPagamento;
