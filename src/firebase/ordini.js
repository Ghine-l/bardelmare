import {
  collection, addDoc, onSnapshot,
  doc, updateDoc, serverTimestamp, query, orderBy,
} from 'firebase/firestore'
import { db } from './config'

const COL = 'ordini'

// ── STATUS ────────────────────────────────────────────────────────────────────
export const STATUS = {
  NUOVO:       'nuovo',       // appena arrivato
  IN_CARICO:   'in_carico',  // il bar lo sta preparando
  PRONTO:      'pronto',     // pronto per la consegna
  CONSEGNATO:  'consegnato', // consegnato al tavolo
}

export const STATUS_LABEL = {
  nuovo:      '🔵 Nuovo',
  in_carico:  '🟡 In preparazione',
  pronto:     '🟠 Pronto',
  consegnato: '✅ Consegnato',
}

export const STATUS_COLOR = {
  nuovo:      { bg: 'rgba(37,99,235,.15)',  border: 'rgba(37,99,235,.4)',  text: '#93c5fd' },
  in_carico:  { bg: 'rgba(245,158,11,.15)', border: 'rgba(245,158,11,.4)', text: '#fcd34d' },
  pronto:     { bg: 'rgba(249,115,22,.15)', border: 'rgba(249,115,22,.4)', text: '#fdba74' },
  consegnato: { bg: 'rgba(34,197,94,.15)',  border: 'rgba(34,197,94,.4)',  text: '#86efac' },
}

// ── WRITE: crea un nuovo ordine ───────────────────────────────────────────────
export async function creaOrdine({ tavolo, items, note = '' }) {
  const totale = items.reduce((s, i) => s + i.prezzo * i.qty, 0)
  return addDoc(collection(db, COL), {
    tavolo,
    items,
    note,
    totale,
    status:    STATUS.NUOVO,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

// ── WRITE: aggiorna status ────────────────────────────────────────────────────
export async function aggiornaStatus(ordineId, nuovoStatus) {
  return updateDoc(doc(db, COL, ordineId), {
    status:    nuovoStatus,
    updatedAt: serverTimestamp(),
  })
}

// ── WRITE: aggiungi nota admin ────────────────────────────────────────────────
export async function aggiornaNota(ordineId, nota) {
  return updateDoc(doc(db, COL, ordineId), {
    notaAdmin: nota,
    updatedAt: serverTimestamp(),
  })
}

// ── READ: ascolta tutti gli ordini in realtime ────────────────────────────────
export function ascoltaOrdini(callback) {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    const ordini = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    callback(ordini)
  })
}
