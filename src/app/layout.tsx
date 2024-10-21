import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header, ScrollToTopButton } from '@/components'
import { ThemeClientProvider } from '@/providers'
import { auth, signOut } from '@/auth'
import _ from 'lodash'

export const metadata: Metadata = {
  title: 'Read or Dead',
  description: 'Welcome',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const token = _.get(session, 'user.access_token', '')
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeClientProvider>
          <Header
            token={token}
            logout={async () => {
              'use server'
              await signOut()
            }}
          />

          <main className="relative mt-28 min-h-[calc(100dvh-112px-90px)] flex flex-col">
            {children}

            <ScrollToTopButton />
          </main>
          <Footer />
        </ThemeClientProvider>
      </body>
    </html>
  )
}
