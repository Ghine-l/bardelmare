import React, { useState } from 'react'
import { voci, categorie } from '../data/menuData'
import { creaOrdine } from '../firebase/ordini'

// Tavolo demo per la sezione nel sito principale (non via QR reale)
const TAVOLO_DEMO = 'DEMO'

export default function OrdineQR() {
  const [carrello,  setCarrello]  = useState([])
  const [catAttiva, setCatAttiva] = useState('cocktail')
  const [sent,      setSent]      = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [errore,    setErrore]    = useState('')

  const aggiungi = (voce) => {
    setCarrello(prev => {
      const exist = prev.find(i => i.id === voce.id)
      return exist
        ? prev.map(i => i.id === voce.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...voce, qty: 1 }]
    })
  }
  const rimuovi = (id) => setCarrello(prev => {
    const item = prev.find(i => i.id === id)
    if (!item) return prev
    return item.qty === 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
  })

  const totale   = carrello.reduce((s, i) => s + i.prezzo * i.qty, 0)
  const nItems   = carrello.reduce((s, i) => s + i.qty, 0)
  const filtrate = voci.filter(v => v.cat === catAttiva)

  const invia = async () => {
    if (carrello.length === 0) return
    setLoading(true)
    setErrore('')
    try {
      await creaOrdine({
        tavolo: TAVOLO_DEMO,
        items: carrello.map(i => ({ id: i.id, nome: i.nome, prezzo: i.prezzo, qty: i.qty })),
        note: '(ordine demo dal sito)',
      })
      setSent(true)
      setTimeout(() => { setSent(false); setCarrello([]) }, 3500)
    } catch {
      setErrore('Firebase non configurato. Configura src/firebase/config.js.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ordina" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-14">
          <p className="text-sun text-xs font-semibold tracking-widest uppercase mb-3">Funzione QR Code</p>
          <h2
            className="font-poster font-black uppercase leading-none text-salt"
            style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            Ordina dal<br /><span className="italic" style={{ color: '#f59e0b' }}>tuo tavolo</span>
          </h2>
          <p className="text-salt/40 text-sm mt-4 max-w-md leading-relaxed">
            Ogni tavolo ha un QR code unico. Scansiona, scegli, conferma — il bar riceve l'ordine in tempo reale senza che tu ti alzi.
          </p>
        </div>

        {/* How it works — 3 step */}
        <div className="reveal grid md:grid-cols-3 gap-px bg-white/5 mb-16">
          {[
            { num: '01', title: 'Scansiona il QR', desc: 'Ogni tavolo ha il suo codice. Punta la fotocamera, si apre il menu.' },
            { num: '02', title: 'Scegli & aggiungi', desc: 'Sfoglia il menu completo, aggiungi al carrello, personalizza.' },
            { num: '03', title: 'Conferma l\'ordine', desc: 'Il bar riceve immediatamente. Il servizio arriva al tuo ombrellone.' },
          ].map(s => (
            <div key={s.num} className="bg-sand p-8">
              <p className="font-poster font-black text-6xl md:text-7xl leading-none mb-4"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, color: 'rgba(37,99,235,.2)' }}>
                {s.num}
              </p>
              <h3 className="font-poster font-700 text-salt text-2xl mb-2 uppercase"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}>
                {s.title}
              </h3>
              <p className="text-salt/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive demo */}
        <div className="reveal grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left: mini order panel */}
          <div className="bg-sand border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="qr-pulse w-8 h-8 bg-wave flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z"/>
                </svg>
              </div>
              <div>
                <p className="text-salt text-sm font-medium">Tavolo 7 — Demo</p>
                <p className="text-salt/30 text-xs">Prova il sistema di ordinazione</p>
              </div>
            </div>

            {/* Category tabs mini */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {categorie.map(c => (
                <button key={c.id} onClick={() => setCatAttiva(c.id)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    catAttiva === c.id ? 'bg-wave text-white' : 'bg-sand-surface text-salt/50 hover:text-salt'
                  }`}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>

            {/* Items list */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filtrate.map(v => {
                const inCart = carrello.find(i => i.id === v.id)
                return (
                  <div key={v.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-sand-surface hover:bg-sand-mid transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-salt text-sm font-medium truncate">{v.nome}</p>
                      <p className="text-wave text-xs font-bold">€{v.prezzo}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {inCart && (
                        <>
                          <button onClick={() => rimuovi(v.id)}
                            className="w-6 h-6 flex items-center justify-center border border-white/15 text-salt/60 hover:text-white hover:border-white/30 text-sm transition-colors">
                            −
                          </button>
                          <span className="text-wave font-bold text-sm w-5 text-center">{inCart.qty}</span>
                        </>
                      )}
                      <button onClick={() => aggiungi(v)}
                        className="w-6 h-6 flex items-center justify-center bg-wave/20 hover:bg-wave text-wave hover:text-white text-sm font-bold transition-all">
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: cart */}
          <div className="bg-sand border border-white/5 p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
              <h3 className="font-poster font-700 text-salt text-xl uppercase"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}>
                Il tuo ordine
              </h3>
              {nItems > 0 && (
                <span className="bg-wave text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {nItems}
                </span>
              )}
            </div>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p className="text-salt font-medium">Ordine inviato!</p>
                <p className="text-salt/40 text-xs mt-1">Il bar lo sta preparando ☀️</p>
              </div>
            ) : carrello.length === 0 ? (
              <p className="text-salt/25 text-sm text-center py-8">Aggiungi qualcosa al carrello</p>
            ) : (
              <>
                <div className="space-y-3 mb-5 max-h-52 overflow-y-auto">
                  {carrello.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-2">
                      <span className="text-salt/70 text-sm flex-1 truncate">
                        <span className="text-wave font-bold">{item.qty}×</span> {item.nome}
                      </span>
                      <span className="text-salt text-sm font-medium shrink-0">€{(item.prezzo * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4 mb-5 flex justify-between items-center">
                  <span className="text-salt/50 text-sm">Totale</span>
                  <span className="font-poster font-black text-wave text-2xl"
                    style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                    €{totale.toFixed(2)}
                  </span>
                </div>
                {errore && <p className="text-red-400 text-xs mt-2">{errore}</p>}
                <button onClick={invia} disabled={loading}
                  className="w-full bg-wave hover:bg-wave-bright text-white text-sm font-semibold tracking-wide py-4 transition-all hover:shadow-[0_0_24px_rgba(37,99,235,.5)] disabled:opacity-50 mt-2">
                  {loading ? 'Invio in corso…' : 'Invia ordine al bar'}
                </button>
                <button onClick={() => setCarrello([])}
                  className="w-full mt-2 text-salt/30 hover:text-salt/60 text-xs tracking-wide py-2 transition-colors">
                  Svuota carrello
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
