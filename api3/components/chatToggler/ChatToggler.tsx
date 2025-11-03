import React, { useState, useEffect } from 'react'; // <--- 1. Importe useEffect
import { Chatbot } from '../globals/chatbot';

// --- 💬 Estilos do botão e do contêiner ---
const buttonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '65px',
  height: '65px',
  borderRadius: '50%',
  background: 'linear-gradient(to right, #f472b6, #ec4899, #c084fc)',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '28px',
  fontWeight: 'bold',
  zIndex: 1000,
  boxShadow: '0 6px 14px rgba(0, 0, 0, 0.35)',
  transition: 'all 0.25s ease-in-out',
};

// Efeito ao passar o mouse
const hoverStyle: React.CSSProperties = {
  transform: 'scale(1.1)',
  boxShadow: '0 8px 18px rgba(0, 0, 0, 0.45)',
};

const chatWrapperStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '90px',
  right: '20px',
  zIndex: 999,
  animation: 'slideUp 0.3s ease-out', // A animação será injetada pelo useEffect
};

// Remova estas linhas daqui:
// const globalStyle = document.createElement('style');
// globalStyle.innerHTML = `...`;
// document.head.appendChild(globalStyle);

export const ChatToggler: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  // 2. Mova a lógica que usa 'document' para dentro do useEffect
  useEffect(() => {
    // Este código só vai rodar no navegador
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(globalStyle);

    // 3. (Boa prática) Função de limpeza
    return () => {
      document.head.removeChild(globalStyle);
    };
  }, []); // 4. Array vazio para rodar só uma vez

  const toggleChat = () => setIsOpen(!isOpen);
  const handleCloseChat = () => setIsOpen(false);

  return (
    <>
      {/* 🪟 Janela do Chat */}
      {isOpen && (
        <div style={chatWrapperStyle}>
          <Chatbot onClose={handleCloseChat} titulo="Ajuda Rápida" />
        </div>
      )}

      {/* 🎨 Botão flutuante */}
      <button
        style={{
          ...buttonStyle,
          ...(hover ? hoverStyle : {}),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={toggleChat}
        title={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
};