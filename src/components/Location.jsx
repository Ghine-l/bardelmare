import React from 'react'

const info = [
  { key: 'Indirizzo',    val: 'Lungomare Augusto 18, Rimini' },
  { key: 'Orari',        val: 'Ogni giorno 8:00 – 02:00' },
  { key: 'Telefono',     val: '+39 0541 000 000' },
  { key: 'Instagram',    val: '@bardelmare_rimini' },
  { key: 'Parcheggio',   val: 'Gratuito in zona' },
  { key: 'Accessibilità',val: 'Accesso disabili disponibile' },
]

export default function Location() {
  return (
    <section id="dove" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-14">
          <p className="text-wave text-xs font-semibold tracking-widest uppercase mb-3">Come trovarci</p>
          <h2
            className="font-poster font-black uppercase leading-none text-salt"
            style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            Siamo sul<br /><span className="text-wave italic">lungomare</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Map placeholder */}
          <div className="reveal">
            <div className="relative overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #0c1445 0%, #1a2a6b 35%, #2563eb 65%, #3b82f6 100%)' }}>

              {/* Grid lines */}
              <div className="absolute inset-0"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 49px,rgba(255,255,255,.04) 49px,rgba(255,255,255,.04) 50px),repeating-linear-gradient(90deg,transparent,transparent 49px,rgba(255,255,255,.04) 49px,rgba(255,255,255,.04) 50px)' }}
              />

              {/* Wave decoration */}
              <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
                <svg viewBox="0 0 800 60" preserveAspectRatio="none" style={{ height: 60, width: '100%' }}>
                  <path d="M0,30 C100,10 200,50 300,30 C400,10 500,50 600,30 C700,10 750,45 800,30 L800,60 L0,60 Z" fill="rgba(37,99,235,.3)"/>
                </svg>
              </div>

              {/* Pin */}
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-3 w-4 h-4 rounded-full bg-sun"
                  style={{ boxShadow: '0 0 0 6px rgba(245,158,11,.25)' }} />
                <span className="font-poster font-bold uppercase text-white text-sm tracking-wide"
                  style={{ fontFamily: '"Barlow Condensed", sans-serif' }}>
                  Bar del Mare
                </span>
                <p className="text-white/40 text-xs mt-1">Lungomare Augusto 18</p>
              </div>

              {/* Maps button */}
              <a
                href="https://maps.google.com/?q=Lungomare+Augusto+18+Rimini"
                target="_blank" rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white text-ink text-xs font-semibold tracking-wide uppercase px-4 py-2 hover:bg-foam transition-colors z-10">
                Apri in Maps ↗
              </a>
            </div>
          </div>

          {/* Info grid */}
          <div className="reveal delay-100 space-y-0 border border-white/5">
            {info.map((r, i) => (
              <div key={r.key}
                className={`flex items-center justify-between px-6 py-5 hover:bg-sand-mid transition-colors ${i < info.length - 1 ? 'border-b border-white/5' : ''}`}>
                <span className="text-xs font-semibold tracking-widest uppercase text-salt/30">{r.key}</span>
                <span className="text-sm text-salt font-normal text-right">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-10 flex flex-col sm:flex-row gap-4">
          <a href="tel:+390541000000"
            className="inline-flex items-center justify-center gap-3 border border-white/10 hover:border-white/25 text-salt/60 hover:text-salt text-sm font-medium px-8 py-4 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Chiama
          </a>
          <a href="https://wa.me/390541000000" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-8 py-4 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.17 6.17 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.007 0C4.948 0 .01 4.955.01 11.03c0 1.937.502 3.757 1.372 5.332L.01 22l5.773-1.504A10.974 10.974 0 0011.007 22C17.063 22 22 17.047 22 10.97 22 4.896 17.063 0 11.007 0zm0 20.175a9.14 9.14 0 01-4.67-1.28l-.336-.198-3.434.897.92-3.326-.219-.345a9.092 9.092 0 01-1.403-4.923c0-5.044 4.1-9.15 9.142-9.15 4.87 0 9.14 4.106 9.14 9.15 0 5.044-4.27 9.175-9.14 9.175z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
