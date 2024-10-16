'use client'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    colorSchemes: { dark: true },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}
