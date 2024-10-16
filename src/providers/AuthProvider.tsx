'use client'

import { AuthContext } from '@/context'
import { User } from '@/types'
import { useState, ReactNode, useEffect } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // TODO: Not good
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedToken !== undefined) {
      setToken(storedToken)
    }

    if (storedUser && storedUser !== undefined) {
      // setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (token: string, userData: User) => {
    setToken(token)
    setUser(userData)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}
