import { User } from '@/types'
import { createContext } from 'react'

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, userData: User) => void
  logout: () => void
}

const defaultAuthContext: AuthContextType = {
  login: () => {},
  logout: () => {},
  user: null,
  token: null,
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext)
