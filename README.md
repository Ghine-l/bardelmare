# Bar del Mare — Guida al Setup

## Installazione

```bash
npm install
npm run dev
```

---

## Configurazione Firebase (obbligatoria per ordini + admin)

### 1. Crea il progetto Firebase
1. Vai su [console.firebase.google.com](https://console.firebase.google.com)
2. **Crea un nuovo progetto** → nome: `bar-del-mare`
3. Disabilita Google Analytics se non ti serve

### 2. Aggiungi l'app Web
1. Nella home del progetto → icona `</>` (Web)
2. Nome app: `bar-del-mare-web`
3. **Copia il blocco `firebaseConfig`** che ti mostra

### 3. Incolla la config
Apri `src/firebase/config.js` e sostituisci i valori placeholder:

```js
const firebaseConfig = {
  apiKey:            'la-tua-api-key',
  authDomain:        'il-tuo-progetto.firebaseapp.com',
  projectId:         'il-tuo-progetto',
  storageBucket:     'il-tuo-progetto.appspot.com',
  messagingSenderId: '123456789',
  appId:             '1:123:web:abc',
}
```

### 4. Abilita Firestore
1. Sidebar Firebase → **Firestore Database** → Crea database
2. Scegli **Modalità produzione**
3. Vai in **Regole** e incolla:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ordini/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 5. Abilita Authentication
1. Sidebar → **Authentication** → Inizia
2. Provider → **Email/Password** → Abilita
3. Vai in **Users** → **Aggiungi utente**
4. Inserisci email e password dell'admin (es. `admin@bardelmare.it`)

---

## URL del sito

| Percorso | Descrizione |
|---|---|
| `/` | Sito pubblico |
| `/ordina?tavolo=7` | Pagina ordine QR per il tavolo 7 |
| `/admin/login` | Login admin (non linkato pubblicamente) |
| `/admin` | Dashboard ordini in tempo reale |

## QR Code per i tavoli

Per ogni tavolo, genera un QR code che punta a:
```
https://tuo-dominio.com/ordina?tavolo=NUMERO_TAVOLO
```

Puoi usare [qr-code-generator.com](https://www.qr-code-generator.com) o qualsiasi generatore online.

---

## Flusso degli ordini

```
Cliente scansiona QR → /ordina?tavolo=5
    ↓ sceglie dal menu e conferma
    ↓ ordine salvato su Firestore (status: "nuovo")

Admin apre /admin → dashboard in tempo reale
    ↓ suono di notifica per ogni nuovo ordine
    ↓ "Prendi in carico" → status: "in_carico"
    ↓ "Segna come pronto" → status: "pronto"
    ↓ "Consegnato" → status: "consegnato"
```

---

## Deploy (opzionale)

```bash
npm run build
# Carica la cartella dist/ su Vercel, Netlify o Firebase Hosting
```

Per Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```
