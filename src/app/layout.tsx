import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header, ScrollToTopButton } from '@/components'
import { ThemeClientProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'Read or Dead',
  description: 'Welcome',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeClientProvider>
          <Header />

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
