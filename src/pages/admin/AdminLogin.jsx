import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { user, login, error, setError } = useAuth()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Inserisci email e password.'); return }
    setLoading(true)
    await login(email, password)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center px-6">

      {/* Background number */}
      <span aria-hidden="true"
        className="fixed select-none pointer-events-none font-poster font-black leading-none"
        style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: '40vw', color: 'rgba(37,99,235,.03)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        ADM
      </span>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
            <path d="M0 14 C5 8,10 18,16 12 C22 6,27 16,32 10" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M0 18 C5 12,10 22,16 16 C22 10,27 20,32 14" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
          </svg>
          <span className="font-poster font-black text-lg uppercase tracking-wider text-salt"
            style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
            Bar <span className="text-wave">del Mare</span>
          </span>
        </div>

        <div className="border border-white/8 bg-sand-light p-8">
          {/* Header */}
          <div className="mb-8">
            <p className="text-wave text-xs font-semibold tracking-widest uppercase mb-2">Area riservata</p>
            <h1 className="font-poster font-black text-salt text-3xl uppercase"
              style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
              Accesso Admin
            </h1>
            <p className="text-salt/30 text-xs mt-1">Accesso consentito solo al personale autorizzato.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-salt/40">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="admin@bardelmare.it"
                autoComplete="email"
                className="bg-sand border border-white/10 text-salt text-sm px-4 py-3 outline-none focus:border-wave/50 transition-colors placeholder-salt/20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-salt/40">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-sand border border-white/10 text-salt text-sm px-4 py-3 pr-12 outline-none focus:border-wave/50 transition-colors placeholder-salt/20"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-salt/30 hover:text-salt/60 transition-colors">
                  {showPass
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 px-4 py-3">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-wave hover:bg-wave-bright text-white font-semibold text-sm tracking-wide py-4 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              style={{ boxShadow: loading ? 'none' : '0 0 30px rgba(37,99,235,.3)' }}>
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Accesso...</>
                : 'Accedi'}
            </button>
          </form>
        </div>

        <p className="text-center text-salt/15 text-xs mt-6 tracking-wide">
          Questa pagina non è accessibile ai clienti.
        </p>
      </div>
    </div>
  )
}
