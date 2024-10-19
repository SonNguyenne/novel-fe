import NextAuth, { User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { IUser } from './types'

declare module 'next-auth' {
  interface User {
    access_token?: string
  }

  interface Session {
    accessToken?: string
    user: IUser
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: 'my-secret',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string
      session.user = token.user as AdapterUser & IUser
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`

      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
    error: '/error',
  },
  basePath: '/',
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          throw new Error('User not found.')
        }

        const user = await response.json()

        return user
      },
    }),
  ],
})
