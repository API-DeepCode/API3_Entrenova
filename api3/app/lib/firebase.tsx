// Caminho: api3/app/lib/firebase.tsx

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; // <<< Importar isSupported
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"; // 👈 IMPORTANTE

// Configuração do Firebase (mantida - considere usar variáveis de ambiente)
const firebaseConfig = {
  apiKey: "AIzaSyD1mgp70rriiybQ9uVrhsrRehzhReH18jI",
  authDomain: "api3-deepcode.firebaseapp.com",
  projectId: "api3-deepcode",
  storageBucket: "api3-deepcode.appspot.com", // <<< Corrigido (removido firebasestorage)
  messagingSenderId: "306333446185",
  appId: "1:306333446185:web:27b629cbb3ba32fb3cec38",
  measurementId: "G-4LYWHE6XZT"
};

// Inicializa Firebase App (mantido)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Inicializa Firestore (mantido)
const db = getFirestore(app);
const auth = getAuth(app);

// --- CORREÇÃO: Inicializa Analytics condicionalmente ---
let analytics: any; // Declara a variável fora

// Verifica se o código está a correr no navegador (client-side) ANTES de inicializar
if (typeof window !== 'undefined') {
  // Apenas no navegador, verifica se o Analytics é suportado
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app); // Inicializa SÓ SE suportado
      console.log("Firebase Analytics inicializado (client-side).");
    } else {
      console.log("Firebase Analytics não é suportado neste navegador.");
    }
  }).catch(err => {
      console.error("Erro ao verificar suporte do Firebase Analytics:", err);
  });

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      try {
        await signInAnonymously(auth);
        console.log("Usuário autenticado anonimamente no Firebase 🔑");
      } catch (error) {
        console.error("Erro ao autenticar anonimamente:", error);
      }
    } else {
      console.log("Usuário já autenticado:", user.uid);
    }
  });
} else {
    // No servidor, analytics permanecerá undefined
    console.log("Firebase Analytics não inicializado (server-side).")
}
// --------------------------------------------------------

// Exporta as instâncias (analytics pode ser undefined no servidor)
export { app, db, auth, analytics, firebaseConfig };