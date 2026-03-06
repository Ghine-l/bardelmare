import React from 'react'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-sand">

      {/* ── Giant BG number ── */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-poster font-black leading-none"
        style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: 'clamp(16rem, 40vw, 36rem)', color: 'rgba(37,99,235,.04)', whiteSpace: 'nowrap' }}
      >
        BAR
      </span>

      {/* ── Floating circles ── */}
      <div aria-hidden="true" className="absolute top-24 right-16 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute top-40 right-32 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 md:pb-24 pt-32">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-wave animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-wave">Rimini Lungomare — Aperto ogni giorno</span>
        </div>

        {/* Giant title */}
        <h1
          className="font-poster font-black uppercase leading-none tracking-tight mb-4 animate-fade-up"
          style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: 'clamp(4.5rem, 14vw, 13rem)', lineHeight: 0.9 }}
        >
          <span className="text-salt">Bar</span>
          <br />
          <span className="text-wave italic">del Mare</span>
        </h1>

        {/* Tagline + CTA row */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 mt-8" style={{ animationDelay: '200ms' }}>
          <p className="text-salt/60 text-base md:text-lg leading-relaxed max-w-md animate-fade-up" style={{ animationDelay: '150ms' }}>
            Cocktail artigianali, cucina di mare, musica dal vivo e serate evento sul lungomare di Rimini.
            <br /><strong className="text-salt font-medium">Ordina direttamente dal tuo tavolo via QR code.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '250ms' }}>
            <a href="#ordina"
              className="inline-flex items-center justify-center gap-3 bg-wave hover:bg-wave-bright text-white font-semibold text-sm tracking-wide px-8 py-4 transition-all hover:scale-105"
              style={{ boxShadow: '0 0 40px rgba(37,99,235,.35)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z"/>
              </svg>
              Apri il menu & ordina
            </a>
            <a href="#eventi"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-salt/70 hover:text-salt text-sm font-medium px-8 py-4 transition-all">
              Prossimi eventi
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-white/5 bg-white/5 animate-fade-up" style={{ animationDelay: '350ms' }}>
          {[
            { num: '40+', label: 'Cocktail in menu' },
            { num: 'QR',  label: 'Ordini al tavolo' },
            { num: '4×',  label: 'Serate settimanali' },
            { num: '∞',   label: 'Tramonto sull\'Adriatico' },
          ].map(s => (
            <div key={s.num} className="bg-sand-light px-6 py-5">
              <p className="font-poster font-black text-wave text-3xl md:text-4xl leading-none mb-1"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                {s.num}
              </p>
              <p className="text-xs text-salt/40 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Wave SVG ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none wave-drift" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full" style={{ height: '90px' }}>
          <path d="M0,45 C180,15 360,75 540,45 C720,15 900,75 1080,45 C1260,15 1350,60 1440,45 L1440,90 L0,90 Z"
            fill="rgba(37,99,235,.08)" />
          <path d="M0,60 C200,35 400,80 600,55 C800,30 1000,80 1200,55 C1350,38 1400,65 1440,55 L1440,90 L0,90 Z"
            fill="rgba(37,99,235,.05)" />
        </svg>
      </div>
    </section>
  )
}
