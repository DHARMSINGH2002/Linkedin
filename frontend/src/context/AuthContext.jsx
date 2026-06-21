import React, { createContext, useMemo } from 'react'

export const AuthDataContext = createContext()

function AuthContext({ children }) {
  const serverUrl = 'http://localhost:8000'
  const value = useMemo(() => ({ serverUrl }), [])

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext
