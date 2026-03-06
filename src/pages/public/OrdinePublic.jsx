import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { voci, categorie } from '../../data/menuData'
import { creaOrdine } from '../../firebase/ordini'

const STEP = { MENU: 'menu', CART: 'cart', NOTE: 'note', SUCCESS: 'success' }

export default function OrdinePublic() {
  const [params]      = useSearchParams()
  const tavolo        = params.get('tavolo') || '?'

  const [step,       setStep]       = useState(STEP.MENU)
  const [catAttiva,  setCatAttiva]  = useState('cocktail')
  const [carrello,   setCarrello]   = useState([])
  const [note,       setNote]       = useState('')
  const [loading,    setLoading]    = useState(false)
  const [errore,     setErrore]     = useState('')

  const aggiungi = (voce) => setCarrello(prev => {
    const ex = prev.find(i => i.id === voce.id)
    return ex ? prev.map(i => i.id === voce.id ? { ...i, qty: i.qty + 1 } : i)
              : [...prev, { ...voce, qty: 1 }]
  })
  const rimuovi = (id) => setCarrello(prev => {
    const item = prev.find(i => i.id === id)
    return !item ? prev
      : item.qty === 1 ? prev.filter(i => i.id !== id)
      : prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
  })

  const totale = carrello.reduce((s, i) => s + i.prezzo * i.qty, 0)
  const nItems = carrello.reduce((s, i) => s + i.qty, 0)
  const filtrate = voci.filter(v => v.cat === catAttiva)

  const inviaOrdine = async () => {
    if (carrello.length === 0) return
    setLoading(true)
    setErrore('')
    try {
      await creaOrdine({
        tavolo,
        items: carrello.map(i => ({ id: i.id, nome: i.nome, prezzo: i.prezzo, qty: i.qty })),
        note,
      })
      setStep(STEP.SUCCESS)
    } catch (e) {
      setErrore('Errore nell\'invio. Riprova o chiama il personale.')
    } finally {
      setLoading(false)
    }
  }

  // ── SUCCESS ──────────────────────────────────────────────────────────────────
  if (step === STEP.SUCCESS) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h1 className="font-poster font-black text-salt text-4xl uppercase mb-3"
          style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
          Ordine inviato!
        </h1>
        <p className="text-salt/50 text-sm leading-relaxed max-w-xs mb-2">
          Il bar ha ricevuto il tuo ordine per il <strong className="text-wave">Tavolo {tavolo}</strong>.
        </p>
        <p className="text-salt/30 text-xs">Arriva tra pochi minuti ☀️</p>
        <button
          onClick={() => { setCarrello([]); setNote(''); setStep(STEP.MENU) }}
          className="mt-10 text-xs tracking-widest uppercase text-wave border border-wave/30 px-6 py-3 hover:bg-wave/10 transition-colors">
          Fai un altro ordine
        </button>
      </div>
    )
  }

  // ── NOTE step ────────────────────────────────────────────────────────────────
  if (step === STEP.NOTE) {
    return (
      <div className="min-h-screen bg-sand px-6 py-10 flex flex-col">
        <button onClick={() => setStep(STEP.CART)} className="flex items-center gap-2 text-salt/40 hover:text-salt text-xs tracking-widest uppercase mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Indietro
        </button>
        <h2 className="font-poster font-black text-salt text-3xl uppercase mb-1"
          style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
          Note per il bar
        </h2>
        <p className="text-salt/40 text-sm mb-6">Allergie, preferenze, richieste speciali…</p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Es: senza ghiaccio, allergia alle noci, extra lime..."
          rows={5}
          className="w-full bg-sand-surface border border-white/10 text-salt text-sm p-4 outline-none focus:border-wave/50 resize-none transition-colors placeholder-salt/20"
        />

        {errore && <p className="text-red-400 text-xs mt-4">{errore}</p>}

        {/* Riepilogo rapido */}
        <div className="mt-6 border border-white/5 p-4 space-y-1">
          {carrello.map(i => (
            <div key={i.id} className="flex justify-between text-sm">
              <span className="text-salt/60"><span className="text-wave font-bold">{i.qty}×</span> {i.nome}</span>
              <span className="text-salt/60">€{(i.prezzo * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-white/5 pt-2 flex justify-between font-semibold">
            <span className="text-salt/40 text-xs uppercase tracking-wide">Totale</span>
            <span className="text-wave font-poster font-black text-xl"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
              €{totale.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={inviaOrdine}
          disabled={loading}
          className="mt-6 w-full bg-wave hover:bg-wave-bright text-white font-semibold text-sm tracking-wide py-4 transition-all disabled:opacity-50"
          style={{ boxShadow: '0 0 30px rgba(37,99,235,.3)' }}>
          {loading ? 'Invio in corso…' : 'Conferma ordine'}
        </button>
      </div>
    )
  }

  // ── CART step ────────────────────────────────────────────────────────────────
  if (step === STEP.CART) {
    return (
      <div className="min-h-screen bg-sand px-6 py-10 flex flex-col">
        <button onClick={() => setStep(STEP.MENU)} className="flex items-center gap-2 text-salt/40 hover:text-salt text-xs tracking-widest uppercase mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Continua a ordinare
        </button>
        <h2 className="font-poster font-black text-salt text-3xl uppercase mb-6"
          style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
          Il tuo carrello
        </h2>

        {carrello.length === 0
          ? <p className="text-salt/30 text-sm">Nessun articolo nel carrello.</p>
          : (
            <div className="space-y-3 flex-1">
              {carrello.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-sand-surface px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-salt text-sm font-medium truncate">{item.nome}</p>
                    <p className="text-wave text-xs font-bold">€{item.prezzo}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => rimuovi(item.id)}
                      className="w-8 h-8 flex items-center justify-center border border-white/15 text-salt/60 hover:text-white text-lg transition-colors">
                      −
                    </button>
                    <span className="text-white font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => aggiungi(item)}
                      className="w-8 h-8 flex items-center justify-center bg-wave/20 hover:bg-wave text-wave hover:text-white text-lg transition-all">
                      +
                    </button>
                  </div>
                  <span className="text-salt/50 text-sm w-14 text-right shrink-0">
                    €{(item.prezzo * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/5 pt-4 flex justify-between items-center px-1">
                <span className="text-salt/40 text-xs uppercase tracking-widest">Totale</span>
                <span className="font-poster font-black text-wave text-3xl"
                  style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                  €{totale.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => setStep(STEP.NOTE)}
                className="w-full mt-4 bg-wave hover:bg-wave-bright text-white font-semibold text-sm tracking-wide py-4 transition-all"
                style={{ boxShadow: '0 0 30px rgba(37,99,235,.3)' }}>
                Procedi →
              </button>
            </div>
          )
        }
      </div>
    )
  }

  // ── MENU step (default) ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-sand flex flex-col">
      {/* Header fisso */}
      <div className="sticky top-0 z-30 bg-sand/95 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <svg width="20" height="14" viewBox="0 0 32 22" fill="none">
              <path d="M0 14 C5 8,10 18,16 12 C22 6,27 16,32 10" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="font-poster font-black text-salt text-base uppercase tracking-wide"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
              Bar <span className="text-wave">del Mare</span>
            </span>
          </div>
          <p className="text-salt/30 text-xs">Tavolo <strong className="text-wave">{tavolo}</strong></p>
        </div>
        {nItems > 0 && (
          <button onClick={() => setStep(STEP.CART)}
            className="relative flex items-center gap-2 bg-wave text-white text-xs font-semibold tracking-wide px-4 py-2.5 transition-all hover:bg-wave-bright">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Carrello
            <span className="bg-white text-wave text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
              {nItems}
            </span>
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="sticky top-[73px] z-20 bg-sand border-b border-white/5 px-6 py-3 flex gap-2 overflow-x-auto">
        {categorie.map(c => (
          <button key={c.id} onClick={() => setCatAttiva(c.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
              catAttiva === c.id ? 'bg-wave text-white' : 'bg-sand-surface text-salt/50 hover:text-salt'
            }`}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex-1 px-4 py-4 space-y-2">
        {filtrate.map(v => {
          const inCart = carrello.find(i => i.id === v.id)
          return (
            <div key={v.id} className="flex items-center gap-3 bg-sand-light px-4 py-4 border border-white/5">
              <div className="flex-1 min-w-0">
                {v.tag && (
                  <span className="text-xs text-wave border border-wave/30 bg-wave/10 px-2 py-0.5 mb-1 inline-block">
                    {v.tag}
                  </span>
                )}
                <p className="text-salt font-medium text-sm leading-snug">{v.nome}</p>
                <p className="text-salt/40 text-xs mt-0.5 leading-snug line-clamp-2">{v.desc}</p>
                <p className="text-wave font-poster font-black text-lg mt-1"
                  style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                  €{v.prezzo}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {inCart && (
                  <>
                    <button onClick={() => rimuovi(v.id)}
                      className="w-8 h-8 flex items-center justify-center border border-white/15 text-salt/60 hover:text-white text-lg transition-colors">
                      −
                    </button>
                    <span className="text-white font-bold w-5 text-center text-sm">{inCart.qty}</span>
                  </>
                )}
                <button onClick={() => aggiungi(v)}
                  className="w-8 h-8 flex items-center justify-center bg-wave/20 hover:bg-wave text-wave hover:text-white text-lg transition-all">
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
