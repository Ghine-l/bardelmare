// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAZIONE FIREBASE
// ─────────────────────────────────────────────────────────────────────────────
// 1. Vai su https://console.firebase.google.com
// 2. Crea un nuovo progetto (es. "bar-del-mare")
// 3. Aggiungi un'app Web (icona </> nella home del progetto)
// 4. Copia i valori del tuo firebaseConfig qui sotto
// 5. Nel progetto Firebase:
//    - Abilita Firestore Database (modalità produzione)
//    - Abilita Authentication → Email/Password
//    - Crea un utente admin: Authentication → Users → Add user
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwGe_Yq8b9xoqIWDx-W36m_QWHzipXOm0",
  authDomain: "bardelmare-a41d4.firebaseapp.com",
  projectId: "bardelmare-a41d4",
  storageBucket: "bardelmare-a41d4.firebasestorage.app",
  messagingSenderId: "398048696225",
  appId: "1:398048696225:web:f86ed9e21f19ea3b4adde0",
  measurementId: "G-9HT76M1P9R"
};

// 1. Inizializza l'app
const app = initializeApp(firebaseConfig);

// 2. Inizializza e ESPORTA l'Autenticazione (risolve l'errore nel terminale)
export const auth = getAuth(app);

// 3. Inizializza e ESPORTA il Database (necessario per gli ordini)
export const db = getFirestore(app);

// ─────────────────────────────────────────────────────────────────────────────
// REGOLE FIRESTORE CONSIGLIATE (incolla nella console Firebase → Firestore → Rules)
// ─────────────────────────────────────────────────────────────────────────────
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Gli ordini possono essere scritti da chiunque (clienti al tavolo)
//     // ma letti/modificati solo da utenti autenticati (admin)
//     match /ordini/{ordineId} {
//       allow create: if true;
//       allow read, update, delete: if request.auth != null;
//     }
//   }
// }
// ─────────────────────────────────────────────────────────────────────────────
