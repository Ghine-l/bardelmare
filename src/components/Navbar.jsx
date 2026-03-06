import React, { useState, useEffect } from 'react'

const links = [
  { label: 'Menu',    href: '#menu' },
  { label: 'Ordina',  href: '#ordina' },
  { label: 'Eventi',  href: '#eventi' },
  { label: 'Dove',    href: '#dove' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-sand/95 backdrop-blur-md border-b border-white/5 py-3' : 'py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
              <path d="M0 14 C5 8,10 18,16 12 C22 6,27 16,32 10" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M0 18 C5 12,10 22,16 16 C22 10,27 20,32 14" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
            </svg>
            <span className="font-poster text-xl font-800 tracking-wider text-salt uppercase" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, letterSpacing: '0.08em' }}>
              Bar <span className="text-wave">del Mare</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-xs font-medium tracking-widest uppercase text-salt/50 hover:text-salt transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#ordina"
              className="text-xs font-semibold tracking-widest uppercase bg-wave hover:bg-wave-bright text-white px-5 py-2.5 transition-colors">
              Ordina ora
            </a>
          </nav>

          {/* Hamburger */}
          <button className="md:hidden text-salt/70 hover:text-salt" onClick={() => setOpen(!open)}>
            {open
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-sand flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-poster text-4xl font-800 uppercase tracking-wider text-salt hover:text-wave transition-colors"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800 }}>
              {l.label}
            </a>
          ))}
          <a href="#ordina" onClick={() => setOpen(false)}
            className="mt-4 text-sm font-semibold tracking-widest uppercase bg-wave text-white px-10 py-4">
            Ordina ora
          </a>
        </div>
      )}
    </>
  )
}
