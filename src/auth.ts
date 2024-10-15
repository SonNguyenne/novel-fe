import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: 'my-secret',
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.access_token
        token.user = user
      }

      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.access_token
      session.user = token.user
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
