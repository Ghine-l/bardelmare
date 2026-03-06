import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  // Still loading Firebase auth state
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-wave border-t-transparent rounded-full animate-spin" />
          <p className="text-salt/40 text-xs tracking-widest uppercase">Verifica accesso...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}
