import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc, runTransaction, getDoc, increment } from "firebase/firestore";
import { db, auth } from "./firebase"; // reutiliza a instância já inicializada em firebase.tsx
import { User } from "@/lib/type";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// === COUNTER (transacional) ===
// Usamos um documento em 'counters/{collectionName}' para armazenar o último ID
// e garantir incrementos atômicos mesmo em chamadas concorrentes.
export async function reserveNextId(collectionName: string): Promise<number> {
  const counterRef = doc(db, 'counters', collectionName);
  try {
    const nextId = await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(counterRef);
      if (!snap.exists()) {
        transaction.set(counterRef, { lastId: 1 });
        return 1;
      }
      const lastId = (snap.data() as any).lastId || 0;
      const newId = lastId + 1;
      transaction.update(counterRef, { lastId: newId });
      return newId;
    });
    return nextId;
  } catch (error) {
    console.error('Erro ao reservar próximo ID:', error);
    throw error;
  }
}

// === CREATE ===
// addResponse agora aceita uma opção `sharedId` para incluir um campo comum
// (ex: `resposta_id`) em vários documentos que pertençam à mesma submissão.
// Comportamento:
// - se options?.numericDocId fornecido: cria um documento com esse ID (setDoc)
// - se options?.sharedId fornecido: inclui `resposta_id: sharedId` e usa addDoc (ids automáticos)
// - caso contrário: usa addDoc normal
export async function addResponse(collectionName: string, data: any, options?: { sharedId?: number; numericDocId?: number }) {
  try {
    if (options && typeof options.numericDocId === 'number') {
      const docRef = doc(db, collectionName, options.numericDocId.toString());
      const dataWithId = { ...data, id: options.numericDocId };
      await setDoc(docRef, dataWithId);
      console.log('Documento adicionado com ID numérico:', options.numericDocId);
      return options.numericDocId;
    }

    if (options && typeof options.sharedId === 'number') {
      const dataWithShared = { ...data, resposta_id: options.sharedId };
      const docRef = await addDoc(collection(db, collectionName), dataWithShared);
      console.log('Documento adicionado com sharedId:', options.sharedId, ' docId:', docRef.id);
      return docRef.id;
    }

    // comportamento padrão: addDoc com id automático
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Documento adicionado com id automático:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar documento:', error);
    throw error;
  }
}

// === READ ===
export async function getResponses(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    return data;
  } catch (error) {
    console.error("Erro ao obter documentos:", error);
    throw error;
  }
}

// === UPDATE ===
export async function updateResponse(collectionName: string, id: string, newData: any) {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, newData);
    console.log("Documento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
    throw error;
  }
}

// === DELETE ===
export async function deleteResponse(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log("Documento deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar documento:", error);
    throw error;
  }
}

// === SUBCOLLECTION CREATE ===
// Adiciona um documento em uma subcoleção de um documento pai: collection(parentCollection / parentId / subCollectionName)
export async function addSubResponse(parentCollection: string, parentId: number | string, subCollectionName: string, data: any) {
  try {
    const colRef = collection(db, parentCollection, parentId.toString(), subCollectionName);
    const docRef = await addDoc(colRef, data);
    console.log('Subdocument adicionado em', `${parentCollection}/${parentId}/${subCollectionName}`, 'id:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar subdocumento:', error);
    throw error;
  }
}

// ========== Conexões para o Usuário ==========

// Este código serve para gerar um ID como número auto-increment
async function getNextUserId(): Promise<number> {
  const counterRef = doc(db, "counters", "usuarios");

  const counterSnap = await getDoc(counterRef);
  if (counterSnap.exists()) {
    // Atualiza contador existente
    await updateDoc(counterRef, { value: increment(1) });
    const newValue = counterSnap.data().value + 1;
    return newValue;
  } else {
    // Cria o contador se não existir
    await setDoc(counterRef, { value: 1 });
    return 1;
  }
}

// Cadastra usuários
export async function cadastrarUsuario(dados: User) {
  try {
    // Cria o usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      dados.email_contato,
      dados.senha
    );

    const user = userCredential.user;
    const nextId = await getNextUserId();

    // Cria o documento na coleção "Usuario" com o UID do Auth
    await setDoc(doc(db, "Usuario", user.uid), {
      id_usuario: nextId,
      nome_empresa: dados.nome_empresa,
      cnpj: dados.cnpj,
      telefone_contato: dados.telefone_contato,
      nome_responsavel: dados.nome_responsavel,
      email_contato: dados.email_contato,
      cargo_responsavel: dados.cargo_responsavel,
      cidade: dados.cidade,
      createdAt: new Date(),
    });

    console.log("✅ Usuário cadastrado com sucesso!");
    return { success: true, uid: user.uid };
  } catch (error: any) {
    console.error("❌ Erro ao cadastrar usuário:", error);
    return { success: false, error: error.message };
  }
}

// Login do Usuário
export async function loginUsuario(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ Usuário logado com sucesso:", user.uid);
    return { success: true, user };
  } catch (error: any) {
    console.error("❌ Erro ao fazer login:", error.message);

    let errorMessage = "Erro ao fazer login.";
    if (error.code === "auth/invalid-email") errorMessage = "E-mail inválido.";
    if (error.code === "auth/user-not-found") errorMessage = "Usuário não encontrado.";
    if (error.code === "auth/wrong-password") errorMessage = "Senha incorreta.";

    return { success: false, error: errorMessage };
  }
}