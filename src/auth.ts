import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    access_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const json = await res.json()

        if (res.ok && json && json.user) return { access_token: json.access_token, ...json.user }

        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/error',
  },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      // if (user) token.access_token = user.access_token // TODO: check
      if (trigger === 'update') token.name = session.user.name
      if (account?.provider === 'keycloak') return { ...token, access_token: account.access_token }

      return token
    },
    session({ session, token }) {
      if (token?.access_token) session.access_token = token.access_token
      if (token?.sub) session.user.id = token.sub

      return session
    },
  },
  experimental: { enableWebAuthn: true },
})
