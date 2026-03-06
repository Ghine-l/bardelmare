import React, { useState } from 'react'
import { categorie, voci } from '../data/menuData'

export default function MenuDigitale() {
  const [attiva, setAttiva] = useState('cocktail')

  const filtrate = voci.filter(v => v.cat === attiva)

  return (
    <section id="menu" className="py-20 md:py-28 bg-sand">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-wave text-xs font-semibold tracking-widest uppercase mb-3">Menu digitale</p>
            <h2
              className="font-poster font-black uppercase leading-none text-salt"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              Cosa<br /><span className="text-wave italic">beviamo?</span>
            </h2>
          </div>
          <p className="text-salt/40 text-sm max-w-xs leading-relaxed">
            Scansiona il QR code al tavolo per ordinare direttamente. O sfoglia qui sotto.
          </p>
        </div>

        {/* Category tabs */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {categorie.map(cat => (
            <button
              key={cat.id}
              onClick={() => setAttiva(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 border ${
                attiva === cat.id
                  ? 'bg-wave border-wave text-white shadow-[0_0_20px_rgba(37,99,235,.4)]'
                  : 'bg-transparent border-white/10 text-salt/50 hover:border-white/25 hover:text-salt'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtrate.map(v => (
            <div key={v.id}
              className="bg-sand-light p-6 hover:bg-sand-mid transition-colors duration-200 group relative">

              {v.tag && (
                <span className="inline-block mb-3 text-xs font-semibold tracking-wide text-wave border border-wave/30 px-2.5 py-0.5 bg-wave/10">
                  {v.tag}
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-poster font-700 text-salt text-xl leading-tight"
                  style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}>
                  {v.nome}
                </h3>
                <span className="font-poster font-black text-wave text-2xl shrink-0"
                  style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                  €{v.prezzo}
                </span>
              </div>

              <p className="text-salt/40 text-sm leading-relaxed mt-2">{v.desc}</p>

              {/* Hover: add to cart hint */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-xs text-wave/60 tracking-wide">+ Ordina via QR ↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="reveal text-xs text-salt/25 tracking-wide uppercase mt-8">
          Allergeni disponibili su richiesta — Prezzi IVA inclusa — Servizio incluso
        </p>
      </div>
    </section>
  )
}
