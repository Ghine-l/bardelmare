import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useReveal } from './hooks/useReveal'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Public site
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Ticker       from './components/Ticker'
import MenuDigitale from './components/MenuDigitale'
import OrdineQR     from './components/OrdineQR'
import Eventi       from './components/Eventi'
import Location     from './components/Location'
import Footer       from './components/Footer'

// Public order (QR)
import OrdinePublic from './pages/public/OrdinePublic'

// Admin
import AdminLogin     from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

// ── Main public site ──────────────────────────────────────────────────────────
function SitoPubblico() {
  useReveal()
  return (
    <div className="min-h-screen bg-sand text-salt font-body">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <MenuDigitale />
        <OrdineQR />
        <Eventi />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

// ── App with routing ──────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Sito pubblico */}
          <Route path="/"       element={<SitoPubblico />} />

          {/* Pagina ordine via QR — es: /ordina?tavolo=7 */}
          <Route path="/ordina" element={<OrdinePublic />} />

          {/* Area admin — non linkata, solo chi conosce l'URL */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen bg-sand flex items-center justify-center flex-col gap-4">
              <span className="font-poster font-black text-wave text-8xl"
                style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900 }}>
                404
              </span>
              <p className="text-salt/40 text-sm">Pagina non trovata.</p>
              <a href="/" className="text-xs text-wave border border-wave/30 px-5 py-2 hover:bg-wave/10 transition-colors">
                Torna alla home
              </a>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
