import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { ascoltaOrdini, aggiornaStatus, aggiornaNota, STATUS, STATUS_LABEL, STATUS_COLOR } from '../../firebase/ordini'

// ── Helpers ───────────────────────────────────────────────────────────────────
function ts(fireTs) {
  if (!fireTs) return '...'
  const d = fireTs.toDate ? fireTs.toDate() : new Date(fireTs)
  return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
}
function tsDate(fireTs) {
  if (!fireTs) return ''
  const d = fireTs.toDate ? fireTs.toDate() : new Date(fireTs)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })
}
function elapsed(fireTs) {
  if (!fireTs) return ''
  const d   = fireTs.toDate ? fireTs.toDate() : new Date(fireTs)
  const sec = Math.floor((Date.now() - d.getTime()) / 1000)
  if (sec < 60)  return `${sec}s fa`
  if (sec < 3600) return `${Math.floor(sec / 60)}m fa`
  return `${Math.floor(sec / 3600)}h fa`
}

const NEXT_STATUS = {
  [STATUS.NUOVO]:      STATUS.IN_CARICO,
  [STATUS.IN_CARICO]:  STATUS.PRONTO,
  [STATUS.PRONTO]:     STATUS.CONSEGNATO,
}
const NEXT_LABEL = {
  [STATUS.NUOVO]:      '▶ Prendi in carico',
  [STATUS.IN_CARICO]:  '✓ Segna come pronto',
  [STATUS.PRONTO]:     '✅ Consegnato',
}

// ── Suono notifica (beep web audio) ──────────────────────────────────────────
function beep() {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.frequency.value = 880; osc.type = 'sine'
    gain.gain.setValueAtTime(.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .4)
    osc.start(); osc.stop(ctx.currentTime + .4)
  } catch {}
}

// ── Stat Box ─────────────────────────────────────────────────────────────────
function StatBox({ label, value, color }) {
  return (
    <div className="bg-sand-light border border-white/5 p-4 flex flex-col gap-1">
      <span className="text-xs tracking-widest uppercase" style={{ color }}>{label}</span>
      <span className="font-poster font-black text-3xl text-salt"
        style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
        {value}
      </span>
    </div>
  )
}

// ── Order Card ────────────────────────────────────────────────────────────────
function OrderCard({ ordine, onStatusChange }) {
  const [notaEdit,  setNotaEdit]  = useState(ordine.notaAdmin || '')
  const [editMode,  setEditMode]  = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [expanded,  setExpanded]  = useState(ordine.status !== STATUS.CONSEGNATO)

  const sc     = STATUS_COLOR[ordine.status]
  const nextS  = NEXT_STATUS[ordine.status]
  const nextL  = NEXT_LABEL[ordine.status]
  const isDone = ordine.status === STATUS.CONSEGNATO

  const saveNota = async () => {
    setSaving(true)
    await aggiornaNota(ordine.id, notaEdit)
    setSaving(false)
    setEditMode(false)
  }

  return (
    <div
      className={`border transition-all duration-300 ${isDone ? 'opacity-50' : ''}`}
      style={{ borderColor: sc.border, background: sc.bg }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-poster font-black text-2xl text-salt"
            style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
            T.{ordine.tavolo}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 border"
            style={{ color: sc.text, borderColor: sc.border, background: 'rgba(0,0,0,.2)' }}>
            {STATUS_LABEL[ordine.status]}
          </span>
          <span className="text-salt/30 text-xs">{elapsed(ordine.createdAt)}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-poster font-black text-xl" style={{ color: sc.text, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
            €{ordine.totale?.toFixed(2)}
          </span>
          <span className="text-salt/30 text-sm">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">

          {/* Items list */}
          <div className="space-y-1">
            {ordine.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-salt/70">
                  <span style={{ color: sc.text }} className="font-bold">{item.qty}×</span> {item.nome}
                </span>
                <span className="text-salt/50">€{(item.prezzo * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Note cliente */}
          {ordine.note && (
            <div className="bg-black/20 border border-white/5 px-4 py-3">
              <p className="text-xs text-salt/40 uppercase tracking-widest mb-1">Nota cliente</p>
              <p className="text-salt/70 text-sm">{ordine.note}</p>
            </div>
          )}

          {/* Nota admin */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-salt/40 uppercase tracking-widest">Nota interna</p>
              {!editMode
                ? <button onClick={() => setEditMode(true)} className="text-xs text-wave/60 hover:text-wave transition-colors">Modifica</button>
                : <div className="flex gap-3">
                    <button onClick={() => setEditMode(false)} className="text-xs text-salt/30 hover:text-salt/60 transition-colors">Annulla</button>
                    <button onClick={saveNota} disabled={saving} className="text-xs text-wave hover:text-wave-bright transition-colors font-semibold">
                      {saving ? 'Salvo…' : 'Salva'}
                    </button>
                  </div>
              }
            </div>
            {editMode
              ? <textarea value={notaEdit} onChange={e => setNotaEdit(e.target.value)} rows={2}
                  className="w-full bg-black/20 border border-wave/30 text-salt text-xs p-2 outline-none resize-none"
                  placeholder="Es: tavolo all'aperto, cliente VIP…" />
              : <p className="text-salt/40 text-xs italic">{ordine.notaAdmin || 'Nessuna nota.'}</p>
            }
          </div>

          {/* Timestamps */}
          <div className="flex gap-4 text-xs text-salt/25">
            <span>Ricevuto: {tsDate(ordine.createdAt)} {ts(ordine.createdAt)}</span>
            <span>Aggiornato: {ts(ordine.updatedAt)}</span>
          </div>

          {/* Action button */}
          {!isDone && (
            <button
              onClick={() => onStatusChange(ordine.id, nextS)}
              className="w-full font-semibold text-sm tracking-wide py-3 transition-all text-white"
              style={{ background: sc.border }}>
              {nextL}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [ordini,       setOrdini]       = useState([])
  const [filtroStatus, setFiltroStatus] = useState('tutti')
  const [filtroTavolo, setFiltroTavolo] = useState('')
  const [suono,        setSuono]        = useState(true)
  const [now,          setNow]          = useState(Date.now())
  const prevLen = useRef(0)

  // Tick per elapsed time
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  // Firestore real-time listener
  useEffect(() => {
    const unsub = ascoltaOrdini((nuovi) => {
      // Notifica sonora su nuovo ordine
      if (nuovi.length > prevLen.current && prevLen.current > 0 && suono) beep()
      prevLen.current = nuovi.length
      setOrdini(nuovi)
    })
    return unsub
  }, [suono])

  const onStatusChange = (id, nuovoStatus) => aggiornaStatus(id, nuovoStatus)

  // Statistiche
  const stats = {
    nuovi:      ordini.filter(o => o.status === STATUS.NUOVO).length,
    inCarico:   ordini.filter(o => o.status === STATUS.IN_CARICO).length,
    pronti:     ordini.filter(o => o.status === STATUS.PRONTO).length,
    consegnati: ordini.filter(o => o.status === STATUS.CONSEGNATO).length,
  }
  const incasso = ordini
    .filter(o => o.status === STATUS.CONSEGNATO)
    .reduce((s, o) => s + (o.totale || 0), 0)

  // Filtri
  const ordiniFiltrati = ordini.filter(o => {
    const matchStatus = filtroStatus === 'tutti' || o.status === filtroStatus
    const matchTavolo = !filtroTavolo || String(o.tavolo).includes(filtroTavolo)
    return matchStatus && matchTavolo
  })

  // Raggruppa per status (attivi prima, consegnati in fondo)
  const attivi     = ordiniFiltrati.filter(o => o.status !== STATUS.CONSEGNATO)
  const consegnati = ordiniFiltrati.filter(o => o.status === STATUS.CONSEGNATO)

  return (
    <div className="min-h-screen bg-sand text-salt" style={{ fontFamily: '"Outfit", sans-serif' }}>

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-50 bg-sand-light border-b border-white/5 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <svg width="28" height="20" viewBox="0 0 32 22" fill="none">
            <path d="M0 14 C5 8,10 18,16 12 C22 6,27 16,32 10" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div>
            <span className="font-poster font-black text-salt text-lg uppercase tracking-wider"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
              Bar <span className="text-wave">del Mare</span>
            </span>
            <span className="text-salt/25 text-xs ml-3">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-salt/40 tracking-wide">Live</span>
          </div>
          {/* Suono toggle */}
          <button onClick={() => setSuono(!suono)}
            className={`text-xs tracking-wide px-3 py-1.5 border transition-colors ${suono ? 'border-wave/40 text-wave' : 'border-white/10 text-salt/30'}`}
            title={suono ? 'Disattiva suono' : 'Attiva suono'}>
            {suono ? '🔔' : '🔕'}
          </button>
          {/* User + logout */}
          <div className="hidden sm:flex items-center gap-3 border-l border-white/5 pl-4">
            <span className="text-xs text-salt/30">{user?.email}</span>
            <button onClick={logout}
              className="text-xs text-salt/30 hover:text-salt/70 transition-colors tracking-wide uppercase">
              Esci
            </button>
          </div>
          <button onClick={logout} className="sm:hidden text-salt/30 hover:text-salt/70">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatBox label="Nuovi"        value={stats.nuovi}      color="#93c5fd" />
          <StatBox label="In prep."     value={stats.inCarico}   color="#fcd34d" />
          <StatBox label="Pronti"       value={stats.pronti}     color="#fdba74" />
          <StatBox label="Consegnati"   value={stats.consegnati} color="#86efac" />
          <div className="bg-sand-light border border-white/5 p-4 flex flex-col gap-1 col-span-2 md:col-span-1">
            <span className="text-xs tracking-widest uppercase text-gold">Incasso oggi</span>
            <span className="font-poster font-black text-wave text-3xl"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
              €{incasso.toFixed(2)}
            </span>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'tutti',              label: 'Tutti' },
              { id: STATUS.NUOVO,         label: '🔵 Nuovi' },
              { id: STATUS.IN_CARICO,     label: '🟡 In prep.' },
              { id: STATUS.PRONTO,        label: '🟠 Pronti' },
              { id: STATUS.CONSEGNATO,    label: '✅ Consegnati' },
            ].map(f => (
              <button key={f.id} onClick={() => setFiltroStatus(f.id)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wide transition-all border ${
                  filtroStatus === f.id
                    ? 'bg-wave border-wave text-white'
                    : 'bg-transparent border-white/10 text-salt/40 hover:text-salt'
                }`}>
                {f.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={filtroTavolo}
            onChange={e => setFiltroTavolo(e.target.value)}
            placeholder="🔍 Cerca tavolo…"
            className="bg-sand-light border border-white/10 text-salt text-xs px-4 py-2 outline-none focus:border-wave/40 w-36 transition-colors placeholder-salt/25"
          />
        </div>

        {/* ── Orders ── */}
        {ordini.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="w-12 h-12 text-salt/10" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
            </svg>
            <p className="text-salt/25 text-sm">Nessun ordine ancora. In attesa…</p>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-wave/40 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-wave/40 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-wave/40 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        ) : (
          <>
            {/* Attivi */}
            {attivi.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-salt/30 mb-3">
                  Ordini attivi ({attivi.length})
                </p>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {attivi.map(o => (
                    <OrderCard key={o.id} ordine={o} onStatusChange={onStatusChange} />
                  ))}
                </div>
              </div>
            )}

            {/* Consegnati */}
            {consegnati.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-salt/20 mb-3">
                  Consegnati oggi ({consegnati.length})
                </p>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {consegnati.map(o => (
                    <OrderCard key={o.id} ordine={o} onStatusChange={onStatusChange} />
                  ))}
                </div>
              </div>
            )}

            {ordiniFiltrati.length === 0 && (
              <p className="text-salt/25 text-sm text-center py-10">Nessun ordine con i filtri selezionati.</p>
            )}
          </>
        )}
      </main>
    </div>
  )
}
