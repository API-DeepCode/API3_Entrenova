// app/payment/page.tsx
import TelaPagamento from "@/components/TelaPagamento/TelaPagamento";


export default function PaymentPage() {
    return (
        // ❌ Errado: Retorna a referência à função/componente
        // TelaPagamento 
        
        // ✅ Correto: Chama o componente como uma tag JSX para que ele seja renderizado
        <TelaPagamento />
    );
}