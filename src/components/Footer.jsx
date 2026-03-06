import React from 'react'

export default function Footer() {
  return (
    <>
      {/* Pre-footer wave */}
      <div className="bg-sand-light" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ height: 50, width: '100%', display: 'block' }}>
          <path d="M0,25 C240,5 480,45 720,25 C960,5 1200,45 1440,25 L1440,50 L0,50 Z"
            fill="#1a1610"/>
        </svg>
      </div>

      <footer className="bg-sand py-12 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg width="36" height="24" viewBox="0 0 32 22" fill="none">
                <path d="M0 14 C5 8,10 18,16 12 C22 6,27 16,32 10" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M0 18 C5 12,10 22,16 16 C22 10,27 20,32 14" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
              </svg>
              <span className="font-poster font-black text-2xl uppercase tracking-wide text-salt"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                Bar <span className="text-wave">del Mare</span>
              </span>
            </div>

            <nav className="flex flex-wrap gap-8">
              {['Menu', 'Ordina', 'Eventi', 'Dove'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  className="text-xs font-medium tracking-widest uppercase text-salt/30 hover:text-salt/70 transition-colors">
                  {l}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-salt/20 tracking-wide">
              © {new Date().getFullYear()} Bar del Mare — Lungomare Augusto 18, Rimini. Tutti i diritti riservati.
            </p>
            <p className="text-xs text-salt/15">
              Sito realizzato da{' '}
              <a href="#" className="text-wave/40 hover:text-wave/70 transition-colors">Ghinelli Croatti</a>
              {' '}— Sviluppatori Web per Attività Locali
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
