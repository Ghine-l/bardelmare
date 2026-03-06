import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(undefined) // undefined = loading
  const [error,   setError]   = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null))
    return unsub
  }, [])

  const login = async (email, password) => {
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      const msg = {
        'auth/invalid-credential':     'Email o password errati.',
        'auth/user-not-found':         'Nessun account trovato.',
        'auth/wrong-password':         'Password errata.',
        'auth/too-many-requests':      'Troppi tentativi. Riprova tra poco.',
        'auth/network-request-failed': 'Errore di rete. Controlla la connessione.',
      }
      setError(msg[e.code] || 'Errore di accesso. Riprova.')
    }
  }

  const logout = () => signOut(auth)

  return (
    <AuthCtx.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
