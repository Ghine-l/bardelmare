import React, { useState } from 'react'
import { eventi } from '../data/eventiData'

export default function Eventi() {
  const [attivo, setAttivo] = useState(null)

  return (
    <section id="eventi" className="py-20 md:py-28 bg-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-wave text-xs font-semibold tracking-widest uppercase mb-3">Stagione 2025</p>
            <h2
              className="font-poster font-black uppercase leading-none text-salt"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              Serate<br /><span className="text-sun italic">& eventi</span>
            </h2>
          </div>
          <p className="text-salt/40 text-sm max-w-xs leading-relaxed">
            Musica, aperitivi e cultura balneare. Ogni settimana qualcosa di nuovo sul lungomare.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 reveal">
          {eventi.map((ev, i) => (
            <div
              key={ev.id}
              className="relative bg-sand-light p-8 cursor-pointer group overflow-hidden"
              onClick={() => setAttivo(attivo === ev.id ? null : ev.id)}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 20% 50%, ${ev.color}18 0%, transparent 60%)` }}
              />

              {/* Big background number */}
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-4 font-poster font-black leading-none select-none pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: '8rem', color: `${ev.color}10` }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 border mb-3 inline-block"
                      style={{ color: ev.color, borderColor: `${ev.color}40`, background: `${ev.color}12` }}>
                      {ev.tag}
                    </span>
                    <p className="text-salt/40 text-xs tracking-widest uppercase mt-2">{ev.data}</p>
                  </div>
                  <span className="text-salt/20 group-hover:text-salt/50 transition-colors text-xl mt-1">
                    {attivo === ev.id ? '−' : '+'}
                  </span>
                </div>

                <h3
                  className="font-poster font-black uppercase text-salt mb-3 group-hover:text-white transition-colors"
                  style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: '1.8rem' }}>
                  {ev.titolo}
                </h3>

                {/* Expandable description */}
                <div className={`overflow-hidden transition-all duration-500 ${attivo === ev.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-salt/50 text-sm leading-relaxed pt-2 border-t border-white/5">{ev.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="reveal mt-8 bg-sand-surface border border-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-salt font-medium">Vuoi organizzare un evento privato?</p>
            <p className="text-salt/40 text-sm">Compleanni, feste in spiaggia, eventi aziendali — siamo qui.</p>
          </div>
          <a href="https://wa.me/390541000000"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold tracking-wide px-6 py-3 transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.17 6.17 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.007 0C4.948 0 .01 4.955.01 11.03c0 1.937.502 3.757 1.372 5.332L.01 22l5.773-1.504A10.974 10.974 0 0011.007 22C17.063 22 22 17.047 22 10.97 22 4.896 17.063 0 11.007 0zm0 20.175a9.14 9.14 0 01-4.67-1.28l-.336-.198-3.434.897.92-3.326-.219-.345a9.092 9.092 0 01-1.403-4.923c0-5.044 4.1-9.15 9.142-9.15 4.87 0 9.14 4.106 9.14 9.15 0 5.044-4.27 9.175-9.14 9.175z"/>
            </svg>
            Scrivici su WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
