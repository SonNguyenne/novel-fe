'use client'

import { User } from '@/app/types'
import { AuthContext } from '@/context'
import { useState, ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = (token: string, userData: User) => {
    setToken(token)
    setUser(userData)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}
